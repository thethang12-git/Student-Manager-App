"use client"
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailIcon from "@mui/icons-material/Mail";
import Header from "@/app/components/Header/page"; 
import { HeaderDataType } from "@/type/headerData";

export default function HeaderWrapper() {
  const [header, setHeader] = useState<HeaderDataType[]>([
    { id: 1, count: 0, icon: <HomeIcon fontSize="large" color="action" />, name: 'home',link:'/' },
    { id: 2, count: 0, icon: <MailIcon fontSize="large" color="action" />, name: 'message',link:"/Message" },
    { id: 3, count: 0, icon: <CalendarTodayIcon fontSize="large" color="action" />, name: 'calendar',link:'/Calendar' }
  ]);

  return <Header setHeader= {setHeader} headerData={header} />;
}
