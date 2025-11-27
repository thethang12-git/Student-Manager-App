'use client'
import {LogOut} from "lucide-react";
import React from "react";

export default function UserProfile_Logout () {
    return (
        <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center mb-4 p-2 rounded-lg bg-indigo-50/50">
                <img
                    src="https://placehold.co/40x40/6366f1/ffffff?text=HS"
                    alt="Helen Smithers"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3 text-sm">
                    <p className="font-semibold text-gray-800">Cô Hương</p>
                    <p className="text-gray-500">Giáo viên</p>
                </div>
            </div>
            <button className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
            </button>
        </div>
    )
}