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





/*
import { API_URL } from '../const/api';
import { useState } from "react";
import { useEffect } from 'react';
import { Products } from '../types/products';
import { SourceTextModule } from 'vm';

//defino fuera de la funcionel como vca a hacer el fetch, es afuera O dentro del use effect, si lo definimos dentro de la funcion, cuando la funcion va a cambiar de estado, realiza un renderizando y la func fetcch se vuelve a generar y puede hacer un bucle

async function fetchProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`) //ver bien que ruta tengo que poner
        return response;
    }catch (error) {
        console.log( error );
        return [];
    }
}



// VER UNA LISTA DE PRODUCTOS

// VER LOS DETALLES DE UN PRODUCTO

// REGISTRAR UN NUEVO PRODUCTO

// MODIFICAR UN PRODUCTO 

// ELIMINAR UN PRODUCTO

// esto es un hook ya que devuelve un elemento en vez de una vista
export default function UseProductos() {

    const [productos, setProductos] = useState<Products[]>([]);
    const [status, useStatus] = useState


    useEffect(() => {
        fetchProductos().then((data) => setProductos(data));
    }, []); //[] es sin dependencias, solamente se ejecuta en el montaje

    return {
        data: productos,
        status: "success",
        refetch: () => {}
    };
} */