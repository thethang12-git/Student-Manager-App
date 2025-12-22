"use client"
import React from "react";

const CourseItem = ({ course }:{course:any}) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-150">
        <div className="flex items-center space-x-3 ">
            {/* Biểu tượng/Màu sắc đại diện cho khóa học */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${course.color}`}>
                {/* Có thể dùng Icon ở đây, vd: <LuBookOpen /> */}
                <span className="font-bold text-sm">{course.abbr}</span>
            </div>
            <div>
                <p className="font-semibold text-gray-800">{course.name}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="mr-3">{course.chapters} Chapters</span>
                    <span className="h-3 w-px bg-gray-300"></span>
                    <span className="ml-3">{course.progress}% Completed</span>
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">
                <span className="text-xl font-bold">{course.score}</span>/100
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${course.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {course.status}
      </span>
            <button className="text-indigo-600 hover:text-indigo-800 transition text-sm font-medium">
                View
            </button>
        </div>
    </div>
);

export  default function LesssonsTracker({courses}: {courses: any}) {
    return (
        <>
            <div className="h-full bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-6 overflow-auto">
                <div className="flex justify-between items-center mb-4 ">
                    <h4 className="text-lg font-semibold text-gray-800">Enrolled Courses</h4>
                    <div className="flex items-center space-x-3 text-sm text-indigo-600 font-medium">
                        <select className="bg-gray-100 rounded-lg p-1 text-gray-700">
                            <option>Search course category</option>
                        </select>
                        <button className="px-3 py-1 bg-indigo-100 rounded-lg hover:bg-indigo-200">View All</button>
                    </div>
                </div>

                <div className="space-y-3 overflow-auto">
                    {courses.map((course:any, index:any) => (
                        <CourseItem key={index} course={course} />
                    ))}
                </div>
            </div>
        </>
    )
}