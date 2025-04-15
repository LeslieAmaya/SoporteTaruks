import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useParams } from 'react-router-dom';

const SiAdminWeb = () => {
  const [modulos, setModulos] = useState([]);
  const [idSiAdminWeb, setIdSiAdminWeb] = useState(null);
  const [guias, setGuias] = useState({}); // Estado para almacenar guías de cada módulo
  const [visibleModulos, setVisibleModulos] = useState({}); // Estado para controlar visibilidad de guías
  const [selectedGuia, setSelectedGuia] = useState(null); // Estado para la guía seleccionada
  const { id } = useParams();

  useEffect(() => {
    fetchSistemas();
  }, []);

  useEffect(() => {
    if (idSiAdminWeb !== null) {
      fetchModulos();
    }
  }, [idSiAdminWeb]);

  useEffect(() => {
    if (id && modulos.length > 0) {
      const buscarGuia = async () => {
        for (const mod of modulos) {
          if (!guias[mod.idMod]) {
            const response = await axios.get(`http://localhost:5272/api/Guia/${mod.idMod}`);
            const guiasDelModulo = response.data;
            
            // Si encuentras la guía por ID, actualizas el estado y terminas
            const guiaEncontrada = guiasDelModulo.find((g) => String(g.idGuia) === String(id));
            if (guiaEncontrada) {
              setSelectedGuia(guiaEncontrada);
              break;
            }
  
            // También actualizas el estado general de guías (por si quieres usarlo después)
            setGuias((prev) => ({
              ...prev,
              [mod.idMod]: guiasDelModulo,
            }));
          }
        }
      };
  
      buscarGuia();
    }
  }, [id, modulos]);

  const fetchSistemas = async () => {
    try {
      const response = await axios.get("http://localhost:5272/api/Sistema");
      console.log("Sistemas obtenidos:", response.data);

      const siadminWebSistema = response.data.find((sistema) => sistema.nombreSis === "Multiventas");
      if (siadminWebSistema) {
        setIdSiAdminWeb(siadminWebSistema.idSis);
        console.log("ID de SiAdminWeb encontrado:", siadminWebSistema.idSis);
      } else {
        console.warn("No se encontró el sistema 'SiAdminWeb'");
      }
    } catch (error) {
      console.error("Error al obtener los sistemas", error);
    }
  };

  const fetchModulos = async () => {
    try {
      const response = await axios.get("http://localhost:5272/api/Modulo");

      const modulosSiAdminWeb = response.data.filter(
        (modulo) => Number(modulo.idSis) === Number(idSiAdminWeb)
      );

      setModulos(modulosSiAdminWeb);
    } catch (error) {
      console.error("Error al obtener los módulos", error);
    }
  };

  // Obtener guías del módulo seleccionado
  const fetchGuias = async (idMod) => {
    try {
      const response = await axios.get(`http://localhost:5272/api/Guia/${idMod}`);
      console.log("Respuesta de la API para guías:", response.data);
      setGuias((prevGuias) => ({
        ...prevGuias,
        [idMod]: response.data,
      }));
      setVisibleModulos((prev) => ({
        ...prev,
        [idMod]: !prev[idMod],
      }));
    } catch (error) {
      console.error("Error al obtener las guías", error);
    }
  };


  const handleGuiaClick = (guia) => {
    setSelectedGuia(guia); // Al hacer clic en la guía, almacenamos los detalles de la guía seleccionada
  };

  return (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="container-fluid bg-dark p-0">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i>+52 6442360132
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>contacto@taruks.com
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 px-lg-5">
          <h1 className="m-0 display-5 text-uppercase">
            <img
              src="https://i.postimg.cc/fyJBMwjN/Multi-Ventas.png"
              className="icon"
              style={{ padding: 0, width: "200px" }}
              alt="Logo"
            />
          </h1>
          <Link to="/" className="nav-item ml-auto login-link-pages">
            Volver
          </Link>
        </nav>
      </div>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="list-unstyled">
            {modulos.length > 0 ? (
              modulos.map((modulo) => (
                <li key={modulo.idMod}>
                  <button
                    className="btn btn-link text-white text-decoration-none p-0"
                    onClick={() => fetchGuias(modulo.idMod)} // Cargar guías solo si no han sido cargadas
                  >
                    <i className="mb-4 mt-4 ml-4 fa fa-warehouse mr-2"></i> {modulo.nombreM}
                  </button>

                  {/* Mostrar guías si el módulo está expandido */}
                  {visibleModulos[modulo.idMod] && (
                    <ul className="list-unstyled ml-4">
                      {guias[modulo.idMod] && guias[modulo.idMod].length > 0 ? (
                        guias[modulo.idMod].map((guia) => (
                          <li key={guia.idGuia}>
                            <button
                              className="btn btn-link text-white text-decoration-none p-0"
                              onClick={() => handleGuiaClick(guia)} // Manejador de clic para seleccionar la guía
                            >
                              <i className="fa fa-book ml-5 mr-2"></i> {guia.titulo}
                            </button>
                          </li>
                        ))
                      ) : (
                        <p className="text-white pl-4">No hay guías disponibles</p>
                      )}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <p className="text-white pl-4">No hay módulos disponibles</p>
            )}
          </ul>
        </div>

        {/* Mostrar detalles de la guía seleccionada */}
        {selectedGuia && (
          <div className="guia-details ml-4 mt-4">
            <h3><strong>{selectedGuia.titulo}</strong></h3>
            <p><strong>Descripción:</strong> {selectedGuia.descripcion}</p>
            <p><strong>Requerimientos:</strong> {selectedGuia.requerimientos}</p>
            <div>
              <strong>Procedimiento:</strong>
              <div dangerouslySetInnerHTML={{ __html: selectedGuia.procedimiento }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiAdminWeb;
