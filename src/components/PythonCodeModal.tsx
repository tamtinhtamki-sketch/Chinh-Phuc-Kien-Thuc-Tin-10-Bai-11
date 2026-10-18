import React, { useState } from 'react';
import {
  Code2,
  Download,
  Copy,
  Check,
  Terminal,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { PYTHON_PYGAME_SCRIPT } from '../data/pythonSourceCode';
import { downloadPythonFile } from '../utils/dataExport';
import { sounds } from '../utils/audio';

export const PythonCodeModal: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_PYGAME_SCRIPT);
    setCopied(true);
    sounds.playCorrect();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    downloadPythonFile('game_tin10_bai11.py', PYTHON_PYGAME_SCRIPT);
    sounds.playClick();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-950 p-6 rounded-2xl border border-indigo-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-indigo-300">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Mã Nguồn Độc Lập
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Mã Nguồn Python (Pygame + SQLite3)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao chép toàn bộ code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Tải file game_tin10_bai11.py</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Đoạn mã Python hoàn chỉnh dưới đây sử dụng thư viện <strong>Pygame</strong> và cơ sở dữ liệu <strong>SQLite3</strong> (lưu file <code className="text-amber-300">tin10_bai11.db</code>), tích hợp đầy đủ 3 phần chơi, quản lý người chơi, bảng xếp hạng và vòng quay random học sinh.
        </p>
      </div>

      {/* Quick Setup Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
            <Terminal className="w-4 h-4" />
            1. CÀI ĐẶT THƯ VIỆN
          </div>
          <code className="text-xs font-mono text-emerald-400 block bg-slate-900 p-2 rounded-lg mt-1 border border-slate-800">
            pip install pygame
          </code>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
            <Terminal className="w-4 h-4" />
            2. CHẠY TRÒ CHƠI
          </div>
          <code className="text-xs font-mono text-amber-300 block bg-slate-900 p-2 rounded-lg mt-1 border border-slate-800">
            python game_tin10_bai11.py
          </code>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <Database className="w-4 h-4" />
            3. CƠ SỞ DỮ LIỆU SQLITE
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tự động tạo bảng <code className="text-indigo-300">players</code> trong database <code className="text-indigo-300">tin10_bai11.db</code> khi chạy.
          </p>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-bold text-slate-300">game_tin10_bai11.py</span>
          </div>
          <span>Python 3.9+ / Pygame 2.5+ / SQLite3</span>
        </div>

        <div className="p-4 max-h-[520px] overflow-y-auto">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed">
            <code>{PYTHON_PYGAME_SCRIPT}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
