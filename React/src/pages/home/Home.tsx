import { Link } from "react-router";
import Header from "../../components/layouts/Header/Header";

export default function Home() {
    return (
        <main className=" min-h-full  dark:bg-slate-900 dark:text-slate-100" >
            <Header />
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-2xl border border-gray-200 bg-gray-200 dark:border-slate-950/40 dark:bg-slate-950/40 p-4  sm:p-6 mt-4" >
                <div className="grid gap-4">
                    <article className="flex items-center justify-between gap-4 rounded-xl border border-amber-950 bg-amber-100 dark:border-slate-800 dark:bg-slate-800/80 px-4 py-5 shadow-lg shadow-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                                    <span className="text-lg font-medium text-amber-950 dark:text-yellow-100">Productos</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link to="/products"> 
                                <button className="rounded-full bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 px-4 py-1.5 text-s font-medium dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                                    Ver listado
                                </button>
                            </Link>
                            <button className="rounded-full bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100 px-4 py-1.5 text-s font-medium ">
                                Agregar producto
                            </button>
                        </div>
                    </article>

                    <article className="flex items-center justify-between gap-4 rounded-xl border border-amber-950 bg-amber-100 dark:border-slate-800 dark:bg-slate-800/80 px-4 py-5 shadow-lg shadow-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                                    <span className="text-lg font-medium text-amber-950 dark:text-yellow-100">Categorias</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button className="rounded-full bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 px-4 py-1.5 text-s font-medium dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                                Ver listado
                            </button>
                            <button className="rounded-full bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 px-4 py-1.5 text-s font-medium dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                                Agregar categoria
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}