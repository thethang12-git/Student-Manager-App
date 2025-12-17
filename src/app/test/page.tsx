"use client"
import React, {useState, useCallback, useMemo, useEffect} from 'react';
import { User, Clock, PackageOpen } from 'lucide-react';
import {addClass} from "@/store/slices/classCount";
import ClassCountData from "@/service/classCount";
import {uploadImage} from "@/service/uploadImg";
import StudentService from "@/service/studentList";

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
    { id: 't13', name: 'Huyền: Thiết kế banner quảng cáo', day: '2025-12-02', time: '11:30' },
    { id: 't14', name: 'Nam: Phát triển tính năng mới', day: '2025-12-05', time: '16:30' },
    { id: 't15', name: 'Trang: Kiểm thử ứng dụng', day: '2025-12-06', time: '10:15' },
{ id: 't16', name: 'Dũng: Nghiên cứu thị trường', day: '2025-12-02', time: '13:45' },
];

const mockDays = [
  { id: '2025-12-01', date: '01/12', dayName: 'Thứ Hai' },
  { id: '2025-12-02', date: '02/12', dayName: 'Thứ Ba' },
  { id: '2025-12-03', date: '03/12', dayName: 'Thứ Tư' },
  { id: '2025-12-04', date: '04/12', dayName: 'Thứ Năm' },
  { id: '2025-12-05', date: '05/12', dayName: 'Thứ Sáu' },
  { id: '2025-12-06', date: '06/12', dayName: 'Thứ Bảy' },
  { id: '2025-12-07', date: '07/12', dayName: 'Chủ Nhật' },
];

// 1. TaskCard Component (Thẻ Công Việc - Có thể kéo thả)
const TaskCard = ({ task, onDragStart }: any) => {
  const { id, name, time } = task;

  return (
    <div
      id={id}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className="bg-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-gray-50 transition duration-150 border border-gray-200 flex items-center space-x-2 w-full"
    >
      <User className="h-4 w-4 text-indigo-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{name}</p>
        <div className="flex items-center text-xs text-gray-500 mt-0.5">
          <Clock className="h-3 w-3 mr-1" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

const DayColumn = ({ day, tasks, onDrop, onDragOver, onDragLeave }) => {
  return (
    <div
      className="flex flex-col h-full min-w-98 mx-3 rounded-xl shadow-2xl bg-gray-100/50 border border-indigo-200 transition-all duration-300 hover:shadow-indigo-300/50"
      onDrop={(e) => onDrop(e, day.id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {/* Header Ngày (Sticky ở trên cùng của cột) */}
      <div className="p-4 border-b border-indigo-200 bg-white rounded-t-xl sticky top-0 z-10 shadow-sm">
        <h2 className="text-xl font-extrabold text-indigo-700">{day.dayName}</h2>
        <p className="text-sm text-gray-500">{day.date}</p>
      </div>
      <div
        className={`task-lane flex-1 p-3 space-y-3 overflow-y-auto transition-all duration-300 day-drop-target`}
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
          <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400 text-sm italic flex flex-col items-center justify-center h-full min-h-[120px] text-center">
            <PackageOpen className="w-6 h-6 mb-2" />
            <span>tạm chưa có thông tin</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. CalendarApp Component (Ứng dụng Chính)
export const test = () => {
  const [tasks, setTasks] = useState(initialData);

  // Xử lý khi kéo qua vùng thả (Quan trọng để kích hoạt onDrop)
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.add('bg-indigo-50', 'ring-4', 'ring-indigo-300', 'ring-opacity-50');
  }, []);

  // Xử lý khi rời vùng thả
  const handleDragLeave = useCallback((e) => {
    e.currentTarget.classList.remove('bg-indigo-50', 'ring-4', 'ring-indigo-300', 'ring-opacity-50');
  }, []);

  // Xử lý logic thả
  const handleDrop = useCallback((e, targetDayId) => {
    e.preventDefault();
    handleDragLeave(e);
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(prevTasks => {
      // Logic chính: Cập nhật 'day' của task đã kéo
      return prevTasks.map(task =>
        task.id === taskId ? { ...task, day: targetDayId } : task
      );
    });

  }, [handleDragLeave]);

  // Nhóm các công việc theo ngày để hiển thị (Tối ưu hóa bằng useMemo)
  const groupedTasks = useMemo(() => {
    return mockDays.reduce((acc, day) => {
        acc[day.id] = tasks.filter(task => task.day === day.id);
        return acc;
    }, {});
  }, [tasks]);
  return (
    <div className="h-screen bg-gray-50 font-sans overflow-hidden ">
        <div className="calendar-grid flex overflow-x-auto h-full">
          {mockDays.map(day => (
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
    </div>
  );
};

export default test;



const handleSubmit = async (e) => {
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
    if(imageFile && validate){
      try {
        setLoading(true);
        const avatarUrl = await uploadImage(imageFile);
        const newData = {
          name: studentName,
          age,
          date: startDate,
          class: studentClass,
          avatar: avatarUrl,
          count: 0,
        };
        await StudentService.addStudent(newData);
        setMessage('Thêm mới thành công');
        setType('success');
        setOpen(true);
        setTimeout(() => closeModal(), 1000);
        console.log(newData);
      } catch (error) {
        console.error(error);
        setMessage('Có lỗi xảy ra');
        setType('error');
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }
    else {
      alert('chưa đủ trường thông tin')
    }
  }
}