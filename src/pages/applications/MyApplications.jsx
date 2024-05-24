import { Col, Container, Table } from "react-bootstrap"
import { useFetch } from "../../hooks/useFetch"
import { usePost } from "../../hooks/usePost"

export const MyApplications = () => {
    const { data: me } = usePost({ endpoint: "/api/auth/me" })
    const { data: applications } = useFetch(
        {
            queryKey: "my-applications",
            endpoint: "/api/applicants/my-applications",
            payload: { "email": me?.email }
        })
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
                                    <td>{application.property_id}</td>
                                    <td>{application.created_at}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        </Container>
    )
}
