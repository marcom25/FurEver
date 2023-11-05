import { FieldArray, Formik } from "formik";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { useFetch } from "../../../hooks/useFetch"
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";


import axios from "axios";
export const EditInterested = () => {
    const retrievedData = JSON.parse(localStorage.getItem("user"));
    let interestedId
    if (localStorage.getItem("user")) {
      interestedId = retrievedData.id;
    }
  const { data:interested } = useFetch("interesados/" + interestedId + "/");

  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    password: yup.string().required("Ingresá una contraseña"),
    phone: yup.string().phone("AR").required("Ingresá un teléfono"),
    tipo_hogar: yup.string().required("Elegí una opción"),
    horarios: yup.string().required("Elegí una opción"),
  });

  const [showDone, setShowDone] = useState("d-none");

  const initialValue = {
    username: interested.name || '',
    password: "example",
    phone:interested.phone || 0,
    ninos: interested.ninos || false,
    animales_previos: interested.animales_previos|| false,
    animales_actuales: interested.animales_actuales || false,
    tipo_hogar: interested.tipo_hogar || '',
    horarios: interested.horarios || '',
    photos: interested.photos || [],
    descripcion: interested.descripcion || '',
  };

  const submitHandler = async (formData) => {
    try {
        formData.pk = interestedId
        console.log(typeof formData)
        const response = await axios.patch(
          "http://localhost:8000/furever/api/interesados/" + interestedId + "/"
        ,formData);
        console.log(response)
        setShowDone("d-block")
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center light-bg fur-text">
              <h1 className="m-0 ">Editar usuario</h1>
            </Card.Header>
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
                          value={values.tipo_hogar}
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
                          value={values.horarios}
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
                                  name={`photos.${index}`}
                                  value={photo}
                                  onChange={handleChange}
                                />
                                <Button
                                  className="mt-2 close-btn border border-0 "
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Eliminar Foto
                                </Button>
                              </div>
                            ))}

                          <Button
                            className="mt-2 add-btn border border-2 "
                            type="button"
                            onClick={() => push("")}
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
                        value={values.descripcion}
                      />
                    </Form.Group>
                    
                    <div className="d-flex flex-row align-items-center">
                    <Button className=" w-25 me-2 submit-btn border border-0" onClick={submitForm}>
                      Actualizar
                    </Button>
                    <FaCheckCircle className={showDone} color="#5c9ead" size="1.5em" />
                    </div>
                    
                    
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
