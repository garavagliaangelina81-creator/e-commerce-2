// src/components/LoginForm.tsx
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
            // Llamamos a nuestro servicio separado
            const data = await loginServicio(email, password);
            
            // Guardamos la sesión en el contexto global
            login(data.token, data.usuario);
            
            // Redirigimos al panel de administración (Layout principal)
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={styles.errorBox}>{error}</div>}
            
            <div style={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                    type="email" 
                    id="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={styles.input}
                    disabled={isLoading}
                />
            </div>
            
            <div style={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={styles.input}
                    disabled={isLoading}
                />
            </div>
            
            <button type="submit" style={styles.button} disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
        </form>
    );
};

// Estilos básicos en línea para mantener el componente ordenado
const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '15px' },
    inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '5px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    button: { padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    errorBox: { padding: '10px', backgroundColor: '#ffcccc', color: '#cc0000', borderRadius: '4px', textAlign: 'center' as const }
};

export default LoginForm;