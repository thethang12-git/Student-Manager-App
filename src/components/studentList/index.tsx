"use client"
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ArrowUpDown, Cake, Calendar, Edit, Hash, Trash2, Upload, User, Users, X} from "lucide-react";
import StudentService from "@/service/studentList";
import {useDispatch} from "react-redux";
import {deleteStudent} from "@/store/slices/studentList";
import DatePickerComp from "@/components/addNewPopUp/datePickerComp";
import {useAppSelector} from "@/store/hook";
import dayjs, {Dayjs} from "dayjs";
import Snackbar from "@/components/snackbar";
import {createPortal} from "react-dom";

const SkeletonLine = ({ width = 'w-full', height = 'h-4', className = 'mb-2' }) => (
    <div
        // Đổi màu nền từ bg-gray-200 sang bg-gray-400 và loại bỏ animate-pulse
        className={`bg-gray-400 rounded-full ${width} ${height} ${className}`}
    />
);
const StudentList = ({ initialStudentsData } :any ) => {
    const [students, setStudents] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const [studentName, setStudentName] = useState('');
    const [animate,setAnimate] = useState(false);
    const [numberOfSessions, setNumberOfSessions] = useState(1);
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewEditImage, setPreviewImage] = useState(null);
    const [studentClass, setStudentClass] = useState('');
    const [age, setAge] = useState('');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const fileInputRef = useRef<HTMLInputElement>(null);
    // snackbar
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState('')
    //
    const secondary = 'emerald-500';
    //
    useEffect(() => {
        console.log(startDate)
    }, [startDate]);
    useEffect(() => {
        if(onEdit){
            setAnimate(true)
            setLoading(false);
        }
        else {
            setAnimate(false)
        }
    }, [onEdit]);
    const openModal = useCallback(() => {
        setOnEdit(true);
    }, []);
    const handleDelete = (id:string) => {
        StudentService.deleteStudentById(id).then( res =>{
            dispatch(deleteStudent(id));
        })
            .catch(err => console.log(err));
    }
    const handleEdit = (id: any) => {
        StudentService.getStudentById(id).then( res => {
            setOnEdit(true)
            openModal()
            const d = dayjs(res.date, "DD-MM-YYYY");
            setStudentName(res.name)
            setStudentClass(res.class)
            setAge(res.age)
            setStartDate(d)
            setPreviewImage(res.avatar)
        }).catch(err => console.log(err));
    }
    const handleFileChange = ((e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setFileName(file.name);
        const objectUrl:any = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
    })
    const closeModal = useCallback(() => {
        setOnEdit(false);
        setStudentName('');
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
    useEffect(() => {
        return () => {
            if (previewEditImage) URL.revokeObjectURL(previewEditImage);
        };
    }, [previewEditImage]);
    useEffect(() => {
        setStudents(initialStudentsData);
    }, [initialStudentsData]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    if(!initialStudentsData) return null;
    const sortedStudents = useMemo(() => {
        const sortableItems = Array.isArray(students) ? [...students] : [];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [students, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const headers = [
        { key: 'id', label: 'STT' },
        { key: 'name', label: 'Học sinh' },
        { key: 'date', label: 'Ngày bắt đầu học' },
        { key: 'class', label: 'Lớp' },
        {key:'count',label:'số buổi'},
        { key: 'actions', label: 'Hành động', sortable: false },
    ];

    const SortableHeader = ({ header }) => {
        const isCurrent = sortConfig.key === header.key;
        // Hiển thị icon sắp xếp
        const directionIcon = isCurrent ? (
            sortConfig.direction === 'ascending' ? (
                <ArrowUpDown className="w-3 h-3 ml-1 transition-all rotate-180" /> // Lên (A-Z)
            ) : (
                <ArrowUpDown className="w-3 h-3 ml-1 transition-all" /> // Xuống (Z-A)
            )
        ) : (
            <ArrowUpDown className="w-3 h-3 ml-1 opacity-20 group-hover:opacity-100 transition-opacity" /> // Mặc định
        );
        return (
            <th
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.sortable !== false ? 'cursor-pointer hover:text-indigo-600 group' : ''}`}
                onClick={() => header.sortable !== false && requestSort(header.key)}
            >
                <div className="flex items-center">
                    {header.label}
                    {header.sortable !== false && directionIcon}
                </div>
            </th>
        );
    };
    if (!initialStudentsData) return <div> loading ...</div>;
    return (
        <div className="h-auto shadow-md rounded-xl bg-white ">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                <tr>
                    {headers.map((header) => (
                        <SortableHeader key={header.key} header={header} />
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {sortedStudents.map((student : any) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                                <img
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                    src={student.avatar}
                                    alt={student.name}
                                    onError={(e) => {
                                        // Fallback nếu ảnh lỗi
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/40x40/6366f1/ffffff?text=${student.name.charAt(0)}`;
                                    }}
                                />
                                {student.name}
                            </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <span className="text-green-600 font-medium">{student.class}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 ">{student.count}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleEdit(student.id)}
                                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                    title="Sửa"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Xóa"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {onEdit && createPortal(
                <>
                    <Snackbar isOpen={open} message={message} type={type || 'error'} setOpen={setOpen} />
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
                                <h2 className="text-2xl font-bold text-gray-800">Sửa thông tin học sinh</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                                    aria-label="Đóng"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {/* Form Nội dung */}
                            <form onSubmit={() => console.log('ád')} className="mt-4 space-y-4">
                                {/* Tên Học Sinh */}
                                <div>
                                    <label htmlFor="studentName" style={{display:'flex'}} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <User className="w-4 h-4 mr-2 text-gray-500"/> Tên Học Sinh
                                    </label>
                                    <input
                                        type="text"
                                        id="studentName"
                                        placeholder="Nhập tên học sinh..."
                                        required
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-${secondary} focus:border-${secondary} transition duration-150 ease-in-out`}
                                    />
                                </div>
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
                                            <DatePickerComp startDate={startDate} setStartDate={setStartDate}/>
                                        </div>
                                        <div className="pt-2">
                                            <label style={{display:'flex'}} className="block text-sm font-medium text-gray-700 flex items-center">
                                                <Upload className="w-4 h-4 mr-2 text-gray-500" />
                                                Tải Ảnh Đại Diện
                                            </label>
                                            <label style={{width:'100%'}} htmlFor="image-upload-preview">
                                                <div className="mt-1 flex justify-center px-3 pt-2 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-150 cursor-pointer">
                                                    <div style={{display:'flex',flexDirection:'column'}} className="space-y-1 text-center align-items-center w-full">
                                                        {previewEditImage ? (
                                                            <div className="bg-white w-full pb-2">
                                                                {/* Khung chứa Danh Thiếp (Hiển thị theo chiều ngang) */}
                                                                <div className="flex items-start space-x-3">
                                                                    <div>
                                                                        <img style={{width:'5rem',height:'5rem',borderRadius:'100%',textAlign:"left"}} src={previewEditImage} alt="Preview"  className="max-w-full rounded-lg shadow-md" />
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
                                                        ) : <Upload className="mx-auto h-12 w-12 text-gray-400" />}
                                                        <div className="flex text-sm text-gray-600">
                                                            <input ref={fileInputRef} id="image-upload-preview" name="image-upload-preview" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                                        </div>
                                                        {!previewEditImage && (<p className="text-xs text-gray-500">Tải ảnh lên ở đây</p>) }
                                                        {fileName && (
                                                            <p className="text-sm font-semibold text-green-600 mt-2 p-2 bg-green-100 rounded-lg">
                                                                Đã chọn: {fileName}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
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
                                            'Sửa thông tin'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ,document.body)}
        </div>
    );
};

export default StudentList;