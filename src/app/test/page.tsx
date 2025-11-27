"use client"
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CalendarPage from "@/app/Calendar/page";
import {bg} from "@fullcalendar/core/internal-common";

// Giả lập trạng thái hiển thị của popup

export default function test() {
    const [isOpen, setIsOpen] = useState(false);
    const [animation,setAnimation] = useState<boolean>(false);
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimation(true),10)
        }
    }, [isOpen]);
    const handleClose = () => {
        setAnimation(false);
        setTimeout(() => setIsOpen(false),800);
    }
    if (!isOpen) {
        return (
            <div className="p-8 text-center">
                <button
                    onClick={() => setIsOpen(true) }
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                    Mở Popup Lịch
                </button>
            </div>
        );
    }

    return (
        // 1. Lớp nền mờ (Overlay)
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 " >

            {/* 2. Container chính của Popup (có giới hạn chiều rộng) */}
            <div style={{height: 'fit-content', justifyContent: 'center',display: 'flex', flexDirection: 'column',backgroundColor: 'white'}}
                 className={`relative bg-white/90  rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] transition-all duration-500 ease-out 
                 ${animation
                     ? 'opacity-100 translate-y-0'
                     : 'opacity-0 -translate-y-8'}
                     `} >

                {/* 3. Header và Nút Đóng */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 flex justify-between items-center p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>

                    {/* Nút Đóng */}
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                        aria-label="Đóng"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 4. Nội dung Lịch */}
                <CalendarPage />

                {/* 5. Footer tùy chọn */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm z-10 p-6 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={close}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors hover:scale-[1.03] transform"
                    >
                        Xong
                    </button>
                </div>
            </div>

        </div>
    );
}