import axios from 'axios';

const API_URL = 'https://localhost:7236/api';  // Cambia la URL según sea necesario

export const getSistemas = async () => {
    const response = await axios.get(`${API_URL}/sistemas`);
    return response.data;
};

export const getModulos = async () => {
    const response = await axios.get(`${API_URL}/modulos`);
    return response.data;
};

export const getSecciones = async () => {
    const response = await axios.get(`${API_URL}/secciones`);
    return response.data;
};

export const createGuia = async (guiaData) => {
    const response = await axios.post(`${API_URL}/guias`, guiaData);
    return response.data;
};
