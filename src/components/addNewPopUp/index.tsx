"use client"
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {X, User, Users, Calendar, Hash, Upload, Cake} from 'lucide-react';
import { useAppSelector} from "@/store/hook";
import {useDispatch} from "react-redux";
import { addClass } from '@/store/slices/classCount';
import ClassCountData from '@/service/classCount';
import {uploadImage} from "@/service/uploadImg";
import DatePickerComp from "@/components/addNewPopUp/datePickerComp";
import dayjs, {Dayjs} from "dayjs";
import Snackbar from "@/components/snackbar";
import StudentService from "@/service/studentList";
import {addStudent} from "@/store/slices/studentList";

const findLastWord = (str: string) => {
    const words = str.trim().split(" ").filter(Boolean);
    const lastWord = words.pop();
    return lastWord ? lastWord[0].toUpperCase() : "";
}

const formatDate = (date:any,forRead?:boolean) => {
    if (!date) return;
    const d = date instanceof Date ? new Date(date) : date;
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    if(forRead){return `${day}-${month}-${year}`}
    return `${year}-${month}-${day}`;
};
const SkeletonLine = ({ width = 'w-full', height = 'h-4', className = 'mb-2' }) => (
    <div
        // Đổi màu nền từ bg-gray-200 sang bg-gray-400 và loại bỏ animate-pulse
        className={`bg-gray-400 rounded-full ${width} ${height} ${className}`}
    />
);
// Main App component
const AddNewPopUp = ({}) => {
    const focusHere = useRef<HTMLInputElement>(null);
    const actionType = useAppSelector(state => state.actionType.value)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [animate,setAnimate] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [numberOfSessions, setNumberOfSessions] = useState(1);
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [studentClass, setStudentClass] = useState('');
    const [age, setAge] = useState('');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const studentListAll = useAppSelector(state => state.student.list)
    // snackbar
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState('')
    //
    const weekdays = [
        'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'
    ];
    const [week,setWeek] = useState([]);
    useEffect(() => {
        if(isModalOpen){
            setAnimate(true);
            setLoading(false);
        }
        else {
            setAnimate(false);
        }
    }, [isModalOpen]);
    const openModal = useCallback(() => {
        setIsModalOpen(true);
        handleFocus()
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setStudentName('');
        setSelectedDay('');
        setNumberOfSessions(1);
        setFileName('');
        setImageFile(null);
        setStudentClass('')
        setPreviewImage(null);
        setAge('')
        setStartDate(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);
    const dispatch = useDispatch();
    const classCount = useAppSelector(state => state.classCountData.list)
    const dateCount = useAppSelector(state => state.date.value)
    useEffect(() => {
        const start = new Date()
        const getStartDate = start.getDay() == 0 ? 7 : start.getDay();
        const startDate = start.getDate() - getStartDate +1
        start.setDate(startDate);
        const Monday = new Date(formatDate(start))
        setWeek(():any => {
            const newnew = []
            for (let i = 0;i < 7;i++){
                const newDate = new Date(Monday)
                newDate.setDate(newDate.getDate() + i);
                newnew.push(formatDate(newDate));
            }
            return setWeek(newnew);
        })
    }, [dateCount]);
    const handleFocus = () => {
        focusHere.current.focus();
    }
    const validate= age && studentClass && studentName
    const handleSubmit = ((e) => {
        e.preventDefault();
        if(!classCount) return
        if(actionType == 'classCount') {
            const str = classCount[classCount.length -1].id;
            const trueId = str.replace(/\D/g, "");
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const time = `${hours}:${minutes}`;
            const trueIndex = weekdays.findIndex(itm => itm == selectedDay)
            const value = {
                id : `t${Number(trueId) + 1}`,
                name : studentName,
                time: time,
                day: week[trueIndex]
            }
            dispatch(addClass(value));
            setTimeout(() => {ClassCountData.updateData(value)}, 1000);
            closeModal();
            console.log(value)
        }
        else if(actionType == 'manage'){
            const getLastId = studentListAll.length > 0 ? studentListAll[studentListAll.length -1].id : '0';
            if(validate){
                if(imageFile) {
                    setLoading(true);
                    uploadImage(imageFile).then(r => {
                        const newData = {
                            id: (Number(getLastId) +1).toString() ,
                            name: studentName,
                            age: age,
                            date: formatDate(startDate,true) || formatDate(new Date(),true),
                            class:studentClass,
                            avatar: r,
                            count: 0,
                        }
                        StudentService.addStudent(newData).then(res => {
                            dispatch(addStudent(newData));
                            setMessage('thêm mới thành công')
                            setType('success')
                            setOpen(true)
                            setTimeout(() => {
                                closeModal();
                                setLoading(false);
                            },1000)
                        } )
                    });
                }
                else {
                    setLoading(true);
                    const avatarUrl = `https://placehold.co/40x40/9333ea/ffffff?text=${findLastWord(studentName)}`;
                    const img = new Image();
                    img.src = avatarUrl;
                    img.onload = () => {
                        const newData = {
                            id: (Number(getLastId) +1).toString(),
                            name: studentName,
                            age: age,
                            date: formatDate(startDate,true) || formatDate(new Date(),true),
                            class: studentClass,
                            avatar: avatarUrl,
                            count: 0,
                        };
                        StudentService.addStudent(newData).then(res => {
                            dispatch(addStudent(newData));
                            setMessage('thêm mới thành công');
                            setType('success');
                            setOpen(true);
                            setTimeout(() => {
                                closeModal();
                                setLoading(false);
                            },1000);
                        });
                    };

                }
            }
            else {
                setMessage('chưa đủ trường thông tin')
                setType('error')
                setOpen(true)
            }
        }
    })
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const VALID_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const handleFileChange = ((e) => {
        const file = e.target.files[0];

        if (!file) {
            setImageFile(null);
            setFileName('');
            setPreviewImage(null);
            return;
        }

        // Validate type
        if (!VALID_TYPES.includes(file.type)) {
            setMessage('Chỉ cho phép file ảnh (jpg, png, gif, webp)')
            setType('error')
            setOpen(true)
            setImageFile(null);
            setFileName('');
            return;
        }

        // Validate size
        if (file.size > MAX_SIZE) {
            setMessage('File quá lớn (tối đa 10MB)')
            setType('error')
            setOpen(true)
            setImageFile(null);
            setFileName('');
            return;
        }

        setImageFile(file);
        setFileName(file.name);
        const objectUrl:any = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
    })
    useEffect(() => {
        return () => {
            if (previewImage) URL.revokeObjectURL(previewImage);
        };
    }, [previewImage]);
    const secondary = 'emerald-500';
    return (
        <>
            <Snackbar isOpen={open} message={message} type={type || 'error'} setOpen={setOpen} />
            <button className="flex items-center bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors" onClick={openModal}>
                <Users className="w-4 h-4 mr-2" />
                Thêm Học sinh
            </button>
            <div
                style={{
                    width: '100%',
                    position: 'fixed',
                    inset: 0,
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,' + (animate ? '0.5' : '0') + ')',
                    backdropFilter: 'blur(4px)',
                    opacity: animate ? 1 : 0,
                    pointerEvents: animate ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease-in-out, background-color 0.5s ease-in-out',
                }}
                aria-modal="true"
                role="dialog"
                onClick={(e) => e.target === e.currentTarget && closeModal()}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.75rem',
                        boxShadow:
                            '0 25px 50px -12px rgba(0,0,0,0.25)',
                        width: '100%',
                        maxWidth: '28rem',
                        padding: '1.5rem',
                        transform: animate ? 'scale(1)' : 'scale(0.9)',
                        opacity: animate ? 1 : 0,
                        transition: 'all 0.3s ease-out',
                    }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Thêm Mới Học Sinh</h2>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                            aria-label="Đóng"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Form Nội dung */}
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            {/* Tên Học Sinh */}
                            <div>
                                <label htmlFor="studentName" style={{display:'flex'}} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <User className="w-4 h-4 mr-2 text-gray-500"/> Tên Học Sinh
                                </label>
                                <input
                                    ref={focusHere}
                                    type="text"
                                    id="studentName"
                                    placeholder="Nhập tên học sinh..."
                                    required
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out`}
                                />
                            </div>
                            {/*chọn thứ trong tuần*/}
                            {actionType == 'classCount' && (
                                <>
                                    <div>
                                        <label style={{display:'flex'}} htmlFor="selectedDay" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-500"/> Ngày Học
                                        </label>
                                        <select
                                            id="selectedDay"
                                            required
                                            value={selectedDay}
                                            onChange={(e) => setSelectedDay(e.target.value)}
                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out bg-white appearance-none`}
                                        >
                                            <option value="" disabled>-- Chọn ngày trong tuần --</option>
                                            {weekdays.map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{display:'flex'}} htmlFor="numberOfSessions" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <Hash className="w-4 h-4 mr-2 text-gray-500"/> Số Ca Học
                                        </label>
                                        <input
                                            type="number"
                                            id="numberOfSessions"
                                            placeholder="Nhập số ca học..."
                                            required
                                            min="1"
                                            value={numberOfSessions}
                                            onChange={(e) => setNumberOfSessions(e.target.value)}
                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out`}
                                        />
                                    </div>
                                </>
                            ) }
                            {actionType == "manage" && (
                                <>
                                    {/**/}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Trường Tuổi (Age) */}
                                        <div>
                                            <label htmlFor='age' style={{display:'flex'}} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                <Cake className="w-4 h-4 mr-2 text-gray-500"/> Tuổi
                                            </label>
                                            <input
                                                id="age"
                                                type="text"
                                                value={age}
                                                placeholder="Nhập tuổi"
                                                onChange ={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "" || /^[1-2][0-9]?$/.test(value)) {
                                                        setAge(value);
                                                    }
                                                }}
                                                inputMode='numeric'
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='studentClass' style={{display:'flex'}} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                <Cake className="w-4 h-4 mr-2 text-gray-500"/> Lớp
                                            </label>
                                            <input
                                                id="studentClass"
                                                type="text"
                                                value={studentClass}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "" || /^[1-5]$/.test(value)) {
                                                        setStudentClass(value);
                                                    }
                                                }} 
                                                inputMode='numeric' 
                                                placeholder="Nhập lớp"
                                                maxLength={1}
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/**/}
                                    {/* Trường Ngày Bắt Đầu (Start Date) - Tối ưu hóa Date Picker */}
                                    <div >
                                        <label style={{display:'flex'}} htmlFor="startDate" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-500"/> Ngày Bắt Đầu
                                        </label>
                                        {/*<input*/}
                                        {/*    id="startDate"*/}
                                        {/*    type="date"*/}
                                        {/*    value={startDate}*/}
                                        {/*    onChange={(e) => setStartDate(e.target.value)}*/}
                                        {/*    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}*/}
                                        {/*    required*/}
                                        {/*/>*/}
                                        <DatePickerComp startDate={startDate} setStartDate={setStartDate}/>
                                    </div>
                                    <div className="pt-2">
                                        <label style={{display:'flex'}} className="block text-sm font-medium text-gray-700 flex items-center">
                                            <Upload className="w-4 h-4 mr-2 text-gray-500" />
                                            Tải Ảnh Đại Diện
                                        </label>
                                        <label style={{width:'100%'}} htmlFor="image-upload">
                                            <div className="mt-1 flex justify-center px-3 pt-2 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-150 cursor-pointer">
                                                <div style={{display:'flex',flexDirection:'column'}} className="space-y-1 text-center align-items-center w-full">
                                                    {previewImage ? (
                                                        <div className="bg-white w-full pb-2">
                                                            {/* Khung chứa Danh Thiếp (Hiển thị theo chiều ngang) */}
                                                            <div className="flex items-start space-x-3">
                                                                <div>
                                                                    <img style={{width:'5rem',height:'5rem',borderRadius:'100%',textAlign:"left"}} src={previewImage} alt="Preview"  className="max-w-full rounded-lg shadow-md" />
                                                                </div>
                                                                {/* 2. Skeleton Loading cho Nội Dung (Theo chiều dọc) */}
                                                                <div className="flex-grow pt-1">
                                                                    {/* Tên */}
                                                                    <SkeletonLine width="w-full" height="h-6" className="mb-3" />

                                                                    {/* Chức danh / Mô tả 1 */}
                                                                    <SkeletonLine width="w-full" height="h-4" className="mb-2" />

                                                                    {/* Mô tả 2 */}
                                                                    <SkeletonLine width="w-full" height="h-4" className="mb-0" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        // <div style={{width:'100% '}}>
                                                        //     <img style={{width:'5rem',height:'5rem',borderRadius:'100%',textAlign:"left"}} src={previewImage} alt="Preview"  className="max-w-full max-h-64 rounded-lg shadow-md" />
                                                        // </div>
                                                    ) : <Upload className="mx-auto h-12 w-12 text-gray-400" />}
                                                    <div className="flex text-sm text-gray-600">
                                                        <input ref={fileInputRef} id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                                    </div>
                                                    {!previewImage && (<p className="text-xs text-gray-500">Tải ảnh lên ở đây</p>) }
                                                    {fileName && (
                                                        <p className="text-sm font-semibold text-green-600 mt-2 p-2 bg-green-100 rounded-lg">
                                                            Đã chọn: {fileName}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-end pt-2">
                                <button
                                    disabled={loading}
                                    style={{background:`#10B981`,borderRadius:"1.2em"}}
                                    type="submit"
                                    className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-${secondary} focus:ring-opacity-50 transform hover:shadow-lg`}
                                >
                                    {loading
                                        ?
                                        (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )
                                        :
                                        'Thêm mới'
                                    }
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </>
    );
};

export default AddNewPopUp;