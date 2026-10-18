export interface GridWord {
  id: string;
  word: string; // Uppercase, no spaces, no accents
  rawDisplay: string;
  vietnamese: string;
  clue: string;
  category: 'daoduc' | 'phapluat' | 'vanhoa' | 'chung';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}

export interface WordSearchPuzzle {
  id: string;
  title: string;
  description: string;
  size: number;
  grid: string[][];
  words: GridWord[];
}

/**
 * Helper to build a clean letter grid with placed words and random filler letters
 */
export function generateWordGrid(size: number, wordsToPlace: { id: string; word: string; vietnamese: string; clue: string; category: 'daoduc' | 'phapluat' | 'vanhoa' | 'chung'; color: string }[]): WordSearchPuzzle {
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: GridWord[] = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Directions: [dx, dy] -> right, down, diagonal-down-right, diagonal-down-left
  const directions = [
    [1, 0],   // Ngang (trái sang phải)
    [0, 1],   // Dọc (trên xuống dưới)
    [1, 1],   // Chéo xuống phải
    [-1, 1],  // Chéo xuống trái
  ];

  for (const item of wordsToPlace) {
    const w = item.word.toUpperCase().replace(/[^A-Z]/g, '');
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 1500) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const dx = dir[0];
      const dy = dir[1];

      // Calculate valid starting positions
      const minX = dx < 0 ? w.length - 1 : 0;
      const maxX = dx > 0 ? size - w.length : size - 1;
      const minY = dy < 0 ? w.length - 1 : 0;
      const maxY = dy > 0 ? size - w.length : size - 1;

      if (maxX < minX || maxY < minY) continue;

      const sx = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const sy = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      // Check if valid placement
      let canPlace = true;
      for (let i = 0; i < w.length; i++) {
        const cx = sx + i * dx;
        const cy = sy + i * dy;
        if (grid[cy][cx] !== '' && grid[cy][cx] !== w[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < w.length; i++) {
          const cx = sx + i * dx;
          const cy = sy + i * dy;
          grid[cy][cx] = w[i];
        }
        placedWords.push({
          id: item.id,
          word: w,
          rawDisplay: item.word,
          vietnamese: item.vietnamese,
          clue: item.clue,
          category: item.category,
          startX: sx,
          startY: sy,
          endX: sx + (w.length - 1) * dx,
          endY: sy + (w.length - 1) * dy,
          color: item.color
        });
        placed = true;
      }
    }
  }

  // Fill empty cells with random letters
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return {
    id: 'sgk_bai11_puzzle',
    title: 'Giải Mật Mã Ô Chữ: Hành Vi Vi Phạm Trên Môi Trường Số',
    description: 'Tìm kiếm 6 hành vi vi phạm đạo đức, pháp luật và văn hoá theo khung ghi nhớ SGK Tin học 10 KNTT (Trang 56)',
    size,
    grid,
    words: placedWords
  };
}

// 6 Full SGK Keywords from Remember Box Page 56:
export const SGK_PAGE56_WORDS = [
  {
    id: 'sgk1',
    word: 'DUATINKHONGPHUHOP',
    vietnamese: 'Đưa tin không phù hợp lên mạng',
    clue: 'Bao gồm cả việc đăng và chia sẻ lại các tin bài có nội dung sai trái, gây hoang mang hoặc độc hại.',
    category: 'phapluat' as const,
    color: '#ef4444' // red
  },
  {
    id: 'sgk2',
    word: 'CONGBOTHONGTINCANHAN',
    vietnamese: 'Công bố thông tin cá nhân không được phép',
    clue: 'Đăng tải hình ảnh, địa chỉ, số điện thoại, đời tư người khác hoặc tổ chức khi chưa được phép.',
    category: 'phapluat' as const,
    color: '#f97316' // orange
  },
  {
    id: 'sgk3',
    word: 'PHATTANTHUDIENTURAC',
    vietnamese: 'Phát tán thư điện tử, tin nhắn rác',
    clue: 'Gửi hàng loạt thư quảng cáo, tin nhắn quấy nhiễu mà người nhận không mong muốn.',
    category: 'phapluat' as const,
    color: '#eab308' // yellow
  },
  {
    id: 'sgk4',
    word: 'VIPHAMBANQUYEN',
    vietnamese: 'Vi phạm bản quyền',
    clue: 'Sử dụng phần mềm lậu, bẻ khóa crack, sao chép trái phép dữ liệu và tác phẩm của người khác.',
    category: 'phapluat' as const,
    color: '#10b981' // green
  },
  {
    id: 'sgk5',
    word: 'BATNATQUAMANG',
    vietnamese: 'Bắt nạt qua mạng',
    clue: 'Sử dụng mạng xã hội để công kích, sỉ nhục, bêu xấu hoặc cô lập bạn bè (Cyberbullying).',
    category: 'daoduc' as const,
    color: '#06b6d4' // cyan
  },
  {
    id: 'sgk6',
    word: 'UNGXUTHIEUVANHOA',
    vietnamese: 'Ứng xử thiếu văn hoá',
    clue: 'Tranh luận thiếu văn minh, chửi tục, thóa mạ lẫn nhau trên các diễn đàn và mạng xã hội.',
    category: 'vanhoa' as const,
    color: '#8b5cf6' // purple
  }
];

