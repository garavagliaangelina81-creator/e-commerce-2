import { useNavigate, useParams } from "react-router"; 
import { useCategorias } from "../../../hooks/useCategorias"; 
import { eliminarCategoria } from "../../../services/CategoriaServicio"; 

export default function CategoryView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, status } = useCategorias(); 


    const categoria = data 
        ? (Array.isArray(data) ? data.find(c => c.categoria_id === Number(id)) : data) 
        : null;

    async function handleEliminar() {
        if (!id) return;

        const confirmado = window.confirm(`¿Seguro que querés eliminar la categoría #${id}?`);
        if (!confirmado) return;

        const eliminado = await eliminarCategoria(Number(id));

        if (eliminado) {
            alert("Categoría eliminada correctamente");
            navigate("/categorias"); 
        } else {
            alert("Error al eliminar la categoría");
        }
    }

    function handleModificar() {
        navigate(`/categorias/editar/${id}`);
    }

    if (status === "loading") {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Cargando categoría...</p>;
    }

    if (status === "error" || !categoria) {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Error al cargar la categoría o no encontrada.</p>;
    }

    return (
        
        <main className="min-h-full mt-4 bg-gray-200 p-4 text-amber-950 dark:bg-slate-900 dark:text-slate-100 sm:p-6">
            <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 p-4 dark:border-slate-950 dark:bg-slate-950/40 sm:p-6">
                
                <header className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">
                        Detalle de categoría
                    </h2>
                </header>

                <article className="flex flex-col gap-4 rounded-xl border border-amber-950 bg-amber-100 px-6 py-6 dark:border-slate-800 dark:bg-slate-800/80">
                    
                    <div>
                        <p className="mb-1 text-sm font-medium text-amber-900/70 dark:text-slate-400">ID</p>
                        <p className="text-lg font-semibold text-amber-950 dark:text-slate-200">#{categoria.categoria_id}</p>
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-medium text-amber-900/70 dark:text-slate-400">Nombre de la categoría</p>
                        <p className="text-xl font-medium text-amber-950 dark:text-white">{categoria.nombre_categoria}</p>
                    </div>

                    <div className="mt-8 flex justify-between items-center border-t border-amber-900/20 pt-5 dark:border-slate-700">
                        

                        <button type="button" onClick={() => navigate("/categoriesList")} className="cursor-pointer rounded-full border border-amber-950 px-5 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-950 hover:text-amber-200 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                            ← Volver a la lista
                        </button>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleEliminar}
                                className="cursor-pointer rounded-full border border-red-500 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white dark:text-red-400 dark:hover:bg-red-500"
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                onClick={handleModificar}
                                className="cursor-pointer rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 dark:hover:bg-slate-950 dark:hover:text-yellow-100"
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                </article>

            </section>
            
        </main>
    );
}