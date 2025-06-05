import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbarr.css';

const Barra: React.FC = () => {
    return (
        <Navbar expand="lg" className="navbarr">
            <Container fluid>
                <Navbar.Brand className="logo">FUTBOL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto links"> 
                        <Link to="/">Crear Equipos</Link>
                        <Link to="/FormularioPresi">Crear Presidente</Link>
                        <Link to="/ListarEquipo">Listar Equipos</Link>
                        <Link to="/ListarPresi">Listar Presidentes</Link>
                    </Nav>
                </Navbar.Collapse>
                <img src="logo.png" alt="logo" />
            </Container>
        </Navbar>
    );
};

export default Barra;