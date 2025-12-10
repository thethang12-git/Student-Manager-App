"use client"
import React from 'react';
import ProfileCard from "./components/profileCard";
import ContactAndSocial from "@/components/parentPage/components/contact";
import LearningActivity from "@/components/parentPage/components/learningActivity";
import Performance from "@/components/parentPage/components/performance";
import LessonsTracker from "./components/lessonsTracker";


// --- 6. DATA MOCKUP (Dữ liệu giả lập) ---
// Dữ liệu dùng để truyền vào các component.

const mockStudentData = {
    name: "Ava Mitchell",
    imageUrl: "/images/ava_mitchell.jpg", // Thay thế bằng URL ảnh thực tế
    grade: "10th",
    status: "Active",
    contact: {
        email: "avamitchell@email.com",
        phone: "+84 901 888 123",
        address: "753 King Street, LA, California",
    },
    activity: {
        totalHours: "42 Hrs",
        courses: 16,
        badges: 10.5,
        avgScore: 98,
        data: [
            { day: 'Mon', study: 10, quiz: 5 }, // 10+5 = 15
            { day: 'Tue', study: 15, quiz: 8 }, // 15+8 = 23
            { day: 'Wed', study: 8, quiz: 4 },
            { day: 'Thu', study: 18, quiz: 6 },
            { day: 'Fri', study: 20, quiz: 10 },
            { day: 'Sat', study: 12, quiz: 6 },
            { day: 'Sun', study: 5, quiz: 3 },
        ]
    },
    performance: {
        overall: 80,
        participation: 95,
        quizzes: 88,
        exams: 100,
        quote: "Motivated by your hard efforts, repeated wins are due. Keep pushing forward!",
    },
    courses: [
        { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
        { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
        { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
        { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
        { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
        { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
        { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
        { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
        { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
        { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
        { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
        { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
    ]
};

// --- 7. MAIN PAGE COMPONENT (Component Chính) ---
// Tập hợp tất cả các component con. Đây là trang mà Next.js sẽ render.

const StudentDetail = () => {
    const student = mockStudentData;

    return (
        <div className="h-screen overflow-hidden bg-gray-50 p-8 flex flex-column min-h-0">
            {/* Header cho trang */}
            <header className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
                {/* Phần Search Anything và User Menu ở góc phải trên cùng */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="p-2 border border-gray-300 rounded-full text-sm w-64 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </header>

            {/* Grid Layout chính */}
            <div className="grid grid-cols-12 gap-6 grid-rows-4">

                {/* Cột Trái: Profile, Contact, Social Media (col-span-3) */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 max-h-screen h-fit pb-20 overflow-auto rounded-2xl" style={{ scrollbarWidth: "none" }}>
                    <ProfileCard student={student} />
                    <ContactAndSocial student={student} />
                </div>

                {/* Cột Phải: Activity, Performance, Courses (col-span-9) */}
                <div className="grid col-span-12 lg:col-span-8 xl:col-span-9 overflow-auto rounded-2xl grid-rows-[30%_70%] h-screen">
                    {/* Hàng trên: Learning Activity và Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LearningActivity activity={student.activity} />
                        <Performance performance={student.performance} />
                    </div>
                    <div className="h-full">
                        <LessonsTracker courses={student.courses} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;