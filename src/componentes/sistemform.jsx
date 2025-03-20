import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
import "../App.css";

const SistemForm = () => {
    const [sistemas, setSistemas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");  // Para mostrar errores

    const fetchSistemas = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Sistema");
            console.log("Respuesta de la API:", response.data);  // Muestra los datos en consola
            setSistemas(response.data);
        } catch (error) {
            console.error("Error al obtener los sistemas:", error);
        }
    };



    // Llamar la función en el useEffect
    useEffect(() => {
        fetchSistemas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5272/api/Sistema/${editingId}`, {
                    NombreSis: nombre,
                    DescripcionSis: descripcion,
                });
            } else {
                await axios.post("http://localhost:5272/api/Sistema", {
                    NombreSis: nombre,
                    DescripcionSis: descripcion,
                });
            }
            setNombre("");
            setDescripcion("");
            setEditingId(null);
            fetchSistemas();
        } catch (error) {
            console.error("Error al registrar el sistema", error);
            setError("Hubo un error al registrar el sistema. Intenta nuevamente.");
        }
    };

    const handleEdit = (sistema) => {
        setNombre(sistema.nombreSis);
        setDescripcion(sistema.descripcionSis);
        setEditingId(sistema.idSis);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5272/api/Sistema/${id}`);
            fetchSistemas();
        } catch (error) {
            console.error("Error al eliminar el sistema", error);
            setError("Hubo un error al eliminar el sistema. Intenta nuevamente.");
        }
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
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
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
                            src="https://i.postimg.cc/WzVV6nDy/logo-taruks.png"
                            className="icon"
                            alt="Logo"
                        />
                    </h1>
                    <Link to="/sistemform" className="nav-item ms-2 login-link-pages">
                        Sistemas
                    </Link>
                    <Link to="/moduleform" className="nav-item ms-2 login-link-pages">
                        Modulos
                    </Link>
                    <Link to="/sectionform" className="nav-item ms-2 login-link-pages">
                        Secciones
                    </Link>
                    <Link to="/administrador" className="nav-item ms-2 login-link-pages">
                        Guías
                    </Link>
                    <Link to="/listguide" className="nav-item ms-2 login-link-pages">Lista de Guías</Link>
                    <Link to="/" className="nav-item ml-auto login-link-pages">
                        Volver
                    </Link>
                </nav>
            </div>

            <div className="page-container">
                <h1>CRUD de Sistemas</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            label="Nombre del Sistema"
                            fullWidth
                            value={nombre}
                            className="mb-4"
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <TextField
                            label="Descripción"
                            fullWidth
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-3"
                    >
                        {editingId ? "Actualizar" : "Registrar"}
                    </Button>
                </form>

                <h2 className="text-center mt-4">Lista de Sistemas</h2>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Descripción</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sistemas.map((sistema) => (
                                <tr key={sistema.idSis}>
                                    <td>{sistema.nombreSis}</td>
                                    <td>{sistema.descripcionSis}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handleEdit(sistema)}
                                            className="mr-2">
                                            Editar
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(sistema.idSis)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default SistemForm;
