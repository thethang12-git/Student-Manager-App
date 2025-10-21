'use client'
import Form from 'react-bootstrap/Form';
export default function CreateForm({formik} : any) {
  return (
    <>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control name='title' onChange={formik.handleChange} type="text" placeholder="Enter title" />
      </Form.Group>
    </Form>
    </>
  );
}

