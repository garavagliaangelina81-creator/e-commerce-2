import { useNavigate } from 'react-router';
import { useAuth } from '../context/UserContext';

const Perfil = () => {
    // traemos la función logout y el estado del usuario desde el user context
    const { logout, authState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // se ejecuta la funcion logout para limpiar los datos
        logout();
        
        // se navega hasta la página login
        navigate('/login');
    };

    return (
        <div className="p-8 text-amber-950 dark:text-slate-100">
            <h1 className="mb-6 text-3xl font-bold">Mi perfil</h1>
            
            {/* muestra los datos del usuario logueado */}
            {authState.usuario && (
                <div className="mb-8 rounded-lg border border-amber-900/20 bg-amber-100 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
                    <p className="mb-2"><strong className="font-semibold">Nombre:</strong> {authState.usuario.nombre}</p>
                    <p><strong className="font-semibold">Rol:</strong> {authState.usuario.rol}</p>
                </div>
            )}

            <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 dark:hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default Perfil;