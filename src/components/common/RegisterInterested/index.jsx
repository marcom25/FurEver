import { useState, useEffect } from "react";
import { FieldArray, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
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

  const [formData, setFormData] = useState();

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await API.post("register/interested/", formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    postData();
  }, [formData]);

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Registro de usuario</h1>
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
                    label="¿Tenés hijos?"
                    name="ninos"
                    checked={values.ninos}
                    onChange={handleChange}
                    reverse
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrevAnim">
                  <Form.Check
                    label="¿Tuviste animales previos?"
                    name="animales_previos"
                    checked={values.animales_previos}
                    onChange={handleChange}
                    reverse
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridNowAnim">
                  <Form.Check
                    label="¿Tenés animales actualmente?"
                    name="animales_actuales"
                    checked={values.animales_actuales}
                    onChange={handleChange}
                    reverse
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAnimSpace">
                  <Form.Label>Espacio para el animal</Form.Label>
                  <Form.Control
                    type="select"
                    as="select"
                    required
                    defaultValue="Elegí un espacio"
                    name="tipo_hogar"
                    onChange={handleChange}
                    isInvalid={errors.username}
                  >
                    <option value="">Elegí un espacio</option>
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
                    ¿Cuanto tiempo le vas a poder dedicar al animal?
                  </Form.Label>
                  <Form.Control
                    type="select"
                    as="select"
                    required
                    defaultValue="Elegí un rango horario"
                    name="horarios"
                    onChange={handleChange}
                    isInvalid={errors.username}
                  >
                    <option value="">Elegí un rango horario</option>
                    <option value="2-3 horas por día">2-3 horas por día</option>
                    <option value="4-5 horas por día">4-5 horas por día</option>
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
                            placeholder="Poné el link de compartir foto acá"
                            name={`photos.${index}.url`}
                            onChange={handleChange}
                          />
                          <Button type="button" onClick={() => remove(index)}>
                            Eliminar Foto
                          </Button>
                        </div>
                      ))}

                    <Button type="button" onClick={() => push({ url: "" })}>
                      Añadir Foto
                    </Button>
                  </Form.Group>
                )}
              </FieldArray>

              <Form.Group className="mb-3" controlId="formGridDescription">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Una breve descripcion de como sos"
                  name="descripcion"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={submitForm}>
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
    </>
  );
};
