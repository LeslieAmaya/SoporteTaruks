import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Modal, Box, Typography, Snackbar } from "@mui/material";
import "../App.css";

const SistemForm = () => {
    const [sistemas, setSistemas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Estado para el modal
    const [deleteId, setDeleteId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false); // Nuevo estado para el loading

    const fetchSistemas = async () => {
        setLoading(true); // Activar loading
        try {
            const response = await axios.get("http://localhost:5272/api/Sistema");
            setSistemas(response.data);
        } catch (error) {
            console.error("Error al obtener los sistemas:", error);
        } finally {
            setLoading(false); // Desactivar loading
        }
    };

    useEffect(() => {
        fetchSistemas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activar loading
        try {
            if (editingId) {
                await axios.put(`http://localhost:5272/api/Sistema/${editingId}`, {
                    NombreSis: nombre,
                    DescripcionSis: descripcion,
                });
                setSuccessMessage("Sistema actualizado con éxito.");
            } else {
                await axios.post("http://localhost:5272/api/Sistema", {
                    NombreSis: nombre,
                    DescripcionSis: descripcion,
                });
                setSuccessMessage("Sistema registrado con éxito.");
            }
            setNombre("");
            setDescripcion("");
            setEditingId(null);
            fetchSistemas();
        } catch (error) {
            console.error("Error al registrar el sistema", error);
            setError("Hubo un error al registrar el sistema. Intenta nuevamente.");
        } finally {
            setLoading(false); // Desactivar loading
        }
    };

    const handleEdit = (sistema) => {
        setNombre(sistema.nombreSis);
        setDescripcion(sistema.descripcionSis);
        setEditingId(sistema.idSis);
    };

    const handleDelete = async () => {
        setLoading(true); // Activar loading
        try {
            await axios.delete(`http://localhost:5272/api/Sistema/${deleteId}`);
            setOpenModal(false);
            setDeleteId(null);
            fetchSistemas();
            setSuccessMessage("Sistema eliminado con éxito.");
        } catch (error) {
            console.error("Error al eliminar el sistema", error);
            setError("Hubo un error al eliminar el sistema. Intenta nuevamente.");
        } finally {
            setLoading(false); // Desactivar loading
        }
    };

    const handleOpenModal = (id) => {
        setDeleteId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDeleteId(null);
    };

    return (
        <div>
            {/* BOOTSTRAP */}
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
                        <Link to="/">
                            <img
                                src="https://i.postimg.cc/WzVV6nDy/logo-taruks.png"
                                className="icon"

                                alt="Logo"
                            />
                        </Link>
                    </h1>
                    <Link to="/sistemform" className="nav-item ms-2 login-link-pages">
                        Sistemas
                    </Link>
                    <Link to="/moduleform" className="nav-item ms-2 login-link-pages">
                        Módulos
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
            {/* Contenido de la página */}
            <div className="page-container">
                <h1>Sistemas</h1>
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
                        disabled={loading} // Desactivar botón mientras se carga
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
                                            onClick={() => handleEdit(sistema)}
                                            className="update mr-2"
                                            disabled={loading} // Desactivar botón mientras se carga
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="delete"
                                            onClick={() => handleOpenModal(sistema.idSis)}
                                            disabled={loading} // Desactivar botón mientras se carga
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

            {/* Modal de confirmación */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center"
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        ¿Estás seguro de eliminar este sistema?
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Esta acción no se puede deshacer.
                    </Typography>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Mensaje de éxito o error */}
            <Snackbar
                open={Boolean(successMessage || error)}
                autoHideDuration={6000}
                onClose={() => { setError(null); setSuccessMessage(''); }}
                message={successMessage || error}
                severity={successMessage ? "success" : "error"}
            />
        </div>
    );
};

export default SistemForm;
