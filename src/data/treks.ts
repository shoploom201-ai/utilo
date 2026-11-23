// 나라별 트래킹 추천 (2026년 여행 매체 추천 목록에서 자주 언급된 곳 위주, 나라당 1~5곳, 언급 많은 순).
// 2026-11 확인 출처: Lonely Planet(2026-01), Wild Junket(2026-05), Skyscanner, National Geographic, Time Out Asia 등.
// 거리·일수는 대표 코스 기준의 대략값. 허가·예약 규정은 자주 바뀌므로 공식 공원 사이트 확인을 안내함.
import type { Locale } from '../i18n';

export const TREKS_REVIEWED = '2026-11';
export type Feature = 'peak' | 'glacier' | 'lake' | 'coast' | 'forest' | 'volcano' | 'desert' | 'culture' | 'ridge' | 'canyon';
export type Need = 'permit' | 'guide' | 'huts' | 'camping';

export interface Trek {
  name: string; // 코스 이름 (고유명사)
  area: string; // 지역 (고유명사)
  km: number; // 대표 코스 거리 (km, 대략)
  days: [number, number]; // 소요 일수 범위
  level: 1 | 2 | 3; // 1 쉬움 · 2 보통 · 3 어려움
  months: number[]; // 추천 시기 (1~12월)
  features: Feature[];
  needs: Need[];
}

