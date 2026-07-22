import { useNavigate, useParams } from "react-router";
import { eliminarProducto, useProductoById } from "../../../services/UseProductos";
import { useState, useEffect } from "react";
import { API_URL } from "../../../const/api"; 

export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: producto, status } = useProductoById(
        id ? Number(id) : null
    );

    const [formulario, setFormulario] = useState({
        nombre: "",
        stock: 0,
        precio: 0,
        descripcion: "",
        imagen: "",
    });
    
    const [errores, setErrores] = useState({ nombre: "" });

    //cargar datos del producto recibido
    useEffect(() => {
        if (producto) {
            setFormulario({
                ...producto,
                nombre: producto.nombre || "",
                stock: Number(producto.stock) || 0,
                precio: Number(producto.precio) || 0,
                descripcion: producto.descripcion || "",
                imagen: producto.imagen || "",
            });
        }
    }, [producto]);

    //eliminar Producto
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

    const handleStockChange = (delta) => {
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

    const handleCancelar = () => {
        if (producto) {
            setFormulario({
                ...producto,
                nombre: producto.nombre || "",
                stock: Number(producto.stock) || 0,
                precio: Number(producto.precio) || 0,
                descripcion: producto.descripcion || "",
                imagen: producto.imagen || "",
            });
            setErrores({ nombre: "" });
        }
    };

    const handleGuardar = async (e) => {
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
        return <h2 className="text-white p-5">Cargando producto...</h2>;
    }

    if (!producto) {
        return <h2 className="text-white p-5">No se encontró el producto</h2>;
    }

    return (
        <div className="p-5 w-full text-white">
            
            {/* ENCABEZADO */}
            <header className="flex items-center justify-between mb-6 w-full">
                <h1 className="text-2xl font-semibold text-white">
                    Productos &gt; #{producto.id}
                </h1>

                <button
                    type="button"
                    onClick={handleEliminar}
                    className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-red-500 hover:text-white cursor-pointer"
                >
                    Eliminar
                </button>
            </header>

            <article className="rounded-xl border border-slate-800 bg-slate-800 p-6 shadow-xl space-y-5 w-full">
                
                {formulario.imagen ? (
                    <div className="relative w-60 h-60 rounded-xl overflow-hidden mb-4 border border-slate-700">
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
                    <div className="w-60 h-60 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-slate-400 mb-4">
                        Sin Imagen
                    </div>
                )}

                <form onSubmit={handleGuardar} className="space-y-4 w-full">
                    
                
                    <div>
                        <label className="block mb-2 font-medium text-sm text-slate-300">
                            URL de la Imagen
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formulario.imagen || ""}
                                onChange={(e) =>
                                    setFormulario({ ...formulario, imagen: e.target.value })
                                }
                                className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100"
                                placeholder="/img/ejemplo.jpg o https://..."
                            />
                            {formulario.imagen && (
                                <button
                                    type="button"
                                    onClick={handleRemoverImagen}
                                    className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transition"
                                >
                                    Remover Imagen
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-sm text-slate-300">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            value={formulario.nombre || ""}
                            onChange={(e) =>
                                setFormulario({ ...formulario, nombre: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        />
                        {errores?.nombre ? (
                            <p className="text-red-400 text-xs mt-1">{errores.nombre}</p>
                        ) : null}
                    </div>

                    <p className="text-slate-300">
                        <strong>Identificador:</strong> #{producto.id}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
    
                        <div>
                            <label className="block mb-2 font-medium text-sm text-slate-300">
                                Stock
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleStockChange(-1)}
                                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-lg font-bold border border-slate-600 cursor-pointer"
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
                                    className="w-full text-center rounded-lg border border-slate-600 bg-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleStockChange(1)}
                                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-lg font-bold border border-slate-600 cursor-pointer"
                                >
                                    ➕
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-sm text-slate-300">
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
                                className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100"
                            />
                        </div>
                    </div>

                    <p className="text-slate-300">
                        <strong>Categoría / Tienda:</strong>{" "}
                        {producto.categoriaId || producto?.["tienda"] || "General"}
                    </p>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-slate-300">
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
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                        <button
                            type="button"
                            onClick={handleCancelar}
                            className="px-5 py-2 rounded-full border border-slate-600 hover:bg-slate-700 text-sm font-medium transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-slate-900 text-sm font-semibold transition cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>

                </form>

            </article>
        </div>
    );
}