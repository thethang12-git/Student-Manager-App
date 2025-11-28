'use client'
import Form from 'react-bootstrap/Form';
import {FormikProps} from "formik";
import { User } from 'lucide-react';
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
      {/* <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control name='title' onChange={formik.handleChange} type="text" placeholder="Enter title" />
      </Form.Group> */}
      <div className="flex items-center space-x-4">
                <span className="text-gray-400">
                <User className="w-5 h-5" /></span>
                <input
                    type="text"
                    name="title"
                    placeholder="Thêm tiêu đề..."
                    className="flex-1 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-lg font-medium text-gray-800"
                    onChange={formik.handleChange}
                />
      </div>
    </Form>
    </>
  );
}

