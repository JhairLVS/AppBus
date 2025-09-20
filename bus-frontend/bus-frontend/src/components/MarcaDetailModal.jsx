import React from "react";
import "./MarcaDetailModal.css";

function MarcaDetailModal({ marca, onClose }) {
  if (!marca) return null;

  return (
    <div className="marca-modal-backdrop">
        <div className="marca-modal-content">
            <button type="button" onClick={onClose} className="marca-btn-close">❌</button>
            <h2>Detalle de Marca</h2>
            <p><b>ID:</b> {marca.id}</p>
            <p><b>Nombre:</b> {marca.nombre}</p>
            <p><b>Cantidad de Buses:</b> {marca.cantidadBuses}</p>
        </div>
    </div>

  );
}

export default MarcaDetailModal;
