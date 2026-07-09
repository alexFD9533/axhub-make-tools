import React, { useState } from 'react';
import { ChevronDown, Search, Settings, UserRound } from 'lucide-react';
import sichuanMapSvg from '../../../resources/shuan/sichuan-map.svg?raw';
import { normalizeInlineSvg } from '../../../common/inlineSvg';
import sichuanSatelliteBgUrl from '../../../resources/shuan/sichuan-satellite-bg-v2-bright.png';
import cockpitIconsSprite from '../../../resources/shuan/cockpit/icons.svg?raw';
import illegalGasIconUrl from '../../../resources/shuan/illegal-icons/gas-transparent.png';
import illegalWindIconUrl from '../../../resources/shuan/illegal-icons/wind-transparent.png';
import illegalPersonnelIconUrl from '../../../resources/shuan/illegal-icons/personnel-transparent.png';
import illegalCoalIconUrl from '../../../resources/shuan/illegal-icons/coal-transparent.png';
import illegalPowerIconUrl from '../../../resources/shuan/illegal-icons/power-transparent.png';
import illegalJudgeIconUrl from '../../../resources/shuan/illegal-icons/judge-core-transparent.png';
import illegalMineRectificationIconUrl from '../../../resources/shuan/illegal-icons/mine-rectification-transparent.png';
import illegalCountyInspectionIconUrl from '../../../resources/shuan/illegal-icons/county-inspection-transparent.png';
import illegalCityAnalysisIconUrl from '../../../resources/shuan/illegal-icons/city-analysis-transparent.png';
import illegalProvinceSupervisionIconUrl from '../../../resources/shuan/illegal-icons/province-supervision-transparent.png';
import {
  SICHUAN_TOTAL_MINES,
  SICHUAN_PRODUCING_MINES,
  SICHUAN_BUILDING_MINES,
  SICHUAN_RECTIFICATION_MINES,
  SICHUAN_ONE_STOP_FOUR_KEEP_MINES,
  SICHUAN_SEALED_MINES,
  SICHUAN_NON_PRODUCING_MINES,
  SICHUAN_MINE_CITY_BREAKDOWN,
} from '../../../resources/shuan/sichuan-mine-baseline';

export type ShuanHomeVariant = 'command' | 'portal' | 'dispatch';

