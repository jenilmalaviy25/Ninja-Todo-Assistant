import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { FaTrash, FaMicrophone, FaRobot, FaCheck, FaPlus, FaX } from 'react-icons/fa6'
import { MdOutlineDone } from 'react-icons/md'
import { IoClose, IoSparkles } from 'react-icons/io5'
import { MdModeEditOutline } from "react-icons/md"
import { useSpeechRecognition } from "./hooks/useSpeech"
import { useNavigate } from "react-router-dom"
import { getToken } from "firebase/messaging"
import { messaging } from "./firebase"



function Home() {
    const navigate = useNavigate()
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState(null)
    const [editedTodoTitle, setEditingTodoTitle] = useState('')
    const [voiceId, setvoiceId] = useState('')
    const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition()
    const [showModal, setShowModal] = useState(false);
    const EIGHT_HOURS = 8 * 60 * 60 * 1000;


    useEffect(() => {
        const lastShown = localStorage.getItem("lastModalShown");
        const now = Date.now();

        if (!lastShown || now - Number(lastShown) > EIGHT_HOURS) {
            setShowModal(true);
            localStorage.setItem("lastModalShown", now.toString());
        }
        requestPermission()
    }, []);

    async function requestPermission() {
        const alreadySent = localStorage.getItem("tokenSent");
        if (alreadySent === "true") return;

        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_CLOUDMESSAGING_PRIVATE_KEY })
            try {
                await axios.put('/api/user/update', {
                    usename:localStorage.getItem('username'),
                    email:localStorage.getItem('email'),
                    token: token
                }, { withCredentials: true })
                localStorage.setItem("tokenSent", "true");
                toast.success('You granted for task reminder notification')
            } catch (error) {
                console.error('Error is:', error)
            }
        } else if (permission === 'denied') alert('You denied for task reminder notification')
    }

    const closeModal = () => {
        setShowModal(false);
        detectWakeWord();
    };

    const discailimer = () => {
        setShowModal(true)
        toast.error('Please accept our terms and conditions')
    }

    const stopandsendrecording = async () => {
        stopListening()
        if (!transcript.trim()) return
        const final = transcript.toLowerCase()
        try {
            const response = await axios.post('/api/user/crudtask', {
                task: final.replaceAll('and', ','),
                voiceId: voiceId
            }, { withCredentials: true })
            toast.success(response.data.message)
            if (final.includes('add task')) {
                setTodos([...todos, response.data.newtask])
                setNewTodo('')
            }
            else if (transcript.toLowerCase().includes('delete this')) {

            }
            const audio = new Audio(response.data.voiceBuffer.data)
            await audio.play()
        } catch (error) {
            console.log('Error todo:', error)
        } finally {
            resetTranscript()
        }
    }

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/api/user/', { withCredentials: true })
            setTodos(response.data.allTasks)
        } catch (error) {
            console.log('Error fetching todos:', error)
        }
    }

    const detectWakeWord = async () => {
        try {
            const result = await startListening(); 
            console.log('Final Transcript:', result.toLowerCase().trim());

            if (!result.trim()) return;

            const response = await axios.post('/api/user/wakeup', {
                text:result.toLowerCase().trim().replaceAll(' ','')
            }, { withCredentials: true });

            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || "Bad Request");
            }

            setTimeout(() => {
                stopListening()
            }, 10000)

            if (response.data.voiceId) {
                setvoiceId(response.data.voiceId);
                const audio = new Audio(response.data.voiceBuffer.data);
                await audio.play();

                toast.success('Assistant wakeup successfully')
            }
            else {
                toast.error('Reload webpage to access ninja assistant services')
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Error detecting wake word:", error);
        }
    };

    useEffect(() => {
        if (!voiceId) detectWakeWord()
        fetchTodos();
    }, []);

    const addTodo = async (e) => {
        e.preventDefault()
        if (!newTodo.trim()) return
        try {
            const response = await axios.post('/api/user/add',
                { task: newTodo }, {
                withCredentials: true
            })
            setTodos([...todos, response.data.newtask])
            setNewTodo('')
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
            const response = await axios.put(`/api/user/${id}`, {
                task: editedTodoTitle
            }, { withCredentials: true })
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
            setEditTodo(null)
        } catch (error) {
            console.log('Error is', error)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/user/${id}`, { withCredentials: true })
            setTodos(todos.filter((todo) => todo._id !== id))
            toast.success('Task delete successfully')
        } catch (error) {
            console.log('delete todo:', error)
            toast.error('First complete task')
        }
    }

    const toggleTodo = async (id) => {
        try {
            const todo = todos.find((t) => t._id === id)
            const response = await axios.put(`/api/user/${id}`, { withCredentials: true })
            setTodos(todos.map((t) => t._id === id ? response.data.task : t))
        } catch (error) {
            console.log('Error is:', error)
        }
    }

    const openbot = () => {
        navigate('/chatbot')
    }

    return (
        <>
            {showModal === false ? (
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mb-4 shadow-lg">
                                <FaCheck className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-bold mb-2">
                                Ninja Todo
                            </h1>
                            <p className="text-gray-500 text-sm">Organize your tasks with style</p>
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
                                            {editTodo === todo.title ? (
                                                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg">
                                                    <input
                                                        className="flex-1 p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 text-gray-600 bg-white/80 backdrop-blur-sm"
                                                        type="text"
                                                        value={editTodo}
                                                        onChange={(e) => setEditTodo(e.target.value)}
                                                    />
                                                    <button
                                                        className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                        onClick={() => saveEdit(todo._id)}
                                                    >
                                                        <FaCheck className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                        onClick={() => setEditTodo(null)}
                                                    >
                                                        <FaX className="w-4 h-4" />
                                                    </button>
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
                                                        <span className={`text-gray-800 font-medium truncate ${todo.completed ? 'line-through opacity-60' : ''} transition-all duration-200`}>
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
            ) : (
                // Modal with improved design
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full mx-4 p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mb-4 shadow-lg">
                                <FaCheck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                Terms And Conditions
                            </h3>
                        </div>

                        <div className="space-y-4 text-gray-600 mb-8">
                            <p className="leading-relaxed">
                                With less than a month to go before the European Union enacts new
                                consumer privacy laws, companies around the world are updating
                                their terms of service.
                            </p>
                            <p className="leading-relaxed">
                                The G.D.P.R. goes into effect on May 25 and ensures a common set of
                                data rights in the EU.
                            </p>
                            <p className="leading-relaxed">
                                By using this application, you agree to our terms and conditions.
                                Your privacy and data security are important to us.
                            </p>
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
            <ToastContainer />
        </>
    )
}

export default Home
