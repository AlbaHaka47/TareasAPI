import { useState } from 'react';

function Nombre() {
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <p>Hola, {nombre}</p>
    </div>
  );
}

export default Nombre;