interface ShuanHomeConceptPageProps {
  variant: ShuanHomeVariant;
  onVariantChange: (variant: ShuanHomeVariant) => void;
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
  | 'mine'
  | 'monitor'
  | 'settings'
  | 'shield'
  | 'siren'
  | 'users'
  | 'warning'
  | 'zap';

type IconDataRow = [string, string, CockpitIconName];
type TimeRangeValue = 'today' | 'week' | 'month';

type ReminderTone = 'amber' | 'cyan';

const timeRangeOptions: Array<{ value: TimeRangeValue; label: string }> = [
  { value: 'today', label: '今日' },
  { value: 'week', label: '近7日' },
  { value: 'month', label: '近30日' },
];

const navItems: Array<[string, CockpitIconName]> = [
  ['首页', 'home'],
  ['日常监管', 'monitor'],
  ['打非治违', 'siren'],
  ['从业人员管理', 'users'],
  ['生产管理', 'mine'],
  ['系统设置', 'settings'],
];

const mineStatusRows: IconDataRow[] = [
  ['生产矿井', `${SICHUAN_PRODUCING_MINES}处`, 'mine'],
  ['建设矿井', `${SICHUAN_BUILDING_MINES}处`, 'building'],
  ['隐患整改', `${SICHUAN_RECTIFICATION_MINES}处`, 'warning'],
  ['一停四不停', `${SICHUAN_ONE_STOP_FOUR_KEEP_MINES}处`, 'activity'],
  ['井口封闭', `${SICHUAN_SEALED_MINES}处`, 'shield'],
];

const coalProductionStats: IconDataRow[] = [
  ['本年度累计产煤量', '2,429万吨', 'database'],
  ['本月产煤量', '214万吨', 'activity'],
  ['采煤工作面', '76个', 'mine'],
  ['掘进工作面', '52个', 'building'],
];

const undergroundSceneStats: IconDataRow[] = [
  ['从业人员总数', '58,624人', 'users'],
  ['当前井下人员', '2,864人', 'users'],
  ['井下带班领导', '42人', 'users'],
  ['井下特种作业人员', '318人', 'mine'],
];

const dataCatalogStats: IconDataRow[] = [
  ['已接入数据源数', '86个', 'database'],
  ['累计采集数据', '1.28亿条', 'activity'],
  ['数据转化类目数', '42类', 'cloud'],
  ['数据治理任务数', '128项', 'shield'],
  ['数据资源总数', '356项', 'badge'],
];

const dataCatalogRows = [
  ['煤矿基础数据', '煤矿档案、企业信息、证照、采矿权、井田范围', '36项'],
  ['安全监测数据', '甲烷、CO、风速、风压、水位、烟雾、设备状态', '58项'],
  ['人员与用工数据', '人员定位、入井出井、带班领导、特种作业、社保参保', '41项'],
  ['生产运行数据', '产量、进尺、采掘工作面、班次、报备、用电量', '32项'],
  ['自然灾害数据', '降雨、水文、地震、地质灾害、气象预警', '24项'],
  ['事故保障数据', '事故记录、应急资源、救援队伍、物资储备', '19项'],
];

const dataGovernanceGroups = [
  {
    title: '汇聚成果',
    items: [['已接入数据源', '86个'], ['累计采集', '1.28亿条']],
  },
  {
    title: '数据稳定性',
    items: [['最近更新', '2分钟前'], ['今日批次', '1,286批']],
  },
  {
    title: '治理成果',
    items: [['治理任务', '128项'], ['异常波动', '5项']],
  },
] as const;

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
  { title: '危险作业报备', icon: 'badge' as CockpitIconName, tone: 'cyan' as ReminderTone, total: '18', unit: '待审核', meta: [['密闭', '2件'], ['放炮', '6件']], action: '进入审批' },
  { title: '风险分级', icon: 'shield' as CockpitIconName, tone: 'cyan' as ReminderTone, total: '12', unit: '高风险点', meta: [['中风险', '38'], ['动态', '7']], action: '查看清单' },
  { title: '隐患排查', icon: 'warning' as CockpitIconName, tone: 'amber' as ReminderTone, total: '23', unit: '整改中', meta: [['新增', '9'], ['待验收', '6']], action: '进入治理' },
] as const;

const reminderTasks = [
  { tone: 'amber' as ReminderTone, title: '证照到期提醒', highlight: '5', detail: '5个证照将在30日内到期', icon: 'badge' as CockpitIconName },
  { tone: 'cyan' as ReminderTone, title: '重大灾害提醒', highlight: '3', detail: '3项重大灾害风险需持续跟踪', icon: 'warning' as CockpitIconName },
];

const illegalSourceRows = [
  { id: 'gas', name: '瓦斯', iconUrl: illegalGasIconUrl, tone: 'cyan', metrics: [['线索', '28'], ['待核查', '16'], ['关联矿井', '12']] },
  { id: 'wind', name: '风', iconUrl: illegalWindIconUrl, tone: 'green', metrics: [['线索', '19'], ['待核查', '11'], ['关联矿井', '9']] },
  { id: 'personnel', name: '人', iconUrl: illegalPersonnelIconUrl, tone: 'amber', metrics: [['线索', '34'], ['待核查', '18'], ['关联矿井', '15']] },
  { id: 'coal', name: '煤', iconUrl: illegalCoalIconUrl, tone: 'blue', metrics: [['线索', '24'], ['待核查', '13'], ['关联矿井', '11']] },
  { id: 'power', name: '电', iconUrl: illegalPowerIconUrl, tone: 'red', metrics: [['线索', '22'], ['待核查', '12'], ['关联矿井', '10']] },
] as const;

const illegalCampaignRows = [
  { title: '隐蔽工作面专项整治', metrics: [['疑似矿井', '18'], ['较高风险', '9'], ['待核查', '23']] },
  { title: '监控系统造假专项整治', metrics: [['疑似矿井', '16'], ['较高风险', '8'], ['待核查', '20']] },
  { title: '隐瞒入井人数专项整治', metrics: [['疑似矿井', '14'], ['较高风险', '7'], ['待核查', '17']] },
] as const;

