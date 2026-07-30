import { useParams, Link, useNavigate } from "react-router";
import { useProductoPorId } from "../../../hooks/useProductos"; 
import { eliminarProducto } from "../../../services/ProductosService"; 

export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const { data: producto, status } = useProductoPorId(id ? Number(id) : null);


    const handleDelete = async () => {
        if (!producto) return;
        
        const confirmar = window.confirm(`¿Estás seguro de que querés eliminar "${producto.nombre}"?`);
        
        if (confirmar) {
            const exito = await eliminarProducto(producto.id);
            if (exito) {
                // Si se borró bien, lo mandamos a la lista
                navigate("/products");
            } else {
                alert("Hubo un error al intentar eliminar el producto.");
            }
        }
    };

    if (status === "loading") {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200 font-medium">Cargando detalles del producto...</p>;
    }

    if (status === "error" || !producto) {
        return (
            <div className="flex flex-col items-center justify-center p-10 space-y-4">
                <p className="text-red-600 dark:text-red-400 font-semibold text-lg">No se encontró el producto o hubo un error.</p>
                <Link
                    to="/products"
                    className="rounded-full px-5 py-2 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-slate-700 dark:text-white transition dark:hover:bg-slate-600"
                >
                    Volver a la lista
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-full mt-4 bg-gray-200 p-4 text-amber-950 dark:bg-slate-900 dark:text-slate-100 sm:p-6">
            <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 p-4 dark:border-slate-950 dark:bg-slate-950/40 sm:p-6">
                
                <header className="flex items-center justify-between border-b border-amber-950 dark:border-slate-800 pb-4 w-full">
                    <h1 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">
                        Detalles del producto &gt; #{producto.id}
                    </h1>

                    <Link
                        to="/products"
                        className="rounded-full px-4 py-1.5 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100"
                    >
                        Volver a la lista
                    </Link>
                </header>

                <article className="flex flex-col md:flex-row gap-8 rounded-xl border border-amber-950 bg-amber-100 px-6 py-8 dark:border-slate-800 dark:bg-slate-800/80">
                    
                    <div className="shrink-0 flex justify-center">
                        {producto.imagen ? (
                            <div className="relative w-full md:w-80 h-80 rounded-xl overflow-hidden border border-amber-900/30 dark:border-slate-700 shadow-lg">
                                <img
                                    src={
                                        producto.imagen.startsWith("http")
                                            ? producto.imagen
                                            : `http://localhost:3000${producto.imagen}`
                                    }
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div className="w-full md:w-80 h-80 rounded-xl border-2 border-dashed border-amber-900/40 flex flex-col items-center justify-center text-amber-900/60 dark:border-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50">
                                <span className="text-4xl mb-2">📦</span>
                                <span>Sin Imagen</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 space-y-5">
                        
                        <div>
                            <h2 className="text-3xl font-bold text-amber-950 dark:text-yellow-100 leading-tight">
                                {producto.nombre}
                            </h2>
                            <div className="mt-2 inline-block rounded-md bg-amber-200/50 px-3 py-1 text-xs font-semibold text-amber-900 dark:bg-slate-700 dark:text-slate-300">
                                Categoría ID: {producto.categoria_id}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 items-end">
                            <div>
                                <p className="text-sm font-medium text-amber-900/70 dark:text-slate-400 mb-1">Precio</p>
                                <span className="text-4xl font-extrabold text-amber-950 dark:text-white">
                                    ${producto.precio}
                                </span>
                            </div>
                            
                            <div className="mb-1">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                                    producto.stock > 0 
                                    ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' 
                                    : 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                                }`}>
                                    {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="pt-5 border-t border-amber-900/20 dark:border-slate-700 flex-1">
                            <h3 className="text-sm font-semibold text-amber-900/70 dark:text-slate-400 mb-3 uppercase tracking-wider">
                                Descripción del producto
                            </h3>
                            <p className="text-amber-950 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {producto.descripcion || <span className="italic opacity-70">Este producto no cuenta con una descripción detallada.</span>}
                            </p>
                        </div>
                        
                        <div className="pt-6 flex justify-end gap-3 mt-auto">
                            <button
                                onClick={handleDelete}
                                className="rounded-full px-6 py-2 text-sm font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-slate-900"
                            >
                                Eliminar
                            </button>
                            <Link
                                to={`/products/editar/${producto.id}`}
                                className="rounded-full px-6 py-2 text-sm font-semibold border-2 border-amber-950 text-amber-950 hover:bg-amber-950 hover:text-amber-200 transition dark:border-yellow-100 dark:text-yellow-100 dark:hover:bg-yellow-100 dark:hover:text-slate-900"
                            >
                                Editar producto
                            </Link>
                        </div>

                    </div>

                </article>
            </section>
        </main>
    );
}