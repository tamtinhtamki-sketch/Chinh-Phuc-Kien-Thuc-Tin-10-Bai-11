import React from 'react';
import {
  BookOpen,
  Compass,
  FileCheck2,
  Layers,
  Award,
  Users,
  Clock,
  Lightbulb,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const TeacherGuideModal: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-950 p-6 rounded-2xl border border-indigo-500/30 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-indigo-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Kế Hoạch Bài Dạy & Sư Phạm
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Hướng Dẫn Tổ Chức Dạy Học & Trò Chơi Bài 11 Tin Học 10 (KNTT)
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Tài liệu sư phạm chi tiết giúp giáo viên Tin học THPT tổ chức tiết học sinh động, tương tác cao theo định hướng phát triển năng lực và phẩm chất học sinh (thời lượng khuyến nghị: 45 phút hoặc 90 phút).
        </p>
      </div>

      {/* Overview Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
            <Clock className="w-4 h-4" />
            HOẠT ĐỘNG 1 (10 PHÚT)
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Khởi động: Giải mật mã</h4>
          <p className="text-xs text-slate-400">Tìm 6 hành vi vi phạm đạo đức, pháp luật, văn hoá (Trang 56 SGK).</p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
            <Clock className="w-4 h-4" />
            HOẠT ĐỘNG 2 (15 PHÚT)
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Khám phá: Trắc nghiệm luật</h4>
          <p className="text-xs text-slate-400">20 câu hỏi về Luật CNTT, Luật An ninh mạng, Nghị định 15/2020.</p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <Clock className="w-4 h-4" />
            HOẠT ĐỘNG 3 (15 PHÚT)
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Luyện tập: Ghép thẻ bản quyền</h4>
          <p className="text-xs text-slate-400">Phân biệt Quyền nhân thân vs Tài sản & Giải quyết tình huống số.</p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
            <Clock className="w-4 h-4" />
            HOẠT ĐỘNG 4 (5 PHÚT)
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Về đích: Bảng vàng & Trao giải</h4>
          <p className="text-xs text-slate-400">Vinh danh cá nhân và tổ/nhóm xuất sắc, củng cố thông điệp bài học.</p>
        </div>
      </div>

      {/* Detailed Activity Steps */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-indigo-400 font-bold text-sm">
            <Compass className="w-5 h-5" />
            <span>1. Hướng Dẫn Tổ Chức Trò Chơi Mật Mã Ô Chữ (Phần 1 - Trang 56 SGK)</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            <p>
              <strong>• Mục tiêu:</strong> Giúp học sinh nhận diện và ghi nhớ 6 loại hành vi xấu khi giao tiếp trên mạng theo khung ghi nhớ SGK trang 56: Đưa tin không phù hợp, Công bố thông tin cá nhân trái phép, Phát tán thư rác, Vi phạm bản quyền, Bắt nạt qua mạng, Ứng xử thiếu văn hoá.
            </p>
            <p>
              <strong>• Hình thức tổ chức:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Giáo viên trình chiếu giao diện lưới ô chữ lên máy chiếu hoặc màn hình tương tác.</li>
              <li>Sử dụng tab <em>"Vòng quay gọi tên"</em> để chọn ngẫu nhiên một bạn học sinh hoặc nhóm đại diện lên bảng kéo chuột nối từ.</li>
              <li>Mỗi từ khóa tìm đúng được cộng <strong>25 điểm</strong>. Khi tìm được từ, giáo viên bấm vào thẻ để mở hộp giải thích phân tích khía cạnh đạo đức và pháp luật cho cả lớp thảo luận ngắn.</li>
            </ul>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-blue-400 font-bold text-sm">
            <FileCheck2 className="w-5 h-5" />
            <span>2. Hướng Dẫn Tổ Chức Trò Chơi Trắc Nghiệm Pháp Lý (Phần 2 - Trang 57-58 SGK)</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            <p>
              <strong>• Mục tiêu:</strong> Hiểu rõ các quy định pháp luật: Điều 12 Luật CNTT 2006, Điều 8 Luật An ninh mạng 2018, Nghị định 15/2020/NĐ-CP (xử phạt tin giả mạo, vu khống, xúc phạm uy tín, quảng cáo thuốc sai sự thật), và Quyết định 874/QĐ-BTTTT (Bộ quy tắc ứng xử trên MXH).
            </p>
            <p>
              <strong>• Hình thức tổ chức:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Chế độ Rung chuông vàng:</strong> 4 Tổ cùng suy nghĩ trong 35 giây đếm ngược, giơ bảng đáp án A, B, C hoặc D.</li>
              <li><strong>Chế độ Vấn đáp nhanh:</strong> Dùng vòng quay gọi từng tổ trả lời. Mỗi câu trả lời đúng được cộng <strong>20 điểm</strong> (kèm điểm thưởng combo streak liên tiếp).</li>
              <li>Giáo viên nhấn mạnh: <em>"Chia sẻ lại tin giả cũng là hành vi vi phạm pháp luật và tiếp tay cho việc tung tin giả"</em> (Luyện tập 2 trang 62).</li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-emerald-400 font-bold text-sm">
            <Layers className="w-5 h-5" />
            <span>3. Hướng Dẫn Tổ Chức Trò Chơi Ghép Thẻ Bản Quyền & Xử Lý Tình Huống (Phần 3 - Trang 59-62)</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
            <p>
              <strong>• Mục tiêu:</strong> Phân biệt rõ ràng Quyền nhân thân (đặt tên, đứng tên, toàn vẹn) với Quyền tài sản (sao chép, làm phái sinh, cho thuê phần mềm); phân biệt "Mua bản quyền" với "Mua quyền sử dụng (Licence)".
            </p>
            <p>
              <strong>• Các tình huống trọng tâm SGK:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Tình huống Hoàng mua USB nhạc lậu:</strong> Phân tích hành vi sao chép không phép của người bán và việc tiêu thụ sản phẩm số lậu của người mua.</li>
              <li><strong>Tình huống Lan cài đĩa bản quyền sang máy bạn:</strong> Làm rõ quyền sử dụng tính theo số máy; cài thêm cho máy thứ hai là vi phạm bản quyền (SGK tr.61).</li>
              <li><strong>Tình huống Thành bẻ khóa (crack) phần mềm thử tài:</strong> Khẳng định việc cố ý làm vô hiệu hoá biện pháp bảo vệ kỹ thuật là vi phạm pháp luật theo Nghị định 131/2013/NĐ-CP.</li>
              <li><strong>Tình huống bạn Bình "không biết là không có lỗi":</strong> Khắc sâu nguyên tắc pháp lý: không hiểu biết luật không phải là lý do để miễn trừ trách nhiệm.</li>
            </ul>
          </div>
        </div>

        {/* Evaluation and Grading Rubric */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>4. Thang Điểm Đánh Giá & Thi Đua Tổ/Nhóm</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pl-7">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-indigo-400 block mb-1">Mật mã ô chữ:</strong>
              Mỗi từ khóa SGK: +25đ. Tìm đủ 6 từ: thưởng thêm +50đ.
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-blue-400 block mb-1">Trắc nghiệm:</strong>
              Mỗi câu đúng: +20đ. Trả lời đúng liên tiếp: +5đ thưởng combo.
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <strong className="text-emerald-400 block mb-1">Ghép thẻ & Tình huống:</strong>
              Ghép đúng mỗi thẻ quyền: +20đ. Giải đúng tình huống: +25đ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