// Pre-generated static 20x20 puzzle so it's guaranteed to load instantly with perfect layout!
export const STATIC_SGK_PUZZLE: WordSearchPuzzle = {
  id: 'static_bai11',
  title: 'Mật Mã Ô Chữ: 6 Hành Vi Vi Phạm SGK Trang 56',
  description: 'Tìm kiếm 6 hành vi vi phạm đạo đức, pháp luật và văn hoá khi sử dụng mạng (Hàng ngang, dọc, chéo)',
  size: 20,
  grid: [
    ['C','O','N','G','B','O','T','H','O','N','G','T','I','N','C','A','N','H','A','N'],
    ['P','K','A','M','Q','U','Y','E','N','X','L','M','K','J','H','G','F','D','S','A'],
    ['H','D','U','A','T','I','N','K','H','O','N','G','P','H','U','H','O','P','Q','W'],
    ['A','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X'],
    ['T','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F'],
    ['T','U','N','G','X','U','T','H','I','E','U','V','A','N','H','O','A','G','H','J'],
    ['A','K','L','Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P'],
    ['N','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Q','W','E'],
    ['T','B','A','T','N','A','T','Q','U','A','M','A','N','G','R','T','Y','U','I','O'],
    ['H','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Q','W'],
    ['U','V','I','P','H','A','M','B','A','N','Q','U','Y','E','N','E','R','T','Y','U'],
    ['D','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
    ['I','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L'],
    ['E','Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P','A','S'],
    ['N','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Q','W','E','R','T'],
    ['T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B'],
    ['U','N','M','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J'],
    ['R','K','L','Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Q','W','E','R'],
    ['C','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V'],
  ],
  words: [
    {
      id: 'sgk2',
      word: 'CONGBOTHONGTINCANHAN',
      rawDisplay: 'CONGBOTHONGTINCANHAN',
      vietnamese: 'Công bố thông tin cá nhân không được phép',
      clue: 'Đăng thông tin cá nhân hay tổ chức mà không được phép, gây ảnh hưởng đến uy tín, danh dự.',
      category: 'phapluat',
      startX: 0,
      startY: 0,
      endX: 19,
      endY: 0,
      color: '#f97316'
    },
    {
      id: 'sgk1',
      word: 'DUATINKHONGPHUHOP',
      rawDisplay: 'DUATINKHONGPHUHOP',
      vietnamese: 'Đưa tin không phù hợp lên mạng',
      clue: 'Bao gồm cả đăng và chia sẻ tin bài sai sự thật, độc hại hoặc vi phạm chuẩn mực.',
      category: 'phapluat',
      startX: 1,
      startY: 2,
      endX: 17,
      endY: 2,
      color: '#ef4444'
    },
    {
      id: 'sgk6',
      word: 'UNGXUTHIEUVANHOA',
      rawDisplay: 'UNGXUTHIEUVANHOA',
      vietnamese: 'Ứng xử thiếu văn hoá',
      clue: 'Tranh luận thiếu văn hoá, xúc phạm người đối thoại, chửi tục, công kích trên diễn đàn.',
      category: 'vanhoa',
      startX: 1,
      startY: 5,
      endX: 16,
      endY: 5,
      color: '#8b5cf6'
    },
    {
      id: 'sgk5',
      word: 'BATNATQUAMANG',
      rawDisplay: 'BATNATQUAMANG',
      vietnamese: 'Bắt nạt qua mạng',
      clue: 'Cô lập, công kích, chế giễu bạn bè trên không gian mạng gây hậu quả tâm lý tiêu cực.',
      category: 'daoduc',
      startX: 1,
      startY: 8,
      endX: 13,
      endY: 8,
      color: '#06b6d4'
    },
    {
      id: 'sgk4',
      word: 'VIPHAMBANQUYEN',
      rawDisplay: 'VIPHAMBANQUYEN',
      vietnamese: 'Vi phạm bản quyền',
      clue: 'Chiếm đoạt, bẻ khóa, phân phối trái phép phần mềm và dữ liệu số của tác giả.',
      category: 'phapluat',
      startX: 1,
      startY: 10,
      endX: 14,
      endY: 10,
      color: '#10b981'
    },
    {
      id: 'sgk3',
      word: 'PHATTANTHUDIENTURAC',
      rawDisplay: 'PHATTANTHUDIENTURAC',
      vietnamese: 'Phát tán thư điện tử, tin nhắn rác',
      clue: 'Gửi hàng loạt thư hoặc tin nhắn quảng cáo quấy nhiễu khi người nhận không mong muốn tiếp nhận.',
      category: 'phapluat',
      startX: 0,
      startY: 1,
      endX: 0,
      endY: 19,
      color: '#eab308'
    }
  ]
};
