# 🚌 Bus-App

**Sistema de Gestión de Buses** desarrollado como reto técnico para la posición de **Practicante FullStack**.  
Permite gestionar buses y marcas, incluyendo creación, edición, eliminación y visualización de detalles.

---

## ⚙️ Tecnologías utilizadas

- **Backend:** Java 17+, Spring Boot 3, PostgreSQL  
- **Frontend:** React 18, HTML5, CSS3  
- **Herramientas:** Git, Vite, Fetch API, useState y useEffect

---

## 🚀 Funcionalidades

### Backend
- CRUD completo de buses y marcas
- Endpoints REST:
  - `GET /bus` → Lista de todos los buses
  - `GET /bus/{id}` → Detalle de un bus
- Integración con base de datos PostgreSQL
- Relaciones entre buses y marcas
- Paginación opcional

### Frontend
- Visualización de buses y marcas en tablas responsivas
- Modal de detalle de cada bus
- Gestión de estado con React `useState`
- Fetch de datos con `fetch` y `useEffect`
- Diseño moderno y responsive para móviles y escritorio

---

## 💻 Instalación

1. Clonar el repositorio:  
```bash
git clone https://github.com/JhairLVS/AppBus.git
```
2. Backend:
```bash
cd bus-app/bus-api
mvn clean install
mvn spring-boot:run
```
3. Frontend:
```bash
cd bus-app/bus-frontend/bus-frontend
npm install
npm run dev
```

## 🖥️ Uso

- Abrir el navegador en http://localhost:5173 (o el puerto que indique Vite)
- Navegar entre las secciones de Buses y Marcas
- Hacer clic en las filas para ver detalles
- Agregar, editar o eliminar registros desde la interfaz

## 📁 Estructura del proyecto
```bash
bus-app/
├─ bus-api/          # Backend (Java Spring Boot)
├─ bus-frontend/     # Frontend (React)
├─ README.md
└─ .gitignore
```
