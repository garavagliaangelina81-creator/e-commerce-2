import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div style={styles.pageContainer}>
            <div style={styles.card}>
                <h2 style={styles.title}>Panel de Administración</h2>
                <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>
                
                {/* Instanciamos nuestro componente de formulario independiente */}
                <LoginForm />
                
            </div>
        </div>
    );
};

// Estilos para centrar la tarjeta de login en la pantalla
const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9'
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    title: { marginTop: 0, textAlign: 'center' as const, color: '#333' },
    subtitle: { textAlign: 'center' as const, color: '#666', marginBottom: '20px' }
};

export default Login;