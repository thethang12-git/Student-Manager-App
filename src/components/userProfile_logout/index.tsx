'use client'
import {LogOut} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {resetUser} from "@/store/slices/user";
import Snackbar from "../snackbar";
import {useAppSelector} from "@/store/hook";

export default function UserProfile_Logout () {
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
        dispatch(resetUser())
        localStorage.clear();
        setOpen(true);
        setMessage('đăng xuất thành công')
        setTimeout(() => router.push("/login"),1600);
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
            <button onClick={handleLogout} className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <LogOut  className="w-4 h-4 mr-2" />
                Đăng xuất
            </button>
            <Snackbar isOpen={open} message={message} type={`success`} setOpen={setOpen} />
        </div>
    )
}