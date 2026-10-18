import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Dice5,
  Sparkles,
  Users,
  User,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SAMPLE_STUDENT_NAMES } from '../data/defaultData';
import { sounds } from '../utils/audio';

const STORAGE_KEY_STUDENTS = 'tin10_bai11_student_roster';
const STORAGE_KEY_GROUPS = 'tin10_bai11_group_roster';

interface RandomPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (name: string) => void;
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent
}) => {
  const [students, setStudents] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_STUDENT_NAMES;
  });

  const [groups, setGroups] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GROUPS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      'Tổ 1 (Đoàn Kết)',
      'Tổ 2 (Tiên Phong)',
      'Tổ 3 (Sáng Tạo)',
      'Tổ 4 (Vững Bước)'
    ];
  });

  const [pickerType, setPickerType] = useState<'student' | 'group'>('student');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSelected, setCurrentSelected] = useState<string>('Bấm "QUAY TÊN" để chọn');
  const [newStudentName, setNewStudentName] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(groups));
    } catch {
      // ignore
    }
  }, [groups]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSpin = () => {
    if (isSpinning) return;

    const list = pickerType === 'student' ? students : groups;
    if (list.length === 0) {
      showToast('Danh sách đang trống! Vui lòng thêm học sinh trước.');
      return;
    }

    setIsSpinning(true);
    let counter = 0;
    const totalSpins = 28;
    const intervalTime = 65;

    const interval = setInterval(() => {
      counter++;
      const randomItem = list[Math.floor(Math.random() * list.length)];
      setCurrentSelected(randomItem);
      sounds.playSpinTick();

      if (counter >= totalSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        sounds.playFanfare();
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.55 }
        });
      }
    }, intervalTime);
  };

  // Add a single student
  const handleAddStudent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newStudentName.trim();
    if (!trimmed) return;

    if (pickerType === 'student') {
      if (students.includes(trimmed)) {
        showToast(`Học sinh "${trimmed}" đã có trong danh sách!`);
        return;
      }
      setStudents(prev => [...prev, trimmed]);
      showToast(`Đã thêm học sinh: ${trimmed}`);
    } else {
      if (groups.includes(trimmed)) {
        showToast(`Tổ/Đội "${trimmed}" đã có trong danh sách!`);
        return;
      }
      setGroups(prev => [...prev, trimmed]);
      showToast(`Đã thêm tổ/nhóm: ${trimmed}`);
    }

    setNewStudentName('');
    sounds.playCorrect();
  };

  // Bulk add students by lines
  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;

    const lines = bulkText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (lines.length === 0) return;

    if (pickerType === 'student') {
      const merged = Array.from(new Set([...students, ...lines]));
      setStudents(merged);
      showToast(`Đã nạp thành công ${lines.length} học sinh vào danh sách!`);
    } else {
      const merged = Array.from(new Set([...groups, ...lines]));
      setGroups(merged);
      showToast(`Đã nạp thành công ${lines.length} tổ/nhóm vào danh sách!`);
    }

    setBulkText('');
    setShowBulkAdd(false);
    sounds.playCorrect();
  };

  const handleRemoveItem = (idx: number) => {
    if (pickerType === 'student') {
      setStudents(prev => prev.filter((_, i) => i !== idx));
    } else {
      setGroups(prev => prev.filter((_, i) => i !== idx));
    }
    sounds.playClick();
  };

  const handleResetDefault = () => {
    if (pickerType === 'student') {
      setStudents(SAMPLE_STUDENT_NAMES);
      showToast('Đã khôi phục 16 học sinh mẫu của lớp 10!');
    } else {
      setGroups([
        'Tổ 1 (Đoàn Kết)',
        'Tổ 2 (Tiên Phong)',
        'Tổ 3 (Sáng Tạo)',
        'Tổ 4 (Vững Bước)'
      ]);
      showToast('Đã khôi phục 4 tổ mặc định!');
    }
    sounds.playClick();
  };

  const handleConfirmAndPlay = () => {
    if (currentSelected && currentSelected !== 'Bấm "QUAY TÊN" để chọn') {
      onSelectStudent(currentSelected);
      onClose();
      sounds.playClick();
    }
  };

  const currentList = pickerType === 'student' ? students : groups;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden relative animate-fade-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Dice5 className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Vòng Quay Gọi Tên Ngẫu Nhiên
              </h3>
              <p className="text-xs text-slate-400">
                Lựa chọn học sinh hoặc nhóm trả lời câu hỏi bài học (Dữ liệu lưu tự động)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="py-4 space-y-5 overflow-y-auto pr-1">
          {/* Toast Notification */}
          {feedback && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center gap-2 font-bold animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Mode Switcher: Student vs Group */}
          <div className="flex justify-center">
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex text-xs">
              <button
                onClick={() => {
                  setPickerType('student');
                  setCurrentSelected('Bấm "QUAY TÊN" để chọn');
                  sounds.playClick();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition ${
                  pickerType === 'student'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                Học sinh cá nhân ({students.length})
              </button>
              <button
                onClick={() => {
                  setPickerType('group');
                  setCurrentSelected('Bấm "QUAY TÊN" để chọn');
                  sounds.playClick();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition ${
                  pickerType === 'group'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                Đội / Tổ ({groups.length})
              </button>
            </div>
          </div>

          {/* Lucky Box Display */}
          <div className="bg-gradient-to-br from-slate-950 to-amber-950/40 p-6 rounded-3xl border-2 border-amber-500/60 shadow-inner text-center relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest font-extrabold text-amber-400 mb-2">
              KẾT QUẢ ĐƯỢC CHỌN LÊN BẢNG / TRẢ LỜI:
            </div>

            <div
              className={`text-2xl sm:text-3xl font-extrabold text-white tracking-wide min-h-[48px] flex items-center justify-center ${
                isSpinning ? 'animate-pulse text-amber-300 scale-105' : ''
              }`}
            >
              {currentSelected}
            </div>

            {/* Spin Button */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                disabled={isSpinning}
                onClick={handleSpin}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 text-sm font-extrabold rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 transform active:scale-95 transition"
              >
                <Dice5 className="w-5 h-5" />
                {isSpinning ? 'ĐANG QUAY SỐ...' : '🎲 QUAY NGAY'}
              </button>

              {currentSelected !== 'Bấm "QUAY TÊN" để chọn' && !isSpinning && (
                <button
                  onClick={handleConfirmAndPlay}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl transition shadow-lg"
                >
                  Chọn người này vào bàn chơi
                </button>
              )}
            </div>
          </div>

          {/* Add Student Section */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>
                Thêm {pickerType === 'student' ? 'học sinh' : 'tổ/nhóm'} ({currentList.length} hiện có):
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkAdd(!showBulkAdd)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {showBulkAdd ? 'Nhập từng người' : 'Dán cả lớp'}
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-slate-400 hover:text-amber-400 flex items-center gap-1 font-normal ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Mặc định
                </button>
              </div>
            </div>

            {/* Bulk Textarea Form */}
            {showBulkAdd ? (
              <div className="space-y-2">
                <textarea
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  placeholder={`Dán danh sách ${pickerType === 'student' ? 'học sinh' : 'tổ/nhóm'} vào đây (mỗi tên trên 1 dòng):
Nguyễn Văn An
Trần Thị Bình
Lê Hoàng Nam...`}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 min-h-[90px]"
                />
                <button
                  type="button"
                  onClick={handleBulkAdd}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Nạp toàn bộ vào danh sách
                </button>
              </div>
            ) : (
              /* Single Input Form */
              <form onSubmit={handleAddStudent} className="flex gap-2">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  placeholder={
                    pickerType === 'student'
                      ? 'Nhập họ và tên học sinh mới...'
                      : 'Nhập tên tổ/nhóm mới (vd: Tổ 5)...'
                  }
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1 transition shadow"
                >
                  <Plus className="w-4 h-4" />
                  Thêm ngay
                </button>
              </form>
            )}

            {/* Chips of Current Roster */}
            <div className="max-h-32 overflow-y-auto flex flex-wrap gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
              {currentList.map((name, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>{name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(i)}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                    title="Xóa khỏi danh sách"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
