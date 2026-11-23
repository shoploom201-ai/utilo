// 일본어 로마자 입력 채점기. 히라가나 읽기를 받아, 사람이 치는 로마자 키를 한 글자씩 판정합니다.
// し=shi/si/ci, つ=tsu/tu, ん=n/nn, っ=다음 자음 두 번 또는 ltu, きゃ=kya 또는 ki+lya 등 여러 입력법을 모두 인정합니다.

const BASE: Record<string, string[]> = {
  あ: ['a'], い: ['i', 'yi'], う: ['u', 'wu', 'whu'], え: ['e'], お: ['o'],
  か: ['ka', 'ca'], き: ['ki'], く: ['ku', 'cu', 'qu'], け: ['ke'], こ: ['ko', 'co'],
  さ: ['sa'], し: ['shi', 'si', 'ci'], す: ['su'], せ: ['se', 'ce'], そ: ['so'],
  た: ['ta'], ち: ['chi', 'ti'], つ: ['tsu', 'tu'], て: ['te'], と: ['to'],
  な: ['na'], に: ['ni'], ぬ: ['nu'], ね: ['ne'], の: ['no'],
  は: ['ha'], ひ: ['hi'], ふ: ['fu', 'hu'], へ: ['he'], ほ: ['ho'],
  ま: ['ma'], み: ['mi'], む: ['mu'], め: ['me'], も: ['mo'],
  や: ['ya'], ゆ: ['yu'], よ: ['yo'],
  ら: ['ra'], り: ['ri'], る: ['ru'], れ: ['re'], ろ: ['ro'],
  わ: ['wa'], を: ['wo'],
  が: ['ga'], ぎ: ['gi'], ぐ: ['gu'], げ: ['ge'], ご: ['go'],
  ざ: ['za'], じ: ['ji', 'zi'], ず: ['zu'], ぜ: ['ze'], ぞ: ['zo'],
  だ: ['da'], ぢ: ['di'], づ: ['du'], で: ['de'], ど: ['do'],
  ば: ['ba'], び: ['bi'], ぶ: ['bu'], べ: ['be'], ぼ: ['bo'],
  ぱ: ['pa'], ぴ: ['pi'], ぷ: ['pu'], ぺ: ['pe'], ぽ: ['po'],
  ぁ: ['la', 'xa'], ぃ: ['li', 'xi'], ぅ: ['lu', 'xu'], ぇ: ['le', 'xe'], ぉ: ['lo', 'xo'],
  ゃ: ['lya', 'xya'], ゅ: ['lyu', 'xyu'], ょ: ['lyo', 'xyo'],
  '、': [','], '。': ['.'], 'ー': ['-'], '？': ['?'], '！': ['!'], ' ': [' '], '　': [' '],
};

// 두 글자를 한 번에 치는 입력 (きゃ → kya). 따로 치는 방법(ki + lya)도 자동으로 인정됩니다.
const COMBO: Record<string, string[]> = {
  きゃ: ['kya'], きゅ: ['kyu'], きょ: ['kyo'], ぎゃ: ['gya'], ぎゅ: ['gyu'], ぎょ: ['gyo'],
  しゃ: ['sha', 'sya'], しゅ: ['shu', 'syu'], しょ: ['sho', 'syo'], しぇ: ['she', 'sye'],
  じゃ: ['ja', 'zya', 'jya'], じゅ: ['ju', 'zyu', 'jyu'], じょ: ['jo', 'zyo', 'jyo'], じぇ: ['je', 'zye', 'jye'],
  ちゃ: ['cha', 'tya', 'cya'], ちゅ: ['chu', 'tyu', 'cyu'], ちょ: ['cho', 'tyo', 'cyo'], ちぇ: ['che', 'tye', 'cye'],
  にゃ: ['nya'], にゅ: ['nyu'], にょ: ['nyo'], ひゃ: ['hya'], ひゅ: ['hyu'], ひょ: ['hyo'],
  びゃ: ['bya'], びゅ: ['byu'], びょ: ['byo'], ぴゃ: ['pya'], ぴゅ: ['pyu'], ぴょ: ['pyo'],
  みゃ: ['mya'], みゅ: ['myu'], みょ: ['myo'], りゃ: ['rya'], りゅ: ['ryu'], りょ: ['ryo'],
  ふぁ: ['fa'], ふぃ: ['fi'], ふぇ: ['fe'], ふぉ: ['fo'], てぃ: ['thi'], でぃ: ['dhi'], うぃ: ['wi'], うぇ: ['we'],
};

