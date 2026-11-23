// 라디오 방송 목록 갱신 스크립트. 실행: node scripts/fetch-radio.mjs
// Radio Browser(https://www.radio-browser.info, 공개 데이터)에서 배울 언어별 방송을 받아
// "브라우저에서 바로, 안전하게(https) 재생되는 그 언어 방송"만 골라 src/data/radio.json 에 저장합니다.
// 결과 파일을 커밋하면 사이트 빌드 때는 인터넷 접속 없이 이 파일만 씁니다. 한 달에 한 번 정도 다시 실행하세요.
import { writeFileSync } from 'node:fs';

const API = 'https://de1.api.radio-browser.info/json';
const UA = 'KitwiseRadioDirectory/1.0';

// 배울 언어 → 방송을 가져올 나라와 방송 언어(Radio Browser 표기)
const TARGETS = {
  ko: { countries: ['KR'], languages: ['korean'], allowUnknownLang: true, max: 40 },
  ja: { countries: ['JP'], languages: ['japanese'], allowUnknownLang: true, max: 40 },
  es: { countries: ['ES', 'MX', 'AR', 'CO'], languages: ['spanish', 'español', 'espanol', 'castellano'], max: 15 }, // 나라별 최대
  en: { countries: ['US', 'GB', 'AU', 'CA'], languages: ['english'], max: 15 },
};

// 비공식 중계·스트리머 계정으로 보이는 이름은 제외 (저작권 위험)
const BLOCK = /relay|restream|re-stream|mirror|unofficial|비공식|test|테스트/i;
const PLAYABLE = new Set(['MP3', 'AAC', 'AAC+', 'OGG']);
// 공식 방송이 아닌 재전송 서버(주소 기준)
const BLOCK_HOSTS = /qtfm\.cn|092007\.xyz|yojosuknam/i;
// 2026-11-23 실제 브라우저 재생 테스트에서 다른 사이트 재생을 막아 둔 방송(재생 불가) + 라디오가 아닌 TV 영상
const UNPLAYABLE = /imbc\.com|radiolive\.sbs\.co\.kr|cpbc\.co\.kr|streamlock\.net|andongmbc\.co\.kr/i;
const UNPLAYABLE_NAMES = /^NHK WORLD RADIO [78]$|BBC News HD/i;

const NEWS = /ytn|replay news|news|noticias|informativ|ニュース|뉴스|報道|cnn|bbc radio 4|npr/i;
const TALK = /표준fm|kbs_kor|1radio|ebs|tbs efm|cpbc|국방|obs 라디오|talk|hablada|tertulia|culture|cultura|education|educación|public radio|información|magazine|語学|교육|시사|토크|教養|community/i;

function classify(s) {
  const text = `${s.tags} ${s.name}`;
  if (NEWS.test(text)) return 'news';
  if (TALK.test(text)) return 'talk';
  return 'music';
}

async function fetchCountry(cc) {
  const url = `${API}/stations/search?countrycode=${cc}&hidebroken=true&order=clickcount&reverse=true&limit=500`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${cc}: HTTP ${res.status}`);
  return res.json();
}

const out = { updated: new Date().toISOString().slice(0, 10), source: 'https://www.radio-browser.info', targets: {} };

for (const [target, cfg] of Object.entries(TARGETS)) {
  const picked = [];
  for (const cc of cfg.countries) {
    const seen = new Set();
    const stations = (await fetchCountry(cc))
      .filter((s) => s.lastcheckok === 1)
      .filter((s) => (s.url_resolved || '').startsWith('https://'))
      .filter((s) => s.hls === 1 || PLAYABLE.has((s.codec || '').toUpperCase()))
      .filter((s) => !BLOCK_HOSTS.test(s.url_resolved) && !UNPLAYABLE.test(s.url_resolved))
      .filter((s) => !UNPLAYABLE_NAMES.test(s.name.trim()))
      .filter((s) => !BLOCK.test(s.name))
      .filter((s) => {
        const langs = (s.language || '').toLowerCase();
        if (!langs) return Boolean(cfg.allowUnknownLang);
        return cfg.languages.some((l) => langs.includes(l));
      })
      .filter((s) => {
        // "Gugak FM" 과 "GugakFM" 처럼 띄어쓰기만 다른 같은 방송은 하나만
        const key = s.name.toLowerCase().replace(/[\s_-]+/g, '');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, cfg.max)
      .map((s) => ({
        id: s.stationuuid,
        name: s.name.trim().replace(/\s+/g, ' '),
        url: s.url_resolved,
        homepage: (s.homepage || '').startsWith('http') ? s.homepage : '',
        favicon: (s.favicon || '').startsWith('https://') ? s.favicon : '',
        country: cc,
        type: classify(s),
        hls: s.hls === 1,
        tags: (s.tags || '').split(',').map((t) => t.trim()).filter(Boolean).slice(0, 4),
      }));
    picked.push(...stations);
    console.log(`${target} ${cc}: ${stations.length}`);
  }
  out.targets[target] = picked;
}

writeFileSync(new URL('../src/data/radio.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
console.log('saved src/data/radio.json');
