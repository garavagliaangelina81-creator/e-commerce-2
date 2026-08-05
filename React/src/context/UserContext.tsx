import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'; // Aquí especificamos que es un tipo

// Interfaces que aseguran el tipado de los datos que vienen del backend
export interface Usuario {
    nombre: string;
    rol: string;
}

export interface AuthState {
    usuario: Usuario | null;
    token: string | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (token: string, usuario: Usuario) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Componente Proveedor que envuelve la aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    // El estado busca primero en localStorage para no perder la sesión al recargar
    const [authState, setAuthState] = useState<AuthState>(() => {
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');
        
        if (tokenGuardado && usuarioGuardado) {
            return { token: tokenGuardado, usuario: JSON.parse(usuarioGuardado) };
        }
        return { token: null, usuario: null };
    });

    // Guarda el token y el usuario en estado y en localStorage
    const login = (token: string, usuario: Usuario) => {
        setAuthState({ token, usuario });
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    };

    // Limpia la sesión
    const logout = () => {
        setAuthState({ token: null, usuario: null });
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};