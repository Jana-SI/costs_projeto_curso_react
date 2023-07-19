import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/pages/Home";
import Empresa from "./components/pages/Empresa";
import Contato from "./components/pages/Contato";
import NovoProjeto from "./components/pages/NovoProjeto";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Projetos from "./components/pages/Projetos";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/empresa" element={<Empresa />} />
          <Route exact path="/contato" element={<Contato />} />
          <Route exact path="/novoprojeto" element={<NovoProjeto />} />
          <Route exact path="/projetos" element={<Projetos />} />
        </Routes>
      </Container>      
      <Footer />
    </Router>
  );
}

export default App;
