'use client';

import {Provider, useDispatch} from 'react-redux';
import { store } from './store';
import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import { useAppSelector} from "./hook";
import UserService from "@/service/userData";
import {resetUser, setUser} from "@/store/slices/user";
import StudentService from "@/service/studentList";
import {setList} from "@/store/slices/studentList";
import {setValue} from "@/store/slices/dateCountData";

interface ProvidersProps {
    children: React.ReactNode;
}
function ValidateUser({children}:ProvidersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');
    const dispatch = useDispatch();
    useEffect(() => {
        if(isLoginPage) return
        const handler = () =>{
            const getId = parseVal(localStorage.getItem("id"))
            const getAvatar = parseVal(localStorage.getItem("avatar"))
            const getEmail = parseVal(localStorage.getItem("email"));
            if(getId == 'error' || getAvatar == 'error' || getEmail == 'error') {
                setTimeout(() => {
                    localStorage.clear();
                    router.push('/login');
                    dispatch(resetUser());
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
                                dispatch(resetUser());
                            },1000)
                            alert('sai thông tin,đăng nhập lại!')
                        }
                    }
                })
                .catch((error) => {setTimeout(() => {
                    localStorage.clear();
                    router.push('/login');
                    dispatch(resetUser());
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
    }, [dispatch, isLoginPage, pathname, router]);
    return children;
}
function UpdateData({ children }: ProvidersProps) {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');
    useEffect(() => {
        if(isLoginPage) return
        const getEmail = JSON.parse(localStorage.getItem("email"));
        if(!getEmail) return;
        dispatch(setValue(new Date().toISOString()));
        UserService.validateUser(getEmail).then(
            res => {
                dispatch(setUser(res));
            }
        )
        StudentService.getData().then(
            res =>
                dispatch(setList(res.data))
        )
    }, [dispatch, isLoginPage, pathname]);
    return children;
}
function MiddleWareFake({ children }: ProvidersProps) {
    const pathname = usePathname();
    const userRole = useAppSelector(state => state.user.role)
    const router = useRouter();
    useEffect(() => {
        if(pathname === '/login' ) return
        if(userRole){
            if(userRole == 'admin') return
            else {
                router.replace('/parentPage');
            }
        }
    }, [pathname, router, userRole]);
    return children;
}
function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <ValidateUser>
                <MiddleWareFake>
                    <UpdateData>
                        {children}
                    </UpdateData>
                </MiddleWareFake>
            </ValidateUser>
        </Provider>
    )
}
export default Providers