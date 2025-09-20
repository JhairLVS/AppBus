// src/components/BusForm.jsx
import { useState, useEffect } from "react";
import MessageModal from "./MessageModal";

function BusForm({ onSave, editingBus, onCancel }) {
  const [numeroBus, setNumeroBus] = useState("");
  const [placa, setPlaca] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [activo, setActivo] = useState(true);
  const [marcaId, setMarcaId] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [errors, setErrors] = useState({});

  // Estado para el modal de mensajes
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Cargar marcas
  useEffect(() => {
    fetch("http://localhost:8080/marca")
      .then((res) => res.json())
      .then((data) => setMarcas(data))
      .catch((err) => console.error("Error cargando marcas:", err));
  }, []);

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (editingBus) {
      setNumeroBus(editingBus.numeroBus);
      setPlaca(editingBus.placa);
      setCaracteristicas(editingBus.caracteristicas);
      setActivo(editingBus.activo);
      setMarcaId(editingBus.marca?.id || "");
    } else {
      setNumeroBus("");
      setPlaca("");
      setCaracteristicas("");
      setActivo(true);
      setMarcaId("");
      setErrors({});
    }
  }, [editingBus]);

  // Validación
  const validate = () => {
    const newErrors = {};
    if (!numeroBus.trim()) newErrors.numeroBus = "Número de bus obligatorio.";
    else if (!/^\d+$/.test(numeroBus)) newErrors.numeroBus = "Número de bus debe ser numérico.";

    if (!placa.trim()) newErrors.placa = "Placa obligatoria.";
    else if (!/^[A-Z]{3}-\d{3}$/.test(placa)) newErrors.placa = "Formato de placa inválido. Ej: ABC-123";

    if (!caracteristicas.trim()) newErrors.caracteristicas = "Características obligatorias.";
    if (!marcaId) newErrors.marcaId = "Debes seleccionar una marca.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedMarca = marcas.find((m) => m.id === parseInt(marcaId));
    if (!selectedMarca) {
      setMessageType("error");
      setMessage("Selecciona una marca válida.");
      return;
    }

    const busData = {
      numeroBus,
      placa,
      caracteristicas,
      activo,
      marca: { id: selectedMarca.id },
    };

    try {
      const response = await fetch("http://localhost:8080/bus", {
        method: editingBus ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(busData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessageType("error");
        setMessage(`No se pudo guardar: ${errorData.message || response.statusText}`);
        return;
      }

      setMessageType("success");
      setMessage(editingBus ? "Bus actualizado correctamente" : "Bus creado correctamente");
      onSave(); // refrescar tabla
    } catch (err) {
      console.error("Error guardando bus:", err);
      setMessageType("error");
      setMessage("Error al guardar el bus. Revisa la consola.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
        <h2>{editingBus ? "Editar Bus" : "Nuevo Bus"}</h2>

        <div className="mb-2">
          <label>Número de Bus:</label>
          <input
            type="text"
            value={numeroBus}
            onChange={(e) => setNumeroBus(e.target.value)}
            className={`form-control ${errors.numeroBus ? "is-invalid" : ""}`}
            placeholder="Ejemplo: 001"
          />
          {errors.numeroBus && <div className="invalid-feedback">{errors.numeroBus}</div>}
        </div>

        <div className="mb-2">
          <label>Placa:</label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            className={`form-control ${errors.placa ? "is-invalid" : ""}`}
            placeholder="Ejemplo: ABC-123"
          />
          {errors.placa && <div className="invalid-feedback">{errors.placa}</div>}
        </div>

        <div className="mb-2">
          <label>Marca:</label>
          <select
            value={marcaId}
            onChange={(e) => setMarcaId(e.target.value)}
            className={`form-control ${errors.marcaId ? "is-invalid" : ""}`}
          >
            <option value="">-- Selecciona una marca --</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>{marca.nombre}</option>
            ))}
          </select>
          {errors.marcaId && <div className="invalid-feedback">{errors.marcaId}</div>}
        </div>

        <div className="mb-2">
          <label>Características:</label>
          <input
            type="text"
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
            className={`form-control ${errors.caracteristicas ? "is-invalid" : ""}`}
            placeholder="Ej: Bus de 50 asientos con aire acondicionado"
          />
          {errors.caracteristicas && <div className="invalid-feedback">{errors.caracteristicas}</div>}
        </div>

        <div className="mb-2 form-check">
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            className="form-check-input"
            id="activoCheck"
          />
          <label className="form-check-label" htmlFor="activoCheck">Activo</label>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editingBus ? "Actualizar" : "Guardar"}
        </button>
        {editingBus && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        )}
      </form>

      {/* Modal de mensajes */}
      <MessageModal
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />
    </>
  );
}

export default BusForm;