import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Stepper, Step, StepLabel, Button, TextField, MenuItem, Box } from "@mui/material";
import axios from "axios"; // Asegúrate de usar axios para la comunicación con tu API

const steps = ["Selección de Sistema, Módulo y Sección", "Requerimientos", "Procedimiento", "Revisión"];

const WizardForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        sistema: "",
        modulo: "",
        seccion: "",
        titulo: "",
        descripcion: "",
        requerimientos: [""],
        procedimiento: ""
    });

    const [sistemas, setSistemas] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [secciones, setSecciones] = useState([]);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        // Obtener los datos de la API al cargar el componente
        const fetchData = async () => {
            try {
                const [sistemasData, modulosData, seccionesData] = await Promise.all([
                    axios.get("http://localhost:5272/api/Sistema"),
                    axios.get("http://localhost:5272/api/Modulo"),
                    axios.get("http://localhost:5272/api/Seccion")
                ]);
                setSistemas(sistemasData.data);
                setModulos(modulosData.data);
                setSecciones(seccionesData.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        try {
            // Obtener el contenido del editor
            const contentState = editorState.getCurrentContent();
            const htmlContent = stateToHTML(contentState);
    
            const guiaData = {
                IdSis: formData.sistema,
                IdMod: formData.modulo,
                IdSe: formData.seccion,
                Titulo: formData.titulo,
                Descripcion: formData.descripcion,
                Requerimientos: formData.requerimientos.join(", "),
                Procedimiento: htmlContent
            };
    
            const result = await axios.post("http://localhost:5272/api/Guia", guiaData);
            alert('Guía creada con éxito');
            console.log(result);
    
            setFormData({
                sistema: "",
                modulo: "",
                seccion: "",
                titulo: "",
                descripcion: "",
                requerimientos: [""],
                procedimiento: ""
            });
            setActiveStep(0);
        } catch (error) {
            alert('Error al crear la guía');
            console.error(error);
        }
    };
    
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        
        // Convertir el contenido del editor a HTML
        const htmlContent = stateToHTML(newEditorState.getCurrentContent());
    
        // Guardar el HTML en el estado
        setFormData((prevData) => ({
            ...prevData,
            procedimiento: htmlContent
        }));
    };
    
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    
    const toggleInlineStyle = (style, e) => {
        e.preventDefault();
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorChange(newState);
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
                    <Link to="/sistemform" className="nav-item ms-2 login-link-pages">Sistemas</Link>
                    <Link to="/moduleform" className="nav-item ms-2 login-link-pages">Módulos</Link>
                    <Link to="/sectionform" className="nav-item ms-2 login-link-pages">Secciones</Link>
                    <Link to="/administrador" className="nav-item ms-2 login-link-pages">Guías</Link>
                    <Link to="/listguide" className="nav-item ms-2 login-link-pages">Lista de Guías</Link>
                    <Link to="/" className="nav-item ml-auto login-link-pages">Volver</Link>
                </nav>
            </div>
            <div className="container mt-4">
                <h1 className="m-4">Administración de Guías</h1>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form className="form-group">
                    {activeStep === 0 && (
                        <div>
                            <Box mb={2}>
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
                            </Box>
                            <Box mb={2}>
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
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    select
                                    label="Sección"
                                    name="seccion"
                                    fullWidth
                                    value={formData.seccion}
                                    onChange={handleChange}
                                >
                                    {secciones.filter(seccion => seccion.idMod === formData.modulo).map((seccion) => (
                                        <MenuItem key={seccion.idSe} value={seccion.idSe}>
                                            {seccion.nombreSe}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box mb={2}>
                                <TextField label="Título" name="titulo" fullWidth value={formData.titulo} onChange={handleChange} />
                            </Box>
                            <Box mb={2}>
                                <TextField label="Descripción" name="descripcion" fullWidth multiline rows={3} value={formData.descripcion} onChange={handleChange} />
                            </Box>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div>
                            {formData.requerimientos.map((req, index) => (
                                <Box key={index} mb={2}>
                                    <TextField label={`Requerimiento ${index + 1}`} fullWidth value={req} onChange={(e) => {
                                        const newReqs = [...formData.requerimientos];
                                        newReqs[index] = e.target.value;
                                        setFormData({ ...formData, requerimientos: newReqs });
                                    }} />
                                </Box>
                            ))}
                            <Button onClick={() => setFormData({ ...formData, requerimientos: [...formData.requerimientos, ""] })}>
                                + Añadir Requerimiento
                            </Button>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <Box mb={2}>
                            <label>Procedimiento</label>
                            {/* Botones de formato */}
                            <div className="controls">
                                <button className="mr-2" onClick={(e) => toggleInlineStyle('BOLD', e)}>B</button>
                                <button className="mr-2" onClick={(e) => toggleInlineStyle('ITALIC', e)}>I</button>
                                <button className="mr-2" onClick={(e) => toggleInlineStyle('UNDERLINE', e)}>U</button>
                            </div>
                            <div className="editor-container">
                                <Editor
                                    editorState={editorState}
                                    onChange={handleEditorChange}
                                    handleKeyCommand={handleKeyCommand}
                                    placeholder="Escribe el procedimiento..."
                                />
                            </div>
                        </Box>
                    )}

                    {activeStep === 3 && (
                        <div>
                            <h3>Revisión</h3>
                            <p><b>Sistema:</b> {formData.sistema}</p>
                            <p><b>Módulo:</b> {formData.modulo}</p>
                            <p><b>Sección:</b> {formData.seccion}</p>
                            <p><b>Título:</b> {formData.titulo}</p>
                            <p><b>Descripción:</b> {formData.descripcion}</p>
                            <p><b>Requerimientos:</b> {formData.requerimientos.join(", ")}</p>
                            <p><b>Procedimiento:</b></p>
                            <div dangerouslySetInnerHTML={{ __html: formData.procedimiento }} />
                        </div>
                    )}

                    <Box mt={3}>
                        {activeStep > 0 && <Button onClick={handleBack}>Atrás</Button>}
                        {activeStep < steps.length - 1 ? (
                            <Button onClick={handleNext}>Siguiente</Button>
                        ) : (
                            <Button onClick={handleSubmit}>Enviar</Button>
                        )}
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default WizardForm;
