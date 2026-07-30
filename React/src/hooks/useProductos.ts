import { useState, useEffect } from "react";
import { obtenerProductos, obtenerProductoPorId } from "../services/ProductosService";
import { type Products } from "../types/products";
import { type Status } from "../types/status"; 

// hook para la lista de productos con paginacion y limite
export function useProductos(page = 1, limit = 8) {
    const [productos, setProductos] = useState<Products[]>([]);
    const [status, setStatus] = useState<Status>("loading");
    const [totalProductos, setTotalProductos] = useState<number>(0);

    const cargarProductos = async () => {
        setStatus("loading");
        try {
            const res = await obtenerProductos(page, limit);
            
            setProductos(res.data || []);
            setTotalProductos(res.paginacion?.totalProductos || 0);
            setStatus("success");
        } catch (error) {
            setStatus("error");
            setProductos([]);
        }
    };

    // se ejecuta al montar el componente o cuando cambia la pagina
    useEffect(() => {
        cargarProductos();
    }, [page, limit]);

    const refetch = () => { //fuerza una recarga de la vista 
        cargarProductos();
    };

    return {
        data: productos,
        status,
        totalProductos,
        refetch
    };
}

//hook para un producto individual
export function useProductoPorId(id: number | null) {
    const [producto, setProducto] = useState<Products | null>(null);
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        if (!id) return;

        const cargarProducto = async () => {
            setStatus("loading");
            try {
                const data = await obtenerProductoPorId(id);
                setProducto(data);
                setStatus("success");
            } catch (error) {
                setStatus("error");
                setProducto(null);
            }
        };

        cargarProducto();
    }, [id]);

    return {
        data: producto,
        status
    };
}