import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const SectionForm = () => {
    const [secciones, setSecciones] = useState([]);
    const [sistemas, setSistemas] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [filteredSecciones, setFilteredSecciones] = useState([]);
    const [filteredModulos, setFilteredModulos] = useState([]);
    const [formData, setFormData] = useState({
        sistema: "",           // Inicializa con un string vacío
        modulo: "",            // Inicializa con un string vacío
        seccionExistente: "",
        nombreSeccion: "",
        descripcionSeccion: "",
        seccion: ""            // Asegúrate de que seccion tenga un valor
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

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
        const { name, value } = e.target;

        // Si seleccionas una sección existente, borra la nueva
        if (name === "seccion") {
            setFormData(prev => ({
                ...prev,
                seccion: value,
                nuevaSeccion: ""
            }));
        }
        // Si escribes una nueva, borra la selección existente
        else if (name === "nuevaSeccion") {
            setFormData(prev => ({
                ...prev,
                nuevaSeccion: value,
                seccion: ""
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleEdit = (seccion) => {
        setEditingId(seccion.idSe);
        setFormData({
            sistema: seccion.idSis,
            modulo: seccion.idMod,
            seccionExistente: "",
            nombreSeccion: seccion.nombreSe,
            descripcionSeccion: seccion.descripcionSe,
            seccion: ""    // Resetear el valor de seccion
        });
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("¿Estás seguro de que deseas eliminar esta sección?")) {
                await axios.delete(`http://localhost:5272/api/Seccion/${id}`);
                fetchSecciones(); // Actualiza la lista después de eliminar
            }
        } catch (error) {
            console.error("Error al eliminar la sección", error);
            setError("Hubo un error al eliminar la sección. Intenta nuevamente.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { sistema, modulo, seccion, nombreSeccion, descripcionSeccion } = formData;
    
        if (!sistema || !modulo) {
            setError("Por favor selecciona un sistema y un módulo.");
            return;
        }
    
        // Validación condicional:
        if (!formData.seccion && formData.nuevaSeccion.trim() === "") {
            alert("Debes seleccionar una sección existente o escribir una nueva.");
            return;
        }
    
        // Busca la sección seleccionada
        const seccionSeleccionada = secciones.find(sec => sec.idSe === parseInt(formData.seccion));
    
        // Si no se ha seleccionado una sección existente ni se han completado los campos de nueva sección, muestra el error
        if (!seccionSeleccionada && (!nombreSeccion || !descripcionSeccion)) {
            setError("Debes seleccionar una sección existente o ingresar nombre y descripción para una nueva.");
            return;
        }
    
        // Aquí armamos los datos que vamos a enviar
        const data = {
            idSis: sistema,
            idMod: modulo,
            nombreSe: "", // Inicializado vacío
            descripcionSe: "" // Inicializado vacío
        };
    
        if (seccionSeleccionada) {
            // Si se ha seleccionado una sección existente
            data.nombreSe = seccionSeleccionada.nombreSe;
            data.descripcionSe = seccionSeleccionada.descripcionSe;
        } else {
            // Si se está creando una nueva sección
            data.nombreSe = nombreSeccion;
            data.descripcionSe = descripcionSeccion;
        }
    
        try {
            if (editingId) {
                // Si estamos editando una sección existente
                await axios.put(`http://localhost:5272/api/Seccion/${editingId}`, data);
            } else {
                // Si estamos creando una nueva sección
                await axios.post("http://localhost:5272/api/Seccion", data);
            }
    
            // Limpiar el formulario
            setFormData({
                sistema: "",
                modulo: "",
                seccion: "",
                nombreSeccion: "",
                descripcionSeccion: ""
            });
            setEditingId(null);
            setError("");
            fetchSecciones(); // Volver a cargar las secciones
        } catch (error) {
            console.error("Error al registrar la sección", error);
            setError("Hubo un error al registrar la sección. Intenta nuevamente.");
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
                                label="Sistema"
                                name="sistema"
                                fullWidth
                                value={formData.sistema}
                                onChange={handleChange}
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
                                label="Módulo"
                                name="modulo"
                                fullWidth
                                value={formData.modulo}
                                onChange={handleChange}
                            >
                                {modulos.filter(modulo => modulo.idSis === formData.sistema).map((modulo) => (
                                    <MenuItem key={modulo.idMod} value={modulo.idMod}>
                                        {modulo.nombreM}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Sección existente (opcional)"
                                name="seccion"
                                fullWidth
                                value={formData.seccion}
                                onChange={handleChange}
                            >
                                <MenuItem value="">-- Selecciona una sección existente --</MenuItem>
                                {secciones
                                    .filter(seccion => seccion.idMod === formData.modulo)
                                    .map((seccion) => (
                                        <MenuItem key={seccion.idSe} value={seccion.idSe}>
                                            {seccion.nombreSe}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        {!formData.seccionExistente && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Nombre de la Sección"
                                        name="nombreSeccion"
                                        fullWidth
                                        value={formData.nombreSeccion}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Descripción de la Sección"
                                        name="descripcionSeccion"
                                        fullWidth
                                        value={formData.descripcionSeccion}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" className="mt-3">
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
