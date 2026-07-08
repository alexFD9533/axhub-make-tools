/**
 * Sichuan coal mine baseline for the Shuan V2 dashboard.
 * Source: user-provided mine ledger, baseline date 2026-06-26.
 */

export type SichuanMineStatusKey =
  | 'producing'
  | 'building'
  | 'rectification'
  | 'oneStopFourKeep'
  | 'sealed';

export interface SichuanCityMineCount {
  name: string;
  key: string;
  total: number;
  producing: number;
  building: number;
  rectification: number;
  oneStopFourKeep: number;
  sealed: number;
}

export interface SichuanMineStatusSummary {
  key: SichuanMineStatusKey;
  label: string;
  count: number;
}

export const SICHUAN_TOTAL_MINES = 174;
export const SICHUAN_PRODUCING_MINES = 64;
export const SICHUAN_BUILDING_MINES = 13;
export const SICHUAN_RECTIFICATION_MINES = 12;
export const SICHUAN_ONE_STOP_FOUR_KEEP_MINES = 34;
export const SICHUAN_SEALED_MINES = 51;
export const SICHUAN_NON_PRODUCING_MINES =
  SICHUAN_TOTAL_MINES - SICHUAN_PRODUCING_MINES;

export const SICHUAN_MINE_STATUS_SUMMARY: SichuanMineStatusSummary[] = [
  { key: 'producing', label: '生产矿井', count: SICHUAN_PRODUCING_MINES },
  { key: 'building', label: '建设矿井', count: SICHUAN_BUILDING_MINES },
  { key: 'rectification', label: '隐患整改', count: SICHUAN_RECTIFICATION_MINES },
  { key: 'oneStopFourKeep', label: '一停四不停', count: SICHUAN_ONE_STOP_FOUR_KEEP_MINES },
  { key: 'sealed', label: '井口封闭', count: SICHUAN_SEALED_MINES },
];

export const SICHUAN_MINE_CITY_BREAKDOWN: SichuanCityMineCount[] = [
  { name: '内江市', key: 'neijiang', total: 9, producing: 6, building: 1, rectification: 2, oneStopFourKeep: 0, sealed: 0 },
  { name: '乐山市', key: 'leshan', total: 15, producing: 11, building: 2, rectification: 0, oneStopFourKeep: 2, sealed: 0 },
  { name: '凉山州', key: 'liangshan', total: 4, producing: 1, building: 2, rectification: 0, oneStopFourKeep: 1, sealed: 0 },
  { name: '自贡市', key: 'zigong', total: 7, producing: 4, building: 0, rectification: 0, oneStopFourKeep: 0, sealed: 3 },
  { name: '攀枝花市', key: 'panzhihua', total: 18, producing: 7, building: 5, rectification: 2, oneStopFourKeep: 0, sealed: 4 },
  { name: '宜宾市', key: 'yibin', total: 30, producing: 3, building: 0, rectification: 1, oneStopFourKeep: 10, sealed: 16 },
  { name: '泸州市', key: 'luzhou', total: 13, producing: 5, building: 0, rectification: 0, oneStopFourKeep: 4, sealed: 4 },
  { name: '广安市', key: 'guangan', total: 14, producing: 9, building: 1, rectification: 0, oneStopFourKeep: 1, sealed: 3 },
  { name: '达州市', key: 'dazhou', total: 41, producing: 11, building: 2, rectification: 6, oneStopFourKeep: 13, sealed: 9 },
  { name: '雅安市', key: 'yaan', total: 10, producing: 0, building: 0, rectification: 1, oneStopFourKeep: 0, sealed: 9 },
  { name: '广元市', key: 'guangyuan', total: 11, producing: 6, building: 0, rectification: 0, oneStopFourKeep: 3, sealed: 2 },
  { name: '巴中市', key: 'bazhong', total: 2, producing: 1, building: 0, rectification: 0, oneStopFourKeep: 0, sealed: 1 },
];

export function getCityStatusCount(
  city: SichuanCityMineCount,
  status: SichuanMineStatusKey,
): number {
  return city[status];
}
