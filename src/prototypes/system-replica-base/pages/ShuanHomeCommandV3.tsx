import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Search, Settings, UserRound, Video } from 'lucide-react';
import sichuanMapSvg from '../../../resources/shuan/sichuan-map.svg?raw';
import { normalizeInlineSvg } from '../../../common/inlineSvg';
import sichuanSatelliteBgUrl from '../../../resources/shuan/sichuan-satellite-bg-v2-bright.png';
import cockpitIconsSprite from '../../../resources/shuan/cockpit/icons.svg?raw';
import conceptDataBasicIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-basic.png';
import conceptDataLaborIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-labor.png';
import conceptDataDisasterIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-disaster.png';
import conceptDataMonitorIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-monitor.png';
import conceptDataProductionIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-production.png';
import conceptDataAccidentIconUrl from '../../../resources/shuan/cockpit/concept-icons/data-accident.png';
import shuanLogoUrl from '../../../resources/shuan/logo.svg';
import illegalGasIconUrl from '../../../resources/shuan/illegal-icons/gas-transparent.png';
import illegalWindIconUrl from '../../../resources/shuan/illegal-icons/wind-transparent.png';
import illegalPersonnelIconUrl from '../../../resources/shuan/illegal-icons/personnel-transparent.png';
import illegalCoalIconUrl from '../../../resources/shuan/illegal-icons/coal-transparent.png';
import illegalPowerIconUrl from '../../../resources/shuan/illegal-icons/power-transparent.png';
import illegalMineRectificationIconUrl from '../../../resources/shuan/illegal-icons/mine-rectification-transparent.png';
import illegalCountyInspectionIconUrl from '../../../resources/shuan/illegal-icons/county-inspection-transparent.png';
import illegalCityAnalysisIconUrl from '../../../resources/shuan/illegal-icons/city-analysis-transparent.png';
import illegalProvinceSupervisionIconUrl from '../../../resources/shuan/illegal-icons/province-supervision-transparent.png';
import { ShuanDrilldownContent } from './shuan-drilldowns/ShuanDrilldownPages';
import { shuanIllegalDisposalRows } from './shuan-drilldowns/data';
import {
  SICHUAN_TOTAL_MINES,
  SICHUAN_PRODUCING_MINES,
  SICHUAN_BUILDING_MINES,
  SICHUAN_RECTIFICATION_MINES,
  SICHUAN_ONE_STOP_FOUR_KEEP_MINES,
  SICHUAN_SEALED_MINES,
} from '../../../resources/shuan/sichuan-mine-baseline';

export type ShuanHomeVariant = 'command' | 'portal' | 'dispatch';

interface ShuanHomeConceptPageProps {
  variant: ShuanHomeVariant;
  onVariantChange: (variant: ShuanHomeVariant) => void;
  onOpenPage?: (pageId: string) => void;
  activeOverlayPage?: string | null;
}

type CockpitIconName =
  | 'activity'
  | 'badge'
  | 'bell'
  | 'building'
  | 'check'
  | 'cloud'
  | 'database'
  | 'fan'
  | 'home'
  | 'hydro-geology'
  | 'capacity-gauge'
  | 'mine'
  | 'mine-building'
  | 'mine-producing'
  | 'mine-rectify'
  | 'mine-sealed'
  | 'mine-stop-keep'
  | 'monitor'
  | 'settings'
  | 'shield'
  | 'siren'
  | 'users'
  | 'warning'
  | 'zap'
  | 'gas-flame'
  | 'coal-output'
  | 'underground-worker'
  | 'data-basic'
  | 'data-labor'
  | 'data-disaster'
  | 'data-monitor'
  | 'data-production'
  | 'data-accident';

type IconDataRow = [string, string, CockpitIconName];
type TimeRangeValue = 'today' | 'week' | 'month';
type StatusTone = 'blue' | 'green' | 'amber' | 'purple' | 'red';

type ReminderTone = 'amber' | 'cyan';

const timeRangeOptions: Array<{ value: TimeRangeValue; label: string }> = [
  { value: 'today', label: '今日' },
  { value: 'week', label: '近7日' },
  { value: 'month', label: '近30日' },
];

