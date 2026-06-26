import { Link } from "react-router";

const productos = [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
];

export default function ProductsList() {
    return (
        <main className="min-h-full bg-slate-900 text-slate-100">
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
                <header className="border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-yellow-100">Productos</h2>
                </header>

                <div className="grid gap-3">
                    {productos.map((producto) => (
                        <article
                            key={producto.id}
                            className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-4 shadow-lg shadow-black/20 backdrop-blur-sm"
                        >
                            <span className="text-lg font-medium text-yellow-100">{producto.nombre}</span>

                            <Link
                                to={`/products/${producto.id}`}
                                className="rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100"
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