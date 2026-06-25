"use client"
import React, { useState, useEffect,useRef } from 'react';
import { 
  School,
  SquarePen,
  ArrowDownToLine,
  User, 
  BarChart3, 
  Clock, 
  X, 
  ArrowUpRight, 
  Mail,
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ThumbsUp, 
  Send,
  Globe,
  Award,
  Sparkles,
  BookOpen,
  Terminal,
  Cpu,
  Sliders,
  MessageSquare,
  Share2
} from 'lucide-react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
function Toast({ message, isVisible, onClose,isEditing } : any) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const toastStyle = {
    position: 'fixed',
    top: '24px',
    right: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    color: '#0f172a',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
    fontSize: '13px',
    fontWeight: '600',
    padding: '12px 20px',
    borderRadius: '16px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    pointerEvents: 'none'
  };

  return (
    <div style={toastStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
        {!isEditing 
        ? 
          <ArrowDownToLine style={{ width: '20px', height: '20px' }}></ArrowDownToLine>
        :
          <SquarePen style={{ width: '20px', height: '20px' }}></SquarePen>
        }
        
      </div>
      <span>{message}</span>
    </div>
  );
}

function SectionHeader({ title, icon: Icon, color } : any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', marginTop: '6px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '28px', 
        height: '28px', 
        borderRadius: '8px', 
        backgroundColor: `${color}15`, 
        color: color 
      }}>
        <Icon style={{ width: '15px', height: '15px', strokeWidth: '2.5px' }} />
      </div>
      <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h4>
    </div>
  );
}

