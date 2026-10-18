import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonContentTab } from './components/LessonContentTab';
import { WordSearchGame } from './components/WordSearchGame';
import { QuizGame } from './components/QuizGame';
import { CardMatchGame } from './components/CardMatchGame';
import { RandomPickerModal } from './components/RandomPickerModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { PythonCodeModal } from './components/PythonCodeModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { TeamScoreManager } from './components/TeamScoreManager';
import { LoginModal } from './components/LoginModal';
import { QUIZ_20_QUESTIONS } from './data/quiz20Questions';
import { DEFAULT_WORDS } from './data/defaultData';
import { PlayerScore, Team, QuizQuestion, WordItem, UserProfile } from './types';
import { sounds } from './utils/audio';

const STORAGE_KEY_SCORES = 'tin10_bai11_scores';
const STORAGE_KEY_QUESTIONS = 'tin10_bai11_questions';
const STORAGE_KEY_WORDS = 'tin10_bai11_words';
const STORAGE_KEY_USER = 'tin10_bai11_user';

export default function App() {
  const [activeTab, setActiveTab] = useState('content');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Nguyễn Văn An',
      className: '10A1',
      type: 'individual',
      role: 'student',
      isLoggedIn: true
    };
  });

  // Current session scores
  const [part1Score, setPart1Score] = useState(0);
  const [part2Score, setPart2Score] = useState(0);
  const [part3Score, setPart3Score] = useState(0);
  const totalScore = part1Score + part2Score + part3Score;

  // 4 Teams for classroom competition
  const [teams, setTeams] = useState<Team[]>([
    { id: 't1', name: 'Tổ 1: Đoàn Kết', score: 0, color: '#6366f1' },
    { id: 't2', name: 'Tổ 2: Tiên Phong', score: 0, color: '#3b82f6' },
    { id: 't3', name: 'Tổ 3: Sáng Tạo', score: 0, color: '#10b981' },
    { id: 't4', name: 'Tổ 4: Vững Bước', score: 0, color: '#f59e0b' }
  ]);
  const [activeTeamId, setActiveTeamId] = useState('t1');

  // Scores leaderboard history
  const [scoresHistory, setScoresHistory] = useState<PlayerScore[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCORES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'seed1',
        name: 'Tổ 3 (Sáng Tạo)',
        className: '10A1',
        type: 'group',
        groupName: 'Tổ 3',
        part1Score: 150,
        part2Score: 280,
        part3Score: 160,
        totalScore: 590,
        date: '18/10/2026',
        timeSpentSeconds: 420
      },
      {
        id: 'seed2',
        name: 'Nguyễn Văn An',
        className: '10A1',
        type: 'individual',
        part1Score: 150,
        part2Score: 240,
        part3Score: 140,
        totalScore: 530,
        date: '18/10/2026',
        timeSpentSeconds: 380
      },
      {
        id: 'seed3',
        name: 'Tổ 1 (Đoàn Kết)',
        className: '10A2',
        type: 'group',
        groupName: 'Tổ 1',
        part1Score: 125,
        part2Score: 200,
        part3Score: 120,
        totalScore: 445,
        date: '18/10/2026',
        timeSpentSeconds: 350
      }
    ];
  });

  // Questions and Words state (editable)
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return QUIZ_20_QUESTIONS;
  });

  const [words, setWords] = useState<WordItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WORDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_WORDS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(scoresHistory));
    } catch {
      // ignore
    }
  }, [scoresHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch {
      // ignore
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(words));
    } catch {
      // ignore
    }
  }, [words]);

  // Handle score updates and record to student account
  const handlePart1Score = (points: number) => {
    setPart1Score(prev => prev + points);
    autoSaveSession(points, 0, 0);
  };

  const handlePart2Score = (points: number) => {
    setPart2Score(prev => prev + points);
    autoSaveSession(0, points, 0);
  };

  const handlePart3Score = (points: number) => {
    setPart3Score(prev => prev + points);
    autoSaveSession(0, 0, points);
  };

  const autoSaveSession = (p1Delta: number, p2Delta: number, p3Delta: number) => {
    const today = new Date().toLocaleDateString('vi-VN');
    setScoresHistory(prev => {
      const existingIdx = prev.findIndex(
        s =>
          s.name.toLowerCase() === currentUser.name.toLowerCase().trim() &&
          (s.className || '').toLowerCase() === (currentUser.className || '').toLowerCase().trim()
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const item = { ...updated[existingIdx] };
        item.part1Score += p1Delta;
        item.part2Score += p2Delta;
        item.part3Score += p3Delta;
        item.totalScore = item.part1Score + item.part2Score + item.part3Score;
        item.date = today;
        item.type = currentUser.type;
        item.className = currentUser.className;
        updated[existingIdx] = item;
        return updated;
      } else {
        const newItem: PlayerScore = {
          id: `p_${Date.now()}`,
          name: currentUser.name.trim() || 'Học sinh',
          className: currentUser.className,
          type: currentUser.type,
          part1Score: part1Score + p1Delta,
          part2Score: part2Score + p2Delta,
          part3Score: part3Score + p3Delta,
          totalScore: totalScore + p1Delta + p2Delta + p3Delta,
          date: today,
          timeSpentSeconds: 0
        };
        return [newItem, ...prev];
      }
    });
  };

  // Team score adjustments
  const handleUpdateTeamScore = (teamId: string, delta: number) => {
    setTeams(prev =>
      prev.map(t => (t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t))
    );
  };

  const handleResetTeamScores = () => {
    setTeams(prev => prev.map(t => ({ ...t, score: 0 })));
  };

  const handleAwardActiveTeam = (points: number) => {
    handleUpdateTeamScore(activeTeamId, points);
  };

  const handleAddManualScore = (name: string, className: string, type: 'individual' | 'group', points: number) => {
    const today = new Date().toLocaleDateString('vi-VN');
    const newEntry: PlayerScore = {
      id: `manual_${Date.now()}`,
      name,
      className,
      type,
      part1Score: 0,
      part2Score: points,
      part3Score: 0,
      totalScore: points,
      date: today,
      timeSpentSeconds: 0
    };
    setScoresHistory(prev => [newEntry, ...prev]);
  };

  // Clear all scores (without window.confirm)
  const handleClearScores = () => {
    setScoresHistory([]);
    setPart1Score(0);
    setPart2Score(0);
    setPart3Score(0);
    try {
      localStorage.removeItem(STORAGE_KEY_SCORES);
    } catch {
      // ignore
    }
  };

  // Handle user login
  const handleUserLogin = (profile: UserProfile) => {
    setCurrentUser(profile);
    setIsLoginModalOpen(false);

    // Look for previous score of this user in current class
    const previousRecord = scoresHistory.find(
      s =>
        s.name.toLowerCase() === profile.name.toLowerCase().trim() &&
        (s.className || '').toLowerCase() === (profile.className || '').toLowerCase().trim()
    );

    if (previousRecord) {
      setPart1Score(previousRecord.part1Score);
      setPart2Score(previousRecord.part2Score);
      setPart3Score(previousRecord.part3Score);
    } else {
      setPart1Score(0);
      setPart2Score(0);
      setPart3Score(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        totalScore={totalScore}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Team Competition Quick Board (Teacher can edit points; Students see read-only points) */}
        <TeamScoreManager
          teams={teams}
          onUpdateTeamScore={handleUpdateTeamScore}
          onResetTeamScores={handleResetTeamScores}
          activeTeamId={activeTeamId}
          onSelectActiveTeam={setActiveTeamId}
          isTeacher={currentUser.role === 'teacher'}
        />

        {/* Tab: Lesson Theory & Mindmap Content */}
        {activeTab === 'content' && <LessonContentTab />}

        {/* Tab 1: Word Search Game */}
        {activeTab === 'part1' && (
          <WordSearchGame
            onScoreUpdate={handlePart1Score}
            currentScore={part1Score}
            playerName={currentUser.name}
            currentUser={currentUser}
          />
        )}

        {/* Tab 2: 20 Multiple Choice Legal Quiz */}
        {activeTab === 'part2' && (
          <QuizGame
            questions={questions}
            onScoreUpdate={handlePart2Score}
            currentScore={part2Score}
            playerName={currentUser.name}
            onAwardTeamScore={handleAwardActiveTeam}
            currentUser={currentUser}
          />
        )}

        {/* Tab 3: Card Matching Rights & Real-World Scenarios */}
        {activeTab === 'part3' && (
          <CardMatchGame
            onScoreUpdate={handlePart3Score}
            currentScore={part3Score}
            playerName={currentUser.name}
          />
        )}

        {/* Tab 4: Random Student Picker */}
        {activeTab === 'random' && (
          <div className="py-4">
            <RandomPickerModal
              isOpen={true}
              onClose={() => setActiveTab('part1')}
              onSelectStudent={name => {
                setCurrentUser(prev => ({ ...prev, name }));
                setActiveTab('part2');
              }}
            />
          </div>
        )}

        {/* Tab 5: SQLite Leaderboard */}
        {activeTab === 'leaderboard' && (
          <LeaderboardModal
            scores={scoresHistory}
            onClearScores={handleClearScores}
            onAddManualScore={handleAddManualScore}
            currentUser={currentUser}
          />
        )}

        {/* Tab 6: Teacher Lesson Plan Guide */}
        {activeTab === 'guide' && <TeacherGuideModal />}

        {/* Tab 7: Python Pygame Source Code & SQLite DB */}
        {activeTab === 'python' && <PythonCodeModal />}

        {/* Tab 8: Content & Questions Editor */}
        {activeTab === 'editor' && (
          <ContentEditorModal
            questions={questions}
            onUpdateQuestions={setQuestions}
            onResetQuestions={() => setQuestions(QUIZ_20_QUESTIONS)}
            words={words}
            onUpdateWords={setWords}
            onResetWords={() => setWords(DEFAULT_WORDS)}
            currentUser={currentUser}
            onRequestTeacherLogin={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* Login & Role Selection Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleUserLogin}
        currentUser={currentUser}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>
          Ứng dụng Trò chơi Dạy học Tin học 10 • Bài 11: Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền (Bộ sách Kết nối tri thức với cuộc sống).
        </p>
      </footer>
    </div>
  );
}
