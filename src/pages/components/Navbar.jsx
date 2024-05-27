import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap"
import logo from "../../assets/logo.png"
import { useContext } from "react"
import { AppContext } from "../../App"
import { ACCESS_LEVEL } from "../../config/constants"

export const AppNav = () => {
    const { isAuthorized } = useContext(AppContext)
    const admin = sessionStorage.getItem(ACCESS_LEVEL)
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand href="/"><Image src={logo} width="150px" height="inherit" alt="Smatech Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/properties/my-applied-properties">My Applications</Nav.Link>
                        {
                            isAuthorized ? <Nav.Link href="/logout">Logout</Nav.Link> : 
                            <NavDropdown title="Signin/Signup" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">
                                    Register
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        {
                            admin &&
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
