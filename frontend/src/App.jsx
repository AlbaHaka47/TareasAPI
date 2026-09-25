import './App.css';

import Saludo from './components/Saludo';
import Contador from './components/Contador';
import Nombre from './components/Nombre';
import Login from './components/Login';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import CrearTarea from './components/CrearTarea';
import Tareas from './components/Tareas';
import EditarPerfil from './components/EditarPerfil';
import EliminarCuenta from './components/EliminarCuenta';

function App() {
  return (
    <div>
      <h1>Mi primera aplicación React 🚀</h1>

      <Saludo nombre="Pepe" />
      <Saludo nombre="Juan" />
      <Saludo nombre="María" />

      <Contador />

      <Nombre />

      <Login />

      <Registro />

      <Perfil />

      <CrearTarea />

      <Tareas />

      <EditarPerfil />

      <EliminarCuenta />
    </div>
  );
}

export default App;