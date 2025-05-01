# 📚 Gestión Académica Universitaria - Simplex

## 🌟 Descripción
Plataforma integral de gestión académica para instituciones educativas con módulos para estudiantes, profesores y administradores.

### Responsables:  
- Maicol.  
- Alejandro.  
- Sanabria.
- Sofia
- David Santiago Rodriguez R.  

## ✨ Características Principales
### 🚀 Módulos
- **Autenticación Segura**
- **Panel de Administración**
- **Foro Académico**
- **Asistente Virtual**
- **Gestión de Solicitudes**

## 🛠️ Tecnologías
### Frontend
- React v18 + Hooks
- React Router v6
- Context API
- CSS Modules

### Backend (Mock)
- API simulada
- CRUD operations
- Data validation

## 🚀 Instalación
git clone https://github.com/tu-usuario/simplex.git
```bash
cd simplex
npm install
npm start

## 📂 Estructura del Proyecto
```bash
src/
├── components/         # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Admin/          # Panel administrativo
│   ├── Foro/           # Componentes del foro académico
│   └── Shared/         # Componentes compartidos
├── context/            # Contextos de React
│   └── AuthContext.js  # Contexto de autenticación
├── mock/               # Datos simulados
│   ├── api.js          # Funciones de API mock
│   └── data/           # Datos estáticos  
├── services/           # Lógica de servicios
│   └── apiService.js   # Servicios API
├── styles/             # Estilos globales
│   └── global.css      # Estilos base
└── utils/              # Utilidades
    └── helpers.js      # Funciones helper
