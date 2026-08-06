import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-10 text-amber-950 dark:bg-slate-900 dark:text-slate-100">
            <div className="w-full max-w-md rounded-2xl border border-amber-950/20 bg-amber-100 p-8 shadow-xl shadow-black/10 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">
                        Iniciar sesión
                    </h2>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default Login;