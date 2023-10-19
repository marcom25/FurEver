import { useState, useEffect } from "react";
import { FieldArray, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { API } from "../../API/API";

// import { useFetch } from "../../../hooks/useFetch";

export const CreateAnimal = () => {
  

  const schema = yup.object().shape({
    nombre: yup.string().required("Ingresá un nombre"),
    especie: yup.string().required("Ingresá una especie"),
    edad: yup.string().required("Ingresá una edad aproximada"),
    
  });

  const initialValue = {
    nombre: "",
    especie: "",
    raza: "",
    vacunas_completas: false,
    edad: 0,
    genero: "",
    peso: "",
    descripcion: "",
    oferente: localStorage.getItem("user").id,
    photo_urls: [
      {
        url: "",
      },
    ],
  };

  const submitHandler = async (formData) => {
    try {
      const response = await API.post("animal-adp/", formData);
      localStorage.setItem("user", JSON.stringify(response.data.user_data));
      window.location.assign("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Creacion de tarjeta de animal</h1>
        </Col>
      </Row>
      <Row>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={initialValue}
        >
          {({ submitForm, handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className="">
              <Row className="mb-3">
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
                  <Form.Control
                    type="select"
                    as="select"
                    required
                    defaultValue="Elige una especie"
                    name="especie"
                    value={values.especie}
                    onChange={handleChange}
                  >
                    <option value="P">Perro</option>
                    <option value="G">Gato</option>
                    <option value="C">Conejo</option>
                    <option value="T">Tortuga</option>
                    <option value="S">Serpiente</option>
                    <option value="DG">De granja</option>
                    <option value="O">Otros</option>
                  </Form.Control>
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

                <Form.Group as={Col} controlId="formGridAnimGender">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="select"
                    as="select"
                    defaultValue="M"
                    name="genero"
                    value={values.genero}
                    onChange={handleChange}
                  >
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>

                  </Form.Control>
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

                

                <Form.Group className="mb-3" controlId="formGridDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Una breve descripcion del animal"
                  name="descripcion"
                  onChange={handleChange}
                />
                </Form.Group>


                <Form.Group as={Col} controlId="formGridVac">
                  <Form.Check
                    label="¿El animal tiene todas sus vacunas completas?"
                    name="vacunas_completas"
                    checked={values.vacunas_completas}
                    onChange={handleChange}
                    reverse
                  />
                </Form.Group>

                
              </Row>

              <FieldArray name="photo_urls">
                {({ insert, remove, push }) => (
                  <Form.Group className="mb-3" controlId="formGridPhotos">
                    <Form.Label>Fotos del animal (min. una foto)</Form.Label>
                    {values.photo_urls?.length > 0 &&
                      values.photo_urls.map((photo_urls, index) => (
                        <div key={index}>
                          <Form.Control
                            type="url"
                            placeholder="Poné el link de compartir foto aquí"
                            name={`photo_urls.${index}.url`}
                            onChange={handleChange}
                          />
                          <Button type="button" className="mb-2" onClick={() => remove(index)}>
                            Eliminar Foto
                          </Button>
                        </div>
                      ))}

                    <Button type="button"  onClick={() => push({ url: "" })}>
                      Añadir Foto
                    </Button>
                  </Form.Group>
                )}
              </FieldArray>

              <Row className="d-flex justify-content-center">
              <Button variant="primary" className="mb-3 w-25" onClick={() => console.log(values)}>
                Registrarse
              </Button>
              </Row>
              
            </Form>
          )}
        </Formik>
      </Row>
    </>

  )
}
