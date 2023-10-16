import { useState } from "react";
import { Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { usePost } from "../../hooks/usePost";

export const Login = () => {
  const [formData, setFormData] = useState();
  console.log(formData);
  const { loading, error, data } = usePost("login/", formData);
  console.log(error);

  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    password: yup.string().required("Ingresá una contraseña"),
  });

  const initialValue = {
    username: "",
    password: "",
  };

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Iniciar Sesión</h1>
        </Col>
      </Row>
      <Row>
        <Formik
          validationSchema={schema}
          onSubmit={setFormData}
          initialValues={initialValue}
        >
          {({ submitForm, handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3">
              <Form.Group controlId="formGridUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={submitForm}>
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
    </>
  );
};
