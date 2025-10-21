'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateForm from './form/page';
import { useFormik } from 'formik';
function CreateNew({show ,setShow,setFormikData,formikData} : any) {
    const handleClose = () => setShow(false);
    const newData =  useFormik({
    initialValues: {
    title: '',
  },
  onSubmit: values => {
    setFormikData((prev : object) => ({...prev,values}));
    console.log(values);
  },
});
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calendar Modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <CreateForm formik = {newData} />

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between w-100'>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => {newData.handleSubmit();
            handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNew;