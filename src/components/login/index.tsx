"use client"
import React, {useEffect, useState} from 'react';
import UserService from "@/service/userData";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/slices/user";
import {useAppSelector} from "@/store/hook";
import Snackbar from "../snackbar";

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Component chính
export default function LoginPage ()  {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const reduxUser = useAppSelector(state => state.user);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    // Xử lý việc gửi form
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);

        if (!email || !password) {
            setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
            setIsSubmitting(false);
            return;
        }
        UserService.validateUser(email, password).then((user) => {
            dispatch(setUser(user));
            setTimeout(() => {
                if (user) {
                    localStorage.setItem("email", JSON.stringify(user.email));
                    localStorage.setItem("id", JSON.stringify(user.id));
                    localStorage.setItem("avatar", JSON.stringify(user.avatar));
                    setOpen(true)
                    setMessage('đúng òy')
                    setType('success')
                    setTimeout(() =>router.push('/home'),1000 )
                }
                else {
                    setOpen(true)
                    setMessage('sai òy')
                    setType('warning')
                }
                setIsSubmitting(false);
            }, 1500);
        })

    };
    useEffect(() => {
        console.log(reduxUser);
    },[reduxUser]);
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden
                    bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-300 animate-gradient-subtle">
            <style>
                {`
                @keyframes gradient-subtle {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                .animate-gradient-subtle {
                    background-size: 400% 400%;
                    animation: gradient-subtle 25s ease infinite; /* Giảm tốc độ để nhẹ nhàng hơn */
                }

                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-bounce-in {
                    animation: bounceIn 0.8s ease-out forwards;
                }

                .falling-petals-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none; 
                    overflow: hidden;
                    z-index: 0; /* Đặt dưới form */
                }

                .petal {
                    position: absolute;
                    background-color: rgba(255, 175, 0, 0.95); 
                    border-radius: 40% 60% 70% 30% / 50% 50% 50% 50%; 
                    box-shadow: 0 0 5px rgba(255, 165, 0, 0.5); 
                    animation-name: fall, spin;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    opacity: 0;
                }

                @keyframes fall {
                    0% {
                        transform: translateY(-5vh); 
                        opacity: 0.9; /* Bắt đầu với độ mờ gần như tối đa */
                    }
                    100% {
                        transform: translateY(105vh);
                        opacity: 0;
                    }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg) translateX(0px); }
                    50% { transform: rotate(180deg) translateX(5px); }
                    100% { transform: rotate(360deg) translateX(0px); }
                }

                .petal:nth-child(1) { left: 10%; width: 18px; height: 22px; animation-duration: 15s, 5s; animation-delay: 0s; } 
                .petal:nth-child(2) { left: 20%; width: 13px; height: 16px; animation-duration: 12s, 7s; animation-delay: 2s; opacity: 0.8; }
                .petal:nth-child(3) { left: 35%; width: 21px; height: 25px; animation-duration: 18s, 6s; animation-delay: 4s; }
                .petal:nth-child(4) { left: 45%; width: 15px; height: 18px; animation-duration: 10s, 4s; animation-delay: 1s; opacity: 0.7; }
                .petal:nth-child(5) { left: 60%; width: 20px; height: 24px; animation-duration: 14s, 8s; animation-delay: 3s; }
                .petal:nth-child(6) { left: 70%; width: 14px; height: 17px; animation-duration: 16s, 5s; animation-delay: 5s; opacity: 0.95; }
                .petal:nth-child(7) { left: 85%; width: 17px; height: 21px; animation-duration: 13s, 7s; animation-delay: 6s; }
                `}
            </style>

            {/* Container cho hiệu ứng cánh hoa */}
            <div className="falling-petals-container">
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
            </div>

            <div
                className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl border border-gray-200 animate-bounce-in relative z-10"
                style={{ animationDelay: '0.2s' }} /* Trì hoãn nhẹ để trông tự nhiên hơn */
            >
                <div className="text-center">
                    {/* Tiêu đề */}
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Đăng Nhập
                    </h1>
                    {/* Mô tả */}
                    <p className="text-gray-500 mb-8">
                        Chào mừng trở lại. Vui lòng nhập thông tin của bạn.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Trường Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Địa chỉ Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="vd: tenban@congty.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-sm"
                        />
                    </div>

                    {/* Trường Mật khẩu */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 sm:text-sm"
                        />
                    </div>

                    {/* Khu vực thông báo lỗi/thành công */}
                    {errorMessage && (
                        <div
                            className={cx(
                                "p-3 rounded-lg text-sm transition duration-300",
                                errorMessage.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    )}

                    {/* Nút Đăng nhập */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cx(
                            "w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition duration-300 ease-in-out transform",
                            isSubmitting
                                ? 'bg-indigo-400 cursor-not-allowed opacity-75'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                    >
                        {isSubmitting ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Đăng Nhập'}
                    </button>
                </form>
                {/* Liên kết phụ */}
                <div className="mt-6 text-center">
                    <a href="#" className="font-medium text-sm text-indigo-600 hover:text-indigo-500 transition duration-150">
                        Quên mật khẩu?
                    </a>
                </div>
            </div>
            <div>
                <Snackbar isOpen={open} message={message} type={type} setOpen={setOpen} />
            </div>
        </div>


    );
};
