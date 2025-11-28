"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Clock, User } from 'lucide-react';

export default function test() {
  // --- Giả lập useFormik ---
  const initialValues = {
    title: 'Cuộc họp quan trọng hàng tuần',
    startTime: '10:00',
    endTime: '11:00',
  };

  const [formValues, setFormValues] = useState(initialValues);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      {/* Mô phỏng Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200">
        
        {/* Modal.Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Chỉnh Sửa Sự Kiện Lịch</h2>
          <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition">
            &times; {/* Dấu x đóng */}
          </button>
        </div>

        {/* Modal.Body (Chứa CreateForm) */}
        <div className="p-6">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Trường 1: Tiêu đề sự kiện */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-400"><User className="w-5 h-5" /></span>
                <input
                    type="text"
                    name="title"
                    placeholder="Thêm tiêu đề..."
                    className="flex-1 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-lg font-medium text-gray-800"
                />
            </div>

            {/* Trường 2: Thời gian */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-400"><Clock className="w-5 h-5" /></span>
                <div className="flex space-x-3 text-sm text-gray-700">
                    <input
                        type="time"
                        value={formValues.startTime}
                        className="p-1 border border-gray-300 rounded-md"
                    />
                    <span>-</span>
                    <input
                        type="time"
                        value={formValues.endTime}
                        className="p-1 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </form>
        </div>

        {/* Modal.Footer */}
        <div className='flex justify-between w-full p-5 bg-gray-50 border-t rounded-b-2xl'>
            <button 
                className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition"
            >
                Xóa
            </button>
            <button 
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
                Lưu Thay Đổi
            </button>
        </div>
        
      </div>
    </div>
  );
};
