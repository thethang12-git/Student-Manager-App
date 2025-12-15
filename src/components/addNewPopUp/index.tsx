"use client"
import React, {useState, useCallback, useEffect} from 'react';
import {X, User, Users, Calendar, Hash} from 'lucide-react';
import { useAppSelector} from "@/store/hook";
import {useDispatch} from "react-redux";

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
// Main App component
const AddNewPopUp = ({}) => {
    const actionType = useAppSelector(state => state.actionType.value)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [animate,setAnimate] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [numberOfSessions, setNumberOfSessions] = useState(1);
    const weekdays = [
        'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'
    ];
    const [week,setWeek] = useState([]);
    useEffect(() => {
        if(isModalOpen){
            setAnimate(true);
        }
        else {
            setAnimate(false);
        }
    }, [isModalOpen]);
    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setStudentName('');
        setSelectedDay('');
        setNumberOfSessions(1);
    }, []);
    const dispatch = useDispatch();
    const classCount = useAppSelector(state => state.classCountData.list)
    const dateCount = useAppSelector(state => state.date.value)
    useEffect(() => {
        const newnew = []
        for (let i = 0;i < 7;i++){
            const newDate = new Date(dateCount)
            newDate.setDate(newDate.getDate() + i);
            newnew.push(formatDate(newDate));
        }
        setWeek(newnew);
    }, [dateCount]);

    const handleSubmit = ((e) => {
        e.preventDefault();
        if(!classCount) return
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
        console.log(value)
    })

    const secondary = 'emerald-500';
    return (
        <>
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
                            <div className="flex justify-end pt-2">
                                <button
                                    style={{background:`#10B981`,borderRadius:"1.2em"}}
                                    type="submit"
                                    className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-${secondary} focus:ring-opacity-50 transform hover:shadow-lg`}
                                >
                                    Thêm Mới
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </>
    );
};

export default AddNewPopUp;