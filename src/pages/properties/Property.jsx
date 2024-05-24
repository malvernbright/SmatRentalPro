import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import { usePost } from "../../hooks/usePost";
import { PropertyApplicationSchema } from "../auth/schemas/PropertyApplicationSchema";
// import { useState, useEffect } from "react";
/**
 * 
 * @returns data
 * {
  "id": 1,
  "name": "admin",
  "email": "gondomalvernb@gmail.com",
  "email_verified_at": "2024-05-24T10:51:49.000000Z",
  "created_at": "2024-05-24T10:51:49.000000Z",
  "updated_at": "2024-05-24T10:51:49.000000Z"
}
 */

export const Property = () => {
  const location = useLocation();
  const property = location.state.property;
  // const url = "/api/auth/me";
  // const { data: profile } = usePost({ queryKey: "me", endpoint: url })
  const { postData, handleSubmit, errors, onSubmit } = PropertyApplicationSchema();

  return (
    <Container className="py-5 my-5" fluid={true}>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title><h3>{property.title}</h3></Card.Title>
            </Card.Header>
            <Card.Img src={property.property_image} />
            <Card.Body>{property.description}</Card.Body>
            <Card.Footer>${property.price}/{property.tenure}</Card.Footer>
          </Card>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Text><h2>Apply for property</h2></Form.Text>
            <Form.Group>
              <Form.Label>Your name</Form.Label>
              <Form.Control type="text" placeholder="Name..." {...postData('name')} />
              <p className="text-muted error">{errors.name?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your email</Form.Label>
              <Form.Control type="email" placeholder="Email..." {...postData('email')} />
              <p className="text-muted error">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your phone</Form.Label>
              <Form.Control type="text" placeholder="Phone..." {...postData('phone')} />
              <p className="text-muted error">{errors.phone?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your message</Form.Label>
              <Form.Control as="textarea" rows={3} value={`Hello I want to apply for ${property.title}`} {...postData('message')} />
              <p className="text-muted error">{errors.message?.message}</p>
            </Form.Group>
            <input type="hidden" value={property?.id} {...postData('property_id')} />
            <hr />
            <Form.Group>
              <Button variant="outline-primary primary" type="submit" size="lg">Submit</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
