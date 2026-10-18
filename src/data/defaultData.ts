import { WordItem, QuizQuestion, MatchCard, ScenarioQuestion } from '../types';

export const DEFAULT_WORDS: WordItem[] = [
  {
    id: 'w1',
    word: 'BATNATMANG',
    displayWord: 'BAT NAT MANG',
    vietnameseWord: 'Bắt nạt qua mạng',
    clue: 'Hành vi công kích, chửi bới, đe dọa hoặc cô lập nạn nhân trên môi trường số.',
    explanation: 'Bắt nạt qua mạng (Cyberbullying) gây tổn thương tâm lý sâu sắc cho nạn nhân, vi phạm chuẩn mực đạo đức và có thể bị truy cứu trách nhiệm pháp lý nếu xúc phạm nghiêm trọng nhân phẩm người khác.',
    category: 'daoduc',
  },
  {
    id: 'w2',
    word: 'TINRAC',
    displayWord: 'TIN RAC',
    vietnameseWord: 'Tin nhắn / Thư rác',
    clue: 'Gửi thư điện tử, tin nhắn quảng cáo hàng loạt mà người nhận không mong muốn.',
    explanation: 'Theo Nghị định 90/2008/NĐ-CP, việc phát tán thư rác, tin nhắn rác không có sự đồng ý của người nhận gây phiền toái, quá tải hệ thống và vi phạm pháp luật.',
    category: 'phapluat',
  },
  {
    id: 'w3',
    word: 'DUATINSAI',
    displayWord: 'DUA TIN SAI',
    vietnameseWord: 'Đưa tin không phù hợp / sai sự thật',
    clue: 'Đăng tải hoặc chia sẻ thông tin chưa kiểm chứng, tin bịa đặt gây hoang mang.',
    explanation: 'Hành vi đưa tin sai sự thật hoặc tiếp tay chia sẻ tin giả trên không gian mạng bị xử phạt hành chính theo Điều 101 Nghị định 15/2020/NĐ-CP.',
    category: 'phapluat',
  },
  {
    id: 'w4',
    word: 'BANQUYEN',
    displayWord: 'BAN QUYEN',
    vietnameseWord: 'Vi phạm bản quyền',
    clue: 'Sử dụng phần mềm lậu, bẻ khóa crack, sao chép trái phép dữ liệu của người khác.',
    explanation: 'Sản phẩm số dễ bị sao chép với chi phí rất thấp. Vi phạm bản quyền làm tổn hại hoạt động kinh doanh của tác giả và vi phạm Luật Sở hữu trí tuệ.',
    category: 'phapluat',
  },
  {
    id: 'w5',
    word: 'THIEUVANHOA',
    displayWord: 'THIEU VAN HOA',
    vietnameseWord: 'Ứng xử thiếu văn hoá',
    clue: 'Tranh luận thiếu tôn trọng, chửi tục, công kích sỉ nhục lẫn nhau trên diễn đàn mạng.',
    explanation: 'Môi trường số văn minh đòi hỏi người dùng tuân thủ Bộ Quy tắc ứng xử mạng xã hội (Quyết định 874/QĐ-BTTTT), giữ thái độ tôn trọng và văn minh.',
    category: 'vanhoa',
  },
  {
    id: 'w6',
    word: 'LOITHONGTIN',
    displayWord: 'LOI THONG TIN',
    vietnameseWord: 'Lộ / Công bố thông tin cá nhân trái phép',
    clue: 'Đăng hình ảnh, số điện thoại, đời tư người khác lên mạng khi chưa được phép.',
    explanation: 'Việc tự ý công bố thông tin đời tư, danh bạ, địa chỉ cá nhân người khác lên mạng vi phạm quyền bí mật đời tư được pháp luật bảo vệ.',
    category: 'phapluat',
  },
  {
    id: 'w7',
    word: 'ANDANH',
    displayWord: 'AN DANH',
    vietnameseWord: 'Giao tiếp ẩn danh tiêu cực',
    clue: 'Đặc điểm giao tiếp trên mạng khiến kẻ xấu dễ bạo dạn và khó kiểm soát hành vi.',
    explanation: 'Tính ẩn danh trên không gian mạng là một yếu tố khiến các hành vi xấu có xu hướng gia tăng và trầm trọng hơn so với đời thực.',
    category: 'chung',
  },
  {
    id: 'w8',
    word: 'LUADATMANG',
    displayWord: 'LUA DAT MANG',
    vietnameseWord: 'Lừa đảo qua mạng',
    clue: 'Các thủ đoạn giả mạo, chiếm đoạt tài sản trên Internet rất tinh vi.',
    explanation: 'Lừa đảo qua mạng diễn ra dưới nhiều hình thức tinh vi (chiếm tài khoản, lừa nạp tiền, mạo danh cơ quan chức năng) gây thiệt hại tài sản lớn.',
    category: 'phapluat',
  },
];

