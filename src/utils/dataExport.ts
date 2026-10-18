import { QuizQuestion, WordItem } from '../types';

export function downloadJsonFile(filename: string, data: unknown) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPythonFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/x-python;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportQuizToCsv(questions: QuizQuestion[]): void {
  const header = ['ID', 'Câu hỏi', 'Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D', 'Đáp án đúng (0-3)', 'Căn cứ pháp lý / Giải thích'];
  const rows = questions.map(q => [
    q.id,
    `"${q.question.replace(/"/g, '""')}"`,
    `"${(q.options[0] || '').replace(/"/g, '""')}"`,
    `"${(q.options[1] || '').replace(/"/g, '""')}"`,
    `"${(q.options[2] || '').replace(/"/g, '""')}"`,
    `"${(q.options[3] || '').replace(/"/g, '""')}"`,
    q.correctIndex,
    `"${(q.referenceLaw + ' - ' + q.explanation).replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bo_cau_hoi_trac_nghiem_tin10_bai11.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportWordsToCsv(words: WordItem[]): void {
  const header = ['ID', 'Từ mã (Không dấu)', 'Tên hành vi (Tiếng Việt)', 'Phân loại', 'Gợi ý / Định nghĩa', 'Giải thích chi tiết'];
  const rows = words.map(w => [
    w.id,
    `"${w.word}"`,
    `"${w.vietnameseWord.replace(/"/g, '""')}"`,
    `"${w.category}"`,
    `"${w.clue.replace(/"/g, '""')}"`,
    `"${w.explanation.replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tu_khoa_mat_ma_tin10_bai11.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
