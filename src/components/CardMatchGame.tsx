import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Coins,
  BookOpen,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  TERM_DEFINITION_PAIRS,
  SCENARIO_CARDS,
  TermDefinitionPair,
  ScenarioCardItem
} from '../data/cardMatchingData';
import { DEFAULT_MATCH_CARDS } from '../data/defaultData';
import { MatchCard } from '../types';
import { sounds } from '../utils/audio';
import { toggleNativeFullscreen, exitNativeFullscreen } from '../utils/fullscreen';

interface CardMatchGameProps {
  onScoreUpdate: (points: number) => void;
  currentScore: number;
  playerName: string;
}

export const CardMatchGame: React.FC<CardMatchGameProps> = ({
  onScoreUpdate,
  currentScore,
  playerName
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'rights' | 'terms' | 'scenarios'>('rights');

  // State for Sub-activity 1: Categorizing Rights (Quyền nhân thân vs Quyền tài sản)
  const [rightsPool, setRightsPool] = useState<MatchCard[]>(DEFAULT_MATCH_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [classifiedNhanThan, setClassifiedNhanThan] = useState<MatchCard[]>([]);
  const [classifiedTaiSan, setClassifiedTaiSan] = useState<MatchCard[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // State for Sub-activity 2: Term - Definition Matching
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // State for Sub-activity 3: Scenarios
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [scenarioAnswered, setScenarioAnswered] = useState<Record<string, { choice: string; isCorrect: boolean }>>({});
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

  // ---------------- Handlers for Sub-activity 1: Rights Sorting ----------------
  const handleSelectPoolCard = (card: MatchCard) => {
    setSelectedCardId(card.id);
    sounds.playClick();
  };

  const handleAssignToCategory = (targetCat: 'nhan_than' | 'tai_san') => {
    if (!selectedCardId) return;

    const card = rightsPool.find(c => c.id === selectedCardId);
    if (!card) return;

    const isCorrect = card.category === targetCat;
    if (isCorrect) {
      sounds.playCorrect();
      onScoreUpdate(20);
      setFeedbackMsg({
        text: `Chính xác! "${card.content}" thuộc ${targetCat === 'nhan_than' ? 'Quyền nhân thân' : 'Quyền tài sản'} (+20đ).`,
        isCorrect: true
      });

      // Move from pool to bucket
      setRightsPool(prev => prev.filter(c => c.id !== selectedCardId));
      if (targetCat === 'nhan_than') {
        setClassifiedNhanThan(prev => [...prev, card]);
      } else {
        setClassifiedTaiSan(prev => [...prev, card]);
      }
      setSelectedCardId(null);

      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.7 }
      });
    } else {
      sounds.playWrong();
      setFeedbackMsg({
        text: `Chưa đúng rồi! "${card.content}" không thuộc nhóm này. Hãy đọc lại SGK trang 59 để phân biệt quyền tinh thần và quyền khai thác kinh tế!`,
        isCorrect: false
      });
    }
  };

  const handleResetRights = () => {
    setRightsPool(DEFAULT_MATCH_CARDS);
    setClassifiedNhanThan([]);
    setClassifiedTaiSan([]);
    setSelectedCardId(null);
    setFeedbackMsg(null);
    sounds.playClick();
  };

  // ---------------- Handlers for Sub-activity 2: Term - Definition Matching ----------------
  const handleSelectTerm = (termId: string) => {
    if (matchedPairs.includes(termId)) return;
    setSelectedTerm(termId);
    sounds.playClick();
    checkPairMatch(termId, selectedDefinition);
  };

  const handleSelectDef = (defId: string) => {
    if (matchedPairs.includes(defId)) return;
    setSelectedDefinition(defId);
    sounds.playClick();
    checkPairMatch(selectedTerm, defId);
  };

  const checkPairMatch = (tId: string | null, dId: string | null) => {
    if (!tId || !dId) return;

    if (tId === dId) {
      // Correct match!
      sounds.playCorrect();
      onScoreUpdate(20);
      setMatchedPairs(prev => [...prev, tId]);
      setSelectedTerm(null);
      setSelectedDefinition(null);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      sounds.playWrong();
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDefinition(null);
      }, 700);
    }
  };

  const handleResetTerms = () => {
    setMatchedPairs([]);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    sounds.playClick();
  };

  // ---------------- Handlers for Sub-activity 3: Scenarios ----------------
  const currentScenario = SCENARIO_CARDS[currentScenarioIdx];
  const isCurrentScenarioDone = Boolean(scenarioAnswered[currentScenario.id]);

  const handleChooseScenarioVerdict = (choiceKey: string) => {
    if (isCurrentScenarioDone) return;

    const isCorrect = choiceKey === currentScenario.correctCategory;
    setScenarioAnswered(prev => ({
      ...prev,
      [currentScenario.id]: { choice: choiceKey, isCorrect }
    }));

    if (isCorrect) {
      sounds.playCorrect();
      onScoreUpdate(25);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      sounds.playWrong();
    }
  };

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto flex flex-col space-y-4 animate-fade-in' : 'space-y-6'}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-emerald-950 p-5 rounded-2xl border border-emerald-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/40">
                PHẦN 3 {isFullscreen && '• TOÀN MÀN HÌNH MÁY CHIẾU'}
              </span>
              <span className="text-xs text-slate-400">Trang 59 - 61 SGK Tin học 10 Kết nối tri thức</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Quyền Tác Giả, Bản Quyền & Tình Huống Vi Phạm Sản Phẩm Số
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Khám phá sự khác biệt giữa Quyền nhân thân và Quyền tài sản; phân biệt "Mua bản quyền" với "Mua quyền sử dụng (Licence)"; thực hành phán xét các tình huống vi phạm bản quyền tin học.
            </p>
          </div>

          {/* Action Tools & Sub-Tabs Switcher */}
          <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto">
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                isFullscreen
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
              }`}
              title={isFullscreen ? 'Thu nhỏ lại (Phím Esc)' : 'Hiển thị toàn màn hình để dễ dàng quan sát thẻ và ghép nối'}
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

            {/* Sub-Tabs Switcher */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700 flex flex-wrap gap-1 text-xs">
              <button
                onClick={() => {
                  setActiveSubTab('rights');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-lg font-bold transition ${
                  activeSubTab === 'rights'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Phân loại Quyền
              </button>
              <button
                onClick={() => {
                  setActiveSubTab('terms');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-lg font-bold transition ${
                  activeSubTab === 'terms'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Ghép Thẻ Từ Khóa
              </button>
              <button
                onClick={() => {
                  setActiveSubTab('scenarios');
                  sounds.playClick();
                }}
                className={`px-3 py-2 rounded-lg font-bold transition ${
                  activeSubTab === 'scenarios'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Tình Huống Thực Tế
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUB-ACTIVITY 1: CLASSIFYING RIGHTS (Nhân thân vs Tài sản) */}
      {/* ============================================================== */}
      {activeSubTab === 'rights' && (
        <div className="space-y-6">
          {/* Feedback banner */}
          {feedbackMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between animate-fade-in ${
                feedbackMsg.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedbackMsg.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span>{feedbackMsg.text}</span>
              </div>
              <button
                onClick={() => setFeedbackMsg(null)}
                className="text-slate-400 hover:text-white ml-2"
              >
                ×
              </button>
            </div>
          )}

          {/* Cards Waiting to be Classified */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Kho Thẻ Quyền Cần Phân Loại ({rightsPool.length} thẻ còn lại):
                </h3>
              </div>
              <button
                onClick={handleResetRights}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại
              </button>
            </div>

            {rightsPool.length === 0 ? (
              <div className="text-center py-6 text-emerald-400 font-bold text-sm bg-emerald-950/40 rounded-xl border border-emerald-800/40">
                🎉 Xuất sắc! Bạn đã phân loại chính xác toàn bộ quyền nhân thân và quyền tài sản theo Luật Sở hữu trí tuệ!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {rightsPool.map(card => {
                  const isSelected = selectedCardId === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleSelectPoolCard(card)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/80 shadow-lg scale-[1.02]'
                          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-bold leading-snug">
                        {card.content}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {isSelected ? 'Đang chọn - Nhấp nút bên dưới để xếp vào cột' : 'Nhấp để chọn thẻ này'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons to Assign Selected Card */}
          {selectedCardId && (
            <div className="flex items-center justify-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-indigo-500/40 animate-bounce">
              <span className="text-xs font-semibold text-slate-300">
                Gán thẻ đang chọn vào:
              </span>
              <button
                onClick={() => handleAssignToCategory('nhan_than')}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                Cột Quyền Nhân Thân
              </button>
              <button
                onClick={() => handleAssignToCategory('tai_san')}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition"
              >
                <Coins className="w-4 h-4" />
                Cột Quyền Tài Sản
              </button>
            </div>
          )}

          {/* 2 Target Classification Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Quyền Nhân Thân */}
            <div className="bg-slate-800/90 rounded-2xl border border-indigo-500/40 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-500/30 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-indigo-300">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">QUYỀN NHÂN THÂN</h4>
                    <span className="text-[11px] text-indigo-300">Gắn liền với danh dự và uy tín của tác giả</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                  {classifiedNhanThan.length} quyền
                </span>
              </div>

              <div className="space-y-2.5 min-h-[160px]">
                {classifiedNhanThan.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-500 italic border border-dashed border-slate-700 rounded-xl">
                    Chưa có thẻ nào được xếp vào đây.
                    <br />(Ví dụ: Đặt tên, đứng tên, bảo vệ toàn vẹn tác phẩm...)
                  </div>
                ) : (
                  classifiedNhanThan.map(c => (
                    <div
                      key={c.id}
                      className="p-3 bg-indigo-950/50 border border-indigo-500/40 rounded-xl text-xs text-indigo-100 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">{c.content}</p>
                        <p className="text-[11px] text-indigo-300/80 mt-0.5">{c.explanation}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 2: Quyền Tài Sản */}
            <div className="bg-slate-800/90 rounded-2xl border border-emerald-500/40 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-400 flex items-center justify-center text-emerald-300">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">QUYỀN TÀI SẢN</h4>
                    <span className="text-[11px] text-emerald-300">Khai thác giá trị thương mại và kinh tế</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  {classifiedTaiSan.length} quyền
                </span>
              </div>

              <div className="space-y-2.5 min-h-[160px]">
                {classifiedTaiSan.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-500 italic border border-dashed border-slate-700 rounded-xl">
                    Chưa có thẻ nào được xếp vào đây.
                    <br />(Ví dụ: Sao chép, làm phái sinh, cho thuê phần mềm...)
                  </div>
                ) : (
                  classifiedTaiSan.map(c => (
                    <div
                      key={c.id}
                      className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-100 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">{c.content}</p>
                        <p className="text-[11px] text-emerald-300/80 mt-0.5">{c.explanation}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-ACTIVITY 2: TERM - DEFINITION MATCHING */}
      {/* ============================================================== */}
      {activeSubTab === 'terms' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <span>
              💡 Nhiệm vụ: Nhấp chọn một <strong>Thẻ Từ Khóa</strong> ở cột trái, sau đó nhấp chọn <strong>Định Nghĩa tương ứng</strong> ở cột phải để ghép cặp!
            </span>
            <div className="flex items-center gap-3">
              <span className="font-bold text-emerald-400">
                Đã ghép: {matchedPairs.length} / {TERM_DEFINITION_PAIRS.length} cặp (+20đ/cặp)
              </span>
              <button
                onClick={handleResetTerms}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ghép lại
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Term Cards */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Cột A: Thẻ Từ Khóa
              </h4>

              {TERM_DEFINITION_PAIRS.map(item => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = selectedTerm === item.id;

                let cardStyle =
                  'p-4 rounded-xl border transition-all text-left w-full flex items-center justify-between ';

                if (isMatched) {
                  cardStyle += 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 opacity-60';
                } else if (isSelected) {
                  cardStyle += 'bg-indigo-600 border-indigo-400 text-white ring-2 ring-indigo-400/80 shadow-lg';
                } else {
                  cardStyle += 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 cursor-pointer';
                }

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectTerm(item.id)}
                    className={cardStyle}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block text-indigo-300">
                        [{item.category}]
                      </span>
                      <span className="text-sm font-extrabold">{item.term}</span>
                    </div>

                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Definition Cards (Shuffled or ordered) */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                Cột B: Thẻ Định Nghĩa Tương Ứng
              </h4>

              {TERM_DEFINITION_PAIRS.map(item => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = selectedDefinition === item.id;

                let cardStyle =
                  'p-4 rounded-xl border transition-all text-left w-full flex items-start gap-3 ';

                if (isMatched) {
                  cardStyle += 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 opacity-60';
                } else if (isSelected) {
                  cardStyle += 'bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-400/80 shadow-lg';
                } else {
                  cardStyle += 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 cursor-pointer';
                }

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectDef(item.id)}
                    className={cardStyle}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed flex-1">
                      {item.definition}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-ACTIVITY 3: SCENARIOS (Hoạt động 4 & Luyện tập SGK) */}
      {/* ============================================================== */}
      {activeSubTab === 'scenarios' && (
        <div className="space-y-6">
          {/* Scenario Stepper Bar */}
          <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs">
            <span className="font-semibold text-slate-300">
              Tình huống {currentScenarioIdx + 1} / {SCENARIO_CARDS.length}:
            </span>
            <div className="flex gap-1.5">
              {SCENARIO_CARDS.map((sc, i) => {
                const ans = scenarioAnswered[sc.id];
                let bg = 'bg-slate-800 text-slate-400 border-slate-700';
                if (ans) {
                  bg = ans.isCorrect
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-rose-600 text-white font-bold';
                } else if (i === currentScenarioIdx) {
                  bg = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400';
                }
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setCurrentScenarioIdx(i);
                      sounds.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs border ${bg}`}
                  >
                    {sc.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Scenario Card */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold">
                  {currentScenario.code}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {currentScenario.title}
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                SGK Tin 10 Trang {currentScenario.sgkPage}
              </span>
            </div>

            {/* Scenario Narrative Box */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
              <p className="font-semibold text-amber-400 mb-1">
                Tình huống thực tế:
              </p>
              <p>{currentScenario.scenario}</p>
            </div>

            {/* Interactive Decision Options */}
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Em hãy chọn nhận định pháp lý và bản quyền ĐÚNG NHẤT:
            </h4>

            <div className="space-y-3">
              {[
                {
                  key: 'vi_pham_tai_san',
                  label: 'A. Vi phạm Quyền tài sản / Sử dụng vượt quá giấy phép (Licence)'
                },
                {
                  key: 'vi_pham_nhan_than',
                  label: 'B. Vi phạm Quyền nhân thân / Vô hiệu hóa biện pháp kỹ thuật bảo vệ tác phẩm'
                },
                {
                  key: 'hieu_sai_ban_chat',
                  label: 'C. Nhận thức sai lầm: Không biết luật không phải là lý do miễn trừ trách nhiệm'
                },
                {
                  key: 'ton_trong_ban_quyen',
                  label: 'D. Mua trọn vẹn bản quyền hợp pháp (Có toàn quyền khai thác kinh doanh)'
                }
              ].map(opt => {
                const ans = scenarioAnswered[currentScenario.id];
                const isSelected = ans?.choice === opt.key;
                const isCorrect = opt.key === currentScenario.correctCategory;

                let btnClass =
                  'w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ';

                if (isCurrentScenarioDone) {
                  if (isCorrect) {
                    btnClass += 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md';
                  } else if (isSelected) {
                    btnClass += 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    btnClass += 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                  }
                } else {
                  btnClass += 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200 cursor-pointer';
                }

                return (
                  <button
                    key={opt.key}
                    disabled={isCurrentScenarioDone}
                    onClick={() => handleChooseScenarioVerdict(opt.key)}
                    className={btnClass}
                  >
                    <span>{opt.label}</span>
                    {isCurrentScenarioDone && (
                      <span>
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

            {/* Detailed Feedback & Law Reference */}
            {isCurrentScenarioDone && (
              <div className="mt-6 p-4 bg-gradient-to-br from-slate-900 to-emerald-950/60 rounded-xl border border-emerald-500/40 text-xs sm:text-sm animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  PHÂN TÍCH QUY ĐỊNH BẢN QUYỀN (SGK TIN 10)
                </div>
                <p className="text-slate-200 leading-relaxed mb-2">
                  {currentScenario.explanation}
                </p>
                <div className="text-[11px] text-amber-300 font-semibold pt-2 border-t border-slate-800">
                  Căn cứ pháp lý: <span className="text-slate-300 font-normal">{currentScenario.lawBasis}</span>
                </div>
              </div>
            )}

            {/* Next / Prev Scenario buttons */}
            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => {
                  if (currentScenarioIdx > 0) setCurrentScenarioIdx(prev => prev - 1);
                  sounds.playClick();
                }}
                disabled={currentScenarioIdx === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Tình huống trước
              </button>

              <button
                onClick={() => {
                  if (currentScenarioIdx < SCENARIO_CARDS.length - 1) {
                    setCurrentScenarioIdx(prev => prev + 1);
                    sounds.playClick();
                  }
                }}
                disabled={currentScenarioIdx === SCENARIO_CARDS.length - 1}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/30"
              >
                Tình huống tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
