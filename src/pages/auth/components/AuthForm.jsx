import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import "./Form.css"


export default function AuthForm({ method }) {
    const name = method === "login" ? "Login" : "Register";
    const { register: userRegister, handleSubmit: registerSubmit, onSubmit: onRegisterSubmit, errors: registerErrors } = RegisterSchema();
    const { login, handleSubmit: loginSubmit, onSubmit: onLoginSubmit, errors: loginErrors } = LoginSchema();
    return (
        <Container className="my-5 py-5">
            {
                method === "register" &&
                <Container style={{ width: "500px", padding: "10px", marginTop: "10px" }} className="card">
                    <Form onSubmit={registerSubmit(onRegisterSubmit)}>
                        <h1>{name}</h1>
                        <Form.Control type="text" placeholder="Full name..." {...userRegister("name")} />
                        <p className="error">{registerErrors.name?.message}</p>
                        <Form.Control type="text" placeholder="Email..." {...userRegister("email")} />
                        <p className="error">{registerErrors.email?.message}</p>
                        <Form.Control type="password" placeholder="Password..." {...userRegister("password")} />
                        <p className="error">{registerErrors.password?.message}</p>
                        <Form.Control type="password" placeholder="Confirm password..." {...userRegister("confirmPassword")} />
                        <p className="error">{registerErrors.confirmPassword?.message}</p>
                        <Button type="submit">{name}</Button>
                        <p className="text-muted my-100">Already have an account? <Link to="/login">Login</Link></p>
                    </Form>
                </Container>
            }
            {
                method === "login" &&
                <Container style={{ width: "500px", padding: "10px", marginTop: "10px" }} className="card">
                    <Form onSubmit={loginSubmit(onLoginSubmit)}>
                        <h1>{name}</h1>
                        <Form.Control type="text" placeholder="Email..." {...login("email")} />
                        <p className="error">{loginErrors.email?.message}</p>
                        <Form.Control type="password" placeholder="Password..." {...login("password")} />
                        <p className="error">{loginErrors.password?.message}</p>
                        <Button type="submit">{name}</Button>
                        <p className="text-muted">Don&apos;t have an account? <Link to="/register">Register</Link></p>
                    </Form>
                </Container>
            }
        </Container>
    );
}