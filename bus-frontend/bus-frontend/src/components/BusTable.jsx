import React, { useState } from "react";
import BusDetailModal from "./BusDetailModal";

function BusTable({ buses, onEdit, onDelete }) {
  const [selectedBus, setSelectedBus] = useState(null);

  const handleRowClick = (bus) => {
    fetch(`http://localhost:8080/bus/${bus.id}`)
      .then((res) => res.json())
      .then((data) => setSelectedBus(data))
      .catch((err) => console.error("Error obteniendo detalle del bus:", err));
  };

  const handleCloseModal = () => setSelectedBus(null);

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este bus?")) {
      fetch(`http://localhost:8080/bus/${id}`, { method: "DELETE" })
        .then(() => onDelete())
        .catch((err) => console.error("Error eliminando bus:", err));
    }
  };

  return (
    <>
      <div className="bus-table-container">
        <table className="bus-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Número</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Creado</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus, index) => (
              <tr key={bus.id} style={{ cursor: "pointer" }}>
                <td data-label="#">{index + 1}</td>
                <td data-label="Número" onClick={() => handleRowClick(bus)}>
                  {bus.numeroBus}
                </td>
                <td data-label="Placa" onClick={() => handleRowClick(bus)}>
                  {bus.placa}
                </td>
                <td data-label="Marca" onClick={() => handleRowClick(bus)}>
                  {bus.marca.nombre}
                </td>
                <td data-label="Creado" onClick={() => handleRowClick(bus)}>
                  {new Date(bus.fechaCreacion).toLocaleString("es-PE")}
                </td>
                <td data-label="Activo" onClick={() => handleRowClick(bus)}>
                  {bus.activo ? "Sí" : "No"}
                </td>
                <td data-label="Acciones">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(bus)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(bus.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalle */}
      <BusDetailModal bus={selectedBus} onClose={handleCloseModal} />
    </>
  );
}

export default BusTable;
