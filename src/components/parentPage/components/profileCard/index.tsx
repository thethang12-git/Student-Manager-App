"use client"
import {LuLayers} from "react-icons/lu";
import {IoIosChatbubbles} from "react-icons/io";
import React from "react";

export default function ProfileCard({student}: {student: any}) {
    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center relative">
                {/* Background Shape - Màu hồng */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-pink-100 rounded-t-2xl z-0"></div>
                <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    {/* Trong môi trường thực tế, bạn sẽ dùng thẻ <Image /> của Next.js */}
                    <img src={student.imageUrl} alt={student.name} className="w-full h-full object-cover" />
                </div>

                <h3 className="text-xl font-semibold mt-4 text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Student</p>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <LuLayers className="w-4 h-4 mr-1 text-gray-400" />
                Grade: <span className="font-medium ml-1 text-gray-700">{student.grade}</span>
              </span>
                            <span className="h-4 w-px bg-gray-300"></span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {student.status}
              </span>
                </div>
                <button className="flex items-center justify-center w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150">
                    <IoIosChatbubbles className="w-5 h-5 mr-2" />
                    Chat
                </button>
            </div>
        </>
    )
}