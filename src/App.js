import { Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Furbar } from "./layouts/Furbar";
import { Footer } from "./layouts/Footer";
import { LandingOfferer } from "./layouts/LandingOfferer";
import { LandingInterested } from "./layouts/LandingInterested";
import { useFetch } from "./hooks/useFetch";

function App() {
  // const {loading, error, data} = useFetch("animal-adp/");
  return (
    <>
      <Container fluid>
        <Row>
          <Furbar />
        </Row>
        <Row>
          <Routes>
            <Route path="offerer" element={<LandingOfferer />} />
            <Route path="interested" element={<LandingInterested />} />
          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default App;
