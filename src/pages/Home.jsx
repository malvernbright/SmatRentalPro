import { Card, Col, Container, Row } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch"
import LoadingIndicator from "../pages/components/LoadingIndicator"
import { Link } from "react-router-dom";

export const Home = () => {
  const { data: properties, error, isLoading } = useFetch({ queryKey: "properties", endpoint: "/api/properties" });

  if (isLoading) {
    return <LoadingIndicator />
  }
  if (error) {
    return <Container fluid={true}>
      {error.message}
    </Container>
  }

  return (
    <Container className="py-5 my-5">
      {
        properties?.map((property) => {
          return <Row key={property.id} className="px-5 my-2">
            <Link style={{ textDecoration: "none" }}
              to={`/properties/${property.id}`}
              state={{ property: property }}
            >
              <Card>
                <Row>
                  <Col>
                    <Card.Img src={property.property_image} />
                  </Col>
                  <Col>
                    <h1>{property.title}</h1>
                    <hr />
                    <Row>
                      <Col>
                        <p>{property.description}</p>
                        <p className="text-muted" style={{ fontSize: "12px" }}>${property.price}/{property.tenure}</p></Col>
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Row>
        })
      }
    </Container>
  )
}
