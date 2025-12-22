"use client"
import {LuBookOpen, LuGauge, LuTrophy} from "react-icons/lu";
import React from "react";

const ActivityStat = ({ icon: Icon, value, label, color }) => (
    <div className="flex-1">
        <p className={`text-xl font-bold ${color}`}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

export default function LearningActivity({activity}: {activity: any}) {
    return (
        <>
            <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 overflow-auto">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Learning Activity</h4>
                <p className="text-3xl font-bold text-gray-900">{activity.totalHours}</p>
                <p className="text-sm text-gray-500 mb-6">30 days</p>

                {/* Mô phỏng Biểu đồ cột */}
                <div className="flex justify-between items-end h-18 space-x-2">
                    {activity.data.map((day, index) => (
                        <div key={index} className="flex flex-col items-center w-full group">
                            <div
                                className="bg-indigo-300 w-full rounded-t-sm transition-all duration-300 group-hover:bg-indigo-500"
                                style={{ height: `${day.study * 2.5}px` }} // Scaled height for visual
                            ></div>
                            <div
                                className="bg-yellow-300 w-full rounded-b-sm -mt-px transition-all duration-300 group-hover:bg-yellow-500"
                                style={{ height: `${day.quiz * 2.5}px` }} // Scaled height for visual
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between text-center">
                    <ActivityStat icon={LuBookOpen} value={`${activity.courses} Courses`} label="Started" color="text-indigo-600" />
                    <ActivityStat icon={LuTrophy} value={`${activity.badges} Badges`} label="Earned" color="text-yellow-600" />
                    <ActivityStat icon={LuGauge} value={`${activity.avgScore}%`} label="Avg. Score" color="text-green-600" />
                </div>
            </div>
        </>
    )
}