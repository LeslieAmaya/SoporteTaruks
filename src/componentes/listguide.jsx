import React, { useState, useEffect } from "react";
import axios from "axios";
import { RichUtils } from "draft-js";
import { Link } from "react-router-dom";
import { TextField, MenuItem, Button, Menu } from "@mui/material";
import { Editor, EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";


const ListGuide = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [guias, setGuias] = useState([]);
    const [sistemas, setSistemas] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchGuias();
        fetchSistemas();
        fetchModulos();
        fetchSecciones();
    }, []);

    const toggleInlineStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };
    const fetchGuias = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Guia");
            setGuias(response.data);

        } catch (error) {
            console.error("Error al obtener la lista de guías", error);

        }
    };

    const fetchSistemas = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Sistema");
            setSistemas(response.data);

        } catch (error) {
            console.error("Error al obtener la lista de sistemas", error);
        }
    };


    const fetchModulos = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Modulo");
            setModulos(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de módulos", error);
        }
    };

    const fetchSecciones = async () => {
        try {
            const response = await axios.get("http://localhost:5272/api/Seccion");
            setSecciones(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de secciones", error);
        }
    };

    const handleEdit = (guia) => {
        const blocksFromHTML = convertFromHTML(guia.procedimiento || "");
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
        setEditMode(guia.idGuia);
        setEditData({ ...guia });
    };



    const handleSave = async (id) => {
        console.log("Datos que se enviarán en el PUT:", editData); // Verifica aquí antes de la petición

        try {
            const html = stateToHTML(editorState.getCurrentContent());
            const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

            setEditData(prev => ({ ...prev, procedimiento: raw })); // Guardamos en JSON para editar
            const finalData = { ...editData, procedimiento: html }; // Enviamos como HTML a la API

            await axios.put(`http://localhost:5272/api/Guia/${id}`, finalData);
            setEditMode(null);
            fetchGuias(); // Recarga la lista después de actualizar
        } catch (error) {
            console.error("Error al actualizar la guía", error);
        }
    };

    const handleChange = (e, field) => {
        const value = e.target.value;
        setEditData((prevData) => {
            const updatedData = { ...prevData, [field]: value };
            console.log("Nuevo estado de editData:", updatedData); // Verifica si el campo cambia aquí
            return updatedData;
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta guía?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5272/api/Guia/${id}`);
            fetchGuias(); // Recargar las guías después de eliminar
            console.log("Guía eliminada con éxito");
        } catch (error) {
            console.error("Error al eliminar la guía", error);
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
                        <Link to="/">
                            <img
                                src="https://i.postimg.cc/WzVV6nDy/logo-taruks.png"
                                className="icon"

                                alt="Logo"
                            />
                        </Link>
                    </h1>
                    <Link to="/sistemform" className="nav-item ms-2 login-link-pages">Sistemas</Link>
                    <Link to="/moduleform" className="nav-item ms-2 login-link-pages">Modulos</Link>
                    <Link to="/sectionform" className="nav-item ms-2 login-link-pages">Secciones</Link>
                    <Link to="/administrador" className="nav-item ms-2 login-link-pages">Guías</Link>
                    <Link to="/listguide" className="nav-item ms-2 login-link-pages">Lista de Guías</Link>
                    <Link to="/" className="nav-item ml-auto login-link-pages">Volver</Link>
                </nav>
            </div>

            <h2 className="text-center">Lista de Guías</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sistema</th>
                            <th>Módulo</th>
                            <th>Sección</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Requerimientos</th>
                            <th>Procedimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guias.map((guia) => (
                            <tr key={guia.idGuia}>
                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField
                                            select
                                            value={editData.idSis || ""}
                                            onChange={(e) => handleChange(e, "idSis")} // Cambia a idSis
                                        >
                                            {sistemas.map((sistema) => (
                                                <MenuItem key={sistema.idSis} value={sistema.idSis}>
                                                    {sistema.nombreSis}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    ) : (
                                        (() => {
                                            const sistema = sistemas.find(s => Number(s.idSis) === Number(guia.idSis));
                                            return sistema ? sistema.nombreSis : "No encontrado";
                                        })()
                                    )}
                                </td>
                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField
                                            select
                                            value={editData.idMod || ""}
                                            onChange={(e) => handleChange(e, "idMod")}
                                        >
                                            {modulos.map((modulo) => (
                                                <MenuItem key={modulo.idMod} value={modulo.idMod}>
                                                    {modulo.nombreM}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        (() => {
                                            const modulo = modulos.find(m => Number(m.idMod) === Number(guia.idMod));
                                            return modulo ? modulo.nombreM : "No encontrado";
                                        })()
                                    )}
                                </td>
                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField
                                            select
                                            value={editData.idSe || ""}
                                            onChange={(e) => handleChange(e, "idSe")}
                                        >
                                            {secciones.map((seccion) => (
                                                <MenuItem key={seccion.idSe} value={seccion.idSe}>
                                                    {seccion.nombreSe}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        (() => {
                                            const seccion = secciones.find(m => Number(m.idSe) === Number(guia.idSe));
                                            return seccion ? seccion.nombreSe : "No encontrado";
                                        })()
                                    )}
                                </td>

                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField value={editData.titulo} onChange={(e) => handleChange(e, "titulo")} />
                                    ) : (
                                        guia.titulo
                                    )}
                                </td>
                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField value={editData.descripcion} onChange={(e) => handleChange(e, "descripcion")} />
                                    ) : (
                                        guia.descripcion
                                    )}
                                </td>
                                <td>
                                    {editMode === guia.idGuia ? (
                                        <TextField value={editData.requerimientos} onChange={(e) => handleChange(e, "requerimientos")} />
                                    ) : (
                                        guia.requerimientos
                                    )}
                                </td>
                                <td style={{ minWidth: 300 }}>
                                    {editMode === guia.idGuia ? (
                                        <>
                                            <div className="controls mb-2">
                                                <button className="mr-2 btn btn-light btn-sm" onClick={(e) => toggleInlineStyle('BOLD', e)}>B</button>
                                                <button className="mr-2 btn btn-light btn-sm" onClick={(e) => toggleInlineStyle('ITALIC', e)}>I</button>
                                                <button className="mr-2 btn btn-light btn-sm" onClick={(e) => toggleInlineStyle('UNDERLINE', e)}>U</button>
                                            </div>
                                            <div className="editor-wrapper border p-2" style={{ backgroundColor: 'white' }}>
                                                <Editor
                                                    editorState={editorState}
                                                    onChange={setEditorState}
                                                    placeholder="Escribe el procedimiento aquí..."
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: guia.procedimiento }} />
                                    )}
                                </td>



                                <td>
                                    {editMode === guia.idGuia ? (
                                        <Button variant="contained"
                                            className="enviar"
                                            onClick={() => handleSave(guia.idGuia)}>
                                            Guardar
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="contained"
                                                className="update"
                                                onClick={() => handleEdit(guia)}
                                                style={{ marginRight: '10px' }} // Agregar margen a la derecha
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="delete"
                                                onClick={() => handleDelete(guia.idGuia)}
                                            >
                                                Eliminar
                                            </Button>

                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListGuide;
