export default function ProductViews() {
    return (
        <div>
            <a href="/" className="text-yellow-100 text-xl p-15px">🡠 Volver</a>
            <article className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-4 shadow-lg shadow-black/20 backdrop-blur-sm">

                <div className="flex flex-wrap items-center gap-2">
                    <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                        Eliminar
                    </button>
                    <button className="rounded-full bg-yellow-100 px-4 py-1.5 text-s font-medium text-slate-900 transition hover:bg-slate-950 hover:text-yellow-100">
                        Agregar
                    </button>
                </div>
            </article>
        </div>
    );
}