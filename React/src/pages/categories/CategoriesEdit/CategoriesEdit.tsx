import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useCategorias } from "../../../hooks/useCategorias";
import { API_URL } from "../../../const/api"; 

export default function CategoriesEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, status } = useCategorias(); 
    const categoria = data 
        ? (Array.isArray(data) ? data.find(c => c.categoria_id === Number(id)) : data) 
        : null;

    const [formulario, setFormulario] = useState({
        nombre_categoria: "",
    });
    
    const [error, setError] = useState("");

    useEffect(() => {
        if (categoria) {
            setFormulario({
                nombre_categoria: categoria.nombre_categoria,
            });
        }
    }, [categoria]);

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 

        if (!formulario.nombre_categoria || !formulario.nombre_categoria.trim()) {
            setError("El nombre de la categoría es requerido.");
            return;
        }

        try {
            const baseUrl = API_URL; 
            
            const response = await fetch(`${baseUrl}/api/categorias/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formulario),
            });

            if (response.ok) {
                alert("Categoría modificada correctamente");
                navigate("/categorias"); 
            } else {
                setError("Error al modificar la categoría en el servidor");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("Error de conexión al intentar modificar.");
        }
    };

    if (status === "loading") {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Cargando datos de la categoría...</p>;
    }

    if (status === "error" || !categoria) {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Error al cargar la categoría o no encontrada.</p>;
    }

    return (
        <main className="min-h-full mt-4 bg-gray-200 p-4 text-amber-950 dark:bg-slate-900 dark:text-slate-100 sm:p-6">
            <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 p-4 dark:border-slate-950 dark:bg-slate-950/40 sm:p-6">
                
                <header className="border-b border-amber-950 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">
                        Modificar categoría #{id}
                    </h2>
                </header>

                <article className="flex flex-col gap-4 rounded-xl border border-amber-950 bg-amber-100 px-6 py-6 dark:border-slate-800 dark:bg-slate-800/80">
                    
                    <form onSubmit={handleGuardar} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                Nombre de la categoría 
                            </label>
                            <input
                                type="text"
                                value={formulario.nombre_categoria}
                                onChange={(e) =>
                                    setFormulario({ ...formulario, nombre_categoria: e.target.value })
                                }
                                placeholder="Ej. Accesorios, Indumentaria..."
                                className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                            />
                            {error && (
                                <p className="mt-1 text-xs font-semibold text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 flex justify-end gap-4 border-t border-amber-900/20 pt-5 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => navigate("/categoriesList")}
                                className="cursor-pointer rounded-full border border-amber-950 px-5 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-950 hover:text-amber-200 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 dark:hover:bg-slate-950 dark:hover:text-yellow-100"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>

                </article>
            </section>
        </main>
    );
}