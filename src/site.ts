// 사이트 공통 정보. 이름과 연락처 이메일은 실제 값으로 바꾸세요.
export const SITE = {
  name: 'Kitwise',
  email: 'shoploom201@gmail.com',

  /**
   * Google AdSense — 승인 후에만 채우세요. 비어 있으면 광고 스크립트도 빈칸도 나오지 않습니다.
   * client: 게시자 ID (예: 'ca-pub-1234567890123456') — AdSense > 계정 > 계정 정보
   * slots : 광고 단위 ID (숫자). AdSense > 광고 > 광고 단위 기준 > "디스플레이 광고"를 3개 만들어 각각의 data-ad-slot 값을 넣으세요.
   *   afterTool     ① 도구 바로 아래 (사용법 위)
   *   inContent     ② 사용법과 자주 묻는 질문 사이 / 홈 화면 중간
   *   beforeRelated ③ "다른 도구" 목록 위
   * 모바일 하단 고정 광고는 AdSense > 광고 > 자동 광고 > "앵커 광고"만 켜면 됩니다 (코드 수정 불필요).
   */
  adsense: {
    client: 'ca-pub-1048719836225594',
    slots: { afterTool: '', inContent: '', beforeRelated: '' },
  },
};
