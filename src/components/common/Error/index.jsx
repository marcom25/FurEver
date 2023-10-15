import { Container, Image } from "react-bootstrap";

export const Error = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-4">
      <h1>¡Lo sentimos!</h1>
      <Image
        src="/images/maintenence-_ogo.png"
        className="w-25"
        alt="logo-mentenimiento"
        fluid
      />
      <p>Esta pagina esta bajo mentenimiento, ¡Regresa mas tarde!</p>
    </Container>
  );
};
