import { useState } from 'react';
import { Link, Outlet } from 'react-router'; //IMPORTAR OUTLET DESPUES
import Home from '../../pages/home/Home';



export default function Layout() { //estructura general de la UI

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // estado para controlar si la barra lateral esta abierta o cerrada


    return (
        <>
            <div className="flex h-screen bg-slate-900 overflow-hidden relative"> {/*contenedor principal con flexbox para organizar el layout */}
                {/*boton para abrir la barra lateral en dispositivos pequeños, cuando se haga clic cambia el estado de isSidebarOpen */}
                <button className="lg:hidden absolute top-5 left-5 z-10 p-5 bg-slate-950 text-white rounded-md hover:text-purple-700" onClick={() => setIsSidebarOpen(true)}>
                    ☰ 
                </button>
                {/* fondo transparente para cuando el menu esta abierto en dispositivos moviles*/}
                {isSidebarOpen && <div className="fixed inset-0 bg-slate-900 opacity-50 z-10" onClick={() => setIsSidebarOpen(false)}></div>}
                {/* Sidebar (se esconde cuando la pantalla tenga )*/} 
                <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-white flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
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
        
                    <nav className="p-4 flex flex-col items-center gap-5 ">
                        <Link to="/" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Inicio</Link>
                        <Link to="/products" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Productos</Link>
                        <Link to="/categories" className="hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>Categorías</Link>
                    </nav>
                </aside>

                {/* Main area */}
                <main className="flex-1 overflow-y-auto p-6 pt-4 w-full">
                    <Outlet /> {/*sirve para poner la "pantalla" de las secciones que estan en el sidebar*/}
                    
                </main>
            </div>
        </> 

    );
}