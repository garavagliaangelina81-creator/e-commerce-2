import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/UserContext';
import { loginServicio } from '../services/LoginServicio';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await loginServicio(email, password);
            login(data.token, data.usuario);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-amber-900/70 dark:text-slate-400">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-amber-900/30 bg-white px-3 py-2.5 text-amber-950 shadow-sm outline-none transition focus:border-amber-950 focus:ring-2 focus:ring-amber-950/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-yellow-100 dark:focus:ring-yellow-100/20"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-amber-900/70 dark:text-slate-400">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-amber-900/30 bg-white px-3 py-2.5 text-amber-950 shadow-sm outline-none transition focus:border-amber-950 focus:ring-2 focus:ring-amber-950/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-yellow-100 dark:focus:ring-yellow-100/20"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-amber-200 px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-950 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-yellow-100 dark:text-slate-900 dark:hover:bg-slate-950 dark:hover:text-yellow-100"
            >
                {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
        </form>
    );
};

export default LoginForm;