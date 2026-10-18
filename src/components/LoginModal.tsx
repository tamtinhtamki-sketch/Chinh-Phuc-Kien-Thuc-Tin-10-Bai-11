import React, { useState } from 'react';
import {
  User,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { sounds } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLogin: (profile: UserProfile) => void;
  currentUser: UserProfile;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  currentUser
}) => {
  const [role, setRole] = useState<'student_indiv' | 'student_group' | 'teacher'>(
    currentUser.role === 'teacher'
      ? 'teacher'
      : currentUser.type === 'group'
      ? 'student_group'
      : 'student_indiv'
  );

  const [name, setName] = useState(currentUser.name || '');
  const [className, setClassName] = useState(currentUser.className || '10A1');
  const [teacherPin, setTeacherPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (role === 'teacher') {
      if (teacherPin !== '1234' && teacherPin !== '10A' && teacherPin !== 'admin') {
        setErrorMessage('Mã PIN giáo viên chưa đúng! (Mã mặc định là: 1234)');
        sounds.playWrong();
        return;
      }

      onLogin({
        name: name.trim() || 'Giáo viên Tin học',
        className: 'Bộ môn Tin học',
        type: 'individual',
        role: 'teacher',
        isLoggedIn: true
      });
      sounds.playCorrect();
      if (onClose) onClose();
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Vui lòng nhập Họ và tên (hoặc Tên tổ/nhóm)!');
      sounds.playWrong();
      return;
    }

    if (!className.trim()) {
      setErrorMessage('Vui lòng nhập Lớp của bạn (vd: 10A1)!');
      sounds.playWrong();
      return;
    }

    onLogin({
      name: name.trim(),
      className: className.trim().toUpperCase(),
      type: role === 'student_group' ? 'group' : 'individual',
      role: 'student',
      isLoggedIn: true
    });
    sounds.playCorrect();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-fade-in">
        {onClose && currentUser.isLoggedIn && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white text-base font-bold"
          >
            ✕
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-3">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-white">
            Đăng Nhập Tham Gia Trò Chơi Bài 11
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Hệ thống tự động lưu trữ và tổng kết điểm số của tài khoản vào Bảng vàng xếp hạng.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500 rounded-xl text-xs text-rose-200 flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setRole('student_indiv');
              setErrorMessage(null);
              sounds.playClick();
            }}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              role === 'student_indiv'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Học sinh</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('student_group');
              setErrorMessage(null);
              sounds.playClick();
            }}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              role === 'student_group'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Theo Tổ/Nhóm</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('teacher');
              setErrorMessage(null);
              sounds.playClick();
            }}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              role === 'teacher'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Giáo viên</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Individual Student Inputs */}
          {role === 'student_indiv' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Họ và tên học sinh:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Lớp:
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  placeholder="Ví dụ: 10A1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 uppercase font-semibold"
                  required
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                🔒 <strong>Quy chế thi độc lập:</strong> Khi học sinh đăng nhập, hệ thống sẽ tự động <em>khóa các chức năng xem đáp án, xem gợi ý và tự cộng điểm</em> để đảm bảo công bằng.
              </div>
            </>
          )}

          {/* Group Inputs */}
          {role === 'student_group' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Tên Tổ / Đội thi:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ví dụ: Tổ 1 - Đoàn Kết"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Lớp:
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  placeholder="Ví dụ: 10A2"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 uppercase font-semibold"
                  required
                />
              </div>

              {/* Quick Preset Buttons for 4 Groups */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">
                  Chọn nhanh tên tổ:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Tổ 1: Đoàn Kết',
                    'Tổ 2: Tiên Phong',
                    'Tổ 3: Sáng Tạo',
                    'Tổ 4: Vững Bước'
                  ].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setName(t)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 text-left truncate"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                🔒 <strong>Chế độ thi theo tổ:</strong> Điểm số đạt được qua 3 phần chơi sẽ được cộng dồn trực tiếp cho tổ vào bảng xếp hạng chung của lớp.
              </div>
            </>
          )}

          {/* Teacher Admin Inputs */}
          {role === 'teacher' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Tên Thầy / Cô:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ví dụ: Thầy Minh (Tin học)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                  <span>Mã PIN Giáo viên (Bảo mật):</span>
                  <button
                    type="button"
                    onClick={() => setTeacherPin('1234')}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Gợi ý PIN: 1234
                  </button>
                </label>
                <input
                  type="password"
                  value={teacherPin}
                  onChange={e => setTeacherPin(e.target.value)}
                  placeholder="Nhập mã PIN (Mặc định: 1234)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500 font-mono tracking-widest text-center text-sm"
                  required
                />
              </div>

              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/40 text-[11px] text-amber-300 leading-relaxed">
                👑 <strong>Quyền Giáo viên (Admin):</strong> Được phép xem đáp án, mở gợi ý, cộng/trừ điểm thủ công cho các tổ, chỉnh sửa đề thi và xoá bảng điểm.
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Vào Làm Bài / Bắt Đầu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
