import { useState, useEffect } from 'react'; // Importar useEffect
import { Link } from 'react-router-dom';
import './App.css';
import global from 'global';
window.global = global;

{/* import axios from "axios"; */}

function App() {
  const [productos, setProductos] = useState([]); // Agregar estado para productos

  useEffect(() => {
    // Cambia esta URL por el endpoint de tu API
    {/* axios.get("https://localhost:7274/api/Modulo")
        .then((response) => {
            setProductos(response.data); // Establece los productos cuando la respuesta llega
        })
        .catch((error) => {
            console.error("Error al obtener los productos:", error);
        });*/}
  }, []);

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

      <div className="cuerpo">
        {/* Barra de contacto */}
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

        {/* Navbar */}
        <div className="container-fluid p-0">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5">
            <Link to="/" className="navbar-brand ml-lg-3">
              <h1 className="m-0 display-5 text-uppercase texttaruks">
                <img
                  src="https://i.postimg.cc/WzVV6nDy/logo-taruks.png"
                  className="icon"
                  alt="Logo Taruks"
                />
              </h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-lg-3"
              id="navbarCollapse"
            >
              {/* Login en el extremo derecho */}
              <Link to="/administrador" className="nav-item ml-auto login-link">
                Login
              </Link>
            </div>
          </nav>
        </div>

        {/* Landing */}
        <div
          className="jumbotron jumbotron-fluid w-100 p-0 mb-5 landing"
          style={{
            backgroundImage: "url('https://i.postimg.cc/XY6Qxzxx/moroj.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="text-center">
            <h1 className="text-white display-3" style={{ fontSize: "3rem" }}>
              Bienvenido al Soporte técnico de Taruks
            </h1>
            <p className="text-white">
              <a className="text-white" href="login.jsx">
                Inicie sesión para que podamos ayudarle mejor
              </a>
            </p>
          </div>

          {/* Formulario */}
          <div className="input-group mt-4" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="¿Cómo podemos ayudar?"
              aria-label="Buscar duda"
            />
            <div className="input-group-append">
              <button
                className="btn btn-danger"
                type="submit"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  color: "white",
                }}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Servicios Taruks */}
        <div className="container my-5">
          <h2 className="text-center custom-margin text-black">Nuestros Servicios</h2>
          <div className="row text-center justify-content-center">
            <div className="row text-center justify-content-center">
              <div className="col-4 col-md-2 text-dark d-flex flex-column align-items-center">
                <Link to="/si-admin">
                  <img
                    src="https://i.postimg.cc/1tPzH6jf/siadmin.png"
                    alt="SiAdmin"
                    className="icon"
                  />
                </Link>
                <p>SiAdmin</p>
              </div>

              <div className="col-4 col-md-2 text-dark d-flex flex-column align-items-center">
                <Link to="/ekkipo">
                  <img
                    src="https://i.postimg.cc/rwwFZxcH/ekkipo.png"
                    alt="Nómina Ekkipo"
                    className="iconA"
                  />
                </Link>
                <p style={{ padding: 26 }}>Nómina Ekkipo</p>
              </div>

              <div className="col-4 col-md-2 text-dark d-flex flex-column align-items-center">
                <Link to="/si-admin-web">
                  <img
                    src="https://i.postimg.cc/1tPzH6jf/siadmin.png"
                    alt="SiAdmin Web"
                    className="icon"
                  />
                </Link>
                <p>SiAdmin Web</p>
              </div>
            </div>
          </div>
        </div>
        {/* Servicios Taruks */}
      </div>
    </div>
  );
}

export default App;
