import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const { login, loading, error, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const registrationSuccess = new URLSearchParams(location.search).get("registrationSuccess");

    // Redirect logic: If user is already logged in, go to home page
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Sign in to your account
                </h2>
                
                {/* Success Message for Registration */}
                {registrationSuccess && (
                    <div className="p-3 bg-green-100 text-green-700 text-sm rounded-lg text-center border border-green-300">
                        Registration successful! Please sign in.
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center border border-red-300">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition duration-300 
                            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg'}`}
                    >
                        {loading ? 'Logging In...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center text-base text-gray-600">
                    Don't have an account? 
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        Sign up here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;