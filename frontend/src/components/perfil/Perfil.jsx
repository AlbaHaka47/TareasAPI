function Perfil({ usuario }) {
  const inicial = usuario.nombre?.charAt(0).toUpperCase() || '?';

  return (
    <section className="perfil-card">
      <div className="perfil-card__avatar" aria-hidden="true">{inicial}</div>

      <dl className="perfil-card__datos">
        <div>
          <dt>Nombre</dt>
          <dd>{usuario.nombre}</dd>
        </div>

        <div>
          <dt>Correo electrónico</dt>
          <dd>{usuario.email}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Perfil;
