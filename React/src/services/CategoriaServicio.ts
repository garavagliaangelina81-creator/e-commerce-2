import { API_URL } from '../const/api';
import type { Categoria } from '../types/Categoria';

// OBTENER TODAS (con paginación opcional)
export async function fetchCategorias(page = 1, limit = 8) {
    try {
        const response = await fetch(`${API_URL}/categorias?page=${page}&limit=${limit}`);
        return await response.json(); 
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { data: [], paginacion: null };
    }
}

// OBTENER POR ID
export async function fetchCategoriaPorID(categoriaId: number) {
    try {
        const response = await fetch(`${API_URL}/categorias/${categoriaId}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        return null;
    }
}

// CREAR
export async function crearCategoria(formData: FormData) {
    try {
        const response = await fetch(`${API_URL}/categorias`, {
            method: 'POST',
            body: formData, 
        });
        return await response.json();
    } catch (error) {
        console.error("Error al crear la categoria:", error);
        return null;
    }
}

// ACTUALIZAR
export async function actualizarCategoria(categoriaId: number, categoriaActualizada: Partial<Categoria>) {
    try {
        const response = await fetch(`${API_URL}/categorias/${categoriaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoriaActualizada)
        });
        return await response.json();    
    } catch (error) {
        console.error("Error actualizando categoria: ", error);
        return null;
    }
}

// ELIMINAR
export async function eliminarCategoria(categoriaId: number) {
    try {
        const response = await fetch(`${API_URL}/categorias/${categoriaId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error("Error al eliminar la categoria :", error);
        return false;
    }
}