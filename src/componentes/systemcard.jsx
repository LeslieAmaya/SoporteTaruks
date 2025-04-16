import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";


const SystemCard = () => {
    const [sistemas, setSistemas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSistemas();
    }, []);

    const fetchSistemas = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Sistema");
            setSistemas(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de sistemas", error);
        }
    };  

    const redirigir = (id) => {
        navigate(`/sistemas/${id}`);
    };
    

    return (
        <div className="card-containerr">
            {sistemas.map((sistema) => (
                <div className="cardd" key={sistema.idSis} onClick={() =>redirigir(sistema.idSis)}>
                    <h2 className="card-titlee">{sistema.nombreSis}</h2>
                </div>
            ))}
        </div>
    );


};

export default SystemCard;
