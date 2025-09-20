import React from "react";
import "./BusDetailModal.css";

function BusDetailModal({ bus, onClose }) {
  if (!bus) return null;

  return (
    <div className="bus-detail-modal-backdrop" onClick={onClose}>
      <div
        className="bus-detail-modal-content"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        {/* Solo la X roja */}
        <button type="button" onClick={onClose} className="btn-close"></button>

        <h2>Detalle del Bus</h2>
        <p><b>ID:</b> {bus.id}</p>
        <p><b>Número:</b> {bus.numeroBus}</p>
        <p><b>Placa:</b> {bus.placa}</p>
        <p><b>Marca:</b> {bus.marca?.nombre}</p>
        <p><b>Creado:</b> {new Date(bus.fechaCreacion).toLocaleString("es-PE")}</p>
        <p><b>Activo:</b> {bus.activo ? "Sí" : "No"}</p>

        {bus.caracteristicas && bus.caracteristicas.length > 0 && (
          <>
            <h3>Características</h3>
            <ul>
              {bus.caracteristicas.split(",").map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default BusDetailModal;
