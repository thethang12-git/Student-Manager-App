import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import { User, Clock, PackageOpen } from 'lucide-react';
import {useAppSelector} from "@/store/hook";

// Dữ liệu mẫu ban đầu
const initialData = [
    { id: 't1', name: 'Hùng: Thiết kế landing page', day: '2025-12-01', time: '10:00' },
    { id: 't2', name: 'Long: Viết báo cáo tuần', day: '2025-12-01', time: '14:30' },
    { id: 't3', name: 'An: Họp team chiến lược Q4', day: '2025-12-02', time: '09:00' },
    { id: 't4', name: 'Vy: Đào tạo nhân viên mới', day: '2025-12-03', time: '11:00' },
    { id: 't5', name: 'Minh: Kiểm tra Bug hệ thống', day: '2025-12-03', time: '16:00' },
    { id: 't6', name: 'Khoa: Phân tích dữ liệu', day: '2025-12-03', time: '13:00' },
    { id: 't7', name: 'Linh: Chuẩn bị tài liệu', day: '2025-12-04', time: '08:00' },
    { id: 't8', name: 'Tân: Chỉnh sửa CSS', day: '2025-12-04', time: '15:00' },
    { id: 't9', name: 'Thảo: Gửi email marketing', day: '2025-12-05', time: '10:30' },
    { id: 't10', name: 'Hải: Cập nhật nội dung blog', day: '2025-12-06', time: '12:00' },
    { id: 't11', name: 'Phương: Tối ưu SEO', day: '2025-12-07', time: '09:30' },
    { id: 't12', name: 'Quân: Lên kế hoạch sự kiện', day: '2025-12-07', time: '14:00' },
    { id: 't13', 'name': 'Huyền: Thiết kế banner quảng cáo', day: '2025-12-02', time: '11:30' },
    { id: 't14', 'name': 'Nam: Phát triển tính năng mới', day: '2025-12-05', time: '16:30' },
    { id: 't15', 'name': 'Trang: Kiểm thử ứng dụng', day: '2025-12-06', time: '10:15' },
    { id: 't16', 'name': 'Dũng: Nghiên cứu thị trường', day: '2025-12-02', time: '13:45' },
];

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Component TaskCard (Công việc)
const TaskCard = ({ task, onDragStart }) => {
    const { id, name, time } = task;
    return (
        <div
            id={id}
            draggable
            onDragStart={(e) => onDragStart(e, id)}
            className="bg-white p-4 rounded-xl shadow-md cursor-grab transition-all duration-200
                       hover:shadow-lg hover:scale-[1.02] active:cursor-grabbing
                       border-b-4 border-pink-200/50 hover:border-pink-300"
            style={{
                // Hiệu ứng "Bubble Shadow" nhẹ
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05), 0 5px 0 0 rgba(244, 114, 182, 0.1)'
            }}
        >
            <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-base leading-tight">{name}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span className="font-mono">{time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
// Component DayColumn (Cột Ngày)
const DayColumn = ({ day, tasks, onDrop, onDragOver, onDragLeave }) => {
    const dayStyle = { backgroundColor: day.color };
    const ringColor = day.color.replace('FF', '50').replace('C4', '50').replace('D2', '50').replace('E7', '50').replace('E5', '50').replace('B2', '50').replace('BBD0', '50');

    return (
        <div
            className="flex flex-col h-full min-w-[25%] mx-2 p-1 rounded-[24px] shadow-xl bg-white/70 backdrop-blur-sm border-4 border-white transform hover:shadow-2xl transition-all duration-300"
            style={{
                border: '4px solid white',
                boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 8px 0 0 ${day.color}` // Thêm đổ bóng màu
            }}
            onDrop={(e) => onDrop(e, day.id)}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            {/* Header Ngày */}
            <div
                style={dayStyle}
                className={`p-4 rounded-t-[20px] rounded-b-xl border-b-4 border-white/50 sticky top-0 z-10 shadow-inner`}
            >
                <h2 className="text-2xl font-black text-indigo-900 drop-shadow-sm">{day.dayName}</h2>
                <p className="text-md font-semibold text-gray-700 mt-0.5">{day.date}</p>
            </div>

            {/* Vùng thả task */}
            <div
                className={`task-lane flex-1 p-4 space-y-4 overflow-y-auto transition-all duration-300 day-drop-target`}
            >
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDragStart={(e, id) => e.dataTransfer.setData('taskId', id)}
                        />
                    ))
                ) : (
                    <div className="p-6 bg-white/70 rounded-2xl border-2 border-dashed border-indigo-200 text-indigo-400 text-sm italic flex flex-col items-center justify-center h-full min-h-[120px] text-center opacity-80 transition duration-300 hover:opacity-100">
                        <PackageOpen className="w-8 h-8 mb-3" />
                        <span className="font-semibold">tạm chưa có thông tin nào</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const ClassCount = () => {
    const [tasks, setTasks] = useState(initialData);
    const [week, setWeek] = useState([]);
    const [isDragging,setDragging] = useState(false);
    const weekDay = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

    const weekColor = [
        '#AEC6CF', // Soft Blue-Gray
        '#FFB3BA', // Carnation Pink
        '#FFDFBA', // Peach
        '#FFFFBA', // Light Yellow
        '#BAFFC9', // Mint Green
        '#BAE1FF', // Pastel Blue
        '#F9DBF9', // Lavender
    ];
    const [currentDate, setCurrentDate] = useState(new Date());
    const getDateValue = useAppSelector(state => state.date)
    useEffect(() => {
        if(getDateValue) {
            setCurrentDate(new Date(getDateValue.value));
        }
    }, [getDateValue]);
    useEffect(() => {
        if(!currentDate) return
        const start = new Date(currentDate)
        const getStartDate = start.getDay() == 0 ? 7 : start.getDay();
        const startDate = currentDate.getDate() - getStartDate +1
        start.setDate(startDate);
        const Monday = new Date(formatDate(start))
        setWeek(():any => {
            const newnew = []
            for (let i = 0;i < 7;i++){
                const newDate = new Date(Monday)
                newDate.setDate(newDate.getDate() + i);
                const formatMonth =`${newDate.getDate()}/${newDate.getMonth() +1}/${newDate.getFullYear()}`;
                newnew.push({id:formatDate(newDate),date:formatMonth,dayName:weekDay[i],color:weekColor[i]});
            }
            return newnew
        })
    }, [currentDate]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragging(true)
        const target = e.currentTarget;
        if (target.classList.contains('task-lane')) {
            target.classList.add('bg-indigo-100/50', 'ring-4', 'ring-indigo-300', 'ring-opacity-70', 'scale-[1.01]');
        }
    }, []);

    const handleDragLeave = useCallback((e) => {
        const target = e.currentTarget;
        // setDragging(false)
        if (target.classList.contains('task-lane')) {
            target.classList.remove('bg-indigo-100/50', 'ring-4', 'ring-indigo-300', 'ring-opacity-70', 'scale-[1.01]');
        }
    }, []);

    const handleDrop = useCallback((e, targetDayId) => {
        e.preventDefault();
        if (!targetDayId) return;

        let target = (e.target as HTMLElement)?.closest('.task-lane');
        if (!target) return;
        while (target && !target.classList.contains('task-lane')) {
            target = target.parentNode;
        }
        if (target) {
            target.classList.remove('bg-indigo-100/50', 'ring-4', 'ring-indigo-300', 'ring-opacity-70', 'scale-[1.01]');
        }

        const taskId = e.dataTransfer.getData('taskId');
        setTasks(prevTasks => {
            return prevTasks.map(task =>
                task.id === taskId ? { ...task, day: targetDayId } : task
            );
        });
        setDragging(false)
    }, []);

    const groupedTasks = useMemo(() => {
        if (week.length === 0) return {};
        return week.reduce((acc, day) => {
            acc[day.id] = tasks.filter(task => task.day === day.id);
            return acc;
        }, {});
    }, [tasks, week]);

    return (
        <div className="h-100 bg-pink-50 font-sans p-6 pb-0 pt-0 overflow-auto relative">
            <div
                className={`absolute top-0 z-30 flex flex-col items-center justify-center 
                            pointer-events-none transition-all duration-300 ease-in-out left-0
                            ${isDragging ? 'opacity-100 bg-indigo-500/20 shadow-2xl shadow-indigo-500/50' : 'opacity-0'}`}
            >
                <p className={`text-base font-bold mt-3 text-indigo-800 transition-all duration-300 text-center`}>
                    kéo ở đây
                </p>
            </div>
            <style jsx global>{`
                .calendar-grid::-webkit-scrollbar {
                    height: 12px;
                }
                .calendar-grid::-webkit-scrollbar-thumb {
                    background-color: #f472b6; 
                    border-radius: 6px;
                    border: 3px solid #f9fafb;
                }
                .calendar-grid::-webkit-scrollbar-thumb:hover {
                    background-color: #ec4899; 
                }
                .task-lane::-webkit-scrollbar {
                    width: 8px;
                }
                .task-lane::-webkit-scrollbar-thumb {
                    background-color: #a78bfa; /* Violet-400 */
                    border-radius: 4px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .task-card-animation {
                    animation: fadeIn 0.4s ease-out;
                }
                .dragging-over {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(165, 180, 252, 0.8);
                }
            `}</style>
            <div
                className="calendar-grid flex overflow-x-auto h-full pb-2"
                // ref={scrollRef}
            >
                {week.map((day) => (
                    <DayColumn
                        key={day.id}
                        day={day}
                        tasks={groupedTasks[day.id] || []}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    />
                ))}
            </div>
            <div
                className={`absolute top-0 z-30 flex flex-col items-center justify-center 
                            pointer-events-none transition-all duration-300 ease-in-out right-0
                            ${isDragging ? 'opacity-100 bg-indigo-500/20 shadow-2xl shadow-indigo-500/50' : 'opacity-0'}`}
            >
                <p className={`text-base font-bold mt-3 text-indigo-800 transition-all duration-300 text-center`}>
                    kéo ở đây
                </p>
            </div>
        </div>
    );
};

export default ClassCount;