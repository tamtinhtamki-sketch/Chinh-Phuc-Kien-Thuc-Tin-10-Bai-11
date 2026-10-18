import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Users,
  User,
  Download,
  Trash2,
  Plus,
  RotateCcw,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { PlayerScore, UserProfile } from '../types';
import { downloadJsonFile } from '../utils/dataExport';
import { sounds } from '../utils/audio';

interface LeaderboardModalProps {
  scores: PlayerScore[];
  onClearScores: () => void;
  onAddManualScore: (name: string, className: string, type: 'individual' | 'group', points: number) => void;
  currentUser: UserProfile;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  scores,
  onClearScores,
  onAddManualScore,
  currentUser
}) => {
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'group'>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [manualName, setManualName] = useState('');
  const [manualClass, setManualClass] = useState('10A1');
  const [manualPoints, setManualPoints] = useState(20);
  const [manualType, setManualType] = useState<'individual' | 'group'>('group');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const isTeacher = currentUser.role === 'teacher';

  // Get unique classes
  const classesList = Array.from(
    new Set(scores.map(s => s.className).filter(Boolean))
  ) as string[];

  const filteredScores = scores
    .filter(s => filterType === 'all' || s.type === filterType)
    .filter(s => classFilter === 'all' || s.className === classFilter)
    .sort((a, b) => b.totalScore - a.totalScore);

  const handleExportJson = () => {
    downloadJsonFile('bang_xep_hang_tin10_bai11.json', scores);
    sounds.playClick();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;
    onAddManualScore(manualName.trim(), manualClass.trim().toUpperCase(), manualType, Number(manualPoints));
    setManualName('');
    setShowAddForm(false);
    sounds.playCorrect();
    setFeedbackNotice(`Đã cộng ${manualPoints}đ cho ${manualName}!`);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  const handleExecuteClear = () => {
    onClearScores();
    setIsConfirmingClear(false);
    sounds.playClick();
    setFeedbackNotice('Đã xoá sạch toàn bộ dữ liệu bảng điểm thành công!');
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-amber-950 p-5 rounded-2xl border border-amber-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/40">
                BẢNG VÀNG DANH DỰ
              </span>
              <span className="text-xs text-slate-400">
                Tổng hợp điểm số cá nhân và các tổ lớp 10 (Lưu trữ tự động SQLite)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              Bảng Xếp Hạng Kết Quả Học Tập Bài 11
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Ghi nhận điểm số của từng học sinh hoặc tổ qua 3 phần: Giải mật mã ô chữ, Trắc nghiệm pháp lý và Ghép thẻ bản quyền.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {isTeacher && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                Cộng điểm thủ công
              </button>
            )}

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition"
            >
              <Download className="w-4 h-4" />
              Xuất JSON
            </button>

            {/* Clear leaderboard button with in-UI confirmation (no window.confirm) */}
            {isTeacher ? (
              isConfirmingClear ? (
                <div className="flex items-center gap-1.5 p-1 bg-rose-950 border border-rose-500 rounded-xl animate-bounce">
                  <span className="text-xs text-rose-300 font-bold px-1.5">Xác nhận xoá?</span>
                  <button
                    onClick={handleExecuteClear}
                    className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold"
                  >
                    Xoá ngay
                  </button>
                  <button
                    onClick={() => setIsConfirmingClear(false)}
                    className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs"
                  >
                    Huỷ
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsConfirmingClear(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-bold transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Xoá bảng điểm
                </button>
              )
            ) : (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Xoá bảng điểm (Chỉ GV)
              </span>
            )}
          </div>
        </div>

        {feedbackNotice && (
          <div className="mt-3 p-3 bg-emerald-950/90 border border-emerald-500 rounded-xl text-xs text-emerald-200 font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{feedbackNotice}</span>
          </div>
        )}
      </div>

      {/* Manual Point Award Form (Teacher only) */}
      {showAddForm && isTeacher && (
        <form
          onSubmit={handleAddSubmit}
          className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-indigo-500/40 shadow-xl flex flex-wrap items-center gap-3 animate-fade-in"
        >
          <span className="text-xs font-bold text-indigo-300">Cộng điểm phát biểu trên lớp:</span>

          <select
            value={manualType}
            onChange={e => setManualType(e.target.value as 'individual' | 'group')}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2"
          >
            <option value="group">Thi đua Tổ/Nhóm</option>
            <option value="individual">Học sinh Cá nhân</option>
          </select>

          <input
            type="text"
            value={manualName}
            onChange={e => setManualName(e.target.value)}
            placeholder={manualType === 'group' ? 'Tên Tổ (vd: Tổ 1)...' : 'Tên học sinh...'}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 flex-1 min-w-[150px]"
            required
          />

          <input
            type="text"
            value={manualClass}
            onChange={e => setManualClass(e.target.value)}
            placeholder="Lớp (vd: 10A1)..."
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 w-24 uppercase"
            required
          />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Điểm:</span>
            <input
              type="number"
              value={manualPoints}
              onChange={e => setManualPoints(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 text-xs text-amber-400 font-bold rounded-xl px-3 py-2 w-20 text-center"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            Lưu điểm
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Đóng
          </button>
        </form>
      )}

      {/* Filter Tabs & Class selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Type filter */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => {
                setFilterType('all');
                sounds.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterType === 'all' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả ({scores.length})
            </button>
            <button
              onClick={() => {
                setFilterType('individual');
                sounds.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterType === 'individual' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Học sinh cá nhân
            </button>
            <button
              onClick={() => {
                setFilterType('group');
                sounds.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterType === 'group' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tổ / Nhóm
            </button>
          </div>

          {/* Class Filter if multiple classes exist */}
          {classesList.length > 0 && (
            <select
              value={classFilter}
              onChange={e => setClassFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 font-bold"
            >
              <option value="all">Tất cả các lớp</option>
              {classesList.map(c => (
                <option key={c} value={c}>
                  Lớp {c}
                </option>
              ))}
            </select>
          )}
        </div>

        <span className="text-xs text-slate-400">
          Hiển thị: <strong className="text-white">{filteredScores.length}</strong> kết quả
        </span>
      </div>

      {/* Ranking Table */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-700 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-4 w-14 text-center">Hạng</th>
                <th className="py-3.5 px-4">Tên Học Sinh / Tổ</th>
                <th className="py-3.5 px-3 text-center">Lớp</th>
                <th className="py-3.5 px-3 text-center">Hình thức</th>
                <th className="py-3.5 px-3 text-center">P1: Mật mã</th>
                <th className="py-3.5 px-3 text-center">P2: Trắc nghiệm</th>
                <th className="py-3.5 px-3 text-center">P3: Ghép thẻ</th>
                <th className="py-3.5 px-4 text-right">Tổng điểm</th>
                <th className="py-3.5 px-4 text-center">Ngày thi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 font-medium">
              {filteredScores.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-slate-500 text-xs italic">
                    Chưa có điểm nào được lưu. Hãy tham gia chơi ở các Phần 1, 2, 3 để vinh danh trên bảng vàng!
                  </td>
                </tr>
              ) : (
                filteredScores.map((item, idx) => {
                  let medalBadge = <span className="font-bold text-slate-400">{idx + 1}</span>;
                  let rowBg = idx % 2 === 0 ? 'bg-slate-800/40' : 'bg-slate-800/80';

                  if (idx === 0) {
                    medalBadge = <span className="text-lg">🥇</span>;
                    rowBg = 'bg-amber-950/20';
                  } else if (idx === 1) {
                    medalBadge = <span className="text-lg">🥈</span>;
                  } else if (idx === 2) {
                    medalBadge = <span className="text-lg">🥉</span>;
                  }

                  return (
                    <tr key={item.id} className={`${rowBg} hover:bg-slate-700/50 transition`}>
                      <td className="py-3.5 px-4 text-center font-bold">{medalBadge}</td>
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        {item.type === 'group' ? (
                          <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                        ) : (
                          <User className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span>{item.name}</span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60 text-xs">
                          {item.className || '10A1'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.type === 'group'
                              ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {item.type === 'group' ? 'Tổ / Nhóm' : 'Cá nhân'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center text-emerald-400 font-semibold">
                        {item.part1Score}đ
                      </td>
                      <td className="py-3.5 px-3 text-center text-blue-400 font-semibold">
                        {item.part2Score}đ
                      </td>
                      <td className="py-3.5 px-3 text-center text-purple-400 font-semibold">
                        {item.part3Score}đ
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-base font-extrabold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-600/40">
                          {item.totalScore}đ
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-400 text-xs">
                        {item.date}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
