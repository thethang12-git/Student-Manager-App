'use client'
import {LogOut} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {resetUser} from "@/store/slices/user";
import Snackbar from "../snackbar";
import {useAppSelector} from "@/store/hook";

export default function UserProfile_Logout () {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name,setName] = useState<string | null>(null);
    const storeUser = useAppSelector(state => state.user);
    useEffect(() => {
        if(storeUser){
            setName(storeUser.name);
            setAvatar(storeUser.avatar ?? null);
        }
    },[storeUser])
    const handleLogout = () => {
        setLoading(true);
        dispatch(resetUser())
        localStorage.clear();
        setOpen(true);
        setMessage('đăng xuất thành công')
        setTimeout(() => router.push("/login"),1200);
        setTimeout(() => setLoading(false), 1500);
    }
    return (
        <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center mb-4 p-2 rounded-lg bg-indigo-50/50">
                {avatar ? (
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                )}
                <div className="ml-3 text-sm">
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-gray-500">Giáo viên</p>
                </div>
            </div>  
            <button disabled={loading} onClick={handleLogout} className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>) : (
                <>
                    <LogOut  className="w-4 h-4 mr-2" /> 
                        Đăng xuất
                </>
            )}
            </button>
            
            <Snackbar isOpen={open} message={message} type={`success`} setOpen={setOpen} />
        </div>
    )
}