import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";

import Container from "./components/layout/Container";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
