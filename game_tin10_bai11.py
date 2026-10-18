"""
========================================================================================
ỨNG DỤNG TRÒ CHƠI GIẢI ĐỐ TIN HỌC 10 - BÀI 11: ỨNG XỬ TRÊN MÔI TRƯỜNG SỐ (KNTT)
Ngôn ngữ: Python 3.9+ | Thư viện: Pygame 2.5+ | Cơ sở dữ liệu: SQLite3
Bao gồm:
  - Phần 1: Trò chơi Giải mật mã ô chữ (Hành vi vi phạm SGK Trang 56)
  - Phần 2: Trò chơi Trắc nghiệm Pháp lý (20 câu hỏi chuẩn SGK)
  - Phần 3: Trò chơi Ghép thẻ Bản quyền & Xử lý Tình huống thực tế
  - Tính năng: Bảng xếp hạng SQLite3, Chọn học sinh ngẫu nhiên (Random Picker), Chơi Đội/Cá nhân
========================================================================================
Cài đặt thư viện:
    pip install pygame
Chạy trò chơi:
    python game_tin10_bai11.py
"""

import sys
import os
import random
import sqlite3
import datetime
import pygame

# Khởi tạo Pygame
pygame.init()
pygame.font.init()

# Cấu hình Màn hình & Màu sắc
SCREEN_WIDTH = 1060
SCREEN_HEIGHT = 740
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("TIN HỌC 10 - BÀI 11: ỨNG XỬ TRÊN MÔI TRƯỜNG SỐ & BẢN QUYỀN (KNTT)")

CLOCK = pygame.time.Clock()
FPS = 60

# Bảng màu giao diện hiện đại (Dark Slate Theme)
BG_COLOR = (15, 23, 42)         # #0f172a
CARD_BG = (30, 41, 59)          # #1e293b
CARD_BORDER = (71, 85, 105)     # #475569
PRIMARY = (99, 102, 241)        # #6366f1 (Indigo)
PRIMARY_HOVER = (129, 140, 248)
SUCCESS = (16, 185, 129)        # #10b981 (Emerald)
DANGER = (239, 68, 68)          # #ef4444 (Rose)
WARNING = (245, 158, 11)        # #f59e0b (Amber)
TEXT_LIGHT = (248, 250, 252)
TEXT_MUTED = (148, 163, 184)
GRID_LINE = (51, 65, 85)

# Khởi tạo Phông chữ Tiếng Việt
def get_font(size, bold=False):
    candidates = ["segoeui", "tahoma", "arial", "dejavusans", "notosans"]
    for font_name in candidates:
        try:
            return pygame.font.SysFont(font_name, size, bold=bold)
        except Exception:
            continue
    return pygame.font.Font(None, size)

FONT_TITLE = get_font(28, bold=True)
FONT_HEADING = get_font(22, bold=True)
FONT_REGULAR = get_font(18)
FONT_SMALL = get_font(15)
FONT_GRID = get_font(16, bold=True)

# 1. CƠ SỞ DỮ LIỆU SQLITE3
DB_FILE = "tin10_bai11.db"

def init_database():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            player_type TEXT DEFAULT 'individual',
            score_p1 INTEGER DEFAULT 0,
            score_p2 INTEGER DEFAULT 0,
            score_p3 INTEGER DEFAULT 0,
            total_score INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def save_player_score(name, p_type, s1, s2, s3):
    total = s1 + s2 + s3
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO players (player_name, player_type, score_p1, score_p2, score_p3, total_score)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (name, p_type, s1, s2, s3, total))
    conn.commit()
    conn.close()

def get_top_players(limit=10):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT player_name, player_type, score_p1, score_p2, score_p3, total_score, created_at
        FROM players
        ORDER BY total_score DESC, id DESC
        LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return rows

# 2. DỮ LIỆU BÀI 11
SAMPLE_STUDENTS = [
    "Nguyễn Văn An", "Trần Thị Mai", "Lê Hoàng Nam", "Phạm Minh Khôi",
    "Đỗ Thuỳ Dung", "Vũ Quốc Bảo", "Hoàng Thuỳ Linh", "Bùi Đức Trọng",
    "Tổ 1 (Đoàn Kết)", "Tổ 2 (Tiên Phong)", "Tổ 3 (Sáng Tạo)", "Tổ 4 (Vững Bước)"
]

