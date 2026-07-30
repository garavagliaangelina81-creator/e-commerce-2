import { API_URL } from '../const/api';
import { type Products } from '../types/products';

// OBTENER TODOS LOS PRODUCTOS (paginados)
export async function obtenerProductos(page = 1, limit = 8) {
    try {
        const response = await fetch(`${API_URL}/productos?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Error en la respuesta de la red");
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        throw error;
    }
}

// OBTENER UN PRODUCTO POR ID
export async function obtenerProductoPorId(id: number) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error obteniendo el producto #${id}:`, error);
        throw error;
    }
}

// CREAR UN PRODUCTO
export async function crearProducto(formData: FormData) { //recibe formData para enviar la imagen al backend
    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            body: formData, 
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
}

// ACTUALIZAR UN PRODUCTO
export async function actualizarProducto(id: number, productoActualizado: Partial<Products>) {
    //se usa partial<products> por si queremos modificar algunos campos
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
        console.error(`Error actualizando el producto #${id}:`, error);
        throw error;
    }
}

// ELIMINAR UN PRODUCTO
export async function eliminarProducto(id: number) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE'
        });
        
        // retorna true si el estado es exitoso
        return response.ok; 
    } catch (error) {
        console.error(`Error al eliminar el producto #${id}:`, error);
        return false;
    }
}