export const DEFAULT_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Một trong những trách nhiệm quan trọng nhất của người đưa tin lên Internet theo SGK Tin 10 KNTT là gì?',
    options: [
      'Đảm bảo tốc độ đăng bài nhanh nhất có thể',
      'Đảm bảo tính đúng đắn của thông tin',
      'Thu hút càng nhiều lượt thích (like) và bình luận càng tốt',
      'Giữ kín danh tính của người viết bài'
    ],
    correctIndex: 1,
    explanation: 'Theo SGK Tin 10 trang 57: "Một trong những trách nhiệm quan trọng nhất của người đưa tin lên Internet là đảm bảo tính đúng đắn của thông tin."',
    referenceLaw: 'SGK Tin 10 KNTT - Mục 2b Trang 57',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Theo Điều 12 khoản 2 của Luật Công nghệ thông tin (2006), hành vi nào sau đây bị nghiêm cấm?',
    options: [
      'Xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm, uy tín của công dân',
      'Chia sẻ các kiến thức học tập bổ ích về công nghệ thông tin',
      'Tìm kiếm tài liệu học tập trên các công cụ tìm kiếm',
      'Sử dụng mạng xã hội để giao lưu, học hỏi với bạn bè'
    ],
    correctIndex: 0,
    explanation: 'Điều 12 khoản 2 Luật CNTT nghiêm cấm: Xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm, uy tín của công dân; kích động bạo lực, dâm ô, đồi trụy; tiết lộ bí mật nhà nước...',
    referenceLaw: 'Điều 12 khoản 2 - Luật Công nghệ thông tin (2006)',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    question: 'Một cá nhân chia sẻ lại tin giả mạo: "Bắt đầu từ ngày mai, toàn thành phố sẽ bị phong toả trong 14 ngày...". Người này phân bua: "Tôi chỉ chia sẻ lại tin của người khác chứ không tự bịa ra". Người này có vi phạm không?',
    options: [
      'Không vi phạm vì người đó không phải là tác giả tạo ra tin đồn',
      'Có vi phạm pháp luật, việc chia sẻ tin bài sai sự thật cũng là hành vi vi phạm và tiếp tay cho việc tung tin giả',
      'Chỉ vi phạm đạo đức, không thể bị xử phạt pháp lý',
      'Chỉ bị nhắc nhở nhẹ nhàng nếu xoá bài ngay sau đó'
    ],
    correctIndex: 1,
    explanation: 'Theo SGK Tin 10 trang 58 & 62: Chia sẻ tin bài sai sự thật chính là tiếp tay cho hành vi tung tin giả. Pháp luật xử phạt cả người khởi xướng lẫn người cung cấp, chia sẻ thông tin giả mạo.',
    referenceLaw: 'Điều 101 Nghị định 15/2020/NĐ-CP & Luyện tập 2 Trang 62',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'Theo Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP, việc đăng tải video bạo lực học đường, cổ vũ đánh nhau lên mạng xã hội là hành vi gì?',
    options: [
      'Hành vi sáng tạo nội dung giải trí không bị kiểm duyệt',
      'Cung cấp, chia sẻ thông tin miêu tả tỉ mỉ hành động chém, giết, kích động bạo lực (bị xử phạt tiền)',
      'Hành vi chỉ thuộc phạm trù nhắc nhở ở nhà trường',
      'Hành vi hợp pháp nếu nạn nhân không lên tiếng'
    ],
    correctIndex: 1,
    explanation: 'Điều 101 Nghị định 15/2020/NĐ-CP phạt tiền đối với hành vi cung cấp, chia sẻ thông tin kích động bạo lực, tội ác, tệ nạn xã hội hoặc miêu tả hành động chém, giết, rùng rợn.',
    referenceLaw: 'Điều 101 khoản 1 điểm c, d - Nghị định 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    question: 'Bộ Thông tin và Truyền thông đã ban hành Bộ Quy tắc ứng xử trên mạng xã hội theo văn bản nào?',
    options: [
      'Quyết định số 874/QĐ-BTTTT ngày 17/6/2021',
      'Luật An ninh mạng năm 2018',
      'Nghị định 72/2013/NĐ-CP',
      'Thông tư số 12/2020/TT-BTTTT'
    ],
    correctIndex: 0,
    explanation: 'SGK trang 58: "Tháng 6/2021, Bộ Thông tin và Truyền thông đã ban hành Bộ Quy tắc ứng xử trên mạng xã hội theo Quyết định số 874/QĐ-BTTTT ban hành ngày 17/6/2021."',
    referenceLaw: 'Quyết định 874/QĐ-BTTTT',
    difficulty: 'hard'
  },
  {
    id: 'q6',
    question: 'Quảng cáo sai sự thật về công dụng chữa bách bệnh của một loại thuốc trên Facebook sẽ bị xử phạt theo quy định nào?',
    options: [
      'Không bị phạt vì quảng cáo là tự do thương mại cá nhân',
      'Xử phạt theo Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP về thông tin sai sự thật, quảng cáo hàng hoá bị cấm/sai lệch',
      'Chỉ bị Facebook khoá tài khoản tạm thời',
      'Chỉ bị phạt nếu người mua uống thuốc bị ngộ độc'
    ],
    correctIndex: 1,
    explanation: 'Hành vi cung cấp thông tin sai sự thật hoặc quảng cáo hàng hoá, dịch vụ sai lệch bị xử phạt vi phạm hành chính căn cứ Điều 101 Nghị định 15/2020/NĐ-CP.',
    referenceLaw: 'Điều 101 khoản 1 - Nghị định 15/2020/NĐ-CP',
    difficulty: 'medium'
  },
  {
    id: 'q7',
    question: 'Khi chia sẻ thông tin trên môi trường số, đâu KHÔNG PHẢI là nguyên tắc đúng đắn?',
    options: [
      'Trước khi đăng tin, hãy kiểm tra tin bài có vi phạm pháp luật hay không',
      'Thấy tin giật gân, hấp dẫn thì bấm chia sẻ ngay để bạn bè xem trước mà không cần kiểm chứng',
      'Không chia sẻ tin bài vi phạm pháp luật hoặc tin giả mạo',
      'Cân nhắc hậu quả về mặt đạo đức đối với người khác trước khi đăng'
    ],
    correctIndex: 1,
    explanation: 'Nguyên tắc an toàn (trang 58 SGK) yêu cầu: Kiểm tra kỹ, không chia sẻ tin vi phạm, nhận biết tin giả và luôn cân nhắc khía cạnh đạo đức trước khi đăng.',
    referenceLaw: 'Nguyên tắc an toàn chia sẻ thông tin - SGK Trang 58',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    question: 'Nếu đăng trên mạng xã hội nhận xét có tính xúc phạm đến một người khác thì hành vi này là:',
    options: [
      'Chắc chắn chỉ là chuyện xích mích đạo đức cá nhân',
      'Tuỳ theo mức độ, có thể vi phạm đạo đức hay vi phạm pháp luật (xúc phạm danh dự, nhân phẩm)',
      'Không vi phạm gì vì mạng xã hội là thế giới ảo',
      'Chỉ vi phạm pháp luật nếu dùng nick chính chủ'
    ],
    correctIndex: 1,
    explanation: 'Câu hỏi Vận dụng 1 (Trang 62 SGK): Tuỳ theo mức độ và hậu quả, hành vi xúc phạm người khác có thể dừng ở mức vi phạm đạo đức hoặc trở thành vi phạm pháp luật bị xử phạt hành chính, thậm chí hình sự.',
    referenceLaw: 'SGK Tin 10 KNTT - Vận dụng 1 Trang 62',
    difficulty: 'medium'
  }
];