export const TREKS: Record<string, Trek[]> = {
  NP: [
    { name: 'Everest Base Camp', area: 'Khumbu', km: 130, days: [12, 14], level: 3, months: [3, 4, 5, 10, 11], features: ['peak', 'glacier', 'culture'], needs: ['permit', 'huts'] },
    { name: 'Annapurna Circuit', area: 'Annapurna', km: 160, days: [12, 18], level: 3, months: [3, 4, 10, 11], features: ['peak', 'culture'], needs: ['permit', 'huts'] },
    { name: 'Annapurna Base Camp', area: 'Annapurna', km: 110, days: [7, 10], level: 2, months: [3, 4, 10, 11], features: ['peak', 'glacier'], needs: ['permit', 'huts'] },
    { name: 'Langtang Valley', area: 'Langtang', km: 65, days: [7, 8], level: 2, months: [3, 4, 10, 11], features: ['peak', 'culture'], needs: ['permit', 'huts'] },
    { name: 'Manaslu Circuit', area: 'Manaslu', km: 177, days: [14, 16], level: 3, months: [3, 4, 9, 10, 11], features: ['peak', 'culture'], needs: ['permit', 'guide', 'huts'] },
  ],
  PE: [
    { name: 'Inca Trail', area: 'Cusco · Machu Picchu', km: 42, days: [4, 4], level: 2, months: [5, 6, 7, 8, 9], features: ['culture', 'peak'], needs: ['permit', 'guide', 'camping'] },
    { name: 'Salkantay Trek', area: 'Cusco', km: 74, days: [5, 5], level: 3, months: [5, 6, 7, 8, 9], features: ['peak', 'glacier'], needs: ['camping'] },
    { name: 'Huayhuash Circuit', area: 'Ancash', km: 130, days: [10, 12], level: 3, months: [5, 6, 7, 8, 9], features: ['peak', 'lake'], needs: ['camping'] },
    { name: 'Ausangate Trek', area: 'Cusco', km: 70, days: [5, 6], level: 3, months: [5, 6, 7, 8, 9], features: ['peak', 'lake'], needs: ['camping'] },
  ],
  TZ: [
    { name: 'Kilimanjaro – Machame Route', area: 'Kilimanjaro', km: 62, days: [6, 7], level: 3, months: [1, 2, 6, 7, 8, 9, 10], features: ['volcano', 'peak'], needs: ['permit', 'guide', 'camping'] },
    { name: 'Kilimanjaro – Lemosho Route', area: 'Kilimanjaro', km: 70, days: [7, 8], level: 3, months: [1, 2, 6, 7, 8, 9, 10], features: ['volcano', 'peak'], needs: ['permit', 'guide', 'camping'] },
  ],
  FR: [
    { name: 'Tour du Mont Blanc', area: 'Chamonix (France · Italy · Switzerland)', km: 170, days: [10, 11], level: 3, months: [6, 7, 8, 9], features: ['peak', 'glacier', 'culture'], needs: ['huts'] },
    { name: 'GR20', area: 'Corsica', km: 180, days: [12, 15], level: 3, months: [6, 7, 8, 9], features: ['ridge', 'peak'], needs: ['huts'] },
  ],
  IT: [
    { name: 'Alta Via 1', area: 'Dolomites', km: 120, days: [10, 12], level: 2, months: [6, 7, 8, 9], features: ['peak', 'ridge'], needs: ['huts'] },
    { name: 'Tre Cime di Lavaredo Loop', area: 'Dolomites', km: 10, days: [1, 1], level: 1, months: [6, 7, 8, 9, 10], features: ['peak'], needs: [] },
    { name: 'Sentiero Azzurro', area: 'Cinque Terre', km: 12, days: [1, 1], level: 1, months: [4, 5, 6, 9, 10], features: ['coast', 'culture'], needs: ['permit'] },
  ],
  CH: [
    { name: 'Walkers’ Haute Route', area: 'Chamonix → Zermatt', km: 180, days: [12, 14], level: 3, months: [7, 8, 9], features: ['peak', 'glacier'], needs: ['huts'] },
    { name: '5-Seenweg (Five Lakes Walk)', area: 'Zermatt', km: 10, days: [1, 1], level: 1, months: [6, 7, 8, 9, 10], features: ['lake', 'peak'], needs: [] },
  ],
  ES: [
    { name: 'Camino de Santiago (Camino Francés)', area: 'Saint-Jean-Pied-de-Port → Santiago', km: 780, days: [30, 35], level: 2, months: [4, 5, 6, 9, 10], features: ['culture'], needs: ['huts'] },
    { name: 'Ruta del Cares', area: 'Picos de Europa', km: 12, days: [1, 1], level: 2, months: [5, 6, 7, 8, 9, 10], features: ['canyon', 'peak'], needs: [] },
    { name: 'Caminito del Rey', area: 'Málaga', km: 8, days: [1, 1], level: 1, months: [3, 4, 5, 6, 9, 10, 11], features: ['canyon'], needs: ['permit'] },
  ],
  GB: [
    { name: 'West Highland Way', area: 'Scotland', km: 154, days: [7, 8], level: 2, months: [5, 6, 7, 8, 9], features: ['lake', 'peak'], needs: ['huts'] },
    { name: 'Coast to Coast Walk', area: 'England', km: 300, days: [12, 14], level: 2, months: [5, 6, 7, 8, 9], features: ['coast', 'lake'], needs: ['huts'] },
    { name: 'Yr Wyddfa (Snowdon) – Llanberis Path', area: 'Wales', km: 15, days: [1, 1], level: 2, months: [5, 6, 7, 8, 9], features: ['peak'], needs: [] },
  ],
  IS: [
    { name: 'Laugavegur Trail', area: 'Landmannalaugar → Þórsmörk', km: 55, days: [3, 4], level: 2, months: [7, 8, 9], features: ['volcano', 'glacier'], needs: ['huts'] },
    { name: 'Fimmvörðuháls', area: 'Skógar → Þórsmörk', km: 25, days: [1, 2], level: 3, months: [7, 8, 9], features: ['volcano', 'glacier'], needs: [] },
  ],
  NO: [
    { name: 'Trolltunga', area: 'Odda', km: 27, days: [1, 1], level: 3, months: [6, 7, 8, 9], features: ['ridge', 'lake'], needs: [] },
    { name: 'Preikestolen (Pulpit Rock)', area: 'Stavanger', km: 8, days: [1, 1], level: 1, months: [4, 5, 6, 7, 8, 9, 10], features: ['ridge', 'coast'], needs: [] },
    { name: 'Besseggen Ridge', area: 'Jotunheimen', km: 14, days: [1, 1], level: 2, months: [6, 7, 8, 9], features: ['ridge', 'lake'], needs: [] },
  ],
  JP: [
    { name: 'Kumano Kodo – Nakahechi', area: 'Wakayama', km: 70, days: [3, 4], level: 2, months: [3, 4, 5, 10, 11], features: ['culture', 'forest'], needs: ['huts'] },
    { name: 'Mt Fuji – Yoshida Trail', area: 'Yamanashi', km: 15, days: [1, 2], level: 3, months: [7, 8, 9], features: ['volcano', 'peak'], needs: ['permit', 'huts'] },
    { name: 'Nakasendo (Magome → Tsumago)', area: 'Kiso Valley', km: 8, days: [1, 1], level: 1, months: [3, 4, 5, 6, 9, 10, 11], features: ['culture', 'forest'], needs: [] },
    { name: 'Kamikochi Valley Walk', area: 'Nagano', km: 12, days: [1, 1], level: 1, months: [5, 6, 7, 8, 9, 10], features: ['peak', 'forest'], needs: [] },
  ],
  KR: [
    { name: 'Hallasan (Seongpanak Trail)', area: 'Jeju', km: 19, days: [1, 1], level: 3, months: [4, 5, 9, 10, 11], features: ['volcano', 'peak'], needs: ['permit'] },
    { name: 'Bukhansan (Baegundae Peak)', area: 'Seoul', km: 8, days: [1, 1], level: 2, months: [3, 4, 5, 9, 10, 11], features: ['peak', 'culture'], needs: [] },
    { name: 'Seoraksan (Daecheongbong Peak)', area: 'Gangwon', km: 22, days: [1, 2], level: 3, months: [5, 6, 9, 10], features: ['peak', 'ridge'], needs: [] },
    { name: 'Jirisan Ridge (Hwaeom–Daewon)', area: 'Gyeongnam · Jeonnam', km: 33, days: [2, 3], level: 3, months: [5, 6, 9, 10], features: ['ridge', 'peak'], needs: ['huts'] },
    { name: 'Jeju Olle Trail', area: 'Jeju', km: 437, days: [1, 25], level: 1, months: [3, 4, 5, 9, 10, 11], features: ['coast', 'culture'], needs: [] },
  ],
  TW: [
    { name: 'Yushan (Jade Mountain) Main Peak', area: 'Yushan National Park', km: 24, days: [2, 2], level: 3, months: [3, 4, 10, 11], features: ['peak', 'forest'], needs: ['permit', 'huts'] },
    { name: 'Jiaming Lake', area: 'Taitung', km: 26, days: [3, 3], level: 3, months: [3, 4, 10, 11], features: ['lake', 'peak'], needs: ['permit', 'huts'] },
    { name: 'Qixingshan', area: 'Yangmingshan · Taipei', km: 6, days: [1, 1], level: 1, months: [1, 2, 3, 4, 10, 11, 12], features: ['volcano', 'peak'], needs: [] },
  ],
  NZ: [
    { name: 'Milford Track', area: 'Fiordland', km: 54, days: [4, 4], level: 2, months: [11, 12, 1, 2, 3, 4], features: ['forest', 'lake'], needs: ['permit', 'huts'] },
    { name: 'Tongariro Alpine Crossing', area: 'Tongariro National Park', km: 19, days: [1, 1], level: 2, months: [11, 12, 1, 2, 3, 4], features: ['volcano', 'lake'], needs: [] },
    { name: 'Routeburn Track', area: 'Fiordland · Mt Aspiring', km: 33, days: [2, 4], level: 2, months: [11, 12, 1, 2, 3, 4], features: ['ridge', 'lake'], needs: ['permit', 'huts'] },
    { name: 'Abel Tasman Coast Track', area: 'Nelson', km: 60, days: [3, 5], level: 1, months: [10, 11, 12, 1, 2, 3, 4], features: ['coast', 'forest'], needs: ['permit', 'huts'] },
  ],
  AU: [
    { name: 'Overland Track', area: 'Tasmania', km: 65, days: [6, 6], level: 2, months: [10, 11, 12, 1, 2, 3, 4, 5], features: ['peak', 'lake', 'forest'], needs: ['permit', 'huts'] },
    { name: 'Larapinta Trail', area: 'Northern Territory', km: 223, days: [14, 20], level: 3, months: [5, 6, 7, 8], features: ['desert', 'ridge'], needs: ['camping'] },
  ],
  US: [
    { name: 'John Muir Trail', area: 'California', km: 340, days: [18, 24], level: 3, months: [7, 8, 9], features: ['peak', 'lake'], needs: ['permit', 'camping'] },
    { name: 'Half Dome', area: 'Yosemite', km: 23, days: [1, 1], level: 3, months: [6, 7, 8, 9, 10], features: ['peak'], needs: ['permit'] },
    { name: 'Angels Landing', area: 'Zion', km: 9, days: [1, 1], level: 3, months: [3, 4, 5, 9, 10, 11], features: ['ridge', 'canyon'], needs: ['permit'] },
    { name: 'Grand Canyon Rim to Rim', area: 'Arizona', km: 38, days: [1, 3], level: 3, months: [5, 6, 9, 10], features: ['canyon', 'desert'], needs: ['camping'] },
    { name: 'Kalalau Trail', area: 'Kauaʻi, Hawaii', km: 35, days: [2, 3], level: 3, months: [5, 6, 7, 8, 9], features: ['coast', 'forest'], needs: ['permit', 'camping'] },
  ],
  CA: [
    { name: 'West Coast Trail', area: 'Vancouver Island', km: 75, days: [6, 8], level: 3, months: [5, 6, 7, 8, 9], features: ['coast', 'forest'], needs: ['permit', 'camping'] },
    { name: 'Skyline Trail', area: 'Jasper', km: 44, days: [2, 3], level: 2, months: [7, 8, 9], features: ['ridge', 'peak'], needs: ['permit', 'camping'] },
    { name: 'Lake Agnes Tea House', area: 'Banff · Lake Louise', km: 7, days: [1, 1], level: 1, months: [6, 7, 8, 9], features: ['lake', 'peak'], needs: [] },
  ],
  CL: [
    { name: 'Torres del Paine – W Trek', area: 'Patagonia', km: 80, days: [4, 5], level: 2, months: [10, 11, 12, 1, 2, 3, 4], features: ['peak', 'glacier', 'lake'], needs: ['permit', 'huts'] },
    { name: 'Torres del Paine – O Circuit', area: 'Patagonia', km: 120, days: [7, 9], level: 3, months: [11, 12, 1, 2, 3], features: ['peak', 'glacier', 'lake'], needs: ['permit', 'huts'] },
  ],
  AR: [
    { name: 'Laguna de los Tres (Fitz Roy)', area: 'El Chaltén', km: 22, days: [1, 1], level: 3, months: [10, 11, 12, 1, 2, 3, 4], features: ['peak', 'glacier', 'lake'], needs: [] },
    { name: 'Laguna Torre', area: 'El Chaltén', km: 18, days: [1, 1], level: 2, months: [10, 11, 12, 1, 2, 3, 4], features: ['glacier', 'lake'], needs: [] },
  ],
  MY: [
    { name: 'Mount Kinabalu', area: 'Sabah, Borneo', km: 17, days: [2, 2], level: 3, months: [3, 4, 5, 6, 7, 8, 9], features: ['peak', 'forest'], needs: ['permit', 'guide', 'huts'] },
  ],
  MA: [
    { name: 'Toubkal', area: 'High Atlas', km: 22, days: [2, 2], level: 3, months: [4, 5, 6, 9, 10], features: ['peak', 'culture'], needs: ['guide', 'huts'] },
  ],
  BT: [
    { name: 'Druk Path Trek', area: 'Paro → Thimphu', km: 50, days: [5, 6], level: 2, months: [3, 4, 5, 9, 10, 11], features: ['culture', 'lake', 'peak'], needs: ['guide', 'camping'] },
    { name: 'Snowman Trek', area: 'Lunana', km: 320, days: [24, 28], level: 3, months: [9, 10], features: ['peak', 'glacier'], needs: ['guide', 'camping'] },
  ],
  IN: [
    { name: 'Markha Valley', area: 'Ladakh', km: 70, days: [6, 8], level: 3, months: [6, 7, 8, 9], features: ['peak', 'culture', 'desert'], needs: ['permit', 'huts'] },
    { name: 'Valley of Flowers', area: 'Uttarakhand', km: 38, days: [3, 4], level: 2, months: [7, 8, 9], features: ['forest', 'peak'], needs: ['permit'] },
  ],
};

/** 화면 언어별로 먼저 보여 줄 나라 */
export const DEFAULT_COUNTRY: Record<Locale, string> = { ko: 'KR', ja: 'JP', 'zh-hant': 'TW', en: 'NP', es: 'ES', de: 'CH', fr: 'FR', hi: 'IN' };
