import { useState } from "react";
import { FieldArray, Formik } from "formik";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import axios from "axios";
import { useFetch } from "../../../hooks/useFetch";
import { Response } from "../../common/Response";

export const EditOfferer = () => {
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);

  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let offererId;
  if (localStorage.getItem("user")) {
    offererId = retrievedData.id;
  }
  const { data: offerer } = useFetch("oferentes/" + offererId + "/");

  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    phone: yup.string().phone("AR").required("Ingresá un teléfono"),
    
  });

  const initialValue = {
    username: offerer.name || "",
    password: "",
    phone:offerer.phone || 0,
    provincia: offerer.provincia || '',
    empresa_fundacion: offerer.empresa_fundacion || '',
    docs: offerer.docs,
  };

  const submitHandler = async (formData) => {
    try {
      formData.pk = offererId;
      console.log(typeof formData);
      const response = await axios.patch(
        "http://localhost:8000/furever/api/oferentes/" + offererId + "/",
        formData
      );
      console.log(response);
      setFailed(false);
      setSuccessful(true);
    } catch (error) {
      console.log(error);
      setSuccessful(false);
      setFailed(true);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center light-bg">
              <h1 className="m-0 fur-text">Editar usuario</h1>
            </Card.Header>
            <Response
              fail={failed}
              failText="Ocurrio un error, revise la información proporcionada"
              success={successful}
              successText="Usuario actualizado correctamente"
            />
            <Card.Body className="mb-0">
              <Formik
                enableReinitialize
                validationSchema={schema}
                onSubmit={submitHandler}
                initialValues={initialValue}
              >
                {({
                  submitForm,
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit} className="">
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridUsername">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nombre de usuario"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={errors.username}
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nueva Contraseña"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          placeholder="Teléfono"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className="mb-3" controlId="formGridProvince">
                        <Form.Label>
                          ¿En que provincia está ubicado/a?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="provincia"
                          onChange={handleChange}
                          value={values.provincia}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGridFundation"
                      >
                        <Form.Label>
                          Nombre de empresa o fundación. (En caso de pertenecer
                          a una)
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="empresa_fundacion"
                          onChange={handleChange}
                          value={values.empresa_fundacion}
                        />
                      </Form.Group>
                    </Row>

                    <FieldArray name="docs">
                      {({ insert, remove, push }) => (
                        <Form.Group className="mb-3" controlId="formGridPhotos">
                          <Form.Label>
                            Documentación (solo en caso de venta)
                          </Form.Label>
                          {values.docs?.length > 0 &&
                            values.docs.map((docs, index) => (
                              <div key={index}>
                                <Form.Control
                                  type="url"
                                  placeholder="Inserte el link de compartir archivo aquí"
                                  name={`docs.${index}`}
                                  value={docs}
                                  onChange={handleChange}
                                />
                                <Button
                                  className="mt-2 close-btn border border-0"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Eliminar Documento
                                </Button>
                              </div>
                            ))}

                          <Button
                            className="mt-2 add-btn border border-2 "
                            type="button"
                            onClick={() => push("")}
                          >
                            Añadir Documentación
                          </Button>
                        </Form.Group>
                      )}
                    </FieldArray>

                    <div className="d-flex flex-row align-items-center">
                      <Button
                        className=" w-25 me-2 submit-btn border border-0"
                        onClick={submitForm}
                      >
                        Actualizar
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
