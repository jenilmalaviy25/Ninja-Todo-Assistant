import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaX, FaUser, FaBell, FaGlobe, FaCheck } from 'react-icons/fa6'
import { IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserProfile = ({ onClose }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isEditing, setEditing] = useState(false)
    const [tempusername, setTempname] = useState('')
    const [tempemail, setTempemail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
        setEmail(localStorage.getItem('email'))
    }, [])

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
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('email', response.data.email)
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
            await axios.post('/api/user/logout', { withCredentials: true })
            toast.success('Logout successfully')
            navigate('/')
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-violet-500 to-blue-500 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                        <FaX className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30">
                                <FaUser className="w-8 h-8 text-white/80" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold">{username}</h2>
                        <p className="text-white/80 text-sm">{email}</p>
                    </div>
                </div>

                <div className="p-6 bg-white/80 backdrop-blur-sm overflow-y-auto max-h-96">

                    <div className="space-y-6">
                        {/* Profile Actions */}
                        <div className="flex justify-end">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                >
                                    <MdEdit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                    >
                                        <FaCheck className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={tempusername}
                                        onChange={(e) => setTempname(e.target.value)}
                                        className="w-full p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 bg-white/80"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-50/50 p-3 rounded-lg">{username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={tempemail}
                                        onChange={(e) => setTempemail(e.target.value)}
                                        className="w-full p-3 border border-gray-300/50 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 bg-white/80"
                                    />
                                ) : (
                                    <p className="text-gray-800 bg-gray-50/50 p-3 rounded-lg">{email}</p>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <FaBell className="w-5 h-5 text-violet-500" />
                                <span className="text-gray-700 font-medium">Notifications</span>
                            </div>
                            <button className={`w-12 h-6  rounded-full relative cursor-pointer bg-violet-500`}>
                                <div className={`w-5 h-5 bg-white rounded-full absolute  top-0.5 shadow-lg right-0.5`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <FaGlobe className="w-5 h-5 text-violet-500" />
                                <span className="text-gray-700 font-medium">Language</span>
                            </div>
                            <span className="text-gray-500">English</span>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 mt-8" onClick={logout}>
                            <IoLogInOutline className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;