export const DEFAULT_MATCH_CARDS: MatchCard[] = [
  // Quyền nhân thân
  {
    id: 'nt1',
    content: 'Đặt tên cho tác phẩm do mình sáng tạo',
    category: 'nhan_than',
    categoryLabel: 'Quyền nhân thân',
    explanation: 'Chỉ tác giả mới có quyền đặt tên cho đứa con tinh thần của mình.'
  },
  {
    id: 'nt2',
    content: 'Đứng tên thật hoặc bút danh trên tác phẩm',
    category: 'nhan_than',
    categoryLabel: 'Quyền nhân thân',
    explanation: 'Quyền được gắn tên tuổi, bút danh cá nhân khi tác phẩm được công bố.'
  },
  {
    id: 'nt3',
    content: 'Được nêu tên khi tác phẩm được công bố, sử dụng',
    category: 'nhan_than',
    categoryLabel: 'Quyền nhân thân',
    explanation: 'Bất kỳ ai trích dẫn hay sử dụng đều phải tôn trọng nêu tên tác giả.'
  },
  {
    id: 'nt4',
    content: 'Công bố tác phẩm hoặc cho phép người khác công bố tác phẩm',
    category: 'nhan_than',
    categoryLabel: 'Quyền nhân thân',
    explanation: 'Quyết định thời điểm và hình thức đưa tác phẩm ra mắt công chúng.'
  },
  {
    id: 'nt5',
    content: 'Bảo vệ sự toàn vẹn của tác phẩm, cấm cắt xén, xuyên tạc',
    category: 'nhan_than',
    categoryLabel: 'Quyền nhân thân',
    explanation: 'Ngăn chặn hành vi bóp méo, cắt xén gây phương hại đến uy tín tác giả.'
  },

  // Quyền tài sản
  {
    id: 'ts1',
    content: 'Làm tác phẩm phái sinh (dịch ngữ, chuyển thể)',
    category: 'tai_san',
    categoryLabel: 'Quyền tài sản',
    explanation: 'Tạo bản dịch, chuyển thể ứng dụng máy tính sang điện thoại di động mang lại giá trị kinh tế.'
  },
  {
    id: 'ts2',
    content: 'Sao chép tác phẩm (trực tiếp hoặc gián tiếp)',
    category: 'tai_san',
    categoryLabel: 'Quyền tài sản',
    explanation: 'Quyền nhân bản, in ấn, tạo các bản copy để bán hoặc phân phối.'
  },
  {
    id: 'ts3',
    content: 'Truyền đạt tác phẩm đến công chúng qua mạng, phát sóng',
    category: 'tai_san',
    categoryLabel: 'Quyền tài sản',
    explanation: 'Đưa phần mềm, âm nhạc, video lên nền tảng số để thu phí hoặc khai thác thương mại.'
  },
  {
    id: 'ts4',
    content: 'Cho thuê bản gốc hoặc bản sao chương trình máy tính',
    category: 'tai_san',
    categoryLabel: 'Quyền tài sản',
    explanation: 'Khai thác thương mại thông qua hình thức cho thuê phần mềm hoặc dữ liệu.'
  }
];

