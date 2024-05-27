import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "./components/SideBar";

export const Dashboard = () => {
    return (
        <Container fluid style={{marginTop:"60px"}} >
          <Row>
            <SideBar/>
            <Col sm={10} className="main-content">
              <h1>Dashboard Content</h1>
              {/* <!-- Add your dashboard content here --> */}
            </Col>
          </Row>
        </Container>
      );
    
}
