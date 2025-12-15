"use client"
import {ChevronDown, Edit, List, Users} from "lucide-react";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {setValue} from "@/store/slices/dateCountData";
import AddNewPopUp from "@/components/addNewPopUp";

const formatDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear(); // Lấy năm
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (cộng 1 vì tháng bắt đầu từ 0) và đảm bảo có 2 chữ số
    const day = d.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
    return `${year}-${month}-${day}`; // Kết hợp lại theo định dạng YYYY-MM-DD
};

const NavButton = ({ children, onClick, disabled = false, isPrimary = false }) => {
    const baseClasses = "px-6 py-2 rounded-full font-bold transition duration-180 shadow-xl transform hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-center";
    const primaryClasses = "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-400/60";
    const secondaryClasses = "bg-white text-gray-800 border-2 border-indigo-400 hover:bg-indigo-100 shadow-md";

    return (
        <button
            style={{borderRadius:'50px', cursor:'pointer'}}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
        >
            {children}
        </button>
    );
};

export default function ActionBar ({isOpen}:{isOpen:boolean}) {
    const dispatch = useAppDispatch();
    const getCurrentDate = useAppSelector(state => state.date.value)
    const handleGoBackward = () => {
        const date = new Date(getCurrentDate);
        date.setDate(date.getDate() - 7);
        const dateString = date.toISOString().split('T')[0];
        dispatch(setValue(dateString));
    };
    const handleGoForward = () => {
        const date = new Date(getCurrentDate);
        date.setDate(date.getDate() + 7);
        const dateString = date.toISOString().split('T')[0];
        dispatch(setValue(dateString));
    }
    const handleGoCurrent = () => {
        const date = new Date();
        const dateString = date.toISOString().split('T')[0];
        dispatch(setValue(dateString));
    }
    return (
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4 flex-wrap">
                {/* Dropdown Lớp học */}
                <div className="relative inline-flex items-center bg-indigo-50 text-indigo-700 font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                    <List className="w-4 h-4 mr-2" />
                    <span>Lớp Nhảy</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                </div>

                {/* Button Thêm Học Sinh */}
                <AddNewPopUp/>

                {/* Button Sửa Lớp học */}
                <button className="flex items-center text-gray-600 border border-gray-300 bg-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa Lớp học
                </button>
            </div>
            {isOpen ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    {/* Nút Lùi (Backward) */}
                    <NavButton onClick={handleGoBackward} isPrimary={formatDate(new Date()) > formatDate(new Date(getCurrentDate))}>
                        <span className="inline-block mr-2">&larr;</span>
                        Tuần Trước
                    </NavButton>

                    {/* Nút Tuần này (This Week) */}
                    <NavButton onClick={handleGoCurrent} isPrimary={formatDate(new Date()) === formatDate(new Date(getCurrentDate))} disabled={formatDate(new Date()) === formatDate(new Date(getCurrentDate))}
                    >
                        Tuần Này
                        <span></span>
                    </NavButton>

                    {/* Nút Tiến (Forward) */}
                    <NavButton onClick={handleGoForward} isPrimary={formatDate(new Date()) < formatDate(new Date(getCurrentDate))}>
                        Tuần Sau
                        <span className="inline-block ml-2">&rarr;</span>
                    </NavButton>
                </div>
            ) :null}
        </div>
    )
}