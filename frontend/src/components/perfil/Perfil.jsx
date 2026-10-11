function Perfil({ usuario }) {
  return (
    <section>
      <h2>Mi perfil</h2>

      <div>
        <h3>Datos del usuario</h3>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
      </div>
    </section>
  );
}

export default Perfil;
