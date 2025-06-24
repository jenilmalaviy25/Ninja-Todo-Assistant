import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaX, FaUser, FaGlobe, FaCheck, FaBarsProgress } from 'react-icons/fa6'
import { IoLogInOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserProfile = ({ onClose }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isEditing, setEditing] = useState(false)
    const [tempusername, setTempname] = useState('')
    const [tempemail, setTempemail] = useState('')
    const [avg, setAvg] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
        setEmail(localStorage.getItem('email'))
        taskPogress()
    }, [])

    async function taskPogress() {
        try {
            const response = await axios.post('/api/user/pogress', {}, { withCredentials: true })
            setAvg(response.data.avarage)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = () => {
        setEditing(true)
        setTempname(username)
        setTempemail(email)
    }

    const handleSave = async () => {
        try {
            const response = await axios.put('/api/user/update', {
                username: tempusername,
                email: tempemail
            }, { withCredentials: true })
            setUsername(tempusername)
            setEmail(tempemail)
            setEditing(false)
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('email', response.data.user.email)
            toast.success(response.data.message)
        } catch (error) {
            console.log('Error is:', error)
        }
    }

    const handleCancel = () => {
        setUsername(username)
        setEmail(email)
        setEditing(false)
    }

    const logout = async () => {
        localStorage.clear()
        try {
            const response = await axios.post('/api/user/logout', {}, { withCredentials: true })
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm p-2 sm:p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 w-full max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-scale-in">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-violet-500 to-blue-500 p-4 sm:p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                        <FaX className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <div className="text-center">
                        <div className="relative inline-block mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-3 sm:border-4 border-white/30">
                                <FaUser className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
                            </div>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold truncate px-2">{username}</h2>
                        <p className="text-white/80 text-xs sm:text-sm truncate px-2">{email}</p>
                    </div>
                </div>

                <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm overflow-y-auto max-h-[60vh] sm:max-h-96 scrollbar-hide animate-scale-in">
                    <div className="space-y-4 sm:space-y-6">

                        {/* Profile Actions */}
                        <div className="flex justify-end">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                                >
                                    <MdEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Edit Profile</span>
                                    <span className="xs:hidden">Edit</span>
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-400 to-green-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                                    >
                                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={tempusername}
                                        onChange={(e) => setTempname(e.target.value)}
                                        className="w-full p-2 sm:p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 bg-white/80 text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-100/50 p-2 sm:p-3 rounded-lg text-sm sm:text-base break-words">{username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={tempemail}
                                        onChange={(e) => setTempemail(e.target.value)}
                                        className="w-full p-2 sm:p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 bg-white/80 text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-100/50 p-2 sm:p-3 rounded-lg text-sm sm:text-base break-words">{email}</p>
                                )}
                            </div>
                        </div>

                        {/* Settings Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-100/50 rounded-lg hover:bg-gray-100/50 transition-colors duration-200">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                    <FaBarsProgress className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium text-sm sm:text-base truncate">Task Progress</span>
                                </div>
                                <span className={` font-medium text-sm sm:text-base truncate ${avg < 50 ? 'text-red-600' : 'text-gray-700'}`}>{avg}%</span>
                            </div>

                            <button
                                className="w-full flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 mt-4 sm:mt-8 text-sm sm:text-base"
                                onClick={logout}
                            >
                                <IoLogInOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;