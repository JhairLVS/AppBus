import React from "react";
import "./MessageModal.css"; 

function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="modal-backdrop-message">
      <div className="modal-content-message">
        <h2>Mensaje</h2>
        <p>{message}</p>
        <button className="btn-primary" onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
}

export default MessageModal;
