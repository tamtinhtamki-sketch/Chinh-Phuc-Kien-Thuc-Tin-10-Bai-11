import React, { useState } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  Save,
  CheckCircle2,
  FileCheck2,
  Compass,
  FileSpreadsheet,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { QuizQuestion, WordItem, UserProfile } from '../types';
import { exportQuizToCsv, exportWordsToCsv, downloadJsonFile } from '../utils/dataExport';
import { sounds } from '../utils/audio';

interface ContentEditorModalProps {
  questions: QuizQuestion[];
  onUpdateQuestions: (qs: QuizQuestion[]) => void;
  onResetQuestions: () => void;
  words: WordItem[];
  onUpdateWords: (ws: WordItem[]) => void;
  onResetWords: () => void;
  currentUser: UserProfile;
  onRequestTeacherLogin: () => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  questions,
  onUpdateQuestions,
  onResetQuestions,
  words,
  onUpdateWords,
  onResetWords,
  currentUser,
  onRequestTeacherLogin
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'words'>('quiz');
  const [notification, setNotification] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [referenceLaw, setReferenceLaw] = useState('');

  const isTeacher = currentUser.role === 'teacher';

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optA.trim() || !optB.trim()) {
      showNotice('Vui lòng nhập đầy đủ câu hỏi và ít nhất đáp án A, B!');
      sounds.playWrong();
      return;
    }

    const newQ: QuizQuestion = {
      id: `q_custom_${Date.now()}`,
      question: newQuestionText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()].filter(Boolean),
      correctIndex: correctIdx,
      explanation: explanation.trim() || 'Giải thích theo nội dung bài học Tin học 10.',
      referenceLaw: referenceLaw.trim() || 'SGK Tin học 10 KNTT',
      difficulty: 'medium'
    };

    onUpdateQuestions([...questions, newQ]);
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
    setReferenceLaw('');
    sounds.playCorrect();
    showNotice('Đã thêm câu hỏi trắc nghiệm mới thành công!');
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      showNotice('Phải giữ lại ít nhất 1 câu hỏi trong bộ đề!');
      sounds.playWrong();
      return;
    }
    onUpdateQuestions(questions.filter(q => q.id !== id));
    setDeletingId(null);
    sounds.playClick();
    showNotice('Đã xoá câu hỏi thành công!');
  };

  // If student tries to access editor, show Lock screen
  if (!isTeacher) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="bg-slate-800/90 border-2 border-indigo-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-extrabold text-white">
            Bộ Sửa Dữ Liệu Bị Khóa
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            Chức năng chỉnh sửa câu hỏi trắc nghiệm, thay đổi từ khóa và cấu hình đề thi chỉ dành riêng cho <strong>Giáo viên</strong> để đảm bảo tính bảo mật và công bằng cho học sinh.
          </p>

          <div className="pt-3">
            <button
              onClick={onRequestTeacherLogin}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
            >
              Đăng nhập Giáo viên (Mã PIN: 1234)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-950 p-6 rounded-2xl border border-indigo-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-indigo-300">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Quản Trị Đề Thi • Dành Cho Giáo Viên
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Bộ Chỉnh Sửa Câu Hỏi, Từ Khóa & Xuất Dữ Liệu
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeTab === 'quiz') exportQuizToCsv(questions);
                else exportWordsToCsv(words);
                sounds.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Xuất CSV
            </button>

            <button
              onClick={() => {
                downloadJsonFile('du_lieu_bai11_kntt.json', { questions, words });
                sounds.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition"
            >
              <Download className="w-4 h-4" />
              Xuất JSON
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Thầy cô có thể thêm mới, sửa đổi hoặc xoá câu hỏi trắc nghiệm và từ khóa ô chữ để phù hợp với từng lớp học hoặc đề kiểm tra riêng.
        </p>

        {notification && (
          <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500/80 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Tabs Switcher: Quiz vs Words */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex text-xs font-bold">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Bộ câu hỏi trắc nghiệm ({questions.length} câu)
          </button>
          <button
            onClick={() => setActiveTab('words')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'words' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            Từ khóa ô chữ mật mã ({words.length} từ)
          </button>
        </div>

        {isConfirmingReset ? (
          <div className="flex items-center gap-2 p-1 bg-amber-950 border border-amber-500 rounded-xl text-xs">
            <span className="text-amber-300 font-bold px-1">Khôi phục đề gốc?</span>
            <button
              onClick={() => {
                if (activeTab === 'quiz') onResetQuestions();
                else onResetWords();
                setIsConfirmingReset(false);
                sounds.playCorrect();
                showNotice('Đã khôi phục dữ liệu gốc SGK KNTT!');
              }}
              className="px-2 py-1 bg-amber-600 text-slate-950 font-bold rounded-lg"
            >
              Đồng ý
            </button>
            <button
              onClick={() => setIsConfirmingReset(false)}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg"
            >
              Huỷ
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsConfirmingReset(true)}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Khôi phục gốc SGK
          </button>
        )}
      </div>

      {/* Quiz Editor */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form
            onSubmit={handleAddQuestion}
            className="bg-slate-800/90 p-5 rounded-2xl border border-indigo-500/40 shadow-xl space-y-4"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Thêm Câu Hỏi Trắc Nghiệm Mới
            </h3>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Nội dung câu hỏi:
              </label>
              <textarea
                value={newQuestionText}
                onChange={e => setNewQuestionText(e.target.value)}
                placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400 min-h-[70px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Đáp án A:</label>
                <input
                  type="text"
                  value={optA}
                  onChange={e => setOptA(e.target.value)}
                  placeholder="Lựa chọn A..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Đáp án B:</label>
                <input
                  type="text"
                  value={optB}
                  onChange={e => setOptB(e.target.value)}
                  placeholder="Lựa chọn B..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Đáp án C:</label>
                <input
                  type="text"
                  value={optC}
                  onChange={e => setOptC(e.target.value)}
                  placeholder="Lựa chọn C..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Đáp án D:</label>
                <input
                  type="text"
                  value={optD}
                  onChange={e => setOptD(e.target.value)}
                  placeholder="Lựa chọn D..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Đáp án đúng:</label>
                <select
                  value={correctIdx}
                  onChange={e => setCorrectIdx(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-amber-400 font-bold"
                >
                  <option value={0}>Đáp án A</option>
                  <option value={1}>Đáp án B</option>
                  <option value={2}>Đáp án C</option>
                  <option value={3}>Đáp án D</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Căn cứ pháp lý (Luật / Nghị định):</label>
                <input
                  type="text"
                  value={referenceLaw}
                  onChange={e => setReferenceLaw(e.target.value)}
                  placeholder="vd: Điều 101 Nghị định 15/2020/NĐ-CP"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Giải thích chi tiết:</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  placeholder="Giải thích lý do đúng/sai..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Lưu Câu Hỏi Vào Bộ Đề
            </button>
          </form>

          {/* List of Existing Questions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Danh sách {questions.length} câu hỏi hiện tại:
            </h4>

            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 font-bold text-[11px] shrink-0 mt-0.5">
                      Câu {idx + 1}
                    </span>
                    <p className="font-bold text-white text-xs sm:text-sm">
                      {q.question}
                    </p>
                  </div>

                  {deletingId === q.id ? (
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] text-rose-300 font-bold">Xoá?</span>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold"
                      >
                        Xoá
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px]"
                      >
                        Huỷ
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingId(q.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Xoá câu này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6 text-[11px]">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={oIdx === q.correctIndex ? 'text-emerald-400 font-bold' : 'text-slate-400'}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt} {oIdx === q.correctIndex && '✓ (Đúng)'}
                    </div>
                  ))}
                </div>

                <div className="pl-6 text-[11px] text-amber-300/80 pt-1 border-t border-slate-700/60">
                  Căn cứ: {q.referenceLaw} - {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Words Editor */}
      {activeTab === 'words' && (
        <div className="space-y-4">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs text-slate-300">
            Danh sách các từ khóa chuẩn theo Khung ghi nhớ Trang 56 SGK Tin học 10 KNTT.
          </div>

          <div className="space-y-2.5">
            {words.map((w, idx) => (
              <div
                key={w.id}
                className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-xs">{idx + 1}. {w.vietnameseWord}</span>
                    <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-indigo-300 border border-slate-700">
                      Mã: {w.word}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{w.clue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
