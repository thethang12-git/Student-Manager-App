"use client"
import React, {useState, useMemo, useEffect, useRef} from 'react';
import {
    LayoutDashboard, Users, BookOpen, Clock, LogOut, Search, Bell, ChevronDown, List, Edit, Trash2, ArrowUpDown,
    Calendar
} from 'lucide-react';
import NavBar from "@/components/navbar";
import StudentList from "@/components/studentList";
import ActionBar from "@/components/actionbar";
import Header from "@/components/header";
import UserProfile_Logout from "@/components/userProfile_logout";
import CalendarPage from "@/app/Calendar/page";

// Dữ liệu mẫu
const studentsData = [
    { id: 1001543, name: 'Anderson', gender: 'M', category: 'Hip Hop', date: 'Jan 22, 2022', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/9333ea/ffffff?text=A' },
    { id: 1001567, name: 'Beckett', gender: 'F', category: 'Hip Hop', date: 'Feb 12, 2022', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/059669/ffffff?text=B' },
    { id: 1001544, name: 'Brady', gender: 'M', category: 'Jazz', date: 'Jul 17, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/f97316/ffffff?text=B' },
    { id: 1001523, name: 'Cassidy', gender: 'F', category: 'Ballet', date: 'Sep 25, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/0ea5e9/ffffff?text=C' },
    { id: 1001512, name: 'Delaney', gender: 'F', category: 'Modern Dance', date: 'Aug 05, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/a855f7/ffffff?text=D' },
    { id: 1001545, name: 'Easton', gender: 'M', category: 'Jazz', date: 'Feb 22, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/14b8a6/ffffff?text=E' },
    { id: 1001578, name: 'Griffin', gender: 'M', category: 'Hip Hop', date: 'Nov 07, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/e11d48/ffffff?text=G' },
    { id: 1001585, name: 'Luna', gender: 'F', category: 'Ballet', date: 'Dec 25, 2021', goal: '1 Academic Year', avatar: 'https://placehold.co/40x40/ca8a04/ffffff?text=L' },
];


// Component chính (Đã đổi tên thành Home)
const Home = () => {
    const [activeMenu, setActiveMenu] = useState('manage');
    const isFirstRender = useRef(true);
    const menuItems = [
        { id: 'progress', label: 'Tiến độ lớp học', icon: LayoutDashboard },
        { id: 'manage', label: 'Quản lý học sinh', icon: Users },
        { id: 'guide', label: "Hướng dẫn Giáo viên", icon: BookOpen },
        { id: 'calendar', label: 'Lịch', icon: Calendar },
    ];
    const [animationMap, setAnimationMap] = useState<Record<string, boolean>>({
        manage: true,
        calendar: false,
        guide: false,
        progress: false
    });
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // bỏ qua lần render đầu tiên
        }
        setAnimationMap(prev => {
            const resetMap : any = {}
            for(const key in prev){
                resetMap[key] = false
            }
            return resetMap;
        })
        setTimeout(() => setAnimationMap(prev => ({...prev, [activeMenu]: !prev[activeMenu]})),200)
    }, [activeMenu]);

    // Layout chung cho toàn bộ trang
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white flex w-full min-h-screen overflow-hidden">

                {/* Sidebar */}
                <aside className="w-68 p-6 flex flex-col justify-between border-r border-gray-100 bg-white">
                    {/* Logo và Menu */}
                    <div>
                        <div className="text-3xl font-extrabold text-indigo-600 mb-10">
                            Student Manager
                        </div>
                        <nav>
                            {menuItems.map((item) => (
                                <NavBar
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={item.id === activeMenu}
                                    onClick={() => {setActiveMenu(item.id)}}
                                />
                            ))}
                        </nav>
                    </div>
                    {/* User Profile và Logout */}
                    <UserProfile_Logout/>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Header Dashboard */}
                    <Header/>
                    {/* thanh điều khiển */}
                    <ActionBar/>
                    {/*danh sách học sinh*/}
                    {activeMenu === 'manage' && (
                        <div className={`reveal-down ${animationMap[activeMenu] ? "show" : ""}`}
                        >
                            <StudentList initialStudentsData={studentsData}/>
                        </div>
                    )}
                    {activeMenu === 'calendar' && (
                    <div className={`reveal-down ${animationMap[activeMenu] ? "show" : ""}`}>
                        <CalendarPage/>
                    </div>)}
                </main>
            </div>
        </div>
    );
};

export default Home;