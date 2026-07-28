import { useState, useEffect } from "react";
import { fetchCategorias } from "../services/CategoriaServicio";
import type { Categoria } from "../types/Categoria"
import type { Status } from "../types/status";

export function useCategorias(page = 1, limit = 8) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [status, setStatus] = useState<Status>("loading");
    const [totalCategorias, setTotalCategorias] = useState<number>(0);

    const cargarCategorias = () => {
        setStatus("loading");
        fetchCategorias(page, limit)
            .then((res) => {
                if (res && res.data) {
                    setCategorias(res.data);
                    setTotalCategorias(res.paginacion?.totalCategorias || 0);
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch(() => {
                setStatus("error");
            });
    };

    useEffect(() => {
        cargarCategorias();
    }, [page, limit]);

    return {
        data: categorias,
        status,
        totalCategorias,
        refetch: cargarCategorias 
    };
}