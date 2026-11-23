// 음 높이(기본 주파수) 찾기: McLeod 방식(NSDF). 기타 줄처럼 배음이 많은 소리에서도 옥타브를 잘 틀리지 않습니다.
// 마이크 소리는 이 함수 안에서만 계산되고 어디에도 저장·전송되지 않습니다.

export type Pitch = { freq: number; clarity: number };

/**
 * @param buf     오디오 샘플 (-1~1)
 * @param sampleRate 초당 샘플 수 (보통 44100 또는 48000)
 * @param minFreq 찾을 가장 낮은 음 (베이스 E1 ≈ 41Hz)
 * @param maxFreq 찾을 가장 높은 음
 */
export function detectPitch(buf: Float32Array, sampleRate: number, minFreq = 60, maxFreq = 1400): Pitch | null {
  const n = buf.length;
  // 너무 작은 소리는 무시
  let rms = 0;
  for (let i = 0; i < n; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / n);
  if (rms < 0.01) return null;

  const minTau = Math.max(2, Math.floor(sampleRate / maxFreq));
  const maxTau = Math.min(Math.floor(n / 2), Math.ceil(sampleRate / minFreq));
  const nsdf = new Float32Array(maxTau + 2);
  for (let tau = 0; tau <= maxTau + 1; tau++) {
    let acf = 0, div = 0;
    for (let j = 0; j + tau < n; j++) {
      const a = buf[j], b = buf[j + tau];
      acf += a * b;
      div += a * a + b * b;
    }
    nsdf[tau] = div > 0 ? (2 * acf) / div : 0;
  }

  // 0 을 아래로 지난 뒤부터, 양수 구간마다 가장 높은 점(후보)을 모음
  const peaks: number[] = [];
  let tau = 1;
  while (tau < maxTau && nsdf[tau] > 0) tau++;
  let best = -1;
  for (; tau <= maxTau; tau++) {
    if (nsdf[tau] > 0) {
      if (best < 0 || nsdf[tau] > nsdf[best]) best = tau;
    } else if (best >= 0) {
      peaks.push(best);
      best = -1;
    }
  }
  if (best >= 0) peaks.push(best);
  const valid = peaks.filter((p) => p >= minTau);
  if (!valid.length) return null;

  // 가장 높은 후보의 90% 이상인 첫 후보 = 기본 주기 (배음에 속지 않게)
  const top = Math.max(...valid.map((p) => nsdf[p]));
  const pick = valid.find((p) => nsdf[p] >= 0.9 * top)!;
  if (nsdf[pick] < 0.5) return null; // 음이 분명하지 않음

  // 꼭짓점을 포물선으로 보정해서 소수점 단위 주기
  const y0 = nsdf[pick - 1], y1 = nsdf[pick], y2 = nsdf[pick + 1];
  const denom = y0 - 2 * y1 + y2;
  const shift = denom !== 0 ? (0.5 * (y0 - y2)) / denom : 0;
  const period = pick + Math.max(-1, Math.min(1, shift));
  return { freq: sampleRate / period, clarity: y1 };
}

/** 주파수 → 가장 가까운 음(MIDI 번호)과 어긋난 정도(센트, -50~+50) */
export function toNote(freq: number, a4 = 440) {
  const midiFloat = 69 + 12 * Math.log2(freq / a4);
  const midi = Math.round(midiFloat);
  return { midi, cents: Math.round((midiFloat - midi) * 100), octave: Math.floor(midi / 12) - 1, pc: ((midi % 12) + 12) % 12 };
}

/** MIDI 번호 → 주파수 */
export const midiToFreq = (midi: number, a4 = 440) => a4 * 2 ** ((midi - 69) / 12);
