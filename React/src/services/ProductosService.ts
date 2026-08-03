import { API_URL } from '../const/api';
import { type Products } from '../types/products';

// OBTENER TODOS LOS PRODUCTOS (paginados)
export async function obtenerProductosPaginados(page = 1, limit = 6) {
    try {
        const baseUrl = (API_URL).replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/productos?page=${page}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error("Error al obtener los productos paginados");
        }
        
        const json = await response.json();
        // Devolvemos tanto el arreglo como el total para saber cuándo ocultar el botón
        return {
            productos: json.data || [],
            total: json.paginacion?.totalProductos || 0
        };
    } catch (error) {
        console.error("Error en obtenerProductosPaginados:", error);
        return { productos: [], total: 0 };
    }
}

//OBTENER ESTADISTICAS DE PRODUCTOS
export async function obtenerStatsProductos() {
    try {
        const baseUrl = (API_URL).replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/statsProducto`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching product stats:", error);
        return { count: 0 };
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