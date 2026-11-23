// 스도쿠 엔진: 씨앗값(seed)으로 항상 같은 퍼즐을 만들고(오늘의 퍼즐), 답이 하나뿐인 것만 내보냅니다.
// 칸 번호는 0~80 (행 * 9 + 열), 빈칸은 0.

export type Difficulty = 'easy' | 'medium' | 'hard';
export const CLUES: Record<Difficulty, number> = { easy: 40, medium: 32, hard: 26 };

/** 같은 씨앗이면 같은 수열을 내는 난수 (mulberry32) */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 문자열 → 씨앗값 */
export function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const ROW = (i: number) => Math.floor(i / 9);
const COL = (i: number) => i % 9;
const BOX = (i: number) => Math.floor(ROW(i) / 3) * 3 + Math.floor(COL(i) / 3);

/** 같은 행·열·상자에 있는 칸들 (자기 자신 제외) */
export const PEERS: number[][] = Array.from({ length: 81 }, (_, i) =>
  Array.from({ length: 81 }, (_, j) => j).filter((j) => j !== i && (ROW(j) === ROW(i) || COL(j) === COL(i) || BOX(j) === BOX(i))),
);

function shuffled<T>(arr: T[], rand: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 풀이 개수 세기 (limit 개에서 멈춤). 후보가 가장 적은 칸부터 채우는 백트래킹. */
export function countSolutions(grid: number[], limit = 2): number {
  const g = [...grid];
  const rows = new Array(9).fill(0), cols = new Array(9).fill(0), boxes = new Array(9).fill(0);
  for (let i = 0; i < 81; i++) {
    if (g[i]) {
      const bit = 1 << g[i];
      if (rows[ROW(i)] & bit || cols[COL(i)] & bit || boxes[BOX(i)] & bit) return 0; // 이미 충돌
      rows[ROW(i)] |= bit; cols[COL(i)] |= bit; boxes[BOX(i)] |= bit;
    }
  }
  let count = 0;
  const solve = (): void => {
    if (count >= limit) return;
    let best = -1, bestMask = 0, bestN = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const mask = ~(rows[ROW(i)] | cols[COL(i)] | boxes[BOX(i)]) & 0x3fe;
      let n = 0;
      for (let m = mask; m; m &= m - 1) n++;
      if (n < bestN) { best = i; bestMask = mask; bestN = n; if (n <= 1) break; }
    }
    if (best === -1) { count++; return; }
    for (let v = 1; v <= 9; v++) {
      const bit = 1 << v;
      if (!(bestMask & bit)) continue;
      g[best] = v; rows[ROW(best)] |= bit; cols[COL(best)] |= bit; boxes[BOX(best)] |= bit;
      solve();
      g[best] = 0; rows[ROW(best)] &= ~bit; cols[COL(best)] &= ~bit; boxes[BOX(best)] &= ~bit;
      if (count >= limit) return;
    }
  };
  solve();
  return count;
}

/** 무작위 완성 판 */
function fullGrid(rand: () => number): number[] {
  const g = new Array(81).fill(0);
  const fill = (i: number): boolean => {
    if (i === 81) return true;
    for (const v of shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9], rand)) {
      if (PEERS[i].every((p) => g[p] !== v)) {
        g[i] = v;
        if (fill(i + 1)) return true;
        g[i] = 0;
      }
    }
    return false;
  };
  fill(0);
  return g;
}

/** 퍼즐 만들기: 답이 하나로 유지되는 동안 칸을 지워서 목표 힌트 수에 맞춤 */
export function generate(seed: number, difficulty: Difficulty) {
  const rand = rng(seed);
  const solution = fullGrid(rand);
  const puzzle = [...solution];
  let clues = 81;
  const target = CLUES[difficulty];
  // 대칭으로 지워서 보기 좋은 판을 만듦 (i 와 80-i 를 함께)
  for (const i of shuffled(Array.from({ length: 41 }, (_, k) => k), rand)) {
    if (clues <= target) break;
    const pair = i === 40 ? [40] : [i, 80 - i];
    const saved = pair.map((p) => puzzle[p]);
    pair.forEach((p) => (puzzle[p] = 0));
    if (countSolutions(puzzle, 2) === 1) clues -= pair.length;
    else pair.forEach((p, k) => (puzzle[p] = saved[k]));
  }
  return { puzzle, solution, clues };
}
