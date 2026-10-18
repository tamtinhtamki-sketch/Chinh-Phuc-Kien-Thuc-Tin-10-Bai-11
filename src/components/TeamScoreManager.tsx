import React, { useState } from 'react';
import { Users, Plus, Minus, Trophy, RotateCcw, Lock } from 'lucide-react';
import { Team } from '../types';
import { sounds } from '../utils/audio';

interface TeamScoreManagerProps {
  teams: Team[];
  onUpdateTeamScore: (teamId: string, delta: number) => void;
  onResetTeamScores: () => void;
  activeTeamId: string;
  onSelectActiveTeam: (teamId: string) => void;
  isTeacher: boolean;
}

export const TeamScoreManager: React.FC<TeamScoreManagerProps> = ({
  teams,
  onUpdateTeamScore,
  onResetTeamScores,
  activeTeamId,
  onSelectActiveTeam,
  isTeacher
}) => {
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>BẢNG ĐIỂM THI ĐUA 4 TỔ (LỚP HỌC)</span>
          {!isTeacher && (
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-normal flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              Chế độ chỉ xem
            </span>
          )}
        </div>

        {isTeacher && (
          isConfirmingReset ? (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-rose-300 font-bold">Về 0?</span>
              <button
                onClick={() => {
                  onResetTeamScores();
                  setIsConfirmingReset(false);
                  sounds.playClick();
                }}
                className="px-1.5 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold"
              >
                Đồng ý
              </button>
              <button
                onClick={() => setIsConfirmingReset(false)}
                className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]"
              >
                Huỷ
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsConfirmingReset(true)}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset điểm tổ
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {teams.map(team => {
          const isActive = team.id === activeTeamId;
          return (
            <div
              key={team.id}
              style={{
                borderColor: isActive ? team.color : undefined
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-slate-800 ring-2 ring-indigo-500/50 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                onClick={() => {
                  onSelectActiveTeam(team.id);
                  sounds.playClick();
                }}
                className="cursor-pointer flex items-center justify-between mb-1"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="text-xs font-bold text-white truncate">
                    {team.name}
                  </span>
                </div>
                {isActive && (
                  <span className="text-[9px] px-1 bg-indigo-950 text-indigo-300 rounded font-semibold border border-indigo-800">
                    Chọn
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <span className="text-lg font-extrabold text-amber-400">
                  {team.score}đ
                </span>
                <span className="text-[10px] text-slate-400">Điểm tổ</span>
              </div>

              {/* Fast points adjustment buttons - ONLY for Teacher */}
              {isTeacher ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onUpdateTeamScore(team.id, 10);
                      sounds.playCorrect();
                    }}
                    className="flex-1 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-500/40 transition"
                    title="Cộng 10 điểm"
                  >
                    +10đ
                  </button>
                  <button
                    onClick={() => {
                      onUpdateTeamScore(team.id, 20);
                      sounds.playCorrect();
                    }}
                    className="flex-1 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-[10px] font-bold border border-indigo-500/40 transition"
                    title="Cộng 20 điểm"
                  >
                    +20đ
                  </button>
                  <button
                    onClick={() => {
                      onUpdateTeamScore(team.id, -5);
                      sounds.playWrong();
                    }}
                    className="p-1 bg-rose-950/40 hover:bg-rose-900 text-rose-400 rounded-lg text-[10px] border border-rose-800/40 transition"
                    title="Trừ 5 điểm"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 text-center py-0.5 bg-slate-900/60 rounded border border-slate-800/80">
                  Thi đua trực tiếp
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
