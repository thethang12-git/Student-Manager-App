"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, 
  BarChart3, 
  Clock, 
  Mail, 
  X, 
  ArrowUpRight, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ThumbsUp, 
  Send,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';

/* =========================================================================
   SUB-COMPONENT 1: TOAST NOTIFICATION (Thông báo nhanh)
   Hiển thị thông báo nhỏ ở góc màn hình bằng CSS Inline.
   ========================================================================= */
function Toast({ message, isVisible, onClose }) {
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
    bottom: '24px',
    right: '24px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '600',
    padding: '14px 20px',
    borderRadius: '9999px',
    border: '1px solid #1e293b',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    pointerEvents: 'none',
    transform: isVisible ? 'translateY(0)' : 'translateY(48px)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
  };

  return (
    <div style={toastStyle}>
      <ThumbsUp style={{ width: '16px', height: '16px', color: '#818cf8' }} />
      <span>{message}</span>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 2: PROFILE SIDEBAR (Cột trái cố định)
   ========================================================================= */
function ProfileSidebar({ activeTab, setActiveTab, isMobile }) {
  const tabs = [
    { id: 'tab-intro', label: 'Giới thiệu', icon: User },
    { id: 'tab-stats', label: 'Chỉ số', icon: BarChart3 },
    { id: 'tab-timeline', label: 'Hoạt động', icon: Clock },
    { id: 'tab-contact', label: 'Liên hệ', icon: Mail }
  ];

  const sidebarStyle = {
    width: isMobile ? '100%' : '240px',
    backgroundColor: '#020617',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'center' : 'flex-start',
    borderBottom: isMobile ? '1px solid #1e293b' : 'none',
    borderRight: !isMobile ? '1px solid #1e293b' : 'none',
    flexShrink: 0,
    gap: '16px',
    boxSizing: 'border-box'
  };

  const navStyle = {
    display: 'flex',
    flexDirection:  'column',
    gap: '6px',
    width: isMobile ? 'auto' : '100%',
    overflowX: isMobile ? 'auto' : 'visible',
    padding: '4px 0',
    WebkitOverflowScrolling: 'touch',
  };

  return (
    <div style={sidebarStyle}>
      {/* Khối thông tin cá nhân */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: '16px', width: isMobile ? 'auto' : '100%' }}>
        <div style={{ position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" 
            alt="Avatar Nguyễn Minh Đức" 
            style={{ width: isMobile ? '48px' : '80px', height: isMobile ? '48px' : '80px', borderRadius: '24px', objectFit: 'cover', border: '1px solid #1e293b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
          <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '14px', height: '14px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid #020617' }} title="Sẵn sàng hợp tác"></span>
        </div>
        
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '700', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Minh Đức
            <CheckCircle2 style={{ width: '16px', height: '16px', color: '#818cf8', fill: 'rgba(129, 140, 248, 0.1)' }} />
          </h2>
          <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', marginBottom: 0 }}>Fullstack Developer</p>
        </div>
      </div>

      {/* Menu Tabs */}
      <nav style={navStyle}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          const buttonStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            border: isSelected ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
            color: isSelected ? '#818cf8' : '#94a3b8',
            backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: isMobile ? 'auto' : '100%',
            transition: 'all 0.2s ease',
            outline: 'none'
          };

          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={buttonStyle}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Chân sidebar */}
      {!isMobile && (
        <div style={{ fontSize: '9px', color: '#475569', fontFamily: 'monospace' }}>UID: #109401</div>
      )}
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 3: INTRO TAB CONTENT (Tab Giới thiệu)
   ========================================================================= */
function IntroTab() {
  const skills = ["React / Next.js", "Node.js / Express", "Tailwind CSS", "Docker / AWS"];

  const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animation: 'fadeIn 0.3s ease'
  };

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(2, 6, 23, 0.4)',
    padding: '10px',
    borderRadius: '16px',
    border: '1px solid #1e293b',
    width: "40%"
  };

  return (
    <div style={tabContainerStyle}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid #1e293b', paddingBottom: '8px', margin: 0 }}>Hồ sơ cá nhân</h3>
      <p style={{ lineHeight: '1.6', color: '#94a3b8', margin: 0 }}>
        Xin chào! Mình là Đức, một lập trình viên Fullstack đam mê tạo ra các ứng dụng web tối giản, tối ưu hóa hiệu năng tốt và có trải nghiệm người dùng cao. Thế mạnh của mình là phát triển hệ sinh thái Front-end và xây dựng hệ thống APIs ổn định.
      </p>

      {/* Grid danh sách thông tin cơ bản */}
      <div  style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}>
        <div style={cardStyle}>
          <Briefcase style={{ width: '16px', height: '16px', color: '#818cf8' }} />
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', margin: 0 }}>Công tác</p>
            <p style={{ color: '#cbd5e1', fontWeight: '500', fontSize: '10px', margin: 0 }}>VinaTech Solution</p>
          </div>
        </div>

        <div style={cardStyle}>
          <MapPin style={{ width: '16px', height: '16px', color: '#818cf8', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', margin: 0 }}>Địa chỉ</p>
            <p style={{ color: '#cbd5e1', fontWeight: '500', fontSize: '10px', margin: 0 }}>Hà Nội, Việt Nam</p>
          </div>
        </div>

        <div style={cardStyle}>
          <Calendar style={{ width: '16px', height: '16px', color: '#818cf8', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', margin: 0 }}>Gia nhập</p>
            <p style={{ color: '#cbd5e1', fontWeight: '500', fontSize: '10px', margin: 0 }}>Tháng 12, 2023</p>
          </div>
        </div>

        <div style={cardStyle}>
          <Globe style={{ width: '16px', height: '16px', color: '#818cf8', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#64748b', fontWeight: '600', margin: 0 }}>Trang cá nhân</p>
            <a href="#" style={{ color: '#818cf8', textDecoration: 'underline', fontWeight: '500', fontSize: '10px', margin: 0 }}>ducminh.dev</a>
          </div>
        </div>
      </div>

      {/* Thẻ kỹ năng */}
      <div style={{ paddingTop: '8px' }}>
        <h4 style={{ fontWeight: '700', color: '#e2e8f0', marginBottom: '8px', fontSize: '11px', margin: 0 }}>Kỹ năng cốt lõi</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map(skill => (
            <span 
              key={skill} 
              style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', fontSize: '9px', fontFamily: 'monospace' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 4: STATS TAB CONTENT (Tab Chỉ số)
   ========================================================================= */
function StatsTab() {
  const stats = [
    { title: "Dự án hoàn thành", value: "35+", desc: "SaaS, Landing Pages", color: "#818cf8" },
    { title: "Tỷ lệ đúng hạn", value: "98%", desc: "Bàn giao đúng tiến độ", color: "#34d399" },
    { title: "Số giờ coding", value: "2,500h+", desc: "Ghi nhận trên Github", color: "#fbbf24" },
    { title: "Mức độ hài lòng", value: "95%", desc: "Từ đối tác và khách hàng", color: "#f87171" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid #1e293b', paddingBottom: '8px', margin: 0 }}>Chỉ số hoạt động</h3>
      
      {/* Lưới các khối chỉ số */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginTop: '8px' }}>
        {stats.map(stat => (
          <div 
            key={stat.title} 
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.5)', padding: '16px', borderRadius: '24px', border: '1px solid rgba(30, 41, 59, 0.8)', boxSizing: 'border-box' }}
          >
            <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', fontWeight: '600' }}>{stat.title}</span>
            <p style={{ fontSize: '18px', fontWeight: '700', color: stat.color, margin: '4px 0 0 0' }}>{stat.value}</p>
            <p style={{ fontSize: '9px', color: '#64748b', margin: '4px 0 0 0' }}>{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 5: TIMELINE TAB CONTENT (Tab Hoạt động)
   ========================================================================= */
function TimelineTab() {
  const logs = [
    { time: "Cách đây 2 giờ", title: 'Tối ưu hóa UI/UX dự án "E-Commerce"', desc: "Cải thiện tốc độ tải trang lên thêm 25% bằng việc áp dụng kỹ thuật Next.js Server Components.", color: "#6366f1" },
    { time: "Tuần trước", title: "Phát hành bản Technical Blog đầu tiên", desc: "Chia sẻ loạt bài viết hướng dẫn cấu hình Tailwind CSS mượt mà cho các dự án React phức tạp.", color: "#10b981" },
    { time: "Tháng trước", title: "Bàn giao thành công nền tảng Blog cá nhân", desc: "Triển khai hoàn thiện hệ thống lưu trữ ảnh thông minh và đồng bộ hóa tự động dữ liệu.", color: "#f43f5e" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid #1e293b', paddingBottom: '8px', margin: 0 }}>Dòng hoạt động gần nhất</h3>
      
      {/* Dòng thời gian */}
      <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px', marginLeft: '8px' }}>
        {logs.map((log, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-30px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0f172a', border: `2px solid ${log.color}` }}></div>
            <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'monospace' }}>{log.time}</span>
            <p style={{ fontWeight: '600', color: '#e2e8f0', marginTop: '2px', marginBottom: 0, fontSize: '10px' }}>{log.title}</p>
            <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px', marginBottom: 0 }}>{log.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT 6: CONTACT TAB CONTENT (Tab Liên hệ)
   ========================================================================= */
function ContactTab({ onSubmitMessage }) {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) return;
    
    onSubmitMessage();
    setFormData({ name: '', email: '', content: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', borderBottom: '1px solid #1e293b', paddingBottom: '8px', margin: 0 }}>Liên kết & Nhắn tin</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Tên của bạn" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '9999px', padding: '8px 16px', fontSize: '10px', color: '#ffffff', outline: 'none', transition: 'border-color 0.2s ease', boxSizing: 'border-box' }}
          />
          <input 
            type="email" 
            placeholder="Địa chỉ Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '9999px', padding: '8px 16px', fontSize: '10px', color: '#ffffff', outline: 'none', transition: 'border-color 0.2s ease', boxSizing: 'border-box' }}
          />
        </div>
        <textarea 
          placeholder="Nhập nội dung tin nhắn gửi tới Đức..." 
          rows="3"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
          style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', padding: '8px 16px', fontSize: '10px', color: '#ffffff', outline: 'none', transition: 'border-color 0.2s ease', resize: 'none', boxSizing: 'border-box' }}
        ></textarea>
        
        <button 
          type="submit" 
          style={{ width: '100%', backgroundColor: '#4f46e5', border: 'none', color: '#ffffff', fontWeight: '700', padding: '10px', borderRadius: '9999px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'background-color 0.2s ease shadow-sm' }}
        >
          <Send style={{ width: '14px', height: '14px' }} /> Gửi tin nhắn liên hệ
        </button>
      </form>

      {/* Liên kết xã hội */}
      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(30, 41, 59, 0.6)' }}>
        <p style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', marginTop: 0 }}>Hoặc kết nối qua</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="#" style={{ padding: '8px', backgroundColor: '#0f172a', color: '#cbd5e1', borderRadius: '50%', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s ease' }}>
            <Linkedin style={{ width: '16px', height: '16px' }} />
          </a>
          <a href="#" style={{ padding: '8px', backgroundColor: '#0f172a', color: '#cbd5e1', borderRadius: '50%', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s ease' }}>
            <Github style={{ width: '16px', height: '16px' }} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN EXPORT COMPONENT: APP (Điều phối chính)
   ========================================================================= */
export default function abcd() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab-intro');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Quản lý Toast
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Responsive logic sử dụng resize event thay vì Tailwind CSS breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lắng nghe phím tắt 'Esc'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    triggerToast(!isFollowing ? 'Đã lưu Minh Đức vào danh sách theo dõi!' : 'Đã hủy theo dõi thành công.');
  };

  const handleSendMessage = () => {
    triggerToast('Đã gửi tin nhắn liên hệ của bạn tới Đức thành công!');
  };

  // Kiểu dáng inline cho các khu vực giao diện chính

  const overlayBg1 = {
    position: 'absolute',
    width: '384px',
    height: '384px',
    borderRadius: '50%',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    top: '-48px',
    left: '-48px',
    filter: 'blur(64px)',
    pointerEvents: 'none'
  };

  const openButtonStyle = {
    position: 'relative',
    padding: '14px 28px',
    borderRadius: '9999px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
    color: '#ffffff',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(2, 6, 23, 0.85)',
    backdropFilter: 'blur(8px)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
  };

  const modalBoxStyle = {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '672px',
    height: '600px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    position: 'relative',
    boxSizing: 'border-box',
    animation: 'modalOpen 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const modalContentStyle = {
    flexGrow: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: isMobile ? 'calc(100% - 80px)' : '100%',
    position: 'relative',
    background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
    boxSizing: 'border-box'
  };

  const scrollContainerStyle = {
    overflowY: 'auto',
    flexGrow: 1,
    paddingRight: '6px',
    fontSize: '11px',
    color: '#cbd5e1'
  };

  const modalFooterStyle = {
    paddingTop: '16px',
    marginTop: '16px',
    borderTop: '1px solid #1e293b',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    flexShrink: 0
  };

  return (
    <>
        <button 
            onClick={() => setIsOpen(true)}
            style={openButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 20px -3px rgba(79, 70, 229, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 70, 229, 0.3)';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Khám phá hồ sơ cá nhân
              <ArrowUpRight style={{ width: '16px', height: '16px' }} />
            </span>
          </button>
                  {/* Modal */}
      {isOpen && (
        <div style={modalOverlayStyle}>
          
          <div style={modalBoxStyle}>
            
            {/* Cột trái */}
            <ProfileSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={isMobile}
            />

            {/* Cột phải */}
            <div style={modalContentStyle}>
              
              {/* Nút đóng */}
              <button 
                onClick={() => setIsOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>

              {/* Vùng hiển thị các Tab */}
              <div style={scrollContainerStyle}>
                {activeTab === 'tab-intro' && <IntroTab />}
                {activeTab === 'tab-stats' && <StatsTab />}
                {activeTab === 'tab-timeline' && <TimelineTab />}
                {activeTab === 'tab-contact' && <ContactTab onSubmitMessage={handleSendMessage} />}
              </div>

              {/* Chân Modal */}
              <div style={modalFooterStyle}>
                <button 
                  onClick={toggleFollow}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid #1e293b',
                    backgroundColor: isFollowing ? '#1e293b' : 'transparent',
                    color: '#cbd5e1'
                  }}
                  onMouseEnter={(e) => {
                    if(!isFollowing) e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    if(!isFollowing) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                >
                  Đóng hồ sơ
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Toast */}
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* Keyframe animation style injected directly for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalOpen {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
      )   }
