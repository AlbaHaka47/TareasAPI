// Campo de formulario: etiqueta + icono + input.
// Lo que se pase dentro (children) se pinta después del input, dentro del campo
function Campo({
  id,
  etiqueta,
  icono,
  type = 'text',
  placeholder,
  valor,
  onChange,
  children
}) {
  return (
    <div className="authInput">
      <label htmlFor={id}>{etiqueta}</label>

      <div className="authInput__field">
        <i className={`pi ${icono}`}></i>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
        />

        {children}
      </div>
    </div>
  );
}

export default Campo;
