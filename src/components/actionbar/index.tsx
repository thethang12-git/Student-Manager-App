"use client"
import {ChevronDown, Edit, List, Users} from "lucide-react";
import React from "react";

export default function ActionBar () {
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
                <button className="flex items-center bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <Users className="w-4 h-4 mr-2" />
                    Thêm Học sinh
                </button>

                {/* Button Sửa Lớp học */}
                <button className="flex items-center text-gray-600 border border-gray-300 bg-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa Lớp học
                </button>
            </div>
            {/* Thanh tìm kiếm nhỏ (tùy chọn) - Có thể bỏ qua vì đã có ở header */}
        </div>
    )
}