import { Col, Container, Table } from "react-bootstrap"
import { useFetch } from "../../hooks/useFetch"
import { usePost } from "../../hooks/usePost"
import { getFormattedDate } from "../../config/dateHelper";
// import { useEffect } from "react";

export const MyApplications = () => {
    const { data: me } = usePost({ endpoint: "/api/auth/me" });
    let data0 = JSON.stringify({ "email": me?.email });
    let data1 = JSON.parse(data0)
    const { data: applications } = useFetch(
        {
            queryKey: "my-applications",
            endpoint: "/api/applicants/my-applications",
            payload: data1
        });
    
    return (
        <Container className="my-5 py-5">
            <Col>
                <Table striped={true} bordered={true} hover={true} variant="dark">
                    <thead>
                        <tr>
                            <td>Property</td>
                            <td>Application Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications?.map((application) => {
                                return <tr key={application.id}>
                                    <td>{application.title}</td>
                                    <td>{getFormattedDate(application.created_at)}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        </Container>
    )
}
