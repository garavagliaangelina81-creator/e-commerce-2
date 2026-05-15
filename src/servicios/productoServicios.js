const productoModelo = require('../modelos/productModel');

const productoServicio = {

    buscarPorID: (id) => {
        //us17, funcion para validar y validar el id
        normalized: (id) => {
            //convertir en numero
            const parsedID = parsedInt(id);
            //id: no numerico(NaN), devolvemos null
            if (isNaN(parsedID)){
                return null;
            }
            return parsedID;
        }
        
        const productos = productoModelo.todos();
        return productos.find(p => p.id == id);
    },
    buscarPorID: (id) => {
        const productos = productoModelo.todos();
        //usamos === ´para comparar tipo y valor (ambos numeros)
        return productos.find(p => p.id ===id );
    },
     
    getRelacionados: (producto) => {
        return productoServicio.buscarCategoria(producto.categoria)
            .filter(p=> p.id != producto.id)
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
} 
}

module.exports = productoServicio;