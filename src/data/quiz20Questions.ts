import { QuizQuestion } from '../types';

export const QUIZ_20_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Theo nội dung SGK Tin học 10 (KNTT), một trong những trách nhiệm quan trọng nhất của người đưa tin lên Internet là gì?',
    options: [
      'A. Đảm bảo tốc độ truyền tải thông tin nhanh nhất',
      'B. Đảm bảo tính đúng đắn của thông tin',
      'C. Thu hút nhiều lượt tương tác, chia sẻ và bình luận',
      'D. Giữ bí mật tuyệt đối danh tính người đăng tải'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 57 khẳng định: "Một trong những trách nhiệm quan trọng nhất của người đưa tin lên Internet là đảm bảo tính đúng đắn của thông tin."',
    referenceLaw: 'SGK Tin học 10 KNTT - Mục 2b Trang 57',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Điều 12 khoản 2 của Luật Công nghệ thông tin (2006) nghiêm cấm việc cung cấp, trao đổi, lưu trữ, sử dụng thông tin số nhằm mục đích nào dưới đây?',
    options: [
      'A. Xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm của công dân',
      'B. Phổ biến kiến thức khoa học công nghệ và kỹ năng số cho cộng đồng',
      'C. Tham gia học tập trực tuyến và tra cứu tài liệu học thuật',
      'D. Trao đổi thông tin phục vụ công việc và học tập'
    ],
    correctIndex: 0,
    explanation: 'Theo Điều 12 khoản 2 điểm d Luật CNTT 2006, cấm cung cấp thông tin số nhằm "Xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm, uy tín của công dân".',
    referenceLaw: 'Điều 12 khoản 2 - Luật Công nghệ thông tin (2006)',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'Trong đợt dịch bệnh, một cá nhân chia sẻ bài viết sai sự thật về lịch trình ca bệnh gây hoang mang khu dân cư và phân bua "Tôi chỉ chia sẻ lại tin của người khác chứ không tự bịa". Hành vi này bị xử lý thế nào?',
    options: [
      'A. Không bị xử lý vì người này không phải là người trực tiếp bịa đặt tin đồn',
      'B. Vi phạm pháp luật; hành vi chia sẻ tin bài sai sự thật cũng chính là tiếp tay cho việc tung tin giả và bị xử phạt theo quy định',
      'C. Chỉ bị phê bình nhắc nhở nội bộ ở tổ dân phố',
      'D. Được miễn trừ trách nhiệm nếu sau đó tự ý gỡ bài viết'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 58 và câu hỏi 1 trang 59 nêu rõ: Đừng quên rằng việc chia sẻ một tin vi phạm luật cũng là vi phạm pháp luật. Nghị định 15/2020/NĐ-CP xử phạt cả hành vi cung cấp và chia sẻ thông tin sai sự thật.',
    referenceLaw: 'Điều 101 Nghị định 15/2020/NĐ-CP & SGK Trang 58',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'Hành vi quảng cáo sai sự thật về tác dụng chữa bệnh của một loại thuốc thảo dược trên mạng xã hội sẽ bị xử phạt theo văn bản pháp luật nào?',
    options: [
      'A. Không bị phạt vì quảng cáo là tự do kinh doanh cá nhân',
      'B. Bị phạt theo Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP',
      'C. Chỉ bị nhắc nhở nếu chưa có bệnh nhân nào khiếu nại',
      'D. Chỉ phải bồi thường tiền mua thuốc cho người tiêu dùng'
    ],
    correctIndex: 1,
    explanation: 'Câu hỏi 2 mục 2 (Trang 59 SGK): Quảng cáo sai sự thật về tác dụng của một loại thuốc sẽ bị phạt theo điểm a/điểm f, khoản 1 Điều 101 Nghị định 15/2020/NĐ-CP.',
    referenceLaw: 'Điều 101 khoản 1 - Nghị định 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'Điều 8 khoản 1 trong Luật An ninh mạng (2018) nghiêm cấm sử dụng không gian mạng để thực hiện hành vi nào sau đây?',
    options: [
      'A. Tổ chức họp và học tập trực tuyến trên các nền tảng mạng',
      'B. Xuyên tạc lịch sử, phủ nhận thành tựu cách mạng, phá hoại khối đại đoàn kết toàn dân tộc',
      'C. Quảng bá hình ảnh văn hóa, con người Việt Nam đến bạn bè quốc tế',
      'D. Kinh doanh hàng hóa được cấp phép thương mại điện tử'
    ],
    correctIndex: 1,
    explanation: 'Luật An ninh mạng 2018 (Điều 8 khoản 1 điểm c) cấm: "Xuyên tạc lịch sử, phủ nhận thành tựu cách mạng, phá hoại khối đại đoàn kết toàn dân tộc, xúc phạm tôn giáo, phân biệt đối xử về giới, phân biệt chủng tộc."',
    referenceLaw: 'Điều 8 khoản 1 điểm c - Luật An ninh mạng 2018',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    question: 'Theo Điều 101 khoản 1 điểm g Nghị định 15/2020/NĐ-CP, hành vi nào sau đây liên quan đến bản đồ bị pháp luật nghiêm cấm?',
    options: [
      'A. Đăng tải bản đồ giao thông đô thị để chỉ đường',
      'B. Cung cấp, chia sẻ hình ảnh bản đồ Việt Nam nhưng không thể hiện hoặc thể hiện không đúng chủ quyền quốc gia',
      'C. Sử dụng bản đồ vệ tinh để học tập môn Địa lí',
      'D. Tải bản đồ thế giới về máy tính cá nhân để tra cứu'
    ],
    correctIndex: 1,
    explanation: 'Điều 101 khoản 1 điểm g NĐ 15/2020/NĐ-CP quy định xử phạt hành vi: "Cung cấp, chia sẻ hình ảnh bản đồ Việt Nam nhưng không thể hiện hoặc thể hiện không đúng chủ quyền quốc gia" (như thiếu quần đảo Hoàng Sa, Trường Sa).',
    referenceLaw: 'Điều 101 khoản 1 điểm g - Nghị định 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    question: 'Hành vi cung cấp, chia sẻ đường dẫn (link) dẫn đến thông tin trên mạng có nội dung bị cấm sẽ bị xử lý như thế nào theo Nghị định 15/2020/NĐ-CP?',
    options: [
      'A. Không bị phạt vì chỉ chia sẻ link chứ không trực tiếp lưu trữ nội dung',
      'B. Bị xử phạt vi phạm hành chính tương tự như hành vi phát tán thông tin bị cấm',
      'C. Chỉ bị phạt nếu đường link đó do chính mình tạo ra',
      'D. Được pháp luật bảo vệ theo quyền tự do liên kết'
    ],
    correctIndex: 1,
    explanation: 'Theo Điều 101 khoản 1 điểm h Nghị định 15/2020/NĐ-CP: Cung cấp, chia sẻ đường dẫn đến thông tin trên mạng có nội dung bị cấm là hành vi vi phạm pháp luật và bị xử phạt tiền.',
    referenceLaw: 'Điều 101 khoản 1 điểm h - Nghị định 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    question: 'Bộ Thông tin và Truyền thông ban hành Bộ Quy tắc ứng xử trên mạng xã hội theo văn bản nào dưới đây?',
    options: [
      'A. Quyết định số 874/QĐ-BTTTT ngày 17/6/2021',
      'B. Luật An ninh mạng số 24/2018/QH14',
      'C. Nghị định số 72/2013/NĐ-CP ngày 15/7/2013',
      'D. Thông tư liên tịch số 01/2020/TTLT'
    ],
    correctIndex: 0,
    explanation: 'SGK Tin 10 trang 58 nêu rõ: Tháng 6/2021, Bộ Thông tin và Truyền thông đã ban hành Bộ Quy tắc ứng xử trên mạng xã hội theo Quyết định số 874/QĐ-BTTTT ban hành ngày 17/6/2021.',
    referenceLaw: 'Quyết định số 874/QĐ-BTTTT (17/6/2021)',
    difficulty: 'hard'
  },
  {
    id: 'q9',
    question: 'Bộ Quy tắc ứng xử trên mạng xã hội (Quyết định 874/QĐ-BTTTT) KHUYẾN KHÍCH người dùng thực hiện điều nào sau đây?',
    options: [
      'A. Dùng tên thật, chia sẻ thông tin tích cực và quảng bá hình ảnh đất nước, con người Việt Nam',
      'B. Sử dụng nhiều tài khoản ẩn danh để tự do tranh luận gay gắt',
      'C. Sao chép lại tất cả các tác phẩm nổi tiếng để lưu trữ trên trang cá nhân',
      'D. Chia sẻ lập tức các tin tức giật gân để thu hút sự chú ý của mọi người'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 58: Bộ quy tắc ứng xử trên mạng xã hội khuyến khích dùng tên thật, đăng thông tin quảng bá hình ảnh đất nước, con người và văn hoá Việt Nam, chia sẻ những tấm gương người tốt, việc tốt.',
    referenceLaw: 'Bộ Quy tắc ứng xử MXH - QĐ 874/QĐ-BTTTT',
    difficulty: 'easy'
  },
  {
    id: 'q10',
    question: 'Văn bản quy phạm pháp luật nào của Chính phủ quy định cụ thể về việc "chống thư rác"?',
    options: [
      'A. Nghị định 90/2008/NĐ-CP ban hành ngày 13/8/2008',
      'B. Luật Giao dịch điện tử 2005',
      'C. Luật An ninh mạng 2018',
      'D. Nghị định 15/2020/NĐ-CP'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 57 liệt kê các nghị định cụ thể hoá bộ luật, trong đó: "Nghị định 90/2008/NĐ-CP ban hành ngày 13/8/2008 về chống thư rác".',
    referenceLaw: 'Nghị định 90/2008/NĐ-CP - SGK Trang 57',
    difficulty: 'hard'
  },
  {
    id: 'q11',
    question: 'Hành vi công bố thông tin cá nhân của người khác lên mạng xã hội mà không được người đó cho phép, gây ảnh hưởng danh dự của họ là:',
    options: [
      'A. Hành vi hợp pháp vì mạng xã hội có tính mở',
      'B. Hành vi vi phạm pháp luật (xâm phạm quyền bảo vệ đời tư, bí mật cá nhân)',
      'C. Chỉ là hành động đùa vui vô hại giữa bạn bè',
      'D. Vi phạm bản quyền sản phẩm tin học'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 56 chỉ rõ: "Công bố thông tin cá nhân hay tổ chức mà không được phép, gây ảnh hưởng đến uy tín và danh dự của cá nhân hay tổ chức là hành vi vi phạm pháp luật."',
    referenceLaw: 'SGK Tin học 10 KNTT - Trang 56',
    difficulty: 'easy'
  },
  {
    id: 'q12',
    question: 'Nghị định nào quy định về quản lý, cung cấp và sử dụng dịch vụ Internet và thông tin trên mạng?',
    options: [
      'A. Nghị định 72/2013/NĐ-CP ban hành ngày 15/7/2013',
      'B. Nghị định 90/2008/NĐ-CP',
      'C. Nghị định 131/2013/NĐ-CP',
      'D. Quyết định 874/QĐ-BTTTT'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 57 ghi rõ: "Nghị định 72/2013/NĐ-CP ban hành ngày 15/7/2013 về quản lí, cung cấp và sử dụng dịch vụ Internet; Nghị định 15/2020/NĐ-CP..."',
    referenceLaw: 'Nghị định 72/2013/NĐ-CP - SGK Trang 57',
    difficulty: 'hard'
  },
  {
    id: 'q13',
    question: 'Tại sao tin tức xấu hoặc sai lệch khi đưa lên không gian mạng lại có xu hướng gây hậu quả trầm trọng hơn so với đời thực?',
    options: [
      'A. Vì không gian mạng chỉ có người lớn sử dụng',
      'B. Vì tin tức được phát tán nhanh, phạm vi rộng, lưu trữ lâu dài và có tính chất ẩn danh',
      'C. Vì người dùng mạng luôn tin tưởng tuyệt đối vào mọi bài viết',
      'D. Vì pháp luật hiện nay chưa có quy định quản lý không gian mạng'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 56 phân tích: Trên không gian mạng, giao tiếp có thể ẩn danh, tin bài được lưu trữ lâu dài, phát tán nhanh chóng và rộng khắp nên ảnh hưởng của hành vi xấu có xu hướng trầm trọng hơn nhiều.',
    referenceLaw: 'SGK Tin 10 KNTT - Trang 56',
    difficulty: 'easy'
  },
  {
    id: 'q14',
    question: 'Ngay cả khi một thông tin chuẩn bị đăng lên mạng KHÔNG vi phạm các điều khoản pháp luật, người dùng vẫn cần phải làm gì?',
    options: [
      'A. Cân nhắc các hậu quả, nhất là khía cạnh đạo đức và thuần phong mỹ tục xã hội',
      'B. Bấm đăng ngay vì không phạm luật thì không cần quan tâm đến ai',
      'C. Chia sẻ vào thật nhiều hội nhóm kín để tăng tương tác',
      'D. Đổi tên nick thành vô danh để đăng bài an toàn'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 58 (Nguyên tắc an toàn): "Ngay cả trong trường hợp việc đưa tin không vi phạm pháp luật thì cũng phải cân nhắc hậu quả, nhất là khía cạnh đạo đức. Một tin vô hại với người này có thể mang lại tai hoạ cho người khác."',
    referenceLaw: 'SGK Tin học 10 KNTT - Trang 58',
    difficulty: 'medium'
  },
  {
    id: 'q15',
    question: 'Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực nào?',
    options: [
      'A. Lĩnh vực giao thông đường bộ và đường sắt',
      'B. Bưu chính, viễn thông, tần số vô tuyến điện, công nghệ thông tin và giao dịch điện tử',
      'C. Quản lý thị trường và nhãn hiệu hàng hóa xuất nhập khẩu',
      'D. Xây dựng đô thị và tài nguyên môi trường số'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 57: Nghị định 15/2020/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực bưu chính, viễn thông, tần số vô tuyến điện, CNTT và giao dịch điện tử.',
    referenceLaw: 'Nghị định 15/2020/NĐ-CP - SGK Trang 57',
    difficulty: 'hard'
  },
  {
    id: 'q16',
    question: 'Quay video clip bạn học bị đánh hội đồng rồi phát tán lên mạng xã hội mà không can ngăn thuộc loại vi phạm nào?',
    options: [
      'A. Hoàn toàn không vi phạm vì chỉ quay lại sự việc có thật',
      'B. Vừa vi phạm nghiêm trọng chuẩn mực đạo đức, vừa vi phạm pháp luật (cổ vũ bạo lực học đường, xúc phạm danh dự người khác)',
      'C. Là hành vi được khen thưởng vì cung cấp bằng chứng cho nhà trường',
      'D. Chỉ là vi phạm nội quy lớp học đơn thuần'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 55-56 (Hoạt động 1): Việc đưa video đánh nhau lên mạng gián tiếp cổ vũ bạo lực học đường, làm nhục người khác là hành vi vi phạm đạo đức và có thể bị truy cứu trách nhiệm pháp lý.',
    referenceLaw: 'SGK Tin 10 KNTT - Mục 1 Trang 55-56',
    difficulty: 'easy'
  },
  {
    id: 'q17',
    question: 'Điều 101 khoản 1 điểm c Nghị định 15/2020/NĐ-CP cấm hành vi nào sau đây?',
    options: [
      'A. Đăng tải thông tin miêu tả tỉ mỉ hành động chém, giết, tai nạn kinh dị, rùng rợn',
      'B. Đăng tải các bài viết chia sẻ mẹo vặt học tập hữu ích',
      'C. Bình luận góp ý tích cực trên các diễn đàn khoa học',
      'D. Tải các phần mềm mã nguồn mở miễn phí về sử dụng'
    ],
    correctIndex: 0,
    explanation: 'Theo Nghị định 15/2020/NĐ-CP Điều 101 khoản 1 điểm c: Cung cấp, chia sẻ thông tin miêu tả tỉ mỉ hành động chém, giết, tai nạn, kinh dị, rùng rợn là hành vi bị cấm và xử phạt.',
    referenceLaw: 'Điều 101 khoản 1 điểm c - NĐ 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q18',
    question: 'Tại sao việc gửi tin nhắn quảng cáo hàng loạt (thư rác) lại có thể trở thành hành vi vi phạm pháp luật?',
    options: [
      'A. Vì gửi quảng cáo luôn bị cấm ở mọi quốc gia',
      'B. Vì nếu gửi nhiều lần mà người nhận đã phản ứng không muốn tiếp nhận thì trở thành hành vi quấy nhiễu, vi phạm quy định chống thư rác',
      'C. Vì làm tốn tiền cước viễn thông của nhà mạng',
      'D. Vì nội dung thư rác luôn chứa mã độc phá hoại máy bay'
    ],
    correctIndex: 1,
    explanation: 'SGK trang 56: Bản chất quảng cáo không xấu, nhưng nếu gửi nhiều mà người nhận không muốn nhận hoặc đã phản ứng từ chối thì trở thành hành vi quấy nhiễu, vi phạm Nghị định 90/2008/NĐ-CP.',
    referenceLaw: 'SGK Tin học 10 KNTT - Trang 56',
    difficulty: 'medium'
  },
  {
    id: 'q19',
    question: 'Trong các ý kiến sau về việc chia sẻ thông tin trên mạng xã hội (SGK trang 62), ý kiến nào là ĐÚNG ĐẮN NHẤT?',
    options: [
      'A. Chúng ta có quyền đưa lên mạng xã hội tất cả các tin, miễn là tin đó không phải là tin giả',
      'B. Chúng ta có quyền đưa lên mạng xã hội tất cả các tin, miễn là không có hại đến cá nhân ai',
      'C. Chúng ta có quyền đưa lên mạng xã hội các tin bài hợp pháp, nhưng đồng thời phải cân nhắc tính xác thực và chuẩn mực đạo đức xã hội',
      'D. Chúng ta được phép đăng tải bất kỳ điều gì vì mạng xã hội đảm bảo tự do không giới hạn'
    ],
    correctIndex: 2,
    explanation: 'Luyện tập 1 SGK trang 62: Một tin không phải tin giả hay không hại ai chưa chắc đã được phép đưa lên (ví dụ: bí mật nhà nước, hình ảnh nhạy cảm, thông tin chưa kiểm chứng). Phải bảo đảm tính hợp pháp và chuẩn mực đạo đức.',
    referenceLaw: 'Luyện tập 1 - SGK Tin học 10 Trang 62',
    difficulty: 'medium'
  },
  {
    id: 'q20',
    question: 'Theo quy định hiện hành, cá nhân cung cấp, chia sẻ thông tin giả mạo, thông tin sai sự thật trên mạng xã hội có thể bị phạt tiền ở mức nào?',
    options: [
      'A. Từ 10 triệu đến 20 triệu đồng đối với tổ chức (cá nhân vi phạm chịu mức phạt bằng 1/2 tổ chức)',
      'B. Từ 100 nghìn đến 200 nghìn đồng',
      'C. Không bị phạt tiền, chỉ bị tước quyền sử dụng Internet',
      'D. Bị phạt từ 500 triệu đến 1 tỷ đồng trong mọi trường hợp'
    ],
    correctIndex: 0,
    explanation: 'Theo Nghị định 15/2020/NĐ-CP (sửa đổi bởi NĐ 14/2022/NĐ-CP), mức phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng đối với tổ chức; cá nhân có cùng hành vi vi phạm thì mức phạt bằng 1/2 (5.000.000 đến 10.000.000 đồng).',
    referenceLaw: 'Điều 101 Nghị định 15/2020/NĐ-CP',
    difficulty: 'hard'
  }
];
