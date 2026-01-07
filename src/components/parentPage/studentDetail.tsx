"use client"
import React, { use, useEffect, useState } from 'react';
import ProfileCard from "./components/profileCard";
import ContactAndSocial from "@/components/parentPage/components/contact";
import LearningActivity from "@/components/parentPage/components/learningActivity";
import Performance from "@/components/parentPage/components/performance";
import LessonsTracker from "./components/lessonsTracker";
import { useAppSelector } from '@/store/hook';
import StudentService from '@/service/studentList';
import UserService from '@/service/userData';


// --- 6. DATA MOCKUP (Dữ liệu giả lập) ---
// Dữ liệu dùng để truyền vào các component.

const mockStudentData = {
    name: "Ava Mitchell",
    imageUrl: "/images/ava_mitchell.jpg", 
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
            { day: 'Mon', study: 1, quiz: 3 }, // 10+5 = 15
            { day: 'Tue', study: 15, quiz: 8 }, // 15+8 = 23
            { day: 'Wed', study: 8, quiz: 4 },
            { day: 'Thu', study: 18, quiz: 6 },
            { day: 'Fri', study: 20, quiz: 10 },
            { day: 'Sat', study: 12, quiz: 6 },
            { day: 'Sun', study: 5, quiz: 3 },
        ]
    },
    // performance: {
    //     overall: 80,
    //     participation: 95,
    //     quizzes: 88,
    //     exams: 100,
    //     quote: "Motivated by your hard efforts, repeated wins are due. Keep pushing forward!",
    // },
    // courses: [
    //     { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
    //     { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
    //     { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
    //     { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
    //     { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
    //     { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
    //     { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
    //     { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
    //     { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
    //     { name: "Business Communication", abbr: "BC", chapters: 22, progress: 40, score: 72, status: "New", color: "bg-blue-500" },
    //     { name: "Spanish for Beginners", abbr: "SP", chapters: 30, progress: 100, score: 90, status: "Completed", color: "bg-purple-500" },
    //     { name: "Content Marketing", abbr: "CM", chapters: 19, progress: 25, score: 64, status: "Active", color: "bg-teal-500" },
    // ]
};

// --- 7. MAIN PAGE COMPONENT (Component Chính) ---
const StudentDetail = () => {
    // const student = mockStudentData;
    const [student, setStudentData] = useState<any>(null);
    const studentId = useAppSelector((state) => state.user.studentId);
    const userData = useAppSelector((state) => state.user);
    const StudentDetail = useAppSelector((state) => state.studentDetail.id);
    useEffect(() => {
        console.log(StudentDetail);
    }, [StudentDetail]);
    useEffect(() => {
        if(studentId){
            StudentService.getStudentById(studentId).then(studentData => {
                UserService.getUserById(userData.userId).then(userInfo => {
                    console.log(studentData,userInfo.data);
                const studentInfo = {
                    name: studentData.name,
                    imageUrl: studentData.avatar, 
                    grade: studentData.class,
                    status: studentData.id ? "Active" : "Inactive",
                    contact: {
                        email: userInfo.data.email,
                        phone: userInfo.data.phoneNumber,
                        address: userInfo.data.address,
                    },
                    activity: {
                        totalLessonCount: "42",
                        courses: 16,
                        badges: 10.5,
                        avgScore: 98,
                        data: [
                            { day: 'Thứ 2', study: 10, quiz: 5 },
                            { day: 'Thứ 3', study: 15, quiz: 8 },
                            { day: 'Thứ 4', study: 8, quiz: 4 },
                            { day: 'Thứ 5', study: 18, quiz: 6 },
                            { day: 'Thứ 6', study: 20, quiz: 10 },
                            { day: 'Thứ 7', study: 12, quiz: 6 },
                            { day: 'Chủ nhật', study: 5, quiz: 3 },
                        ]
                    },
                    //
                    // courses : [
                    //     { name: "French for Beginners", abbr: "FR", chapters: 18, progress: 65, score: 78, status: "Active", color: "bg-red-500" },
                    // ],
                    // performance: {
                    //     overall: 80,
                    //     participation: 95,
                    //     quizzes: 88,
                    //     exams: 100,
                    //     quote: "Motivated by your hard efforts, repeated wins are due. Keep pushing forward!",
                    // },
                    //
                }
                setStudentData(studentInfo);
                });
            })
        }
        else {
            if(StudentDetail){

            }
        }
    }, [studentId]);
    if(!student) return 
    return (
        <div className="h-screen overflow-hidden bg-gray-50 p-8 flex flex-col">
            {/* Header */}
            {/*<header className="flex justify-between items-center mb-4">*/}
            {/*    <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>*/}
            {/*    <div className="flex items-center space-x-4">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Search anything..."*/}
            {/*            className="p-2 border border-gray-300 rounded-full text-sm w-64 focus:ring-indigo-500 focus:border-indigo-500"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</header>*/}

            {/* Grid Layout chính */}
            <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
                {/* Cột Trái: Profile, Contact, Social Media */}
                <div  className="hide-scrollbar col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col  max-h-screen overflow-hidden rounded-2xl " style={{ scrollbarWidth: "none" }}>
                    <ProfileCard student={student} />
                    <ContactAndSocial student={student} />
                </div>

                {/* Cột Phải: LearningActivity, Performance + LessonsTracker */}
                {student.courses ? (
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col h-full rounded-2xl overflow-hidden">
                    {/* Hàng trên: LearningActivity + Performance */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        <LearningActivity isCourses={true} activity={student.activity} />
                        <Performance performance={student.performance} />
                    </div>

                    {/* Hàng dưới: LessonsTracker / EnrollCourse */}
                    <div className="flex-1 overflow-hidden">
                        <LessonsTracker courses={student.courses} />
                    </div>
                </div>
                ) : (
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col h-full rounded-2xl overflow-hidden">
                    <LearningActivity isCourses={false} activity={student.activity} />
                </div>
                ) }
                
            </div>
        </div>
    );
};


export default StudentDetail;