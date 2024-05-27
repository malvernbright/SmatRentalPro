import { Col, Container, Row, Table } from "react-bootstrap"
import { SideBar } from "./components/SideBar"
import { useFetch } from "../../hooks/useFetch";
import { getFormattedDate } from "../../config/dateHelper";

export const Applications = () => {
    const { data: applications } = useFetch(
        {
            queryKey: "applications",
            endpoint: "/api/applicants",
        });
  return (
    <Container fluid style={{marginTop:"60px"}} >
          <Row>
            <SideBar/>
            <Col sm={10} className="main-content">
              <h1>Property Applications</h1>
              <Col>
                <Table striped={true} bordered={true} hover={true} variant="dark">
                    <thead>
                        <tr>
                            <td>Property</td>
                            <td>Applicant Name</td>
                            <td>Applicant Email</td>
                            <td>Applicant Phone</td>
                            <td>Application Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications?.map((application) => {
                                return <tr key={application.id}>
                                    <td>{application.property}</td>
                                    <td>{application.name}</td>
                                    <td>{application.email}</td>
                                    <td>{application.phone}</td>
                                    <td>{getFormattedDate(application.created_at)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Col>
            </Col>
          </Row>
        </Container>
  )
}
