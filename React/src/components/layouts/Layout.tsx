import { useState } from 'react';
import { Link, Outlet } from 'react-router'; 



export default function Layout() { //estructura general de la UI

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // estado para controlar si la barra lateral esta abierta o cerrada


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
                    
                    <NavBar />

                </aside>

                {/* Main area */}
                <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
                    <Outlet /> {/*sirve para poner la "pantalla" de las secciones que estan en el sidebar*/}
                    
                </main>
            </div>
            </div>
        </> 
    );

    }