export interface WordItem {
  id: string;
  word: string; // uppercase without spaces or accented uppercase
  displayWord: string;
  vietnameseWord: string;
  clue: string;
  explanation: string;
  category: 'daoduc' | 'phapluat' | 'vanhoa' | 'chung';
  found?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceLaw: string; // e.g. "Điều 101 Nghị định 15/2020/NĐ-CP"
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MatchCard {
  id: string;
  content: string;
  category: 'nhan_than' | 'tai_san';
  categoryLabel: string;
  explanation: string;
}

export interface ScenarioQuestion {
  id: string;
  title: string;
  situation: string;
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  lessonTakeaway: string;
  sgkActivityRef: string; // e.g. "Hoạt động 4 - Trang 60"
}

export interface PlayerScore {
  id: string;
  name: string;
  className?: string;
  type: 'individual' | 'group';
  groupName?: string;
  part1Score: number;
  part2Score: number;
  part3Score: number;
  totalScore: number;
  date: string;
  timeSpentSeconds: number;
}

export interface UserProfile {
  name: string;
  className: string;
  type: 'individual' | 'group';
  role: 'teacher' | 'student';
  isLoggedIn: boolean;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
  members?: string[];
}
