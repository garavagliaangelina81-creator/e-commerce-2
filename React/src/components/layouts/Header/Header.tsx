import { useAuth } from '../../../context/UserContext'; 

export default function Header() {
  // usamos el contexto del usuario para consumir los datos del usuario logueado
  const { authState } = useAuth();

  return (
    <header className="w-full h-12 bg-gray-200 text-amber-950 dark:bg-slate-900 dark:text-yellow-100 flex items-center justify-center px-6 ">
      <h1 className="text-2xl font-bold">
        {/* validamos si existe el usuario y mostramos su nombre */}
        Hola {authState.usuario ? authState.usuario.nombre : 'Usuario'} 👋
      </h1>
    </header>
  );
}