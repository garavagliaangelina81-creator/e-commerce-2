import { API_URL } from "../const/api";

export const loginServicio = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/usuario/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Error al intentar iniciar sesión");
    }

    // Retornamos los datos (token y usuario) si fue exitoso
    return data;
};