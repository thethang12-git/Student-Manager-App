'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateForm from './form/inputField';
import {useFormik} from 'formik';
import {useEffect} from "react";
import CalenHandle from "@/service/calendar";

interface CreateNewProps {
    show: boolean,
    setShow: (value: boolean) => void,
    setFormikData: (data: any) => void,
    formikData: any,
    setLoadData?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

function CreateNew({show, setShow, setFormikData, formikData, setLoadData}: CreateNewProps) {
    const handleClose = () => setShow(false);
    const newData = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit:async (values) => {
            if (!values.title.trim()) return
            const newValue = {
                id: formikData.id,
                title: values.title,
            };
            setFormikData(newValue);
            try {
                if (setLoadData) {
                    setLoadData(prev => !prev)
                }
                await CalenHandle.postData(newValue.id, newValue);

                setFormikData(newValue);

                handleClose();
            } catch (err) {
                console.error(err);
            }
        },
    });
    const handleDelete = async () => {
        if(!formikData?.id) return
        await CalenHandle.deleteHandle(formikData.id)
        if (setLoadData) {
            setLoadData(prev => !prev)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Calendar Modifier</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <CreateForm formik={newData}/>

                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between w-100'>
                    <Button  variant="danger" onClick={() => {handleDelete().then(()  => handleClose())}}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={() => {
                        newData.handleSubmit();
                        handleClose()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateNew;