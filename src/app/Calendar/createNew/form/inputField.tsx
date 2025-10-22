'use client'
import Form from 'react-bootstrap/Form';
import {FormikProps} from "formik";
interface FormValues {
    title: string;
}
interface CreateFormProps {
    formik: FormikProps<FormValues>;
}
export default function CreateForm({formik} : CreateFormProps) {
  return (
    <>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control name='title' onChange={formik.handleChange} type="text" placeholder="Enter title" />
      </Form.Group>
    </Form>
    </>
  );
}

