'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useAppDispatch} from "./hook";
import UserService from "@/service/userData";
import {setUser} from "@/store/slices/user";

interface ProvidersProps {
    children: React.ReactNode;
}
function ValidateUser({children}:ProvidersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');

    useEffect(() => {
        const handler = () =>{
            const getId = parseVal(localStorage.getItem("id"))
            const getAvatar = parseVal(localStorage.getItem("avatar"))
            const getEmail = parseVal(localStorage.getItem("email"));
            if(getId == 'error' || getAvatar == 'error' || getEmail == 'error') {
                setTimeout(() => {
                    localStorage.clear();
                    router.push('/login');
                },1000)
                alert('sai thông tin,đăng nhập lại!')
                return
            }
            UserService.validateUser(getEmail)
                .then((result) => {
                    const validationResult = result.id == getId && result.avatar == getAvatar && result.email == getEmail;
                    if(!isLoginPage) {
                        if (validationResult) {return}
                        else {
                            setTimeout(() => {
                                localStorage.clear();
                                router.push('/login');
                            },1000)
                            alert('sai thông tin,đăng nhập lại!')
                        }
                    }
                })
                .catch((error) => {setTimeout(() => {
                    localStorage.clear();
                    router.push('/login');
                },1000)
                    alert('sai thông tin,đăng nhập lại!')});
        }
        function parseVal(value: any) {
            try {
                return JSON.parse(value);
            }
            catch (error) {
                return 'error';
            }
        }
        handler();
        const loop = setInterval(handler, 5000);
        return () => clearInterval(loop)
    }, [isLoginPage, pathname, router]);
    return children;
}
function UpdateData({ children }: ProvidersProps) {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    useEffect(() => {
        const getEmail = JSON.parse(localStorage.getItem("email"));
        if(!getEmail) return;
        UserService.validateUser(getEmail).then(
            res => {
                dispatch(setUser(res));
            }
        )
    }, [dispatch,pathname]);
    return children;
}
function Providers({ children }: ProvidersProps) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');
    return (
        <Provider store={store}>
            <ValidateUser>
                <UpdateData>
                    {children}
                </UpdateData>
            </ValidateUser>
        </Provider>
    )
}
export default Providers