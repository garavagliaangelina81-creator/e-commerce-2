import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../../const/api"; 
import { fetchCategorias } from "../../../services/CategoriaServicio";

export default function ProductsNew() {
    const navigate = useNavigate();

    //estado para el nuevo producto
    const [formulario, setFormulario] = useState({
        nombre: "",
        stock: 0,
        precio: 0,
        descripcion: "",
        categoria_id: "1"
    });

    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [errores, setErrores] = useState({ nombre: "" });
    const [guardando, setGuardando] = useState(false);
    const [categorias, setCategorias] = useState<any[]>([]);

    // Traemos las categorías desde el backend al cargar la página
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const baseUrl = (API_URL).replace(/\/$/, "");
                const response = await fetch(`${baseUrl}/categorias`);
                if (response.ok) {
                    const json = await response.json();
                    setCategorias(json.data || json || []);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };
        fetchCategorias();
    }, []);

    // Manejador para enviar el formulario
    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!formulario.nombre.trim() || !formulario.categoria_id) {
            alert("El nombre y la categoría son obligatorios.");
            return;
        }

    //controles para el stock
    const handleStockChange = (delta: number) => {
        setFormulario((prev) => ({
            ...prev,
            stock: Math.max(0, (prev.stock || 0) + delta),
        }));
    };

    //boton cancelar: regresa a la lista de productos
    const handleCancelar = () => {
        navigate("/products");
    };

    //envío del formulario al backend (post /productos)
    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrores({ nombre: "" });

        if (!formulario.nombre || !formulario.nombre.trim()) {
            setErrores({ nombre: "El nombre es requerido." });
            return;
        }

        setGuardando(true);

        const formData = new FormData();
        formData.append("nombre", formulario.nombre);
        formData.append("precio", String(Number(formulario.precio) || 0));
        formData.append("stock", String(Number(formulario.stock) || 0));
        formData.append("descripcion", formulario.descripcion || "");
        formData.append("categoria_id", formulario.categoria_id);

        if (imagenFile) {
            formData.append("imagen", imagenFile);
        }

        try {
            const baseUrl = API_URL;
            const response = await fetch(`${baseUrl}/productos`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Producto creado correctamente");
                navigate("/products");
            } else {
                const errorTexto = await response.text();
                console.error("Respuesta de error del servidor:", errorTexto);
                try {
                    const errorJson = JSON.parse(errorTexto);
                    alert(`Error al guardar: ${errorJson.error || "Revisa la consola"}`);
                } catch {
                    alert(`Error del servidor (Código ${response.status}). Revisa la consola.`);
                }
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Error de conexión al guardar el producto");
        } finally {
            setGuardando(false);
        }
    };

    //vista previa de la imagen local elegida
    const urlVistaPrevia = imagenFile ? URL.createObjectURL(imagenFile) : null;

    return (
        <div className="p-5 w-full text-white">
            <header className="flex items-center justify-between mb-6 w-full">
                <h1 className="text-2xl font-semibold text-white">
                    Agregar Nuevo Producto
                </h1>
            </header>

            <article className="rounded-xl border border-slate-800 bg-slate-800 p-6 shadow-xl space-y-5 w-full">
                {/* VISTA PREVIA DE LA IMAGEN */}
                {urlVistaPrevia ? (
                    <div className="relative w-60 h-60 rounded-xl overflow-hidden mb-4 border border-slate-700">
                        <img
                            src={urlVistaPrevia}
                            alt="Vista previa"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-60 h-60 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-slate-400 mb-4">
                        Sin Imagen Seleccionada
                    </div>
                )}

                <form onSubmit={handleGuardar} className="space-y-4 w-full">
                    
                    <div>
                        <label className="block mb-2 font-medium text-sm text-slate-300">
                            Imagen del Producto
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
                            placeholder="Ej: Café Americano"
                            value={formulario.nombre}
                            onChange={(e) =>
                                setFormulario({ ...formulario, nombre: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        />
                        {errores.nombre ? (
                            <p className="text-red-400 text-xs mt-1">{errores.nombre}</p>
                        ) : null}
                    </div>

                {/* SELECTOR DE CATEGORÍA */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-amber-950 dark:text-slate-300">Categoría *</label>
                        <select
                            required
                            value={formulario.categoria_id}
                            onChange={(e) => setFormulario({ ...formulario, categoria_id: e.target.value })}
                            className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100 cursor-pointer"
                        >
                            <option value="" disabled>-- Selecciona una categoría --</option>
                            {categorias.map((cat) => (
                                <option key={cat.categoria_id} value={cat.categoria_id}>
                                    {cat.nombre_categoria || cat.nombre} 
                                </option>
                            ))}
                        </select>
                    </div>

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
                                    value={formulario.stock}
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
                                value={formulario.precio}
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

                    {/* descripcion*/}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-slate-300">
                            Descripción
                        </label>
                        <textarea
                            value={formulario.descripcion}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    descripcion: e.target.value,
                                })
                            }
                            rows={4}
                            placeholder="Escribe una breve descripción del producto..."
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        />
                    </div>

                    {/* botones */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                        <button
                            type="button"
                            onClick={handleCancelar}
                            className="px-5 py-2 rounded-full border border-slate-600 hover:bg-slate-700 text-sm font-medium transition cursor-pointer text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={guardando}
                            className="px-5 py-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-slate-900 text-sm font-semibold transition cursor-pointer disabled:opacity-50"
                        >
                            {guardando ? "Guardando..." : "Guardar Producto"}
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
}
}