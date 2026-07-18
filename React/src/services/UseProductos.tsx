import { API_URL } from '../const/api';
import { useState, useEffect } from "react";
import { type Products } from '../types/products';
import { type Status } from '../types/status';

//defino fuera de la funcion el como va a hacer el fetch, si lo definimos dentro de la funcion, cuando la funcion cambie de estado, realiza un renderizando y la func fetcch se vuelve a generar y puede hacer un bucle

async function fetchProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        
        //Convertimos la respuesta a JSON
        const respuestaApi = await response.json();
        
        //Verificamos si la propiedad 'data' existe y si realmente es un arreglo.
        if (respuestaApi && Array.isArray(respuestaApi.data)) {
            //Retornamos solo el arreglo de productos para que React pueda usar el .map()
            return respuestaApi.data; 
        }
        
        //Si la estructura no es la esperada, retornamos un arreglo vacío
        return [];
    } catch (error) {
        console.log("Error fetching products:", error);
        return [];
    }
}

//función para obtener la información de un producto en especifico
async function fetchProductoById(id: number) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching product by ID:", error);
        return null;
    }
}

// VER UNA LISTA DE PRODUCTOS

export function useProductos() {
    const [productos, setProductos] = useState<Products[]>([]);
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        fetchProductos().then((data) => {
            setProductos(data);
            setStatus("success");
        }).catch(() => {
            setStatus("error");
        });
    }, []);

    const refetch = () => {
        setProductos([]);
        setStatus("loading");
        fetchProductos().then((data) => {
            setProductos(data);
            setStatus("success");
        }).catch(() => {
            setStatus("error");
        });
    }

    return {
        data: productos,
        status,
        refetch
    };
}

// VER LOS DETALLES DE UN PRODUCTO

export function useProductoById(id: number | null) {
    const [producto, setProducto] = useState<Products | null>(null);
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        if (id) {
            fetchProductoById(id).then((data) => {
                setProducto(data);
                setStatus("success");
            }).catch(() => {
                setStatus("error");
            });
        };
    }, [id]);

    return {
        data: producto,
        status
    };
}

// REGISTRAR UN NUEVO PRODUCTO
    // usamos Omit id ya que nuestra base de datos en Express usa un id autoincrementable
    // recibimos FormData en lugar de un objeto normal para poder pasar unaimagen al backend
export async function crearProductoConImagen(formData: FormData) {
    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            body: formData, 
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear el producto:", error);
        return null;
    }
}

// ACTUALIZAR UN PRODUCTO
    // usamos partial por si queremos actualizar solo algunos campos del producto
export async function actualizarProducto(id: number, productoActualizado: Partial<Products>) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });

        const data = await response.json();
        return data;    
    } catch (error) {
        console.log("Error actualizando producto: ", error);
        return null;
    }
}

// ELIMINAR UN PRODUCTO
export async function eliminarProducto(id: number) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE'
        });
        
        // En las peticiones DELETE, muchas veces el servidor no devuelve un JSON,
        // sino que simplemente responde con un código de éxito (200 o 204).
        if (response.ok) {
            return true; // Retornamos verdadero si se borró con éxito
        }
        return false;
    } catch (error) {
        console.log("Error al eliminar el producto:", error);
        return false;
    }
}