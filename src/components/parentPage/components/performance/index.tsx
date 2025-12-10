"use client"
import React from "react";

const PerfMetric = ({ label, value, color }) => (
    <div className="flex justify-between items-center">
        <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${color}`}></span>
            <span className="text-gray-700">{label}</span>
        </div>
        <span className="font-medium text-gray-800">{value}%</span>
    </div>
);

export default function Performance ({performance}: {performance: any}) {
    return (
        <>
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-auto">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance</h4>

                <div className="flex items-center space-x-6">
                    {/* Mô phỏng biểu đồ tròn - sử dụng SVG hoặc thư viện chart thực tế */}
                    <div className="relative w-24 h-24">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            <path
                                className="text-gray-200"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="text-indigo-500"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${performance.overall}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-2xl font-bold text-gray-800">{performance.overall}%</span>
                        </div>
                    </div>

                    {/* Chi tiết hiệu suất */}
                    <div className="space-y-2 text-sm">
                        <PerfMetric label="Participation" value={performance.participation} color="bg-indigo-500" />
                        <PerfMetric label="Quizzes" value={performance.quizzes} color="bg-yellow-500" />
                        <PerfMetric label="Exams" value={performance.exams} color="bg-green-500" />
                    </div>
                </div>

                {/* Biểu đồ đường (Line Chart) mô phỏng */}
                <div className="mt-6 border-t pt-4">
                    <p className="text-sm font-medium text-gray-800 mb-2">Progress Trend</p>
                    <div className="h-20 bg-gray-50 rounded-lg p-2 flex items-end">
                        {/* Mô phỏng đường cong tăng trưởng */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <polyline
                                fill="none"
                                stroke="#4F46E5"
                                strokeWidth="2"
                                points="0,80 20,60 40,75 60,30 80,45 100,20"
                            />
                        </svg>
                    </div>
                    {/* <p className="text-xs text-gray-500 mt-2 italic">
                        {performance.quote}
                    </p> */}
                </div>
            </div>
        </>
    )
}