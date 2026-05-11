import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // Note: We only send username, email, and password to the backend
            const { confirmPassword, ...dataToSend } = credentials; 
            
            await axios.post(`/api/auth/register`, dataToSend);
            
            // Successful registration, redirect to login page
            navigate('/login?registrationSuccess=true');

        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data || "Registration failed. Please check your inputs.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Create Your Account
                </h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="you@example.com"
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
                            placeholder="Minimum 6 characters"
                            required
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Re-enter password"
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
                        {loading ? 'Processing...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-base text-gray-600">
                    Already have an account? 
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;