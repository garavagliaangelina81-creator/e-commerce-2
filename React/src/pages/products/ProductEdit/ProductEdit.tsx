import { useNavigate, useParams } from "react-router";
import { eliminarProducto } from "../../../services/ProductosService";
import { useProductoPorId } from "../../../hooks/useProductos";
import { useState, useEffect } from "react";
import { API_URL } from "../../../const/api"; 

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    //Obtenemos el producto actual desde el backend
    const { data: producto, status } = useProductoPorId(
        id ? Number(id) : null
    );

    //Estado del formulario (sin campos de URL externa)
    const [formulario, setFormulario] = useState({
        nombre: "",
        stock: 0,
        precio: 0,
        descripcion: "",
        imagenActual: "", // Guarda la ruta que ya está en SQLite (ej: "/img/foto.jpg")
        categoria_id: ""
    });
    
    // Estado exclusivo para el archivo físico que elija de su computadora
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [errores, setErrores] = useState({ nombre: "" });

    //Cuando llega la data del backend, rellenamos el formulario
    useEffect(() => {
        if (producto) {
            setFormulario({
                nombre: producto.nombre || "",
                stock: Number(producto.stock) || 0,
                precio: Number(producto.precio) || 0,
                descripcion: producto.descripcion || "",
                imagenActual: producto.imagen || "",
                categoria_id: String(producto.categoria_id || "")
            });
            setImagenFile(null);
        }
    }, [producto]);

    // Lógica para eliminar producto
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

    const handleCancelar = () => {
        navigate("/products");
    };

    const handleVolver = () => {
        navigate("/products");
    };

    // ENVÍO DEL FORMULARIO CON FORMDATA
   const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrores({ nombre: "" });

        if (!formulario.nombre || !formulario.nombre.trim()) {
            setErrores({ nombre: "El nombre es requerido." });
            return;
        }

        const formData = new FormData();
        formData.append("nombre", formulario.nombre);
        formData.append("precio", String(Number(formulario.precio) || 0));
        formData.append("stock", String(Number(formulario.stock) || 0));
        formData.append("descripcion", formulario.descripcion || "");
        formData.append("categoria_id", String(Number(formulario.categoria_id) || 1));
        formData.append("imagen", formulario.imagenActual || "");

        if (imagenFile) {
            formData.append("imagen", imagenFile);
        }

        try {
            const baseUrl = API_URL;
            const response = await fetch(`${baseUrl}/productos/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                alert("Producto actualizado correctamente");
                navigate("/products");
            } else {
                const errorTexto = await response.text();
                console.error("Respuesta de error del servidor:", errorTexto);
                
                // Intentamos leer como JSON, si falla mostramos el texto crudo
                try {
                    const errorJson = JSON.parse(errorTexto);
                    alert(`Error al guardar: ${errorJson.error || "Revisa la consola"}`);
                } catch {
                    alert(`Error del servidor (Código ${response.status}). Revisa la consola.`);
                }
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

    // Determinamos qué imagen mostrar en la vista previa
    const urlVistaPrevia = imagenFile 
        ? URL.createObjectURL(imagenFile) 
        : formulario.imagenActual.startsWith("http")
        ? formulario.imagenActual
        : `http://localhost:3000${producto.imagen}`

    return (
        <div className="p-5 w-full text-white">
<header className="flex items-center justify-between mb-6 w-full">
                <h1 className="text-2xl font-semibold text-white">
                    Editar Producto &gt; #{producto.id}
                </h1>
                
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleVolver}
                        className="rounded-full px-4 py-2 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100 cursor-pointer"
                    >
                        Volver
                    </button>
                    <button
                        type="button"
                        onClick={handleEliminar}
                        className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </header>
            <article className="rounded-xl border border-slate-800 bg-slate-800 p-6 shadow-xl space-y-5 w-full">
                {formulario.imagenActual || imagenFile ? (
                    <div className="relative w-60 h-60 rounded-xl overflow-hidden mb-4 border border-slate-700">
                        <img
                            src={urlVistaPrevia}
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
                            Cambiar Imagen del Producto (Solo archivos locales)
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImagenFile(e.target.files[0]);
                                }
                            }}
                            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-slate-900 hover:file:bg-yellow-200 cursor-pointer bg-slate-700 rounded-lg p-2 border border-slate-600"
                        />
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
                                Precio (Puntos)
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