export const DEFAULT_SCENARIOS: ScenarioQuestion[] = [
  {
    id: 'sc1',
    title: 'Tình huống 1: Mua USB nhạc giá rẻ',
    situation: 'Hoàng mua với giá rất rẻ một thẻ nhớ USB chứa hàng trăm video âm nhạc mà người bán đã sưu tầm từ trên Internet về, không có thoả thuận gì với các ca sĩ hay tác giả bản quyền.',
    questionText: 'Trong tình huống trên, ai là người vi phạm bản quyền?',
    options: [
      {
        text: 'Chỉ người bán vi phạm vì họ sao chép lậu và kinh doanh trái phép; Hoàng là người mua nên vô can.',
        isCorrect: false,
        feedback: 'Người bán vi phạm nghiêm trọng quyền sao chép và phân phối. Tuy nhiên, Hoàng mua và tiêu thụ sản phẩm số vi phạm bản quyền cũng là tiếp tay cho hành vi phi pháp.'
      },
      {
        text: 'Người bán vi phạm quyền sao chép, phân phối tác phẩm lậu; việc mua và sử dụng sản phẩm lậu cũng là hành vi tiếp tay cho vi phạm bản quyền.',
        isCorrect: true,
        feedback: 'Chính xác! Theo SGK trang 60: Người bán sao chép trái phép để trục lợi vi phạm pháp luật. Việc người dùng mua đồ lậu làm triệt tiêu động lực sáng tạo của nghệ sĩ.'
      },
      {
        text: 'Cả hai đều không vi phạm vì các bài hát đó đã được ca sĩ công khai trên Internet.',
        isCorrect: false,
        feedback: 'Sai. Việc tác giả đăng bài hát lên mạng không đồng nghĩa với việc cho phép người khác tải về sao chép ra USB đem bán kiếm lời.'
      }
    ],
    lessonTakeaway: 'Sản phẩm số dễ bị sao chép với chi phí rất thấp. Mua sản phẩm vi phạm bản quyền gây thiệt hại trực tiếp đến tác giả và nhà đầu tư.',
    sgkActivityRef: 'Hoạt động 4 - Câu 1 (SGK Trang 60)'
  },
  {
    id: 'sc2',
    title: 'Tình huống 2: Cài thêm phần mềm sang máy bạn thân',
    situation: 'Lan mua một phần mềm diệt virus có bản quyền trên đĩa CD (giấy phép dùng cho 1 máy tính cá nhân). Sau khi cài lên máy tính của mình, Lan mang đĩa sang cài thêm cho máy của bạn thân.',
    questionText: 'Hành vi cài thêm của Lan có vi phạm bản quyền không? Tại sao?',
    options: [
      {
        text: 'Có vi phạm. Vì Lan chỉ mua "quyền sử dụng" cho 01 máy; cài thêm cho máy thứ hai là vi phạm thoả thuận bản quyền phần mềm.',
        isCorrect: true,
        feedback: 'Chính xác! SGK Trang 61 nêu rõ: "Quyền sử dụng phần mềm tính theo số máy được cài đặt. Nếu mua quyền sử dụng cho 1 máy, rồi lại cài đặt cho máy thứ 2 là vi phạm bản quyền."'
      },
      {
        text: 'Không vi phạm vì Lan đã bỏ tiền mua đĩa CD đó rồi nên đĩa thuộc quyền sở hữu trọn vẹn của Lan.',
        isCorrect: false,
        feedback: 'Sai lầm phổ biến! Mua đĩa chỉ là mua quyền sử dụng (licence) với số máy hạn định, bản quyền phần mềm vẫn thuộc nhà sản xuất.'
      },
      {
        text: 'Không vi phạm vì Lan cài cho bạn thân phi lợi nhuận, không lấy tiền.',
        isCorrect: false,
        feedback: 'Sai. Dù không thu tiền, việc cài vượt quá số lượng máy quy định trong bản quyền vẫn là vi phạm bản quyền.'
      }
    ],
    lessonTakeaway: 'Cần phân biệt rõ giữa "Mua bản quyền" và "Mua quyền sử dụng (Licence)". Hầu hết người dùng cá nhân chỉ mua quyền sử dụng theo số máy quy định.',
    sgkActivityRef: 'Hoạt động 4 - Câu 2 (SGK Trang 60 & Trang 61)'
  },
  {
    id: 'sc3',
    title: 'Tình huống 3: Bẻ khoá (Crack) chỉ để thử tay nghề',
    situation: 'Thành tự mày mò kỹ thuật và bẻ khoá thành công một phần mềm đồ hoạ đắt tiền. Thành nói: "Mình chỉ crack để thử khả năng lập trình của mình chứ không dùng và cũng không bán cho ai".',
    questionText: 'Quan niệm và hành vi của Thành có đúng không?',
    options: [
      {
        text: 'Đúng, vì Thành chỉ nghiên cứu khoa học và không thu lợi nhuận.',
        isCorrect: false,
        feedback: 'Sai. Nghị định 131/2013/NĐ-CP cấm cố ý bẻ khóa hoặc vô hiệu hoá các biện pháp kỹ thuật bảo vệ tác phẩm.'
      },
      {
        text: 'Sai. Việc vô hiệu hoá biện pháp kỹ thuật của chủ sở hữu và can thiệp mã phần mềm là hành vi vi phạm pháp luật về quyền tác giả.',
        isCorrect: true,
        feedback: 'Chính xác! SGK Trang 60 & 61: "Cố ý huỷ bỏ hoặc làm vô hiệu các biện pháp kĩ thuật, công nghệ do chủ sở hữu quyền tác giả thiết lập để bảo vệ quyền tác giả đối với tác phẩm của mình" sẽ bị xử phạt.'
      },
      {
        text: 'Chỉ vi phạm nếu Thành chia sẻ file crack đó lên mạng.',
        isCorrect: false,
        feedback: 'Sai. Ngay bản thân hành vi bẻ khoá, can thiệp vào tính toàn vẹn của phần mềm đã là hành vi vi phạm.'
      }
    ],
    lessonTakeaway: 'Phá khoá phần mềm, vô hiệu hoá biện pháp kỹ thuật bảo vệ tác quyền là hành vi vi phạm pháp luật quy định tại Nghị định 131/2013/NĐ-CP.',
    sgkActivityRef: 'Mục b, c Trang 60 - 61'
  },
  {
    id: 'sc4',
    title: 'Tình huống 4: "Trước đây mình không biết, không biết là không có lỗi"',
    situation: 'An nhắc Bình về việc Bình dùng phần mềm lậu và giảng giải cho Bình các quy định về quyền tác giả. Nghe xong, Bình bảo: "Trước đây mình không biết, mà không biết là không có lỗi".',
    questionText: 'Quan niệm của bạn Bình có đúng theo pháp luật và đạo đức không?',
    options: [
      {
        text: 'Bình nói đúng vì nguyên tắc là ai chưa biết thì không thể coi là có tội.',
        isCorrect: false,
        feedback: 'Sai. Trong pháp luật có nguyên tắc: Mọi công dân đều phải sống và làm việc theo pháp luật; không hiểu biết pháp luật không phải là căn cứ miễn trừ trách nhiệm.'
      },
      {
        text: 'Bình nói sai. Việc không biết pháp luật không loại trừ trách nhiệm pháp lý khi đã thực hiện hành vi vi phạm. Sau khi được nhắc nhở, Bình cần dừng sử dụng và tôn trọng bản quyền.',
        isCorrect: true,
        feedback: 'Rất chính xác! SGK Trang 62 (Vận dụng 2): Không hiểu biết pháp luật không phải lý do bào chữa cho hành vi vi phạm bản quyền. Mỗi học sinh cần tự giác tìm hiểu và tôn trọng quyền tác giả.'
      },
      {
        text: 'Bình chỉ sai nếu tiếp tục dùng trong vòng 1 năm nữa.',
        isCorrect: false,
        feedback: 'Sai. Cần thay đổi nhận thức và hành vi ngay khi nhận thức được vấn đề bản quyền.'
      }
    ],
    lessonTakeaway: 'Tôn trọng bản quyền là trách nhiệm và chuẩn mực đạo đức của người công dân số. "Không biết" không thể là cái cớ để dung túng cho phần mềm lậu.',
    sgkActivityRef: 'Vận dụng 2 (SGK Trang 62)'
  }
];

export const SAMPLE_STUDENT_NAMES = [
  'Nguyễn Văn An', 'Trần Thị Mai', 'Lê Hoàng Nam', 'Phạm Minh Khôi',
  'Đỗ Thuỳ Dung', 'Vũ Quốc Bảo', 'Hoàng Thuỳ Linh', 'Bùi Đức Trọng',
  'Ngô Thanh Hằng', 'Đặng Gia Huy', 'Hồ Diệu My', 'Lương Tuấn Kiệt',
  'Trịnh Phương Thảo', 'Dương Khắc Việt', 'Võ Hồng Ngọc', 'Phan Tiến Đạt'
];
