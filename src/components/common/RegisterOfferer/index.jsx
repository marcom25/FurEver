import { useState } from "react";
import { FieldArray, Formik } from "formik";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone-lite";
import { useFetch } from "../../../hooks/useFetch";

export const ResgisterOfferer = () => {
  const [formData, setFormData] = useState();
  const {loading, error, data} = useFetch("register/offerer", formData);

  const schema = yup.object().shape({
    username: yup.string().required("Ingresá un nombre de usuario"),
    password: yup.string().required("Ingresá una contraseña"),
    phone: yup.string().phone("AR").required("Ingresá un teléfono"),
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
              <Form.Group className="mb-3" controlId="formGridProvince">
                <Form.Label>¿En que provincia estás ubicado/a?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="provincia"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridFundation">
                <Form.Label>Nombre de empresa o fundación. (En caso de pertenecer a una)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="empresa_fundacion"
                  onChange={handleChange}
                />
              </Form.Group>

                
              </Row>

              <FieldArray name="photos">
                {({ insert, remove, push }) => (
                  <Form.Group className="mb-3" controlId="formGridPhotos">
                    <Form.Label>Documentacion (solo en caso de venta)</Form.Label>
                    {values.docs?.length > 0 &&
                      values.docs.map((docs, index) => (
                        <div key={index}>
                          <Form.Control
                            type="url"
                            placeholder="Poné el link de compartir archivo acá"
                            name={`photos.${index}.url`}
                            onChange={handleChange}
                          />
                          <Button type="button" onClick={() => remove(index)}>
                            Eliminar Documento
                          </Button>
                        </div>
                      ))}

                    <Button type="button" onClick={() => push({ url: "" })}>
                      Añadir Docuemntacion
                    </Button>
                  </Form.Group>
                )}
              </FieldArray>


              <Button variant="primary" onClick={submitForm}>
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
    </>

  )
}