const navItems: Array<[string, CockpitIconName, boolean]> = [
  ['首页', 'home', true],
  ['日常监管', 'monitor', false],
  ['打非治违', 'siren', false],
  ['从业人员管理', 'users', false],
  ['生产管理', 'mine', false],
  ['系统设置', 'settings', false],
];

const navPageMap: Record<string, string> = {
  首页: 'shuan-home-command-v3',
  日常监管: 'shuan-home-command-v3-daily-regulation',
  打非治违: 'shuan-home-command-v3-illegal-algorithms',
  从业人员管理: 'shuan-home-command-v3-personnel-safety',
  生产管理: 'shuan-home-command-v3-production-management',
  系统设置: 'system-config',
};

const mineStatusRows: Array<{ label: string; value: number; tone: StatusTone }> = [
  { label: '生产矿井', value: SICHUAN_PRODUCING_MINES, tone: 'blue' },
  { label: '建设矿井', value: SICHUAN_BUILDING_MINES, tone: 'green' },
  { label: '隐患整改矿井', value: SICHUAN_RECTIFICATION_MINES, tone: 'amber' },
  { label: '一停四不停矿井', value: SICHUAN_ONE_STOP_FOUR_KEEP_MINES, tone: 'purple' },
  { label: '井口封（锁）闭矿井', value: SICHUAN_SEALED_MINES, tone: 'red' },
];

const coalProductionStats: IconDataRow[] = [
  ['本年度累计产煤量', '2,429万吨', 'coal-output'],
  ['本月产煤量', '214万吨', 'activity'],
  ['采煤工作面', '76个', 'mine-producing'],
  ['掘进工作面', '52个', 'building'],
];

const undergroundSceneStats: IconDataRow[] = [
  ['从业人员总数', '58,624人', 'users'],
  ['当前井下人员', '2,864人', 'underground-worker'],
  ['井下带班领导', '42人', 'shield'],
  ['井下特种作业人员', '318人', 'building'],
];

const gasHazardRows = [
  { label: '高瓦斯', value: 77, percent: '39.2%' },
  { label: '低瓦斯', value: 73, percent: '37.2%' },
  { label: '突出', value: 24, percent: '12.2%' },
] as const;

const hydroHazardRows = [
  { label: '中等', value: 137, percent: '76.5%', tone: 'blue' as const },
  { label: '简单', value: 19, percent: '10.6%', tone: 'green' as const },
  { label: '复杂', value: 16, percent: '8.9%', tone: 'amber' as const },
  { label: '极复杂', value: 2, percent: '1.1%', tone: 'red' as const },
] as const;

const dataCatalogRows: Array<{ name: string; count: number; icon: CockpitIconName; iconUrl: string; tone: StatusTone }> = [
  { name: '煤矿基础数据', count: 28, icon: 'data-basic', iconUrl: conceptDataBasicIconUrl, tone: 'blue' },
  { name: '人员与用工数据', count: 16, icon: 'data-labor', iconUrl: conceptDataLaborIconUrl, tone: 'green' },
  { name: '自然灾害数据', count: 12, icon: 'data-disaster', iconUrl: conceptDataDisasterIconUrl, tone: 'green' },
  { name: '安全监测数据', count: 36, icon: 'data-monitor', iconUrl: conceptDataMonitorIconUrl, tone: 'blue' },
  { name: '生产运行数据', count: 21, icon: 'data-production', iconUrl: conceptDataProductionIconUrl, tone: 'blue' },
  { name: '事故保障数据', count: 9, icon: 'data-accident', iconUrl: conceptDataAccidentIconUrl, tone: 'amber' },
];

const alarmLevels = [
  ['红色', '9', '7.6%', 'red'],
  ['橙色', '22', '18.6%', 'orange'],
  ['黄色', '47', '39.8%', 'yellow'],
  ['蓝色', '40', '33.9%', 'blue'],
] as const;

