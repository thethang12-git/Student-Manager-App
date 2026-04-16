'use client'
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import Form from "react-bootstrap/Form";
import axios from "axios";

interface NewFormProps {
    newForm: boolean;
    setNewForm: (value: boolean) => void;
    setLoadData: (value: boolean | ((prev: boolean) => boolean)) => void;
    newFormData: any;
}

function NewForm({ newForm, setNewForm, setLoadData,newFormData }: NewFormProps) {
    const handleClose = () => setNewForm(false);

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        onSubmit: async (values) => {
            if(!values.title) return
            const newValue = {
                title: values.title,
                start: newFormData
            };
            try {
                await axios.post(`http://localhost:3001/events`, newValue)
            }catch (error) {console.log(error)}
            console.log(newFormData);
            handleClose();
            if (setLoadData) {
                setLoadData((prev:boolean) => !prev)
            }
        }
    });

    return (
        <Modal show={newForm} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Calendar Modifier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Enter title"
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between w-100">
                <button 
                style={{borderRadius:'8px'}}
                className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition"
                onClick={handleClose}>
                    Cancel
                </button>
                <button  
                    style={{borderRadius:'8px'}}
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition"
                    type = "submit" onClick={() =>{formik.handleSubmit()}} >
                    Add new Event!!
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewForm;
