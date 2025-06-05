import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormularioPresid from "./Presidente/FormularioPresi";
import FormularioEqui from "./Equipo/FormularioEqui";
import Navbar from "./Componentes/Navbar"; 
import ListarEquipo from "./Equipo/ListarEqui";
import ListarPresi from './Presidente/ListarPresi';
import './index.css'


function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<FormularioEqui />} />
        <Route path="/FormularioPresi" element={<FormularioPresid/>} />
        <Route path="/ListarEquipo" element={<ListarEquipo />} />
        <Route path="/ListarPresi" element={<ListarPresi />} />

      </Routes>
    </Router>
  );
}

export default App;