const dailyRegulationAlertGroups = [
  { title: '环境监测', icon: 'cloud' as CockpitIconName, total: '72', badge: '报警焦点', items: [['甲烷超限', 42], ['CO超限', 30]] },
  { title: '人员定位', icon: 'users' as CockpitIconName, total: '18', badge: '定位焦点', items: [['区域超员', 11], ['人员求救', 7]] },
  { title: '水害防治', icon: 'activity' as CockpitIconName, total: '28', badge: '动态监测', items: [['长观孔水位', 16], ['矿井涌水量', 12]] },
];

const dailyRegulationEntryRows = [
  { title: '危险作业报备', icon: 'badge' as CockpitIconName, tone: 'cyan' as ReminderTone, total: '18', unit: '待审核', meta: [['密闭', '2件'], ['放炮', '6件']], action: '进入审批', page: 'shuan-home-command-v3-dangerous-work-report' },
  { title: '风险分级管控', icon: 'shield' as CockpitIconName, tone: 'cyan' as ReminderTone, total: '12', unit: '高风险点', meta: [['高风险', '38'], ['动态', '7']], action: '查看清单', page: 'shuan-home-command-v3-risk-control' },
  { title: '隐患管理', icon: 'warning' as CockpitIconName, tone: 'amber' as ReminderTone, total: '23', unit: '整改中', meta: [['新增', '9'], ['待验收', '6']], action: '进入治理', page: 'shuan-home-command-v3-hidden-danger-management' },
] as const;

const reminderTasks = [
  { tone: 'amber' as ReminderTone, title: '证照到期提醒', highlight: '5', detail: '5个证照将在30日内到期', icon: 'badge' as CockpitIconName, page: 'shuan-home-command-v3-license-expiry-reminder' },
  { tone: 'cyan' as ReminderTone, title: '重大灾害提醒', highlight: '3', detail: '3项重大灾害风险需持续跟踪', icon: 'warning' as CockpitIconName, page: 'shuan-home-command-v3-major-hazard-reminder' },
];

const illegalSourceRows = [
  { id: 'gas', name: '瓦斯', iconUrl: illegalGasIconUrl, tone: 'cyan', metrics: [['线索', '28'], ['待核查', '16'], ['关联矿井', '12']] },
  { id: 'wind', name: '风', iconUrl: illegalWindIconUrl, tone: 'green', metrics: [['线索', '19'], ['待核查', '11'], ['关联矿井', '9']] },
  { id: 'personnel', name: '人', iconUrl: illegalPersonnelIconUrl, tone: 'amber', metrics: [['线索', '34'], ['待核查', '18'], ['关联矿井', '15']] },
  { id: 'coal', name: '煤', iconUrl: illegalCoalIconUrl, tone: 'blue', metrics: [['线索', '24'], ['待核查', '13'], ['关联矿井', '11']] },
  { id: 'power', name: '电', iconUrl: illegalPowerIconUrl, tone: 'red', metrics: [['线索', '22'], ['待核查', '12'], ['关联矿井', '10']] },
] as const;

const illegalCampaignRows = [
  { title: '隐蔽工作面专项整治', page: 'shuan-home-command-v3-illegal-campaign-hidden-face', metrics: [['疑似矿井', '18'], ['较高风险', '9'], ['待核查', '23']] },
  { title: '监控系统造假专项整治', page: 'shuan-home-command-v3-illegal-campaign-monitor-fake', metrics: [['疑似矿井', '16'], ['较高风险', '8'], ['待核查', '20']] },
  { title: '隐瞒入井人数专项整治', page: 'shuan-home-command-v3-illegal-campaign-hidden-person', metrics: [['疑似矿井', '14'], ['较高风险', '7'], ['待核查', '17']] },
] as const;

const illegalDisposalIconByTitle: Record<string, string> = {
  '煤矿整改': illegalMineRectificationIconUrl,
  '县级走访': illegalCountyInspectionIconUrl,
  '市级研判': illegalCityAnalysisIconUrl,
  '省挂牌督办': illegalProvinceSupervisionIconUrl,
};

const illegalSourceDrilldownPage: Record<(typeof illegalSourceRows)[number]['id'], string> = {
  gas: 'shuan-home-command-v3-illegal-algorithms',
  wind: 'shuan-home-command-v3-illegal-algorithms',
  personnel: 'shuan-home-command-v3-illegal-algorithms',
  coal: 'shuan-home-command-v3-illegal-algorithms',
  power: 'shuan-home-command-v3-illegal-algorithms',
};

