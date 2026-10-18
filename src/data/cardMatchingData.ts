export interface TermDefinitionPair {
  id: string;
  term: string;
  definition: string;
  category: 'KhaiNiem' | 'Quyen' | 'TinHoc';
  sgkPage: number;
  highlightWords: string[];
}

export interface ScenarioCardItem {
  id: string;
  code: string;
  title: string;
  character: string;
  scenario: string;
  correctCategory: 'vi_pham_tai_san' | 'vi_pham_nhan_than' | 'ton_trong_ban_quyen' | 'hieu_sai_ban_chat';
  categoryTitle: string;
  correctVerdict: string;
  explanation: string;
  lawBasis: string;
  sgkPage: number;
}

export const TERM_DEFINITION_PAIRS: TermDefinitionPair[] = [
  {
    id: 'term1',
    term: 'Quyền tác giả',
    definition: 'Là quyền của tổ chức, cá nhân đối với tác phẩm do mình sáng tạo ra hoặc sở hữu (bao gồm quyền nhân thân và quyền tài sản).',
    category: 'KhaiNiem',
    sgkPage: 59,
    highlightWords: ['sáng tạo ra', 'sở hữu', 'quyền nhân thân', 'quyền tài sản']
  },
  {
    id: 'term2',
    term: 'Quyền nhân thân',
    definition: 'Gồm các quyền: Đặt tên cho tác phẩm; Đứng tên thật/bút danh; Được nêu tên khi tác phẩm được công bố; Công bố tác phẩm; Bảo vệ sự toàn vẹn của tác phẩm, cấm cắt xén, xuyên tạc.',
    category: 'Quyen',
    sgkPage: 59,
    highlightWords: ['Đặt tên', 'Đứng tên', 'Nêu tên', 'Công bố', 'Toàn vẹn']
  },
  {
    id: 'term3',
    term: 'Quyền tài sản',
    definition: 'Gồm các quyền khai thác kinh tế: Làm tác phẩm phái sinh; Sao chép tác phẩm; Truyền đạt tác phẩm đến công chúng; Cho thuê bản gốc hoặc bản sao chương trình máy tính.',
    category: 'Quyen',
    sgkPage: 59,
    highlightWords: ['Phái sinh', 'Sao chép', 'Truyền đạt', 'Cho thuê']
  },
  {
    id: 'term4',
    term: 'Sản phẩm tin học',
    definition: 'Gồm phần mềm, chương trình máy tính, cơ sở dữ liệu số; có đặc tính rất dễ sao chép với chi phí thấp và dễ phát tán trên quy mô lớn qua mạng.',
    category: 'TinHoc',
    sgkPage: 60,
    highlightWords: ['phần mềm', 'cơ sở dữ liệu', 'dễ sao chép', 'chi phí thấp']
  },
  {
    id: 'term5',
    term: 'Vi phạm bản quyền',
    definition: 'Hành vi chiếm đoạt, bẻ khóa, sao chép lậu, phân phối, sửa đổi hoặc sử dụng tác phẩm số mà không được phép của tác giả hoặc chủ sở hữu.',
    category: 'KhaiNiem',
    sgkPage: 60,
    highlightWords: ['chiếm đoạt', 'bẻ khóa', 'sao chép lậu', 'không được phép']
  },
  {
    id: 'term6',
    term: 'Giấy phép sử dụng (Licence)',
    definition: 'Quyền sử dụng phần mềm được tính theo số máy được cài đặt. Người dùng chỉ mua quyền sử dụng chứ không sở hữu bản quyền tác phẩm (ví dụ Windows, Office).',
    category: 'TinHoc',
    sgkPage: 61,
    highlightWords: ['số máy cài đặt', 'quyền sử dụng', 'không sở hữu bản quyền']
  },
  {
    id: 'term7',
    term: 'Tác phẩm phái sinh',
    definition: 'Tác phẩm dịch từ ngôn ngữ này sang ngôn ngữ khác, phóng tác, cải biên (ví dụ một phần mềm máy tính được cải biên để dùng trên điện thoại di động).',
    category: 'KhaiNiem',
    sgkPage: 59,
    highlightWords: ['dịch thuật', 'cải biên', 'chuyển thể di động']
  },
  {
    id: 'term8',
    term: 'Biện pháp kỹ thuật bảo vệ tác quyền',
    definition: 'Các công nghệ mã khóa, số đăng ký do chủ sở hữu thiết lập để bảo vệ tác phẩm. Hành vi phá khoá (crack) vô hiệu hoá biện pháp này sẽ bị pháp luật xử phạt.',
    category: 'TinHoc',
    sgkPage: 61,
    highlightWords: ['mã khóa', 'phá khoá crack', 'xử phạt']
  }
];