function ProfileSidebar({ activeTab, setActiveTab, isMobile,  } : any) {
  const tabs = [
    { id: 'tab-intro', label: 'Giới thiệu', icon: User, color: '#6366f1' },
    { id: 'tab-stats', label: 'Chỉ số', icon: BarChart3, color: '#10b981' },
    { id: 'tab-timeline', label: 'Hoạt động', icon: Clock, color: '#f59e0b' }
  ];

  const sidebarStyle = {
    width: isMobile ? '100%' : '240px',
    backgroundColor: '#ffffff',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottom: isMobile ? '1px solid #f1f5f9' : 'none',
    borderRight: !isMobile ? '1px solid #f1f5f9' : 'none',
    flexShrink: 0,
    gap: '32px',
    boxSizing: 'border-box',
    position: 'relative',
  };

  const navStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    gap: '6px',
    width: '100%',
    overflowX: isMobile ? 'auto' : 'visible',
    padding: isMobile ? '4px 0' : '0',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  };

  return (
    <div style={sidebarStyle}>
      {/* Profile Header Block */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', gap: '16px', width: '100%', textAlign: isMobile ? 'left' : 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Avatar Ring Gradient */}
          <div style={{
            position: 'absolute',
            inset: '-3px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            borderRadius: '50%',
            zIndex: 0,
            opacity: 0.85
          }} />
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" 
            alt="Avatar Nguyễn Minh Đức" 
            style={{ 
              width: isMobile ? '56px' : '80px', 
              height: isMobile ? '56px' : '80px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              border: '3px solid #ffffff', 
              position: 'relative',
              zIndex: 1,
            }}
          />
          <span style={{ 
            position: 'absolute', 
            bottom: '2px', 
            right: '2px', 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#10b981', 
            borderRadius: '50%', 
            border: '3px solid #ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 2 
          }} title="Sẵn sàng hợp tác"></span>
        </div>
        
        <div style={{ textAlign: isMobile ? 'left' : 'center', width: '100%' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '850', 
            color: '#0f172a', 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isMobile ? 'flex-start' : 'center',
            gap: '4px' 
          }}>
            Minh Đức
            <CheckCircle2 style={{ width: '16px', height: '16px', color: '#6366f1', fill: 'rgba(99, 102, 241, 0.1)' }} />
          </h2>
          <p style={{ 
            fontSize: '11px', 
            color: '#64748b', 
            fontWeight: '600',
            marginTop: '4px', 
            marginBottom: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Fullstack Developer</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={navStyle}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          const buttonStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            border: 'none',
            color: isSelected ? tab.color : '#64748b',
            backgroundColor: isSelected ? `${tab.color}12` : 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: isMobile ? 'auto' : '100%',
            transition: 'all 0.2s ease',
            outline: 'none',
            boxShadow: isSelected ? `inset 3px 0 0px ${tab.color}` : 'none'
          };

          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={buttonStyle}
              className="tab-button"
            >
              <Icon style={{ width: '16px', height: '16px', strokeWidth: '2.5px' }} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer statistics branding */}
      {!isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Sparkles style={{ width: '10px', height: '10px' }} /> Pro Member
          </div>
          <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'monospace' }}>UID: #109401</div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 3: INTRO TAB CONTENT (Giới thiệu phân chia section rõ rệt)
   ========================================================================= */
function IntroTab({ToggleEditAll} : any) {
  useEffect(() => {
      console.log('ở đây sẽ load dữ liệu')
      
    }
  ,[])
  const categories = [
    {
      title: "Front-end Development",
      skills: [
        { name: "React / Next.js", color: "#6366f1" },
        { name: "Tailwind CSS", color: "#06b6d4" },
        { name: "TypeScript", color: "#3178c6" }
      ]
    },
    {
      title: "Back-end & Cloud",
      skills: [
        { name: "Node.js / Express", color: "#10b981" },
        { name: "MongoDB & Postgres", color: "#f59e0b" },
        { name: "Docker & AWS", color: "#eb4034" }
      ]
    }
  ];
  const [email,setEmail] = useState('nhập email ở đây')
  const [location,setLocation] = useState('nhập địa chỉ ở đây')
  const [startDate,setStartDate] = useState('nhập ngày bắt đầu học')
  const [school,setSchool] = useState('nhập trường học')
  const cards = [
    { icon: Mail, title: "Email", value: email, color: "#6366f1", bg: "#f0f2fe" ,update: setEmail},
    { icon: MapPin, title: "Địa chỉ", value: location, color: "#10b981", bg: "#ecfdf5",update: setLocation },
    { icon: Calendar, title: "Ngày bắt đầu học", value: startDate, color: "#f59e0b", bg: "#fffbeb", update: setStartDate },
    { icon: School, title: "Trường", value: school, color: "#06b6d4", bg: "#ecfeff", link: "http://thpt-tayho-hanoi.edu.vn/homegd1", update: setSchool }
  ];
  const [onEditing,setOnediting] = useState(false)
  const [defaultText,setDefaultText] = useState('xin chào')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Phân khu 1: Tiểu sử */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
        <SectionHeader title="Thông tin học sinh" icon={BookOpen} color="#6366f1" />
        <div style={{ 
          backgroundColor: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px', 
          padding: '12px 14px',
          lineHeight: '1.5', 
          color: '#475569', 
          fontSize: '12px' 
        }}>
          {onEditing ? 
          <div style={{display:'flex',flexDirection:'row'}}> 
            <textarea ref={textareaRef} onChange={(e) => {setDefaultText(e.target.value)}} style={{ resize: 'none',width:'100%',outline: 'none',border: 'none' }} value={defaultText} ></textarea>
            <button onClick={() =>{setOnediting(!onEditing)}} >
              <DoneIcon fontSize='small' /> 
            </button>
          </div>  
          :
          <div style={{display:'flex',justifyContent:'space-between',alignItems: 'center',flexDirection:'row'}}>
            <span> {defaultText}</span>
            <button onClick={() =>{setOnediting(true) ;setTimeout(() => {
                    textareaRef.current?.focus();
                    textareaRef.current?.setSelectionRange(
                    textareaRef.current.value.length,
                    textareaRef.current.value.length
                  )}, 100);}}> 
              <EditIcon fontSize='small' /> 
            </button>
          </div>}
          
        </div>
      </div>

      {/* Phân khu 2: Thông tin cơ bản */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
        <SectionHeader title="Thông tin cơ bản" icon={Sliders} color="#10b981" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                backgroundColor: card.bg, 
                padding: '10px 12px', 
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.01)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '10px', 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                  color: card.color 
                }}>
                  <Icon style={{ width: '14px', height: '14px' }} />
                </div>
                <div style={{ overflow: 'hidden',width:'100%' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', margin: 0 }}>{card.title}</p>
                  {ToggleEditAll ? 
                    <>
                      <textarea onChange={(e) => {card.update(e.target.value)}}  
                      style={{ fontWeight: '750',resize: 'none',fontSize:'12px',height:'16px',width:'100%',outline: 'none',border: 'none',overflow:'hidden',transition:'height 1s ease' }} value={card.value} 
                      ></textarea>
                    </>
                  :
                    <>
                      {card.link ? (
                        <a target='_blank' href={card.link} style={{ color: card.color, fontWeight: '750', fontSize: '12px', margin: 0, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          {card.value} <ArrowUpRight style={{ width: '10px', height: '10px' }} />
                        </a>
                      ) : (
                        <p style={{ color: '#1e293b', fontWeight: '750', fontSize: '12px', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{card.value}</p>
                      )}
                    </>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phân khu 3: Thông tin liên lạc */}
      <div>
        <SectionHeader title="Thông tin liên lạc" icon={Share2} color="#3b82f6" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="#" style={{ 
            // padding: '10px 16px', 
            // backgroundColor: '#f0f4fe', 
            color: '#3b82f6', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            textDecoration: 'none', 
            fontSize: '11px',
            fontWeight: '700',
            transition: 'all 0.2s' 
          }}>
            <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/bubbles/100/zalo.png" alt="zalo"/>
             {/* Zalo */}
          </a>
          <a href="#" style={{ 
            // padding: '10px 16px', 
            // backgroundColor: '#f8fafc', 
            color: '#0f172a', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            textDecoration: 'none', 
            fontSize: '11px',
            fontWeight: '700',
            transition: 'all 0.2s' 
          }}>
            <img style={{ width: '80px', height: '80px' }} src="https://img.icons8.com/clouds/100/facebook-new.png" alt="facebook-new"/>
          </a>
          <a href="#" style={{ 
            // padding: '10px 16px', 
            // backgroundColor: '#f8fafc', 
            color: '#0f172a', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            textDecoration: 'none', 
            fontSize: '11px',
            fontWeight: '700',
            transition: 'all 0.2s' 
          }}>
            <img width="80" height="80" src="https://img.icons8.com/bubbles/100/tiktok.png" alt="tiktok"/>
          </a>
          <a href="tel:0911557616" style={{ 
            // padding: '10px 16px', 
            // backgroundColor: '#f8fafc', 
            color: '#0f172a', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            textDecoration: 'none', 
            fontSize: '11px',
            fontWeight: '700',
            transition: 'all 0.2s' 
          }}>
            <img width="80" height="80" src="https://img.icons8.com/clouds/100/phone.png" alt="phone"/>
          </a>
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 4: STATS TAB CONTENT (Các chỉ số được đóng khung rạch ròi)
   ========================================================================= */
function StatsTab() {
  const stats = [
    { title: "Dự án hoàn thành", value: "35+", desc: "SaaS, Landing Pages", color: "#6366f1", bg: "linear-gradient(135deg, #f0f2fe 0%, #e0e7ff 100%)" },
    { title: "Tỷ lệ đúng hạn", value: "98%", desc: "Bàn giao đúng tiến độ", color: "#10b981", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
    { title: "Số giờ coding", value: "2,500h+", desc: "Ghi nhận trên Github", color: "#f59e0b", bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" },
    { title: "Mức độ hài lòng", value: "95%", desc: "Từ đối tác và khách hàng", color: "#ec4899", bg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)" }
  ];

  const competencies = [
    { name: "Frontend Architecture", level: "90%", color: "#6366f1" },
    { name: "API & Backend Systems", level: "85%", color: "#10b981" },
    { name: "DevOps & Deployment", level: "70%", color: "#f59e0b" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Phân khu 1: Thống kê hiệu suất */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
        <SectionHeader title="Chỉ số hiệu suất" icon={BarChart3} color="#10b981" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {stats.map(stat => (
            <div 
              key={stat.title} 
              style={{ 
                background: stat.bg, 
                padding: '14px', 
                borderRadius: '16px', 
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)',
                border: '1px solid rgba(0,0,0,0.01)'
              }}
            >
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', fontWeight: '800' }}>{stat.title}</span>
              <p style={{ fontSize: '20px', fontWeight: '900', color: stat.color, margin: '6px 0' }}>{stat.value}</p>
              <p style={{ fontSize: '10px', color: '#475569', fontWeight: '500', margin: 0 }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phân khu 2: Thanh tiến trình năng lực */}
      <div>
        <SectionHeader title="Năng lực cốt lõi" icon={Cpu} color="#8b5cf6" />
        <div style={{ 
          border: '1px solid #f1f5f9', 
          borderRadius: '16px', 
          padding: '16px', 
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {competencies.map((comp, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b' }}>{comp.name}</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: comp.color }}>{comp.level}</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  width: comp.level, 
                  height: '100%', 
                  backgroundColor: comp.color, 
                  borderRadius: '3px',
                  transition: 'width 1s ease-in-out'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 5: TIMELINE TAB CONTENT (Nhật ký hành trình rõ mốc)
   ========================================================================= */
function TimelineTab() {
  const experiences = [
    {
      period: "2023 - Hiện tại",
      role: "Senior Fullstack Developer",
      company: "VinaTech Solution",
      details: "Dẫn dắt phát triển hệ thống quản lý thương mại điện tử, nâng cấp cấu trúc và tăng năng suất tải trang web lên 25%."
    },
    {
      period: "2021 - 2023",
      role: "Frontend Developer",
      company: "FPT Software",
      details: "Xây dựng các giao diện Dashboard quản lý doanh nghiệp thông minh, đồng bộ dữ liệu đồ thị thời gian thực."
    }
  ];

  const activities = [
    { time: "2 giờ trước", title: "Tối ưu hóa Next.js Server Components", color: "#6366f1" },
    { time: "3 ngày trước", title: "Phát hành bản Technical Blog đầu tiên về CSS", color: "#10b981" },
    { time: "Tháng trước", title: "Bàn giao thành công dự án nền tảng Blog cá nhân", color: "#ec4899" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Phân khu 1: Lịch sử sự nghiệp */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
        <SectionHeader title="Hành trình sự nghiệp" icon={Award} color="#6366f1" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {experiences.map((exp, idx) => (
            <div key={idx} style={{ 
              border: '1px solid #f1f5f9', 
              borderRadius: '12px', 
              padding: '12px', 
              backgroundColor: '#ffffff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{exp.role}</h5>
                  <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', margin: 0 }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: '9px', fontWeight: '700', backgroundColor: '#f0f2fe', color: '#6366f1', padding: '3px 8px', borderRadius: '6px' }}>
                  {exp.period}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#475569', margin: 0, lineHeight: '1.4' }}>{exp.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phân khu 2: Nhật ký hoạt động */}
      <div>
        <SectionHeader title="Nhật ký hoạt động" icon={Clock} color="#f59e0b" />
        <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px', marginLeft: '10px' }}>
          {activities.map((act, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                left: '-31px', 
                top: '3px', 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: '#ffffff', 
                border: `3px solid ${act.color}`,
                boxShadow: `0 0 6px ${act.color}30`
              }} />
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', fontFamily: 'monospace' }}>{act.time}</span>
              <p style={{ fontWeight: '800', color: '#1e293b', marginTop: '2px', marginBottom: 0, fontSize: '12px' }}>{act.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   MAIN EXPORT COMPONENT: STUDENT DETAIL (Mặt định xuất theo đúng cấu trúc gốc)
   ========================================================================= */
export default function StudentDetail({ studentDetailModal, setStudentDetailModal } : any) {
  const [activeTab, setActiveTab] = useState('tab-intro');
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Quản lý Toast thông báo
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (studentDetailModal) {
      setAnimate(true);
      setVisible(true);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [studentDetailModal]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e : any) => {
      if (e.key === 'Escape') {setStudentDetailModal(false);setActiveTab('tab-intro')}
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setStudentDetailModal]);

  const triggerToast = (message : any) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const toggleEdit = () => {
    if(isEditing){
      setToggleEditAll(!ToggleEditAll)
      console.log('Bấm nút này thì sẽ cập nhật')
    }
    else {
      setToggleEditAll(!ToggleEditAll)
    }
    setIsEditing(!isEditing);
    triggerToast(!isEditing ? 'Đang chỉnh sửa' : 'Lưu thành công');
  };



  const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(12px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
    opacity: animate ? 1 : 0,
    transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const modalBoxStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(241, 245, 249, 0.8)',
    borderRadius: '24px',
    width: '60%',
    // maxWidth: '680px',
    height: isMobile ? 'auto' : '600px',
    maxHeight: '92vh',
    boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.15), 0 10px 20px -5px rgba(15, 23, 42, 0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    position: 'relative',
    boxSizing: 'border-box',
    animation: animate ? 'modalOpen 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'modalClose 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const modalContentStyle = {
    flexGrow: 1,
    padding: '24px 32px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: isMobile ? 'auto' : '100%',
    position: 'relative',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  };

  const scrollContainerStyle = {
    overflowY: 'auto',
    flexGrow: 1,
    paddingRight: '6px',
    boxSizing: 'border-box',
  };

  const modalFooterStyle = {
    paddingTop: '16px',
    marginTop: '16px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    flexShrink: 0,
  };
const [ToggleEditAll,setToggleEditAll] =useState(false)
  return (
    <>
      {visible && (
        <div style={modalOverlayStyle} onClick={() => {setStudentDetailModal(false),setActiveTab('tab-intro')}}>
          <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
            
            {/* Cột trái - Sidebar thông tin */}
            <ProfileSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={isMobile}
            />

            {/* Cột phải - Nội dung các Tab chi tiết */}
            <div style={modalContentStyle}>
              
              {/* Nút đóng góc phải */}
              <button 
                onClick={() => {setStudentDetailModal(false),setActiveTab('tab-intro')}}
                style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px', 
                  color: '#94a3b8', 
                  background: '#f8fafc', 
                  border: '1px solid #f1f5f9', 
                  cursor: 'pointer', 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  transition: 'all 0.2s',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
              >
                <X style={{ width: '14px', height: '14px' }} />
              </button>

              {/* Vùng hiển thị cuộn tin mượt mà */}
              <div style={scrollContainerStyle} className="hide-scrollbar">
                {activeTab === 'tab-intro' && <IntroTab ToggleEditAll={ToggleEditAll}/>}
                {activeTab === 'tab-stats' && <StatsTab />}
                {activeTab === 'tab-timeline' && <TimelineTab />}
              </div>

              {/* Thanh chức năng Footer */}
              <div style={modalFooterStyle}>
                <button 
                  onClick={toggleEdit}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: !isEditing ? '1px solid #e2e8f0' : '1px solid #6366f1',
                    backgroundColor: isEditing ? '#6366f1' : 'transparent',
                    color: !isEditing ? '#64748b' : '#ffffff'
                  }}
                >
                  {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                </button>
                <button 
                  onClick={() => {setStudentDetailModal(false),setActiveTab('tab-intro')}}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
                >
                  Đóng hồ sơ
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Toast thông báo chung */}
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        isEditing={isEditing}
      />

      {/* Tải mã hiệu ứng hoạt họa và thanh cuộn tùy chỉnh */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalOpen {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalClose {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.97) translateY(8px); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 999px;
        }
        
        .tab-button {
          transition: all 0.2s ease;
        }
        .tab-button:hover {
          background-color: #f8fafc !important;
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .tab-button:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}