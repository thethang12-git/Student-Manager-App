'use client'
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {cx} from "@/utils/cx";
import React from "react";

export default function Snackbar ({ isOpen, message, type,setOpen } : any)  {
    const [visible, setVisible] = React.useState(false);
    useEffect(() => {
        if (isOpen){
            setTimeout(() => {
                setVisible(true)
                setTimeout(() => {
                    setVisible(false)
                    setTimeout(() => setOpen(false), 400)
                }, 2000);

            },20);
        }
        else {
            setVisible(false);
        }
    }, [isOpen]);

    const bgColorClass = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    const Icon = type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );

    const slideClass = visible
        ? 'translate-x-0 opacity-100'
        : 'translate-x-full opacity-0';
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className={cx(
            "fixed top-6 right-6 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out",
            "max-w-xs w-full p-4 rounded-lg shadow-xl text-white", // Kích thước và màu sắc chung
            bgColorClass,
            slideClass
        )}>
            <div onClick={() => setVisible(false)} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    {Icon}
                </div>
                <p className="text-sm font-medium flex-grow">{message}</p>
                {/* Nút đóng */}
                <button onClick={() => setVisible(false)} className="flex-shrink-0 text-white opacity-90 hover:opacity-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>,document.body
    );
};