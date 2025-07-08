import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa6'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        localStorage.clear()
    },[])
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                username: username,
                password: password
            },{withCredentials:true})
            if (response.status === 200) {
                const result = response.data
                localStorage.setItem('_id', result.existuser._id);
                localStorage.setItem('username', result.existuser.username);
                localStorage.setItem('email', result.existuser.email)
                navigate('/home');
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                            <FaUser className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to meet our ninja assistant</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {/* Email Field */}
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

                            {/* Password Field */}
                            <div className="space-y-2">
                                <span className="text-gray-700 font-medium">
                                    Password
                                </span>
                                <div className="relative mt-2">
                                    <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Enter password here"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border outline-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg group"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Signup Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default Login;