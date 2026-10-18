import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flame,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Volume2,
  Sparkles,
  Users,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { QuizQuestion, UserProfile } from '../types';
import { sounds } from '../utils/audio';
import { toggleNativeFullscreen, exitNativeFullscreen } from '../utils/fullscreen';

interface QuizGameProps {
  questions: QuizQuestion[];
  onScoreUpdate: (points: number) => void;
  currentScore: number;
  playerName: string;
  onAwardTeamScore?: (points: number) => void;
  currentUser?: UserProfile;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  questions,
  onScoreUpdate,
  currentScore,
  playerName,
  onAwardTeamScore,
  currentUser
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(35);
  const [timerActive, setTimerActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        exitNativeFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);
    if (next) {
      toggleNativeFullscreen();
    } else {
      exitNativeFullscreen();
    }
    sounds.playClick();
  };

  const currentQ = questions[currentIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    if (!timerActive || isAnswered) return;

    if (timeLeft <= 0) {
      // Time up
      handleOptionSelect(-1); // timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, isAnswered]);

  // Reset timer on question change
  useEffect(() => {
    const existing = answeredMap[currentIndex];
    if (existing) {
      setSelectedOption(existing.selected);
      setIsAnswered(true);
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(35);
    }
  }, [currentIndex, answeredMap]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;

    const isCorrect = optionIndex === currentQ.correctIndex;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    setAnsweredMap(prev => ({
      ...prev,
      [currentIndex]: { selected: optionIndex, isCorrect }
    }));

    if (isCorrect) {
      sounds.playCorrect();
      const bonusStreak = streak >= 2 ? 5 : 0;
      const points = 20 + bonusStreak;
      onScoreUpdate(points);
      setStreak(prev => prev + 1);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    } else {
      sounds.playWrong();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      sounds.playClick();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      sounds.playClick();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnsweredMap({});
    setStreak(0);
    setTimeLeft(35);
    sounds.playClick();
  };

  const totalAnswered = Object.keys(answeredMap).length;
  const totalCorrect = Object.values(answeredMap).filter(a => a.isCorrect).length;

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-7 overflow-y-auto flex flex-col space-y-5 animate-fade-in' : 'space-y-6'}>
      {/* Quiz Top Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/40">
                PHẦN 2 {isFullscreen && '• TOÀN MÀN HÌNH MÁY CHIẾU'}
              </span>
              <span className="text-xs text-slate-400">Trang 57 - 58 & 62 SGK Tin học 10 Kết nối tri thức</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-blue-400" />
              Trắc Nghiệm: Một Số Quy Định Pháp Lý Đối Với Người Dùng Trên Mạng
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Hệ thống 20 câu hỏi bám sát Luật CNTT (2006), Luật An ninh mạng (2018), Nghị định 15/2020/NĐ-CP, Nghị định 90/2008/NĐ-CP và Quyết định 874/QĐ-BTTTT.
            </p>
          </div>

          {/* Stats Bar & Fullscreen Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-md ${
                isFullscreen
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
              }`}
              title={isFullscreen ? 'Thu nhỏ màn hình (Esc)' : 'Mở toàn màn hình để chiếu máy chiếu lớp học'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Thu nhỏ (Esc)</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>Toàn màn hình</span>
                </>
              )}
            </button>

            {/* Streak Multiplier */}
            {streak > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-300 text-xs font-bold animate-bounce">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>Streak {streak}x (+5đ thưởng)</span>
              </div>
            )}

            {/* Timer Badge */}
            <div
              onClick={() => setTimerActive(!timerActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition ${
                timerActive
                  ? timeLeft <= 10
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/80 animate-pulse'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700'
              }`}
              title="Nhấp để Tạm dừng/Bật đếm giờ"
            >
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{timerActive ? `${timeLeft}s` : 'Đã tạm dừng'}</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm lại
            </button>
          </div>
        </div>

        {/* Question Selector Grid (1 to 20) */}
        <div className="mt-4 pt-3 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Chọn nhanh câu hỏi (1 - {questions.length}):</span>
            <span className="font-semibold text-emerald-400">
              Đúng {totalCorrect} / {totalAnswered} câu đã làm
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, idx) => {
              const status = answeredMap[idx];
              const isCurrent = idx === currentIndex;
              let bg = 'bg-slate-800 text-slate-300 border-slate-700';

              if (status) {
                bg = status.isCorrect
                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                  : 'bg-rose-600 text-white border-rose-500 font-bold';
              } else if (isCurrent) {
                bg = 'bg-indigo-600 text-white border-indigo-400 font-bold ring-2 ring-indigo-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    sounds.playClick();
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs flex items-center justify-center border transition ${bg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className={`bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl ${isFullscreen ? 'p-6 sm:p-9 flex-1' : 'p-5 sm:p-7'}`}>
        {/* Question Meta Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-600 text-white">
              CÂU {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Độ khó: <span className="text-indigo-300 capitalize">{currentQ.difficulty || 'Trung bình'}</span>
            </span>
          </div>

          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            +20 điểm khi trả lời đúng
          </span>
        </div>

        {/* Question Text */}
        <h3 className={`font-bold text-slate-100 leading-relaxed mb-6 ${isFullscreen ? 'text-lg sm:text-xl md:text-2xl font-black' : 'text-base sm:text-lg'}`}>
          {currentQ.question}
        </h3>

        {/* 4 Multiple Choice Options */}
        <div className={`space-y-3 ${isFullscreen ? 'sm:space-y-4' : ''}`}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let cardStyle = isFullscreen
              ? 'p-4 sm:p-5 rounded-2xl border transition-all text-left w-full flex items-start gap-4 text-sm sm:text-base md:text-lg font-semibold '
              : 'p-4 rounded-xl border transition-all text-left w-full flex items-start gap-3 text-xs sm:text-sm font-medium ';

            if (isAnswered) {
              if (isCorrect) {
                cardStyle += 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-900/30';
              } else if (isSelected) {
                cardStyle += 'bg-rose-950/80 border-rose-500 text-rose-100';
              } else {
                cardStyle += 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60';
              }
            } else {
              cardStyle += 'bg-slate-900/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/80 text-slate-200 cursor-pointer';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={cardStyle}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                      : 'bg-slate-800 text-slate-300 group-hover:bg-blue-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>

                {isAnswered && (
                  <span className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Legal Reference & Pedagogical Explanation */}
        {isAnswered && (
          <div className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-indigo-950/70 rounded-xl border border-blue-500/40 shadow-inner animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-300">
              <BookOpen className="w-4 h-4 text-blue-400" />
              CĂN CỨ PHÁP LÝ & GIẢI THÍCH CHI TIẾT THEO SGK
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
              {currentQ.explanation}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
              <span className="font-semibold text-amber-300">
                Trích dẫn pháp lý: <span className="text-slate-300 font-normal">{currentQ.referenceLaw}</span>
              </span>

              {/* Quick award points to Team button for teacher only */}
              {onAwardTeamScore && currentUser?.role === 'teacher' && (
                <button
                  onClick={() => {
                    onAwardTeamScore(20);
                    sounds.playFanfare();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-200 rounded-lg border border-indigo-400/50 font-bold transition"
                >
                  <Users className="w-3.5 h-3.5" />
                  +20đ cho Đội phát biểu
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-semibold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Câu trước
          </button>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Học sinh / Đội đang trả lời: <strong className="text-white">{playerName}</strong>
          </span>

          <button
            onClick={handleNextQuestion}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition"
          >
            Câu tiếp theo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
