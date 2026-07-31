import { Link } from "react-router";
import { useState, useEffect } from "react"; 
// Asumimos que puedes importar la función o ajustarla según tu hook
import { API_URL } from "../../../const/api"; 

export default function ProductsList() {
    const [productos, setProductos] = useState<any[]>([]);
    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
    const [busqueda, setBusqueda] = useState(""); 
    const [pagina, setPagina] = useState(1);
    const [totalProductos, setTotalProductos] = useState(0);
    const [cargandoMas, setCargandoMas] = useState(false);

    // Función para traer los productos de la API de forma paginada
    const fetchProductos = async (numPagina: number, esInicial = false) => {
        try {
            if (esInicial) setStatus("loading");
            else setCargandoMas(true);

            const baseUrl = (API_URL || "http://localhost:3000/api").replace(/\/$/, "");
            const response = await fetch(`${baseUrl}/productos?page=${numPagina}&limit=8`);
            
            if (!response.ok) throw new Error("Error al cargar");

            const json = await response.json();
            const nuevosProductos = json.data || [];
            const total = json.paginacion?.totalProductos || 0;

            if (esInicial) {
                setProductos(nuevosProductos);
            } else {
                // Acumulamos los nuevos productos con los que ya estaban en pantalla
                setProductos((prev) => [...prev, ...nuevosProductos]);
            }

            setTotalProductos(total);
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setCargandoMas(false);
        }
    };

    // Carga inicial al montar el componente
    useEffect(() => {
        fetchProductos(1, true);
    }, []);

    // Manejador del botón "Ver más"
    const handleVerMas = () => {
        const siguientePagina = pagina + 1;
        setPagina(siguientePagina);
        fetchProductos(siguientePagina, false);
    };

    if (status === "loading") {
        return <p className="p-10 text-center text-amber-950 dark:text-amber-200">Cargando productos...</p>;
    }

    if (status === "error") {
        return <p className="p-10 text-center text-red-500">Error al cargar los productos</p>;
    }
    
    // Filtro de búsqueda sobre los productos cargados
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Comprobamos si todavía hay más productos en la base de datos por mostrar
    const quedanProductos = productos.length < totalProductos;

    return (
        <main className="min-h-full bg-gray-200 text-amber-950 dark:bg-slate-900 dark:text-slate-100 mt-4">
            <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border-gray-200 bg-gray-200 dark:border-slate-950 dark:bg-slate-950/40 p-4 sm:p-6">
                
                <header className="flex items-center justify-between border-b border-amber-950 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-yellow-100">Productos</h2>
                    <Link to="/products/new" className="rounded-full px-4 py-1.5 text-sm font-medium bg-amber-200 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-slate-950 dark:hover:text-yellow-100">
                        Agregar producto
                    </Link>
                </header>
                
                <div className="mb-2">
                    <input 
                        type="text" 
                        placeholder="Buscar producto por nombre..." 
                        value={busqueda} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                        className="w-full rounded-lg border border-amber-900/30 bg-white p-3 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-950 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-yellow-100" 
                    />
                </div>

                <div className="grid gap-3">
                    {productosFiltrados && productosFiltrados.length > 0 ? (
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
                        <p className="text-center text-amber-900/60 dark:text-slate-400 py-6">
                            No se encontraron productos que coincidan con la búsqueda
                        </p>
                    )}
                </div>

                {/* BOTÓN "VER MÁS" AL FINAL DE LA LISTA */}
                {quedanProductos && (
                    <div className="mt-6 flex justify-center w-full">
                        <button
                            type="button"
                            onClick={handleVerMas}
                            disabled={cargandoMas}
                            className="rounded-full px-6 py-2.5 text-sm font-semibold bg-amber-300 text-amber-950 hover:bg-amber-950 hover:text-amber-200 dark:bg-yellow-100 dark:text-slate-900 transition dark:hover:bg-yellow-200 shadow-md cursor-pointer disabled:opacity-50"
                        >
                            {cargandoMas ? "Cargando más..." : "Ver más productos"}
                        </button>
                    </div>
                )}

            </section>
        </main>
    );
}