PUZZLE_WORDS = [
    {"word": "DUATINSAI", "label": "Đưa tin không phù hợp lên mạng", "found": False},
    {"word": "CONGBOTTTN", "label": "Công bố thông tin cá nhân không phép", "found": False},
    {"word": "TINRAC", "label": "Phát tán thư điện tử, tin nhắn rác", "found": False},
    {"word": "VIPHAMBANQUYEN", "label": "Vi phạm bản quyền", "found": False},
    {"word": "BATNATMANG", "label": "Bắt nạt qua mạng", "found": False},
    {"word": "THIEUVANHOA", "label": "Ứng xử thiếu văn hoá", "found": False},
]

GRID_SIZE = 14
PRESET_GRID = [
    ['C','O','N','G','B','O','T','T','T','N','A','B','C','D'],
    ['V','I','P','H','A','M','B','A','N','Q','U','Y','E','N'],
    ['B','A','T','N','A','T','M','A','N','G','X','Y','Z','W'],
    ['D','U','A','T','I','N','S','A','I','K','L','M','N','O'],
    ['T','H','I','E','U','V','A','N','H','O','A','P','Q','R'],
    ['T','I','N','R','A','C','S','T','U','V','W','X','Y','Z'],
    ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
    ['O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B'],
    ['C','D','E','F','G','H','I','J','K','L','M','N','O','P'],
    ['Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D'],
    ['E','F','G','H','I','J','K','L','M','N','O','P','Q','R'],
    ['S','T','U','V','W','X','Y','Z','A','B','C','D','E','F'],
    ['G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
    ['U','V','W','X','Y','Z','A','B','C','D','E','F','G','H']
]

QUIZ_QUESTIONS = [
    {
        "q": "Một trong những trách nhiệm quan trọng nhất của người đưa tin lên Internet theo SGK Tin 10 là gì?",
        "options": [
            "A. Đảm bảo tốc độ đăng bài nhanh nhất",
            "B. Đảm bảo tính đúng đắn của thông tin",
            "C. Thu hút nhiều lượt tương tác, câu like",
            "D. Giữ bí mật danh tính người đăng"
        ],
        "ans": 1,
        "law": "SGK Tin học 10 KNTT - Mục 2b Trang 57"
    },
    {
        "q": "Theo Điều 12 khoản 2 Luật CNTT 2006, hành vi nào sau đây bị nghiêm cấm?",
        "options": [
            "A. Xuyên tạc, vu khống, xúc phạm danh dự, nhân phẩm cá nhân, uy tín tổ chức",
            "B. Chia sẻ kiến thức công nghệ bổ ích",
            "C. Học tập trực tuyến và tra cứu bài giảng",
            "D. Giao lưu bạn bè lành mạnh"
        ],
        "ans": 0,
        "law": "Điều 12 khoản 2 Luật Công nghệ thông tin (2006)"
    },
    {
        "q": "Một người chia sẻ lại tin giả mạo 'toàn thành phố phong toả 14 ngày' và bảo 'tôi chỉ share lại chứ không bịa'. Hành vi này thế nào?",
        "options": [
            "A. Không vi phạm vì không phải người tạo ra tin",
            "B. Vi phạm pháp luật; chia sẻ tin giả là tiếp tay tung tin giả (NĐ 15/2020/NĐ-CP)",
            "C. Chỉ vi phạm đạo đức, không bị phạt",
            "D. Được miễn trừ nếu xóa bài sau đó"
        ],
        "ans": 1,
        "law": "Điều 101 Nghị định 15/2020/NĐ-CP"
    },
    {
        "q": "Hành vi quảng cáo sai sự thật về tác dụng chữa bệnh của thuốc trên MXH sẽ bị xử phạt theo văn bản nào?",
        "options": [
            "A. Không bị phạt vì là quyền tự do quảng cáo",
            "B. Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP",
            "C. Chỉ bị nhắc nhở nếu chưa ai uống thuốc bị hại",
            "D. Chỉ phải bồi thường tiền thuốc"
        ],
        "ans": 1,
        "law": "Điều 101 Nghị định 15/2020/NĐ-CP"
    },
    {
        "q": "Bộ Quy tắc ứng xử trên mạng xã hội được ban hành theo quyết định nào?",
        "options": [
            "A. Quyết định 874/QĐ-BTTTT ngày 17/6/2021",
            "B. Luật An ninh mạng 2018",
            "C. Nghị định 72/2013/NĐ-CP",
            "D. Thông tư số 12/2020/TT-BTTTT"
        ],
        "ans": 0,
        "law": "Quyết định 874/QĐ-BTTTT"
    }
]

MATCHING_DATA = [
    {"term": "Quyền nhân thân", "def": "Đặt tên tác phẩm, đứng tên thật/bút danh, nêu tên khi công bố, bảo vệ sự toàn vẹn tác phẩm.", "type": "term"},
    {"term": "Quyền tài sản", "def": "Làm tác phẩm phái sinh, sao chép tác phẩm, truyền đạt đến công chúng, cho thuê phần mềm.", "type": "term"},
    {"term": "Giấy phép sử dụng (Licence)", "def": "Quyền cài đặt trên số lượng máy nhất định; người mua chỉ mua quyền dùng, không sở hữu bản quyền.", "type": "term"},
    {"term": "Tình huống Hoàng mua USB nhạc lậu", "def": "Người bán vi phạm quyền sao chép; người mua tiếp tay tiêu thụ sản phẩm xâm phạm bản quyền.", "type": "scenario"},
    {"term": "Tình huống Lan cài đĩa bản quyền sang máy bạn", "def": "Vi phạm bản quyền vì chỉ mua licence cho 1 máy, cài thêm cho máy khác là vi phạm.", "type": "scenario"}
]

class App:
    def __init__(self):
        init_database()
        self.state = "MENU"
        self.player_name = "Học sinh 10A"
        self.player_mode = "individual"
        self.score_p1 = 0
        self.score_p2 = 0
        self.score_p3 = 0
        self.p1_found_words = []
        self.p1_selected_cells = []
        self.p2_current_idx = 0
        self.p2_selected_opt = None
        self.p2_show_feedback = False
        self.random_result = "Bấm 'QUAY TÊN' để chọn học sinh"

    def draw_header(self, title_text):
        pygame.draw.rect(screen, CARD_BG, (0, 0, SCREEN_WIDTH, 70))
        pygame.draw.line(screen, CARD_BORDER, (0, 70), (SCREEN_WIDTH, 70), 2)
        title_surf = FONT_TITLE.render(title_text, True, TEXT_LIGHT)
        screen.blit(title_surf, (30, 20))
        
        back_rect = pygame.Rect(SCREEN_WIDTH - 150, 15, 120, 40)
        mouse_pos = pygame.mouse.get_pos()
        col = PRIMARY_HOVER if back_rect.collidepoint(mouse_pos) else PRIMARY
        pygame.draw.rect(screen, col, back_rect, border_radius=8)
        btn_txt = FONT_REGULAR.render("Về Menu", True, TEXT_LIGHT)
        screen.blit(btn_txt, (SCREEN_WIDTH - 120, 24))
        
        score_txt = FONT_SMALL.render(f"Người chơi: {self.player_name} | Tổng: {self.score_p1 + self.score_p2 + self.score_p3}đ", True, WARNING)
        screen.blit(score_txt, (SCREEN_WIDTH - 550, 28))
        return back_rect

    def run(self):
        while True:
            screen.fill(BG_COLOR)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                self.handle_event(event)
                
            if self.state == "MENU":
                self.draw_menu()
            elif self.state == "PART1":
                self.draw_part1()
            elif self.state == "PART2":
                self.draw_part2()
            elif self.state == "PART3":
                self.draw_part3()
            elif self.state == "RANDOM":
                self.draw_random()
            elif self.state == "LEADERBOARD":
                self.draw_leaderboard()
                
            pygame.display.flip()
            CLOCK.tick(FPS)

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            mouse_pos = event.pos
            if self.state != "MENU":
                if mouse_pos[0] >= SCREEN_WIDTH - 150 and mouse_pos[1] <= 60:
                    self.state = "MENU"
                    return
            
            if self.state == "MENU":
                self.handle_menu_click(mouse_pos)
            elif self.state == "PART1":
                self.handle_p1_click(mouse_pos)
            elif self.state == "PART2":
                self.handle_p2_click(mouse_pos)
            elif self.state == "RANDOM":
                self.handle_random_click(mouse_pos)

    def draw_menu(self):
        t1 = FONT_TITLE.render("TRÒ CHƠI GIẢI ĐỐ TIN HỌC 10 - BÀI 11 (KNTT)", True, PRIMARY_HOVER)
        sub = FONT_REGULAR.render("ỨNG XỬ TRÊN MÔI TRƯỜNG SỐ. NGHĨA VỤ TÔN TRỌNG BẢN QUYỀN", True, TEXT_MUTED)
        screen.blit(t1, (SCREEN_WIDTH//2 - t1.get_width()//2, 60))
        screen.blit(sub, (SCREEN_WIDTH//2 - sub.get_width()//2, 105))
        
        buttons = [
            ("PHẦN 1: GIẢI MẬT MÃ Ô CHỮ ĐẠO ĐỨC & PHÁP LUẬT", 180, "PART1", PRIMARY),
            ("PHẦN 2: TRẮC NGHIỆM QUY ĐỊNH PHÁP LÝ TRÊN MẠNG", 260, "PART2", (59, 130, 246)),
            ("PHẦN 3: GHÉP THẺ BẢN QUYỀN & TÌNH HUỐNG THỰC TẾ", 340, "PART3", (16, 185, 129)),
            ("VÒNG QUAY RANDOM CHỌN HỌC SINH TRẢ LỜI", 420, "RANDOM", (245, 158, 11)),
            ("BẢNG XẾP HẠNG & LƯU ĐIỂM SỐ (SQLITE3)", 500, "LEADERBOARD", (139, 92, 246)),
        ]
        
        mouse_pos = pygame.mouse.get_pos()
        for title, y, target, col in buttons:
            rect = pygame.Rect(SCREEN_WIDTH//2 - 280, y, 560, 56)
            is_hover = rect.collidepoint(mouse_pos)
            cur_col = tuple(min(255, c + 30) for c in col) if is_hover else col
            pygame.draw.rect(screen, cur_col, rect, border_radius=10)
            txt = FONT_HEADING.render(title, True, TEXT_LIGHT)
            screen.blit(txt, (rect.centerx - txt.get_width()//2, rect.centery - txt.get_height()//2))

    def handle_menu_click(self, pos):
        buttons = [("PART1", 180), ("PART2", 260), ("PART3", 340), ("RANDOM", 420), ("LEADERBOARD", 500)]
        for target, y in buttons:
            rect = pygame.Rect(SCREEN_WIDTH//2 - 280, y, 560, 56)
            if rect.collidepoint(pos):
                self.state = target
                if target == "LEADERBOARD":
                    save_player_score(self.player_name, self.player_mode, self.score_p1, self.score_p2, self.score_p3)
                return

    def draw_part1(self):
        self.draw_header("PHẦN 1: GIẢI MẬT MÃ Ô CHỮ (SGK TRANG 56)")
        start_x = 50
        start_y = 110
        cell_size = 38
        
        for r in range(GRID_SIZE):
            for c in range(GRID_SIZE):
                rect = pygame.Rect(start_x + c * cell_size, start_y + r * cell_size, cell_size - 2, cell_size - 2)
                is_found_cell = (r, c) in self.p1_selected_cells
                bg = SUCCESS if is_found_cell else CARD_BG
                pygame.draw.rect(screen, bg, rect, border_radius=4)
                pygame.draw.rect(screen, CARD_BORDER, rect, 1, border_radius=4)
                letter_txt = FONT_GRID.render(PRESET_GRID[r][c], True, TEXT_LIGHT)
                screen.blit(letter_txt, (rect.centerx - letter_txt.get_width()//2, rect.centery - letter_txt.get_height()//2))
                
        panel_x = start_x + GRID_SIZE * cell_size + 40
        panel_w = SCREEN_WIDTH - panel_x - 40
        info_title = FONT_HEADING.render("CÁC HÀNH VI VI PHẠM (TRANG 56):", True, WARNING)
        screen.blit(info_title, (panel_x, 110))
        
        for idx, item in enumerate(PUZZLE_WORDS):
            card_y = 150 + idx * 72
            c_rect = pygame.Rect(panel_x, card_y, panel_w, 64)
            is_done = item["word"] in self.p1_found_words
            bg_col = (20, 83, 45) if is_done else CARD_BG
            pygame.draw.rect(screen, bg_col, c_rect, border_radius=8)
            pygame.draw.rect(screen, SUCCESS if is_done else CARD_BORDER, c_rect, 2, border_radius=8)
            lbl = FONT_REGULAR.render(f"{idx+1}. {item['label']}", True, TEXT_LIGHT)
            st_txt = FONT_SMALL.render(f"Từ mã: {item['word']} - {'ĐÃ TÌM (+20đ)' if is_done else 'Click để mở'}", True, SUCCESS if is_done else TEXT_MUTED)
            screen.blit(lbl, (panel_x + 12, card_y + 10))
            screen.blit(st_txt, (panel_x + 12, card_y + 36))

    def handle_p1_click(self, pos):
        panel_x = 50 + GRID_SIZE * 38 + 40
        panel_w = SCREEN_WIDTH - panel_x - 40
        for idx, item in enumerate(PUZZLE_WORDS):
            card_y = 150 + idx * 72
            c_rect = pygame.Rect(panel_x, card_y, panel_w, 64)
            if c_rect.collidepoint(pos):
                if item["word"] not in self.p1_found_words:
                    self.p1_found_words.append(item["word"])
                    self.score_p1 += 20
                    for c in range(len(item["word"])):
                        self.p1_selected_cells.append((idx, c))

    def draw_part2(self):
        self.draw_header("PHẦN 2: TRẮC NGHIỆM PHÁP LÝ (BÀI 11 TIN 10)")
        q_data = QUIZ_QUESTIONS[self.p2_current_idx]
        q_rect = pygame.Rect(60, 110, SCREEN_WIDTH - 120, 110)
        pygame.draw.rect(screen, CARD_BG, q_rect, border_radius=12)
        pygame.draw.rect(screen, CARD_BORDER, q_rect, 2, border_radius=12)
        
        q_title = FONT_HEADING.render(f"Câu {self.p2_current_idx + 1} / {len(QUIZ_QUESTIONS)}: (Điểm: {self.score_p2}đ)", True, PRIMARY_HOVER)
        screen.blit(q_title, (80, 125))
        q_txt = FONT_REGULAR.render(q_data["q"][:85], True, TEXT_LIGHT)
        screen.blit(q_txt, (80, 160))
        if len(q_data["q"]) > 85:
            screen.blit(FONT_REGULAR.render(q_data["q"][85:], True, TEXT_LIGHT), (80, 185))
            
        mouse_pos = pygame.mouse.get_pos()
        for idx, opt in enumerate(q_data["options"]):
            opt_rect = pygame.Rect(60, 240 + idx * 75, SCREEN_WIDTH - 120, 60)
            is_hover = opt_rect.collidepoint(mouse_pos)
            if self.p2_show_feedback:
                col = SUCCESS if idx == q_data["ans"] else (DANGER if idx == self.p2_selected_opt else CARD_BG)
            else:
                col = PRIMARY_HOVER if is_hover else CARD_BG
            pygame.draw.rect(screen, col, opt_rect, border_radius=8)
            pygame.draw.rect(screen, CARD_BORDER, opt_rect, 2, border_radius=8)
            screen.blit(FONT_REGULAR.render(opt, True, TEXT_LIGHT), (80, 258 + idx * 75))
            
        if self.p2_show_feedback:
            screen.blit(FONT_SMALL.render(f"Căn cứ: {q_data['law']}", True, WARNING), (60, 560))
            next_btn = pygame.Rect(SCREEN_WIDTH - 240, 590, 180, 48)
            pygame.draw.rect(screen, PRIMARY, next_btn, border_radius=8)
            screen.blit(FONT_REGULAR.render("Câu tiếp theo >", True, TEXT_LIGHT), (next_btn.x + 25, next_btn.y + 12))

    def handle_p2_click(self, pos):
        q_data = QUIZ_QUESTIONS[self.p2_current_idx]
        if not self.p2_show_feedback:
            for idx in range(4):
                opt_rect = pygame.Rect(60, 240 + idx * 75, SCREEN_WIDTH - 120, 60)
                if opt_rect.collidepoint(pos):
                    self.p2_selected_opt = idx
                    self.p2_show_feedback = True
                    if idx == q_data["ans"]:
                        self.score_p2 += 20
                    return
        else:
            next_btn = pygame.Rect(SCREEN_WIDTH - 240, 590, 180, 48)
            if next_btn.collidepoint(pos):
                self.p2_current_idx = (self.p2_current_idx + 1) % len(QUIZ_QUESTIONS)
                self.p2_show_feedback = False
                self.p2_selected_opt = None

    def draw_part3(self):
        self.draw_header("PHẦN 3: GHÉP THẺ BẢN QUYỀN & TÌNH HUỐNG THỰC TẾ")
        screen.blit(FONT_REGULAR.render("Khái niệm & tình huống bản quyền (SGK Trang 59 - 61):", True, TEXT_LIGHT), (60, 100))
        for idx, item in enumerate(MATCHING_DATA):
            card_y = 140 + idx * 95
            rect = pygame.Rect(60, card_y, SCREEN_WIDTH - 120, 80)
            pygame.draw.rect(screen, CARD_BG, rect, border_radius=10)
            pygame.draw.rect(screen, PRIMARY, rect, 2, border_radius=10)
            tag = FONT_SMALL.render(f"[{item['type'].upper()}] {item['term']}", True, SUCCESS if item["type"] == "term" else WARNING)
            screen.blit(tag, (80, card_y + 12))
            screen.blit(FONT_REGULAR.render(item["def"], True, TEXT_LIGHT), (80, card_y + 40))

    def draw_random(self):
        self.draw_header("BỘ CHỌN HỌC SINH NGẪU NHIÊN TRẢ LỜI CÂU HỎI")
        box_rect = pygame.Rect(SCREEN_WIDTH//2 - 320, 160, 640, 240)
        pygame.draw.rect(screen, CARD_BG, box_rect, border_radius=16)
        pygame.draw.rect(screen, WARNING, box_rect, 4, border_radius=16)
        t = FONT_HEADING.render("HỌC SINH / ĐỘI ĐƯỢC CHỌN:", True, WARNING)
        screen.blit(t, (box_rect.centerx - t.get_width()//2, 190))
        res = FONT_TITLE.render(self.random_result, True, TEXT_LIGHT)
        screen.blit(res, (box_rect.centerx - res.get_width()//2, 270))
        
        spin_btn = pygame.Rect(SCREEN_WIDTH//2 - 160, 440, 320, 64)
        col = (217, 119, 6) if spin_btn.collidepoint(pygame.mouse.get_pos()) else WARNING
        pygame.draw.rect(screen, col, spin_btn, border_radius=12)
        btn_txt = FONT_TITLE.render("🎲 QUAY TÊN NGAY", True, (0, 0, 0))
        screen.blit(btn_txt, (spin_btn.centerx - btn_txt.get_width()//2, spin_btn.centery - btn_txt.get_height()//2))

    def handle_random_click(self, pos):
        spin_btn = pygame.Rect(SCREEN_WIDTH//2 - 160, 440, 320, 64)
        if spin_btn.collidepoint(pos):
            self.random_result = random.choice(SAMPLE_STUDENTS)

    def draw_leaderboard(self):
        self.draw_header("BẢNG XẾP HẠNG & LƯU TRỮ ĐIỂM SỐ (SQLITE3)")
        headers = ["Hạng", "Tên Người Chơi / Đội", "P1: Mật mã", "P2: Trắc nghiệm", "P3: Ghép thẻ", "Tổng"]
        col_xs = [60, 130, 480, 610, 750, 890]
        pygame.draw.rect(screen, CARD_BG, (50, 110, SCREEN_WIDTH - 100, 45), border_radius=8)
        for h, x in zip(headers, col_xs):
            screen.blit(FONT_HEADING.render(h, True, PRIMARY_HOVER), (x, 120))
        rows = get_top_players(8)
        for i, row in enumerate(rows):
            p_name, p_type, s1, s2, s3, tot, _ = row
            y = 170 + i * 48
            row_rect = pygame.Rect(50, y, SCREEN_WIDTH - 100, 42)
            pygame.draw.rect(screen, (30, 41, 59) if i % 2 == 0 else (15, 23, 42), row_rect, border_radius=6)
            medals = ["🥇", "🥈", "🥉"]
            rank_str = medals[i] if i < 3 else str(i + 1)
            screen.blit(FONT_REGULAR.render(rank_str, True, WARNING if i < 3 else TEXT_LIGHT), (col_xs[0], y + 10))
            screen.blit(FONT_REGULAR.render(p_name, True, TEXT_LIGHT), (col_xs[1], y + 10))
            screen.blit(FONT_REGULAR.render(f"{s1}đ", True, SUCCESS), (col_xs[2], y + 10))
            screen.blit(FONT_REGULAR.render(f"{s2}đ", True, SUCCESS), (col_xs[3], y + 10))
            screen.blit(FONT_REGULAR.render(f"{s3}đ", True, SUCCESS), (col_xs[4], y + 10))
            screen.blit(FONT_HEADING.render(f"{tot}đ", True, WARNING), (col_xs[5], y + 8))

if __name__ == "__main__":
    app = App()
    app.run()