export const SCENARIO_CARDS: ScenarioCardItem[] = [
  {
    id: 'sc_card_1',
    code: 'TH-01',
    title: 'Hoàng mua USB nhạc lậu giá rẻ',
    character: 'Học sinh Hoàng',
    scenario: 'Hoàng mua chiếc USB giá rẻ chứa hàng trăm bài hát, video do người bán tải lậu từ mạng Internet về mà không hề có thoả thuận với ca sĩ, nhạc sĩ.',
    correctCategory: 'vi_pham_tai_san',
    categoryTitle: 'Vi phạm Quyền tài sản & Tiếp tay cho hàng lậu',
    correctVerdict: 'Người bán vi phạm quyền sao chép, truyền đạt tác phẩm; Hoàng tiếp tay tiêu thụ sản phẩm xâm phạm bản quyền.',
    explanation: 'SGK Trang 60: Việc bán USB chép nhạc lậu xâm phạm quyền sao chép và phân phối tác phẩm. Mua sản phẩm lậu làm tổn hại nghiêm trọng đến doanh thu của nghệ sĩ và nhà sản xuất.',
    lawBasis: 'Nghị định 131/2013/NĐ-CP & Hoạt động 4 SGK Trang 60',
    sgkPage: 60
  },
  {
    id: 'sc_card_2',
    code: 'TH-02',
    title: 'Lan cài đĩa phần mềm sang máy bạn thân',
    character: 'Học sinh Lan',
    scenario: 'Lan mua đĩa CD phần mềm diệt virus bản quyền (giấy phép 1 máy tính). Sau khi cài cho máy mình, Lan đem đĩa sang cài thêm cho máy bạn thân.',
    correctCategory: 'vi_pham_tai_san',
    categoryTitle: 'Vi phạm phạm vi Giấy phép sử dụng (Licence)',
    correctVerdict: 'Hành vi vi phạm bản quyền vì vượt quá số máy được phép cài đặt trong giấy phép sử dụng.',
    explanation: 'SGK Trang 61: "Quyền sử dụng phần mềm tính theo số máy được cài đặt. Nếu mua quyền sử dụng cho 1 máy, rồi lại cài đặt cho máy thứ hai là vi phạm bản quyền."',
    lawBasis: 'Mục c SGK Trang 61 - Tôn trọng bản quyền trong tin học',
    sgkPage: 61
  },
  {
    id: 'sc_card_3',
    code: 'TH-03',
    title: 'Bẻ khoá phần mềm (Crack) để thử tài',
    character: 'Lập trình viên trẻ',
    scenario: 'Bạn Thành tự nghiên cứu cách bẻ khoá (crack) một phần mềm biên tập video đắt tiền và tuyên bố: "Mình chỉ crack để thử trình độ chứ không dùng hay bán".',
    correctCategory: 'vi_pham_nhan_than',
    categoryTitle: 'Xâm hại Tính toàn vẹn & Vô hiệu hoá biện pháp bảo vệ',
    correctVerdict: 'Vi phạm pháp luật! Cố ý bẻ khoá, can thiệp mã nguồn và phá vỡ biện pháp kỹ thuật bảo vệ của tác giả.',
    explanation: 'Nghị định 131/2013/NĐ-CP cấm: "Cố ý huỷ bỏ hoặc làm vô hiệu các biện pháp kĩ thuật, công nghệ do chủ sở hữu quyền tác giả thiết lập để bảo vệ quyền tác giả".',
    lawBasis: 'Nghị định 131/2013/NĐ-CP & SGK Trang 61',
    sgkPage: 61
  },
  {
    id: 'sc_card_4',
    code: 'TH-04',
    title: 'Nhân viên nghỉ việc mang mã nguồn công ty',
    character: 'Nhân viên lập trình Tuấn',
    scenario: 'Tuấn khi nghỉ việc tại công ty công nghệ đã bí mật sao chép toàn bộ mã nguồn mình từng viết trong giờ làm việc để tự mở công ty tạo phần mềm cạnh tranh.',
    correctCategory: 'vi_pham_tai_san',
    categoryTitle: 'Chiếm đoạt mã phần mềm & Tài sản doanh nghiệp',
    correctVerdict: 'Vi phạm nghiêm trọng về chiếm đoạt mã nguồn phần mềm thuộc quyền sở hữu của công ty.',
    explanation: 'SGK Trang 60: Nhân viên phát triển phần mềm cho công ty là tác giả nhưng công ty mới là chủ sở hữu phần mềm đó. Tự ý lấy mã nguồn để cạnh tranh là hành vi chiếm đoạt mã phần mềm.',
    lawBasis: 'Luật Sở hữu trí tuệ 2019 & SGK Trang 60',
    sgkPage: 60
  },
  {
    id: 'sc_card_5',
    code: 'TH-05',
    title: 'Quan niệm "Không biết là không có lỗi"',
    character: 'Bạn Bình',
    scenario: 'Bình dùng phần mềm lậu, khi bạn bè nhắc nhở thì Bình cho rằng: "Trước đây mình không biết gì về luật bản quyền, mà không biết thì không có lỗi".',
    correctCategory: 'hieu_sai_ban_chat',
    categoryTitle: 'Nhận thức sai lầm về Trách nhiệm pháp lý',
    correctVerdict: 'Nhận thức hoàn toàn sai! Không hiểu biết pháp luật không bao giờ là căn cứ để miễn trừ trách nhiệm pháp lý.',
    explanation: 'Vận dụng 2 SGK Trang 62: Mỗi công dân phải tự giác tìm hiểu và tuân thủ luật. Khi biết sai cần lập tức khắc phục, xoá bỏ phần mềm lậu và chuyển sang phần mềm hợp pháp/mã nguồn mở.',
    lawBasis: 'Vận dụng 2 - SGK Trang 62',
    sgkPage: 62
  },
  {
    id: 'sc_card_6',
    code: 'TH-06',
    title: 'Google mua lại toàn bộ YouTube',
    character: 'Tập đoàn công nghệ',
    scenario: 'Google mua lại toàn bộ nền tảng chia sẻ video YouTube để có quyền khai thác thương mại, nâng cấp và kinh doanh.',
    correctCategory: 'ton_trong_ban_quyen',
    categoryTitle: 'Mua trọn vẹn Bản quyền (Copyright Purchase)',
    correctVerdict: 'Hợp pháp và đúng chuẩn mực; mua bản quyền cho phép người mua có toàn quyền khai thác kinh doanh đối với tác phẩm số.',
    explanation: 'SGK Trang 61: "Khi mua bản quyền thì người mua có quyền thực hiện các hoạt động kinh doanh đối với tác phẩm đó giống như cách Google mua Youtube."',
    lawBasis: 'Mục c SGK Trang 61',
    sgkPage: 61
  }
];
