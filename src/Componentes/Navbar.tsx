import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbarr.css'

const Barra: React.FC = () => {
    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">FUTBOL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"> 
                        <Nav.Link as={Link} to="/CrearPresi">Crear Presidente</Nav.Link>
                        <Nav.Link as={Link} to="/">Crear Equipos</Nav.Link>
                        <Nav.Link as={Link} to="/ListarEquipo">Listar Equipos</Nav.Link>
                         <Nav.Link as={Link} to="/ListarPresi">Listar Presidentes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Barra;