import { FieldArray, Formik } from "formik";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { API } from "../../../API/API";

export const RegisterInterested = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    password: yup.string().required("Ingresá una contraseña"),
    phone: yup.string().phone("AR").required("Ingresá un teléfono"),
    tipo_hogar: yup.string().required("Elegí una opción"),
    horarios: yup.string().required("Elegí una opción"),
  });

  const initialValue = {
    username: "",
    password: "",
    phone: "",
    ninos: false,
    animales_previos: false,
    animales_actuales: false,
    tipo_hogar: "",
    horarios: "",
    photos: [
      {
        url: "",
      },
    ],
    descripcion: "",
  };

  const submitHandler = async (formData) => {
    try {
      const response = await API.post("register/interested", formData);
      console.log(response);
      window.location.assign("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center text-white light-bg">
              <h1 className="m-0">Registro de usuario</h1>
            </Card.Header>
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
                      <Form.Group as={Col} controlId="formGridHasKids">
                        <Form.Check
                          label="¿Tiene hijos?"
                          name="ninos"
                          checked={values.ninos}
                          onChange={handleChange}
                          
                        />
                      </Form.Group>
                      <Form.Group controlId="formGridPrevAnim">
                        <Form.Check
                          label="¿Tuvo animales previos?"
                          name="animales_previos"
                          checked={values.animales_previos}
                          onChange={handleChange}
                          
                        />
                      </Form.Group>
                      <Form.Group controlId="formGridNowAnim">
                        <Form.Check
                          label="¿Tiene animales actualmente?"
                          name="animales_actuales"
                          checked={values.animales_actuales}
                          onChange={handleChange}
                          
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridAnimSpace">
                        <Form.Label>
                          ¿Cuanto espacio tendrá el animal?
                        </Form.Label>
                        <Form.Control
                          type="select"
                          as="select"
                          required
                          defaultValue="Eliga un espacio"
                          name="tipo_hogar"
                          onChange={handleChange}
                          isInvalid={errors.username}
                        >
                          <option value="">Eliga un espacio</option>
                          <option value="Menos de 50m²">Menos de 50m²</option>
                          <option value="Entre 50m² y 150m²">
                            Entre 50m² y 150m²
                          </option>
                          <option value="Entre 150m² y 300m²">
                            Entre 150m² y 300m²
                          </option>
                          <option value="Entre 300m² y 500m²">
                            Entre 300m² y 500m²
                          </option>
                          <option value="Más de 500m²">Más de 500m²</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.tipo_hogar}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridSchedules">
                        <Form.Label>
                          ¿Cuanto tiempo le podrá dedicar al animal?
                        </Form.Label>
                        <Form.Control
                          type="select"
                          as="select"
                          required
                          defaultValue="Eliga un rango horario"
                          name="horarios"
                          onChange={handleChange}
                          isInvalid={errors.username}
                        >
                          <option value="">Eliga un rango horario</option>
                          <option value="2-3 horas por día">
                            2-3 horas por día
                          </option>
                          <option value="4-5 horas por día">
                            4-5 horas por día
                          </option>
                          <option value="Más de 6 horas">Más de 6 horas</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.tipo_hogar}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <FieldArray name="photos">
                      {({ insert, remove, push }) => (
                        <Form.Group className="mb-3" controlId="formGridPhotos">
                          <Form.Label>Fotos del espacio del animal</Form.Label>
                          {values.photos?.length > 0 &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Form.Control
                                  type="url"
                                  placeholder="Inserte el link de compartir foto aquí"
                                  name={`photos.${index}.url`}
                                  onChange={handleChange}
                                />
                                <Button
                                  className="mt-2 bg-danger border border-0 text-black"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Eliminar Foto
                                </Button>
                              </div>
                            ))}

                          <Button
                            className="mt-2 bg-white border border-2 text-black"
                            type="button"
                            onClick={() => push({ url: "" })}
                          >
                            Añadir Foto
                          </Button>
                        </Form.Group>
                      )}
                    </FieldArray>

                    <Form.Group
                      className="mb-3"
                      controlId="formGridDescription"
                    >
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Una breve descripción suya"
                        name="descripcion"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button className="mb-3 w-25 fur-bg border border-0" onClick={submitForm}>
                      Registrarse
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row></Row>
    </Container>
  );
};
