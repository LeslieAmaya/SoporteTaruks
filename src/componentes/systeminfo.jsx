import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const SystemInfo = () => {
    const { id, idMod, idGuia } = useParams();
    const [modulos, setModulos] = useState([]);
    const [guias, setGuias] = useState({});
    const [visibleModulos, setVisibleModulos] = useState({});
    const [selectedGuia, setSelectedGuia] = useState(null);
    const navigate = useNavigate();

    // Cargar módulos del sistema
    useEffect(() => {
        const fetchModulos = async () => {
            try {
                const response = await axios.get("http://localhost:5272/api/Modulo");
                const modulosDelSistema = response.data.filter(
                    (mod) => Number(mod.idSis) === Number(id)
                );
                setModulos(modulosDelSistema);
            } catch (error) {
                console.error("Error al obtener los módulos", error);
            }
        };
        fetchModulos();
    }, [id]);

    // Cargar guías de todos los módulos cuando estén listos
    useEffect(() => {
        const fetchGuiasDeTodos = async () => {
            const nuevasGuias = {};
            for (const modulo of modulos) {
                    const response = await axios.get(`http://localhost:5272/api/Guia/${modulo.idMod}`);
                    nuevasGuias[modulo.idMod] = response.data;
               
            }
            setGuias(nuevasGuias);
        };
    
        if (modulos.length > 0) {
            fetchGuiasDeTodos();
        }
    }, [modulos]);
    

    // Cuando las guías estén listas, buscar y seleccionar la guía si se accedió desde la búsqueda
    useEffect(() => {
        if (Object.keys(guias).length > 0 && idGuia) {
            for (const idModulo in guias) {
                const guiaEncontrada = guias[idModulo]?.find(
                    (g) => Number(g.idGuia) === Number(idGuia)
                );
                if (guiaEncontrada) {
                    setSelectedGuia(guiaEncontrada);
                    setVisibleModulos((prev) => ({
                        ...prev,
                        [idModulo]: true,
                    }));
                    break;
                }
            }
        }
    }, [guias, idGuia]);

    const handleGuiaClick = (guia) => {
        setSelectedGuia(guia);
        navigate(`/sistemas/${id}/${guia.idMod}/${guia.idGuia}`);
    };

    const fetchGuias = async (idMod) => {
        // Evita volver a cargar si ya están
        if (guias[idMod]) {
            setVisibleModulos((prev) => ({
                ...prev,
                [idMod]: !prev[idMod],
            }));
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5272/api/Guia/${idMod}`);
            setGuias((prevGuias) => ({
                ...prevGuias,
                [idMod]: response.data,
            }));
            setVisibleModulos((prev) => ({
                ...prev,
                [idMod]: true,
            }));
        } catch (error) {
            console.error("Error al obtener las guías", error);
        }
    };

    return (
        <div>
            <div className="container-fluid bg-dark p-0">
                <div className="row py-2 px-lg-5">
                    <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center text-white">
                            <small><i className="fa fa-phone-alt mr-2"></i>+52 6442360132</small>
                            <small className="px-3">|</small>
                            <small><i className="fa fa-envelope mr-2"></i>contacto@taruks.com</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 px-lg-5">
                    <h1 className="m-0 display-5 text-uppercase">
                        <img
                            src="https://i.postimg.cc/N0G9CLzg/siadminn.png"
                            style={{ width: "300px" }}
                            alt="Logo"
                        />
                    </h1>
                    <Link to="/" className="nav-item ml-auto login-link-pages">Volver</Link>
                </nav>
            </div>
            <div className="d-flex">
                {/* Sidebar de módulos y guías */}
                <div className="sidebar">
                    <ul className="list-unstyled">
                        {modulos.length > 0 ? (
                            modulos.map((modulo) => (
                                <li key={modulo.idMod}>
                                    <button
                                        className="btn btn-link text-white text-decoration-none p-0"
                                        onClick={() => fetchGuias(modulo.idMod)}
                                    >
                                        <i className="mb-4 mt-4 ml-4 fa fa-warehouse mr-2"></i>
                                        {modulo.nombreM}
                                    </button>

                                    {visibleModulos[modulo.idMod] && (
                                        <ul className="list-unstyled ml-4">
                                            {guias[modulo.idMod]?.length > 0 ? (
                                                guias[modulo.idMod].map((guia) => (
                                                    <li key={guia.idGuia}>
                                                        <button
                                                            className="btn btn-link text-white text-decoration-none p-0"
                                                            onClick={() => handleGuiaClick(guia)}
                                                        >
                                                            <span>{guia.titulo}</span>
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className="text-white pl-4">No hay guías</p>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p className="text-white pl-4">No hay módulos</p>
                        )}
                    </ul>
                </div>

                {/* Contenido guía seleccionada */}
                <div className="content-area container mt-5">
                    {selectedGuia ? (
                        <div>
                            <h3>{selectedGuia.titulo}</h3>
                            <p><strong>Descripción:</strong> {selectedGuia.descripcion}</p>
                            <p><strong>Requerimientos:</strong> {selectedGuia.requerimientos}</p>
                            <p><strong>Procedimiento:</strong></p>
                            <div dangerouslySetInnerHTML={{ __html: selectedGuia.procedimiento }} />
                        </div>
                    ) : (
                        <p className="text-muted">Selecciona una guía para verla.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default SystemInfo;
