import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { FaRobot, FaUser, FaX } from "react-icons/fa6"
import { IoSparkles } from "react-icons/io5"
import { MdSend } from "react-icons/md"


function ChatBot({ onClose }) {
    const [chat, setChat] = useState('')
    const [chats, setChats] = useState([])
    const [answers, setAnswers] = useState([])


    const messageEndRef = useRef(null);
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, answers]);

    const addchat = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user/bot', {
                userText: chat.toLowerCase()
            }, { withCredentials: true })

            const ans = response.data.response

            setChats(prev => [...prev, chat])
            setChat('')
            setAnswers(prev => [...prev, ans])
        } catch (error) {
            console.log('Error adding todo:', error)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm p-2 sm:p-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 w-full max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-scale-in">
                    {/* Header */}
                    <div className="p-6 pb-4">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200 cursor-pointer"
                        >
                            <FaX className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
                                <button className="relative bg-gradient-to-r from-violet-500 to-blue-500 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                                    <FaRobot className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                                    Ninja Chatbot
                                </h1>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat messages */}
                    <div className="px-6 max-h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {chats.length === 0 ? (
                            <div className="text-center py-12">
                                <IoSparkles className="w-12 h-12 text-violet-400 mx-auto mb-4 animate-bounce" />
                                <p className="text-gray-600 font-medium text-lg">How can I help you today?</p>
                                <p className="text-gray-400 text-sm mt-2">Ask me anything and I'll do my best to assist!</p>
                            </div>
                        ) : (
                            chats.map((msg, idx) => (
                                <div key={idx} className="space-y-3">
                                    {/* User message */}
                                    <div className="flex items-start justify-end space-x-3">
                                        <div className="bg-gradient-to-r from-violet-500 to-blue-500 text-white p-4 rounded-2xl rounded-tr-md shadow-lg max-w-[85%] animate-fade-in">
                                            <p className="text-sm text-pretty leading-relaxed">{msg}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                                                <FaUser className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bot answer */}
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                                                <FaRobot className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-800 p-4 rounded-2xl rounded-tl-md shadow-lg max-w-[85%] animate-fade-in">
                                            <p className="text-sm text-pretty leading-relaxed">{answers[idx]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messageEndRef} />
                    </div>

                    {/* Input form */}
                    <div className="p-6 pt-4">
                        <form onSubmit={addchat} className="relative">
                            <div className="flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                <input
                                    className="flex-1 outline-none px-6 py-4 text-gray-700 placeholder-gray-400 bg-transparent"
                                    type="text"
                                    value={chat}
                                    onChange={(e) => setChat(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button
                                    type="submit"
                                    disabled={!chat.trim()}
                                    className="flex items-center justify-center bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white lg:p-5 px-3 py-5 cursor-pointer whitespace-nowrap transition-all duration-300 hover:shadow-lg"
                                >
                                    <MdSend className="w-5 h-5 sm:w-4 sm:h-4 hover:translate-x-2.5 transition-transform duration-200" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBot

