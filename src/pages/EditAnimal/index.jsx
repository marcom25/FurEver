import { useState, useEffect } from "react";
import { FieldArray, Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { FaCheckCircle } from "react-icons/fa";

import {
  Row,
  Col,
  Form,
  Button,
  FormSelect,
  Container,
  Card,
} from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import axios from "axios";

// import { useFetch } from "../../../hooks/useFetch";

export const EditAnimal = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [showDone, setShowDone] = useState("d-none");
  const animalPk = searchParams.get("pk")  
  const schema = yup.object().shape({
    nombre: yup.string().required("Ingresá un nombre"),
    especie: yup.string().required("Ingresá una especie"),
    edad: yup.string().required("Ingresá una edad aproximada"),
  });
  const { data:animal } = useFetch("animal-adp/" + animalPk + "/");
  
  
  const initialValue = {
    nombre: animal.nombre,
    especie: animal.especie,
    raza: animal.raza,
    vacunas_completas: animal.vacunas_completas,
    edad: animal.edad,
    genero: animal.genero,
    peso: animal.peso,
    descripcion: animal.descripcion,
    necesidades_esp: animal.necesidades_esp,
    photo_urls:animal.photos ? animal.photos.map(obj => obj.link) : [],
  };

  

  const submitHandler = async (formData) => {
    try {
        formData.pk = animalPk
        console.log(typeof formData)
        const response = await axios.patch(
          "http://localhost:8000/furever/api/animal-adp/" + animalPk + "/"
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
            <Card.Header className="text-center light-bg">
              <h1 className="my-4 fur-text">Editar tarjeta de animal</h1>
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
                    <Row className="mb-3 ">
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nombre del animal</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridAnimSpecies">
                        <Form.Label>Especie</Form.Label>
                        <FormSelect
                          type="text"
                          as="select"
                          required
                          defaultValue="Elige una especie"
                          name="especie"
                          onChange={handleChange}
                        >
                          <option value="P">Perro</option>
                          <option value="G">Gato</option>
                          <option value="C">Conejo</option>
                          <option value="T">Tortuga</option>
                          <option value="S">Serpiente</option>
                          <option value="DG">De granja</option>
                          <option value="O">Otros</option>
                        </FormSelect>
                        <Form.Control.Feedback type="invalid">
                          {errors.especie}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridKind">
                        <Form.Label>Raza</Form.Label>
                        <Form.Control
                          type="text"
                          name="raza"
                          value={values.raza}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formGridAnimGender">
                        <Form.Label>Género</Form.Label>
                        <FormSelect
                          type="text"
                          as="select"
                          required
                          value={values.genero}
                          name="genero"
                          onChange={handleChange}
                        >
                          <option value="M">Macho</option>
                          <option value="H">Hembra</option>
                        </FormSelect>
                        <Form.Control.Feedback type="invalid">
                          {errors.genero}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="edad"
                          value={values.edad}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Peso Aporx.</Form.Label>
                        <Form.Control
                          type="text"
                          name="peso"
                          value={values.peso}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formGridDescription"
                      >
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Una breve descripción del animal"
                          name="descripcion"
                          value={values.descripcion}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        controlId="formGridVac"
                        className="d-flex justify-content-start"
                      >
                        <Form.Check
                          label="El animal tiene todas sus vacunas completas:"
                          name="vacunas_completas"
                          checked={values.vacunas_completas}
                          onChange={handleChange}
                          reverse
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formGridNeeds">
                        <Form.Label>
                          ¿Tiene alguna necesidad o cuidado especial?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Dieta especial, ..."
                          name="necesidades_esp"
                          value={values.necesidades_esp}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <FieldArray name="photo_urls">
                      {({ insert, remove, push }) => (
                        <Form.Group className="mb-3" controlId="formGridPhotos">
                          <Form.Label>
                            Fotos del animal (min. una foto)
                          </Form.Label>
                          {values.photo_urls?.length > 0 &&
                            values.photo_urls.map((photo, index) => (
                              <div key={index}>
                                <Form.Control
                                  type="url"
                                  placeholder="Poné el link de compartir foto aquí"
                                  name={`photo_urls.${index}`}
                                  value={photo}
                                  onChange={handleChange}
                                />
                                <Button
                                  type="button"
                                  className="mt-2"
                                  onClick={() => remove(index)}
                                >
                                  Eliminar Foto
                                </Button>
                              </div>
                            ))}

                          <Button
                            className="m-2 add-btn border border-2 "
                            type="button"
                            onClick={() => push({ url: "" })}
                          >
                            Añadir Foto
                          </Button>
                        </Form.Group>
                      )}
                    </FieldArray>

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
    </Container>
  );
};
