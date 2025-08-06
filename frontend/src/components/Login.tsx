import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Handle successful login (e.g., store token, redirect)
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;