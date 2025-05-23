import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField, MenuItem, Button, Modal, Box, Typography, Snackbar } from "@mui/material";
import '../App.css';

const ModuleForm = () => {
    const [sistemas, setSistemas] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        sistema: "",
        modulo: "",
        nombreModulo: "",
        descripcionModulo: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchSistemas();
        fetchModulos();
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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { sistema, nombreModulo, descripcionModulo } = formData;
            if (editingId) {
                await axios.put(`http://localhost:5272/api/Modulo/${editingId}`, {
                    idSis: sistema,
                    nombreM: nombreModulo,
                    descripcionM: descripcionModulo,
                });
            } else {
                await axios.post("http://localhost:5272/api/Modulo", {
                    idSis: sistema,
                    nombreM: nombreModulo,
                    descripcionM: descripcionModulo
                });
            }
            setFormData({
                sistema: "",
                nombreModulo: "",
                descripcionModulo: "",
            });
            setEditingId(null);
            fetchModulos();  // Refrescar la lista después de un submit
            setSuccessMessage(editingId ? "Módulo actualizado con éxito." : "Módulo registrado con éxito.");
        } catch (error) {
            console.error("Error al registrar el módulo", error);
            setError("Hubo un error al registrar el módulo. Intenta nuevamente.");
        }
    };

    const handleEdit = (modulo) => {
        setEditingId(modulo.idMod);
        setFormData({
            sistema: modulo.idSis,
            nombreModulo: modulo.nombreM,
            descripcionModulo: modulo.descripcionM,
        });
    };

    const handleDelete = async () => {
        setLoading(true);
        try {

            // Intentar eliminar el módulo
            await axios.delete(`http://localhost:5272/api/Modulo/${deleteId}`);
            setOpenModal(false);
            setDeleteId(null);
            fetchModulos();
            setSuccessMessage("Módulo eliminado con éxito.");
        } catch (error) {
            console.error("Error al eliminar el módulo", error);
            setError("Hubo un error al eliminar el módulo. Intenta nuevamente.");
        } finally {
            setLoading(false);
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
                    <Link to="/sistemform" className="nav-item ms-2 login-link-pages">Sistemas</Link>
                    <Link to="/moduleform" className="nav-item ms-2 login-link-pages">Módulos</Link>
                    <Link to="/sectionform" className="nav-item ms-2 login-link-pages">Secciones</Link>
                    <Link to="/administrador" className="nav-item ms-2 login-link-pages">Guías</Link>
                    <Link to="/listguide" className="nav-item ms-2 login-link-pages">Lista de Guías</Link>
                    <Link to="/" className="nav-item ml-auto login-link-pages">Volver</Link>
                </nav>
            </div>

            <div className="page-container">
                <h1>Módulos</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Nombre del Módulo"
                            name="nombreModulo"
                            fullWidth
                            value={formData.nombreModulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Descripción del Módulo"
                            name="descripcionModulo"
                            fullWidth
                            value={formData.descripcionModulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        {editingId ? "Actualizar" : "Registrar"}
                    </Button>
                </form>

                <h2 className="text-center">Lista de Módulos</h2>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Sistema</th>
                                <th className="text-center">Nombre del Módulo</th>
                                <th className="text-center">Descripción</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modulos.map((modulo) => (
                                <tr key={modulo.idMod}>
                                    <td>{sistemas.find(sis => sis.idSis === modulo.idSis)?.nombreSis || "Desconocido"}</td>
                                    <td>{modulo.nombreM}</td>
                                    <td>{modulo.descripcionM}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handleEdit(modulo)}
                                            className="update mr-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="delete"
                                            onClick={() => handleOpenModal(modulo.idMod)}
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
                    <Typography variant="h6">
                        ¿Estás seguro de eliminar este módulo?
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
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

export default ModuleForm;
