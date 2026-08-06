import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../context/UserContext'; 

const RutaProtegida = ({ rolRequerido }: { rolRequerido?: string }) => {
    // Obtenemos los datos globales del usuario desde el Contexto
    const context = useContext(AuthContext);
    
    // Si el contexto no existe, por seguridad bloqueamos el paso
    if (!context) return <Navigate to="/login" replace />;
    
    const { authState } = context;
    
    if (!authState.token || !authState.usuario) {
        return <Navigate to="/login" replace />;
    }

    if (rolRequerido && authState.usuario.rol !== rolRequerido) {
        return <Navigate to="/login" replace />;
    }

    // Si pasó todas las validaciones anteriores, <Outlet /> renderiza  todas las rutas hijas
    return <Outlet />;
};

export default RutaProtegida;