const mapRegions = [
  { name: '达州市', x: 80, y: 53, status: 'red' as const, count: 41, aliases: ['达州'], labelX: 10, labelY: 30 },
  { name: '宜宾市', x: 57, y: 83, status: 'orange' as const, count: 30, aliases: ['宜宾', '芙蓉煤矿'], labelX: 0, labelY: 30 },
  { name: '攀枝花市', x: 35, y: 92, status: 'red' as const, count: 18, aliases: ['攀枝花'], labelX: -48, labelY: -46 },
  { name: '乐山市', x: 49, y: 71, status: 'yellow' as const, count: 15, aliases: ['乐山', '嘉阳煤矿'], labelX: -4, labelY: 30 },
  { name: '广安市', x: 75, y: 59, status: 'yellow' as const, count: 14, aliases: ['广安'], labelX: 28, labelY: 18 },
  { name: '泸州市', x: 66, y: 78, status: 'yellow' as const, count: 13, aliases: ['泸州', '古叙煤矿'], labelX: 28, labelY: 20 },
  { name: '广元市', x: 70, y: 35, status: 'orange' as const, count: 11, aliases: ['广元', '广旺煤矿'], labelX: -18, labelY: -58 },
  { name: '雅安市', x: 42, y: 62, status: 'blue' as const, count: 10, aliases: ['雅安'], labelX: -22, labelY: 24 },
  { name: '内江市', x: 61, y: 66, status: 'blue' as const, count: 9, aliases: ['内江'], labelX: -30, labelY: -28 },
  { name: '自贡市', x: 60, y: 72, status: 'blue' as const, count: 7, aliases: ['自贡'], labelX: 28, labelY: 16 },
  { name: '凉山州', x: 43, y: 84, status: 'blue' as const, count: 4, aliases: ['凉山', '凉山彝族自治州'], labelX: 34, labelY: 18 },
  { name: '巴中市', x: 79, y: 40, status: 'blue' as const, count: 2, aliases: ['巴中'], labelX: 24, labelY: -24 },
];

const riskLegend = [
  { key: 'red', label: '红色预警' },
  { key: 'orange', label: '橙色预警' },
  { key: 'yellow', label: '黄色预警' },
  { key: 'blue', label: '蓝色预警' },
  { key: 'safe', label: '运行正常' },
] as const;

const normalizedSichuanMapSvg = normalizeInlineSvg(sichuanMapSvg);
const cockpitIconSymbols = parseCockpitIconSymbols(cockpitIconsSprite);

function parseCockpitIconSymbols(sprite: string) {
  const symbols: Partial<Record<CockpitIconName, { viewBox: string; content: string }>> = {};
  const symbolPattern = /<symbol\s+id="([^"]+)"\s+viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/symbol>/g;
  for (const match of sprite.matchAll(symbolPattern)) {
    const [, id, viewBox, content] = match;
    symbols[id as CockpitIconName] = { viewBox, content };
  }
  return symbols;
}

function CockpitIcon({ name, className = '' }: { name: CockpitIconName; className?: string }) {
  const symbol = cockpitIconSymbols[name];
  return (
    <svg
      className={`cockpit-svg-icon ${className}`}
      aria-hidden="true"
      viewBox={symbol?.viewBox || '0 0 32 32'}
      dangerouslySetInnerHTML={{ __html: symbol?.content || '' }}
    />
  );
}

function Panel({ title, children, className = '', titleAction, action, annotationId }: { title: string; children: React.ReactNode; className?: string; titleAction?: React.ReactNode; action?: React.ReactNode; annotationId?: string }) {
  return (
    <section className={`shuan-panel ${className}`} data-annotation-id={annotationId}>
      <div className="panel-title">
        <span className="panel-title-text">{title}</span>
        {titleAction && <span className="panel-title-action">{titleAction}</span>}
      </div>
      {action && <div className="panel-action">{action}</div>}
      {children}
    </section>
  );
}

