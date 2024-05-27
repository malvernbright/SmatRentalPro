import { Button, Container, Form, Image, Row } from "react-bootstrap"
import logo from "../../assets/logo.png"
import { useState } from "react";
import api from "../../config/api";


export const RegistrationComplete = () => {
    const url = "/api/auth/verify-email";
    const [email, setEmail] = useState("");

    const resendEmail = async () => {
        await api.post(url, { email: email })
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                } else {
                    // console.log(res.data)
                }
            }).catch(error => {
                console.error(error);
                throw error;
            })
    }
    return (
        <Container className="card" style={{alignContent:"center", alignItems:"center", width:"700px", justifyItems:"center", justifyContent:"center", verticalAlign:"center", marginTop: "100px", padding:"50px"}}>
            <Image src={logo} width="300px"/>
            <h3 className="success alert-success">Registration successful!</h3>
            <p>Please check your inbox to complete registration process</p>
            <Row>
                <p>Didn&apos;t receive an email?</p>
                <Form onSubmit={resendEmail} >
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="your email..."
                        required={true}
                    />
                    <Button variant="outline-primary primary my-2" style={{width:"inherit"}} type="submit">Resend Verification Email</Button>
                </Form>
            </Row>
        </Container>
    )
}
