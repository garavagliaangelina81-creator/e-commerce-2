// Estos son tus datos falsos temporales hasta que conecten la base de datos
const productosDePrueba = [
    { id: 1, nombre: 'Mousse de chocolate', precio: 1500, stock: 10, categoria: 'Postres' },
    { id: 2, nombre: 'Hamburguesa Completa', precio: 3500, stock: 5, categoria: 'Comidas' },
];

export default function ProductsList() {
    return (
        <div className="text-white">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Lista de productos</h1>
                {/* Este botón servirá después para la US8/10 */}
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    + Agregar Producto
                </button>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-900 border-b border-slate-700">
                        <th className="p-4">ID</th>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* El .map() recorre el array y dibuja una fila (tr) por cada producto */}
                        {productosDePrueba.map((producto) => (
                            <tr key={producto.id} className="border-b border-slate-700 hover:bg-slate-750">
                                <td className="p-4">#{producto.id}</td>
                                <td className="p-4">{producto.nombre}</td>
                                <td className="p-4">{producto.categoria}</td>
                                <td className="p-4 text-green-400">${producto.precio}</td>
                                <td className="p-4">{producto.stock}</td>
                            </tr>
                        ))}
                    </tbody>  
                </table>
            </div>
        </div>
    );
}