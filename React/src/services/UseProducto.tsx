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