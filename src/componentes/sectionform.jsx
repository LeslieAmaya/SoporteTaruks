import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const SectionForm = () => {
    const [secciones, setSecciones] = useState([]);
    const [sistemas, setSistemas] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [formData, setFormData] = useState({
        sistema: "",
        modulo: "",
        nombreSeccion: "",
        descripcionSeccion: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");  // Para manejar errores

    // Fetch sistemas, modulos y secciones
    useEffect(() => {
        fetchSistemas();
        fetchModulos();
        fetchSecciones();
    }, []);

    const fetchSistemas = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Sistema");
            setSistemas(response.data);
        } catch (error) {
            console.error("Error al obtener los sistemas", error);
        }
    };

    const fetchModulos = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Modulo");
            setModulos(response.data);
        } catch (error) {
            console.error("Error al obtener los módulos", error);
        }
    };

    const fetchSecciones = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Seccion");
            setSecciones(response.data);
        } catch (error) {
            console.error("Error al obtener las secciones", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { sistema, modulo, nombreSeccion, descripcionSeccion } = formData;
            if (editingId) {
                await axios.put(`http://localhost:5272/api/Seccion/${editingId}`, {
                    idSis: sistema,
                    idMod: modulo,
                    nombreSe: nombreSeccion,
                    descripcionSe: descripcionSeccion,
                });
            } else {
                await axios.post("http://localhost:5272/api/Seccion", {
                    idSis: sistema,
                    idMod: modulo,
                    nombreSe: nombreSeccion,
                    descripcionSe: descripcionSeccion,
                });
            }
            // Reset form after submit
            setFormData({
                sistema: "",
                modulo: "",
                nombreSeccion: "",
                descripcionSeccion: "",
            });
            setEditingId(null);
            fetchSecciones();
        } catch (error) {
            console.error("Error al registrar la sección", error);
            setError("Hubo un error al registrar la sección. Intenta nuevamente.");
        }
    };

    const handleEdit = (seccion) => {
        setEditingId(seccion.idSe);
        setFormData({
            sistema: seccion.idSis,
            modulo: seccion.idMod,
            nombreSeccion: seccion.nombreSe,
            descripcionSeccion: seccion.descripcionSe,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5272/api/Seccion/${id}`);
            fetchSecciones();
        } catch (error) {
            console.error("Error al eliminar la sección", error);
            setError("Hubo un error al eliminar la sección. Intenta nuevamente.");
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

                <h1>CRUD de Secciones</h1>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar errores */}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Seleccionar Sistema"
                                name="sistema"
                                fullWidth
                                value={formData.sistema}
                                onChange={handleChange}
                                required
                            >
                                {sistemas.map((sistema) => (
                                    <MenuItem key={sistema.idSis} value={sistema.idSis}>
                                        {sistema.nombreSis}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Seleccionar Módulo"
                                name="modulo"
                                fullWidth
                                value={formData.modulo}
                                onChange={handleChange}
                                required
                            >
                                {modulos.map((modulo) => (
                                    <MenuItem key={modulo.idMod} value={modulo.idMod}>
                                        {modulo.nombreM}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre de la Sección"
                                name="nombreSeccion"
                                fullWidth
                                value={formData.nombreSeccion}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Descripción de la Sección"
                                name="descripcionSeccion"
                                fullWidth
                                value={formData.descripcionSeccion}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-3"
                    >
                        {editingId ? "Actualizar" : "Registrar"}
                    </Button>
                </form>

                <h2 className="text-center mt-4">Lista de Secciones</h2>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Sistema</th>
                                <th className="text-center">Módulo</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Descripción</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secciones.map((seccion) => (
                                <tr key={seccion.idSec}>
                                    <td>{sistemas.find(sis => sis.idSis === seccion.idSis)?.nombreSis || "Desconocido"}</td>
                                    <td>{modulos.find(mod => mod.idMod === seccion.idMod)?.nombreM || "Desconocido"}</td>
                                    <td>{seccion.nombreSe}</td>
                                    <td>{seccion.descripcionSe}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handleEdit(seccion)}
                                            className="mr-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(seccion.idSe)}
                                        >
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

export default SectionForm;
