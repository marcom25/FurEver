import { Container, Row } from "react-bootstrap";

import { Furbar } from "./layouts/Furbar";
import { Footer } from "./layouts/Footer";
import { MyRoutes } from "./routes";

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Furbar />
        </Row>
        <Row className="justify-content-center">
          <MyRoutes />
        </Row>
        <Row className="position-absolute bottom-0 w-100">
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default App;