const illegalDisposalRows = [
  { title: '煤矿整改', owner: '县级复核', todo: '26', closed: '18', iconUrl: illegalMineRectificationIconUrl, tone: 'cyan' },
  { title: '县级走访', owner: '现场核查', todo: '15', closed: '11', iconUrl: illegalCountyInspectionIconUrl, tone: 'green' },
  { title: '市级研判', owner: '专项研判', todo: '10', closed: '7', iconUrl: illegalCityAnalysisIconUrl, tone: 'orange' },
  { title: '省挂牌督办', owner: '挂牌督办', todo: '6', closed: '4', iconUrl: illegalProvinceSupervisionIconUrl, tone: 'red' },
] as const;

const mapRegions = [
  { name: '广元市', x: 72, y: 37, status: 'orange' as const, count: 11, aliases: ['广元', '广旺煤矿'] },
  { name: '达州市', x: 80, y: 53, status: 'red' as const, count: 41, aliases: ['达州', '渠口煤矿'] },
  { name: '乐山市', x: 49, y: 74, status: 'yellow' as const, count: 15, aliases: ['乐山', '嘉阳煤矿'] },
  { name: '宜宾市', x: 58, y: 83, status: 'orange' as const, count: 30, aliases: ['宜宾', '芙蓉煤矿'] },
  { name: '攀枝花市', x: 36, y: 92, status: 'red' as const, count: 18, aliases: ['攀枝花', '宝鼎煤矿'] },
  { name: '泸州市', x: 66, y: 79, status: 'yellow' as const, count: 13, aliases: ['泸州', '古叙煤矿'] },
  { name: '阿坝州', x: 47, y: 32, status: 'yellow' as const, count: 4, aliases: ['阿坝'] },
  { name: '甘孜州', x: 28, y: 55, status: 'blue' as const, count: 2, aliases: ['甘孜'] },
].map((region) => {
  const breakdown = SICHUAN_MINE_CITY_BREAKDOWN.find((item) => item.name === region.name);
  return {
    ...region,
    count: breakdown?.total ?? region.count,
  };
});

