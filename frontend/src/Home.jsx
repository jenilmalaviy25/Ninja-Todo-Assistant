import { useEffect, useState } from "react"
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { FaTrash, FaMicrophone, FaRobot, FaCheck, FaPlus, FaX, FaUser, FaTrophy } from 'react-icons/fa6'
import { IoSparkles } from 'react-icons/io5'
import { MdModeEditOutline } from "react-icons/md"
import { useSpeechRecognition } from "./hooks/useSpeech"
import { getToken } from "firebase/messaging"
import { messaging } from "./firebase"
import UserProfile from "./UserProfile"
import ChatBot from "./ChatBot"


function Home() {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState(null)
    const [editedTodoTitle, setEditingTodoTitle] = useState('')
    const [voiceId, setvoiceId] = useState('')
    const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition()
    const [showModal, setShowModal] = useState(false);
    const [profilemodel, setShowProfileModal] = useState(false)
    const [openBot, setOPenBot] = useState(false)
    const [completedTasks, setCompletedTask] = useState(0)
    const [totalTasks, setTotaltasks] = useState(0)
    const [avarage, setAvarage] = useState(0)
    const [voice, setVoice] = useState(0)
    const EIGHT_HOURS = 60 * 60 * 1000;


    useEffect(() => {
        const lastShown = localStorage.getItem("lastModalShown");
        const now = Date.now();

        if (!lastShown || now - Number(lastShown) > EIGHT_HOURS) {
            setShowModal(true);
            localStorage.setItem("lastModalShown", now.toString());
        }
        requestPermission()
        fetchTodos()
        taskPogress()
    }, []);

    async function requestPermission() {
        const alreadySent = localStorage.getItem("tokenSent");
        if (alreadySent === "true") return;
        await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => { });

        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_CLOUDMESSAGING_PRIVATE_KEY })
            try {
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/update`, {
                    usename: localStorage.getItem('username'),
                    email: localStorage.getItem('email'),
                    token: token
                }, { withCredentials: true })
                localStorage.setItem("tokenSent", "true");
                toast.success('You granted for task reminder notification')
            } catch (error) {
                console.error('Error is:', error)
            }
        } else if (permission === 'denied') alert('You denied for task reminder notification')
    }

    const closeModal = async () => {
        try {
            setShowModal(false);
            detectWakeWord();
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/auto`, {}, { withCredentials: true })
            const audioSrc = `data:audio/mpeg;base64,${response.data.voiceBuffer}`;
            const audio = new Audio(audioSrc);
            await audio.play();
            fetchTodos();
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }
    };

    const discailimer = () => {
        setShowModal(true)
        toast.error('Please accept our terms and conditions')
    }

    const stopandsendrecording = async () => {
        stopListening()
        if (!transcript.trim()) return
        if (transcript.includes('wake up')) {
            toast('Wakeup assistanat again', { icon: <FaTrophy /> })
            detectWakeWord()
            return
        }
        const final = transcript.replace(/\b(\d{3,4})\s*(am|pm)\b/gi, (_, time, meridiem) => {
            let hours, minutes;

            if (time.length === 3) {
                hours = time[0];
                minutes = time.slice(1);
            } else {
                hours = time.slice(0, -2);
                minutes = time.slice(-2);
            }

            return `${hours}:${minutes} ${meridiem.toLowerCase()}`;
        });
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/crudtask`, {
                task: final.replaceAll('and', ','),
                voiceId: voiceId
            }, { withCredentials: true })
            toast.success(response.data.message)
            if (final.includes('add task')) {
                setTodos([...todos, response.data.newtask])
                setNewTodo('')
            }
            else if (final.includes('delete')) {
                setTodos(todos.filter((task) => task._id !== response.data.taskId))
            }
            const audioSrc = `data:audio/mpeg;base64,${response.data.voiceBuffer}`;
            const audio = new Audio(audioSrc);
            await audio.play();
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log('Error todo:', error)
        } finally {
            resetTranscript()
        }
    }

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, { withCredentials: true })
            setTodos(response.data.allTasks)
        } catch (error) {
            console.log('Error fetching todos:', error)
        }
    }

    const detectWakeWord = async () => {
        try {
            const result = await startListening();
            if (!result.trim()) return;

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/wakeup`, {
                text: result.toLowerCase().trim().replaceAll(' ', '')
            }, { withCredentials: true });

            setTimeout(() => {
                stopListening()
            }, 10000)

            setvoiceId(response.data.voiceId);
            setVoice(response.data.voiceBuffer)
            const audioSrc = `data:audio/mpeg;base64,${response.data.voiceBuffer}`;
            const audio = new Audio(audioSrc);
            await audio.play();
            toast.success('Assistant wakeup successfully')

        } catch (error) {
            toast.error(error.response?.data.message);
            console.error("Error detecting wake word:", error);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault()
        if (!newTodo.trim()) return
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/add`,
                { task: newTodo }, {
                withCredentials: true
            })
            setTodos([...todos, response.data.newtask])
            setNewTodo('')
            taskPogress()
            toast.success(response.data.message)
        } catch (error) {
            console.log('Error adding todo:', error)
        }
    }

    const recordingVoice = () => {
        startListening()
    }

    const startediting = (todo) => {
        setEditTodo(todo._id)
        setEditingTodoTitle(todo.title)
    }

    const saveEdit = async (id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/updatetask`, {
                taskId: id,
                title: editedTodoTitle.trim()
            }, { withCredentials: true })
            setTodos(todos.map((todo) => (todo._id === id ? response.data.existTask : todo)))
            setEditTodo(null)
            setEditingTodoTitle('')
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log('Error is', error)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`, { withCredentials: true })
            setTodos(todos.filter((todo) => todo._id !== id))
            toast.success('Task delete successfully')
            taskPogress()
        } catch (error) {
            console.log('delete todo:', error)
            toast.error('First complete task')
        }
    }

    const toggleTodo = async (id) => {
        try {
            const todo = todos.find((t) => t._id === id)
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`, { withCredentials: true })
            setTodos(todos.map((t) => t._id === id ? response.data.task : t))
            taskPogress()
        } catch (error) {
            console.log('Error is:', error)
        }
    }

    async function taskPogress() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/pogress`, {}, { withCredentials: true })
            setAvarage(response.data.avarage)
            setTotaltasks(response.data.totalTask)
            setCompletedTask(response.data.finishedTask)
        } catch (error) {
            console.log(error)
        }
    }

    const playsound = () => {
        const audioSrc = `data:audio/mpeg;base64,${voice}`;
        const audio = new Audio(audioSrc);
        audio.play();
    }

    const openbot = () => {
        setOPenBot(true)
    }

    const closebot = () => {
        setOPenBot(false)
    }

    const openProfile = () => {
        setShowProfileModal(true);
    };

    const closeProfile = () => {
        setShowProfileModal(false);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8">

                    {/* Header with Profile Button */}
                    <div className="text-center mb-8 relative">
                        {/* Profile Button - Top Right */}
                        <div className="absolute top-0 right-0">
                            <button
                                onClick={openProfile}
                                className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            >
                                <FaUser className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                            </button>
                        </div>
                        <button className=" w-16 h-16 items-center mb-4 cursor-pointer transition-all duration-300 hover:scale-110 group" onClick={playsound}>
                            <img src="/ninjalogo.png" className=" group-hover:rotate-12 transition-transform duration-200" />
                        </button>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-bold mb-2">
                            Ninja Todo
                        </h1>
                        <p className="text-gray-500 text-sm">Organize your tasks with style</p>
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 shadow-sm mt-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    {completedTasks}/{totalTasks} tasks
                                </span>
                                <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    {avarage}%
                                </span>
                            </div>

                            {/* Compact Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${avarage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Add Task Form */}
                    <form onSubmit={addTodo} className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg p-2 sm:p-0 sm:overflow-hidden hover:shadow-xl transition-all duration-300">
                            <input
                                className="flex-1 outline-none px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent"
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add your new tasks here..."
                            />

                            <div className="flex sm:flex-row flex-col sm:gap-0 gap-2">
                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 transition-all duration-300 hover:shadow-lg group flex-shrink-0 rounded-xl sm:rounded-none sm:rounded-l-xl"
                                    onMouseDown={recordingVoice}
                                    onMouseUp={stopandsendrecording}
                                    onKeyDown={recordingVoice}
                                    onKeyUp={stopandsendrecording}
                                >
                                    <FaMicrophone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white px-4 py-3 transition-all duration-300 hover:shadow-lg group flex-shrink-0 rounded-xl sm:rounded-none sm:rounded-r-xl"
                                >
                                    <FaPlus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
                                </button>
                            </div>

                        </div>
                    </form>

                    {/* Todo List */}
                    <div className="space-y-4">
                        {todos.length === 0 ? (
                            <div className="text-center py-12">
                                <IoSparkles className="w-12 h-12 text-violet-400 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet!</h3>
                                <p className="text-gray-400">Add your first task to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todos.map((todo) => (
                                    <div key={todo._id} className="animate-fade-in">
                                        {editTodo === todo._id ? (
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg">
                                                <input
                                                    className="flex-1 p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 text-gray-600 bg-white/80 backdrop-blur-sm"
                                                    type="text"
                                                    value={editedTodoTitle}
                                                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                                                />
                                                <div className="flex gap-3 sm:gap-2">
                                                    <button
                                                        className="flex-1 sm:flex-none p-3 bg-gradient-to-r from-green-400 to-green-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                        onClick={() => saveEdit(todo._id)}
                                                    >
                                                        <FaCheck className="w-4 h-4 mx-auto" />
                                                    </button>
                                                    <button
                                                        className="flex-1 sm:flex-none p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                        onClick={() => setEditTodo(null)}
                                                    >
                                                        <FaX className="w-4 h-4 mx-auto" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between gap-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    <button
                                                        className={`flex-shrink-0 w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${todo.completed
                                                            ? "bg-gradient-to-r from-green-500 to-green-600 border-green-500 shadow-lg"
                                                            : "border-gray-300 hover:border-violet-400 hover:shadow-md"
                                                            }`}
                                                        onClick={() => toggleTodo(todo._id)}
                                                    >
                                                        {todo.completed && <FaCheck className="w-3 h-3 text-white" />}
                                                    </button>
                                                    <span className={`text-gray-800 text-pretty font-medium truncate ${todo.completed ? 'line-through opacity-60' : ''} transition-all duration-200`}>
                                                        {todo.title}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button
                                                        className="p-2 text-violet-500 hover:text-violet-700 rounded-lg hover:bg-violet-50 transition-all duration-200 hover:scale-110"
                                                        onClick={() => startediting(todo)}
                                                    >
                                                        <MdModeEditOutline className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-110"
                                                        onClick={() => deleteTodo(todo._id)}
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Bot Button */}
                <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur opacity-75 animate-pulse"></div>
                        <button
                            className="relative bg-gradient-to-r from-violet-500 to-blue-500 p-4 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
                            onClick={openbot}
                        >
                            <FaRobot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm p-4">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full mx-4 p-6 sm:p-8 max-h-[90vh] overflow-y-auto scrollbar-hide animate-scale-in">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mb-4 shadow-lg">
                                <FaCheck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                ToDo Assistant - Notice
                            </h3>
                        </div>

                        <div className="space-y-6 text-gray-700 text-sm sm:text-base mb-8">
                            <div>
                                <h4 className="font-semibold text-violet-600 mb-1">1. Allow Notifications</h4>
                                <p className="leading-relaxed">
                                    To receive timely task reminders, make sure to allow notification access when prompted.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-violet-600 mb-1">2. Wakeup Words</h4>
                                <p className="leading-relaxed">
                                    Use any of the following wakeup words to start a conversation with the ninja assistant:
                                </p>
                                <ul className="list-disc list-inside pl-4">
                                    <li><code className="text-blue-600 font-medium">ok naruto</code></li>
                                    <li><code className="text-blue-600 font-medium">ok hinata</code></li>
                                    <li><code className="text-blue-600 font-medium">ok jiraiya</code></li>
                                </ul>
                                <p className="mt-2">⏳ You’ll have <strong>10 seconds</strong> to say the wakeup word after the assistant activate.</p>
                                <p className="mt-2">When you fail to wakeup assistant, speck 'wakeup' in mic get again <strong>10 seconds</strong> to say the wakeup word after the assistant activate.</p>
                                <p className="italic text-gray-500 text-sm">Note: Wakeup words only activate the ninja assistant. Give your command afterward.</p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-200 rounded-xl shadow-inner space-y-2">
                                <h4 className="text-blue-700 font-semibold text-lg flex items-center gap-2">
                                    🎤 How to Speak Your Command
                                </h4>
                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>
                                        🖱️ <span className="font-medium text-blue-600">PC:</span>
                                        <span className="ml-2">Press & hold the <span className="font-semibold text-gray-800">Mic</span> button to speak, then release to send your command.</span>
                                    </p>
                                    <p>
                                        📱 <span className="font-medium text-blue-600">Mobile:</span>
                                        <span className="ml-2">Tap & hold the <span className="font-semibold text-gray-800">Mic</span> button to speak, then release to send your command.</span>
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 italic">
                                    Tip: Keep your commands short and clear for faster recognition!
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-violet-600 mb-1">3. Voice Commands Format</h4>
                                <p className="leading-relaxed mb-1">Once the assistant is active, you can say:</p>
                                <ul className="list-disc list-inside pl-4 space-y-1">
                                    <li><strong>Add a task:</strong> <code className="text-blue-600">add task take a bath at 7 pm</code></li>
                                    <li><strong>Get tasks:</strong> <code className="text-blue-600">give my tasks</code> or <code className="text-blue-600">give my pending task</code></li>
                                    <li><strong>Delete task:</strong> <code className="text-blue-600">delete this take a bath</code></li>
                                </ul>
                                <p className="italic text-sm text-gray-500 mt-2">Use clear and specific phrases for accurate understanding.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-violet-600 mb-1">4. Forgot Wakeup or Help?</h4>
                                <p>
                                    Ask our ChatBot using sentences like: <br />
                                    <code className="text-blue-600">I forgot wakeup words</code> or <code className="text-blue-600">how to wake up assistant</code>
                                </p>
                                <p className="italic text-sm text-gray-500 mt-1">You’ll get quick reminders instantly.</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-violet-600 mb-1"> 5. Auto-Cleanup Notice</h4>
                                <p>
                                    Tasks older than <strong>3 days</strong> will be deleted automatically to keep your list clean.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                                onClick={closeModal}
                                className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                I Accept
                            </button>
                            <button
                                onClick={discailimer}
                                className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openBot && (
                <ChatBot onClose={closebot} />
            )}
            {profilemodel && (
                <UserProfile onClose={closeProfile} />
            )}
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}

export default Home
