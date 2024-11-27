function Footer() {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-3 py-5 my-5 border-top">
        <div className="col mb-3">
          <h5>Servicio al Cliente</h5>
          <p>Contáctanos al teléfono: <strong>(+56) 123 456 789</strong></p>
        </div>
        <div className="col mb-3">
          <h5>Redes Sociales</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="https://www.facebook.com" className="nav-link p-0 text-body-secondary">Facebook</a></li>
            <li className="nav-item mb-2"><a href="https://www.twitter.com" className="nav-link p-0 text-body-secondary">Twitter</a></li>
            <li className="nav-item mb-2"><a href="https://www.instagram.com" className="nav-link p-0 text-body-secondary">Instagram</a></li>
          </ul>
        </div>
        <div className="col mb-3">
          <h5>Contacto</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="mailto:contacto@empresa.com" className="nav-link p-0 text-body-secondary">Correo electrónico: contacto@empresa.com</a></li>
          </ul>
        </div>

      </footer>
      <div className="text-center py-3">
        <p>&copy; 2024 Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;