const riskLegend = [
  { key: 'red', label: '红色预警' },
  { key: 'orange', label: '橙色预警' },
  { key: 'yellow', label: '黄色预警' },
  { key: 'blue', label: '蓝色提示' },
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

function Panel({ title, children, className = '', action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return <section className={`shuan-panel ${className}`}><div className="panel-title">{title}</div>{action && <div className="panel-action">{action}</div>}{children}</section>;
}

function TimeRangeControl({ value, onChange, label }: { value: TimeRangeValue; onChange: (value: TimeRangeValue) => void; label: string }) {
  return <div className="panel-time-range" role="group" aria-label={label}>{timeRangeOptions.map((option) => <button key={option.value} type="button" className={value === option.value ? 'active' : ''} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>;
}

function TopHeader() {
  return (
    <header className="shuan-header">
      <div className="shuan-brand"><span className="shuan-emblem">蜀</span><div className="shuan-title">蜀安多源异构监测系统</div></div>
      <nav className="command-nav" aria-label="系统顶部导航">{navItems.map(([label, icon]) => <button key={label} type="button" className={label === '首页' ? 'active' : ''}><CockpitIcon name={icon} /><span>{label}</span></button>)}</nav>
      <div className="shuan-top-tools"><button type="button" className="shuan-region">四川 <ChevronDown /></button><button type="button" className="shuan-tool-badge" aria-label="报警消息"><CockpitIcon name="bell" /><b>0</b></button><button type="button" className="shuan-tool-round" aria-label="用户"><UserRound /></button><span className="shuan-user">李明远 <ChevronDown /></span><button type="button" className="shuan-icon-tool" aria-label="设置"><Settings /></button></div>
    </header>
  );
}

function RegulatedMinePanel() {
  return (
    <Panel title="监管煤矿情况" className="regulated-mine-panel">
      <div className="mine-overview-card"><div className="mine-overview-main"><strong>{SICHUAN_TOTAL_MINES}处</strong><span>监管煤矿</span></div><div className="mine-status-bars">{mineStatusRows.map(([label, value, icon]) => <span key={label}><CockpitIcon name={icon} /><b>{value}</b><em>{label}</em></span>)}</div></div>
      <div className="mine-domain-card"><div className="mine-domain-head"><span>生产情况</span></div><div className="coal-production-grid">{coalProductionStats.map(([label, value, icon]) => <div key={label}><CockpitIcon name={icon} /><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      <div className="mine-domain-card"><div className="mine-domain-head"><span>人员情况</span></div><div className="underground-scene-grid">{undergroundSceneStats.map(([label, value, icon]) => <div key={label}><CockpitIcon name={icon} /><strong>{value}</strong><span>{label}</span></div>)}</div></div>
    </Panel>
  );
}

function DataAggregationPanel() {
  return (
    <Panel title="汇聚数据情况" className="data-aggregation-panel">
      <div className="aggregation-v3-shell">
        <div className="aggregation-v3-stage">
          <div className="aggregation-v3-rings" aria-hidden="true"><span className="ring ring-outer" /><span className="ring ring-mid" /><span className="ring ring-inner" /></div>
          <div className="aggregation-v3-grid">
            {dataCatalogRows.map(([name, _detail, count], index) => {
              const icon = dataCatalogStats[index]?.[2] ?? 'database';
              return <div key={name} className={`aggregation-v3-node node-${index + 1}`}><i><CockpitIcon name={icon} /></i><strong>{name}</strong><em>{count}</em></div>;
            })}
            <div className="aggregation-v3-core"><span>数据汇聚</span><b>治理中枢</b><div className="aggregation-v3-processes"><em>接入</em><em>清洗</em><em>对齐</em><em>校验</em></div></div>
          </div>
        </div>
        <div className="aggregation-v3-summary">
          {dataGovernanceGroups.map(({ title, items }) => (
            <section key={title} className="aggregation-v3-summary-card">
              <div className="aggregation-v3-summary-title">{title}</div>
              {items.map(([label, value]) => <div key={label} className="aggregation-v3-summary-row"><span>{label}</span><b>{value}</b></div>)}
            </section>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function MapStage() {
  const [searchQuery, setSearchQuery] = useState('');
  const trimmedQuery = searchQuery.trim();
  const activeRegion = trimmedQuery
    ? mapRegions.find((region) => [region.name, ...region.aliases].some((item) => item.includes(trimmedQuery)))
    : null;

  return (
    <section className="command-map-stage">
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
              <div
                key={region.name}
                className={`shuan-map-point region-dot risk-${region.status}${isActive ? ' is-active' : ''}${trimmedQuery && !isActive ? ' is-dimmed' : ''}`}
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                role="img"
                aria-label={`${region.name} 汇聚 ${region.count} 处煤矿`}
              >
                <b>{region.count}</b>
                <span>{region.name}</span>
              </div>
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

function DailyRegulationPanel() {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  return (
    <Panel title="日常监管" className="daily-regulation-panel daily-regulation-panel-v2-visual" action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="日常监管数据时间范围" />}>
      <div className="daily-regulation-hero">
        <div className="daily-regulation-summary-strip">
          <article className="daily-regulation-summary-card total">
            <span className="summary-label">今日预警总数</span>
            <strong>118</strong>
          </article>
          <article className="daily-regulation-summary-card distribution">
            <span className="summary-label">预警分级分布</span>
            <div className="daily-regulation-distribution-values">{alarmLevels.map(([label, value, _percent, tone]) => <span key={label} className={`tone-${tone}`}><b>{value}</b><em>{label}</em></span>)}</div>
            <div className="daily-regulation-distribution-bar" aria-label="预警分级结构">{alarmLevels.map(([label, value, _percent, tone]) => <i key={label} className={`tone-${tone}`} style={{ flexGrow: Number(value) }} aria-label={`${label}${value}条`} />)}</div>
          </article>
          <article className="daily-regulation-summary-card rate">
            <span className="summary-label">预警处置率</span>
            <div className="daily-regulation-rate-wrap">
              <div className="daily-regulation-rate-meta"><span><em>已处置</em><b>97</b></span><span><em>待处置</em><b>21</b></span></div>
              <div className="daily-regulation-rate-ring" aria-label="预警处置率 82%">
                <div className="daily-regulation-rate-core"><b>82%</b></div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="daily-regulation-domain-grid" aria-label="分级报警处置">{dailyRegulationAlertGroups.map((group) => <article key={group.title} className="daily-regulation-domain-card"><header><span className="daily-regulation-domain-title"><CockpitIcon name={group.icon} /><b>{group.title}</b></span><strong>{group.total}</strong></header><div className="daily-regulation-domain-items">{group.items.map(([name, count]) => <span key={name}><em>{name}</em><b>{count}</b></span>)}</div></article>)}</div>
      <div className="daily-regulation-reminder-inline" aria-label="重点提醒">
        {reminderTasks.map((item) => <article key={item.title} className={`daily-regulation-reminder-card tone-${item.tone}`}><span className="reminder-card-icon"><CockpitIcon name={item.icon} /></span><div className="reminder-card-copy"><header><b>{item.title}</b><strong>{item.highlight}</strong></header><em>{item.detail}</em></div></article>)}
      </div>
      <div className="daily-regulation-entry-grid" aria-label="监管业务入口">
        {dailyRegulationEntryRows.map((entry) => <article key={entry.title} className={`daily-regulation-entry-card tone-${entry.tone}`}><header><span><CockpitIcon name={entry.icon} /><b>{entry.title}</b></span><strong>{entry.total}</strong></header><div className="daily-regulation-entry-meta">{entry.meta.map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></article>)}
      </div>
    </Panel>
  );
}

function IllegalTreatmentPanel() {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  return (
    <Panel title="打非治违" className="illegal-treatment-panel" action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="打非治违数据时间范围" />}>
        <div className="illegal-funnel-shell">
          <div className="illegal-source-grid" aria-label="五类智能算法线索">
          {illegalSourceRows.map((item) => <article key={item.id} className={`illegal-source-card tone-${item.tone}`}><header><img src={item.iconUrl} alt="" /><strong>{item.name}</strong></header><div>{item.metrics.map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></article>)}
        </div>
        <div className="illegal-funnel-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <section className="illegal-judge-core" aria-label="综合比对研判">
          <div className="illegal-judge-mark" aria-hidden="true"><img src={illegalJudgeIconUrl} alt="" /></div>
          <div className="illegal-judge-copy"><span>综合比对研判</span><em>多源线索交叉验证</em></div>
          <div className="illegal-judge-metrics"><span>线索<b>86</b></span><span>专项风险<b>24</b></span><span>高可信<b>11</b></span></div>
        </section>
        <div className="illegal-campaign-grid" aria-label="三类专项整治">
          {illegalCampaignRows.map((item) => <article key={item.title} className="illegal-campaign-card"><header><strong>{item.title}</strong></header><div>{item.metrics.map(([label, value]) => <span key={label}><em>{label}</em><b>{value}</b></span>)}</div></article>)}
        </div>
        <div className="illegal-disposal-strip" aria-label="分级处置任务">
          {illegalDisposalRows.map((item, index) => <React.Fragment key={item.title}><article className={`illegal-disposal-card tone-${item.tone}`}><img src={item.iconUrl} alt="" /><div><strong>{item.title}</strong><em>{item.owner}</em></div><p><small>待办<b>{item.todo}</b></small><small>闭环<b>{item.closed}</b></small></p></article>{index < illegalDisposalRows.length - 1 && <i aria-hidden="true" />}</React.Fragment>)}
        </div>
      </div>
    </Panel>
  );
}

function CommandV2Concept() {
  return <div className="shuan-concept shuan-command shuan-command-v2"><TopHeader /><main className="command-grid"><div className="command-left"><RegulatedMinePanel /><DataAggregationPanel /></div><MapStage /><div className="command-right"><DailyRegulationPanel /><IllegalTreatmentPanel /></div></main></div>;
}

export function ShuanHomeCommandV2Page(_props: ShuanHomeConceptPageProps) {
  return <CommandV2Concept />;
}

export function getShuanVariantFromPage(page: string): ShuanHomeVariant | null {
  if (page === 'shuan-home-command') return 'command';
  if (page === 'shuan-home-portal') return 'portal';
  if (page === 'shuan-home-dispatch') return 'dispatch';
  return null;
}
