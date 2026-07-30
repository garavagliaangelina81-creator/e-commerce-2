import { Link } from "react-router";
import { useProductos } from "../../../services/UseProductos";
import { useState } from "react";


export default function ProductsList() {
    //1)estado para guardar el texto escrito en el buscador
    const [busqueda, setBusqueda] = useState('');

    //importamos el hook que nos trae los productos
    const { data: productos, status } = useProductos();

//Manejo de estados
    if (status === "loading") {
        return <p className="p-10 text-center text-white">Cargando productos...</p>;
    }

    if (status === "error") {
        return <p className="p-10 text-center text-red-500">Error al cargar los productos.</p>;
    }

    //2) filtramoos la lista en tiempo real por el nombre
    const termino = busqueda.toLowerCase().trim();
    const productosFiltrados = (productos || []).filter((producto) => {
        const coincideNombre = producto.nombre?.toLowerCase().includes(termino);
        const coincideCategoria = producto.categoria_id?.toString().includes(termino);
        return coincideNombre || coincideCategoria;
    });

    return (
        <main className="min-h-full bg-gray-200 text-amber-950 dark:bg-slate-900 dark:text-slate-100 mt-4">
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 dark:border-slate-950 dark:bg-slate-950/40 p-4 sm:p-6">
                <header className="flex items-center justify-between border-b border-amber-950 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">Productos</h2>
                    <Link to="/products/new" className="rounded-full px-4 py-1.5 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                        Agregar producto
                    </Link>
                </header>

                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full rounded-xl border border-amber-950/20 bg-amber-50 px-4 py-2.5 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-yellow-100"
                    />
                    {busqueda && (
                        <button
                            onClick={() => setBusqueda('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-amber-950/60 hover:text-amber-950 dark:text-slate-400 dark:hover:text-slate-100"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* renderizado de productos filtrados */}
                <div className="grid gap-3">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => (
                            <article
                                key={producto.id}
                                className="flex items-center justify-between gap-4 rounded-xl border-amber-950 bg-amber-100 dark:border-slate-800 dark:bg-slate-800/80 px-4 py-4"
                            >
                                <span className="text-lg font-medium text-amber-950 dark:text-yellow-100">
                                    {producto.nombre}
                                </span>

                                <Link
                                    to={`/products/${producto.id}`}
                                    className="rounded-full px-4 py-1.5 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100"
                                >
                                    Ver producto
                                </Link>
                            </article>
                        ))
                    ) : (
                        <p className="p-4 text-center text-amber-950/70 dark:text-slate-400">
                            No se encontraron productos que coincidan con "{busqueda}".
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}