import { Col, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap'

export const SideBar = () => {
  return (
    <Col sm={2} className="bg-light sidebar">
              <Navbar variant="light">
                <Nav className="flex-column">
                  <NavItem>
                    <NavLink href="/applications">Applications</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/create-property">Create Property</NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </Col>
  )
}
