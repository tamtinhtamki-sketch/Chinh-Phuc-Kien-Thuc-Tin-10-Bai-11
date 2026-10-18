import React from 'react';
import {
  Compass,
  FileCheck2,
  Layers,
  Award,
  Dice5,
  BookOpen,
  Code2,
  Volume2,
  VolumeX,
  Users,
  User,
  Settings,
  BookText,
  Lock,
  ShieldCheck,
  GraduationCap,
  LogIn
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  currentUser: UserProfile;
  onOpenLogin: () => void;
  totalScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  currentUser,
  onOpenLogin,
  totalScore
}) => {
  const isTeacher = currentUser.role === 'teacher';

  const tabs = [
    { id: 'content', label: 'Lý thuyết Bài 11', icon: BookText, badge: 'Toàn bộ bài' },
    { id: 'part1', label: '1. Mật mã Ô chữ', icon: Compass, badge: 'Đạo đức & Văn hoá' },
    { id: 'part2', label: '2. Trắc nghiệm Luật', icon: FileCheck2, badge: '20 câu SGK' },
    { id: 'part3', label: '3. Ghép thẻ Bản quyền', icon: Layers, badge: 'Nhân thân & Tài sản' },
    { id: 'random', label: 'Gọi tên ngẫu nhiên', icon: Dice5, badge: 'Quay số' },
    { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Award, badge: 'Điểm số' },
    { id: 'guide', label: 'Kế hoạch bài dạy', icon: BookOpen, badge: 'Sư phạm' },
    { id: 'python', label: 'Mã Python Pygame', icon: Code2, badge: 'SQLite' },
    {
      id: 'editor',
      label: 'Bộ sửa dữ liệu',
      icon: Settings,
      badge: isTeacher ? 'Quản trị' : 'Khóa 🔒',
      isLocked: !isTeacher
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Bar with Branding & Status */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
            <Compass className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                Tin học 10 KNTT • Bài 11
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 hidden sm:inline">
                Chủ đề 3: Đạo đức, Pháp luật & Bản quyền
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 truncate">
              Ứng Xử Trên Môi Trường Số & Nghĩa Vụ Tôn Trọng Bản Quyền
            </h1>
          </div>
        </div>

        {/* User Account & Score Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* User Profile Badge & Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 px-2.5 text-xs">
            <div className="flex items-center gap-1.5">
              {isTeacher ? (
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              ) : currentUser.type === 'group' ? (
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
              ) : (
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              )}

              <div className="leading-tight">
                <span className="font-bold text-white block max-w-[140px] truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isTeacher
                    ? '👑 Giáo viên (Admin)'
                    : `Lớp ${currentUser.className || '10A1'} • ${
                        currentUser.type === 'group' ? 'Tổ/Nhóm' : 'Học sinh'
                      }`}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenLogin}
              className="ml-1.5 px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1"
              title="Đổi tài khoản đăng nhập"
            >
              <LogIn className="w-3 h-3" />
              Đổi
            </button>
          </div>

          {/* Total Score Badge */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-inner">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-200 font-medium hidden sm:inline">Điểm tích luỹ:</span>
            <span className="text-sm font-black text-amber-400">{totalScore}đ</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              sounds.toggleSound(nextState);
              if (nextState) sounds.playClick();
            }}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-1.5">
        <nav className="flex space-x-1.5 sm:space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  sounds.playClick();
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-indigo-800/90 text-indigo-100'
                      : tab.isLocked
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
