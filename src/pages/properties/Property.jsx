import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { PropertyApplicationSchema } from "../schemas/PropertyApplicationSchema";
// import { usePost } from "../../hooks/usePost";


export const Property = () => {
  const location = useLocation();
  const property = location.state.property;
  // const { data: profile } = usePost({ queryKey: "me", endpoint: "/api/auth/me" })
  const { postData, handleSubmit, errors, onSubmit } = PropertyApplicationSchema();

  ///TODO: Hide the form if the property has already been applied for

  return (
    <Container className="py-5 my-5" fluid={true}>
      {/* <h2>{profile?.email}</h2> */}
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
              <Form.Label>Your phone</Form.Label>
              <Form.Control type="text" placeholder="Phone..." {...postData('phone')} />
              <p className="text-muted error">{errors.phone?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your message</Form.Label>
              <Form.Control as="textarea" rows={3} value={`Hello I want to apply for ${property.title}`} {...postData('message')} />
              <p className="text-muted error">{errors.message?.message}</p>
            </Form.Group>
            <input type="hidden" value={property?.title} {...postData('property')} />
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
