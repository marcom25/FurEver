import { useState, useEffect } from "react";
import { FieldArray, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { API } from "../../API/API";

// import { useFetch } from "../../../hooks/useFetch";

export const CreateAnimal = () => {
  const [formData, setFormData] = useState();
  
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await API.post("animal-adp/", formData);
      } catch (error) {
        console.log(error);
      }
    } 

    postData();
  }, [formData]);

  const schema = yup.object().shape({
    nombre: yup.string().required("Ingresá un nombre"),
    especie: yup.string().required("Ingresá una especie"),
    edad: yup.string().required("Ingresá una edad aproximada"),
    photo_urls: yup.string().required("Ingresá al menos una foto"),
  });

  const initialValue = {
    nombre: "",
    especie: "",
    raza: "",
    vacunas_completas: "",
    edad: "",
    genero: "",
    peso: "",
    descripcion: "",
    oferente: "",
    photo_urls: [
      {
        url: "",
      },
    ],
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
          onSubmit={setFormData}
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
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAnimSpecies">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="select"
                    as="select"
                    defaultValue="M"
                    name="genero"
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
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Peso Aporx.</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="peso"
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
              <Button variant="primary" className="mb-3 w-25" onClick={submitForm}>
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
