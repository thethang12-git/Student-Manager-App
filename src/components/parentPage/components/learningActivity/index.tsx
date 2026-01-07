"use client"
import {LuBookOpen, LuGauge, LuTrophy} from "react-icons/lu";
import React from "react";

const ActivityStat = ({ icon: Icon, value, label, color }) => (
    <div className="flex-1">
        <p className={`text-xl font-bold ${color}`}>{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

export default function LearningActivity({activity,isCourses}: {activity: any,isCourses : boolean}) {
    const [current,setCurrent] = React.useState(0);
    const [quizTotal, setQuizTotal] = React.useState(0);
    const calculatePercent = (value: number) => {
        if(value > current) {setCurrent(value)}
        return value/current*50;
    }
    const calculateQuiz = (value: number) => {
        if(value > quizTotal) {setQuizTotal(value)}
        return value/quizTotal*50;
    }
    return (
        <>
        {isCourses ? (
            <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 overflow-auto h-full">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Learning Activity</h4>
                <p className="text-3xl font-bold text-gray-900">{activity.totalHours}</p>
                <p className="text-sm text-gray-500 mb-6">Trong tuần</p>

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
        ) : (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
            {/* HEADER */}
            <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                    Số buổi học
                </h4>
                <p className="text-3xl font-bold text-gray-900">
                    {activity.totalLessonCount} buổi
                </p>
                <p className="text-sm text-gray-500">
                    Trong tháng
                </p>
            </div>
            <div className="flex-1 flex items-end justify-between gap-3 px-2">
                {activity.data.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center h-full justify-end w-full group"
                    >
                        <div
                            className="w-full bg-indigo-300 rounded-t-md transition-all duration-300 group-hover:bg-indigo-500"
                            style={{
                                height: `${calculatePercent(day.study)}%`,
                            }}
                            title={`Số buổi học: ${day.study} buổi`}
                            // onMouseEnter={() => }
                        />
                        <div
                            className="w-full bg-yellow-300 rounded-b-md transition-all duration-300 group-hover:bg-yellow-500"
                            style={{
                                height: `${calculateQuiz(day.quiz)}%`,
                            }}
                            title={`Số bài tập hoàn thành: ${day.quiz}%`}
                        />
                        <span className="text-xs text-gray-500 mt-2">
                            {day.day}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between text-center">
                <ActivityStat icon={LuBookOpen} value={`${activity.courses} `} label="Số buổi học trong tuần" color="text-indigo-600" />
                <ActivityStat icon={LuTrophy} value={`${activity.badges} `} label="Bài tập" color="text-yellow-600" />
                <ActivityStat icon={LuGauge} value={`${activity.avgScore}%`} label="Đánh giá" color="text-green-600" />
            </div>
        </div>
        )}
        </>
    )
}

