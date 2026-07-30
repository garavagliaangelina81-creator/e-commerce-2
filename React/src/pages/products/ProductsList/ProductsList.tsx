import { Link } from "react-router";
import { useProductos } from "../../../services/UseProductos";


export default function ProductsList() {
    //importamos el hook que nos trae los productos
    const { data: productos, status } = useProductos();

//Manejo de estados
    if (status === "loading") {
        return <p className="p-10 text-center text-white">Cargando productos...</p>;
    }

    if (status === "error") {
        return <p className="p-10 text-center text-red-500">Error al cargar los productos.</p>;
    }

    return (
        <main className="min-h-full bg-gray-200 text-amber-950 dark:bg-slate-900 dark:text-slate-100 mt-4">
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 dark:border-slate-950 dark:bg-slate-950/40 p-4 sm:p-6">
                <header className="flex items-center justify-between border-b border-amber-950 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">Productos</h2>
                    <Link to="/products/new" className="rounded-full px-4 py-1.5 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                        Agregar categoría
                    </Link>
                </header>

                <div className="grid gap-3">
                    {/* 3. Mapeamos la data real obtenida de la API */}
                    {productos.map((producto) => (
                        <article
                            key={producto.id}
                            className="flex items-center justify-between gap-4 rounded-xl border-amber-950 bg-amber-100 dark:border-slate-800 dark:bg-slate-800/80 px-4 py-4"
                        >
                            {/* Ajusta 'nombre' si tu objeto de producto usa otra propiedad como 'titulo' */}
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
                    ))}
                </div>
            </section>
        </main>
    );
}