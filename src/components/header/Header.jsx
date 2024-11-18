import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './header.module.css'
import { NavLink } from 'react-router-dom'

function Header() {
    const setActiveClass = ({ isActive }) => (isActive ? styles.active : styles.desactive)
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand className={styles.logo}> <NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/'>essence</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link><NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/'>Inicio</NavLink></Nav.Link>
                <Nav.Link><NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/register'>Registrarse</NavLink></Nav.Link>
                <Nav.Link><NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/login'>Iniciar sesion</NavLink></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link><NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/profile'><i class="fa-solid fa-user"></i></NavLink></Nav.Link>
                <Nav.Link><NavLink className={setActiveClass} style={{textDecoration: 'none'}} to='/carrito'><i class="fa-solid fa-cart-shopping"></i></NavLink></Nav.Link>
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
