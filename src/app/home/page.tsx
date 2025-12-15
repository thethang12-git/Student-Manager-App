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
import {useAppDispatch, useAppSelector} from "@/store/hook";
import ClassCount from "@/components/classCount";
import AddNewPopUp from "@/components/addNewPopUp";
import {useDispatch} from "react-redux";
import {setValue} from "@/store/slices/actionMenuType";

// Component chính (Đã đổi tên thành Home)
const Home = () => {
    const actionType = useAppSelector(state => state.actionType.value)
    const dispatch = useDispatch();
    const [students, setStudents] = useState<any[]>([]);
    const [activeMenu, setActiveMenu] = useState('manage');
    const isFirstRender = useRef(true);
    const menuItems = [
        { id: 'progress', label: 'Tiến độ lớp học', icon: LayoutDashboard },
        { id: 'manage', label: 'Quản lý học sinh', icon: Users },
        { id: 'classCount', label: "Số buổi học", icon: BookOpen },
        { id: 'calendar', label: 'Lịch', icon: Calendar },
    ];
    const getStudents = useAppSelector(state => state.student.list)
    useEffect(() => {
        setStudents(getStudents);
    }, [getStudents]);
    const [animationMap, setAnimationMap] = useState<Record<string, boolean>>({
        manage: true,
        calendar: false,
        guide: false,
        progress: false
    });
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; 
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
                                    onClick={() => {dispatch(setValue(item.id));setActiveMenu(item.id)}}
                                />
                            ))}
                        </nav>
                    </div>
                    <UserProfile_Logout/>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-hidden h-screen flex flex-col">
                    {/* Header Dashboard */}
                    <Header/>
                    {/* thanh điều khiển */}
                    <ActionBar isOpen={activeMenu === 'classCount'}/>
                    {/*danh sách học sinh*/}
                    {activeMenu === 'manage' && (
                        <div style={{overflowY: 'auto'}} className={`reveal-down ${animationMap[activeMenu] ? "show" : ""}`}>
                            <StudentList initialStudentsData={students}/>
                        </div>
                    )}
                    {activeMenu === 'calendar' && (
                    <div style={{flex: 1}} className={`reveal-down ${animationMap[activeMenu] ? "show" : ""}`}>
                        <CalendarPage/>
                    </div>)}
                    {activeMenu === 'classCount' && (
                    <div style={{flex:1,overflow:"hidden"}} className={`reveal-down ${animationMap[activeMenu] ? "show" : ""}`}>
                        <ClassCount/>
                    </div>)}
                </main>
            </div>
        </div>
    );
};

export default Home;