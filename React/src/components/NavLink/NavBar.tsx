import { NavLink } from "react-router";

export default function NavBar({ setIsSidebarOpen }: { setIsSidebarOpen: (value: boolean) => void }) {

    //función para pintar los botones cuando estén seleccionados
    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
            isActive 
                ? 'bg-amber-100 text-amber-950 dark:bg-slate-800 dark:text-yellow-100 font-bold' 
                : 'bg-amber-200 text-amber-950 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-yellow-100'


        }`;

        return (
            <div className="flex flex-col h-full">
                                {/* CONTENEDOR SUPERIOR (Logo y Menú principal) */}
                    <div>

                        <div className="p-6 text-2xl font-bold border-b border-amber-950 dark:border-slate-700 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <picture>
                                    <source media="(prefers-color-scheme: light)" srcSet="/logoClaro.png" />
                                    <source media="(prefers-color-scheme: dark)" srcSet="/logo.png" />
                                    <img src="/logoOscuro.png" alt="Logo de Antojitos" className="h-15 w-15 object-contain" />
                                </picture>
                                <span>ANTOJITOS</span>
                            </span>
                            {/* Botón para cerrar la X en telefonos */}
                            <button className="p-1.5 lg:hidden text-base text-amber-950 hover:text-amber-900 dark:text-yellow-100 dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}>
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
                    <div className="mt-auto p-4 border-t border-slate-800 flex flex-col gap-3">
                        <NavLink to="/profile" className={linkClasses} onClick={() => setIsSidebarOpen(false)}>
                            👤 Perfil
                        </NavLink>

                    </div>

            </div>
        )

}