import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail, MdLock } from 'react-icons/md'
import { FaUser } from 'react-icons/fa6'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'




function Signup() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)

    const register = async (e) => {
        e.preventDefault();
        setLoad(true)
        const emailvalida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailvalida.test(email)) toast.error('Plz enter valid email')
        if (password.length < 4) toast.error('Plz add few words in password')
        try {
            const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/user/register`, {
                username: username,
                email: email,
                password: password
            })
            toast.success(response?.data?.message || 'Account create successfull')
            if (response.status === 200) {
                navigate('/')
            }
            else throw new Error(response.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                            <FaUser className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join us and meet our ninja assistant</p>
                    </div>

                    {/* Signup Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                        <form className="space-y-6" onSubmit={register}>
                            {/* Name Fields */}
                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <span className="text-gray-600 font-medium">
                                        Username
                                    </span>
                                    <div className="relative mt-2">
                                        <FaUser className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter username here"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className=" w-full pl-10 pr-4 py-2 border outline-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <span className="text-gray-600 font-medium">
                                    Email
                                </span>
                                <div className="relative mt-2">
                                    <MdEmail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type='email'
                                        placeholder="ex.john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className=" w-full pl-10 pr-4 py-2 border outline-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <span htmlFor="password" className="text-gray-700 font-medium">
                                    Password
                                </span>
                                <div className="relative mt-2">
                                    <MdLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type='text'
                                        placeholder="Enter password here"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className=" w-full pl-10 pr-12 py-2 border outline-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg group"
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to={'/'} className="text-blue-600 hover:text-blue-700 font-semibold underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}

export default Signup
