import { useState } from "react";
import { FieldArray, Formik } from "formik";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { API } from "../../../API/API";
import { Response } from "../Response";


export const ResgisterOfferer = () => {
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);

  const provinces = [
    "Elegir provincia",
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
  ];


  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    password: yup.string().required("Ingresá una contraseña"),
    phone: yup.string().phone("AR").required("Ingresá un teléfono"),
    provincia: yup.string().required("Ingresá una provincia"),
  });

  const initialValue = {
    username: "",
    password: "",
    phone: "",
    provincia: "",
    empresa_fundacion: "",
    docs: [
      {
        url: "",
      },
    ],
  };

  const submitHandler = async (formData) => {
    try {
      const response = await API.post("register/offerer", formData);
      setFailed(false);
      setSuccessful(true);
      window.location.assign("/login");
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
              <h1 className="m-0 fur-text">Registro de usuario</h1>
            </Card.Header>
            <Response
              fail={failed}
              failText="Ya hay un usuario registrado con ese nombre de usuario, por favor elija otro."
              success={successful}
              successText="Usuario registrado correctamente"
            />
            <Card.Body className="mb-0">
              <Formik
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
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
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
                          as="select"
                          type="select"
                          required
                          defaultValue="Elegir provincia"
                          name="provincia"
                          onChange={handleChange}
                          isInvalid={errors.provincia}
                        >
                          {provinces.map((province, index) => (
                            <option htmlSize={provinces.length / 2} key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.provincia}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGridFundation"
                      >
                        <Form.Label>
                          Nombre de empresa o fundación. (En caso de pertenecera
                          una)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nombre de empresa o fundación"
                          name="empresa_fundacion"
                          onChange={handleChange}
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
                                  name={`docs.${index}.url`}
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
                            onClick={() => push({ url: "" })}
                          >
                            Añadir Documentación
                          </Button>
                        </Form.Group>
                      )}
                    </FieldArray>

                    <Button
                      className="mb-3 w-25 submit-btn border border-0"
                      onClick={submitForm}
                    >
                      Registrarse
                    </Button>
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