function MoreButton({ pageId, onOpenPage, label = '更多' }: { pageId: string; onOpenPage?: (pageId: string) => void; label?: string }) {
  return (
    <button type="button" className="shuan-wire-more" onClick={() => onOpenPage?.(pageId)}>
      <span>{label}</span>
      <ExternalLink aria-hidden="true" />
    </button>
  );
}

function TimeRangeControl({ value, onChange, label }: { value: TimeRangeValue; onChange: (value: TimeRangeValue) => void; label: string }) {
  return <div className="panel-time-range" role="group" aria-label={label}>{timeRangeOptions.map((option) => <button key={option.value} type="button" className={value === option.value ? 'active' : ''} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>;
}

function getActiveTopNavLabel() {
  // Drilldowns replace only the homepage workspace; the top navigation stays on 首页.
  return '首页';
}

function TopHeader({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  const activeNavLabel = getActiveTopNavLabel();
  return (
    <header className="shuan-header" data-annotation-id="shuan-v3-header">
      <div className="shuan-brand"><span className="shuan-emblem"><img src={shuanLogoUrl} alt="" /></span><div className="shuan-title">“蜀安”煤矿多源异构监测系统</div></div>
      <nav className="command-nav" aria-label="系统顶部导航">{navItems.map(([label, icon, hasContent]) => <button key={label} type="button" className={label === activeNavLabel ? 'active' : ''} aria-disabled={!hasContent} onClick={() => { if (hasContent) onOpenPage?.(navPageMap[label] || 'shuan-home-command-v3'); }}><CockpitIcon name={icon} /><span>{label}</span></button>)}</nav>
      <div className="shuan-top-tools"><button type="button" className="shuan-tool-round shuan-video-entry" aria-label="视频入口" onClick={() => onOpenPage?.('shuan-home-command-v3-video-dispatch')}><Video /></button><button type="button" className="shuan-tool-badge" aria-label="报警消息"><CockpitIcon name="bell" /><b>18</b></button><button type="button" className="shuan-tool-round" aria-label="用户"><UserRound /></button><span className="shuan-user">李明远 <ChevronDown /></span><button type="button" className="shuan-icon-tool" aria-label="设置"><Settings /></button></div>
    </header>
  );
}

function RegulatedMinePanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  return (
    <Panel
      title="煤矿生产状态统计"
      className="regulated-mine-panel regulated-mine-panel-v3"
      titleAction={<MoreButton pageId="shuan-home-command-v3-production-status" onOpenPage={onOpenPage} />}
      action={<div className="mine-status-topline"><span>煤矿总数</span><strong>{SICHUAN_TOTAL_MINES}</strong><em>处</em></div>}
    >
      <div className="mine-status-card-grid">
        {mineStatusRows.map(({ label, value, tone }) => (
          <article key={label} className={`mine-status-card tone-${tone}`}>
            <div className="mine-status-card-copy">
              <b>{label}</b>
              <strong>{value}</strong>
              <em>处</em>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function GasHazardPanel() {
  return (
    <Panel title="矿井瓦斯等级" className="hazard-panel gas-hazard-panel">
      <div className="hazard-panel-body">
        <div className="gas-hazard-legend">
          {gasHazardRows.map((item) => (
            <div key={item.label} className="gas-hazard-legend-row">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <em>{item.percent}</em>
            </div>
          ))}
        </div>
        <div className="gas-hazard-ring-wrap">
          <div className="gas-hazard-ring" aria-label="煤矿瓦斯灾害分布环图">
            <div className="gas-hazard-ring-core">
              <CockpitIcon name="gas-flame" />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function HydroHazardPanel() {
  return (
    <Panel title="矿井水文地质类型" className="hazard-panel hydro-hazard-panel">
      <div className="hydro-hazard-list">
        {hydroHazardRows.map((item) => (
          <div key={item.label} className={`hydro-hazard-row tone-${item.tone}`}>
            <span className="hydro-hazard-label">{item.label}</span>
            <div className="hydro-hazard-bar"><i /></div>
            <strong>{item.value}</strong>
            <em>{item.percent}</em>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ProductionSituationPanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  return (
    <Panel title="煤矿生产情况" className="metric-strip-panel production-situation-panel" titleAction={<MoreButton pageId="shuan-home-command-v3-production-operation" onOpenPage={onOpenPage} />}>
      <div className="metric-strip-grid metric-strip-grid-production">
        {coalProductionStats.map(([label, value, icon]) => (
          <article key={label} className="metric-strip-card">
            <span className="metric-strip-icon"><CockpitIcon name={icon} /></span>
            <div className="metric-strip-copy">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function PersonnelSituationPanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  return (
    <Panel title="从业人员情况" className="metric-strip-panel personnel-situation-panel" titleAction={<MoreButton pageId="shuan-home-command-v3-personnel-safety" onOpenPage={onOpenPage} />}>
      <div className="metric-strip-grid metric-strip-grid-personnel">
        {undergroundSceneStats.map(([label, value, icon]) => (
          <article key={label} className="metric-strip-card">
            <span className="metric-strip-icon"><CockpitIcon name={icon} /></span>
            <div className="metric-strip-copy">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function DataAggregationPanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  return (
    <Panel title="数据汇聚情况" className="data-aggregation-panel data-aggregation-panel-v3" titleAction={<MoreButton pageId="shuan-home-command-v3-data-health" onOpenPage={onOpenPage} />}>
      <div className="data-category-grid">
        {dataCatalogRows.map(({ name, count, icon, iconUrl, tone }) => (
          <article key={name} className={`data-category-card tone-${tone}`}>
            <span className="data-category-icon concept-icon"><img src={iconUrl} alt="" /><CockpitIcon name={icon} /></span>
            <span className="data-category-count"><strong>{count}</strong><em>项</em></span>
            <strong>{name}</strong>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function LeftInsightPanels({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  return (
    <>
      <RegulatedMinePanel onOpenPage={onOpenPage} />
      <ProductionSituationPanel onOpenPage={onOpenPage} />
      <PersonnelSituationPanel onOpenPage={onOpenPage} />
      <DataAggregationPanel onOpenPage={onOpenPage} />
      <div className="left-hazard-grid">
        <GasHazardPanel />
        <HydroHazardPanel />
      </div>
    </>
  );
}

function CommandV2Concept({ onOpenPage, activeOverlayPage }: { onOpenPage?: (pageId: string) => void; activeOverlayPage?: string | null }) {
  const isWorkspaceDrilldown = activeOverlayPage === 'shuan-home-command-v3-data-health';

  return (
    <div className="shuan-concept shuan-command shuan-command-v2 shuan-command-v3">
      <TopHeader onOpenPage={onOpenPage} />
      {isWorkspaceDrilldown ? (
        <section className="shuan-drilldown-workspace" data-annotation-id="shuan-v3-drill-stage">
          <ShuanDrilldownContent pageId={activeOverlayPage} onExit={() => onOpenPage?.('shuan-home-command-v3')} />
        </section>
      ) : (
        <main className="command-grid">
          <div className="command-left" data-annotation-id="shuan-v3-left-overview"><LeftInsightPanels onOpenPage={onOpenPage} /></div>
          <MapStage onOpenPage={onOpenPage} />
          <div className="command-right"><DailyRegulationPanel onOpenPage={onOpenPage} /><IllegalTreatmentPanel onOpenPage={onOpenPage} /></div>
        </main>
      )}
      {activeOverlayPage && !isWorkspaceDrilldown ? (
        <section className="shuan-drilldown-overlay" data-annotation-id="shuan-v3-drill-stage">
          <div className="shuan-drilldown-overlay-backdrop" aria-hidden="true" onClick={() => onOpenPage?.('shuan-home-command-v3')} />
          <div className="shuan-drilldown-overlay-panel">
            <ShuanDrilldownContent pageId={activeOverlayPage} onExit={() => onOpenPage?.('shuan-home-command-v3')} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function ShuanHomeCommandV3Page({ onOpenPage, activeOverlayPage }: ShuanHomeConceptPageProps) {
  return <CommandV2Concept onOpenPage={onOpenPage} activeOverlayPage={activeOverlayPage} />;
}

export function getShuanVariantFromPage(page: string): ShuanHomeVariant | null {
  if (page === 'shuan-home-command') return 'command';
  if (page === 'shuan-home-portal') return 'portal';
  if (page === 'shuan-home-dispatch') return 'dispatch';
  return null;
}

function MapStage({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const trimmedQuery = searchQuery.trim();
  const activeRegion = trimmedQuery
    ? mapRegions.find((region) => [region.name, ...region.aliases].some((item) => item.includes(trimmedQuery)))
    : null;

  return (
    <section className="command-map-stage" data-annotation-id="shuan-v3-map-aggregation">
      <div className="shuan-stage-satellite" aria-hidden="true" style={{ backgroundImage: `url(${sichuanSatelliteBgUrl})` }} />
      <form className="map-search-box" onSubmit={(event) => event.preventDefault()} role="search" aria-label="快速定位煤矿">
        <Search aria-hidden="true" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="快速定位煤矿，支持区域或煤矿名称"
          aria-label="快速定位煤矿"
        />
        <button type="submit">定位</button>
      </form>
      <div className="shuan-map dark">
        <div className="shuan-map-satellite" aria-hidden="true" style={{ backgroundImage: `url(${sichuanSatelliteBgUrl})` }} />
        <div className="shuan-svg-map" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
        <div className="shuan-map-points" aria-label="四川煤矿区域汇聚点位">
          {mapRegions.map((region) => {
            const isActive = activeRegion?.name === region.name;
            return (
              <button
                type="button"
                key={region.name}
                className={`shuan-map-point region-dot risk-${region.status}${isActive ? ' is-active' : ''}${trimmedQuery && !isActive ? ' is-dimmed' : ''}`}
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  '--label-x': `${region.labelX}px`,
                  '--label-y': `${region.labelY}px`,
                } as React.CSSProperties}
                aria-label={`${region.name} 汇聚 ${region.count} 处煤矿`}
                onClick={() => onOpenPage?.('shuan-home-command-v3-region-cockpit')}
              >
                <b>{region.count}</b>
                <span>{region.name}</span>
              </button>
            );
          })}
        </div>
        <div className="shuan-map-legend" aria-label="地图风险图例">
          <div className="map-legend-title"><span className="map-legend-check" aria-hidden="true">✓</span><b>分级预警</b></div>
          <div className="map-legend-list">{riskLegend.map((item) => <span key={item.key} className={`legend-chip tone-${item.key}`}><i aria-hidden="true" />{item.label.replace('运行正常', '低风险')}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function DailyRegulationPanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  const openDailyRegulation = () => onOpenPage?.('shuan-home-command-v3-daily-regulation');
  return (
    <Panel
      title="日常监管"
      className="daily-regulation-panel daily-regulation-panel-v2-visual"
      annotationId="shuan-v3-daily-regulation"
      action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="日常监管数据时间范围" />}
    >
      <div className="daily-regulation-hero">
        <div className="daily-regulation-summary-strip">
          <button type="button" className="daily-regulation-summary-card total is-clickable" onClick={openDailyRegulation}>
            <span className="summary-label">预警总数</span>
            <strong>118</strong>
          </button>
          <button type="button" className="daily-regulation-summary-card distribution is-clickable" onClick={openDailyRegulation}>
            <span className="summary-label">预警分级分布</span>
            <div className="daily-regulation-distribution-values">{alarmLevels.map(([label, value, _percent, tone]) => <span key={label} className={`tone-${tone}`}><b>{value}</b><em>{label}</em></span>)}</div>
            <div className="daily-regulation-distribution-bar" aria-label="预警分级结构">{alarmLevels.map(([label, value, _percent, tone]) => <i key={label} className={`tone-${tone}`} style={{ flexGrow: Number(value) }} aria-label={`${label}${value}条`} />)}</div>
          </button>
          <button type="button" className="daily-regulation-summary-card rate is-clickable" onClick={openDailyRegulation}>
            <span className="summary-label">预警处置率</span>
            <div className="daily-regulation-rate-wrap">
              <div className="daily-regulation-rate-meta"><span><em>已处置</em><b>97</b></span><span><em>待处置</em><b>21</b></span></div>
              <div className="daily-regulation-rate-ring" aria-label="预警处置率 82%">
                <div className="daily-regulation-rate-core"><b>82%</b></div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="daily-regulation-domain-grid" aria-label="分级报警处置">{dailyRegulationAlertGroups.map((group) => <button type="button" key={group.title} className="daily-regulation-domain-card is-clickable" onClick={openDailyRegulation}><header><span className="daily-regulation-domain-title"><CockpitIcon name={group.icon} /><b>{group.title}</b></span><strong>{group.total}</strong></header><div className="daily-regulation-domain-items">{group.items.map(([name, count]) => <span key={name}><em>{name}</em><b>{count}</b></span>)}</div></button>)}</div>
      <div className="daily-regulation-entry-grid" aria-label="监管业务入口">
        {dailyRegulationEntryRows.map((entry) => <button type="button" key={entry.title} className={`daily-regulation-entry-card tone-${entry.tone} is-clickable`} onClick={() => onOpenPage?.('page' in entry ? entry.page : 'shuan-home-command-v3-daily-regulation')}><header><span><CockpitIcon name={entry.icon} /><b>{entry.title}</b></span><strong>{entry.total}</strong></header><div className="daily-regulation-entry-meta">{entry.meta.map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></button>)}
      </div>
      <div className="daily-regulation-reminder-inline" aria-label="重点提醒">
        {reminderTasks.map((item) => (
          <button
            type="button"
            key={item.title}
            className={`daily-regulation-reminder-card tone-${item.tone}${item.page ? ' is-clickable' : ''}`}
            onClick={item.page ? () => onOpenPage?.(item.page) : undefined}
          >
            <span className="reminder-card-icon"><CockpitIcon name={item.icon} /></span>
            <div className="reminder-card-copy">
              <header><b>{item.title}</b><strong>{item.highlight}</strong></header>
              <p>{item.detail}</p>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function IllegalTreatmentPanel({ onOpenPage }: { onOpenPage?: (pageId: string) => void }) {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  return (
    <Panel title="打非治违" className="illegal-treatment-panel" annotationId="shuan-v3-illegal-treatment" action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="打非治违数据时间范围" />}>
        <div className="illegal-funnel-shell">
          <div className="illegal-source-grid" aria-label="五类智能算法线索">
          {illegalSourceRows.map((item) => <button type="button" key={item.id} className={`illegal-source-card tone-${item.tone}`} onClick={() => onOpenPage?.(illegalSourceDrilldownPage[item.id])}><strong className="illegal-source-total">{item.metrics[0][1]}</strong><span className="illegal-source-icon"><img src={item.iconUrl} alt="" /></span><em className="illegal-source-name">{item.name}</em><div className="illegal-source-meta">{item.metrics.slice(1).map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></button>)}
        </div>
        <div className="illegal-campaign-grid" aria-label="三类专项整治">
          {illegalCampaignRows.map((item) => <button type="button" key={item.title} className="illegal-campaign-card" onClick={() => onOpenPage?.(item.page)}><header><strong>{item.title}</strong></header><div>{item.metrics.map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></button>)}
        </div>
        <div className="illegal-disposal-strip" aria-label="分级处置任务">
          {shuanIllegalDisposalRows.map((item, index) => <React.Fragment key={item.title}>{item.page ? <button type="button" className={`illegal-disposal-card tone-${item.tone}`} onClick={() => onOpenPage?.(item.page)}><span className="illegal-disposal-icon"><img src={illegalDisposalIconByTitle[item.title]} alt="" /></span><div><strong>{item.title}</strong><em>{item.owner}</em></div><p><small>待办<b>{item.todo}</b></small><small>闭环<b>{item.closed}</b></small></p></button> : <article className={`illegal-disposal-card tone-${item.tone}`}><span className="illegal-disposal-icon"><img src={illegalDisposalIconByTitle[item.title]} alt="" /></span><div><strong>{item.title}</strong><em>{item.owner}</em></div><p><small>待办<b>{item.todo}</b></small><small>闭环<b>{item.closed}</b></small></p></article>}{index < shuanIllegalDisposalRows.length - 1 && <i aria-hidden="true" />}</React.Fragment>)}
        </div>
      </div>
    </Panel>
  );
}



