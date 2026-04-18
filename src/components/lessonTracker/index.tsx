'use client'
import React, { useEffect } from 'react';
import { UserPlus, Star} from 'lucide-react';
import { useAppSelector } from '@/store/hook';

const ProfileCard = ({ 
  name = "Nguyễn Văn An", 
  studentClass = "UI/UX Designer", 
  avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  stats = { projects: 128, followers: "1.2k", rating: 4.9 }
}) => {
  return (
      <div className="group relative w-full max-w-sm">
        {/* Glassmorphism Card Wrapper */}
        <div className=" backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
          
          {/* Animated Profile Image Container */}
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-30 h-30 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            {/* User Info */}
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{name}</h2>
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-4">
            {studentClass}
          </p>
          {/* Stats Section */}
          <div className="flex w-full justify-around py-4 border-y border-slate-100 mb-6">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                {stats.projects}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Dự án</span>
            </div>
            <div className="flex flex-col border-x border-slate-100 px-4">
              <span className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                {stats.followers}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Theo dõi</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                {stats.rating} <Star size={14} className="fill-yellow-400 text-yellow-400" />
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Đánh giá</span>
            </div>
          </div>

          {/* Main Action Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95 group/btn">
            <UserPlus size={20} className="group-hover/btn:rotate-12 transition-transform" />
            Xem thông tin 
          </button>
        </div>

      {/* Tailwind Animation Extension */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default function LessonTracker() {
    const studentList = useAppSelector(state => state.student.list)
    useEffect(() => {
        console.log(studentList)
    },[])
  return (
    <>
        <div className='flex flex-row w-full h-full gap-[50px] flex-wrap overflow-scroll'>
            {studentList.map((studentInf) => (
                <ProfileCard  
                    key={studentInf.id}
                    name={studentInf.name}
                    studentClass={`Lớp ${studentInf.class}`}
                    avatarUrl={studentInf.avatar}
                    stats={{projects: 128, followers: "1.2k", rating: 4.9}}
                />
            ))}
            
        </div>
        
    </>
  );
}