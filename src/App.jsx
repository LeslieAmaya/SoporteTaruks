import { useState, useEffect } from 'react'; // Importar useEffect
import { Link, useParams, useNavigate } from 'react-router-dom';
// Solución para "global is not defined"
window.global = window;

import './App.css';

import axios from "axios";
import SystemCard from './componentes/systemcard';

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const navigate = useNavigate();

  const fetchSistemas = async () => {
    try {
      const response = await axios.get("http://localhost:5272/api/Sistema");
      setSistemas(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de sistemas", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5272/api/Guia")
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => console.error("Error al cargar las FAQS", error));
  }, [])
  useEffect(() => {
    fetchSistemas();
  }, []);
  useEffect(() => {


    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filteredFaqs = faqs.filter(faq =>
      faq.titulo.toLowerCase().includes(query.toLowerCase()) ||
      faq.descripcion.toLowerCase().includes(query.toLowerCase()) ||
      faq.requerimientos.toLowerCase().includes(query.toLowerCase()) ||
      faq.procedimiento.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredFaqs);


  }, [query]);


  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleGuiaClick = async (faq) => {
    const sistemaRelacionado = sistemas.find(sis => sis.idSis === faq.idSis);
    if (sistemaRelacionado) {
      navigate(`/sistemas/${sistemaRelacionado.idSis}/${faq.idMod}/${faq.idGuia}`);

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
              <img
                src="https://i.postimg.cc/WzVV6nDy/logo-taruks.png"
                className="iconT"
                alt="Logo Taruks"
              />
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

          {/* Cajita de pregunta */}
          <div className="input-group mt-4" style={{ width: "300px" }}>
            <form className="p-1 mb-1 d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="¿Cómo podemos ayudar?"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Asigna el valor al estado
                style={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0"
                }}
              />
            </form>

          </div>
        </div>
        <div className="container mt-4">
          {results.length > 0 ? (
            <ul className="list-group">
              <div className="row">
                {results.map((faq, index) => {
                  const sistemaRelacionado = sistemas.find(sis => sis.idSis === faq.idSis);
                  if (!sistemaRelacionado) {
                    return <div key={index}>Sistema no encontrado</div>;
                  }

                  return (
                    <div key={index} className="col-md-6 mb-4">
                      <div className="card shadow-sm h-100">
                        <div className="card-body">
                          <button
                            className="btn btn-link text-decoration-none p-0"
                            onClick={() => handleGuiaClick(faq)} // Pasar faq en lugar de guia
                          >
                            <span> {faq.titulo} </span>
                          </button>

                          <h6 className="card-subtitle mb-2 text-muted">
                            Sistema: {sistemaRelacionado.nombreSis}
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ul>
          ) : (
            query && <p>No se encontraron resultados para "{query}".</p>
          )}
        </div>

        {/* Servicios Taruks */}
        <div className="container my-5">
          <h2 className="text-center custom-margin text-black">Nuestros Servicios</h2>
          <div className="row text-center justify-content-center">
            <div className="row text-center justify-content-center">
              <SystemCard />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
