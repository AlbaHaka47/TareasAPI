import Tareas from '../components/tareas/Tareas';

function TareasPage() {
  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Mi espacio</p>
          <h1>Mis tareas</h1>
          <p className="page-header__subtitle">
            Organiza tu día, una tarea a la vez.
          </p>
        </div>
      </header>

      <Tareas />
    </>
  );
}

export default TareasPage;
