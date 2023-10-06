import React from "react";
import { AnimalCard } from "../../components/Interested/AnimalCard";
import { Col, Container, Row } from "react-bootstrap";

export const LandingInterested = () => {
  return (
    <>
      <Row>
        <Col>
          <h1>LandingIntereste</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AnimalCard />
        </Col>
      </Row>
    </>
  );
};
