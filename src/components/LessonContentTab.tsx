import React, { useState } from 'react';
import {
  BookOpen,
  ShieldAlert,
  Scale,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  Printer,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const LessonContentTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'part1' | 'part2' | 'part3'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-900 p-6 rounded-3xl border border-indigo-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800/80">
                Chủ đề 3 • Tin học 10 KNTT
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Nội Dung Trọng Tâm Bài 11: Ứng Xử Trên Môi Trường Số. Nghĩa Vụ Tôn Trọng Bản Quyền
              </h2>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition shadow"
          >
            <Printer className="w-4 h-4 text-indigo-400" />
            In bài học
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
          Hệ thống hóa toàn bộ kiến thức theo chuẩn sách giáo khoa <strong>Tin học 10 - Kết nối tri thức với cuộc sống</strong> (Trang 55 – 62). Dành cho học sinh ôn tập lý thuyết trước khi giải đố và giáo viên làm giáo án bài giảng.
        </p>

        {/* Section Quick Filter */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSection === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Toàn bộ bài học
            </button>
            <button
              onClick={() => setActiveSection('part1')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSection === 'part1'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              1. Đạo đức, pháp luật & văn hóa
            </button>
            <button
              onClick={() => setActiveSection('part2')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSection === 'part2'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              2. Quy định pháp lý người dùng
            </button>
            <button
              onClick={() => setActiveSection('part3')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSection === 'part3'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              3. Quyền tác giả & bản quyền
            </button>
          </div>

          <div className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Bám sát từng trang SGK Tin 10
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHẦN 1: NHỮNG VẤN ĐỀ ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ (Trang 55 - 56) */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'part1') && (
        <section className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 font-extrabold flex items-center justify-center text-sm border border-rose-500/40">
                1
              </span>
              <div>
                <h3 className="text-lg font-black text-white">
                  1. Những Vấn Đề Đạo Đức, Pháp Luật Và Văn Hoá
                </h3>
                <span className="text-xs text-slate-400">SGK Tin học 10 KNTT • Trang 55 - 56</span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-rose-950/60 text-rose-300 rounded-lg border border-rose-800/60 font-bold">
              Phần 1
            </span>
          </div>

          {/* Core Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs sm:text-sm space-y-2">
              <h4 className="font-extrabold text-indigo-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Khái niệm Pháp luật & Đạo đức:
              </h4>
              <p className="text-slate-300 leading-relaxed">
                <strong>• Pháp luật:</strong> Là hệ thống các quy định rõ ràng do Nhà nước ban hành, những hành vi đi ngược lại lợi ích chung của cộng đồng bị Nhà nước <em>cưỡng chế xử phạt</em>.
              </p>
              <p className="text-slate-300 leading-relaxed">
                <strong>• Đạo đức:</strong> Là hệ thống các quy tắc, chuẩn mực xã hội mà con người phải <em>tự giác thực hiện</em> cho phù hợp với lợi ích chung. Dư luận xã hội và giáo dục là các biện pháp điều chỉnh đạo đức.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs sm:text-sm space-y-2">
              <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Yếu tố Internet khiến hậu quả trầm trọng hơn:
              </h4>
              <p className="text-slate-300 leading-relaxed">
                • <strong>Tính ẩn danh:</strong> Giao tiếp gián tiếp và ẩn danh khiến kẻ xấu trở nên bạo dạn hơn, hành vi xấu khó bị kiểm soát hơn đời thực.
              </p>
              <p className="text-slate-300 leading-relaxed">
                • <strong>Tốc độ phát tán:</strong> Tin tức được lan truyền cực nhanh, phạm vi toàn cầu, lưu trữ lâu dài nên tác động xấu có xu hướng <em>trầm trọng hơn rất nhiều</em>.
              </p>
            </div>
          </div>

          {/* 6 Behaviors Remember Box SGK Page 56 */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/60 rounded-2xl border-2 border-indigo-500/40">
            <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              6 Hành Vi Vi Phạm Về Đạo Đức, Pháp Luật Và Văn Hóa (Khung Ghi Nhớ Trang 56):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  code: '1',
                  title: 'Đưa tin không phù hợp lên mạng',
                  desc: 'Bao gồm cả việc đăng bài và chia sẻ lại tin bài có nội dung sai lệch, kích động hoặc độc hại.',
                  tag: 'Pháp luật / Đạo đức'
                },
                {
                  code: '2',
                  title: 'Công bố thông tin cá nhân không phép',
                  desc: 'Tự ý đăng ảnh, danh bạ, địa chỉ, bí mật đời tư người khác hay tổ chức gây tổn hại uy tín, danh dự.',
                  tag: 'Vi phạm Pháp luật'
                },
                {
                  code: '3',
                  title: 'Phát tán thư điện tử, tin nhắn rác',
                  desc: 'Gửi hàng loạt thư hoặc tin nhắn quảng cáo quấy nhiễu khi người nhận không muốn nhận.',
                  tag: 'Nghị định 90/2008'
                },
                {
                  code: '4',
                  title: 'Vi phạm bản quyền',
                  desc: 'Sử dụng phần mềm lậu, bẻ khóa crack, sao chép trái phép dữ liệu, phần mềm của người khác.',
                  tag: 'Luật Sở hữu trí tuệ'
                },
                {
                  code: '5',
                  title: 'Bắt nạt qua mạng (Cyberbullying)',
                  desc: 'Công kích, chửi bới, đe dọa, cô lập, bêu xấu bạn bè trên diễn đàn và mạng xã hội.',
                  tag: 'Vi phạm Đạo đức'
                },
                {
                  code: '6',
                  title: 'Ứng xử thiếu văn hoá',
                  desc: 'Tranh luận thiếu văn minh, chửi tục, công kích, xúc phạm người đối thoại trên không gian mạng.',
                  tag: 'QĐ 874/QĐ-BTTTT'
                }
              ].map(item => (
                <div key={item.code} className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {item.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {item.tag}
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 2: MỘT SỐ QUY ĐỊNH PHÁP LÝ ĐỐI VỚI NGƯỜI DÙNG (Trang 57 - 58) */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'part2') && (
        <section className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-extrabold flex items-center justify-center text-sm border border-blue-500/40">
                2
              </span>
              <div>
                <h3 className="text-lg font-black text-white">
                  2. Một Số Quy Định Pháp Lý Đối Với Người Dùng Trên Mạng
                </h3>
                <span className="text-xs text-slate-400">SGK Tin học 10 KNTT • Trang 57 - 58</span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-blue-950/60 text-blue-300 rounded-lg border border-blue-800/60 font-bold">
              Phần 2
            </span>
          </div>

          {/* Legal Documents System */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-blue-400 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              a) Hệ Thống Các Văn Bản Quy Phạm Pháp Luật Về CNTT & Mạng:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 space-y-1">
                <p className="font-bold text-white">• Các Bộ Luật:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400">
                  <li>Luật Giao dịch điện tử (2005)</li>
                  <li>Luật Công nghệ thông tin (2006)</li>
                  <li>Luật An ninh mạng (2018)</li>
                  <li>Luật Hình sự (2015, sửa đổi 2017)</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 space-y-1">
                <p className="font-bold text-white">• Các Nghị Định & Quyết Định:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400">
                  <li>Nghị định 90/2008/NĐ-CP (về chống thư rác)</li>
                  <li>Nghị định 72/2013/NĐ-CP (quản lý dịch vụ Internet)</li>
                  <li>Nghị định 15/2020/NĐ-CP (xử phạt vi phạm hành chính)</li>
                  <li>Quyết định 874/QĐ-BTTTT (Bộ Quy tắc ứng xử MXH - 17/6/2021)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Crucial Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Article 12 IT Law */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">
                Điều 12 khoản 2 - Luật CNTT (2006)
              </span>
              <h5 className="font-bold text-white text-xs sm:text-sm">Hành vi bị cấm khi sử dụng thông tin số:</h5>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                <li>Chống phá Nhà nước, phá hoại khối đại đoàn kết toàn dân.</li>
                <li>Kích động bạo lực, dâm ô, đồi trụy, tội ác, mê tín dị đoan.</li>
                <li>Tiết lộ bí mật nhà nước, bí mật quân sự, an ninh, kinh tế.</li>
                <li><strong>Xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm, uy tín của công dân.</strong></li>
                <li>Quảng cáo, tuyên truyền hàng hoá, dịch vụ thuộc danh mục cấm.</li>
              </ul>
            </div>

            {/* Decree 15/2020 Article 101 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">
                Điều 101 khoản 1 - Nghị định 15/2020/NĐ-CP
              </span>
              <h5 className="font-bold text-white text-xs sm:text-sm">Các hành vi bị xử phạt tiền từ 10 - 20 triệu đồng:</h5>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                <li>Cung cấp, chia sẻ thông tin giả mạo, thông tin sai sự thật, xuyên tạc.</li>
                <li>Miêu tả tỉ mỉ hành động chém, giết, tai nạn kinh dị, rùng rợn.</li>
                <li>Chia sẻ thông tin kích động bạo lực, đánh bạc, tệ nạn xã hội.</li>
                <li>Chia sẻ bản đồ Việt Nam không thể hiện hoặc thể hiện không đúng chủ quyền quốc gia.</li>
                <li>Cung cấp, chia sẻ đường dẫn (link) đến nội dung bị cấm.</li>
              </ul>
            </div>
          </div>

          {/* 3 Principles for Safe Sharing */}
          <div className="p-4 bg-gradient-to-r from-blue-950/60 to-slate-900 rounded-2xl border border-blue-500/40">
            <h4 className="text-sm font-extrabold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              3 Nguyên Tắc Nâng Cao Tính An Toàn Khi Chia Sẻ Thông Tin (SGK Trang 58):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">1. Kiểm tra tính pháp lý:</strong>
                Trước khi đăng tin, hãy kiểm tra tin bài có vi phạm pháp luật hay không.
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">2. Không chia sẻ tin vi phạm:</strong>
                Biết rõ tin tức có chính xác không. Chia sẻ một tin giả chính là <em>tiếp tay cho hành vi tung tin giả</em>!
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">3. Cân nhắc đạo đức:</strong>
                Dù tin không vi phạm pháp luật thì cũng phải cân nhắc hậu quả đạo đức. Một tin vô hại với người này có thể mang lại tai hoạ cho người khác.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 3: QUYỀN TÁC GIẢ VÀ BẢN QUYỀN SẢN PHẨM TIN HỌC (Trang 59 - 61) */}
      {/* ========================================================================= */}
      {(activeSection === 'all' || activeSection === 'part3') && (
        <section className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-sm border border-emerald-500/40">
                3
              </span>
              <div>
                <h3 className="text-lg font-black text-white">
                  3. Quyền Tác Giả Và Bản Quyền Đối Với Sản Phẩm Tin Học
                </h3>
                <span className="text-xs text-slate-400">SGK Tin học 10 KNTT • Trang 59 - 61</span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-950/60 text-emerald-300 rounded-lg border border-emerald-800/60 font-bold">
              Phần 3
            </span>
          </div>

          {/* Definition of Copyright */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Quyền tác giả:</strong> Là quyền của tổ chức, cá nhân đối với tác phẩm do mình sáng tạo ra hoặc sở hữu. Trong Luật Sở hữu trí tuệ Việt Nam, quyền tác giả bao gồm <strong>Quyền nhân thân</strong> và <strong>Quyền tài sản</strong>.
            </p>
          </div>

          {/* Comparison Table: Nhân thân vs Tài sản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quyền nhân thân */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-500/40 space-y-2.5">
              <h4 className="text-sm font-extrabold text-indigo-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                QUYỀN NHÂN THÂN (Gắn liền với tác giả)
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                <li><strong>Đặt tên</strong> cho tác phẩm do mình sáng tạo.</li>
                <li><strong>Đứng tên thật hoặc bút danh</strong> trên tác phẩm.</li>
                <li>Được <strong>nêu tên thật hoặc bút danh</strong> khi tác phẩm được công bố, sử dụng.</li>
                <li><strong>Công bố</strong> tác phẩm hoặc cho phép người khác công bố tác phẩm.</li>
                <li><strong>Bảo vệ sự toàn vẹn</strong> của tác phẩm, không cho người khác sửa chữa, cắt xén hoặc xuyên tạc gây phương hại uy tín tác giả.</li>
              </ul>
            </div>

            {/* Quyền tài sản */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/60 rounded-2xl border border-emerald-500/40 space-y-2.5">
              <h4 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                QUYỀN TÀI SẢN (Khai thác giá trị kinh tế)
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                <li>Làm <strong>tác phẩm phái sinh</strong> (dịch ngữ, cải biên phần mềm từ máy tính sang điện thoại...).</li>
                <li><strong>Sao chép</strong> tác phẩm (nhân bản, đĩa CD, bản sao dữ liệu...).</li>
                <li><strong>Truyền đạt tác phẩm</strong> đến công chúng bằng phương tiện hữu tuyến, vô tuyến, mạng thông tin điện tử.</li>
                <li><strong>Cho thuê</strong> bản gốc hoặc bản sao chương trình máy tính.</li>
              </ul>
            </div>
          </div>

          {/* Buying Copyright vs Licence */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              Phân Biệt: Mua Bản Quyền vs Mua Quyền Sử Dụng (Licence) - Trang 61:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-extrabold text-indigo-300 block mb-1">MUA BẢN QUYỀN (Copyright):</span>
                Người mua có toàn quyền thực hiện các hoạt động kinh doanh, thương mại đối với tác phẩm đó (như cách <em>Google mua lại YouTube</em>).
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-extrabold text-emerald-300 block mb-1">MUA QUYỀN SỬ DỤNG (Licence):</span>
                Người dùng chỉ được cài đặt và sử dụng trên <em>số lượng máy tính quy định</em>. Ví dụ: khi mua Windows, Word, Excel, ta chỉ mua quyền sử dụng, bản quyền vẫn thuộc về Microsoft! Cài cho máy thứ hai khi chỉ mua cho một máy là vi phạm bản quyền.
              </div>
            </div>
          </div>

          {/* Violations against digital products */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-extrabold text-rose-400 text-xs sm:text-sm">
              Các hành vi vi phạm bản quyền sản phẩm tin học điển hình (Trang 60 - 61):
            </h4>
            <p>
              • Sử dụng phần mềm lậu, không mua quyền sử dụng (Licence).<br />
              • Bẻ khoá (crack) phần mềm, vô hiệu hoá các biện pháp kĩ thuật do tác giả thiết lập (bị xử phạt theo Nghị định 131/2013/NĐ-CP).<br />
              • Chiếm đoạt mã phần mềm: nhân viên mang mã nguồn công ty cũ làm phần mềm riêng để cạnh tranh.<br />
              • Tải lậu video, ca nhạc vào USB để bán giá rẻ mà không có thoả thuận với nghệ sĩ.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
