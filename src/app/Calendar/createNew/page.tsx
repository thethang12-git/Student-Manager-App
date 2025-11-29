'use client'
import Modal from 'react-bootstrap/Modal';
import CreateForm from './form/inputField';
import {useFormik} from 'formik';
import { useEffect, useState} from "react";
import CalenHandle from "@/service/calendar";
import { Clock } from '@untitledui/icons';
import { TimePicker } from 'antd';
interface CreateNewProps {
    show: boolean,
    setShow: (value: boolean) => void,
    setFormikData: (data: any) => void,
    formikData: any,
    setLoadData?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
function formatResult(date: Date, time: string, isEnd: boolean): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate() + (isEnd ? 1 : 0)).padStart(2, "0"); 
    return `${year}-${month}-${day}T${time}:00.000Z`;
}


function CreateNew({show, setShow, setFormikData, formikData, setLoadData}: CreateNewProps) {
    const handleClose = () => setShow(false);
    const newData = useFormik({
        initialValues: {
            title: '',
            startTime: '10:00',
            endTime: '11:00'
        },
        onSubmit:async (values) => {
            if (!values.title.trim()) return
            const newValue = {
                id: formikData.id,
                title: values.title,
                // start: formatResult(formikData.time.start, values.startTime,false),
                // end: formatResult(formikData.time.start, values.endTime,true),
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
                    <Modal.Title style={{padding:'8px'}}>Chỉnh sửa sự kiện lịch</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding:'30px'}} className='flex gap-8 flex-col'>
                    <CreateForm formik={newData}/>
                    {/* <div className="flex items-center space-x-4">
                        <span className="text-gray-400">
                            <Clock className="w-5 h-5" />
                        </span>
                        <div className="flex text-sm text-gray-700">
                            <input
                                name='startTime'
                                type="time"
                                value={newData.values.startTime}
                                className="p-1 border border-gray-300 rounded-md"
                                onChange={newData.handleChange}
                            />
                            <span>-</span>
                            <input
                                name='endTime'
                                type="time"
                                value={newData.values.endTime}
                                className="p-1 border border-gray-300 rounded-md"
                                onChange={newData.handleChange }
                            />
                        </div>
                    </div> */}
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between w-100'>
                    <button 
                        type='button'
                        style={{borderRadius:'8px'}}
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition"
                        onClick={() => {handleDelete().then(()  => handleClose())}}
                    >
                        Xóa
                    </button>
                    <button 
                        type='button'
                        style={{borderRadius:'8px'}}
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition"
                        onClick={() => {
                        newData.handleSubmit();
                        handleClose()
                        }}
                    >
                        Lưu Thay Đổi
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateNew;