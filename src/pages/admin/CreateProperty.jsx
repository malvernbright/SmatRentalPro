import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { SideBar } from "./components/SideBar"
import { useState } from "react"
// import { propertyFormDataPost } from "../schemas/propertyFormData"
import api from "../../config/api"
import LoadingIndicator from "../components/LoadingIndicator"
// import {  propertyFormDataPost } from "../schemas/propertyFormData";

export const CreateProperty = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState(0)
  const [tenure, setTenure] = useState("")
  const [propertyImage, setPropertyImage] = useState(null)
  // const { handleSubmit } = propertyFormDataPost({ title, description, size, price, tenure, propertyImage });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    // Create a FormData object
    const formData = new FormData();

    // Append file to the formData object here
    formData.append('title', title);
    formData.append('description', description);
    formData.append('size', size);
    formData.append('price', price);
    formData.append('tenure', tenure);
    formData.append('property_image', propertyImage);

    try {
      // We will send formData object as a data to the API URL here.
      api.post("/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        alert("Property Posted Successfully");
        setIsLoading(false)
        console.log(res.data)
      }).catch((error) => {
        alert("Error")
        setIsLoading(false)
        console.error(error)
      });
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleFileSelect = (event) => {
    // we only get the selected file from input element's event
    setPropertyImage(event.target.files[0])
  }
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
                <input required={true} type="file" className="form-file form-control" onChange={handleFileSelect} />
                {/* <p className="error">{errors.property_image?.message}</p> */}
              </Form.Group>
              <Form.Group>
                {isLoading ? <LoadingIndicator /> : <Button variant="outline-primary primary my-2" style={{ width: "inherit" }} type="submit">Create Property</Button>}
                <p className="error"></p>
              </Form.Group>
            </Form>

          </Container>
        </Col>
      </Row>
    </Container>
  )
}
