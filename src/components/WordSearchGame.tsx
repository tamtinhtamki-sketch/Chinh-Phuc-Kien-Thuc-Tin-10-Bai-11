import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Info,
  Award,
  BookOpen,
  Lock,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { STATIC_SGK_PUZZLE, SGK_PAGE56_WORDS, generateWordGrid, WordSearchPuzzle, GridWord } from '../data/wordSearchGrid';
import { sounds } from '../utils/audio';
import { toggleNativeFullscreen, exitNativeFullscreen } from '../utils/fullscreen';
import { UserProfile } from '../types';

interface WordSearchGameProps {
  onScoreUpdate: (points: number) => void;
  currentScore: number;
  playerName: string;
  currentUser?: UserProfile;
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  onScoreUpdate,
  currentScore,
  playerName,
  currentUser
}) => {
  const [puzzle, setPuzzle] = useState<WordSearchPuzzle>(STATIC_SGK_PUZZLE);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [activeWordDetail, setActiveWordDetail] = useState<GridWord | null>(null);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'sgk20' | 'compact14'>('sgk20');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

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

  // Initialize or toggle puzzle mode
  useEffect(() => {
    if (gameMode === 'sgk20') {
      setPuzzle(STATIC_SGK_PUZZLE);
    } else {
      // 14x14 with shorter keywords
      const shortWords = [
        { id: 'sw1', word: 'DUATINSAI', vietnamese: 'Đưa tin sai sự thật', clue: 'Đăng và chia sẻ bài viết sai sự thật, tin đồn độc hại.', category: 'phapluat' as const, color: '#ef4444' },
        { id: 'sw2', word: 'CONGBOTTTN', vietnamese: 'Công bố thông tin cá nhân', clue: 'Lộ ảnh, thông tin cá nhân người khác không phép.', category: 'phapluat' as const, color: '#f97316' },
        { id: 'sw3', word: 'TINRAC', vietnamese: 'Thư điện tử, tin nhắn rác', clue: 'Phát tán quảng cáo quấy nhiễu khi người nhận từ chối.', category: 'phapluat' as const, color: '#eab308' },
        { id: 'sw4', word: 'BANQUYEN', vietnamese: 'Vi phạm bản quyền', clue: 'Sử dụng phần mềm lậu, crack mã nguồn của tác giả.', category: 'phapluat' as const, color: '#10b981' },
        { id: 'sw5', word: 'BATNATMANG', vietnamese: 'Bắt nạt qua mạng', clue: 'Bêu xấu, công kích, bạo lực mạng đối với bạn bè.', category: 'daoduc' as const, color: '#06b6d4' },
        { id: 'sw6', word: 'THIEUVANHOA', vietnamese: 'Ứng xử thiếu văn hoá', clue: 'Chửi tục, thóa mạ, công kích sỉ nhục trên diễn đàn.', category: 'vanhoa' as const, color: '#8b5cf6' }
      ];
      setPuzzle(generateWordGrid(14, shortWords));
    }
    setFoundWords([]);
    setSelectedCells([]);
    setShowAllAnswers(false);
    setHintMessage(null);
  }, [gameMode]);

  // Handle cell selection
  const handleCellMouseDown = (r: number, c: number) => {
    setIsSelecting(true);
    setStartCell({ r, c });
    setSelectedCells([{ r, c }]);
    sounds.playClick();
  };

  const handleCellMouseEnter = (r: number, c: number) => {
    if (!isSelecting || !startCell) return;

    // Calculate straight line cells (horizontal, vertical, diagonal)
    const dr = r - startCell.r;
    const dc = c - startCell.c;

    // Only allow straight or 45-degree diagonal lines
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1;
      const stepC = dc === 0 ? 0 : dc > 0 ? 1 : -1;
      const count = Math.max(Math.abs(dr), Math.abs(dc));

      const newCells: { r: number; c: number }[] = [];
      for (let i = 0; i <= count; i++) {
        newCells.push({
          r: startCell.r + i * stepR,
          c: startCell.c + i * stepC
        });
      }
      setSelectedCells(newCells);
    }
  };

  const handleCellMouseUp = () => {
    if (!isSelecting || selectedCells.length === 0) {
      setIsSelecting(false);
      setStartCell(null);
      return;
    }

    // Form selected string (both forward and backward)
    const forwardStr = selectedCells.map(cell => puzzle.grid[cell.r][cell.c]).join('');
    const backwardStr = forwardStr.split('').reverse().join('');

    // Check if matches any unfound word
    const matchedWord = puzzle.words.find(
      w => (!foundWords.includes(w.id)) && (w.word === forwardStr || w.word === backwardStr)
    );

    if (matchedWord) {
      // Success! Found word
      const nextFound = [...foundWords, matchedWord.id];
      setFoundWords(nextFound);
      sounds.playWordFound();
      onScoreUpdate(25);
      setActiveWordDetail(matchedWord);

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (nextFound.length === puzzle.words.length) {
        sounds.playFanfare();
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.5 }
        });
      }
    } else {
      sounds.playWrong();
    }

    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  // Helper: check if a cell is part of an already found word
  const getCellFoundColor = (r: number, c: number): string | null => {
    for (const w of puzzle.words) {
      if (!foundWords.includes(w.id) && !showAllAnswers) continue;

      // Check if (r, c) is on the line segment of this word
      const dx = w.endX - w.startX;
      const dy = w.endY - w.startY;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));
      if (steps === 0) continue;

      const stepX = dx / steps;
      const stepY = dy / steps;

      for (let i = 0; i <= steps; i++) {
        const curX = Math.round(w.startX + i * stepX);
        const curY = Math.round(w.startY + i * stepY);
        if (curX === c && curY === r) {
          return w.color;
        }
      }
    }
    return null;
  };

  // Give a hint for one remaining word
  const handleGiveHint = () => {
    const remaining = puzzle.words.filter(w => !foundWords.includes(w.id));
    if (remaining.length === 0) {
      setHintMessage('Tuyệt vời! Bạn đã tìm ra tất cả các từ khóa rồi!');
      return;
    }
    const target = remaining[0];
    setHintMessage(
      `Gợi ý: Từ "${target.vietnamese}" bắt đầu bằng chữ "${puzzle.grid[target.startY][target.startX]}" tại vị trí Hàng ${target.startY + 1}, Cột ${target.startX + 1}.`
    );
    sounds.playClick();
  };

  // Unlock all words
  const handleToggleReveal = () => {
    setShowAllAnswers(!showAllAnswers);
    sounds.playClick();
  };

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto flex flex-col space-y-4 animate-fade-in' : 'space-y-6'}>
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-950 p-5 rounded-2xl border border-indigo-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/40">
                PHẦN 1 {isFullscreen && '• TOÀN MÀN HÌNH MÁY CHIẾU'}
              </span>
              <span className="text-xs text-slate-400">Ghi nhớ Trang 56 SGK Tin học 10 Kết nối tri thức</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-400" />
              Giải Mật Mã Ô Chữ: Hành Vi Vi Phạm Trên Môi Trường Số
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Nhiệm vụ: Tìm kiếm 6 hành vi vi phạm về đạo đức, pháp luật và văn hoá khi sử dụng mạng ẩn trong ma trận chữ cái (theo hàng ngang, hàng dọc hoặc hàng chéo). Kéo chuột để nối các chữ cái!
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto">
            {/* Fullscreen Toggle Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                isFullscreen
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'
              }`}
              title={isFullscreen ? 'Thu nhỏ lại (Phím Esc)' : 'Hiển thị toàn màn hình để dễ dàng quan sát toàn bộ ô chữ'}
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

            {/* Toggle Mode */}
            <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-700 flex text-xs">
              <button
                onClick={() => setGameMode('sgk20')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  gameMode === 'sgk20' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Chuẩn SGK (20x20)
              </button>
              <button
                onClick={() => setGameMode('compact14')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  gameMode === 'compact14' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Lưới gọn (14x14)
              </button>
            </div>

            {currentUser?.role === 'teacher' ? (
              <>
                <button
                  onClick={handleGiveHint}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold transition"
                  title="Chỉ Giáo viên mới có quyền xem gợi ý"
                >
                  <HelpCircle className="w-4 h-4" />
                  Gợi ý
                </button>

                <button
                  onClick={handleToggleReveal}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition"
                  title="Chỉ Giáo viên mới có quyền xem đáp án"
                >
                  <Eye className="w-4 h-4" />
                  {showAllAnswers ? 'Ẩn đáp án' : 'Xem đáp án'}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/90 border border-slate-700/80 text-amber-400 rounded-xl text-xs font-bold shadow-inner">
                <Lock className="w-3.5 h-3.5" />
                <span>Gợi ý & Đáp án (Đã khóa)</span>
              </div>
            )}

            <button
              onClick={() => {
                if (gameMode === 'sgk20') {
                  setPuzzle(STATIC_SGK_PUZZLE);
                } else {
                  setGameMode(prev => (prev === 'compact14' ? 'sgk20' : 'compact14'));
                }
                setFoundWords([]);
                setShowAllAnswers(false);
                setHintMessage(null);
                sounds.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-semibold transition"
            >
              <RefreshCw className="w-4 h-4" />
              Chơi lại
            </button>
          </div>
        </div>

        {/* Hint banner if active */}
        {hintMessage && (
          <div className="mt-3 p-3 bg-amber-950/70 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{hintMessage}</span>
            </div>
            <button
              onClick={() => setHintMessage(null)}
              className="text-amber-400 hover:text-amber-200 font-bold ml-2 text-sm"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Main Game Layout: Grid + Word Clues */}
      <div className={`grid grid-cols-1 ${isFullscreen ? 'xl:grid-cols-12 gap-5' : 'xl:grid-cols-12 gap-6'} items-start select-none flex-1`}>
        {/* Left: Word Search Grid Matrix */}
        <div className="xl:col-span-8 bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Lưới ô chữ ({puzzle.size} × {puzzle.size}) • Đã tìm thấy: {foundWords.length}/{puzzle.words.length} từ khóa
            </span>
            <span className="text-indigo-400 font-medium">
              Người chơi: <strong className="text-white">{playerName}</strong>
            </span>
          </div>

          {/* Matrix Container */}
          <div
            ref={gridRef}
            onMouseLeave={handleCellMouseUp}
            className="inline-block min-w-full pb-2"
          >
            <div
              className="grid gap-1 sm:gap-1.5 mx-auto justify-center"
              style={{
                gridTemplateColumns: `repeat(${puzzle.size}, minmax(${isFullscreen ? (puzzle.size === 14 ? '32px' : '26px') : '24px'}, 1fr))`
              }}
            >
              {puzzle.grid.map((row, r) =>
                row.map((letter, c) => {
                  const isSelected = selectedCells.some(cell => cell.r === r && cell.c === c);
                  const foundColor = getCellFoundColor(r, c);

                  let cellStyle: React.CSSProperties = {};
                  let cellClasses = isFullscreen
                    ? puzzle.size === 14
                      ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg font-mono font-black text-sm sm:text-base md:text-xl cursor-pointer transition-all duration-75 '
                      : 'w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded font-mono font-black text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer transition-all duration-75 '
                    : 'w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center rounded font-mono font-bold text-xs sm:text-sm md:text-base cursor-pointer transition-all duration-75 ';

                  if (isSelected) {
                    cellClasses += 'bg-indigo-500 text-white scale-105 shadow-md shadow-indigo-500/50 z-10';
                  } else if (foundColor) {
                    cellStyle = {
                      backgroundColor: foundColor,
                      boxShadow: `0 0 10px ${foundColor}80`
                    };
                    cellClasses += 'text-white font-extrabold scale-[1.02]';
                  } else {
                    cellClasses += 'bg-slate-900/90 hover:bg-slate-700 text-slate-200 border border-slate-800/80';
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      style={cellStyle}
                      className={cellClasses}
                      onMouseDown={() => handleCellMouseDown(r, c)}
                      onMouseEnter={() => handleCellMouseEnter(r, c)}
                      onMouseUp={handleCellMouseUp}
                    >
                      {letter}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/60 pt-2.5">
            <span>💡 Mẹo: Kéo chuột từ chữ đầu tiên đến chữ cuối cùng của từ khóa để giải mật mã.</span>
            <span className="text-emerald-400 font-semibold">+25 điểm mỗi từ khóa tìm đúng</span>
          </div>
        </div>

        {/* Right: Word Checklist & Educational Details */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                6 Hành vi vi phạm cần tìm (SGK Trang 56):
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-900/60 text-indigo-300 border border-indigo-700/60">
                {foundWords.length}/{puzzle.words.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {puzzle.words.map((item, idx) => {
                const isFound = foundWords.includes(item.id) || showAllAnswers;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveWordDetail(item);
                      sounds.playClick();
                    }}
                    style={{
                      borderColor: isFound ? item.color : undefined
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isFound
                        ? 'bg-slate-900/90 shadow-md'
                        : 'bg-slate-900/40 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <p
                            className={`text-xs sm:text-sm font-bold ${
                              isFound ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {item.vietnamese}
                          </p>
                          <p className="font-mono text-[11px] text-slate-400 tracking-wider">
                            Mật mã: <span className="font-semibold text-indigo-300">{item.word}</span>
                          </p>
                        </div>
                      </div>

                      {isFound ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          +25đ
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic shrink-0">Chưa tìm</span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 pl-7">
                      {item.clue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Detail Card */}
          {activeWordDetail && (
            <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 p-4 rounded-2xl border border-indigo-500/40 shadow-xl animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-800/40 mb-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  PHÂN TÍCH GIÁO DỤC THEO BÀI 11
                </span>
                <button
                  onClick={() => setActiveWordDetail(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  Đóng
                </button>
              </div>

              <h4 className="text-sm font-extrabold text-white mb-1">
                {activeWordDetail.vietnamese}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {activeWordDetail.clue}
              </p>

              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                <span className="font-bold text-amber-400">Khía cạnh pháp luật & đạo đức: </span>
                <span>
                  Hành vi này có thể xâm phạm danh dự, uy tín hoặc quyền lợi người khác. Môi trường số có tính ẩn danh và tốc độ lan truyền chóng mặt, khiến thiệt hại nhân lên gấp nhiều lần. Người học cần giữ sự tỉnh táo, tự giác tôn trọng chuẩn mực đạo đức và pháp luật!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
