import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
  return (
    <>
      <Row className="my-2 text-white">
        <Col>
          <h5 className="text-uppercase text-center">Autores</h5>
        </Col>
      </Row>
      <Row className="justify-content-center text-white">
        <ul className="list-unstyled d-md-flex justify-content-around text-center">
          <Col md={4}>
            <h4>
              <BsLinkedin /> Linkedin
            </h4>
            <li>
              <p className="fs-5">
                <a
                  className="text-decoration-none pe-1 link"
                  href="https://www.linkedin.com/in/marco-mignacco-001547234/"
                >
                  Marco
                </a>
                |
                <a
                  className="text-decoration-none ps-1 link"
                  href="https://www.linkedin.com/in/pol-rivarola/"
                >
                  Pol
                </a>
              </p>
            </li>
          </Col>
          <Col md={4}>
            <h4>
              <BsGithub /> Github
            </h4>
            <li>
              <p className="fs-5">
                <a
                  className="text-decoration-none pe-1 link"
                  href="https://github.com/marcom25"
                >
                  Marco
                </a>
                |
                <a
                  className="text-decoration-none ps-1 link"
                  href="https://github.com/PolRivarola"
                >
                  Pol
                </a>
              </p>
            </li>
          </Col>
          <Col md={4}>
            <h4>
              <SiGmail /> Gmail
            </h4>
            <li>
              <p className="fs-5">
                <a
                  className="text-decoration-none pe-1 link"
                  href="mailto:marcomignacco03@gmail.com?"
                >
                  Marco
                </a>
                |
                <a
                  className="text-decoration-none ps-1 link"
                  href="mailto:rivarolapol@gmail.com?"
                >
                  Pol
                </a>
              </p>
            </li>
          </Col>
        </ul>
      </Row>
    </>
  );
};
