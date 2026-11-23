// 여행 회화집: 상황별 30문장 × 8개 언어. 값이 [존댓말, 반말] 이면 두 가지, 문자열 하나면 같은 표현.
// hg = 한국어 사용자를 위한 한글 발음 표기, ro = 라틴 문자 발음 (일본어·한국어·중국어·힌디어)
// 발음 표기는 대략적인 안내이며 정확한 소리는 🔊 음성으로 확인하도록 안내함.
import type { Locale } from '../i18n';

export type Text = string | [formal: string, casual: string];
export type Situation = 'basic' | 'transport' | 'hotel' | 'food' | 'shop' | 'emergency';
export interface Phrase {
  sit: Situation;
  t: Record<Locale, Text>;
  hg: Partial<Record<Locale, Text>>;
  ro: Partial<Record<'ja' | 'ko' | 'zh-hant' | 'hi', Text>>;
}

export const SITUATIONS: Situation[] = ['basic', 'transport', 'hotel', 'food', 'shop', 'emergency'];
export const SPEECH_LANG: Record<Locale, string> = { en: 'en-US', ko: 'ko-KR', ja: 'ja-JP', es: 'es-ES', de: 'de-DE', fr: 'fr-FR', 'zh-hant': 'zh-TW', hi: 'hi-IN' };
/** 기본으로 보여 줄 상대 언어 (화면 언어별) */
export const DEFAULT_TARGET: Record<Locale, Locale> = { ko: 'ja', en: 'es', ja: 'ko', es: 'en', de: 'en', fr: 'en', 'zh-hant': 'ja', hi: 'en' };

