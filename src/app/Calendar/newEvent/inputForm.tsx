'use client'
import Button from 'react-bootstrap/Button';
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
                <Button variant="danger" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type = "submit" onClick={() =>{formik.handleSubmit()}} >
                    Add new Event!!
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewForm;
