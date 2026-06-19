import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

export default function Layout() { //estructura general de la UI

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // estado para controlar si la barra lateral esta abierta o cerrada

    //función para pintar los botones cuando estén seleccionados
    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
            isActive 
                ? 'bg-slate-800 text-white font-bold' 
                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
        }`;

    return (
        <>
            <div className="flex h-screen bg-slate-900 overflow-hidden relative"> {/*contenedor principal con flexbox para organizar el layout */}
                
                {/*boton para abrir la barra lateral en dispositivos pequeños*/}
                <button className="lg:hidden absolute top-5 left-5 z-20 p-2 bg-slate-950 text-white rounded-md hover:text-purple-700 " onClick={() => setIsSidebarOpen(true)}>
                    ☰ 
                </button>
                
                {/* fondo transparente para cuando el menu esta abierto en dispositivos moviles*/}
                {isSidebarOpen && <div className="fixed inset-0 bg-slate-900 opacity-50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
                
                {/* Sidebar Agregué justify-between para separar el menú del perfil */} 
                <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
                    
                    {/* CONTENEDOR SUPERIOR (Logo y Menú principal) */}
                    <div>
                        <div className="p-6 text-2xl font-bold border-b border-slate-700 flex justify-between items-center">
                            <span className="flex items-center gap-2">
                                <img src="/logo.png" alt="Logo de Antojitos" className="h-10 w-10 object-contain" />
                                <span>ANTOJITOS</span>
                            </span>
                            {/* Botón para cerrar la X en telefonos */}
                            <button className="lg:hidden text-gray-200 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                                ✕
                            </button>
                        </div>
            
                        <nav className="p-4 flex flex-col items-center gap-2">
                            {/* CAMBIO CLAVE: Usar NavLink y className={linkClasses} */}
                            <NavLink to="/" className={linkClasses} onClick={() => setIsSidebarOpen(false)}>🏠 Inicio</NavLink>
                            <NavLink to="/products" className={linkClasses} onClick={() => setIsSidebarOpen(false)}>📦 Productos</NavLink>
                            <NavLink to="/categoriesList" className={linkClasses} onClick={() => setIsSidebarOpen(false)}>🏷️ Categorías</NavLink>
                        </nav>
                    </div>

                    {/*  CONTENEDOR INFERIOR (Perfil al fondo) */}
                    <div className="p-4 border-t border-slate-800">
                        <NavLink to="/profile" className={linkClasses} onClick={() => setIsSidebarOpen(false)}>
                            👤 Perfil
                        </NavLink>
                    </div>

                </aside>

                {/* Main area */}
                <main className="flex-1 overflow-y-auto px-4 py-6 pt-16 lg:pt-6 sm:px-6 lg:px-8 w-full">
                    <Outlet /> 
                </main>
            </div>
        </> 
    );
}