function PerfilUsuario() {
    return(
        <>
        <div className="perfil-usuario">

        <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading fw-normal lh-1">Nombre</h2>
        <p className="lead">Pedro</p>
        <h2 className="featurette-heading fw-normal lh-1">Apellido</h2>
        <p className="lead">Perez</p>
        <h2 className="featurette-heading fw-normal lh-1">Telefono</h2>
        <p className="lead">+5691232135</p>
        <h2 className="featurette-heading fw-normal lh-1">Correo electrónico</h2>
        <p className="lead">pedroperez@correo.com</p>
      </div>
      <div className="col-md-5 order-md-1">
        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
      </div>
    </div>

        </div>
        </>
    );
}

export default PerfilUsuario;