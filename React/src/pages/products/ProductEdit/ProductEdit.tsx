import { useNavigate, useParams } from "react-router";
import { eliminarProducto } from "../../../services/ProductosService";
import { useProductoPorId } from "../../../hooks/useProductos";
import { useState, useEffect } from "react";
import { API_URL } from "../../../const/api"; 

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: producto, status } = useProductoPorId(
        id ? Number(id) : null
    );

    const [formulario, setFormulario] = useState({
        nombre: "",
        stock: 0,
        precio: 0,
        descripcion: "",
        imagen: "",
        categoria_id: 0, 
    });
    
    const [errores, setErrores] = useState({ nombre: "" });

    // cargar datos del producto recibido
    useEffect(() => {
        if (producto) {
            setFormulario({
                ...producto,
                nombre: producto.nombre || "",
                stock: Number(producto.stock) || 0,
                precio: Number(producto.precio) || 0,
                descripcion: producto.descripcion || "",
                imagen: producto.imagen || "",
                categoria_id: Number(producto.categoria_id) || 0, 
            });
        }
    }, [producto]);

    // eliminar Producto
    async function handleEliminar() {
        if (!id) return;

        const confirmado = window.confirm(`¿Seguro que querés eliminar el producto #${id}?`);
        if (!confirmado) return;

        const eliminado = await eliminarProducto(Number(id));

        if (eliminado) {
            alert("Producto eliminado correctamente");
            navigate("/products");
        } else {
            alert("Error al eliminar el producto");
        }
    }

    const handleStockChange = (delta: number) => {
        setFormulario((prev) => ({
            ...prev,
            stock: Math.max(0, (prev.stock || 0) + delta),
        }));
    };

    const handleRemoverImagen = () => {
        setFormulario((prev) => ({
            ...prev,
            imagen: "",
        }));
    };

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrores({ nombre: "" });

        if (!formulario.nombre || !formulario.nombre.trim()) {
            setErrores({ nombre: "El nombre es requerido." });
            return;
        }

        const bodyPayload = {
            ...formulario,
            precio: Number(formulario.precio) || 0,
            stock: Number(formulario.stock) || 0,
            categoria_id: Number(formulario.categoria_id) || 0, // Aseguramos que se envíe numérico
        };

        try {
            const baseUrl = API_URL || "http://localhost:3000";
            const response = await fetch(`${baseUrl}/api/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            });

            if (response.ok) {
                alert("Producto actualizado correctamente");
            } else {
                alert("Error al guardar los cambios");
            }
        } catch (error) {
            console.error("Error guardando cambios:", error);
            alert("Error de conexión al guardar los cambios");
        }
    };

    if (status === "loading") {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Cargando producto...</p>;
    }

    if (!producto) {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">No se encontró el producto</p>;
    }

    return (
        <main className="min-h-full mt-4 bg-gray-200 p-4 text-amber-950 dark:bg-slate-900 dark:text-slate-100 sm:p-6">
            <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 p-4 dark:border-slate-950 dark:bg-slate-950/40 sm:p-6">
                
                <header className="flex items-center justify-between border-b border-amber-950 dark:border-slate-800 pb-4 w-full">
                    <h1 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">
                        Productos &gt; #{producto.id}
                    </h1>

                    <button type="button" onClick={handleEliminar} className="cursor-pointer rounded-full border border-red-500 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white dark:text-red-400 dark:hover:bg-red-500">
                        Eliminar
                    </button>
                </header>

                <article className="flex flex-col gap-4 rounded-xl border border-amber-950 bg-amber-100 px-6 py-6 dark:border-slate-800 dark:bg-slate-800/80">
                    
                    {formulario.imagen ? (
                        <div className="relative w-60 h-60 rounded-xl overflow-hidden mb-4 border border-amber-900/30 dark:border-slate-700">
                            <img
                                src={
                                    formulario.imagen.startsWith("http")
                                        ? formulario.imagen
                                        : `http://localhost:3000${formulario.imagen}`
                                }
                                alt={formulario.nombre || "Producto"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-60 h-60 rounded-xl border border-dashed border-amber-900/40 flex items-center justify-center text-amber-900/60 dark:border-slate-600 dark:text-slate-400 mb-4">
                            Sin imagen
                        </div>
                    )}

                    <form onSubmit={handleGuardar} className="space-y-4 w-full">
                        
                        <div>
                            <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                URL de la imagen
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formulario.imagen || ""}
                                    onChange={(e) =>
                                        setFormulario({ ...formulario, imagen: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                                    placeholder="/img/ejemplo.jpg o https://..."
                                />
                                {formulario.imagen && (
                                    <button type="button" onClick={handleRemoverImagen} className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition">
                                        Remover Imagen
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    value={formulario.nombre || ""}
                                    onChange={(e) =>
                                        setFormulario({ ...formulario, nombre: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                                />
                                {errores?.nombre ? (
                                    <p className="mt-1 text-xs font-semibold text-red-600 dark:text-red-400">{errores.nombre}</p>
                                ) : null}
                            </div>
                            
                            <div>
                                <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                    ID de categoría
                                </label>
                                <input type="number" value={formulario.categoria_id || ""} onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            categoria_id: Number(e.target.value),
                                        })
                                    }
                                    className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                                    placeholder="Ej: 1"
                                />
                            </div>
                        </div>

                        <p className="text-amber-950 dark:text-slate-300">
                            <strong>ID de producto:</strong> #{producto.id}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                    Stock
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleStockChange(-1)}
                                        className="px-3 py-2 bg-amber-200 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg font-bold border border-amber-900/30 dark:border-slate-600 cursor-pointer text-amber-950 dark:text-white transition"
                                    >
                                        ➖
                                    </button>
                                    <input
                                        type="number"
                                        value={formulario.stock ?? 0}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                stock: Number(e.target.value),
                                            })
                                        }
                                        className="w-full text-center rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleStockChange(1)}
                                        className="px-3 py-2 bg-amber-200 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg font-bold border border-amber-900/30 dark:border-slate-600 cursor-pointer text-amber-950 dark:text-white transition"
                                    >
                                        ➕
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                    Precio ($)
                                </label>
                                <input
                                    type="number"
                                    value={formulario.precio ?? 0}
                                    onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            precio: Number(e.target.value),
                                        })
                                    }
                                    className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-amber-900/70 dark:text-slate-400">
                                Descripción
                            </label>
                            <textarea
                                value={formulario.descripcion || ""}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        descripcion: e.target.value,
                                    })
                                }
                                rows={4}
                                className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 resize-none focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-amber-900/20 dark:border-slate-700">
                                <button type="button" onClick={() => navigate("/products")} className="px-5 py-2 rounded-full border border-slate-600 hover:bg-slate-700 text-sm font-medium transition cursor-pointer">
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