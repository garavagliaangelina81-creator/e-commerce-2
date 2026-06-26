import { Link } from "react-router";

export default function Home() {
    return (
        <main className="min-h-full bg-slate-900 text-slate-100">
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 shadow-2xl shadow-black/20 sm:p-6">
                <header className="space-y-1 border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-semibold tracking-tight text-yellow-100">Hola ADMIN</h2>
                </header>

                <div className="grid gap-4">
                    <article className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-4 shadow-lg shadow-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                                    <span className="text-lg font-medium text-yellow-100">Productos</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link to="/products"> 
                                <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                                    Ver listado
                                </button>
                            </Link>
                            <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                                Agregar producto
                            </button>
                        </div>
                    </article>

                    <article className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-4 shadow-lg shadow-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                                    <span className="text-lg font-medium text-yellow-100">Categorias</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                                Ver listado
                            </button>
                            <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                                Agregar categoria
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}