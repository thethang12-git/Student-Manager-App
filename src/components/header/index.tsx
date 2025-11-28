"use client"
import {Bell, Search} from "lucide-react";
import React from "react";
import DropdownAvatar from "@/components/header/Avatar";

export default function Header () {
    return (
        <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Quản lý Học sinh của bạn
            </h1>
            <div className="flex items-center space-x-4">

                {/* Thanh tìm kiếm */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-48 sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Chuông thông báo */}
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Avatar người dùng (trong header) */}
                <DropdownAvatar></DropdownAvatar>
                {/*<img*/}
                {/*    src="https://placehold.co/40x40/6366f1/ffffff?text=HS"*/}
                {/*    alt="User Avatar"*/}
                {/*    className="w-9 h-9 rounded-full object-cover hidden sm:block"*/}
                {/*/>*/}
            </div>
        </header>
    )
}