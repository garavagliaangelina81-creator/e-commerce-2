const isProduction = import.meta.env.PROD;

export const API_URL = isProduction
    ? 'https://antojito.up.railway.app/api'
    : 'http://localhost:3000/api';