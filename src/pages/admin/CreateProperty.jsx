import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { SideBar } from "./components/SideBar"
import { useState } from "react"
import { propertyFormDataPost } from "../schemas/propertyFormData"
// import {  propertyFormDataPost } from "../schemas/propertyFormData";

export const CreateProperty = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState(0)
  const [tenure, setTenure] = useState("")
  const [propertyImage, setPropertyImage] = useState(null)
  const { handleSubmit } = propertyFormDataPost({ title, description, size, price, tenure, propertyImage });
  // const [frequency, setFrequency] = useState('Monthly');
  // const { postData, handleSubmit, errors, onSubmit: createProperty } = PropertyCreationSchema();
  return (
    <Container fluid style={{ marginTop: "60px" }} >
      <Row>
        <SideBar />
        <Col sm={10} className="main-content">
          <h1 className="text-center">Create Property</h1>
          <Container style={{ width: "800px" }} className="card">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control required={true} type="text" placeholder="Property name..." onChange={(e) => setTitle(e.target.value)} />
                {/* <p className="error">{errors.title?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Property Description:</Form.Label>
                <Form.Control required={true} as="textarea" rows={3} placeholder="Property description..." onChange={(e) => setDescription(e.target.value)} />
                {/* <p className="error">{errors.description?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Property size (in sqm):</Form.Label>
                <Form.Control required={true} type="text" placeholder="Property size..." onChange={(e) => setSize(e.target.value)} />
                {/* <p className="error">{errors.size?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Price:</Form.Label>
                <Form.Control required={true} type="number" min={0} placeholder="Property price..." onChange={(e) => setPrice(e.target.value)} />
                {/* <p className="error">{errors.price?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Payment frequency:</Form.Label>
                <Form.Control required={true} type="text" placeholder="Payment frequency..." onChange={(e) => setTenure(e.target.value)} />
                {/* <FormSelect
                  // value={frequency}
                  // onChange={(e)=>setFrequency(e.target.value)}
                  aria-label="Select Frequency"
                  {...postData("tenure")}
                  >
                    <option value="Monthly" {...postData("tenure")}>Monthly</option>
                    <option value="Quarterly" {...postData("tenure")}>Quarterly</option>
                    <option value="Annual"{...postData("tenure")}>Annual</option>
                  </FormSelect> */}
                {/* <p className="error">{errors.tenure?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Property Image:</Form.Label>
                <input required={true} type="file" className="form-file form-control" onChange={(e) => setPropertyImage(e.target.files[0])} />
                {/* <p className="error">{errors.property_image?.message}</p> */}
              </Form.Group>
              <Form.Group>
                <Button variant="outline-primary primary my-2" style={{ width: "inherit" }} type="submit">Create Property</Button>                  <p className="error"></p>
              </Form.Group>
            </Form>

          </Container>
        </Col>
      </Row>
    </Container>
  )
}
