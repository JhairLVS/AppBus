import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusTable from "./components/BusTable";
import BusForm from "./components/BusForm";
import MarcaDetailModal from "./components/MarcaDetailModal";
import Header from "./components/Header";
import civaImg from "./assets/civa.webp";
import "./index.css";
import "./App.css"; 
import "./Inicio.css";
import "./components/Contacto.css";

function App() {
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 5;

  const loadBuses = (pageNumber = 0) => {
    fetch(`http://localhost:8080/bus/page?page=${pageNumber}&size=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setBuses(data.content);
        setTotalPages(data.totalPages);
        setPage(pageNumber);
      })
      .catch((err) => console.error("Error cargando buses:", err));
  };

  const loadMarcas = () => {
    fetch("http://localhost:8080/marca")
      .then((res) => res.json())
      .then((data) => setMarcas(data))
      .catch((err) => console.error("Error cargando marcas:", err));
  };

  useEffect(() => {
    loadBuses();
    loadMarcas();
  }, []);

  const handlePrevPage = () => {
    if (page > 0) loadBuses(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) loadBuses(page + 1);
  };

  // Manejar clic en una marca para mostrar detalle
  const handleMarcaClick = (marca) => {
    fetch(`http://localhost:8080/marca/${marca.id}/detalle`)
      .then((res) => res.json())
      .then((data) => setSelectedMarca(data))
      .catch((err) => console.error("Error cargando detalle de marca:", err));
  };

  const handleCloseMarcaModal = () => setSelectedMarca(null);

  return (
    <Router>
      <Header />

      <main className="container my-4">
        <Routes>
          {/* INICIO */}
          <Route
            path="/"
            element={
              <section className="inicio-section">
                <div className="inicio-container">
                  <h2 className="inicio-titulo">
                    <span className="inicio-icon">🚍</span> Sistema de Gestión de Buses
                  </h2>
                  <img src={civaImg} alt="Bus" className="inicio-img" />
                  <div className="descripcion">
                    <p>Este proyecto fue desarrollado como parte del <strong>Reto Técnico</strong> para la posición de <strong>Practicante FullStack</strong>.</p>
                    <p><strong>Backend:</strong> API REST desarrollada en <em>Java 21 + Spring Boot 3</em>, utilizando <em>PostgreSQL</em> como base de datos relacional. Incluye CRUD completo para buses y marcas, paginación y endpoints eficientes.</p>
                    <p><strong>Frontend:</strong> desarrollado en <em>React 18</em>, permite visualización, creación, edición y eliminación de buses y marcas en una interfaz amigable.</p>
                    <p><strong>Arquitectura y diseño:</strong> sistema diseñado con enfoque en <strong>usabilidad</strong> y <strong>escalabilidad</strong>.</p>
                  </div>
                </div>
              </section>
            }
          />

          {/* BUSES */}
          <Route
            path="/buses"
            element={
              <section>
                <h2 className="text-gradient mb-3">🚌 Gestión de Buses</h2>
                <BusForm
                  onSave={() => loadBuses(page)}
                  editingBus={editingBus}
                  onCancel={() => setEditingBus(null)}
                />
                <BusTable
                  buses={buses}
                  onEdit={(bus) => setEditingBus(bus)}
                  onDelete={() => loadBuses(page)}
                />
                <div className="pagination-controls">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="btn-primary"
                  >
                    ← Anterior
                  </button>
                  <span>
                    Página {page + 1} de {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={page + 1 === totalPages}
                    className="btn-primary"
                  >
                    Siguiente →
                  </button>
                </div>
              </section>
            }
          />

          {/* MARCAS */}
          <Route
            path="/marcas"
            element={
              <section>
                <h2 className="text-gradient mb-3">🏷️ Marcas registradas</h2>
                <table className="marca-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre de Marca</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marcas.map((marca, index) => (
                      <tr
                        key={marca.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleMarcaClick(marca)}
                      >
                        <td>{index + 1}</td>
                        <td>{marca.nombre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Modal de detalle de marca */}
                <MarcaDetailModal
                  marca={selectedMarca}
                  onClose={handleCloseMarcaModal}
                />
              </section>
            }
          />

          {/* CONTACTO */}
          <Route
            path="/contacto"
            element={
              <section className="contacto-container">
                <h2 className="contacto-titulo">📞 Contacto</h2>
                <p><strong>Nombre:</strong> Lennin Jhair Vargas Soto</p>
                <p><strong>Correo:</strong> jhairvargas611@gmail.com</p>
                <p><strong>Teléfono:</strong> 928885998</p>
              </section>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
