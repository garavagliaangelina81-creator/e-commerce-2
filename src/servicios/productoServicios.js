const productoModelo = require('../modelos/productModel');

const productoServicio = {
    //us17, funcion para validar el id, si no es numero devuelve null
    normalized: (id) => {
            //convertir en numero
            const parsedID = parseInt(id);
            //id: no numerico(NaN), devolvemos null
            if (isNaN(parsedID)){
                return null;
            }
            return parsedID;
    },
    buscarPorID: (id) => {
        const productos = productoModelo.todos();
        return productos.find(p => p.id == id);
    },
    getRelacionados: (producto) => {
        return productoServicio.buscarCategoria(producto.categoria)
            .filter(p => p.id != producto.id)
            .sort(() => 0.5 - Math.random()) 
            .slice(0, 4);                                                                
    },
    buscarCategoria: (categoria) => {
        const productos = productoModelo.todos();
        return productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    },

    todasCategorias: () => {
        const categorias = productoModelo.todos().map(p => p.categoria);
        return [...new Set(categorias)];

    },
    buscarPorNombre: (nombre) => {
        const todos = productoModelo.todos();
        return todos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    },


//funcion para elegir los 5 productos aleatorios, esto cumple con no usar APls ni base de datos
getSugeridos: ( ) => {
    const todosLosproductos = productoModelo.todos(); 
    return todosLosproductos
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
},

//us7
getDestacados: () => {
    const todosLosProductos = productoModelo.todos();

    return todosLosProductos
    .filter(p => p.destacado === true) //filtramos ´por el "flag" destacado
    .sort(() => 0.5 - Math.random()) //mezclamos el orden
    .slice(0, 10); //y elegimos los primeros 10
} , 
//us18
ordenarPorPrecio: (productos, criterio) => {
        // Clonamos el array original con [...array] para no alterar el JSON base por accidente
        const listaClonada = [...productos];

        if (criterio === 'asc') {
            // Ordena de Menor a Mayor precio
            return listaClonada.sort((a, b) => a.precio - b.precio);
        } else if (criterio === 'desc') {
            // Ordena de Mayor a Menor precio
            return listaClonada.sort((a, b) => b.precio - a.precio);
        }

        // Si el criterio no es correcto, devuelve la lista original sin cambios
        return listaClonada;
    }

}

module.exports = productoServicio;