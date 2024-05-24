import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap"
import logo from "../../assets/logo.png"
import { useContext } from "react"
import { AppContext } from "../../App"

export const AppNav = () => {
    const { isAuthorized } = useContext(AppContext)
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand href="/"><Image src={logo} width="150px" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        
                        {
                            isAuthorized ? <Nav.Link href="/logout">Logout</Nav.Link> : 
                            <NavDropdown title="Signin/Signup" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">
                                    Register
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
