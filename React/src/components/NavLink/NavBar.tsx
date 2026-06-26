import { NavLink } from "react-router";

export default function NavBar({ setIsSidebarOpen }: { setIsSidebarOpen: (value: boolean) => void }) {

    //función para pintar los botones cuando estén seleccionados
    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
            isActive 
                ? 'bg-slate-800 text-yellow-100 font-bold' 
                : 'text-gray-400 hover:bg-slate-800 hover:text-yellow-100'
        }`;

        return (
            <>
                                {/* CONTENEDOR SUPERIOR (Logo y Menú principal) */}
                    <div>

                        <div className="p-6 text-2xl font-bold border-b border-slate-700 flex justify-between items-center">
                            <span className="flex items-center gap-2">
                                <img src="/logo.png" alt="Logo de Antojitos" className="h-15 w-15 object-contain" />
                                <span>ANTOJITOS</span>
                            </span>
                            {/* Botón para cerrar la X en telefonos */}
                            <button className="lg:hidden text-base text-yellow-100 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
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

            </>
        )

}