export const PHRASES: Phrase[] = [
  // ---------------- 기본 ----------------
  { sit: 'basic',
    t: { en: ['Hello.', 'Hi.'], ko: ['안녕하세요.', '안녕.'], ja: ['こんにちは。', 'やあ。'], 'zh-hant': ['您好。', '你好。'], es: ['Buenos días.', 'Hola.'], fr: ['Bonjour.', 'Salut.'], de: ['Guten Tag.', 'Hallo.'], hi: 'नमस्ते।' },
    hg: { en: ['헬로.', '하이.'], ja: ['곤니치와.', '야아.'], 'zh-hant': ['닌 하오.', '니 하오.'], es: ['부에노스 디아스.', '올라.'], fr: ['봉주르.', '살뤼.'], de: ['구텐 탁.', '할로.'], hi: '나마스테.' },
    ro: { ja: ['Konnichiwa.', 'Yaa.'], ko: ['Annyeonghaseyo.', 'Annyeong.'], 'zh-hant': ['Nín hǎo.', 'Nǐ hǎo.'], hi: 'Namaste.' } },
  { sit: 'basic',
    t: { en: ['Thank you very much.', 'Thanks!'], ko: ['감사합니다.', '고마워.'], ja: ['ありがとうございます。', 'ありがとう。'], 'zh-hant': ['非常感謝您。', '謝謝。'], es: ['Muchas gracias.', '¡Gracias!'], fr: ['Merci beaucoup.', 'Merci !'], de: ['Vielen Dank.', 'Danke!'], hi: ['बहुत धन्यवाद।', 'शुक्रिया!'] },
    hg: { en: ['땡큐 베리 머치.', '땡스!'], ja: ['아리가토 고자이마스.', '아리가토.'], 'zh-hant': ['페이창 간셰 닌.', '셰셰.'], es: ['무차스 그라시아스.', '그라시아스!'], fr: ['메르시 보쿠.', '메르시!'], de: ['필렌 당크.', '당케!'], hi: ['바후트 단야바드.', '슈크리야!'] },
    ro: { ja: ['Arigatō gozaimasu.', 'Arigatō.'], ko: ['Gamsahamnida.', 'Gomawo.'], 'zh-hant': ['Fēicháng gǎnxiè nín.', 'Xièxie.'], hi: ['Bahut dhanyavaad.', 'Shukriya!'] } },
  { sit: 'basic',
    t: { en: ['Excuse me.', 'Sorry.'], ko: ['실례합니다.', '미안해.'], ja: ['すみません。', 'ごめんね。'], 'zh-hant': ['不好意思。', '抱歉。'], es: ['Disculpe.', 'Perdón.'], fr: ['Excusez-moi.', 'Pardon.'], de: ['Entschuldigen Sie.', 'Entschuldigung.'], hi: ['माफ़ कीजिए।', 'माफ़ करना।'] },
    hg: { en: ['익스큐즈 미.', '쏘리.'], ja: ['스미마센.', '고멘네.'], 'zh-hant': ['부 하오이쓰.', '바오첸.'], es: ['디스쿨페.', '페르돈.'], fr: ['엑스퀴제 무아.', '파르동.'], de: ['엔트슐디겐 지.', '엔트슐디궁.'], hi: ['마프 키지에.', '마프 카르나.'] },
    ro: { ja: ['Sumimasen.', 'Gomen ne.'], ko: ['Sillyehamnida.', 'Mianhae.'], 'zh-hant': ['Bù hǎoyìsi.', 'Bàoqiàn.'], hi: ['Maaf kijiye.', 'Maaf karna.'] } },
  { sit: 'basic',
    t: { en: 'Sorry, I don’t understand.', ko: ['죄송하지만 잘 모르겠어요.', '잘 모르겠어.'], ja: ['すみません、わかりません。', 'ごめん、わからない。'], 'zh-hant': '抱歉，我聽不懂。', es: ['Perdone, no entiendo.', 'Perdona, no entiendo.'], fr: 'Désolé, je ne comprends pas.', de: 'Entschuldigung, ich verstehe das nicht.', hi: ['माफ़ कीजिए, मुझे समझ नहीं आया।', 'सॉरी, समझ नहीं आया।'] },
    hg: { en: '쏘리, 아이 돈트 언더스탠드.', ja: ['스미마센, 와카리마센.', '고멘, 와카라나이.'], 'zh-hant': '바오첸, 워 팅 부 둥.', es: ['페르도네, 노 엔티엔도.', '페르도나, 노 엔티엔도.'], fr: '데졸레, 즈 느 콩프랑 파.', de: '엔트슐디궁, 이히 페어슈테에 다스 니히트.', hi: ['마프 키지에, 무제 사마즈 나힌 아야.', '소리, 사마즈 나힌 아야.'] },
    ro: { ja: ['Sumimasen, wakarimasen.', 'Gomen, wakaranai.'], ko: ['Joesonghajiman jal moreugesseoyo.', 'Jal moreugesseo.'], 'zh-hant': 'Bàoqiàn, wǒ tīng bù dǒng.', hi: ['Maaf kijiye, mujhe samajh nahin aaya.', 'Sorry, samajh nahin aaya.'] } },
  { sit: 'basic',
    t: { en: 'Do you speak English?', ko: ['영어 하실 수 있으세요?', '영어 할 줄 알아?'], ja: ['英語を話せますか？', '英語話せる？'], 'zh-hant': ['您會說英文嗎？', '你會說英文嗎？'], es: ['¿Habla inglés?', '¿Hablas inglés?'], fr: ['Parlez-vous anglais ?', 'Tu parles anglais ?'], de: ['Sprechen Sie Englisch?', 'Sprichst du Englisch?'], hi: ['क्या आप अंग्रेज़ी बोलते हैं?', 'क्या तुम अंग्रेज़ी बोलते हो?'] },
    hg: { en: '두 유 스피크 잉글리시?', ja: ['에이고오 하나세마스카?', '에이고 하나세루?'], 'zh-hant': ['닌 후이 숴 잉원 마?', '니 후이 숴 잉원 마?'], es: ['아블라 잉글레스?', '아블라스 잉글레스?'], fr: ['파를레 부 앙글레?', '튀 파를 앙글레?'], de: ['슈프레헨 지 엥글리시?', '슈프리히스트 두 엥글리시?'], hi: ['캬 아프 앙그레지 볼테 헹?', '캬 툼 앙그레지 볼테 호?'] },
    ro: { ja: ['Eigo o hanasemasu ka?', 'Eigo hanaseru?'], ko: ['Yeongeo hasil su isseuseyo?', 'Yeongeo hal jul ara?'], 'zh-hant': ['Nín huì shuō Yīngwén ma?', 'Nǐ huì shuō Yīngwén ma?'], hi: ['Kya aap angrezi bolte hain?', 'Kya tum angrezi bolte ho?'] } },
  { sit: 'basic',
    t: { en: ['Could you speak more slowly, please?', 'Can you speak slower?'], ko: ['조금 천천히 말씀해 주시겠어요?', '좀 천천히 말해 줄래?'], ja: ['もう少しゆっくり話していただけますか？', 'もうちょっとゆっくり話して。'], 'zh-hant': ['可以請您說慢一點嗎？', '你可以說慢一點嗎？'], es: ['¿Podría hablar más despacio, por favor?', '¿Puedes hablar más despacio?'], fr: ['Pourriez-vous parler plus lentement, s’il vous plaît ?', 'Tu peux parler plus lentement ?'], de: ['Könnten Sie bitte langsamer sprechen?', 'Kannst du langsamer sprechen?'], hi: ['क्या आप थोड़ा धीरे बोल सकते हैं?', 'थोड़ा धीरे बोलो ना?'] },
    hg: { en: ['쿠쥬 스피크 모어 슬로울리, 플리즈?', '캔 유 스피크 슬로워?'], ja: ['모- 스코시 윳쿠리 하나시테 이타다케마스카?', '모- 춋토 윳쿠리 하나시테.'], 'zh-hant': ['커이 칭 닌 숴 만 이뎬 마?', '니 커이 숴 만 이뎬 마?'], es: ['포드리아 아블라르 마스 데스파시오, 포르 파보르?', '푸에데스 아블라르 마스 데스파시오?'], fr: ['푸리에 부 파를레 플뤼 랑트망, 실 부 플레?', '튀 푀 파를레 플뤼 랑트망?'], de: ['쾬텐 지 비테 랑자머 슈프레헨?', '칸스트 두 랑자머 슈프레헨?'], hi: ['캬 아프 토라 디레 볼 삭테 헹?', '토라 디레 볼로 나?'] },
    ro: { ja: ['Mō sukoshi yukkuri hanashite itadakemasu ka?', 'Mō chotto yukkuri hanashite.'], ko: ['Jogeum cheoncheonhi malsseumhae jusigesseoyo?', 'Jom cheoncheonhi malhae jullae?'], 'zh-hant': ['Kěyǐ qǐng nín shuō màn yìdiǎn ma?', 'Nǐ kěyǐ shuō màn yìdiǎn ma?'], hi: ['Kya aap thoda dheere bol sakte hain?', 'Thoda dheere bolo na?'] } },
  // ---------------- 교통 ----------------
  { sit: 'transport',
    t: { en: ['Where is the nearest station?', 'Where’s the closest station?'], ko: ['가장 가까운 역이 어디예요?', '제일 가까운 역 어디야?'], ja: ['一番近い駅はどこですか？', '一番近い駅どこ？'], 'zh-hant': ['請問最近的車站在哪裡？', '最近的車站在哪？'], es: '¿Dónde está la estación más cercana?', fr: 'Où est la gare la plus proche ?', de: 'Wo ist der nächste Bahnhof?', hi: 'सबसे नज़दीकी स्टेशन कहाँ है?' },
    hg: { en: ['웨어 이즈 더 니어리스트 스테이션?', '웨어즈 더 클로시스트 스테이션?'], ja: ['이치방 치카이 에키와 도코데스카?', '이치방 치카이 에키 도코?'], 'zh-hant': ['칭원 쭈이진 더 처잔 짜이 나리?', '쭈이진 더 처잔 짜이 나?'], es: '돈데 에스타 라 에스타시온 마스 세르카나?', fr: '우 에 라 가르 라 플뤼 프로슈?', de: '보 이스트 데어 네히스테 반호프?', hi: '삽세 나즈디키 스테샨 카항 헤?' },
    ro: { ja: ['Ichiban chikai eki wa doko desu ka?', 'Ichiban chikai eki doko?'], ko: ['Gajang gakkaun yeogi eodiyeyo?', 'Jeil gakkaun yeok eodiya?'], 'zh-hant': ['Qǐngwèn zuìjìn de chēzhàn zài nǎlǐ?', 'Zuìjìn de chēzhàn zài nǎ?'], hi: 'Sabse nazdeeki station kahan hai?' } },
  { sit: 'transport',
    t: { en: 'One ticket to the airport, please.', ko: ['공항까지 표 한 장 주세요.', '공항까지 표 한 장.'], ja: ['空港までの切符を一枚ください。', '空港まで一枚。'], 'zh-hant': ['請給我一張到機場的票。', '一張到機場的票。'], es: ['Un billete al aeropuerto, por favor.', 'Un billete al aeropuerto.'], fr: ['Un billet pour l’aéroport, s’il vous plaît.', 'Un billet pour l’aéroport.'], de: ['Eine Fahrkarte zum Flughafen, bitte.', 'Einmal zum Flughafen.'], hi: ['एयरपोर्ट का एक टिकट दीजिए।', 'एयरपोर्ट का एक टिकट देना।'] },
    hg: { en: '원 티켓 투 디 에어포트, 플리즈.', ja: ['쿠-코-마데노 킷푸오 이치마이 쿠다사이.', '쿠-코-마데 이치마이.'], 'zh-hant': ['칭 게이 워 이 장 다오 지창 더 퍄오.', '이 장 다오 지창 더 퍄오.'], es: ['운 비예테 알 아에로푸에르토, 포르 파보르.', '운 비예테 알 아에로푸에르토.'], fr: ['앵 비예 푸르 라에로포르, 실 부 플레.', '앵 비예 푸르 라에로포르.'], de: ['아이네 파카르테 춤 플룩하펜, 비테.', '아인말 춤 플룩하펜.'], hi: ['에어포르트 카 에크 티카트 디지에.', '에어포르트 카 에크 티카트 데나.'] },
    ro: { ja: ['Kūkō made no kippu o ichimai kudasai.', 'Kūkō made ichimai.'], ko: ['Gonghangkkaji pyo han jang juseyo.', 'Gonghangkkaji pyo han jang.'], 'zh-hant': ['Qǐng gěi wǒ yì zhāng dào jīchǎng de piào.', 'Yì zhāng dào jīchǎng de piào.'], hi: ['Airport ka ek ticket dijiye.', 'Airport ka ek ticket dena.'] } },
  { sit: 'transport',
    t: { en: ['Please take me to this address.', 'Take me here, please.'], ko: ['이 주소로 가 주세요.', '여기로 가 줘.'], ja: ['この住所までお願いします。', 'ここまでお願い。'], 'zh-hant': ['請到這個地址。', '去這裡。'], es: ['Lléveme a esta dirección, por favor.', 'Llévame a esta dirección.'], fr: ['Emmenez-moi à cette adresse, s’il vous plaît.', 'Emmène-moi à cette adresse.'], de: ['Bitte bringen Sie mich zu dieser Adresse.', 'Bring mich bitte zu dieser Adresse.'], hi: ['कृपया मुझे इस पते पर ले चलिए।', 'मुझे इस पते पर ले चलो।'] },
    hg: { en: ['플리즈 테이크 미 투 디스 어드레스.', '테이크 미 히어, 플리즈.'], ja: ['코노 주-쇼마데 오네가이시마스.', '코코마데 오네가이.'], 'zh-hant': ['칭 다오 저거 디즈.', '취 저리.'], es: ['예베메 아 에스타 디렉시온, 포르 파보르.', '예바메 아 에스타 디렉시온.'], fr: ['앙므네 무아 아 세트 아드레스, 실 부 플레.', '앙멘 무아 아 세트 아드레스.'], de: ['비테 브링엔 지 미히 추 디저 아드레세.', '브링 미히 비테 추 디저 아드레세.'], hi: ['크리파야 무제 이스 파테 파르 레 찰리에.', '무제 이스 파테 파르 레 찰로.'] },
    ro: { ja: ['Kono jūsho made onegaishimasu.', 'Koko made onegai.'], ko: ['I jusoro ga juseyo.', 'Yeogiro ga jwo.'], 'zh-hant': ['Qǐng dào zhège dìzhǐ.', 'Qù zhèlǐ.'], hi: ['Kripya mujhe is pate par le chaliye.', 'Mujhe is pate par le chalo.'] } },
  { sit: 'transport',
    t: { en: 'How long does it take?', ko: ['얼마나 걸려요?', '얼마나 걸려?'], ja: ['どのくらいかかりますか？', 'どのくらいかかる？'], 'zh-hant': '大概要多久？', es: '¿Cuánto tarda?', fr: 'Combien de temps ça prend ?', de: 'Wie lange dauert es?', hi: 'कितना समय लगेगा?' },
    hg: { en: '하우 롱 더즈 잇 테이크?', ja: ['도노쿠라이 카카리마스카?', '도노쿠라이 카카루?'], 'zh-hant': '다가이 야오 둬지우?', es: '콴토 타르다?', fr: '콩비앵 드 탕 사 프랑?', de: '비 랑에 다우어트 에스?', hi: '키트나 사마이 라게가?' },
    ro: { ja: ['Dono kurai kakarimasu ka?', 'Dono kurai kakaru?'], ko: ['Eolmana geollyeoyo?', 'Eolmana geollyeo?'], 'zh-hant': 'Dàgài yào duōjiǔ?', hi: 'Kitna samay lagega?' } },
  { sit: 'transport',
    t: { en: ['I’m lost. Could you help me?', 'I’m lost, can you help me?'], ko: ['길을 잃었어요. 좀 도와주시겠어요?', '길을 잃었어. 좀 도와줄래?'], ja: ['道に迷いました。助けていただけますか？', '道に迷っちゃった。助けてくれる？'], 'zh-hant': '我迷路了，可以幫我一下嗎？', es: ['Me he perdido. ¿Me podría ayudar?', 'Me he perdido. ¿Me ayudas?'], fr: ['Je suis perdu. Pourriez-vous m’aider ?', 'Je suis perdu. Tu peux m’aider ?'], de: ['Ich habe mich verlaufen. Können Sie mir helfen?', 'Ich hab mich verlaufen. Kannst du mir helfen?'], hi: ['मैं रास्ता भूल गया हूँ। क्या आप मेरी मदद कर सकते हैं?', 'मैं रास्ता भूल गया हूँ। क्या तुम मेरी मदद कर सकते हो?'] },
    hg: { en: ['아임 로스트. 쿠쥬 헬프 미?', '아임 로스트, 캔 유 헬프 미?'], ja: ['미치니 마요이마시타. 타스케테 이타다케마스카?', '미치니 마욧챳타. 타스케테 쿠레루?'], 'zh-hant': '워 미루 러, 커이 방 워 이샤 마?', es: ['메 에 페르디도. 메 포드리아 아유다르?', '메 에 페르디도. 메 아유다스?'], fr: ['즈 쉬 페르뒤. 푸리에 부 메데?', '즈 쉬 페르뒤. 튀 푀 메데?'], de: ['이히 하베 미히 페어라우펜. 쾨넨 지 미어 헬펜?', '이히 합 미히 페어라우펜. 칸스트 두 미어 헬펜?'], hi: ['메 라스타 불 가야 훙. 캬 아프 메리 마다드 카르 삭테 헹?', '메 라스타 불 가야 훙. 캬 툼 메리 마다드 카르 삭테 호?'] },
    ro: { ja: ['Michi ni mayoimashita. Tasukete itadakemasu ka?', 'Michi ni mayotchatta. Tasukete kureru?'], ko: ['Gireul ileosseoyo. Jom dowajusigesseoyo?', 'Gireul ileosseo. Jom dowajullae?'], 'zh-hant': 'Wǒ mílù le, kěyǐ bāng wǒ yíxià ma?', hi: ['Main raasta bhool gaya hoon. Kya aap meri madad kar sakte hain?', 'Main raasta bhool gaya hoon. Kya tum meri madad kar sakte ho?'] } },
  // ---------------- 호텔 ----------------
  { sit: 'hotel',
    t: { en: 'I have a reservation.', ko: '예약했습니다.', ja: '予約しています。', 'zh-hant': '我有訂房。', es: 'Tengo una reserva.', fr: 'J’ai une réservation.', de: 'Ich habe eine Reservierung.', hi: 'मेरा रिज़र्वेशन है।' },
    hg: { en: '아이 해브 어 레저베이션.', ja: '요야쿠시테이마스.', 'zh-hant': '워 여우 딩팡.', es: '텡고 우나 레세르바.', fr: '제 윈 레제르바시옹.', de: '이히 하베 아이네 레저비룽.', hi: '메라 리저르베샨 헤.' },
    ro: { ja: 'Yoyaku shite imasu.', ko: 'Yeyakaesseumnida.', 'zh-hant': 'Wǒ yǒu dìngfáng.', hi: 'Mera reservation hai.' } },
  { sit: 'hotel',
    t: { en: 'What time is check-out?', ko: '체크아웃은 몇 시예요?', ja: 'チェックアウトは何時ですか？', 'zh-hant': '請問幾點退房？', es: '¿A qué hora es la salida?', fr: 'À quelle heure faut-il libérer la chambre ?', de: 'Bis wann ist der Check-out?', hi: 'चेक-आउट कितने बजे है?' },
    hg: { en: '왓 타임 이즈 체크아웃?', ja: '첵쿠아우토와 난지데스카?', 'zh-hant': '칭원 지 뎬 투이팡?', es: '아 케 오라 에스 라 살리다?', fr: '아 켈 뢰르 포틸 리베레 라 샹브르?', de: '비스 반 이스트 데어 체크아웃?', hi: '체크아우트 키트네 바제 헤?' },
    ro: { ja: 'Chekkuauto wa nanji desu ka?', ko: 'Chekeuauseun myeot siyeyo?', 'zh-hant': 'Qǐngwèn jǐ diǎn tuìfáng?', hi: 'Check-out kitne baje hai?' } },
  { sit: 'hotel',
    t: { en: 'What’s the Wi-Fi password?', ko: ['와이파이 비밀번호가 뭐예요?', '와이파이 비번 뭐야?'], ja: ['Wi-Fiのパスワードは何ですか？', 'Wi-Fiのパスワード何？'], 'zh-hant': 'Wi-Fi 密碼是什麼？', es: '¿Cuál es la contraseña del wifi?', fr: 'Quel est le mot de passe du wifi ?', de: ['Wie lautet das WLAN-Passwort?', 'Was ist das WLAN-Passwort?'], hi: 'वाई-फ़ाई का पासवर्ड क्या है?' },
    hg: { en: '왓츠 더 와이파이 패스워드?', ja: ['와이파이노 파스와-도와 난데스카?', '와이파이노 파스와-도 나니?'], 'zh-hant': '와이파이 미마 스 선머?', es: '콸 에스 라 콘트라세냐 델 위피?', fr: '켈 에 르 모 드 파스 뒤 위피?', de: ['비 라우테트 다스 베란 파스보르트?', '바스 이스트 다스 베란 파스보르트?'], hi: '와이파이 카 파스와르드 캬 헤?' },
    ro: { ja: ['Waifai no pasuwādo wa nan desu ka?', 'Waifai no pasuwādo nani?'], ko: ['Waipai bimilbeonhoga mwoyeyo?', 'Waipai bibeon mwoya?'], 'zh-hant': 'Wi-Fi mìmǎ shì shénme?', hi: 'Wi-Fi ka password kya hai?' } },
  { sit: 'hotel',
    t: { en: 'Could you keep my luggage until this evening?', ko: '저녁까지 짐을 맡아 주실 수 있나요?', ja: '夕方まで荷物を預かっていただけますか？', 'zh-hant': '可以幫我寄放行李到傍晚嗎？', es: '¿Podría guardarme el equipaje hasta la tarde?', fr: 'Pourriez-vous garder mes bagages jusqu’à ce soir ?', de: 'Könnten Sie mein Gepäck bis heute Abend aufbewahren?', hi: 'क्या आप शाम तक मेरा सामान रख सकते हैं?' },
    hg: { en: '쿠쥬 킵 마이 러기지 언틸 디스 이브닝?', ja: '유-가타마데 니모츠오 아즈캇테 이타다케마스카?', 'zh-hant': '커이 방 워 지팡 싱리 다오 방완 마?', es: '포드리아 과르다르메 엘 에키파헤 아스타 라 타르데?', fr: '푸리에 부 가르데 메 바가주 쥐스카 스 수아르?', de: '쾬텐 지 마인 게펙 비스 호이테 아벤트 아우프베바렌?', hi: '캬 아프 샴 타크 메라 사만 라크 삭테 헹?' },
    ro: { ja: 'Yūgata made nimotsu o azukatte itadakemasu ka?', ko: 'Jeonyeokkkaji jimeul mata jusil su innayo?', 'zh-hant': 'Kěyǐ bāng wǒ jìfàng xíngli dào bàngwǎn ma?', hi: 'Kya aap shaam tak mera saamaan rakh sakte hain?' } },
  // ---------------- 식당 ----------------
  { sit: 'food',
    t: { en: 'A table for two, please.', ko: '두 명입니다.', ja: '二人です。', 'zh-hant': '兩位。', es: 'Una mesa para dos, por favor.', fr: 'Une table pour deux, s’il vous plaît.', de: 'Einen Tisch für zwei, bitte.', hi: 'दो लोगों के लिए टेबल चाहिए।' },
    hg: { en: '어 테이블 포 투, 플리즈.', ja: '후타리데스.', 'zh-hant': '량 웨이.', es: '우나 메사 파라 도스, 포르 파보르.', fr: '윈 타블 푸르 되, 실 부 플레.', de: '아이넨 티시 퓌어 츠바이, 비테.', hi: '도 로공 케 리에 테발 차히에.' },
    ro: { ja: 'Futari desu.', ko: 'Du myeongimnida.', 'zh-hant': 'Liǎng wèi.', hi: 'Do logon ke liye table chahiye.' } },
  { sit: 'food',
    t: { en: 'Could I see the menu, please?', ko: '메뉴판 좀 주세요.', ja: 'メニューをください。', 'zh-hant': '請給我菜單。', es: '¿Me trae la carta, por favor?', fr: 'La carte, s’il vous plaît.', de: 'Die Speisekarte, bitte.', hi: 'मेन्यू दिखाइए, प्लीज़।' },
    hg: { en: '쿠다이 씨 더 메뉴, 플리즈?', ja: '메뉴-오 쿠다사이.', 'zh-hant': '칭 게이 워 차이단.', es: '메 트라에 라 카르타, 포르 파보르?', fr: '라 카르트, 실 부 플레.', de: '디 슈파이제카르테, 비테.', hi: '메뉴 디카이에, 플리즈.' },
    ro: { ja: 'Menyū o kudasai.', ko: 'Menyupan jom juseyo.', 'zh-hant': 'Qǐng gěi wǒ càidān.', hi: 'Menu dikhaiye, please.' } },
  { sit: 'food',
    t: { en: 'What do you recommend?', ko: ['추천 메뉴가 뭐예요?', '뭐가 맛있어?'], ja: ['おすすめは何ですか？', 'おすすめは？'], 'zh-hant': '有什麼推薦的嗎？', es: ['¿Qué me recomienda?', '¿Qué me recomiendas?'], fr: ['Qu’est-ce que vous me conseillez ?', 'Qu’est-ce que tu me conseilles ?'], de: ['Was können Sie empfehlen?', 'Was kannst du empfehlen?'], hi: ['आप क्या सुझाएँगे?', 'तुम क्या सुझाओगे?'] },
    hg: { en: '왓 두 유 레커멘드?', ja: ['오스스메와 난데스카?', '오스스메와?'], 'zh-hant': '여우 선머 투이젠 더 마?', es: ['케 메 레코미엔다?', '케 메 레코미엔다스?'], fr: ['케스크 부 므 콩세예?', '케스크 튀 므 콩세이으?'], de: ['바스 쾨넨 지 엠펠렌?', '바스 칸스트 두 엠펠렌?'], hi: ['아프 캬 수자엥게?', '툼 캬 수자오게?'] },
    ro: { ja: ['Osusume wa nan desu ka?', 'Osusume wa?'], ko: ['Chucheon menyuga mwoyeyo?', 'Mwoga masisseo?'], 'zh-hant': 'Yǒu shénme tuījiàn de ma?', hi: ['Aap kya sujhayenge?', 'Tum kya sujhaoge?'] } },
  { sit: 'food',
    t: { en: 'I’m allergic to nuts.', ko: '견과류 알레르기가 있어요.', ja: 'ナッツアレルギーがあります。', 'zh-hant': '我對堅果過敏。', es: 'Soy alérgico a los frutos secos.', fr: 'Je suis allergique aux fruits à coque.', de: 'Ich bin allergisch gegen Nüsse.', hi: 'मुझे मेवों से एलर्जी है।' },
    hg: { en: '아임 얼러직 투 너츠.', ja: '낫츠 아레루기-가 아리마스.', 'zh-hant': '워 두이 젠궈 궈민.', es: '소이 알레르히코 아 로스 프루토스 세코스.', fr: '즈 쉬 알레르지크 오 프뤼 아 코크.', de: '이히 빈 알레르기시 게겐 뉘세.', hi: '무제 메봉 세 엘러지 헤.' },
    ro: { ja: 'Nattsu arerugī ga arimasu.', ko: 'Gyeongwaryu allereugiga isseoyo.', 'zh-hant': 'Wǒ duì jiānguǒ guòmǐn.', hi: 'Mujhe mevon se allergy hai.' } },
  { sit: 'food',
    t: { en: 'Not spicy, please.', ko: '안 맵게 해 주세요.', ja: '辛くしないでください。', 'zh-hant': '請不要辣。', es: 'Sin picante, por favor.', fr: 'Pas épicé, s’il vous plaît.', de: 'Bitte nicht scharf.', hi: 'तीखा मत बनाइए।' },
    hg: { en: '낫 스파이시, 플리즈.', ja: '카라쿠 시나이데 쿠다사이.', 'zh-hant': '칭 부야오 라.', es: '신 피칸테, 포르 파보르.', fr: '파 에피세, 실 부 플레.', de: '비테 니히트 샤르프.', hi: '티카 마트 바나이에.' },
    ro: { ja: 'Karaku shinaide kudasai.', ko: 'An maepge hae juseyo.', 'zh-hant': 'Qǐng búyào là.', hi: 'Teekha mat banaiye.' } },
  { sit: 'food',
    t: { en: ['Could we have the bill, please?', 'Check, please.'], ko: '계산해 주세요.', ja: ['お会計をお願いします。', 'お会計お願い。'], 'zh-hant': ['請幫我結帳。', '買單。'], es: 'La cuenta, por favor.', fr: 'L’addition, s’il vous plaît.', de: ['Die Rechnung, bitte.', 'Zahlen, bitte.'], hi: 'बिल ले आइए, प्लीज़।' },
    hg: { en: ['쿠드 위 해브 더 빌, 플리즈?', '체크, 플리즈.'], ja: ['오카이케-오 오네가이시마스.', '오카이케- 오네가이.'], 'zh-hant': ['칭 방 워 제장.', '마이단.'], es: '라 쿠엔타, 포르 파보르.', fr: '라디시옹, 실 부 플레.', de: ['디 레히눙, 비테.', '찰렌, 비테.'], hi: '빌 레 아이에, 플리즈.' },
    ro: { ja: ['Okaikei o onegaishimasu.', 'Okaikei onegai.'], ko: 'Gyesanhae juseyo.', 'zh-hant': ['Qǐng bāng wǒ jiézhàng.', 'Mǎidān.'], hi: 'Bill le aaiye, please.' } },
  // ---------------- 쇼핑 ----------------
  { sit: 'shop',
    t: { en: 'How much is this?', ko: ['이거 얼마예요?', '이거 얼마야?'], ja: ['これはいくらですか？', 'これいくら？'], 'zh-hant': '這個多少錢？', es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte ?', de: 'Was kostet das?', hi: 'यह कितने का है?' },
    hg: { en: '하우 머치 이즈 디스?', ja: ['코레와 이쿠라데스카?', '코레 이쿠라?'], 'zh-hant': '저거 둬샤오 첸?', es: '콴토 쿠에스타 에스토?', fr: '콩비앵 사 쿠트?', de: '바스 코스테트 다스?', hi: '예 키트네 카 헤?' },
    ro: { ja: ['Kore wa ikura desu ka?', 'Kore ikura?'], ko: ['Igeo eolmayeyo?', 'Igeo eolmaya?'], 'zh-hant': 'Zhège duōshǎo qián?', hi: 'Yeh kitne ka hai?' } },
  { sit: 'shop',
    t: { en: 'Can I pay by card?', ko: '카드로 결제할 수 있어요?', ja: 'カードで払えますか？', 'zh-hant': '可以刷卡嗎？', es: '¿Puedo pagar con tarjeta?', fr: 'Je peux payer par carte ?', de: 'Kann ich mit Karte zahlen?', hi: 'क्या मैं कार्ड से पेमेंट कर सकता हूँ?' },
    hg: { en: '캔 아이 페이 바이 카드?', ja: '카-도데 하라에마스카?', 'zh-hant': '커이 솨카 마?', es: '푸에도 파가르 콘 타르헤타?', fr: '즈 푀 페예 파르 카르트?', de: '칸 이히 미트 카르테 찰렌?', hi: '캬 메 카르드 세 페멘트 카르 삭타 훙?' },
    ro: { ja: 'Kādo de haraemasu ka?', ko: 'Kadeuro gyeoljehal su isseoyo?', 'zh-hant': 'Kěyǐ shuākǎ ma?', hi: 'Kya main card se payment kar sakta hoon?' } },
  { sit: 'shop',
    t: { en: 'Can I try this on?', ko: '입어 봐도 돼요?', ja: '試着してもいいですか？', 'zh-hant': '可以試穿嗎？', es: '¿Me lo puedo probar?', fr: 'Je peux l’essayer ?', de: 'Kann ich das anprobieren?', hi: 'क्या मैं इसे पहनकर देख सकता हूँ?' },
    hg: { en: '캔 아이 트라이 디스 온?', ja: '시차쿠시테모 이-데스카?', 'zh-hant': '커이 스촨 마?', es: '메 로 푸에도 프로바르?', fr: '즈 푀 레세예?', de: '칸 이히 다스 안프로비렌?', hi: '캬 메 이세 파한카르 데크 삭타 훙?' },
    ro: { ja: 'Shichaku shite mo ii desu ka?', ko: 'Ibeo bwado dwaeyo?', 'zh-hant': 'Kěyǐ shìchuān ma?', hi: 'Kya main ise pehenkar dekh sakta hoon?' } },
  { sit: 'shop',
    t: { en: 'I’m just looking, thanks.', ko: '그냥 구경하는 거예요.', ja: '見ているだけです。', 'zh-hant': '我只是看看。', es: 'Solo estoy mirando, gracias.', fr: 'Je regarde seulement, merci.', de: 'Ich schaue nur, danke.', hi: 'बस देख रहा हूँ, शुक्रिया।' },
    hg: { en: '아임 저스트 루킹, 땡스.', ja: '미테이루다케데스.', 'zh-hant': '워 즈스 칸칸.', es: '솔로 에스토이 미란도, 그라시아스.', fr: '즈 르가르드 쇨르망, 메르시.', de: '이히 샤우에 누어, 당케.', hi: '바스 데크 라하 훙, 슈크리야.' },
    ro: { ja: 'Mite iru dake desu.', ko: 'Geunyang gugyeonghaneun geoyeyo.', 'zh-hant': 'Wǒ zhǐshì kànkan.', hi: 'Bas dekh raha hoon, shukriya.' } },
  // ---------------- 긴급 ----------------
  { sit: 'emergency',
    t: { en: 'Help!', ko: '도와주세요!', ja: '助けて！', 'zh-hant': '救命！', es: '¡Socorro!', fr: 'Au secours !', de: 'Hilfe!', hi: 'बचाओ!' },
    hg: { en: '헬프!', ja: '타스케테!', 'zh-hant': '지우밍!', es: '소코로!', fr: '오 스쿠르!', de: '힐페!', hi: '바차오!' },
    ro: { ja: 'Tasukete!', ko: 'Dowajuseyo!', 'zh-hant': 'Jiùmìng!', hi: 'Bachao!' } },
  { sit: 'emergency',
    t: { en: 'Please call an ambulance.', ko: '구급차 불러 주세요.', ja: '救急車を呼んでください。', 'zh-hant': '請叫救護車。', es: ['Llame a una ambulancia, por favor.', '¡Llama a una ambulancia!'], fr: ['Appelez une ambulance, s’il vous plaît.', 'Appelle une ambulance !'], de: ['Bitte rufen Sie einen Krankenwagen.', 'Ruf einen Krankenwagen!'], hi: ['कृपया एम्बुलेंस बुलाइए।', 'एम्बुलेंस बुलाओ!'] },
    hg: { en: '플리즈 콜 언 앰뷸런스.', ja: '큐-큐-샤오 욘데 쿠다사이.', 'zh-hant': '칭 자오 지우후처.', es: ['야메 아 우나 암불란시아, 포르 파보르.', '야마 아 우나 암불란시아!'], fr: ['아플레 윈 앙뷜랑스, 실 부 플레.', '아펠 윈 앙뷜랑스!'], de: ['비테 루펜 지 아이넨 크랑켄바겐.', '루프 아이넨 크랑켄바겐!'], hi: ['크리파야 엠불렌스 불라이에.', '엠불렌스 불라오!'] },
    ro: { ja: 'Kyūkyūsha o yonde kudasai.', ko: 'Gugeupcha bulleo juseyo.', 'zh-hant': 'Qǐng jiào jiùhùchē.', hi: ['Kripya ambulance bulaiye.', 'Ambulance bulao!'] } },
  { sit: 'emergency',
    t: { en: 'Where is the nearest hospital?', ko: '가장 가까운 병원이 어디예요?', ja: '一番近い病院はどこですか？', 'zh-hant': '最近的醫院在哪裡？', es: '¿Dónde está el hospital más cercano?', fr: 'Où est l’hôpital le plus proche ?', de: 'Wo ist das nächste Krankenhaus?', hi: 'सबसे नज़दीकी अस्पताल कहाँ है?' },
    hg: { en: '웨어 이즈 더 니어리스트 하스피털?', ja: '이치방 치카이 뵤-인와 도코데스카?', 'zh-hant': '쭈이진 더 이위안 짜이 나리?', es: '돈데 에스타 엘 오스피탈 마스 세르카노?', fr: '우 에 로피탈 르 플뤼 프로슈?', de: '보 이스트 다스 네히스테 크랑켄하우스?', hi: '삽세 나즈디키 아스파탈 카항 헤?' },
    ro: { ja: 'Ichiban chikai byōin wa doko desu ka?', ko: 'Gajang gakkaun byeongwoni eodiyeyo?', 'zh-hant': 'Zuìjìn de yīyuàn zài nǎlǐ?', hi: 'Sabse nazdeeki aspataal kahan hai?' } },
  { sit: 'emergency',
    t: { en: 'I’ve lost my passport.', ko: '여권을 잃어버렸어요.', ja: 'パスポートをなくしました。', 'zh-hant': '我的護照不見了。', es: 'He perdido mi pasaporte.', fr: 'J’ai perdu mon passeport.', de: 'Ich habe meinen Pass verloren.', hi: 'मेरा पासपोर्ट खो गया है।' },
    hg: { en: '아이브 로스트 마이 패스포트.', ja: '파스포-토오 나쿠시마시타.', 'zh-hant': '워 더 후자오 부젠 러.', es: '에 페르디도 미 파사포르테.', fr: '제 페르뒤 몽 파스포르.', de: '이히 하베 마이넨 파스 페어로렌.', hi: '메라 파스포르트 코 가야 헤.' },
    ro: { ja: 'Pasupōto o nakushimashita.', ko: 'Yeogwoneul ireobeoryeosseoyo.', 'zh-hant': 'Wǒ de hùzhào bújiàn le.', hi: 'Mera passport kho gaya hai.' } },
  { sit: 'emergency',
    t: { en: 'I feel sick. It hurts here.', ko: '몸이 안 좋아요. 여기가 아파요.', ja: '気分が悪いです。ここが痛いです。', 'zh-hant': '我不舒服，這裡很痛。', es: 'Me encuentro mal. Me duele aquí.', fr: 'Je ne me sens pas bien. J’ai mal ici.', de: 'Mir geht es nicht gut. Es tut hier weh.', hi: 'मेरी तबीयत ठीक नहीं है। यहाँ दर्द हो रहा है।' },
    hg: { en: '아이 필 식. 잇 허츠 히어.', ja: '키분가 와루이데스. 코코가 이타이데스.', 'zh-hant': '워 부 수푸, 저리 헌 퉁.', es: '메 엥쿠엔트로 말. 메 두엘레 아키.', fr: '즈 느 므 상 파 비앵. 제 말 이시.', de: '미어 게트 에스 니히트 구트. 에스 투트 히어 베.', hi: '메리 타비야트 티크 나힌 헤. 야항 다르드 호 라하 헤.' },
    ro: { ja: 'Kibun ga warui desu. Koko ga itai desu.', ko: 'Momi an joayo. Yeogiga apayo.', 'zh-hant': 'Wǒ bù shūfu, zhèlǐ hěn tòng.', hi: 'Meri tabiyat theek nahin hai. Yahan dard ho raha hai.' } },
];

/** 존댓말(0) 또는 반말(1) 표현을 꺼냄. 반말이 따로 없으면 같은 문장 */
export const pick = (x: Text | undefined, casual: boolean) => (x === undefined ? '' : typeof x === 'string' ? x : x[casual ? 1 : 0]);