export type Cand = { r: string; len: number };

/** 가타카나 → 히라가나 */
export const toHiragana = (s: string) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** kana[i] 위치에서 가능한 로마자 입력 후보 (앞쪽이 화면 안내에 쓰이는 대표 입력) */
export function candidates(kana: string, i: number): Cand[] {
  const c = kana[i];
  if (c === undefined) return [];
  const out: Cand[] = [];
  const pair = kana.slice(i, i + 2);
  if (COMBO[pair]) out.push(...COMBO[pair].map((r) => ({ r, len: 2 })));

  if (c === 'っ') {
    // 다음 글자의 자음을 두 번 (かっこ → kakko)
    const doubled = new Set(
      candidates(kana, i + 1)
        .map((x) => x.r[0])
        .filter((ch) => ch && /[a-z]/.test(ch) && !'aiueon'.includes(ch)),
    );
    doubled.forEach((ch) => out.push({ r: ch, len: 1 }));
    ['ltu', 'xtu', 'ltsu', 'xtsu'].forEach((r) => out.push({ r, len: 1 }));
    return out;
  }
  if (c === 'ん') {
    // n 한 번은 다음 글자가 모음·や행·な행이 아닐 때만 (さんねん → sannenn)
    const next = candidates(kana, i + 1);
    const singleOk = next.length > 0 && next.every((x) => !/^[aiueoyn]/.test(x.r));
    if (singleOk) out.push({ r: 'n', len: 1 });
    ['nn', "n'", 'xn'].forEach((r) => out.push({ r, len: 1 }));
    return out;
  }
  (BASE[c] ?? [c]).forEach((r) => out.push({ r, len: 1 }));
  return out;
}

export type KeyResult = 'ok' | 'miss' | 'done';

export class RomajiMatcher {
  readonly kana: string;
  index = 0; // 다 친 가나 수
  buffer = ''; // 지금 글자에 대해 친 로마자
  typed = ''; // 맞게 친 키 전체
  private pending: Cand | null = null; // buffer 가 이미 완성이지만 더 긴 입력도 가능한 경우 (n / nn)

  constructor(kana: string) {
    this.kana = toHiragana(kana);
  }

  get done() {
    return this.index >= this.kana.length;
  }

  private advance(c: Cand) {
    this.index += c.len;
    this.buffer = '';
    this.pending = null;
  }

  key(ch: string, depth = 0): KeyResult {
    if (this.done) return 'done';
    const k = ch.toLowerCase();
    const cands = candidates(this.kana, this.index);
    const nb = this.buffer + k;
    const exact = cands.find((c) => c.r === nb);
    const longer = cands.some((c) => c.r.length > nb.length && c.r.startsWith(nb));
    if (longer) {
      this.buffer = nb;
      this.pending = exact ?? null;
      this.typed += k;
      return 'ok';
    }
    if (exact) {
      this.typed += k;
      this.advance(exact);
      return this.done ? 'done' : 'ok';
    }
    if (this.pending && depth === 0) {
      // 예: ん 에서 n 다음 k → ん 을 n 하나로 확정하고 k 는 다음 글자로
      this.advance(this.pending);
      return this.key(ch, 1);
    }
    return 'miss';
  }

  /** 아직 칠 부분의 대표 로마자 안내 (현재 글자는 이미 친 부분을 뺀 나머지) */
  guide(): string {
    let out = '';
    let i = this.index;
    let first = true;
    while (i < this.kana.length) {
      const cands = candidates(this.kana, i);
      let pick = cands[0];
      if (first && this.buffer) pick = cands.find((c) => c.r.startsWith(this.buffer) && c.r !== this.buffer) ?? cands.find((c) => c.r.startsWith(this.buffer)) ?? pick;
      if (!pick) break;
      out += first ? pick.r.slice(this.buffer.length) : pick.r;
      i += pick.len;
      first = false;
    }
    return out;
  }
}
