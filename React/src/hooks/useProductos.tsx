import { useEffect, useState } from "react";    
import { API_URL } from "../const/api";

// Definimos los datos que trae cada producto
type Producto = {
    id: number;
    name: string;
    price: number;
    stock: number;
}

type Status = "loading" | "success" | "error";

export function useProductos(page = 1, limit = 8) { 
    const [productos, setProductos] = useState<Producto[]>([]);
    const [status, setStatus] = useState<Status>("loading");
    const [totalProductos, setTotalProductos] = useState<number>(0);

    useEffect(() => {
        setStatus("loading"); 

        fetch(`${API_URL}/productos?page=${page}&limit=${limit}`)
            .then((response) => response.json())
            .then((res) => {
                // Express nos va a devolver los productos y el total
                setProductos(res.data || []); 
                setTotalProductos(res.paginacion?.totalProductos || 0);
                setStatus("success");
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
                setStatus("error");
            });
    }, [page, limit]);

    return { 
        data: productos,
        status,
        totalProductos
    };
}