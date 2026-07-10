import * as React from 'react';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  BrainCircuit,
  Building2,
  CalendarDays,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  ClipboardList,
  Database,
  Download,
  Factory,
  Flame,
  Gauge,
  House,
  GitBranch,
  LayoutGrid,
  Lock,
  LogOut,
  MapPinned,
  Minus,
  MonitorCog,
  RefreshCcw,
  Radio,
  Search,
  Share2,
  ShieldAlert,
  Siren,
  Table2,
  TrendingUp,
  UserRound,
  Users,
  Video,
  Waves,
  Wind,
  Wrench,
  Zap,
  AlertTriangle,
  CloudRain,
  CloudLightning,
  Mountain,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Circle,
  MapPin,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import sichuanMapSvg from '../../../../resources/shuan/sichuan-map.svg?raw';
import { normalizeInlineSvg } from '../../../../common/inlineSvg';
import { CountyInspectionPage } from './CountyInspectionPage';
import { DangerousWorkReportPage } from './DangerousWorkReportPage';
import { IllegalCityAnalysisPage } from './IllegalCityAnalysisPage';
import './major-hazard-overrides.css';
import { ProvinceSupervisionPage } from './ProvinceSupervisionPage';
import { RectificationReviewPage } from './RectificationReviewPage';
import { DrilldownPage, DrilldownTone, shuanCountyInspectionData, shuanDailyRegulationAnalysis, shuanDangerousWorkReportData, shuanDrilldownPages, shuanHiddenDangerData, shuanHiddenFaceMineProfileData, shuanIllegalCampaignModules, shuanLicenseExpiryReminderData, shuanMajorHazardReminderData, shuanProvinceSupervisionData, shuanRectificationReviewData, shuanRiskControlDashboardData, shuanRiskControlData, shuanVideoDispatchData } from './data';

const normalizedSichuanMapSvg = normalizeInlineSvg(sichuanMapSvg);

const iconByKind = {
  secondary: BarChart3,
  algorithm: BrainCircuit,
};

const iconById: Array<[string, typeof BarChart3]> = [
  ['region', MapPinned],
  ['production-status', Gauge],
  ['production-operation', Activity],
  ['personnel', Building2],
  ['data', Database],
  ['gas', ShieldAlert],
  ['water', Waves],
  ['illegal', ShieldAlert],
  ['video', Video],
  ['power', Zap],
  ['algorithm', BrainCircuit],
];

function routeHref(page: string) {
  return `#page=${page}`;
}

function getPageIcon(page: DrilldownPage) {
  return iconById.find(([key]) => page.id.includes(key))?.[1] || iconByKind[page.kind] || Activity;
}

function DrilldownFrame({ pageId, children }: { pageId: string; children: React.ReactNode }) {
  return (
    <div className="drill-shell" data-drill-page={pageId}>
      <main className="drill-stage" data-annotation-id="shuan-v3-drill-stage">
        {children}
      </main>
    </div>
  );
}

function DrillContentHeader({
  eyebrow,
  title,
  description,
  icon,
  actions,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`drill-content-header${className ? ` ${className}` : ''}`}>
      <div className="drill-content-header-main">
        {icon ? <div className="drill-content-header-icon">{icon}</div> : null}
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="drill-content-actions">{actions}</div> : null}
    </section>
  );
}

function MetricStrip({ page }: { page: DrilldownPage }) {
  return (
    <section className="drill-metric-strip" aria-label={`${page.title}核心指标`}>
      {page.metrics.map((metric) => (
        <article key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <em>{metric.hint}</em>
        </article>
      ))}
    </section>
  );
}

function BusinessSections({ page }: { page: DrilldownPage }) {
  return (
    <section className="drill-section-grid">
      {page.sections.map((section) => (
        <article className="drill-section-card" key={section.title}>
          <header>
            <span>{section.title}</span>
            <p>{section.summary}</p>
          </header>
          <div className="drill-kpi-list">
            {section.items.map((item) => (
              <div key={item.label} className={`tone-${item.tone || page.tone}`}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function DetailTable({ page }: { page: DrilldownPage }) {
  return (
    <section className="drill-table-card">
      <header><Table2 aria-hidden="true" />{page.tableTitle}</header>
      <div className="drill-table">
        <div className="drill-table-row drill-table-head">
          <span>名称</span>
          <span>区域</span>
          <span>等级</span>
          <span>状态</span>
          <span>责任方</span>
        </div>
        {page.tableRows.map((row) => (
          <div className="drill-table-row" key={`${page.id}-${row.name}`}>
            <span>{row.name}</span>
            <span>{row.area}</span>
            <span>{row.level}</span>
            <span>{row.status}</span>
            <span>{row.owner}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NextPages({ page }: { page: DrilldownPage }) {
  if (!page.next?.length) return null;
  return (
    <section className="drill-next-card">
      <header>关联页面</header>
      <div>
        {page.next.map((item) => (
          <a key={item.page} href={routeHref(item.page)}>
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

const coalBasicFilters = [
  ['行政区划', '请选择行政区划'],
  ['生产状态', '请选择生产状态'],
  ['证照等级', '请选择证照等级'],
  ['水文类型', '请选择水文类型'],
  ['所有制', '请选择所有制'],
  ['煤炭供给侧', '请选择煤炭供给侧'],
  ['系统接入', '请选择系统接入'],
] as const;

const coalBasicKpis = [
  { label: '煤矿总数', value: '174', unit: '处', tone: 'cyan', icon: Building2 },
  { label: '生产矿井', value: '64', unit: '处', tone: 'blue', icon: Factory },
  { label: '建设矿井', value: '13', unit: '处', tone: 'green', icon: GitBranch },
  { label: '隐患整改矿井', value: '12', unit: '处', tone: 'amber', icon: AlertTriangle },
  { label: '一停四不停矿井', value: '34', unit: '处', tone: 'purple', icon: Wrench },
  { label: '井口封闭矿井', value: '51', unit: '处', tone: 'red', icon: Lock },
] as const;

const coalBasicRegionRows = [
  { area: '达州市', total: 41, production: 15, building: 3, rectify: 3, stop: 8, sealed: 12 },
  { area: '宜宾市', total: 30, production: 11, building: 2, rectify: 2, stop: 6, sealed: 9 },
  { area: '攀枝花市', total: 18, production: 7, building: 1, rectify: 1, stop: 3, sealed: 6 },
  { area: '乐山市', total: 15, production: 6, building: 1, rectify: 1, stop: 3, sealed: 4 },
  { area: '广安市', total: 14, production: 5, building: 1, rectify: 1, stop: 3, sealed: 4 },
  { area: '泸州市', total: 13, production: 5, building: 1, rectify: 1, stop: 2, sealed: 4 },
  { area: '广元市', total: 11, production: 4, building: 1, rectify: 1, stop: 2, sealed: 3 },
  { area: '雅安市', total: 10, production: 4, building: 1, rectify: 1, stop: 2, sealed: 2 },
  { area: '内江市', total: 9, production: 3, building: 1, rectify: 1, stop: 2, sealed: 2 },
  { area: '自贡市', total: 7, production: 2, building: 1, rectify: 0, stop: 2, sealed: 2 },
  { area: '凉山州', total: 4, production: 1, building: 0, rectify: 0, stop: 1, sealed: 2 },
  { area: '巴中市', total: 2, production: 1, building: 0, rectify: 0, stop: 0, sealed: 1 },
  { area: '合计', total: 174, production: 64, building: 13, rectify: 12, stop: 34, sealed: 51 },
];

const coalBasicOwnership = [
  { label: '国有', value: 92, percent: '52.9%', color: '#1f9cff' },
  { label: '集体', value: 48, percent: '27.6%', color: '#6b63ff' },
  { label: '股份', value: 22, percent: '12.6%', color: '#86a7ff' },
  { label: '民营', value: 12, percent: '6.9%', color: '#f5ad59' },
];

const coalBasicGasGrades = [
  { label: '高瓦斯', value: 68, percent: '39.1%', color: '#ff665c' },
  { label: '突出', value: 28, percent: '16.1%', color: '#22a6ff' },
  { label: '低瓦斯', value: 78, percent: '44.8%', color: '#39d0ff' },
];

const coalBasicHydroTypes = [
  { label: '简单', value: 52, percent: '29.9%', color: '#25a8ff' },
  { label: '中等', value: 78, percent: '44.8%', color: '#2f7bff' },
  { label: '复杂', value: 30, percent: '17.2%', color: '#ffb22c' },
  { label: '极复杂', value: 14, percent: '8.0%', color: '#7ad88e' },
];

const coalBasicSystemOnlineRows = [
  { label: '监测监控', access: 168, offline: 11 },
  { label: '人员定位', access: 162, offline: 14 },
  { label: '工业视频', access: 156, offline: 21 },
  { label: '水害防治', access: 149, offline: 9 },
];

const coalBasicGasCrossRows = [
  { status: '生产矿井', tone: 'blue', values: [30, 12, 22, 64] },
  { status: '建设矿井', tone: 'green', values: [14, 6, 7, 27] },
  { status: '隐患整改矿井', tone: 'amber', values: [5, 2, 5, 12] },
  { status: '一停四不停矿井', tone: 'purple', values: [10, 3, 21, 34] },
  { status: '井口封（锁）闭矿井', tone: 'red', values: [9, 5, 37, 51] },
];

const coalBasicHydroCrossRows = [
  { status: '生产矿井', tone: 'blue', values: [20, 28, 10, 6, 64] },
  { status: '建设矿井', tone: 'green', values: [12, 10, 4, 1, 27] },
  { status: '隐患整改矿井', tone: 'amber', values: [4, 5, 2, 1, 12] },
  { status: '一停四不停矿井', tone: 'purple', values: [10, 13, 8, 3, 34] },
  { status: '井口封（锁）闭矿井', tone: 'red', values: [6, 22, 6, 17, 51] },
];

const coalBasicAccessSystems = [
  {
    id: 'monitor',
    label: '监测监控',
    rows: [
      { status: '生产矿井', connected: 63, unconnected: 1, total: 64 },
      { status: '建设矿井', connected: 24, unconnected: 3, total: 27 },
      { status: '隐患整改矿井', connected: 10, unconnected: 2, total: 12 },
      { status: '一停四不停矿井', connected: 29, unconnected: 5, total: 34 },
      { status: '井口封（锁）闭矿井', connected: 42, unconnected: 9, total: 51 },
      { status: '合计', connected: 168, unconnected: 20, total: 188 },
    ],
  },
  {
    id: 'personnel',
    label: '人员定位',
    rows: [
      { status: '生产矿井', connected: 58, unconnected: 6, total: 64 },
      { status: '建设矿井', connected: 22, unconnected: 5, total: 27 },
      { status: '隐患整改矿井', connected: 9, unconnected: 3, total: 12 },
      { status: '一停四不停矿井', connected: 27, unconnected: 7, total: 34 },
      { status: '井口封（锁）闭矿井', connected: 37, unconnected: 14, total: 51 },
      { status: '合计', connected: 153, unconnected: 35, total: 188 },
    ],
  },
  {
    id: 'video',
    label: '工业视频',
    rows: [
      { status: '生产矿井', connected: 55, unconnected: 9, total: 64 },
      { status: '建设矿井', connected: 21, unconnected: 6, total: 27 },
      { status: '隐患整改矿井', connected: 8, unconnected: 4, total: 12 },
      { status: '一停四不停矿井', connected: 25, unconnected: 9, total: 34 },
      { status: '井口封（锁）闭矿井', connected: 35, unconnected: 16, total: 51 },
      { status: '合计', connected: 144, unconnected: 44, total: 188 },
    ],
  },
  {
    id: 'water',
    label: '水害防治',
    rows: [
      { status: '生产矿井', connected: 60, unconnected: 4, total: 64 },
      { status: '建设矿井', connected: 20, unconnected: 7, total: 27 },
      { status: '隐患整改矿井', connected: 9, unconnected: 3, total: 12 },
      { status: '一停四不停矿井', connected: 24, unconnected: 10, total: 34 },
      { status: '井口封（锁）闭矿井', connected: 31, unconnected: 20, total: 51 },
      { status: '合计', connected: 144, unconnected: 44, total: 188 },
    ],
  },
];

const coalBasicSystemAccessCards = [
  { name: '传输专网', connected: 128, unconnected: 46, rate: '73.6%', rateValue: 73.6, icon: Share2 },
  { name: '安全监控', connected: 132, unconnected: 42, rate: '75.9%', rateValue: 75.9, icon: ShieldCheck },
  { name: '人员定位', connected: 118, unconnected: 56, rate: '67.8%', rateValue: 67.8, icon: Users },
  { name: '通讯调度', connected: 110, unconnected: 64, rate: '63.2%', rateValue: 63.2, icon: Radio },
];

const coalBasicArchiveRows = [
  ['1', '遵义煤矿', '达州市·通川区', '遵义煤矿集团', '国有', '生产矿井', '高瓦斯', '中等', '三级', '已接入'],
  ['2', '龙泉煤矿', '宜宾市·翠屏区', '宜宾能源集团', '国有', '生产矿井', '突出', '复杂', '三级', '已接入'],
  ['3', '六盘水小康矿', '广元市·利州区', '盘江集团公司', '国有', '建设矿井', '高瓦斯', '中等', '二级', '已接入'],
  ['4', '普定煤矿', '泸州市·古蔺县', '泸州能源集团', '集体', '隐患整改矿井', '低瓦斯', '中等', '四级', '未接入'],
  ['5', '平坝煤矿', '乐山市·犍为县', '川南矿业集团', '国有', '一停四不停矿井', '低瓦斯', '中等', '三级', '未接入'],
] as const;

function CoalBasicPanel({ title, className = '', children, action }: { title?: string; className?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className={`coal-basic-panel ${className}`}>
      {title ? (
        <header className="coal-basic-panel-title">
          <strong>{title}</strong>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

function MiniDonut({ items, label = '总数', total = '174' }: { items: Array<{ color: string; value: number; label: string; percent: string }>; label?: string; total?: string }) {
  let cursor = 0;
  const segments = items.map((item) => {
    const next = cursor + Math.max(4, (item.value / 174) * 100);
    const segment = `${item.color} ${cursor}% ${Math.min(100, next)}%`;
    cursor = next;
    return segment;
  }).join(', ');
  return (
    <div className="coal-basic-donut-block">
      <div className="coal-basic-donut" style={{ '--donut-segments': segments } as React.CSSProperties}>
        <b>{total}</b>
        <span>{label}</span>
      </div>
      <div className="coal-basic-donut-legend">
        {items.map((item) => (
          <span key={`${item.label}-${item.value}`}>
            <i style={{ background: item.color }} />
            {item.label}
            <b>{item.value}</b>
            <em>{item.percent}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function CoalBasicStatisticsPage() {
  const [activeAccessSystem, setActiveAccessSystem] = useState<(typeof coalBasicAccessSystems)[number]['id']>(coalBasicAccessSystems[0].id);
  const [activeCrossDimension, setActiveCrossDimension] = useState<'gas' | 'hydro'>('gas');
  const activeAccessSystemRows = useMemo(
    () => coalBasicAccessSystems.find((item) => item.id === activeAccessSystem)?.rows ?? coalBasicAccessSystems[0].rows,
    [activeAccessSystem],
  );
  const activeCrossRows = activeCrossDimension === 'gas' ? coalBasicGasCrossRows : coalBasicHydroCrossRows;
  const activeCrossHeaders = activeCrossDimension === 'gas'
    ? ['瓦斯等级', '高瓦斯', '突出', '低瓦斯', '合计']
    : ['水文地质类型', '简单', '中等', '复杂', '极复杂', '合计'];

  return (
    <div className="drill-page coal-basic-page">
      <header className="coal-basic-titlebar">
        <div className="coal-basic-title-main">
          <span className="coal-basic-title-icon" aria-hidden="true"><BarChart3 /></span>
          <h1>煤矿基本情况统计</h1>
        </div>
        <a href={routeHref('shuan-home-command-v3')} className="coal-basic-exit"><LogOut aria-hidden="true" />退出</a>
      </header>

      <CoalBasicPanel className="coal-basic-filter-panel">
        <div className="coal-basic-filter-row">
          {coalBasicFilters.map(([label, placeholder]) => (
            <label key={label} className="coal-basic-filter">
              <span>{label}</span>
              <button type="button">{placeholder}<ChevronDown aria-hidden="true" /></button>
            </label>
          ))}
          <button type="button" className="coal-basic-query"><Search aria-hidden="true" />查询</button>
          <button type="button" className="coal-basic-reset"><RefreshCcw aria-hidden="true" />重置</button>
        </div>
      </CoalBasicPanel>

      <section className="coal-basic-kpi-row" aria-label="煤矿生产状态概览">
        {coalBasicKpis.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`coal-basic-kpi-card tone-${item.tone}`}>
              <div className="coal-basic-kpi-icon"><Icon aria-hidden="true" /></div>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.unit}</em>
              </div>
            </article>
          );
        })}
      </section>

      <main className="coal-basic-analysis-grid">
        <CoalBasicPanel title="市州煤矿区域矩阵" className="coal-basic-region-panel">
          <div className="coal-basic-region-table">
            <div className="head"><span>行政区划</span><span>总数</span><span>生产</span><span>建设</span><span>整改</span><span>一停四不停</span><span>锁闭</span></div>
            {coalBasicRegionRows.map((row) => (
              <div key={row.area} className={row.area === '合计' ? 'total' : ''}>
                <span>{row.area}</span>
                <b>{row.total}</b>
                <b className="blue">{row.production}</b>
                <b className="green">{row.building}</b>
                <b className="amber">{row.rectify}</b>
                <b className="purple">{row.stop}</b>
                <b className="red">{row.sealed}</b>
              </div>
            ))}
          </div>
        </CoalBasicPanel>

        <CoalBasicPanel title="基础属性结构" className="coal-basic-structure-panel">
          <div className="coal-basic-structure-grid">
            <article>
              <h3>所有制结构</h3>
              <MiniDonut items={coalBasicOwnership} />
            </article>
            <article>
              <h3>瓦斯等级分布</h3>
              <MiniDonut items={coalBasicGasGrades} />
            </article>
            <article>
              <h3>水文地质类型分布</h3>
              <MiniDonut items={coalBasicHydroTypes} />
            </article>
            <article className="coal-basic-access-levels">
              <h3>系统在线情况</h3>
              {coalBasicSystemOnlineRows.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <i>
                    <b style={{ width: `${Math.max(8, ((item.access - item.offline) / item.access) * 100)}%` }} />
                    <em style={{ width: `${Math.max(4, (item.offline / item.access) * 100)}%` }} />
                  </i>
                  <strong>{item.access}</strong>
                  <small>{item.offline}</small>
                </div>
              ))}
            </article>
          </div>
        </CoalBasicPanel>

        <CoalBasicPanel title="交叉统计分析" className="coal-basic-cross-panel">
          <div className="coal-basic-cross-layout">
            <section className={`coal-basic-cross-table${activeCrossDimension === 'hydro' ? ' is-hydro' : ''}`} aria-label={activeCrossDimension === 'gas' ? '生产状态乘瓦斯等级' : '生产状态乘水文地质类型'}>
              <header>
                <span>生产状态 × {activeCrossDimension === 'gas' ? '瓦斯等级' : '水文地质类型'}（单位：处）</span>
                <div className="coal-basic-cross-switches">
                  <button type="button" className={activeCrossDimension === 'gas' ? 'active' : ''} onClick={() => setActiveCrossDimension('gas')}>瓦斯等级</button>
                  <button type="button" className={activeCrossDimension === 'hydro' ? 'active' : ''} onClick={() => setActiveCrossDimension('hydro')}>水文地质类型</button>
                </div>
              </header>
              <div className="coal-basic-cross-row head">{activeCrossHeaders.map((head) => <span key={head}>{head}</span>)}</div>
              {activeCrossRows.map((row) => (
                <div key={row.status} className={`coal-basic-cross-row tone-${row.tone}`}>
                  <span>{row.status}</span>
                  {row.values.map((value, index) => <b key={`${row.status}-${index}`}>{value}</b>)}
                </div>
              ))}
            </section>
            <section className="coal-basic-access-cross" aria-label="生产状态乘系统接入">
              <header>
                <span>生产状态 × 系统接入（单位：处）</span>
                <div className="coal-basic-access-cross-legend">
                  <em><i />已接入</em>
                  <em className="red"><i />未接入</em>
                </div>
                <div className="coal-basic-access-cross-tabs">
                  {coalBasicAccessSystems.map((system) => (
                    <button
                      key={system.id}
                      type="button"
                      className={system.id === activeAccessSystem ? 'active' : ''}
                      onClick={() => setActiveAccessSystem(system.id)}
                    >
                      {system.label}
                    </button>
                  ))}
                </div>
              </header>
              {activeAccessSystemRows.map((row) => {
                const connectedPercentValue = Number(((row.connected / row.total) * 100).toFixed(1));
                const unconnectedPercentValue = Number(((row.unconnected / row.total) * 100).toFixed(1));
                const connectedPercent = `${connectedPercentValue.toFixed(1)}%`;
                const unconnectedPercent = `${unconnectedPercentValue.toFixed(1)}%`;
                const showConnectedLabel = connectedPercentValue >= 28;
                const barTooltip = `已接入 ${row.connected}（${connectedPercent}）\n未接入 ${row.unconnected}（${unconnectedPercent}）\n合计 ${row.total}`;
                return (
                <div key={row.status} className="coal-basic-access-cross-row">
                  <span className="coal-basic-access-cross-label">{row.status}</span>
                  <div className="coal-basic-stack-bar" title={barTooltip}>
                    <div className="coal-basic-stack-track">
                      <b style={{ width: connectedPercent }} />
                      <i style={{ width: unconnectedPercent }} />
                    </div>
                    {showConnectedLabel ? <span className="coal-basic-stack-label connected" style={{ width: connectedPercent }}>{row.connected} ({connectedPercent})</span> : null}
                  </div>
                  <strong>{row.total}</strong>
                </div>
                );
              })}
            </section>
          </div>
        </CoalBasicPanel>

        <CoalBasicPanel title="监管系统接入情况" className="coal-basic-system-panel">
          <div className="coal-basic-system-grid">
            {coalBasicSystemAccessCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.name}>
                  <header><Icon aria-hidden="true" /><strong>{item.name}</strong></header>
                  <div className="coal-basic-rate-gauge" style={{ '--rate-angle': `${item.rateValue * 1.8}deg` } as React.CSSProperties} aria-label={`${item.name}接入率${item.rate}`}>
                    <div className="coal-basic-rate-gauge__content">
                      <strong>{item.rate}</strong>
                      <span>接入率</span>
                    </div>
                  </div>
                  <div className="coal-basic-system-metrics">
                    <p><span>已接入</span><b>{item.connected}<em>处</em></b></p>
                    <p><span>未接入</span><b className="red">{item.unconnected}<em>处</em></b></p>
                  </div>
                </article>
              );
            })}
          </div>
          <footer>说明：接入率 = 已接入矿井数 / 煤矿总数 × 100%</footer>
        </CoalBasicPanel>

        <CoalBasicPanel title="煤矿档案清单" className="coal-basic-archive-panel" action={<button type="button">查看全部</button>}>
          <div className="coal-basic-archive-table">
            <div className="head"><span>序号</span><span>煤矿名称</span><span>行政区划</span><span>所属煤炭公司</span><span>所有制</span><span>生产状态</span><span>证照等级</span><span>水文地质类型</span><span>瓦斯等级</span><span>系统接入</span><span>操作</span></div>
            {coalBasicArchiveRows.map((row) => (
              <div key={row[0]}>
                {row.map((cell, index) => (
                  <span key={`${row[0]}-${index}`} className={index === 9 ? (cell === '已接入' ? 'status-on' : 'status-off') : ''}>{cell}</span>
                ))}
                <button type="button">查看</button>
              </div>
            ))}
          </div>
          <footer className="coal-basic-pagination">
            <span>共 174 条</span>
            <button type="button" aria-label="上一页"><ChevronLeft aria-hidden="true" /></button>
            {[1, 2, 3, 4, 5].map((page) => <button key={page} type="button" className={page === 1 ? 'active' : ''}>{page}</button>)}
            <span>...</span>
            <button type="button">18</button>
            <button type="button" aria-label="下一页"><ChevronRight aria-hidden="true" /></button>
            <button type="button" className="page-size">10 条页<ChevronDown aria-hidden="true" /></button>
            <span>跳至</span>
            <button type="button" className="jump-page">1</button>
            <span>页</span>
          </footer>
        </CoalBasicPanel>
      </main>
    </div>
  );
}

function DetailPage({ page }: { page: DrilldownPage }) {
  const Icon = getPageIcon(page);
  const parent = page.kind === 'algorithm' ? 'shuan-home-command-v3-illegal-algorithms' : 'shuan-home-command-v3-wireframes';

  return (
    <div className={`drill-page tone-${page.tone}`}>
      <DrillContentHeader
        eyebrow={page.subtitle}
        title={page.title}
        description={page.scenario}
        icon={<Icon aria-hidden="true" />}
        actions={
          <>
            <a href={routeHref(parent)}><ArrowLeft aria-hidden="true" />返回上一层</a>
            <a href={routeHref('shuan-home-command-v3')}>返回首页 Av3</a>
          </>
        }
      />
      <MetricStrip page={page} />
      <main className="drill-layout">
        <div className="drill-main">
          <BusinessSections page={page} />
          <DetailTable page={page} />
        </div>
        <aside className="drill-aside">
          <section className="drill-flow-card">
            <header>页面切换规则</header>
            <ol>
              <li>首页 Av3 椤堕儴绯荤粺鏍忓浐瀹氫繚鐣欙紝浜岀骇椤靛拰涓夌骇椤甸兘涓嶅啀鍗曠嫭缁樺埗鍏ㄥ眬鑿滃崟銆?</li>
              <li>当前覆盖层只替换 `drill-stage` 鍐呯殑涓氬姟鍐呭锛屼繚鎸侀椤典綔涓虹粺涓€搴曠銆?</li>
              <li>涓夌骇绠楁硶椤电户缁湪鍚屼竴瑕嗙洊灞傞噷鍒囨崲锛岄伩鍏嶉噸澶嶉〉闈㈡鏋跺拰澶氬椤舵爮銆?</li>
            </ol>
          </section>
          <NextPages page={page} />
        </aside>
      </main>
    </div>
  );
}

const personnelKpis = [
  { label: '从业人员总数', value: '58,624', unit: '人', change: '较昨日 ▲ 2.35%', tone: 'blue', icon: Users },
  { label: '实名认证率', value: '98.62', unit: '%', change: '较昨日 ▲ 0.58 个百分点', tone: 'blue', icon: ShieldCheck },
  { label: '人员配备达标率', value: '92.31', unit: '%', change: '较昨日 ▲ 1.21 个百分点', tone: 'blue', icon: UserRound },
  { label: '持证上岗率', value: '93.14', unit: '%', change: '较昨日 ▲ 0.76 个百分点', tone: 'blue', icon: ClipboardList },
  { label: '当前井下人数', value: '3,126', unit: '人', change: '较昨日 ▲ 2.12%', tone: 'cyan', icon: MapPin },
  { label: '下井准入异常煤矿数', value: '11', unit: '矿', change: '较昨日 ▲ 1 矿', tone: 'red', icon: AlertTriangle },
];

const personnelRegions = [
  { name: '阿坝州', workers: '1,412', underground: '126', abnormal: '0', x: 30, y: 22, tone: 'blue' },
  { name: '绵阳市', workers: '1,287', underground: '142', abnormal: '0', x: 47, y: 33, tone: 'blue' },
  { name: '广元市', workers: '1,156', underground: '106', abnormal: '0', x: 64, y: 22, tone: 'green' },
  { name: '巴中市', workers: '1,684', underground: '164', abnormal: '1', x: 83, y: 29, tone: 'green' },
  { name: '达州市', workers: '1,205', underground: '95', abnormal: '0', x: 91, y: 43, tone: 'green' },
  { name: '遂宁市', workers: '1,552', underground: '132', abnormal: '0', x: 57, y: 46, tone: 'blue' },
  { name: '南充市', workers: '2,041', underground: '162', abnormal: '2', x: 72, y: 43, tone: 'orange' },
  { name: '成都市', workers: '6,524', underground: '472', abnormal: '2', x: 42, y: 55, tone: 'orange' },
  { name: '甘孜州', workers: '1,024', underground: '84', abnormal: '0', x: 19, y: 54, tone: 'green' },
  { name: '眉山市', workers: '1,968', underground: '96', abnormal: '0', x: 48, y: 65, tone: 'blue' },
  { name: '内江市', workers: '2,745', underground: '172', abnormal: '1', x: 76, y: 64, tone: 'blue' },
  { name: '雅安市', workers: '1,215', underground: '96', abnormal: '0', x: 34, y: 75, tone: 'blue' },
  { name: '乐山市', workers: '1,156', underground: '112', abnormal: '0', x: 50, y: 82, tone: 'green' },
  { name: '凉山州', workers: '987', underground: '78', abnormal: '1', x: 30, y: 90, tone: 'green' },
  { name: '泸州市', workers: '2,231', underground: '150', abnormal: '1', x: 64, y: 77, tone: 'blue' },
];

const staffingRows = [
  ['配备达标煤矿', '162 矿', '92.05%', 92, 'blue'],
  ['配备不足煤矿', '14 矿', '7.95%', 18, 'amber'],
  ['特种作业人员不足', '23 矿', '12.94%', 32, 'blue'],
  ['关键岗位缺员', '17 矿', '9.55%', 24, 'blue'],
];

const certificateCards = [
  { label: '持证正常', value: '53,246', unit: '人', rate: '90.82%', tone: 'green', icon: ShieldCheck },
  { label: '临期证照', value: '3,128', unit: '人', rate: '5.33%', tone: 'amber', icon: Clock },
  { label: '过期证照', value: '1,426', unit: '人', rate: '2.43%', tone: 'red', icon: AlertTriangle },
  { label: '证岗不符', value: '824', unit: '人', rate: '1.41%', tone: 'purple', icon: ClipboardList },
];

const accessExceptions = [
  { label: '未实名下井', people: '18', mines: '6', tone: 'red', icon: UserRound },
  { label: '未建档下井', people: '22', mines: '8', tone: 'amber', icon: ClipboardList },
  { label: '培训未完成下井', people: '31', mines: '11', tone: 'orange', icon: CalendarDays },
  { label: '证照异常下井', people: '19', mines: '7', tone: 'purple', icon: ShieldAlert },
];

const abnormalMines = [
  ['金顶山煤矿有限公司', '南充市', '证照异常下井', '高', '27 人'],
  ['红岩坝煤矿', '达州市', '培训未完成下井', '高', '23 人'],
  ['青红沟煤矿', '广元市', '未实名下井', '高', '18 人'],
  ['白果坝煤矿', '内江市', '未建档下井', '中', '16 人'],
  ['石龙沟煤矿', '眉山市', '培训未完成下井', '中', '12 人'],
];

const personnelTableRows = [
  ['宏达煤业有限公司', '成都市', '1,842', '156', '正常', '正常', '0', '已到位', '低'],
  ['龙门山煤矿', '绵阳市', '1,256', '132', '正常', '正常', '1', '已到位', '低'],
  ['金顶山煤矿有限公司', '南充市', '2,041', '162', '关注', '异常', '5', '未到位', '高'],
  ['红岩坝煤矿', '达州市', '1,205', '95', '关注', '正常', '4', '未到位', '高'],
  ['凉风煤业有限公司', '凉山州', '987', '78', '正常', '关注', '1', '已到位', '中'],
];

function PersonnelPanel({ title, aside, children }: { code?: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="personnel-panel">
      <header>
        <div><strong>{title}</strong></div>
        {aside ? <em>{aside}</em> : null}
      </header>
      {children}
    </section>
  );
}

function PersonnelSafetyPage({ onExit }: { onExit?: () => void }) {
  const trendPoints = '0,72 42,52 84,37 126,26 168,20 210,16 252,18 294,20 336,21 378,22 420,25 462,26 504,18 546,16 588,20 630,30';

  return (
    <div className="personnel-safety-page" data-reference-page="personnel-safety-drilldown">
      <header className="personnel-page-titlebar">
        <div className="personnel-page-titlebar__main">
          <h1>人员安全监管</h1>
        </div>
        <a
          className="personnel-page-titlebar__exit"
          href={routeHref('shuan-home-command-v3')}
          onClick={(event) => {
            if (!onExit) return;
            event.preventDefault();
            onExit();
          }}
        >
          <LogOut aria-hidden="true" />
          <span>退出</span>
        </a>
      </header>

      <section className="personnel-kpi-strip" aria-label="从业人员监管核心指标">
        {personnelKpis.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`personnel-kpi-card tone-${item.tone}`}>
              <div className="personnel-kpi-icon"><Icon aria-hidden="true" /></div>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}<small>{item.unit}</small></strong>
                <em>{item.change}</em>
              </div>
            </article>
          );
        })}
      </section>

      <main className="personnel-dashboard-grid">
        <aside className="personnel-left-column">
          <PersonnelPanel code="A" title="实名认证情况">
            <div className="personnel-auth-panel">
              <div className="personnel-donut auth" style={{ '--percent': '98.62%' } as React.CSSProperties}>
                <b>98.62%</b>
                <span>实名认证率</span>
              </div>
              <div className="personnel-auth-stats">
                <p><i className="dot-blue" />实名人数 <strong>57,878 人</strong></p>
                <p><i className="dot-red" />未实名人数 <strong>746 人</strong></p>
                <p><i className="dot-spacer" />较昨日变化 <strong className="up">▲ 342 人</strong></p>
              </div>
            </div>
          </PersonnelPanel>

          <PersonnelPanel code="B" title="人员配备情况（算法支持）">
            <div className="personnel-staffing-list">
              {staffingRows.map(([label, value, rate, width, tone]) => (
                <div key={label} className={`tone-${tone}`}>
                  <span>{label}</span>
                  <i><b style={{ width: `${width}%` }} /></i>
                  <strong>{value}</strong>
                  <em>{rate}</em>
                </div>
              ))}
            </div>
          </PersonnelPanel>

          <PersonnelPanel code="C" title="资格证情况">
            <div className="personnel-cert-grid">
              {certificateCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className={`tone-${item.tone}`}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                    <strong>{item.value}<small>{item.unit}</small></strong>
                    <em>{item.rate}</em>
                  </article>
                );
              })}
            </div>
          </PersonnelPanel>
        </aside>

        <section className="personnel-map-panel">
          <header>
            <div><i /> <strong>区域人员监管态势图</strong></div>
            <em>查看：省 <ChevronRight aria-hidden="true" /> 市 <ChevronRight aria-hidden="true" /> 县 <ChevronRight aria-hidden="true" /> 煤矿 <Circle aria-hidden="true" /></em>
          </header>
          <div className="personnel-map-stage">
            <div className="personnel-map-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
            <div className="personnel-map-markers">
              {personnelRegions.map((region) => (
                <button
                  type="button"
                  key={region.name}
                  className="personnel-map-marker"
                  style={{ left: `${region.x}%`, top: `${region.y}%` } as React.CSSProperties}
                  aria-label={`${region.name} 从业${region.workers} 井下${region.underground} 异常${region.abnormal}矿`}
                >
                  <span className={`personnel-map-bubble tone-${region.tone}`}>
                    <b>{region.name}</b>
                    <strong>{region.workers}</strong>
                    <em>{region.underground}</em>
                    <small>{region.abnormal}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className="personnel-map-legend">
              <strong>图例说明</strong>
              <span><i className="tone-green" />正常（0 个异常矿）</span>
              <span><i className="tone-amber" />关注（1-2 个异常矿）</span>
              <span><i className="tone-red" />异常（≥3 个异常矿）</span>
              <strong>气泡说明</strong>
              <span>从业人数（人）</span>
              <span>井下人数（人）</span>
              <span>异常矿数（个）</span>
            </div>
            <div className="personnel-map-tools" aria-hidden="true"><button>+</button><button>−</button><button><Circle /></button></div>
          </div>
        </section>

        <aside className="personnel-right-column">
          <PersonnelPanel code="A" title="今日井下人数变化" aside="单位：人">
            <div className="personnel-trend-head">
              <span>当前人数 <b>3,126</b></span>
              <span>今日峰值 <b className="orange">3,628</b></span>
              <span>较昨日 <b className="green">▲ 2.12%</b></span>
            </div>
            <div className="personnel-trend-chart">
              <div className="y-axis"><span>5,000</span><span>4,000</span><span>3,000</span><span>2,000</span><span>1,000</span><span>0</span></div>
              <svg viewBox="0 0 630 90" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="personnelTrendFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="rgba(42, 170, 255, 0.45)" />
                    <stop offset="1" stopColor="rgba(42, 170, 255, 0)" />
                  </linearGradient>
                </defs>
                <path d={`M ${trendPoints} L 630 90 L 0 90 Z`} fill="url(#personnelTrendFill)" />
                <polyline points={trendPoints} fill="none" stroke="#28aaff" strokeWidth="3" />
              </svg>
              <div className="x-axis"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>24:00</span></div>
              <label>15:00<br /><b>3,628</b></label>
            </div>
          </PersonnelPanel>

          <PersonnelPanel code="B" title="带班领导到位情况">
            <div className="personnel-leader-panel">
              <div className="personnel-donut leader" style={{ '--percent': '84.6%' } as React.CSSProperties}>
                <b>84.6%</b>
                <span>到位率</span>
              </div>
              <div className="personnel-leader-stats">
                <p><i className="dot-blue" />应带班煤矿数 <strong>195 矿</strong></p>
                <p><i className="dot-green" />已到位煤矿数 <strong>165 矿</strong></p>
                <p><i className="dot-red" />未到位煤矿数 <strong>30 矿</strong></p>
              </div>
            </div>
          </PersonnelPanel>

          <PersonnelPanel code="C" title="下井准入异常（今日）">
            <div className="personnel-access-grid">
              {accessExceptions.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className={`tone-${item.tone}`}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                    <strong>{item.people}<small>人</small></strong>
                    <em>{item.mines} 矿</em>
                  </article>
                );
              })}
            </div>
          </PersonnelPanel>

            <PersonnelPanel code="D" title="当前异常煤矿清单（按风险排序）">
            <div className="personnel-rank-list">
              {abnormalMines.map((row, index) => (
                <div key={row[0]}>
                  <i>{index + 1}</i>
                  <span>{row[0]}</span>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                  <b className={row[3] === '高' ? 'high' : 'mid'}>{row[3]}</b>
                  <strong>{row[4]}</strong>
                </div>
              ))}
            </div>
            <footer className="personnel-pagination"><span>共 168 条</span><ChevronLeft /><b>1</b><span>2</span><span>3</span><span>4</span><span>5</span><span>...</span><span>17</span><ChevronRight /><button>10 条/页 <ChevronDown /></button></footer>
          </PersonnelPanel>
        </aside>

        <section className="personnel-table-panel">
          <header><div><strong>区域煤矿人员监管清单</strong></div></header>
          <div className="personnel-table">
            <div className="head">
              <span></span><span>煤矿名称</span><span>所属区域</span><span>从业人数（人）</span><span>当前井下人数（人）</span><span>配备状态</span><span>持证情况</span><span>下井准入异常</span><span>带班状态</span><span>风险等级</span><span>操作</span>
            </div>
            {personnelTableRows.map((row, index) => (
              <div key={row[0]}>
                <span>{index + 1}</span>
                {row.map((cell, cellIndex) => (
                  <span key={`${row[0]}-${cellIndex}`} className={cellIndex >= 4 && cellIndex <= 8 ? `tag tag-${cell}` : ''}>{cell}</span>
                ))}
                <span className="actions">查看　详情</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const productionOperationKpis = [
  { label: '煤矿总数', value: '174', unit: '处', icon: Building2, tone: 'cyan' },
  { label: '生产矿井', value: '64', unit: '处', icon: Factory, tone: 'blue' },
  { label: '建设矿井', value: '13', unit: '处', icon: Gauge, tone: 'violet' },
  { label: '本日产量', value: '7.2', unit: '万吨', icon: BarChart3, tone: 'amber' },
  { label: '本月产量', value: '214', unit: '万吨', icon: TrendingUp, tone: 'green' },
  { label: '年累计产量', value: '2429', unit: '万吨', icon: Activity, tone: 'sky' },
  { label: '电煤产量', value: '168', unit: '万吨', icon: Zap, tone: 'gold' },
  { label: '电煤供应量', value: '96', unit: '万吨', icon: MonitorCog, tone: 'purple' },
] as const;

const productionOperationRegions = [
  { name: '泸州市', output: '727.6', supply: '32.8', percent: 100, rank: 1 },
  { name: '宜宾市', output: '512.3', supply: '22.6', percent: 70, rank: 2 },
  { name: '广元市', output: '486.1', supply: '19.6', percent: 67, rank: 3 },
  { name: '绵阳市', output: '382.8', supply: '17.2', percent: 53, rank: 4 },
  { name: '乐山市', output: '245.8', supply: '11.4', percent: 34, rank: 5 },
  { name: '内江市', output: '220.6', supply: '9.1', percent: 30, rank: 6 },
  { name: '雅安市', output: '198.7', supply: '8.0', percent: 27, rank: 7 },
  { name: '夹炭城市', output: '153.4', supply: '5.0', percent: 21, rank: 8 },
] as const;

const productionOperationMapLabels = [
  { name: '阿坝州', x: 46, y: 23 },
  { name: '甘孜州', x: 25, y: 42 },
  { name: '绵阳市', x: 67, y: 37 },
  { name: '巴中市', x: 86, y: 33 },
  { name: '成都市', x: 55, y: 50 },
  { name: '内江市', x: 69, y: 60 },
  { name: '达州市', x: 86, y: 56 },
  { name: '宜宾市', x: 70, y: 78 },
  { name: '凉山州', x: 39, y: 82 },
] as const;

const productionOperationSales = [
  { label: '产量', value: '433', unit: '万吨', trend: '3.2%', direction: 'down' },
  { label: '销量', value: '420', unit: '万吨', trend: '2.8%', direction: 'up' },
  { label: '库存', value: '1,256', unit: '万吨', trend: '1.1%', direction: 'down' },
  { label: '电煤库存量', value: '96', unit: '万吨', trend: '1.5%', direction: 'up' },
] as const;

const productionOperationMining = [
  ['采煤工作面数', '76', '个'],
  ['掘进工作面数', '52', '个'],
  ['掘进进尺', '34', '米'],
  ['回采工作面数', '28', '个'],
] as const;

const productionOperationContinuity = [
  ['连续正常矿井数', '58', '处', '正常', 'good'],
  ['连续偏紧矿井数', '6', '处', '偏紧', 'warn'],
  ['开拓煤量达标矿井数', '54', '处', '正常', 'good'],
  ['准备煤量达标矿井数', '49', '处', '正常', 'good'],
  ['回采煤量达标矿井数', '52', '处', '正常', 'good'],
  ['可采期不足矿井数', '4', '处', '不足', 'bad'],
] as const;

const productionOperationResources = [
  ['已填报资源储量矿井数', '64', '处', '', ''],
  ['保有地质储量合计', '5978', '万吨', '', ''],
  ['设计可采储量合计', '4876', '万吨', '', ''],
  ['可采储量充足矿井数', '51', '处', '充足', 'good'],
  ['可采储量偏低矿井数', '9', '处', '偏低', 'warn'],
] as const;

const productionOperationRows = [
  ['1', '龙滩煤矿一号井', '达州市', '正常生产', '5.6', '172.6', '925.8', '4.1', '268.5', '3.8', '8', '5', '07-08 08:30'],
  ['2', '凉山船城矿', '广元市', '正常生产', '3.8', '118.2', '648.9', '3.0', '194.2', '2.9', '6', '4', '07-08 08:25'],
  ['3', '南充恒源能源矿', '南充市', '正常生产', '4.2', '132.4', '732.5', '3.5', '201.6', '3.2', '7', '5', '07-08 08:20'],
  ['4', '平武煤矿', '绵阳市', '正常生产', '2.7', '84.2', '426.3', '2.1', '137.6', '2.0', '5', '3', '07-08 08:15'],
  ['5', '金熙煤矿', '成都市', '正常生产', '2.1', '63.7', '365.4', '1.5', '96.4', '1.4', '4', '3', '07-08 08:10'],
  ['6', '鲁班煤矿', '乐山市', '正常生产', '1.9', '59.8', '331.7', '1.3', '87.9', '1.2', '4', '2', '07-08 08:05'],
  ['7', '夹江煤矿一号井', '宜宾市', '正常生产', '1.8', '55.1', '298.4', '1.1', '68.9', '1.0', '3', '2', '07-08 08:00'],
] as const;

function ProductionOperationSection({ title, className = '', headerAction, children }: { title: string; className?: string; headerAction?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className={`production-operation-panel ${className}`}>
      <header className="production-operation-panel__head"><span>{title}</span>{headerAction}</header>
      {children}
    </section>
  );
}

function ProductionOperationPage({ onExit }: { onExit?: () => void }) {
  return (
    <div className="production-operation-page">
      <div className="production-operation-shell">
        <header className="production-operation-toolbar">
          <div className="production-operation-titlebar">
            <h1>煤矿生产运行详情</h1>
            <a
              className="production-operation-exit"
              href={routeHref('shuan-home-command-v3')}
              onClick={(event) => {
                if (!onExit) return;
                event.preventDefault();
                onExit();
              }}
            >
              <LogOut aria-hidden="true" />
              <span>退出</span>
            </a>
          </div>
          <div className="production-operation-filters">
            <label><span>统计日期:</span><div className="production-operation-control">2026-07-08<CalendarDays aria-hidden="true" /></div></label>
            <label><span>区域:</span><div className="production-operation-control">全部<ChevronDown aria-hidden="true" /></div></label>
            <label><span>煤矿状态:</span><div className="production-operation-control">全部<ChevronDown aria-hidden="true" /></div></label>
              <label className="production-operation-search"><span>煤矿名称:</span><div className="production-operation-control">请输入煤矿名称<Search aria-hidden="true" /></div></label>
            <button className="production-operation-query" type="button"><Search aria-hidden="true" />查询</button>
            <button className="production-operation-reset" type="button"><RefreshCcw aria-hidden="true" />重置</button>
          </div>
        </header>

        <div className="production-operation-kpis">
          {productionOperationKpis.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className={`production-operation-kpi tone-${item.tone}`}>
                <Icon aria-hidden="true" />
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <em>{item.unit}</em>
                </div>
              </article>
            );
          })}
        </div>

        <div className="production-operation-main-grid">
          <ProductionOperationSection title="区域生产分布" className="production-operation-region">
            <div className="production-operation-map">
              <div className="production-operation-map-shape" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
              {productionOperationMapLabels.map((label) => (
                <span key={label.name} style={{ left: `${label.x}%`, top: `${label.y}%` }}>{label.name}</span>
              ))}
            </div>
            <div className="production-operation-rank">
              <div className="production-operation-rank-head"><span>地市/区县</span><span>产量（万吨）</span><span>电煤供应量（万吨）</span></div>
              {productionOperationRegions.map((row) => (
                <div className="production-operation-rank-row" key={row.name}>
                  <i>{row.rank}</i>
                  <span>{row.name}</span>
                  <b><em style={{ width: `${row.percent}%` }} /></b>
                  <strong>{row.output}</strong>
                  <small>{row.supply}</small>
                </div>
              ))}
              <div className="production-operation-rank-total"><span>合计</span><strong>2429.0</strong><small>125.9</small></div>
            </div>
          </ProductionOperationSection>

          <ProductionOperationSection title="产量趋势" className="production-operation-trends">
            <div className="production-operation-chart production-operation-line-chart">
              <h4>近30日产量趋势 <span>（万吨）</span></h4>
              <div className="production-operation-chart-box">
                <div className="production-operation-axis-y"><span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
                <svg viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="productionLineFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2b8cff" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#2b8cff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 150 L0 88 L15 90 L30 84 L45 88 L60 75 L75 82 L90 72 L105 84 L120 66 L135 80 L150 72 L165 110 L180 69 L195 77 L210 84 L225 76 L240 84 L255 70 L270 78 L285 66 L300 61 L300 150 Z" fill="url(#productionLineFill)" />
                  <polyline points="0,88 15,90 30,84 45,88 60,75 75,82 90,72 105,84 120,66 135,80 150,72 165,110 180,69 195,77 210,84 225,76 240,84 255,70 270,78 285,66 300,61" fill="none" stroke="#48a0ff" strokeWidth="2.5" />
                  <circle cx="300" cy="61" r="4" fill="#6fc7ff" />
                </svg>
                  <div className="production-operation-tooltip">7月8日<br />产量：232.0</div>
                <div className="production-operation-axis-x"><span>06-09</span><span>06-16</span><span>06-23</span><span>06-30</span><span>07-08</span></div>
              </div>
            </div>
            <div className="production-operation-chart production-operation-bar-chart">
              <h4>近12个月产量趋势 <span>（万吨）</span></h4>
              <div className="production-operation-chart-box">
                <div className="production-operation-axis-y"><span>3,000</span><span>2,400</span><span>1,800</span><span>1,200</span><span>600</span><span>0</span></div>
                <div className="production-operation-bars">
                  {[64, 71, 70, 78, 84, 74, 75, 89, 100, 75].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                </div>
                <div className="production-operation-axis-x"><span>8月</span><span>10月</span><span>12月</span><span>2月</span><span>4月</span><span>6月</span></div>
              </div>
            </div>
          </ProductionOperationSection>

          <ProductionOperationSection title="电煤占比" className="production-operation-power">
            <div className="production-operation-donut"><span>38.7%</span><em>电煤占比</em></div>
            <div className="production-operation-legend">
              <p><i className="blue" />电煤产量 <strong>168</strong> 万吨</p>
              <p><i className="green" />其他煤种 <strong>265</strong> 万吨</p>
              <b>合计 <strong>433</strong> 万吨</b>
            </div>
          </ProductionOperationSection>
        </div>

        <div className="production-operation-stat-grid">
            <ProductionOperationSection title="产销存统计" className="production-operation-sales">
            <div className="production-operation-sales-grid">
              {productionOperationSales.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong><em>{item.unit}</em>
                    <p>日环比<b className={item.direction}>{item.direction === 'up' ? '↑' : '↓'} {item.trend}</b></p>
                </article>
              ))}
            </div>
          </ProductionOperationSection>
          <ProductionOperationSection title="采掘基本情况" className="production-operation-mining">
            <div className="production-operation-mini-grid">
              {productionOperationMining.map(([label, value, unit]) => <article key={label}><span>{label}</span><strong>{value}</strong><em>{unit}</em></article>)}
            </div>
          </ProductionOperationSection>
          <ProductionOperationSection title="接续保障统计" className="production-operation-continuity">
            <div className="production-operation-tag-grid">
              {productionOperationContinuity.map(([label, value, unit, tag, tone]) => <article key={label}><span>{label}</span><strong>{value}</strong><em>{unit}</em><b className={`tag-${tone}`}>{tag}</b></article>)}
            </div>
          </ProductionOperationSection>
          <ProductionOperationSection title="资源基础统计" className="production-operation-resource">
            <div className="production-operation-tag-grid resource">
              {productionOperationResources.map(([label, value, unit, tag, tone]) => <article key={label}><span>{label}</span><strong>{value}</strong><em>{unit}</em>{tag ? <b className={`tag-${tone}`}>{tag}</b> : null}</article>)}
            </div>
          </ProductionOperationSection>
        </div>

        <ProductionOperationSection
          title="煤矿生产明细"
          className="production-operation-table-panel"
          headerAction={<div className="production-operation-pagination"><span>共 174 条</span><button>10条/页</button><button><ChevronLeft aria-hidden="true" /></button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><span>...</span><button>18</button><button><ChevronRight aria-hidden="true" /></button><span>跳至</span><button>1</button><span>页</span></div>}
        >
          <div className="production-operation-table">
            <div className="production-operation-table-row head">
              {['序号', '煤矿名称', '区县', '生产状态', '本日产量（万吨）', '本月产量（万吨）', '年累计产量（万吨）', '电煤产量（万吨）', '库存（万吨）', '电煤供应量（万吨）', '采煤面（个）', '掘进面（个）', '更新时间', '操作'].map((head) => <span key={head}>{head}</span>)}
            </div>
            {productionOperationRows.map((row) => (
              <div className="production-operation-table-row" key={row[0]}>
                {row.map((cell, index) => index === 3 ? <span key={index} className="production-operation-status"><i />{cell}</span> : <span key={index}>{cell}</span>)}
                <span className="production-operation-actions"><Search aria-label="查看详情" /><BarChart3 aria-label="趋势分析" /></span>
              </div>
            ))}
          </div>
        </ProductionOperationSection>
      </div>
    </div>
  );
}

function MajorHazardReminderPage() {
  const data = shuanMajorHazardReminderData;
  const [activeTab, setActiveTab] = useState<'current' | 'historical'>('current');
  const [selectedMineId, setSelectedMineId] = useState(data.selectedDisaster.affectedMines[0]?.id || '');

  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [notifyForm, setNotifyForm] = useState({ time: '', operator: '寮犵洃绠?', contactPerson: '', contactPhone: '', summary: '' });
  const [confirmForm, setConfirmForm] = useState({ time: '', operator: '寮犵洃绠?', note: '' });
  const [mineStatuses, setMineStatuses] = useState<Record<string, string>>({});
  const [timelineModalType, setTimelineModalType] = useState<'notify' | 'complete' | null>(null);

  const disasterList = activeTab === 'current' ? data.currentDisasters : data.historicalDisasters;
  const selectedMine = data.selectedDisaster.affectedMines.find(m => m.id === selectedMineId) || data.selectedDisaster.affectedMines[0];

  const typeIconMap: Record<string, React.ElementType> = {
    rain: CloudRain,
    landslide: Mountain,
    earthquake: Activity,
    lightning: CloudLightning,
    flood: Waves,
  };

  const warningLevelClass: Record<string, string> = {
    orange: 'level-orange',
    yellow: 'level-yellow',
    blue: 'level-blue',
    red: 'level-red',
  };

  const warningLevelText: Record<string, string> = {
    orange: '橙色预警',
    yellow: '黄色预警',
    blue: '蓝色预警',
    red: '红色预警',
  };

  const mapMarkerClass: Record<string, string> = {
    'need-evacuation': 'marker-red',
    'feedback': 'marker-green',
    'no-feedback': 'marker-yellow',
    'completed': 'marker-gray',
  };

  const mineActionClass: Record<string, string> = {
    '监测中': 'action-monitoring',
    '撤人中': 'action-evacuating',
    '疑似完成': 'action-warning',
    '撤离完成': 'action-done',
  };

  return (
    <div className="drill-page drill-major-hazard-page tone-cyan">
      <header className="mhr-titlebar">
        <div className="mhr-titlebar-main">
          <h1>{data.title}</h1>
        </div>
        <a className="mhr-exit" href={routeHref('shuan-home-command-v3')}>
          <LogOut aria-hidden="true" />
          <span>退出</span>
        </a>
      </header>
      {/* Top status bar */}
      <section className="mhr-status-bar" aria-label="全局实时状态">
        <div className="mhr-status-item">
          <AlertTriangle className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">当前灾害</span>
            <strong className="mhr-status-value">{data.globalStatus.currentDisasterCount}<small>璧?</small></strong>
          </div>
        </div>
        <div className="mhr-status-item">
          <Building2 className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">影响煤矿</span>
            <strong className="mhr-status-value">{data.globalStatus.affectedMineCount}<small>搴?</small></strong>
          </div>
        </div>
        <div className="mhr-status-item">
          <Users className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">需撤离</span>
            <strong className="mhr-status-value">{data.globalStatus.needEvacuationCount}<small>搴?</small></strong>
          </div>
        </div>
        <div className="mhr-status-item">
          <Bell className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">未反馈</span>
            <strong className="mhr-status-value">{data.globalStatus.noFeedbackCount}<small>搴?</small></strong>
          </div>
        </div>
        <div className="mhr-status-item">
          <ShieldCheck className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">处置状态</span>
            <strong className="mhr-status-value mhr-status-disposal">{data.globalStatus.disposalStatus}</strong>
          </div>
        </div>
        <div className="mhr-status-item mhr-status-time">
          <Clock className="mhr-status-icon" aria-hidden="true" />
          <div>
            <span className="mhr-status-label">{data.globalStatus.currentTime}</span>
            <span className="mhr-status-refresh">
              <span className="mhr-refresh-dot" />
              自动刷新中（10s锛?
            </span>
          </div>
        </div>
      </section>

      {/* Three-column workspace */}
      <div className="mhr-workspace">
        {/* Left: Disaster event list */}
        <aside className="mhr-left-panel">
          <header className="mhr-panel-header">
            <span className="mhr-panel-title-bar" />
            <strong>灾害事件列表</strong>
          </header>
          <div className="mhr-tabs">
            <button
              type="button"
              className={activeTab === 'current' ? 'active' : ''}
              onClick={() => setActiveTab('current')}
            >
              当前灾害
            </button>
            <button
              type="button"
              className={activeTab === 'historical' ? 'active' : ''}
              onClick={() => setActiveTab('historical')}
            >
              历史灾害
            </button>
          </div>
          <div className="mhr-disaster-list">
            {disasterList.map((disaster) => {
              const TypeIcon = typeIconMap[disaster.typeIcon] || CloudRain;
              return (
                <div
                  key={disaster.id}
                  className={`mhr-disaster-card ${activeTab === 'current' && disaster.id === disasterList[0]?.id ? 'active' : ''}`}
                >
                  <div className="mhr-disaster-card-top">
                    <div className="mhr-disaster-icon-wrap">
                      <TypeIcon aria-hidden="true" />
                    </div>
                    <div className="mhr-disaster-info">
                      <div className="mhr-disaster-title-row">
                        <strong>{disaster.type}</strong>
                        <span className={`mhr-warning-badge ${warningLevelClass[disaster.warningLevel]}`}>
                          {warningLevelText[disaster.warningLevel]}
                        </span>
                      </div>
                      <span className="mhr-disaster-name">{disaster.name}</span>
                    </div>
                  </div>
                  <div className="mhr-disaster-card-bottom">
                    <span className="mhr-disaster-time">
                      <Clock size={12} aria-hidden="true" />
                      {disaster.time}
                    </span>
                    <span className="mhr-disaster-mines">影响煤矿 {disaster.affectedMineCount}搴?</span>
                      <span className={`mhr-disaster-status ${disaster.status === '处置中' ? 'status-active' : disaster.status === '监测中' ? 'status-monitor' : 'status-resolved'}`}>
                      {disaster.status}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="mhr-disaster-count">鍏?{disasterList.length} 条</div>
          </div>
        </aside>

        {/* Center: Disaster detail + Map */}
        <main className="mhr-center-panel">
          <header className="mhr-panel-header">
            <span className="mhr-panel-title-bar" />
            <strong>当前查看事件</strong>
          </header>
          <div className="mhr-detail-card">
            <div className="mhr-detail-grid">
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">灾害名称</span>
                <strong className="mhr-detail-value">{data.selectedDisaster.detail.name}</strong>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">灾害类型</span>
                <span className="mhr-detail-value">{data.selectedDisaster.detail.type}</span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">预警级别</span>
                <span className={`mhr-detail-value mhr-warning-text ${warningLevelClass[data.selectedDisaster.detail.warningLevel.replace('预警', '')]}`}>
                  <span className="mhr-dot" />
                  {data.selectedDisaster.detail.warningLevel}
                </span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">影响区域</span>
                <span className="mhr-detail-value">{data.selectedDisaster.detail.area}</span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">数据来源</span>
                <span className="mhr-detail-value">{data.selectedDisaster.detail.source}</span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">发布时间</span>
                <span className="mhr-detail-value">{data.selectedDisaster.detail.publishTime}</span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">更新时间</span>
                <span className="mhr-detail-value">{data.selectedDisaster.detail.updateTime}</span>
              </div>
              <div className="mhr-detail-field">
                <span className="mhr-detail-label">褰撳墠鐘舵€?</span>
                <span className="mhr-detail-value mhr-status-text">{data.selectedDisaster.detail.status}</span>
              </div>
            </div>
          </div>

          <header className="mhr-panel-header mhr-map-header">
            <span className="mhr-panel-title-bar" />
            <strong>鐏惧褰卞搷鑼冨洿涓庣叅鐭垮垎甯?</strong>
          </header>
          <div className="mhr-map-wrap">
            <div
              className="mhr-map-container"
              dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }}
            />
            <div className="mhr-map-range-circle" />
            <span className="mhr-map-area-label">鏈濆ぉ鍖?</span>
            {data.selectedDisaster.mapMines.map((mine) => (
              <div
                key={mine.id}
                className={`mhr-map-marker ${mapMarkerClass[mine.status]}`}
                style={{ left: `${mine.x}%`, top: `${mine.y}%` }}
                title={mine.name}
                onClick={() => setSelectedMineId(mine.id)}
              />
            ))}
            <div className="mhr-map-legend">
              <div className="mhr-legend-item">
                <span className="mhr-legend-dot marker-red" />
                <span>需撤离</span>
              </div>
              <div className="mhr-legend-item">
                <span className="mhr-legend-dot marker-green" />
                <span>宸插弽棣?</span>
              </div>
              <div className="mhr-legend-item">
                <span className="mhr-legend-dot marker-yellow" />
                <span>未反馈</span>
              </div>
              <div className="mhr-legend-item">
                <span className="mhr-legend-dot marker-gray" />
                <span>宸插畬鎴?</span>
              </div>
              <div className="mhr-legend-item">
                <span className="mhr-legend-line">----</span>
                <span>影响范围（约30km锛?</span>
              </div>
            </div>
            <div className="mhr-map-controls">
              <button type="button" className="mhr-map-btn">+</button>
              <button type="button" className="mhr-map-btn">-</button>
            </div>
          </div>
        </main>

        {/* Right: Affected mines + Evacuation details */}
        <aside className="mhr-right-panel">
          <header className="mhr-panel-header">
            <span className="mhr-panel-title-bar" />
            <strong>鍙楀奖鍝嶇叅矿</strong>
          </header>
          <div className="mhr-mine-list">
            {data.selectedDisaster.affectedMines.map((mine) => {
              const currentMineStatus = mineStatuses[mine.id] || mine.status;
              const statusBadgeClass = currentMineStatus === '监测中'
                ? 'badge-blue'
                : currentMineStatus === '撤人中' || currentMineStatus === '通知撤人'
                  ? 'badge-orange'
                  : currentMineStatus === '疑似完成'
                    ? 'badge-purple'
                    : 'badge-green';
              return (
              <div
                key={mine.id}
                className={`mhr-mine-card ${selectedMine?.id === mine.id ? 'active' : ''} ${mine.needEvacuation ? 'need-evacuation' : ''}`}
                onClick={() => setSelectedMineId(mine.id)}
              >
                <div className="mhr-mine-main">
                  <div className="mhr-mine-card-top">
               <div className={`mhr-mine-icon ${mine.feedbackStatus === '宸插弽棣?' ? 'feedback-yes' : 'feedback-no'}`}>
                      <Factory size={16} />
                    </div>
                    <div className="mhr-mine-info">
                      <div className="mhr-mine-title-row">
                        <strong>{mine.name}</strong>
                        <span className={`mhr-status-badge ${statusBadgeClass}`}>
                          {currentMineStatus}
                        </span>
                      </div>
                      <div className="mhr-mine-meta-row">
                        <span className="mhr-mine-area">{mine.area}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mhr-mine-stats">
                   <span className="mhr-mine-stat">
                      <em>井下人数</em>
                      <strong>{mine.undergroundCount}人</strong>
                    </span>
                    <span className="mhr-mine-stat">
                      <em>初始人数</em>
                      <strong>{mine.initialUndergroundCount}人</strong>
                    </span>
                    <span className="mhr-mine-stat mhr-mine-stat-report">
                      <em>鏈€鏂颁笂鎶?</em>
                      <strong>{mine.lastReportTime}</strong>
                    </span>
                  </div>
                </div>
               <div className="mhr-mine-side">
                  {(mineStatuses[mine.id] || mine.status) === '监测中' && (
                    <button type="button" className="mhr-btn-notify" onClick={(e) => { e.stopPropagation(); setNotifyModalOpen(true); }}>通知撤人</button>
                  )}
                  {(mineStatuses[mine.id] || mine.status) === '疑似完成' && (
                    <button type="button" className="mhr-btn-confirm" onClick={(e) => { e.stopPropagation(); setConfirmModalOpen(true); }}>确认完成</button>
                  )}
                  {((mineStatuses[mine.id] || mine.status) !== '监测中' && (mineStatuses[mine.id] || mine.status) !== '疑似完成') && (
                    <span className={`mhr-mine-action ${mineActionClass[mine.status] || 'action-monitoring'}`}>{mine.status}</span>
                  )}
                </div>
              </div>
              );
            })}
          </div>

          {/* Evacuation detail for selected mine */}
          {selectedMine && (
            <>
             <header className="mhr-panel-header mhr-evac-header">
               <span className="mhr-panel-title-bar" />
                <strong>煤矿撤人详情</strong>
                 <span className="mhr-evac-subtitle">（{selectedMine.name}）</span>
              </header>
              <div className="mhr-evac-card">
                <div className="mhr-evac-stats">
                  <div className="mhr-evac-stat">
                    <span>浜曚笅鎬讳汉鏁?</span>
                    <strong>{data.selectedDisaster.evacuationDetail.totalUnderground}</strong>
                  </div>
                  <div className="mhr-evac-stat">
                    <span>宸叉挙绂?</span>
                    <strong className="text-success">{data.selectedDisaster.evacuationDetail.evacuated}</strong>
                  </div>
                  <div className="mhr-evac-stat">
                    <span>鏈挙绂?</span>
                    <strong className="text-danger">{data.selectedDisaster.evacuationDetail.unevacuated}</strong>
                  </div>
                  <div className="mhr-evac-stat mhr-evac-rate">
                    <span>鎾ょ瀹屾垚鐜?</span>
                    <div className="mhr-rate-circle">
                      <svg viewBox="0 0 36 36">
                        <path className="mhr-rate-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="mhr-rate-fill" strokeDasharray={`${parseFloat(data.selectedDisaster.evacuationDetail.completionRate)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <strong>{data.selectedDisaster.evacuationDetail.completionRate}</strong>
                    </div>
                  </div>
                </div>
                <div className="mhr-evac-contact">
                  <span><Phone size={12} /> 调度电话 {selectedMine.phone}</span>
                  <span><Clock size={12} /> 鏈€鍚庝笂鎶?{selectedMine.lastReportTime}</span>
                </div>
              </div>

             <header className="mhr-panel-header">
               <span className="mhr-panel-title-bar" />
                <strong>撤人进度</strong>
              </header>
              <div className="mhr-timeline">
                {/* 监测中- 始终完成 */}
                <div className="mhr-timeline-item completed">
                  <div className="mhr-timeline-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="mhr-timeline-content">
                    <span className="mhr-timeline-name">监测中</span>
                    <span className="mhr-timeline-time"><CheckCircle2 size={10} /> 灾害接入</span>
                  </div>
                </div>

                {/* 通知撤人 - 有记录可点击查看 */}
                <div 
                  className={`mhr-timeline-item ${selectedMine.notification ? 'completed' : ''} ${selectedMine.notification ? 'clickable' : ''}`}
                  onClick={() => {
                    if (selectedMine.notification) {
                      setTimelineModalType('notify');
                      setNotifyModalOpen(true);
                    }
                  }}
                >
                  <div className="mhr-timeline-icon">
                    {selectedMine.notification ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>
                  <div className="mhr-timeline-content">
                    <span className="mhr-timeline-name">通知撤人</span>
                    <span className="mhr-timeline-time">
                      {selectedMine.notification ? <><CheckCircle2 size={10} /> {selectedMine.notification.time}</> : '----'}
                    </span>
                  </div>
                </div>

                {/* 撤人中- 有通知记录 */}
                <div className={`mhr-timeline-item ${selectedMine.notification ? 'completed' : ''}`}>
                  <div className="mhr-timeline-icon">
                    {selectedMine.notification ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>
                  <div className="mhr-timeline-content">
                    <span className="mhr-timeline-name">撤人中</span>
                    <span className="mhr-timeline-time">
                      {selectedMine.notification ? <><CheckCircle2 size={10} /> 已通知</> : '----'}
                    </span>
                  </div>
                </div>

                {/* 疑似完成 - 井下人数=0 */}
                <div className={`mhr-timeline-item ${selectedMine.undergroundCount === 0 ? 'completed' : ''}`}>
                  <div className="mhr-timeline-icon">
                    {selectedMine.undergroundCount === 0 ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>
                  <div className="mhr-timeline-content">
                    <span className="mhr-timeline-name">疑似完成</span>
                    <span className="mhr-timeline-time">
                      {selectedMine.undergroundCount === 0 ? <><CheckCircle2 size={10} /> 浜曚笅浜烘暟涓?</> : '----'}
                    </span>
                  </div>
                </div>

                {/* 撤离完成 - 有记录可点击查看 */}
                <div 
                  className={`mhr-timeline-item ${selectedMine.completionConfirmed ? 'completed' : ''} ${selectedMine.completionConfirmed ? 'clickable' : ''}`}
                  onClick={() => {
                    if (selectedMine.completionConfirmed) {
                      setTimelineModalType('complete');
                      setConfirmModalOpen(true);
                    }
                  }}
                >
                  <div className="mhr-timeline-icon">
                    {selectedMine.completionConfirmed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>
                  <div className="mhr-timeline-content">
                    <span className="mhr-timeline-name">撤离完成</span>
                    <span className="mhr-timeline-time">
                      {selectedMine.completionConfirmed ? <><CheckCircle2 size={10} /> {selectedMine.completionConfirmed.time}</> : '----'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Notify Modal - 通用浮窗 */}
      {notifyModalOpen && timelineModalType === 'notify' && (
        <div className="mhr-modal-overlay" onClick={() => setNotifyModalOpen(false)}>
          <div className="mhr-modal" onClick={(e) => e.stopPropagation()}>
            <header className="mhr-modal-header">
              <strong>通知撤人</strong>
              <button type="button" className="mhr-modal-close" onClick={() => setNotifyModalOpen(false)}>脳</button>
            </header>
            <div className="mhr-modal-body">
              <div className="mhr-form-field">
                <label>通知时间</label>
                <input type="text" value={notifyForm.time} onChange={(e) => setNotifyForm({ ...notifyForm, time: e.target.value })} placeholder="08:20" />
              </div>
              <div className="mhr-form-field">
                 <label>执行人</label>
                <input type="text" value={notifyForm.operator} onChange={(e) => setNotifyForm({ ...notifyForm, operator: e.target.value })} />
              </div>
              <div className="mhr-form-field">
                <label>对方人员</label>
                <input type="text" value={notifyForm.contactPerson} onChange={(e) => setNotifyForm({ ...notifyForm, contactPerson: e.target.value })} placeholder="调度姓名" />
              </div>
              <div className="mhr-form-field">
                <label>对方电话</label>
                <input type="text" value={notifyForm.contactPhone} onChange={(e) => setNotifyForm({ ...notifyForm, contactPhone: e.target.value })} placeholder="0839-8622001" />
              </div>
              <div className="mhr-form-field">
                <label>通话内容</label>
                <textarea value={notifyForm.summary} onChange={(e) => setNotifyForm({ ...notifyForm, summary: e.target.value })} placeholder="简要记录通话内容" rows={3} />
              </div>
            </div>
            <footer className="mhr-modal-footer">
              <button type="button" className="mhr-btn-cancel" onClick={() => setNotifyModalOpen(false)}>取消</button>
              <button type="button" className="mhr-btn-primary" onClick={() => { setNotifyModalOpen(false); if (selectedMineId) setMineStatuses(prev => ({ ...prev, [selectedMineId]: '撤人中' })); }}>确认通知</button>
            </footer>
          </div>
        </div>
      )}

      {/* Confirm Modal - 通用浮窗 */}
      {confirmModalOpen && timelineModalType === 'complete' && (
        <div className="mhr-modal-overlay" onClick={() => setConfirmModalOpen(false)}>
          <div className="mhr-modal" onClick={(e) => e.stopPropagation()}>
            <header className="mhr-modal-header">
              <strong>确认撤人完成</strong>
              <button type="button" className="mhr-modal-close" onClick={() => setConfirmModalOpen(false)}>脳</button>
            </header>
            <div className="mhr-modal-body">
              <div className="mhr-form-field">
                <label>确认时间</label>
                <input type="text" value={confirmForm.time} onChange={(e) => setConfirmForm({ ...confirmForm, time: e.target.value })} placeholder="08:30" />
              </div>
              <div className="mhr-form-field">
                 <label>确认人</label>
                <input type="text" value={confirmForm.operator} onChange={(e) => setConfirmForm({ ...confirmForm, operator: e.target.value })} />
              </div>
              <div className="mhr-form-field">
                <label>备注</label>
                <textarea value={confirmForm.note} onChange={(e) => setConfirmForm({ ...confirmForm, note: e.target.value })} placeholder="可选" rows={2} />
              </div>
            </div>
            <footer className="mhr-modal-footer">
              <button type="button" className="mhr-btn-cancel" onClick={() => setConfirmModalOpen(false)}>取消</button>
              <button type="button" className="mhr-btn-primary" onClick={() => setConfirmModalOpen(false)}>确认完成</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}


function LicenseExpiryReminderPage() {
  const data = shuanLicenseExpiryReminderData;

  const markerColor = (v: number) => {
    if (v >= 10) return '#ff4d4f';
    if (v >= 5) return '#ff9d27';
    if (v >= 1) return '#2b7de9';
    return '#4a5568';
  };

  const maxLicenseTotal = Math.max(...data.licenseTypes.map((l) => l.total));
  const maxMineTotal = Math.max(...data.mineRankings.map((m) => m.total));
  const maxPos = Math.max(...data.positionAbnormal.map((p) => p.value));
  const trendMax = Math.max(...data.trend.upcoming, ...data.trend.expired, 1);

  // 环形图SVG路径生成
  const makeDonut = (slices: typeof data.abnormalStructure, cx: number, cy: number, r: number, ir: number) => {
    let a = -Math.PI / 2;
    const total = slices.reduce((s, x) => s + x.value, 0);
    return slices.map((sl) => {
      const ang = (sl.value / total) * Math.PI * 2;
      const x1 = cx + r * Math.cos(a);
      const y1 = cy + r * Math.sin(a);
      const x2 = cx + r * Math.cos(a + ang);
      const y2 = cy + r * Math.sin(a + ang);
      const ix2 = cx + ir * Math.cos(a + ang);
      const iy2 = cy + ir * Math.sin(a + ang);
      const ix1 = cx + ir * Math.cos(a);
      const iy1 = cy + ir * Math.sin(a);
      const la = ang > Math.PI ? 1 : 0;
      const d = `M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${la} 0 ${ix1} ${iy1} Z`;
      a += ang;
      return { ...sl, d };
    });
  };

  const abnormalDonut = makeDonut(data.abnormalStructure, 50, 50, 40, 28);
  const warningDonut = makeDonut(data.warningCategories, 50, 50, 40, 28);

  // 瓒嬪娍鍥惧昂瀵?
  const chartW = 100;
  const chartH = 80;
  const padL = 8;
  const padR = 2;
  const padB = 12;
  const padT = 4;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padB - padT;

  const linePoints = (vals: number[]) =>
    vals
      .map((v, i) => {
        const x = padL + (i / Math.max(vals.length - 1, 1)) * plotW;
        const y = padT + plotH - (v / trendMax) * plotH;
        return `${x},${y}`;
      })
      .join(' ');

  const barWidth = (plotW / data.trend.days.length) * 0.35;

  return (
    <div className="drill-page ler-screen">
      <style>{`
        .ler-screen { background:#071120; min-height:0; height:100%; padding:6px 16px 10px; color:#e2e8f0; font-size:13px; overflow:hidden; box-sizing:border-box; border-top:0 !important; box-shadow:inset 1px 0 0 rgba(0,126,184,0.34), inset -1px 0 0 rgba(0,126,184,0.34), inset 0 -1px 0 rgba(0,126,184,0.34), 0 16px 42px rgba(0,0,0,0.36) !important; background-image:linear-gradient(180deg, #071120 0%, #06101e 100%); }
        .ler-screen::before { display:none !important; content:none !important; }
        .ler-topline { height:27px; display:flex; align-items:center; justify-content:space-between; padding:0 0 4px; margin-bottom:6px; }
        .ler-topline-title { font-size:16px; line-height:1; font-weight:600; color:#fff; display:flex; align-items:center; gap:10px; letter-spacing:0; }
        .ler-topline-title::before { content:''; display:inline-block; width:3px; height:20px; background:#00b8ff; border-radius:1px; box-shadow:0 0 10px rgba(0,184,255,0.75); }
        .ler-exit { display:flex; align-items:center; gap:5px; color:#94a3b8; text-decoration:none; font-size:12px; padding:3px 8px; border:1px solid rgba(42,130,220,0.48); border-radius:4px; transition:all .2s; }
        .ler-exit svg { width:13px; height:13px; }
        .ler-exit:hover { color:#fff; border-color:#2b7de9; background:rgba(43,125,233,0.1); }
        .ler-kpis { height:96px; display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:12px; margin-bottom:8px; }
        .ler-kpi { min-width:0; background:linear-gradient(135deg, rgba(12,47,89,0.93) 0%, rgba(6,25,51,0.98) 100%); border:1px solid rgba(0,126,255,0.65); border-radius:5px; padding:15px 22px 15px 24px; display:flex; align-items:center; justify-content:space-between; position:relative; overflow:hidden; box-shadow:inset 0 0 28px rgba(0,116,255,0.08), 0 0 18px rgba(0,84,178,0.12); }
        .ler-kpi::before { content:''; position:absolute; inset:0; background:linear-gradient(120deg, rgba(0,174,255,0.12), transparent 38%); opacity:0.55; pointer-events:none; }
        .ler-kpi:nth-child(3)::before { background:linear-gradient(120deg, rgba(255,77,79,0.16), transparent 38%); }
        .ler-kpi-info { position:relative; z-index:1; display:flex; flex-direction:column; gap:8px; }
        .ler-kpi-label { color:#d8e7ff; font-size:15px; font-weight:600; }
        .ler-kpi-value { font-size:35px; line-height:1; font-weight:800; color:#22bfff; display:flex; align-items:flex-end; gap:5px; text-shadow:0 0 14px rgba(0,180,255,0.35); }
        .ler-kpi-unit { font-size:16px; line-height:1.15; font-weight:600; color:#24c7ff; margin-left:2px; }
        .ler-kpi-trend { color:#ffae25; font-size:22px; line-height:1; padding-bottom:2px; }
        .ler-kpi:nth-child(1) .ler-kpi-value { color:#ff9d27; }
        .ler-kpi:nth-child(2) .ler-kpi-value { color:#ff9d27; }
        .ler-kpi:nth-child(3) .ler-kpi-value { color:#ff4d4f; }
        .ler-kpi-icon-wrap { position:relative; z-index:1; width:62px; height:62px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:radial-gradient(circle, rgba(16,153,255,0.32), rgba(0,74,165,0.08) 62%, transparent 68%); }
        .ler-kpi:nth-child(3) .ler-kpi-icon-wrap { background:rgba(255,77,79,0.12); }
        .ler-kpi-icon-wrap svg { width:34px; height:34px; color:#2aa5ff; filter:drop-shadow(0 0 8px rgba(0,166,255,0.58)); }
        .ler-kpi:nth-child(3) .ler-kpi-icon-wrap svg { color:#ff4d4f; }
        .ler-dashboard { height:calc(100% - 137px); min-height:0; display:grid; grid-template-columns:minmax(300px, 26fr) minmax(460px, 40.5fr) minmax(340px, 32.5fr); grid-template-rows:43fr 11fr 46fr; gap:12px; }
        .ler-dashboard > .ler-panel:nth-child(1) { grid-column:1; grid-row:1 / span 2; }
        .ler-dashboard > .ler-panel:nth-child(2) { grid-column:2; grid-row:1 / span 2; }
        .ler-dashboard > .ler-panel:nth-child(3) { grid-column:3; grid-row:1; }
        .ler-dashboard > .ler-panel:nth-child(4) { grid-column:1; grid-row:3; }
        .ler-dashboard > .ler-panel:nth-child(5) { grid-column:2; grid-row:3; }
        .ler-dashboard > .ler-panel:nth-child(6) { grid-column:3; grid-row:2 / span 2; }
        .ler-panel { min-width:0; min-height:0; background:linear-gradient(135deg, rgba(8,38,75,0.88) 0%, rgba(5,22,48,0.95) 100%); border:1px solid rgba(0,136,255,0.62); border-radius:5px; padding:12px 14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:inset 0 0 30px rgba(0,123,255,0.08), 0 0 20px rgba(0,75,160,0.12); }
        .ler-panel-header { flex:0 0 auto; min-height:29px; display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid rgba(0,133,255,0.25); }
        .ler-panel-title { font-size:16px; line-height:1; font-weight:700; color:#fff; display:flex; align-items:center; gap:7px; }
        .ler-panel-title::before { content:''; display:inline-block; width:3px; height:16px; background:#18a9ff; border-radius:1px; box-shadow:0 0 8px rgba(24,169,255,0.65); opacity:0.95; }
        .ler-license-row { display:grid; grid-template-columns:minmax(104px, 1fr) 64px 64px 64px; align-items:center; padding:6px 4px; border-radius:4px; font-size:13px; }
        .ler-license-row:nth-child(even) { background:rgba(255,255,255,0.02); }
        .ler-license-head { color:#a8bfdc; font-size:12px; padding-bottom:6px; border-bottom:1px solid rgba(42,82,130,0.2); margin-bottom:4px; }
        .ler-license-type { display:flex; align-items:center; gap:6px; color:#cbd5e1; }
        .ler-license-highlight { color:#ff9d27; font-weight:600; }
        .ler-license-bar-bg { height:5px; background:rgba(255,255,255,0.06); border-radius:2px; overflow:hidden; margin:0 4px 3px 4px; grid-column:1 / -1; }
        .ler-license-bar-fill { height:100%; border-radius:2px; background:#2b7de9; }
        .ler-license-bar-fill.hl { background:#ff9d27; }
        .ler-num { text-align:center; font-weight:500; }
        .ler-num-up { color:#ff9d27; }
        .ler-num-exp { color:#ff4d4f; }
        .ler-num-total { color:#fff; font-weight:600; }
        .ler-license-foot { margin-top:auto; padding-top:8px; color:#a1b4d1; font-size:13px; text-align:center; }
        .ler-map-wrap { position:relative; flex:1; min-height:0; background:radial-gradient(circle at 52% 45%, rgba(0,109,255,0.18), transparent 58%); }
        .ler-map-svg { width:100%; height:100%; }
        .ler-map-svg svg { width:100%; height:100%; filter:drop-shadow(0 0 13px rgba(0,144,255,0.52)); }
        .ler-map-marker { position:absolute; transform:translate(-50%,-50%); display:flex; flex-direction:column-reverse; align-items:center; gap:3px; cursor:default; background:transparent !important; border:0 !important; box-shadow:none !important; }
        .ler-map-marker-dot { width:31px; height:31px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; color:#fff; border:1px solid rgba(255,255,255,0.36); box-shadow:0 0 0 4px rgba(0,126,255,0.18), 0 0 18px currentColor; }
        .ler-map-marker-name { font-size:13px; color:#dbeafe; white-space:nowrap; text-shadow:0 1px 4px rgba(0,0,0,0.9); }
        .ler-map-legend { position:absolute; bottom:12px; left:12px; background:rgba(6,16,32,0.72); border:0; border-radius:4px; padding:8px 10px; display:flex; flex-direction:column; gap:6px; font-size:12px; }
        .ler-map-legend-item { display:flex; align-items:center; gap:7px; color:#d0def3; }
        .ler-map-legend-dot { width:11px; height:11px; border-radius:50%; }
        .ler-map-controls { position:absolute; bottom:16px; right:14px; display:flex; flex-direction:column; gap:0; border:1px solid rgba(170,198,231,0.34); background:rgba(7,17,32,0.68); }
        .ler-map-btn { width:28px; height:30px; background:rgba(8,14,26,0.65); border:0; border-bottom:1px solid rgba(170,198,231,0.22); border-radius:0; color:#e8f3ff; font-size:18px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
        .ler-map-btn:last-child { border-bottom:0; font-size:14px; }
        .ler-rank-row { display:grid; grid-template-columns:30px minmax(0, 1fr) 38px 52px 52px; align-items:center; gap:6px; padding:3px 2px; border-radius:4px; font-size:12px; }
        .ler-rank-row:nth-child(even) { background:rgba(255,255,255,0.02); }
        .ler-rank-head { color:#a8bfdc; font-size:11px; padding-bottom:4px; border-bottom:1px solid rgba(42,82,130,0.2); margin-bottom:2px; }
        .ler-rank-num { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:#fff; margin:0 auto; border:1px solid rgba(255,255,255,0.45); box-shadow:0 0 10px rgba(0,0,0,0.4); }
        .ler-rank-num.gold { background:#ffaf19; box-shadow:0 0 12px rgba(255,175,25,0.55); }
        .ler-rank-num.silver { background:#94a3b8; }
        .ler-rank-num.bronze { background:#cd7f32; }
        .ler-rank-num.other { background:rgba(42,82,130,0.4); color:#94a3b8; }
        .ler-rank-name { color:#cbd5e1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .ler-rank-total { text-align:center; font-size:15px; font-weight:800; color:#fff; }
        .ler-rank-up, .ler-rank-exp { text-align:center; padding:2px 0; border-radius:4px; font-size:12px; font-weight:700; }
        .ler-rank-up { color:#ffd58a; background:linear-gradient(180deg, rgba(255,157,39,0.42), rgba(150,76,0,0.45)); border:1px solid rgba(255,157,39,0.65); }
        .ler-rank-exp { color:#ffd2d2; background:linear-gradient(180deg, rgba(255,77,79,0.34), rgba(116,18,22,0.52)); border:1px solid rgba(255,77,79,0.58); }
        .ler-rank-bar-bg { grid-column:2 / 3; grid-row:2; height:4px; background:rgba(255,255,255,0.14); border-radius:2px; overflow:hidden; margin-top:-1px; }
        .ler-rank-bar-fill { height:100%; background:#ff3d3f; border-radius:2px; box-shadow:0 0 8px rgba(255,61,63,0.5); }
        .ler-trend-legend { display:flex; gap:24px; margin-bottom:6px; padding-left:28px; font-size:12px; }
        .ler-trend-legend span { display:flex; align-items:center; gap:4px; color:#94a3b8; }
        .ler-trend-legend i { display:inline-block; width:10px; height:3px; border-radius:2px; }
        .ler-trend-legend i.line { height:2px; width:14px; }
        .ler-trend-chart { flex:1; min-height:0; position:relative; padding:6px 6px 18px 30px; }
        .ler-trend-plot { position:absolute; left:30px; top:6px; width:calc(100% - 36px); height:calc(100% - 24px); }
        .ler-trend-axis-y { position:absolute; top:6px; bottom:18px; left:0; width:26px; display:flex; flex-direction:column-reverse; justify-content:space-between; color:#7f95b5; font-size:12px; text-align:right; }
        .ler-trend-axis-x { position:absolute; left:30px; right:6px; bottom:0; display:flex; justify-content:space-between; color:#8ea3c1; font-size:12px; }
        .ler-analysis-inner { flex:1; min-height:0; display:grid; grid-template-columns:1fr 1fr 1.15fr; gap:14px; align-items:center; }
        .ler-donut-wrap { display:flex; flex-direction:column; align-items:center; }
        .ler-donut-center { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; }
        .ler-donut-center b { font-size:18px; font-weight:700; color:#fff; display:block; }
        .ler-donut-center span { font-size:10px; color:#8ba3c7; }
        .ler-mini-legend { display:flex; flex-direction:column; gap:3px; margin-top:6px; font-size:11px; }
        .ler-mini-legend span { display:flex; align-items:center; gap:4px; color:#94a3b8; }
        .ler-mini-legend i { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
        .ler-pos-bar-row { display:flex; align-items:center; gap:8px; padding:6px 0; font-size:12px; }
        .ler-pos-bar-label { color:#d6e4f8; width:92px; text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ler-pos-bar-track { flex:1; height:12px; background:rgba(255,255,255,0.06); border-radius:0; overflow:hidden; }
        .ler-pos-bar-fill { height:100%; background:linear-gradient(90deg, #006dff, #12b8ff); border-radius:0; box-shadow:0 0 10px rgba(18,184,255,0.45); }
        .ler-pos-bar-val { color:#fff; width:24px; text-align:right; font-weight:700; }
        .ler-urgent-card { display:flex; align-items:center; gap:12px; min-height:47px; padding:7px 14px; border-radius:4px; margin-bottom:7px; font-size:13px; }
        .ler-urgent-card:last-child { margin-bottom:0; }
        .ler-urgent-card.red { background:linear-gradient(90deg, rgba(255,77,79,0.22), rgba(70,19,27,0.58)); border:1px solid rgba(255,77,79,0.62); box-shadow:inset 0 0 20px rgba(255,77,79,0.1); }
        .ler-urgent-card.orange { background:linear-gradient(90deg, rgba(255,157,39,0.17), rgba(69,42,8,0.62)); border:1px solid rgba(255,157,39,0.58); box-shadow:inset 0 0 20px rgba(255,157,39,0.08); }
        .ler-urgent-icon { width:37px; height:37px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .ler-urgent-icon svg { width:24px; height:24px; }
        .ler-urgent-card.red .ler-urgent-icon { background:rgba(255,77,79,0.17); color:#ff574f; border-radius:8px; }
        .ler-urgent-card.orange .ler-urgent-icon { background:rgba(255,157,39,0.12); color:#ffb12a; border:3px solid currentColor; }
        .ler-urgent-info { flex:1; min-width:0; }
        .ler-urgent-company { color:#fff; font-weight:700; margin-bottom:3px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .ler-urgent-license { color:#c6d6ee; font-size:12px; }
        .ler-urgent-badge { padding:3px 9px; border-radius:3px; font-size:12px; font-weight:700; flex-shrink:0; }
        .ler-urgent-card.red .ler-urgent-badge { background:rgba(255,77,79,0.2); color:#ff4d4f; }
        .ler-urgent-card.orange .ler-urgent-badge { background:rgba(255,157,39,0.2); color:#ff9d27; }
        .ler-urgent-days { width:66px; text-align:right; font-size:30px; line-height:1; font-weight:800; flex-shrink:0; }
        .ler-urgent-card.red .ler-urgent-days { color:#ff4d4f; }
        .ler-urgent-card.orange .ler-urgent-days { color:#ff9d27; }
        .ler-urgent-days small { font-size:14px; font-weight:700; color:currentColor; margin-left:3px; }
        @media (max-width: 1400px) {
          .ler-kpi { padding:11px 14px 11px 18px; }
          .ler-kpi-label { font-size:13px; }
          .ler-kpi-value { font-size:32px; }
          .ler-kpi-unit { font-size:14px; }
          .ler-kpi-icon-wrap { width:50px; height:50px; }
          .ler-kpi-icon-wrap svg { width:29px; height:29px; }
          .ler-panel { padding:9px 10px; }
          .ler-panel-header { min-height:25px; margin-bottom:6px; padding-bottom:5px; }
          .ler-panel-title { font-size:15px; }
          .ler-license-row { grid-template-columns:minmax(92px, 1fr) 50px 50px 54px; padding:4px 4px; font-size:12px; }
          .ler-license-head { font-size:11px; }
          .ler-license-foot { display:none; }
          .ler-rank-row { grid-template-columns:26px minmax(0, 1fr) 32px 45px 45px; gap:4px; padding:2px 1px; font-size:11px; }
          .ler-rank-head { font-size:10px; }
          .ler-rank-num { width:20px; height:20px; font-size:11px; }
          .ler-rank-total { font-size:13px; }
          .ler-rank-up, .ler-rank-exp { font-size:11px; padding:1px 0; }
          .ler-trend-legend { gap:12px; padding-left:22px; font-size:11px; }
          .ler-trend-chart { padding:4px 4px 14px 24px; }
          .ler-trend-plot { left:24px; top:4px; width:calc(100% - 28px); height:calc(100% - 18px); }
          .ler-trend-axis-y { top:4px; bottom:14px; width:20px; font-size:11px; }
          .ler-trend-axis-x { left:24px; right:4px; font-size:10px; }
          .ler-trend-axis-x span:nth-child(even) { display:none; }
          .ler-analysis-inner { gap:8px; }
          .ler-mini-legend { font-size:10px; }
          .ler-pos-bar-row { gap:5px; padding:4px 0; font-size:11px; }
          .ler-pos-bar-label { width:78px; }
          .ler-urgent-card { min-height:45px; padding:6px 12px; margin-bottom:6px; }
          .ler-urgent-icon { width:34px; height:34px; }
          .ler-urgent-icon svg { width:21px; height:21px; }
          .ler-urgent-days { width:56px; font-size:27px; }
          .ler-urgent-days small { font-size:12px; }
        }
        @media (max-width: 1200px) {
          .ler-screen { height:auto; min-height:100vh; overflow:auto; }
          .ler-kpis { height:auto; grid-template-columns:repeat(3, minmax(0, 1fr)); }
          .ler-kpi { min-height:88px; }
          .ler-dashboard { height:auto; min-height:0; grid-template-columns:1fr; grid-template-rows:none; }
          .ler-dashboard > .ler-panel { grid-column:auto !important; grid-row:auto !important; min-height:280px; }
        }
      `}</style>

      {/* 椤堕儴鏍囬鏍?*/}
      <header className="ler-topline">
        <div className="ler-topline-title">证照到期提醒</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a className="ler-exit" href={routeHref('shuan-home-command-v3')}>
            <LogOut size={14} />
            <span>退出</span>
          </a>
        </div>
      </header>

      {/* KPI卡片 */}
      <section className="ler-kpis">
        {data.kpis.map((kpi) => {
          const IconComp =
            kpi.iconType === 'shield'
              ? ShieldAlert
              : kpi.iconType === 'clock'
                ? Clock
                : kpi.iconType === 'alert'
                  ? AlertTriangle
                  : kpi.iconType === 'building'
                    ? Building2
                    : kpi.iconType === 'user'
                      ? Users
                      : null;
          return (
            <article key={kpi.label} className="ler-kpi">
              <div className="ler-kpi-info">
                <span className="ler-kpi-label">{kpi.label}</span>
                <span className="ler-kpi-value">
                  {kpi.value}
                  {kpi.unit && <span className="ler-kpi-unit">{kpi.unit}</span>}
                  {kpi.trend && <span className="ler-kpi-trend">→</span>}
                </span>
              </div>
              <div className="ler-kpi-icon-wrap">
                {kpi.iconType === 'gauge' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: '#2b7de9' }}>
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 12l4-4" />
                    <path d="M12 2v10" />
                  </svg>
                ) : IconComp ? (
                  <IconComp size={22} />
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      {/* 涓棿琛?*/}
      <section className="ler-dashboard">
        {/* 左：企业证照预警分析 */}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">企业证照预警分析</div>
          </header>
          <div className="ler-license-row ler-license-head">
            <span>证照类型</span>
            <span style={{ textAlign: 'center' }}>即将到期</span>
            <span style={{ textAlign: 'center' }}>宸茶繃鏈?</span>
            <span style={{ textAlign: 'center' }}>预警总数</span>
          </div>
          {data.licenseTypes.map((row) => (
            <div key={row.type}>
              <div className="ler-license-row">
                <span className={`ler-license-type ${row.highlight ? 'ler-license-highlight' : ''}`}>{row.type}</span>
                <span className="ler-num ler-num-up">{row.upcoming}</span>
                <span className="ler-num ler-num-exp">{row.expired}</span>
                <span className="ler-num ler-num-total">{row.total}</span>
              </div>
              <div className="ler-license-bar-bg">
                <div
                  className={`ler-license-bar-fill ${row.highlight ? 'hl' : ''}`}
                  style={{ width: `${(row.total / maxLicenseTotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="ler-license-foot">鍏?6 绫昏瘉鐓?</div>
        </section>

        {/* 中：涉及煤矿分布 */}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">涉及煤矿分布</div>
          </header>
          <div className="ler-map-wrap">
            <div className="ler-map-svg" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
            {data.cityMarkers.map((city) =>
              city.value > 0 ? (
                <div key={city.name} className="ler-map-marker" style={{ left: `${city.x}%`, top: `${city.y}%` }}>
                  <div className="ler-map-marker-dot" style={{ background: markerColor(city.value) }}>
                    {city.value}
                  </div>
                  <span className="ler-map-marker-name">{city.name}</span>
                </div>
              ) : null
            )}
            <div className="ler-map-legend">
              <div className="ler-map-legend-item">
                <span className="ler-map-legend-dot" style={{ background: '#ff4d4f' }} />
                鈮?10
              </div>
              <div className="ler-map-legend-item">
                <span className="ler-map-legend-dot" style={{ background: '#ff9d27' }} />
                5 - 9
              </div>
              <div className="ler-map-legend-item">
                <span className="ler-map-legend-dot" style={{ background: '#2b7de9' }} />
                1 - 4
              </div>
              <div className="ler-map-legend-item">
                <span className="ler-map-legend-dot" style={{ background: '#4a5568' }} />
                0
              </div>
            </div>
            <div className="ler-map-controls">
              <button type="button" className="ler-map-btn">
                +
              </button>
              <button type="button" className="ler-map-btn">
                -
              </button>
              <button type="button" className="ler-map-btn">
                定位
              </button>
            </div>
          </div>
        </section>

        {/* 右：重点煤矿预警排行 TOP5 */}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">重点煤矿预警排行</div>
            <span style={{ color: '#64748b', fontSize: 11 }}>TOP5</span>
          </header>
          <div className="ler-rank-row ler-rank-head">
            <span style={{ textAlign: 'center' }}>排名</span>
            <span>煤矿名称</span>
            <span style={{ textAlign: 'center' }}>风险总数</span>
            <span style={{ textAlign: 'center' }}>即将到期</span>
            <span style={{ textAlign: 'center' }}>宸茶繃鏈?</span>
          </div>
          {data.mineRankings.map((mine) => (
            <div key={mine.rank}>
              <div className="ler-rank-row">
                <span
                  className={`ler-rank-num ${mine.rank === 1 ? 'gold' : mine.rank === 2 ? 'silver' : mine.rank === 3 ? 'bronze' : 'other'}`}
                >
                  {mine.rank}
                </span>
                <span className="ler-rank-name" title={mine.name}>
                  {mine.name}
                </span>
                <span className="ler-rank-total">{mine.total}</span>
                <span className="ler-rank-up">{mine.upcoming}</span>
                <span className="ler-rank-exp">{mine.expired}</span>
              </div>
              <div className="ler-rank-bar-bg">
                <div className="ler-rank-bar-fill" style={{ width: `${(mine.total / maxMineTotal) * 100}%` }} />
              </div>
            </div>
          ))}
        </section>
      {/* 搴曢儴琛?*/}
        {/* 宸︼細杩?0澶╁埌鏈熻秼鍔?*/}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">杩?0澶╁埌鏈熻秼鍔?</div>
          </header>
          <div className="ler-trend-legend">
            <span>
              <i className="line" style={{ background: '#ff9d27' }} />
              即将到期(30天内)
            </span>
            <span>
              <i className="line" style={{ background: '#ff4d4f' }} />
              宸茶繃鏈?
            </span>
          </div>
          <div className="ler-trend-chart">
            <div className="ler-trend-axis-y">
              {[0, 10, 20, 30, 40].map((tick) => <span key={tick}>{tick}</span>)}
            </div>
            <div className="ler-trend-axis-x">
              {data.trend.days.map((d) => <span key={d}>{d}</span>)}
            </div>
            <svg className="ler-trend-plot" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
              {/* 缃戞牸绾?*/}
              {[0, 10, 20, 30, 40].map((tick) => {
                const y = padT + plotH - (tick / trendMax) * plotH;
                return (
                  <g key={tick}>
                    <line x1={padL} x2={chartW - padR} y1={y} y2={y} stroke="rgba(42,82,130,0.32)" strokeWidth="0.3" />
                  </g>
                );
              })}
              {/* 鏌辩姸鍥?- 宸茶繃鏈?*/}
              {data.trend.expired.map((v, i) => {
                const x = padL + (i / (data.trend.days.length - 1)) * plotW - barWidth / 2;
                const h = (v / trendMax) * plotH;
                const y = padT + plotH - h;
                return <rect key={`bar-${i}`} x={x} y={y} width={barWidth} height={h} fill="#ff4d4f" rx="0.5" opacity="0.85" />;
              })}
              {/* 鎶樼嚎鍥?- 即将到期 */}
              <polyline points={linePoints(data.trend.upcoming)} fill="none" stroke="#ff9d27" strokeWidth="0.8" />
              {data.trend.upcoming.map((v, i) => {
                const x = padL + (i / (data.trend.days.length - 1)) * plotW;
                const y = padT + plotH - (v / trendMax) * plotH;
                return <circle key={`pt-${i}`} cx={x} cy={y} r="1.2" fill="#ff9d27" />;
              })}
            </svg>
          </div>
        </section>

        {/* 中：证照异常综合分析 */}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">证照异常综合分析</div>
          </header>
          <div className="ler-analysis-inner">
            {/* 左：证照异常结构 */}
            <div className="ler-donut-wrap">
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  {abnormalDonut.map((s, i) => (
                    <path key={i} d={s.d} fill={s.color} />
                  ))}
                </svg>
                <div className="ler-donut-center">
                  <b>58</b>
                  <span>总数</span>
                </div>
              </div>
              <div className="ler-mini-legend">
                {data.abnormalStructure.map((s) => (
                  <span key={s.label}>
                    <i style={{ background: s.color }} />
                    {s.label} {s.value} ({s.percent})
                  </span>
                ))}
              </div>
            </div>

            {/* 中：预警分类占比 */}
            <div className="ler-donut-wrap">
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  {warningDonut.map((s, i) => (
                    <path key={i} d={s.d} fill={s.color} />
                  ))}
                </svg>
                <div className="ler-donut-center">
                  <b>118</b>
                  <span>预警总数</span>
                </div>
              </div>
              <div className="ler-mini-legend">
                {data.warningCategories.map((s) => (
                  <span key={s.label}>
                    <i style={{ background: s.color }} />
                    {s.label} {s.value} ({s.percent})
                  </span>
                ))}
              </div>
            </div>

            {/* 右：重点岗位证照异常TOP5 */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 8, textAlign: 'center' }}>
                重点岗位证照异常TOP5
              </div>
              {data.positionAbnormal.map((pos) => (
                <div key={pos.label} className="ler-pos-bar-row">
                  <span className="ler-pos-bar-label">{pos.label}</span>
                  <div className="ler-pos-bar-track">
                    <div className="ler-pos-bar-fill" style={{ width: `${(pos.value / maxPos) * 100}%` }} />
                  </div>
                  <span className="ler-pos-bar-val">{pos.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 鍙筹細绱ф€ヨ瘉鐓ф彁閱?*/}
        <section className="ler-panel">
          <header className="ler-panel-header">
            <div className="ler-panel-title">
              <AlertTriangle size={14} style={{ color: '#ff4d4f' }} />
              绱ф€ヨ瘉鐓ф彁閱?
            </div>
          </header>
          {data.urgentReminders.map((item, idx) => (
            <div key={idx} className={`ler-urgent-card ${item.status === 'expired' ? 'red' : 'orange'}`}>
              <div className="ler-urgent-icon">{item.status === 'expired' ? <AlertTriangle size={16} /> : <Clock size={16} />}</div>
              <div className="ler-urgent-info">
                <div className="ler-urgent-company">{item.company}</div>
                <div className="ler-urgent-license">{item.licenseType}</div>
              </div>
              <span className="ler-urgent-badge">{item.status === 'expired' ? '宸茶繃鏈?' : '即将到期'}</span>
              <span className="ler-urgent-days">
                {item.days < 0 ? item.days : `+${item.days}`}
                <small>处</small>
              </span>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

function RiskControlPage() {
  const data = shuanRiskControlDashboardData;
  const typeMax = Math.max(...data.typeDistribution.map((item) => item.value));
  const topValueMax = Math.max(...data.top5Mines.map((item) => item.value));
  const riskTrendMax = Math.max(...data.riskTrendSeries.flatMap((item) => item.values));
  const levelTrendMax = Math.max(...data.levelTrendBars.flatMap((item) => [item.up, item.down]));
  const heatTrendMax = Math.max(...data.regionHeatSeries.flatMap((item) => item.values));
  const riskTrendTicks = [1500, 1200, 900, 600, 300, 0];
  const heatTrendTicks = [100, 80, 60, 40, 20, 0];

  const linePoints = (values: number[], max: number) => values.map((value, index) => {
    const x = 6 + (index / Math.max(values.length - 1, 1)) * 88;
    const y = 90 - (value / max) * 64;
    return { x, y };
  });

  const linePath = (values: number[], max: number) => linePoints(values, max).map((point) => `${point.x},${point.y}`).join(' ');
  const levelToneClass = (tone: DrilldownTone) => `tone-${tone}`;

  return (
    <div className="drill-page drill-risk-control-page drill-risk-screen drill-risk-v2 tone-cyan">
      <header className="drill-risk-topline">
        <nav aria-label="页面标题">
          <span className="active">风险分级管控</span>
        </nav>
        <div>
          <a className="drill-risk-exit" href={routeHref('shuan-home-command-v3')}>
            <LogOut aria-hidden="true" />
            <span>退出</span>
          </a>
        </div>
      </header>

      <section className="drill-risk-v2-kpis" aria-label="风险核心指标区">
        {data.kpis.map((item) => (
          <article key={item.label} className={levelToneClass(item.tone)}>
            <span>{item.label}</span>
            <strong>{item.value}<em>{item.unit}</em></strong>
            <p>{item.deltaText} <b className={item.deltaDirection}>{item.deltaDirection === 'up' ? '↑' : '↓'} {item.deltaValue}</b></p>
          </article>
        ))}
      </section>

      <main className="drill-risk-v2-main">
        <aside className="drill-risk-v2-left">
          <section className="drill-risk-v2-panel">
            <div className="drill-risk-v2-inner">
              <div className="drill-risk-v2-subhead"><strong>风险等级分布</strong></div>
              <div className="drill-risk-v2-donut-block">
                <div className="drill-risk-v2-donut grade"><b>1,236</b><span>总数</span></div>
                <div className="drill-risk-v2-legend">
                  {data.gradeDistribution.map((item) => <span key={item.label} className={levelToneClass(item.tone)}><i />{item.label}<b>{item.value}</b><em>({item.percent})</em></span>)}
                </div>
              </div>
            </div>
          </section>

          <section className="drill-risk-v2-panel">
            <div className="drill-risk-v2-inner">
              <div className="drill-risk-v2-subhead"><strong>风险类型分布</strong></div>
              <div className="drill-risk-v2-bar-chart">
                {data.typeDistribution.map((item) => (
                  <div key={item.label}>
                    <em>{item.value}</em>
                    <i><b style={{ height: `${(item.value / typeMax) * 100}%` }} /></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="drill-risk-v2-panel">
            <div className="drill-risk-v2-inner">
              <div className="drill-risk-v2-subhead"><strong>专业风险占比</strong></div>
              <div className="drill-risk-v2-donut-block compact">
                <div className="drill-risk-v2-donut professional"><b>1,236</b><span>总数</span></div>
                <div className="drill-risk-v2-legend">
                  {data.professionalShare.map((item) => <span key={item.label} className={levelToneClass(item.tone)}><i />{item.label}<b>{item.percent}</b><em>({item.value})</em></span>)}
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className="drill-risk-v2-center">
          <section className="drill-risk-v2-panel map-panel">
            <DashboardPanelHeader title="全省风险分布一张图" />
            <div className="drill-risk-v2-map-wrap">
              <div className="drill-risk-v2-map-filter">
                <button type="button" className="select">{data.mapFilters.city}<ChevronDown aria-hidden="true" /></button>
                <div className="search"><input value="" readOnly aria-label="搜索煤矿名称" placeholder={data.mapFilters.searchPlaceholder} /><Search aria-hidden="true" /></div>
                <div className="chips">{data.mapFilters.levels.map((item, index) => <button key={item} type="button" className={`chip-${index}`}>{item}{item !== '浣庨闄?' ? <span>脳</span> : null}</button>)}</div>
                <button type="button" className="ghost">重置</button>
              </div>
              <div className="drill-risk-v2-map-stage">
                <div className="drill-risk-v2-map-svg" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
                {data.mapPoints.map((point) => <div key={`${point.name}-${point.x}-${point.y}`} className={`drill-risk-v2-map-point ${levelToneClass(point.tone)} ${point.size}`} style={{ left: `${point.x}%`, top: `${point.y}%` }}><i /><span>{point.name}</span></div>)}
                <div className="drill-risk-v2-map-legend">
                  {data.mapLegend.map((item) => <span key={item.label} className={levelToneClass(item.tone)}><i />{item.label}</span>)}
                </div>
                <div className="drill-risk-v2-map-actions"><button type="button">图例</button><button type="button">全屏</button></div>
              </div>
            </div>
          </section>
        </section>

        <aside className="drill-risk-v2-right">
          <section className="drill-risk-v2-panel">
            <DashboardPanelHeader title="监管处置区" />
            <div className="drill-risk-v2-disposal-list">
              {data.disposalCards.map((item) => (
                <article key={item.title} className={levelToneClass(item.tone)}>
                  <div className="drill-risk-v2-disposal-icon">{item.tone === 'red' ? <ShieldAlert aria-hidden="true" /> : item.tone === 'amber' ? <TrendingUp aria-hidden="true" /> : item.title.includes('逾期') ? <Clock aria-hidden="true" /> : <ClipboardList aria-hidden="true" />}</div>
                  <div className="drill-risk-v2-disposal-title"><strong>{item.title}</strong><b>{item.value}<em>{item.unit}</em></b></div>
                  <div className="drill-risk-v2-disposal-stats">{item.stats.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}页</b></span>)}</div>
                  <ChevronRight aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="drill-risk-v2-panel">
            <div className="drill-risk-v2-subhead top5"><strong>重点风险煤矿 TOP5</strong></div>
            <div className="drill-risk-v2-top5-list">
              {data.top5Mines.map((item) => (
                <div key={`${item.rank}-${item.name}`}>
                  <b className={`rank-${item.rank}`}>{item.rank}</b>
                  <span>{item.name}</span>
                  <em className={levelToneClass(item.tone)}>{item.level}</em>
                  <strong>{item.value}</strong>
                  <i><u style={{ width: `${(item.value / topValueMax) * 100}%` }} /></i>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <section className="drill-risk-v2-bottom">
        <section className="drill-risk-v2-panel">

          <div className="drill-risk-v2-trend-card">
            <div className="drill-risk-v2-subhead"><strong>杩?0鏃ラ闄╁彉鍖栬秼鍔?</strong><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-risk-v2-trend-legend">{data.riskTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <div className="drill-risk-v2-chart-shell">
              <div className="drill-risk-v2-y-axis" aria-hidden="true">
                {riskTrendTicks.map((value) => <span key={value}>{value.toLocaleString()}</span>)}
              </div>
              <div className="drill-risk-v2-chart-main">
                <svg className="drill-risk-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {riskTrendTicks.map((value) => <line key={value} x1="8" x2="98" y1={90 - (value / riskTrendMax) * 64} y2={90 - (value / riskTrendMax) * 64} />)}
                  {data.riskTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, riskTrendMax)} stroke={item.color} />)}
                </svg>
                <div className="drill-risk-v2-axis-labels">{data.riskTrendDays.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="drill-risk-v2-panel">
          <div className="drill-risk-v2-trend-card">
            <div className="drill-risk-v2-subhead"><strong>椋庨櫓鍗囬檷绾ц秼鍔?</strong><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-risk-v2-trend-legend"><span><i style={{ background: '#ff545d' }} />升级数量</span><span><i style={{ background: '#58a7ff' }} />降级数量</span></div>
            <div className="drill-risk-v2-group-bars">
              {data.levelTrendBars.map((item) => (
                <div key={item.day}>
                  <div className="bars">
                    <i className="up" style={{ height: `${(item.up / levelTrendMax) * 100}%` }} />
                    <i className="down" style={{ height: `${(item.down / levelTrendMax) * 100}%` }} />
                  </div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="drill-risk-v2-panel">
          <div className="drill-risk-v2-trend-card">
            <div className="drill-risk-v2-subhead"><strong>区域风险热力趋势</strong><div className="drill-risk-v2-inline-controls"><button type="button">风险热力指数 <ChevronDown aria-hidden="true" /></button><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div></div>
            <div className="drill-risk-v2-heat-layout">
              <div className="drill-risk-v2-chart-shell heat">
                <div className="drill-risk-v2-y-axis" aria-hidden="true">
                  {heatTrendTicks.map((value) => <span key={value}>{value}</span>)}
                </div>
                <div className="drill-risk-v2-chart-main">
                  <svg className="drill-risk-v2-line-chart heat" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {heatTrendTicks.map((value) => <line key={value} x1="8" x2="98" y1={90 - (value / heatTrendMax) * 64} y2={90 - (value / heatTrendMax) * 64} />)}
                    {data.regionHeatSeries.map((item) => <polyline key={item.label} points={linePath(item.values, heatTrendMax)} stroke={item.color} />)}
                  </svg>
                  <div className="drill-risk-v2-axis-labels">{data.riskTrendDays.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </div>
              <div className="drill-risk-v2-heat-legend">{data.regionHeatSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}<b>{item.values[item.values.length - 1]}</b></span>)}</div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

function DashboardPanelHeader({ title }: { title: string }) {
  return (
    <header className="drill-risk-v2-header">
      <i aria-hidden="true" />
      <strong>{title}</strong>
    </header>
  );
}

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return <MoreHorizontalIcon {...props} />;
}

function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>;
}

function DangerousPanel({ title, aside, action, children }: { title: string; aside?: string; action?: string; children: React.ReactNode }) {
  return <section className="drill-dangerous-panel"><header><div><i /> <strong>{title}</strong>{aside ? <em>{aside}</em> : null}</div>{action ? <button type="button">{action}<ChevronRight aria-hidden="true" /></button> : null}</header>{children}</section>;
}

function DangerousTable({ head, rows, className = '' }: { head: React.ReactNode[]; rows: React.ReactNode[][]; className?: string }) {
  return <div className={`drill-dangerous-table ${className}`}>{[head, ...rows].map((row, index) => <div key={index} className={index === 0 ? 'head' : ''}>{row.map((cell, cellIndex) => <span key={`${index}-${cellIndex}`}>{cell}</span>)}</div>)}</div>;
}

function HiddenDangerManagementPage() {
  const data = shuanHiddenDangerData;
  const typeMax = Math.max(...data.typeDistribution.map((item) => item.value));
  const topValueMax = Math.max(...data.top5Mines.map((item) => item.value));
  const newTrendMax = 120;
  const overdueTrendMax = 320;
  const closureMax = 100;
  const closureBarMax = 40;
  const newTrendTicks = [120, 80, 40, 0];
  const closureTicks = [100, 50, 0];
  const overdueTicks = [300, 200, 100, 0];
  const toneClass = (tone: DrilldownTone) => `tone-${tone}`;
  const linePoints = (values: number[], max: number) => values.map((value, index) => {
    const x = 6 + (index / Math.max(values.length - 1, 1)) * 88;
    const y = 90 - (value / max) * 66;
    return { x, y };
  });
  const linePath = (values: number[], max: number) => linePoints(values, max).map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <div className="drill-page drill-hazard-page drill-hazard-screen drill-hazard-v2 tone-cyan">
      <header className="drill-hazard-topline">
        <nav aria-label="内容区路径">
          <span className="active">隐患闭环</span>
        </nav>
        <div>
          <a className="drill-hazard-exit" href={routeHref('shuan-home-command-v3')}>
            <LogOut aria-hidden="true" />
            <span>退出</span>
          </a>
        </div>
      </header>

      <section className="drill-hazard-v2-kpis" aria-label="隐患核心指标区">
        {data.kpis.map((item) => (
          <article key={item.label} className={toneClass(item.tone)}>
            <span>{item.label}</span>
            <strong>{item.value}<em>{item.unit}</em></strong>
            <p>{item.deltaText} <b className={item.deltaDirection}>{item.deltaDirection === 'up' ? '↑' : '↓'} {item.deltaValue}</b></p>
          </article>
        ))}
      </section>

      <main className="drill-hazard-v2-main">
        <aside className="drill-hazard-left">
          <section className="drill-hazard-v2-panel">
            <div className="drill-hazard-v2-inner">
              <div className="drill-hazard-v2-subhead"><strong>隐患等级分布</strong><button type="button">更多 <ChevronRight aria-hidden="true" /></button></div>
              <div className="drill-hazard-v2-donut-block">
                <div className="drill-hazard-v2-donut grade"><b>1,458</b><span>总数</span></div>
                <div className="drill-hazard-v2-legend">
                  {data.gradeDistribution.map((item) => <span key={item.label} className={toneClass(item.tone)}><i />{item.label}<b>{item.value}</b><em>({item.percent})</em></span>)}
                </div>
              </div>
            </div>
          </section>

          <section className="drill-hazard-v2-panel">
            <div className="drill-hazard-v2-inner">
              <div className="drill-hazard-v2-subhead"><strong>隐患类型分布</strong><em>单位：项</em></div>
              <div className="drill-hazard-v2-bar-chart">
                {data.typeDistribution.map((item) => (
                  <div key={item.label} className={toneClass(item.tone)}>
                    <em>{item.value}</em>
                    <i><b style={{ height: `${(item.value / typeMax) * 100}%` }} /></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="drill-hazard-v2-panel">
            <div className="drill-hazard-v2-inner">
              <div className="drill-hazard-v2-subhead"><strong>隐患来源分布</strong></div>
              <div className="drill-hazard-v2-donut-block compact">
                <div className="drill-hazard-v2-donut source"><b>1,458</b><span>总数</span></div>
                <div className="drill-hazard-v2-legend">
                  {data.sourceDistribution.map((item) => <span key={item.label} className={toneClass(item.tone)}><i />{item.label}<b>{item.value}</b><em>({item.percent})</em></span>)}
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className="drill-hazard-center">
          <section className="drill-hazard-v2-panel map-panel">
            <DashboardPanelHeader title="全省隐患分布一张图" />
            <div className="drill-hazard-v2-map-wrap">
              <div className="drill-hazard-v2-map-filter">
                <button type="button" className="select">{data.mapFilters.scope}<ChevronDown aria-hidden="true" /></button>
                <div className="search"><input value="" readOnly aria-label="搜索煤矿名称" placeholder={data.mapFilters.searchPlaceholder} /><Search aria-hidden="true" /></div>
                <div className="chips">{data.mapFilters.statuses.map((item, index) => <button key={item} type="button" className={`chip-${index}`}>{item}<span>脳</span></button>)}</div>
                <button type="button" className="ghost">重置</button>
              </div>
              <div className="drill-hazard-v2-map-stage">
                <div className="drill-hazard-v2-map-bg" aria-hidden="true" />
                <div className="drill-hazard-v2-map-svg" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
                {data.mapPoints.map((point) => (
                  <div key={`${point.name}-${point.x}-${point.y}`} className={`drill-hazard-v2-map-point ${toneClass(point.tone)} ${point.size}`} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                    <HazardMapMarkerIcon value={point.value} />
                    <span>{point.name}</span>
                  </div>
                ))}
                <div className="drill-hazard-v2-map-legend">
                  {data.mapLegend.map((item) => <span key={item.label} className={toneClass(item.tone)}><i />{item.label}</span>)}
                </div>
                <div className="drill-hazard-v2-map-actions"><button type="button">全屏</button></div>
              </div>
            </div>
          </section>
        </section>

        <aside className="drill-hazard-right">
          <section className="drill-hazard-v2-panel">
            <DashboardPanelHeader title="督办处置区" />
            <div className="drill-hazard-v2-disposal-list">
              {data.disposalCards.map((item) => (
                <article key={item.title} className={toneClass(item.tone)}>
                  <div className="drill-hazard-v2-generated-icon"><HazardGeneratedIcon kind={item.icon} /></div>
                  <div className="drill-hazard-v2-disposal-title"><strong>{item.title}</strong><b>{item.value}<em>{item.unit}</em></b></div>
                  <div className="drill-hazard-v2-disposal-stats">{item.stats.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}页</b></span>)}</div>
                  <ChevronRight aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="drill-hazard-v2-panel">
            <div className="drill-hazard-v2-subhead top5"><strong>重点逾期煤矿TOP5</strong><button type="button">更多 <ChevronRight aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-top5-list">
              {data.top5Mines.map((item) => (
                <div key={`${item.rank}-${item.name}`}>
                  <b className={`rank-${item.rank}`}>{item.rank}</b>
                  <span>{item.name}</span>
                  <em className={toneClass(item.tone)}>{item.level}</em>
                  <strong>{item.value}</strong>
                  <i><u style={{ width: `${(item.value / topValueMax) * 100}%` }} /></i>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <section className="drill-hazard-v2-bottom">
        <section className="drill-hazard-v2-panel">
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>杩?0鏃ラ殣鎮ｆ柊澧炶秼鍔?</strong><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend">{data.newTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <div className="drill-hazard-v2-chart-shell">
              <div className="drill-hazard-v2-y-axis" aria-hidden="true">
                {newTrendTicks.map((value) => <span key={value}>{value}</span>)}
              </div>
              <div className="drill-hazard-v2-chart-main">
                <svg className="drill-hazard-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {newTrendTicks.map((value) => <line key={value} x1="8" x2="98" y1={90 - (value / newTrendMax) * 66} y2={90 - (value / newTrendMax) * 66} />)}
                  {data.newTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, newTrendMax)} stroke={item.color} />)}
                </svg>
                <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="drill-hazard-v2-panel">
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>隐患整改闭环趋势</strong><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend"><span><i style={{ background: data.closureTrend.line.color }} />闂幆鐜?</span><span><i style={{ background: data.closureTrend.bars.color }} />环比提升</span></div>
            <div className="drill-hazard-v2-chart-shell">
              <div className="drill-hazard-v2-y-axis" aria-hidden="true">
                {closureTicks.map((value) => <span key={value}>{value}</span>)}
              </div>
              <div className="drill-hazard-v2-chart-main">
                <div className="drill-hazard-v2-combo-chart">
                  {data.closureTrend.bars.values.map((value, index) => (
                    <i key={`${data.trendDays[index]}-${value}`} className={value >= 0 ? 'plus' : 'minus'} style={{ height: `${(Math.abs(value) / closureBarMax) * 42}%` }} />
                  ))}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {closureTicks.map((value) => <line key={value} x1="8" x2="98" y1={90 - (value / closureMax) * 66} y2={90 - (value / closureMax) * 66} />)}
                    <polyline points={linePath(data.closureTrend.line.values, closureMax)} stroke={data.closureTrend.line.color} />
                  </svg>
                </div>
                <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="drill-hazard-v2-panel">
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>逾期隐患趋势</strong><button type="button">杩?0鏃?<ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend">{data.overdueTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <div className="drill-hazard-v2-chart-shell">
              <div className="drill-hazard-v2-y-axis" aria-hidden="true">
                {overdueTicks.map((value) => <span key={value}>{value}</span>)}
              </div>
              <div className="drill-hazard-v2-chart-main">
                <svg className="drill-hazard-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {overdueTicks.map((value) => <line key={value} x1="8" x2="98" y1={90 - (value / overdueTrendMax) * 66} y2={90 - (value / overdueTrendMax) * 66} />)}
                  {data.overdueTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, overdueTrendMax)} stroke={item.color} />)}
                </svg>
                <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

function HazardGeneratedIcon({ kind }: { kind: string }) {
  if (kind === 'clock') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle className="halo" cx="24" cy="24" r="18" />
        <path className="main" d="M24 8a16 16 0 1 1-11.3 4.7" />
        <path className="main" d="M24 14v11l8 5" />
        <path className="spark" d="M12 8l4 1.2M8 13l3.5 2.4" />
      </svg>
    );
  }
  if (kind === 'box') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path className="halo" d="M24 6l15 8v20l-15 8-15-8V14z" />
        <path className="main" d="M24 6l15 8-15 8L9 14zM24 22v20M15 18v10l5 3" />
        <path className="spark" d="M31 18v10l-5 3" />
      </svg>
    );
  }
  if (kind === 'clipboard') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect className="halo" x="11" y="10" width="26" height="30" rx="3" />
        <path className="main" d="M18 10h12l2 5H16zM17 23h14M17 30h14" />
        <path className="spark" d="M36 16h4v26H14" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path className="halo" d="M24 5l16 6v11c0 10-6.5 17-16 21C14.5 39 8 32 8 22V11z" />
      <path className="main" d="M24 13v15M24 34h.1" />
      <path className="spark" d="M16 14l8-3 8 3" />
    </svg>
  );
}

function HazardMapMarkerIcon({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 38 38" aria-hidden="true">
      <circle className="pulse" cx="19" cy="19" r="16" />
      <path className="pin" d="M19 5c6 0 10.5 4.2 10.5 10.1 0 7-7.1 14.7-10.5 17.9C15.6 29.8 8.5 22.1 8.5 15.1 8.5 9.2 13 5 19 5z" />
      <circle className="core" cx="19" cy="15.5" r="5.6" />
      <text x="19" y="18.6" textAnchor="middle">{value}</text>
    </svg>
  );
}

function HazardPanelTitle({ title, aside, action }: { title: string; aside?: string; action?: string }) {
  return (
    <header className="drill-hazard-panel-title">
      <div><i /> <strong>{title}</strong>{aside ? <em>{aside}</em> : null}</div>
      {action ? <button type="button">{action}<ChevronRight aria-hidden="true" /></button> : null}
    </header>
  );
}


function DailyRegulationAnalysisPage() {
  const [activeContextId, setActiveContextId] = useState(shuanDailyRegulationAnalysis.contexts[0].id);
  const activeContext = shuanDailyRegulationAnalysis.contexts.find((item) => item.id === activeContextId) || shuanDailyRegulationAnalysis.contexts[0];
  const maxSource = Math.max(...shuanDailyRegulationAnalysis.sources.map((item) => item.value));
  const iconMap = {
    alert: Bell,
    check: ClipboardList,
    todo: Download,
    gauge: Activity,
    mine: Factory,
    region: MapPinned,
    chip: Database,
    cloud: ShieldAlert,
    bell: Bell,
  } as const;

  return (
    <div className="drill-page drill-daily-analysis-page drill-reference-page tone-cyan">
      <DrillContentHeader
        title={activeContext.title}
        description={activeContext.description}
        actions={(
          <div className="drill-reference-header-actions">
            <a href={routeHref('shuan-home-command-v3')}>
              <ArrowLeft aria-hidden="true" />
              <span>退出</span>
            </a>
            <section className="drill-reference-toolbar drill-reference-toolbar-inline">
              <div className="drill-reference-time-filters">
                <button type="button" className="active">今日</button>
                <button type="button">杩?鏃?</button>
                <button type="button">杩?0鏃?</button>
              </div>
              <button type="button" className="drill-reference-select">市州 <ChevronDown aria-hidden="true" /></button>
              <button type="button" className="drill-reference-select">煤矿 <ChevronDown aria-hidden="true" /></button>
              <button type="button" className="drill-reference-refresh"><Activity aria-hidden="true" />刷新</button>
            </section>
          </div>
        )}
      />

      <section className="drill-reference-summary-tabs" aria-label="入口路径切换">
        {shuanDailyRegulationAnalysis.summaryTabs.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={[
              index === 0 ? 'active' : '',
              item.label === '红色' ? 'is-red' : '',
              item.label === '橙色' ? 'is-orange' : '',
              item.label === '黄色' ? 'is-yellow' : '',
              item.label === '蓝色' ? 'is-blue' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => setActiveContextId(shuanDailyRegulationAnalysis.contexts[index]?.id || 'all')}
          >
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </button>
        ))}
      </section>

      <section className="drill-reference-kpis" aria-label="当前预警指标卡">
        {shuanDailyRegulationAnalysis.kpis.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Bell;
          return (
            <article key={item.label} className={`drill-reference-kpi-card kpi-${item.icon}`}>
              <div className="drill-reference-kpi-copy">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>
                  <em>{item.hint}</em>
                  <b className={`delta ${item.deltaDirection}`}>{item.delta}</b>
                </p>
              </div>
              <div className={`drill-reference-kpi-icon icon-${item.icon}`}>
                {item.icon === 'gauge' ? <div className="drill-reference-gauge-ring"><i /></div> : <Icon aria-hidden="true" />}
              </div>
            </article>
          );
        })}
      </section>

      <section className="drill-reference-analytics">
        <article className="drill-analysis-card drill-source-card drill-reference-panel">
          <header>
            <strong>瀛愮郴缁熸潵婧愬垎甯?</strong>
            <button type="button" className="drill-panel-corner" aria-label="全屏查看"><Search aria-hidden="true" /></button>
          </header>
          <div className="drill-source-list">
            {shuanDailyRegulationAnalysis.sources.map((source) => (
              <div key={source.label} className="drill-source-row">
                <div className="drill-source-main">
                  <span>{source.label}</span>
                  <strong>{source.value} <small>({source.share})</small></strong>
                </div>
                <div className="drill-source-bar"><i style={{ width: `${(source.value / maxSource) * 100}%` }} /></div>
                <div className="drill-source-children">
                  {('children' in source && Array.isArray(source.children) ? source.children : []).map((child) => <span key={child.name}>{child.name}<b>{child.value}</b></span>)}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="drill-analysis-card drill-matrix-card drill-reference-panel">
          <header>
            <strong>等级 脳 处置交叉分析</strong>
            <button type="button" className="drill-panel-corner" aria-label="全屏查看"><Search aria-hidden="true" /></button>
          </header>
          <div className="drill-matrix-table">
            <div className="head"><span>等级</span><span>宸插缃?</span><span>寰呭缃?</span><span>合计</span><span>占比</span></div>
            {shuanDailyRegulationAnalysis.matrix.map((row) => (
              <div key={row.level}>
                <span><i className={`dot tone-${row.level}`} />{row.level}</span>
                <span>{row.closed}</span>
                <span className={row.pending > 0 ? 'is-accent' : ''}>{row.pending}</span>
                <span>{row.total}</span>
                <span>{row.share}</span>
              </div>
            ))}
          </div>
          <div className="drill-reference-stack-label">等级分布（共118条）</div>
          <div className="drill-level-stack" aria-label="等级分布">
            {shuanDailyRegulationAnalysis.matrix.slice(0, 4).map((row) => (
              <i key={row.level} className={`tone-${row.level}`} style={{ flexGrow: row.total }}><span>{row.level}{row.total}</span></i>
            ))}
          </div>
        </article>

        <article className="drill-analysis-card drill-region-card drill-reference-panel">
          <header>
            <strong>鍖哄煙涓庣叅鐭垮垎甯?</strong>
            <button type="button" className="drill-panel-corner" aria-label="全屏查看"><Search aria-hidden="true" /></button>
          </header>
          <div className="drill-reference-map-layout">
            <div className="drill-region-map">
              <div className="drill-region-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
              {shuanDailyRegulationAnalysis.regions.map((region) => (
                <span key={region.name} className={`drill-region-point tone-${'tone' in region ? region.tone : 'cyan'}`} style={{ left: `${region.x}%`, top: `${region.y}%` }}>
                  <b>{region.value}</b>
                  <em>{region.name}</em>
                </span>
              ))}
              <div className="drill-reference-map-tools">
                <button type="button">+</button>
                <button type="button">-</button>
                <button type="button">↑</button>
              </div>
              <div className="drill-reference-map-legend">
                <span className="tone-红色">红色 &gt; 5</span>
                <span className="tone-橙色">橙色 3-5</span>
                <span className="tone-黄色">黄色 1-3</span>
                <span className="tone-蓝色">蓝色 0</span>
              </div>
            </div>
            <div className="drill-reference-rank-card">
              <h3>预警数量TOP5（市州）</h3>
              <small>单位：条</small>
              <div className="drill-reference-rank-list">
                {shuanDailyRegulationAnalysis.rankings.map((region, index) => (
                  <span key={region.name}>
                    <em>{index + 1}</em>
                    <b>{region.name}</b>
                    <strong>{region.value}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="drill-reference-focus" aria-label="当前口径分析重点">
        <header>当前口径分析重点</header>
        <div className="drill-reference-focus-grid">
          {shuanDailyRegulationAnalysis.focusPoints.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Bell;
            return (
              <article key={item.label}>
                <span className="focus-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <small>{item.label}</small>
                  <strong>{item.text}</strong>
                </div>
                {item.value ? <b>{item.value}</b> : <p>{item.text.replace('寰呭缃?21 条，', '寰呭缃?21 条，')}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="drill-daily-detail-card drill-reference-panel drill-reference-table-card">
        <header>
          <strong>预警明细</strong>
        </header>
        <div className="drill-daily-table">
          <div className="head">
            <span>煤矿名称</span><span>市州</span><span>瀛愮郴缁?</span><span>预警类型</span><span>等级</span><span>鐘舵€?</span><span>发生时间</span><span>处置情况</span><span>操作</span>
          </div>
          {shuanDailyRegulationAnalysis.details.map((row) => (
            <div key={`${row.mine}-${row.time}`}>
              <span>{row.mine}</span>
              <span>{row.city}</span>
              <span>{row.source}</span>
              <span>{row.type}</span>
              <span><b className={`level-tag tone-${row.level}`}>{row.level}</b></span>
              <span><b className={`status-tag ${row.status === '宸插缃?' ? 'done' : 'pending'}`}>{row.status}</b></span>
              <span>{row.time}</span>
              <span>{row.disposal}</span>
              <span className="actions"><button type="button">查看</button></span>
            </div>
          ))}
        </div>
        <footer className="drill-reference-table-footer">
          <div className="drill-reference-table-total">鍏?{shuanDailyRegulationAnalysis.pagination.total} 条<span>姣忛〉鏄剧ず锛?</span><button type="button" className="drill-reference-page-size">{shuanDailyRegulationAnalysis.pagination.pageSize} <ChevronDown aria-hidden="true" /></button></div>
          <div className="drill-reference-pagination">
            <button type="button">鈥?</button>
            {shuanDailyRegulationAnalysis.pagination.pages.map((page) => <button key={page} type="button" className={page === shuanDailyRegulationAnalysis.pagination.current ? 'active' : ''}>{page}</button>)}
            <button type="button">鈥?</button>
            <button type="button">鈥?</button>
            <span>前往</span>
            <button type="button" className="jump">1</button>
            <span>页</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

type IllegalOverviewCategoryId = 'all' | 'gas' | 'wind' | 'personnel' | 'coal' | 'power' | 'other';
type IllegalOverviewSortMode = 'risk' | 'clue' | 'mine' | 'today';
type IllegalOverviewPriority = 'high' | 'medium' | 'low';

interface IllegalOverviewCategoryCard {
  id: IllegalOverviewCategoryId;
  label: string;
  title: string;
  total: number;
  mineHits: number;
  highRisk: number;
  todayNew: number;
  icon: typeof LayoutGrid;
  tone: 'cyan' | 'red' | 'blue' | 'amber' | 'green' | 'purple';
}

interface IllegalOverviewAlgorithmCard {
  id: string;
  title: string;
  categoryId: IllegalOverviewCategoryId;
  categoryLabel: string;
  clueCount: number;
  mineCount: number;
  focusLabel: '楂橀闄?' | '今日新增';
  focusValue: number;
  priority: IllegalOverviewPriority;
  pageId?: string;
}

interface IllegalOverviewMineRow {
  mine: string;
  categoryId: IllegalOverviewCategoryId;
  clueCount: number;
  algorithmCount: number;
  risk: '楂橀闄?' | '涓闄?' | '浣庨闄?';
}

interface IllegalOverviewPreviewRow {
  title: string;
  mine: string;
  categoryId: IllegalOverviewCategoryId;
  algorithm: string;
  time: string;
  risk: '楂橀闄?' | '涓闄?' | '浣庨闄?';
}

const illegalOverviewCategoryCards: IllegalOverviewCategoryCard[] = [
  { id: 'all', label: '全部', title: '全部', total: 1278, mineHits: 32, highRisk: 357, todayNew: 187, icon: LayoutGrid, tone: 'cyan' },
  { id: 'gas', label: '管住瓦斯', title: '管住瓦斯', total: 412, mineHits: 28, highRisk: 128, todayNew: 63, icon: Flame, tone: 'red' },
  { id: 'wind', label: '管住风', title: '管住风', total: 286, mineHits: 26, highRisk: 76, todayNew: 38, icon: Wind, tone: 'blue' },
  { id: 'personnel', label: '管住人', title: '管住人', total: 238, mineHits: 24, highRisk: 83, todayNew: 41, icon: UserRound, tone: 'purple' },
  { id: 'coal', label: '管住煤', title: '管住煤', total: 176, mineHits: 20, highRisk: 36, todayNew: 22, icon: Factory, tone: 'green' },
  { id: 'power', label: '管住电', title: '管住电', total: 166, mineHits: 22, highRisk: 34, todayNew: 23, icon: Zap, tone: 'amber' },
  { id: 'other', label: '其他', title: '其他', total: 72, mineHits: 12, highRisk: 12, todayNew: 8, icon: Database, tone: 'blue' },
];

const illegalOverviewCoreAlgorithms: IllegalOverviewAlgorithmCard[] = [
  { id: 'gas-output-mismatch', title: '瓦斯涌出量不匹配', categoryId: 'gas', categoryLabel: '管住瓦斯', clueCount: 185, mineCount: 22, focusLabel: '高风险', focusValue: 68, priority: 'high', pageId: 'shuan-home-command-v3-algorithm-gas-mismatch' },
  { id: 'overlimit-upload-missing', title: '超限报警未上传', categoryId: 'power', categoryLabel: '管住电', clueCount: 126, mineCount: 20, focusLabel: '高风险', focusValue: 52, priority: 'high' },
  { id: 'air-volume-change', title: '风量变化异常', categoryId: 'wind', categoryLabel: '管住风', clueCount: 92, mineCount: 19, focusLabel: '高风险', focusValue: 32, priority: 'medium' },
  { id: 'person-stay-abnormal', title: '人员停留异常', categoryId: 'personnel', categoryLabel: '管住人', clueCount: 76, mineCount: 16, focusLabel: '高风险', focusValue: 21, priority: 'medium' },
  { id: 'one-person-multi-card', title: '疑似一人多卡', categoryId: 'personnel', categoryLabel: '管住人', clueCount: 64, mineCount: 14, focusLabel: '高风险', focusValue: 18, priority: 'high' },
  { id: 'abnormal-disconnect', title: '异常断线', categoryId: 'power', categoryLabel: '管住电', clueCount: 51, mineCount: 13, focusLabel: '高风险', focusValue: 19, priority: 'medium' },
  { id: 'power-consumption-abnormal', title: '用电异常', categoryId: 'power', categoryLabel: '管住电', clueCount: 64, mineCount: 14, focusLabel: '今日新增', focusValue: 18, priority: 'medium' },
  { id: 'fan-delay-abnormal', title: '停风逻辑异常', categoryId: 'wind', categoryLabel: '管住风', clueCount: 48, mineCount: 11, focusLabel: '今日新增', focusValue: 12, priority: 'low' },
  { id: 'return-air-temperature', title: '回风温度异常', categoryId: 'wind', categoryLabel: '管住风', clueCount: 42, mineCount: 10, focusLabel: '今日新增', focusValue: 10, priority: 'low' },
  { id: 'air-door-missing', title: '风门联动缺失', categoryId: 'wind', categoryLabel: '管住风', clueCount: 41, mineCount: 9, focusLabel: '今日新增', focusValue: 8, priority: 'low' },
  { id: 'output-wave', title: '产量异常波动', categoryId: 'coal', categoryLabel: '管住煤', clueCount: 36, mineCount: 8, focusLabel: '今日新增', focusValue: 9, priority: 'low' },
  { id: 'pipe-pressure-abnormal', title: '管道压力异常', categoryId: 'gas', categoryLabel: '管住瓦斯', clueCount: 28, mineCount: 6, focusLabel: '今日新增', focusValue: 6, priority: 'low' },
];

const illegalOverviewGeneratedAlgorithms: IllegalOverviewAlgorithmCard[] = Array.from({ length: 40 }, (_, index) => {
  const category = illegalOverviewCategoryCards[(index % (illegalOverviewCategoryCards.length - 1)) + 1];
  const namesByCategory: Record<Exclude<IllegalOverviewCategoryId, 'all'>, string[]> = {
    gas: ['瓦斯恒值异常', '甲烷趋势漂移', '抽采负压波动', '传感器平直异常', '瓦斯曲线异常', '瓦斯超限迟报', '甲烷闭锁缺失'],
    wind: ['局扇启停冲突', '风流短时衰减', '风门状态缺失', '回风量突降', '风筒压差异常', '风机联锁脱节', '风流方向异常'],
    personnel: ['入井人数不匹配', '超时滞留异常', '夜间入井异常', '人员求救集中', '电子围栏越界', '入井报备缺失', '考勤定位冲突'],
    coal: ['夜间运输活跃', '煤流持续运行', '产量报送偏差', '皮带负荷背离', '装车节奏异常', '库存变化突增', '采面状态冲突'],
    power: ['重点回路抬升', '停送电记录冲突', '回路切换异常', '主扇负荷异常', '夜间电流抬升', '设备电压波动', '异常断电恢复'],
    other: ['视频离线频发', '数据上传延迟', '定位基站离线', '边缘网关异常', '采集链路断续', '预警推送失败', '台账回传滞后'],
  };
  const names = namesByCategory[category.id as Exclude<IllegalOverviewCategoryId, 'all'>];
  const title = names[Math.floor(index / 6) % names.length];
  const clueCount = 24 + ((index * 7) % 46);
  const mineCount = 5 + (index % 14);
  const focusLabel = index % 3 === 0 ? '高风险' : '今日新增';
  const focusValue = focusLabel === '高风险' ? 6 + (index % 18) : 2 + (index % 9);
  const priority: IllegalOverviewPriority = index % 5 === 0 ? 'high' : index % 2 === 0 ? 'medium' : 'low';
  return {
    id: `generated-${category.id}-${index + 1}`,
    title,
    categoryId: category.id,
    categoryLabel: category.label,
    clueCount,
    mineCount,
    focusLabel,
    focusValue,
    priority,
  };
});

const illegalOverviewAlgorithms: IllegalOverviewAlgorithmCard[] = [
  ...illegalOverviewCoreAlgorithms,
  ...illegalOverviewGeneratedAlgorithms,
];

const illegalOverviewMineRanking: IllegalOverviewMineRow[] = [
  { mine: '宜宾安平矿', categoryId: 'gas', clueCount: 276, algorithmCount: 12, risk: '高风险' },
  { mine: '达州兴隆矿', categoryId: 'gas', clueCount: 232, algorithmCount: 10, risk: '高风险' },
  { mine: '华阳二矿', categoryId: 'wind', clueCount: 189, algorithmCount: 9, risk: '高风险' },
  { mine: '乐山忠达矿', categoryId: 'personnel', clueCount: 143, algorithmCount: 8, risk: '中风险' },
  { mine: '广元青排矿', categoryId: 'other', clueCount: 118, algorithmCount: 7, risk: '中风险' },
  { mine: '新元煤矿', categoryId: 'coal', clueCount: 106, algorithmCount: 6, risk: '中风险' },
  { mine: '赵家沟煤矿', categoryId: 'power', clueCount: 95, algorithmCount: 6, risk: '中风险' },
  { mine: '小庄煤矿', categoryId: 'wind', clueCount: 81, algorithmCount: 5, risk: '低风险' },
];

const illegalOverviewPreviewRows: IllegalOverviewPreviewRow[] = [
  { title: '瓦斯涌出量不匹配', mine: '宜宾安平矿', categoryId: 'gas', algorithm: '瓦斯涌出量不匹配', time: '07-06 09:24', risk: '高风险' },
  { title: '超限报警未上传', mine: '达州兴隆矿', categoryId: 'power', algorithm: '超限报警未上传', time: '07-06 08:46', risk: '高风险' },
  { title: '风量变化异常', mine: '华阳二矿', categoryId: 'wind', algorithm: '风量变化异常', time: '07-06 08:15', risk: '中风险' },
  { title: '人员停留异常', mine: '乐山忠达矿', categoryId: 'personnel', algorithm: '人员停留异常', time: '07-06 07:58', risk: '中风险' },
  { title: '异常断线', mine: '广元青排矿', categoryId: 'other', algorithm: '异常断线', time: '07-06 07:31', risk: '低风险' },
];

const illegalOverviewSortOptions: Array<{ value: IllegalOverviewSortMode; label: string }> = [
  { value: 'risk', label: '高风险优先' },
  { value: 'clue', label: '线索数优先' },
  { value: 'mine', label: '命中矿井数优先' },
  { value: 'today', label: '今日新增优先' },
];

function IllegalCluePage() {
  const [activeCategoryId, setActiveCategoryId] = useState<IllegalOverviewCategoryId>('all');
  const [keyword, setKeyword] = useState('');
  const [sortMode, setSortMode] = useState<IllegalOverviewSortMode>('risk');
  const [onlyWithClues, setOnlyWithClues] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filteredAlgorithms = useMemo(() => {
    const normalizedKeyword = keyword.trim();
    const priorityWeight: Record<IllegalOverviewPriority, number> = { high: 3, medium: 2, low: 1 };
    const list = illegalOverviewAlgorithms.filter((item) => {
      if (activeCategoryId !== 'all' && item.categoryId !== activeCategoryId) return false;
      if (onlyWithClues && item.clueCount <= 0) return false;
      if (!normalizedKeyword) return true;
      return item.title.includes(normalizedKeyword);
    });
    list.sort((left, right) => {
      if (sortMode === 'clue') return right.clueCount - left.clueCount;
      if (sortMode === 'mine') return right.mineCount - left.mineCount;
      if (sortMode === 'today') {
        const rightToday = right.focusLabel === '今日新增' ? right.focusValue : Math.round(right.focusValue / 3);
        const leftToday = left.focusLabel === '今日新增' ? left.focusValue : Math.round(left.focusValue / 3);
        return rightToday - leftToday;
      }
      const priorityDiff = priorityWeight[right.priority] - priorityWeight[left.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return right.focusValue - left.focusValue;
    });
    return list;
  }, [activeCategoryId, keyword, onlyWithClues, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filteredAlgorithms.length / pageSize));
  const pagedAlgorithms = filteredAlgorithms.slice((page - 1) * pageSize, page * pageSize);
  const currentMineRows = activeCategoryId === 'all'
    ? illegalOverviewMineRanking
    : illegalOverviewMineRanking.filter((item) => item.categoryId === activeCategoryId);
  const currentPreviewRows = activeCategoryId === 'all'
    ? illegalOverviewPreviewRows
    : illegalOverviewPreviewRows.filter((item) => item.categoryId === activeCategoryId);

  const handleCategoryChange = (categoryId: IllegalOverviewCategoryId) => {
    setActiveCategoryId(categoryId);
    setPage(1);
  };

  return (
    <div className="drill-page tone-red drill-illegal-overview-page">
      <section className="illegal-overview-header">
        <div className="illegal-overview-title">
          <div className="illegal-overview-title__left">
            <h1>多源线索总览</h1>
            <p>鎸夊垎绫汇€佹潵婧愰〉闈㈠拰鐭夸簳闆嗕腑搴︽煡鐪嬬嚎绱㈠垎甯?</p>
          </div>
          <a className="illegal-overview-title__back" href={routeHref('shuan-home-command-v3')}>
            <LogOut aria-hidden="true" />
            <span>退出</span>
          </a>
        </div>
        <div className="illegal-overview-filters" aria-label="筛选条件">
          <label className="illegal-overview-filter wide">
            <span>时间范围</span>
            <button type="button">
              <em>2025-07-06 00:00:00</em>
              <i>~</i>
              <em>2025-07-06 23:59:59</em>
              <CalendarDays aria-hidden="true" />
            </button>
          </label>
          <label className="illegal-overview-filter">
            <span>所属区域</span>
            <button type="button">全部区域<ChevronDown aria-hidden="true" /></button>
          </label>
          <label className="illegal-overview-filter">
            <span>鎵€灞炵熆人</span>
            <button type="button">全部矿井<ChevronDown aria-hidden="true" /></button>
          </label>
          <label className="illegal-overview-filter">
            <span>鐘舵€?</span>
              <button type="button">全部状态<ChevronDown aria-hidden="true" /></button>
          </label>
          <button type="button" className="illegal-overview-refresh">
            <RefreshCcw aria-hidden="true" />
            <span>刷新</span>
          </button>
        </div>
      </section>

      <section className="illegal-overview-summary" aria-label="分类总览">
        {illegalOverviewCategoryCards.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`illegal-summary-card tone-${item.tone}${item.id === activeCategoryId ? ' active' : ''}`}
              onClick={() => handleCategoryChange(item.id)}
            >
              <div className="illegal-summary-head">
                <span className="illegal-summary-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <strong>{item.title}</strong>
                  <b>{item.total.toLocaleString()}</b>
                </div>
              </div>
              <div className="illegal-summary-metrics">
                <span><em>命中矿井</em><b>{item.mineHits}</b></span>
                <span><em>楂橀闄?</em><b>{item.highRisk}</b></span>
                <span><em>今日新增</em><b>{item.todayNew}</b></span>
              </div>
            </button>
          );
        })}
      </section>

      <section className="illegal-overview-main">
        <section className="illegal-overview-panel illegal-overview-algorithms">
          <header className="illegal-panel-head">
            <div className="illegal-panel-title">
              <h2>算法线索分布</h2>
              <span><i aria-hidden="true">i</i></span>
            </div>
            <div className="illegal-panel-pagination">
              <span>鍏?{filteredAlgorithms.length} 页</span>
              <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page <= 1}><ChevronLeft aria-hidden="true" /></button>
              <strong>{page}</strong>
              <em>/ {totalPages}</em>
              <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page >= totalPages}><ChevronRight aria-hidden="true" /></button>
            </div>
          </header>

          <div className="illegal-algorithm-tabs" aria-label="分类页签">
            {illegalOverviewCategoryCards.map((item) => (
              <button
                key={`tab-${item.id}`}
                type="button"
                className={item.id === activeCategoryId ? 'active' : ''}
                onClick={() => handleCategoryChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="illegal-algorithm-toolbar">
            <label className="illegal-search-field">
              <Search aria-hidden="true" />
              <input
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                  setPage(1);
                }}
                placeholder="搜索算法名称"
                aria-label="搜索算法名称"
              />
            </label>
            <label className="illegal-sort-field">
              <select
                value={sortMode}
                onChange={(event) => {
                  setSortMode(event.target.value as IllegalOverviewSortMode);
                  setPage(1);
                }}
                aria-label="排序方式"
              >
                {illegalOverviewSortOptions.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
            <button type="button" className={`illegal-toggle${onlyWithClues ? ' active' : ''}`} onClick={() => setOnlyWithClues((value) => !value)}>
              <span>鍙湅鏈夌嚎绱?</span>
              <i aria-hidden="true"><b /></i>
            </button>
          </div>

          <div className="illegal-algorithm-grid">
            {pagedAlgorithms.map((algorithm) => {
              const categoryCard = illegalOverviewCategoryCards.find((item) => item.id === algorithm.categoryId);
              const categoryTone = categoryCard?.tone || 'blue';
              const CategoryIcon = categoryCard?.icon || LayoutGrid;
              const action = algorithm.pageId
                ? <a href={routeHref(algorithm.pageId)} className="illegal-algorithm-action">查看</a>
                : <button type="button" className="illegal-algorithm-action">查看</button>;
              return (
                <article key={algorithm.id} className={`illegal-algorithm-card priority-${algorithm.priority}`}>
                  <header>
                    <div className="illegal-algorithm-title">
                      <span className={`illegal-algorithm-icon tone-${categoryTone}`}><CategoryIcon aria-hidden="true" /></span>
                      <div className="illegal-algorithm-copy">
                        <strong>{algorithm.title}</strong>
                        <span className={`tone-${categoryTone}`}>{algorithm.categoryLabel}</span>
                      </div>
                    </div>
                  </header>
                  <div className="illegal-algorithm-stats">
                    <span><em>线索数</em><b>{algorithm.clueCount}</b></span>
                    <span><em>命中矿井</em><b>{algorithm.mineCount}</b></span>
                    <span><em>{algorithm.focusLabel}</em><b>{algorithm.focusValue}</b></span>
                  </div>
                  {action}
                </article>
              );
            })}
          </div>
        </section>

        <aside className="illegal-overview-side">
          <section className="illegal-overview-panel illegal-side-panel">
            <header className="illegal-side-head">
              <h2>矿井线索集中排行</h2>
              <a href={routeHref('shuan-home-command-v3')}>查看更多<ChevronRight aria-hidden="true" /></a>
            </header>
            <div className="illegal-side-table ranking">
              <div className="illegal-side-row head">
                <span>排名</span>
                <span>矿井名称</span>
                <span>线索总数</span>
                <span>命中算法数</span>
                <span>风险等级</span>
              </div>
              {currentMineRows.map((row, index) => (
                <div key={`${row.mine}-${index}`} className="illegal-side-row">
                  <span><i className={`rank-badge rank-${index + 1}`}>{index + 1}</i></span>
                  <span>{row.mine}</span>
                  <span>{row.clueCount}</span>
                  <span>{row.algorithmCount}</span>
                  <span><em className={`risk-tag ${row.risk === '高风险' ? 'high' : row.risk === '中风险' ? 'medium' : 'low'}`}>{row.risk}</em></span>
                </div>
              ))}
            </div>
          </section>

          <section className="illegal-overview-panel illegal-side-panel">
            <header className="illegal-side-head">
              <h2>重点线索预览</h2>
              <a href={routeHref('shuan-home-command-v3')}>查看更多<ChevronRight aria-hidden="true" /></a>
            </header>
            <div className="illegal-side-table preview">
              <div className="illegal-side-row head preview">
                <span>线索标题</span>
                <span>矿井</span>
                <span>来源算法</span>
                <span>发现时间</span>
                <span>风险</span>
              </div>
              {currentPreviewRows.map((row) => (
                <div key={`${row.mine}-${row.title}-${row.time}`} className="illegal-side-row preview">
                  <span>{row.title}</span>
                  <span>{row.mine}</span>
                  <span>{row.algorithm}</span>
                  <span>{row.time}</span>
                  <span><em className={`risk-tag ${row.risk === '高风险' ? 'high' : row.risk === '中风险' ? 'medium' : 'low'}`}>{row.risk}</em></span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <footer className="illegal-overview-footer">
        <span>说明：统计数据每小时更新一次，趋势图基于近7鏃ユ暟鎹?</span>
        <span>数据更新时间锛?025-07-06 09:30:24</span>
      </footer>
    </div>
  );
}
function IllegalCampaignReferenceV2Page() {
  const moduleCards = [
    { title: '隐蔽工作面', subtitle: '停产疑似生产 / 隐蔽采掘风险', icon: MapPinned, route: 'shuan-home-command-v3-illegal-campaign-hidden-face' },
    { title: '监控造假', subtitle: '浼犳劅鍣ㄥ紓甯?/ 报警闭锁造假风险', icon: MonitorCog, route: 'shuan-home-command-v3-illegal-campaign-monitor-fake' },
    { title: '隐瞒入井人数', subtitle: '人员定位 / 瑙嗛浜烘暟涓嶅尮閰嶉闄?', icon: Users, route: 'shuan-home-command-v3-illegal-campaign-hidden-person' },
  ];
  const kpis = [
    { label: '疑似矿井数', value: '18', trend: '环比 +2', helper: '命中专项整治规则', icon: ShieldAlert, tone: 'warn' },
    { label: '高风险矿井数', value: '9', trend: '环比 +1', helper: '建议优先核查', icon: Siren, tone: 'danger' },
    { label: '鏀拺线索数', value: '76', trend: '环比 +12', helper: '多源线索汇聚', icon: GitBranch, tone: 'blue' },
    { label: '待核查任务数', value: '23', trend: '环比 +5', helper: '宸茬敓鎴愭牳鏌ュ缓璁?', icon: ClipboardList, tone: 'cyan' },
    { label: '閫炬湡浠诲姟鏁?', value: '3', trend: '环比 +1', helper: '需借力跟进', icon: Bell, tone: 'amber' },
  ];
  const mapCallouts = [
    { city: '宜宾市', total: '30矿', high: 4, mid: 6, low: 20, x: 7, y: 38, tone: 'mid' },
    { city: '泸州市', total: '13矿', high: 3, mid: 2, low: 8, x: 17, y: 74, tone: 'mid' },
    { city: '广元市', total: '11矿', high: 2, mid: 3, low: 6, x: 58, y: 17, tone: 'low' },
    { city: '乐山市', total: '15矿', high: 1, mid: 3, low: 11, x: 61, y: 74, tone: 'low' },
    { city: '达州市', total: '41矿', high: 6, mid: 8, low: 22, x: 74, y: 47, tone: 'high' },
  ];
  const clueStats = [
    { label: '停产期间疑似生产', value: 12, percent: '15.8%', color: '#ff4f61' },
    { label: '夜间异常活动', value: 9, percent: '11.8%', color: '#ffb243' },
    { label: '同一区域多类异常', value: 8, percent: '10.5%', color: '#fbd84b' },
    { label: '数据遮蔽风险', value: 6, percent: '7.9%', color: '#34d8ef' },
    { label: '历史问题复发', value: 5, percent: '6.6%', color: '#438dff' },
    { label: '其他线索', value: 36, percent: '47.4%', color: '#3d516c' },
  ];
  const donutStops = clueStats.reduce<{ current: number; stops: string[] }>((acc, item) => {
    const start = acc.current;
    const end = start + (item.value / 76) * 100;
    acc.stops.push(`${item.color} ${start}% ${end}%`);
    acc.current = end;
    return acc;
  }, { current: 0, stops: [] }).stops.join(', ');
  const trendPoints = {
    suspect: '0,73 16,48 33,51 50,22 66,20 83,39 100,38',
    high: '0,80 16,69 33,74 50,63 66,60 83,70 100,69',
    new: '0,92 16,84 33,91 50,82 66,82 83,86 100,84',
  };
  const topRows = [
    ['1', '达星XX煤矿', '达州市', '93', '高风险', '停产期间疑似生产、夜间异常活动', '2024-05-13 02:18', '查看'],
    ['2', '宜宾XX煤矿', '宜宾市', '86', '高风险', '数据遮蔽风险、同一区域多类异常', '2024-05-13 01:42', '查看'],
    ['3', '泸州XX煤矿', '泸州市', '78', '高风险', '夜间异常活动、隐瞒入井人数', '2024-05-12 23:57', '查看'],
    ['4', '乐山XX煤矿', '乐山市', '72', '高风险', '停产期间疑似生产', '2024-05-12 22:31', '查看'],
    ['5', '广元XX煤矿', '广元市', '65', '中风险', '同一区域多类异常、历史问题复发', '2024-05-12 21:05', '查看'],
  ];
  const taskRows = [
    ['停产期间疑似生产核查', '达星XX煤矿', '高风险', '2024-05-13 09:21', '去核查'],
    ['夜间异常活动核查', '宜宾XX煤矿', '高风险', '2024-05-13 08:47', '去核查'],
    ['数据遮蔽风险核查', '泸州XX煤矿', '高风险', '2024-05-13 08:12', '去核查'],
    ['隐瞒入井人数核查', '乐山XX煤矿', '中风险', '2024-05-13 07:36', '去核查'],
    ['同一区域多类异常核查', '广元XX煤矿', '中风险', '2024-05-13 07:05', '去核查'],
  ];
  const processSteps = ['线索发现', '任务派发', '现场核查', '结果认定', '问题处置', '闭环归档'];

  return (
    <div className="drill-page drill-campaign-v2-page">
      <section className="campaign-v2-head">
        <div className="campaign-v2-titleline">
          <div>
            <h1>隐蔽工作面专项整治</h1>
            <p>澶氭簮鏁版嵁鍏宠仈璇嗗埆闅愯斀閲囨帢娲诲姩锛屾瀯寤虹嚎绱㈤棴鐜不鐞嗛摼璺紝鎻愬崌鎵撻潪娌昏繚绮惧噯搴︺€?</p>
          </div>
          <a className="campaign-v2-exit" href={routeHref('shuan-home-command-v3')}>
            <LogOut aria-hidden="true" />
            <span>退出</span>
          </a>
        </div>
        <div className="campaign-v2-module-row">
          {moduleCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <a key={item.title} className={index === 0 ? 'active' : ''} href={routeHref(item.route)}>
                <span className="campaign-v2-module-icon"><Icon aria-hidden="true" /></span>
                <span className="campaign-v2-module-copy"><strong>{item.title}</strong><em>{item.subtitle}</em></span>
                <ChevronRight aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </section>

      <section className="campaign-v2-filters" aria-label="筛选条件">
        <strong>筛选条件</strong>
        <span>统计周期</span>
        {['当日', '杩?处', '杩?0处'].map((item) => <button key={item} className={item === '杩?处' ? 'active' : ''}>{item}</button>)}
        <span>区域</span>
        {['全部', '达州市', '宜宾市', '乐山市', '泸州市', '广元市'].map((item) => <button key={item} className={item === '全部' ? 'active' : ''}>{item}</button>)}
        <span>线索类型</span>
        {['全部', '停产期间疑似生产', '夜间异常活动', '同一区域多类异常', '数据遮蔽风险', '历史问题复发'].map((item) => <button key={item} className={item === '全部' ? 'active' : ''}>{item}</button>)}
        <button className="reset"><Minus aria-hidden="true" />重置</button>
      </section>

      <section className="campaign-v2-kpis">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`tone-${item.tone}`}>
              <span className="campaign-v2-kpi-icon"><Icon aria-hidden="true" /></span>
              <div>
                <header><b>{item.label}</b><em>{item.trend}<i>→</i></em></header>
                <strong>{item.value}</strong>
                <p>{item.helper}</p>
              </div>
            </article>
          );
        })}
      </section>

      <main className="campaign-v2-grid">
        <section className="campaign-v2-panel campaign-v2-map-panel">
          <header><strong>区域风险态势</strong><div><button className="active">地图</button><button>列表</button></div></header>
          <div className="campaign-v2-map-body">
            <div className="campaign-v2-map-shape" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
            {mapCallouts.map((item) => (
              <article key={item.city} className={`tone-${item.tone}`} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                <header><b>{item.city}</b><strong>{item.total}</strong></header>
                  <p>高风险<em>{item.high}</em></p>
                  <p>中风险<em>{item.mid}</em></p>
                  <p>低风险<em>{item.low}</em></p>
              </article>
            ))}
            <div className="campaign-v2-map-legend">
              <span>鍥句緥锛堥闄╃熆浜曟暟锛?</span>
              {['6+', '3-5', '1-2', '0'].map((item, index) => <em key={item} className={`l${index}`}>{item}</em>)}
            </div>
          </div>
        </section>

        <section className="campaign-v2-panel campaign-v2-donut-panel">
          <header><strong>可疑线索缁熻锛堟寜绫诲瀷锛?</strong></header>
          <div className="campaign-v2-donut-body">
            <div className="campaign-v2-donut" style={{ background: `conic-gradient(${donutStops})` }}>
              <span><b>76</b><em>鎬荤嚎绱?</em></span>
            </div>
            <div className="campaign-v2-clue-list">
              {clueStats.map((item) => (
                <p key={item.label}><i style={{ background: item.color }} /><span>{item.label}</span><b>{item.value}</b><em>({item.percent})</em></p>
              ))}
            </div>
          </div>
          <a href={routeHref('shuan-home-command-v3-illegal-campaign-hidden-face')}>查看结果明细 <ChevronRight aria-hidden="true" /></a>
        </section>

        <section className="campaign-v2-panel campaign-v2-trend-panel">
          <header><strong>风险趋势（近7天）</strong><div className="campaign-v2-trend-legend"><span className="suspect">疑似矿井数</span><span className="high">高风险矿井数</span><span className="new">鏂板线索数</span></div></header>
          <div className="campaign-v2-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline className="suspect" points={trendPoints.suspect} />
              <polyline className="high" points={trendPoints.high} />
              <polyline className="new" points={trendPoints.new} />
            </svg>
            <div className="campaign-v2-chart-grid">{[20, 15, 10, 5, 0].map((item) => <span key={item}>{item}</span>)}</div>
            <div className="campaign-v2-tooltip"><b>05-11</b><span>疑似矿井数16</span><span>高风险矿井数 8</span><span>鏂板线索数28</span></div>
          </div>
          <div className="campaign-v2-axis">{['05-07', '05-08', '05-09', '05-10', '05-11', '05-12', '05-13'].map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="campaign-v2-panel campaign-v2-top-table">
          <header><strong>高风险矿井TOP10锛堟寜椋庨櫓璇勫垎锛?</strong></header>
          <div className="campaign-v2-table campaign-v2-rank-table">
            <div className="head">{['排名', '煤矿名称', '所属区域', '风险评分', '风险等级', '主要触发线索', '最新异常时间', '操作'].map((item) => <span key={item}>{item}</span>)}</div>
            {topRows.map((row) => (
              <div key={row[0]}>
                {row.map((cell, i) => {
                  const className = i === 4 ? (cell === '高风险' ? 'risk high' : 'risk mid') : i === 1 || i === 7 ? 'link' : '';
                  if (i === 1 || i === 7) {
                    return <span key={`${row[0]}-${i}`} className={className}><a href={routeHref(shuanHiddenFaceMineProfileData.route)}>{cell}</a></span>;
                  }
                  return <span key={`${row[0]}-${i}`} className={className}>{cell}</span>;
                })}
              </div>
            ))}
          </div>
          <footer><span>鍏?0条</span><button>鈥?</button><button className="active">1</button><button>2</button><button>鈥?</button><button>10条页</button></footer>
        </section>

        <section className="campaign-v2-panel campaign-v2-task-table-panel">
          <header><strong>待核查任务</strong></header>
          <div className="campaign-v2-task-tabs"><button className="active">寰呮牳鏌?23)</button><button>鏍告煡涓?7)</button><button>宸插姙缁?126)</button></div>
          <div className="campaign-v2-table campaign-v2-task-table">
            <div className="head">{['任务标题', '鎵€灞炵熆人', '风险等级', '创建时间', '操作'].map((item) => <span key={item}>{item}</span>)}</div>
            {taskRows.map((row) => <div key={row[0]}>{row.map((cell, i) => <span key={`${row[0]}-${i}`} className={i === 2 ? (cell === '高风险' ? 'risk high' : 'risk mid') : i === 4 ? 'link' : ''}>{cell}</span>)}</div>)}
          </div>
          <a href={routeHref('shuan-home-command-v3-illegal-campaign-hidden-face')}>查看全部任务 <ChevronRight aria-hidden="true" /></a>
        </section>

        <section className="campaign-v2-panel campaign-v2-process-panel">
          <header><strong>风险核查闭环流程</strong></header>
          <div className="campaign-v2-process-steps">
            {processSteps.map((item, index) => (
              <React.Fragment key={item}>
                <span className={index < 2 ? 'active' : ''}><ClipboardList aria-hidden="true" /><b>{item}</b></span>
                {index < processSteps.length - 1 && <i aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
          <div className="campaign-v2-progress">
            <strong>今日任务处理进度</strong>
            <div className="bar"><i /></div>
              <div className="stats"><span>派发<b>30</b></span><span>核查中<b>7</b></span><span>认定中<b>5</b></span><span>已办结<b>18</b></span></div>
              <div className="ring"><span>处理率<b>60%</b></span></div>
          </div>
          <a href={routeHref('shuan-home-command-v3-illegal-campaign-hidden-face')}>查看流程明细 <ChevronRight aria-hidden="true" /></a>
        </section>
      </main>
    </div>
  );
}

const mineProfileIconByPart = {
  base: ClipboardList,
  association: GitBranch,
  feedback: RefreshCcw,
};

const mineProfileCategoryIcon = {
  gas: Flame,
  wind: Wind,
  person: UserRound,
  coal: Factory,
  electric: Zap,
};

function MineProfileTag({ level }: { level: '高' | '中' | '低' }) {
  return <em className={`drill-mine-profile-risk-tag tone-${level === '高' ? 'high' : level === '中' ? 'mid' : 'low'}`}>{level}</em>;
}

function HiddenFaceMineProfilePage() {
  const data = shuanHiddenFaceMineProfileData;
  const scorePercent = Math.max(0, Math.min(100, data.mine.score));

  return (
    <div className="drill-page drill-mine-profile-page">
      <aside className="drill-mine-profile-toc" aria-label="页内目录">
        <a className="drill-mine-profile-back" href={routeHref('shuan-home-command-v3-illegal-campaign-hidden-face')}>
          <ArrowLeft aria-hidden="true" />
          <span>返回专题整治</span>
        </a>
        <nav>
          {data.catalog.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className={index === 0 ? 'active' : ''}>
              <strong>{item.label}</strong>
              {item.children ? <span>{item.children.join(' / ')}</span> : null}
            </a>
          ))}
        </nav>
      </aside>

      <main className="drill-mine-profile-main">
        <header className="drill-mine-profile-titlebar">
          <div>
            <p>隐蔽工作面专项整治/ 三级煤矿画像</p>
            <h1>{data.title}</h1>
            <span>{data.subtitle}</span>
          </div>
          <div className="drill-mine-profile-actions">
              <span>数据更新时间：{data.updatedAt}</span>
            <button type="button"><RefreshCcw aria-hidden="true" />刷新</button>
          </div>
        </header>

        <section id="mine-overview" className="drill-mine-profile-section">
          <h2>煤矿概况</h2>
          <div className="drill-mine-profile-overview-grid">
            <article className="drill-mine-profile-card mine-id">
              <span>煤矿名称</span>
              <strong>{data.mine.name}</strong>
              <p>{data.mine.company}</p>
              <em>{data.mine.location}</em>
              <b>{data.mine.productionStatus}</b>
            </article>
            <article className="drill-mine-profile-card score-card">
              <span>综合风险得分</span>
              <strong>{data.mine.score}</strong>
              <p>/100</p>
              <em>杈冧笂娆?{data.mine.previousDelta} →</em>
            </article>
            <article className="drill-mine-profile-card level-card">
              <span>风险等级</span>
              <strong>{data.mine.level}</strong>
              <b>{data.mine.levelReason}</b>
            </article>
            <article className="drill-mine-profile-card">
              <span>区域排名</span>
              <strong>{data.mine.regionRank}</strong>
              <p>鍚屽尯鍩?</p>
            </article>
            <article className="drill-mine-profile-card">
              <span>鏈夋晥线索数</span>
              <strong>{data.mine.validClues}</strong>
              <p>杈冧笂娆?+23</p>
            </article>
          </div>

          <div className="drill-mine-profile-status-strip">
            <span><em>计分线索</em><strong>{data.mine.scoringClues}</strong><b>占比 {data.mine.scoringRatio}</b></span>
            <span><em>鏈€鏂拌瘎鍒嗘椂闂?</em><strong>{data.mine.lastScoreTime}</strong><b>每日更新</b></span>
            <span><em>鏈€杩戞牳鏌ョ姸鎬?</em><strong>{data.mine.verificationStatus}</strong><b>{data.mine.verificationProgress}</b></span>
            <span><em>鏈€鏂板弽棣堢粨璁?</em><strong>{data.mine.feedbackConclusion}</strong><b>{data.mine.pendingIssues}</b></span>
          </div>

          <article className="drill-mine-profile-panel score-breakdown">
            <header>
              <h3>综合评分</h3>
              <span>缁煎悎椋庨櫓鍒?= 绾跨储鍩虹鍒?+ 鍏宠仈澧炲己鍒?+ 鍥炴祦淇鍒?</span>
            </header>
            <div className="drill-mine-profile-score-layout">
              <div className="drill-mine-profile-donut" style={{ '--score': `${scorePercent * 3.6}deg` } as React.CSSProperties}>
                <span>综合风险得分</span>
                <strong>{data.mine.score}</strong>
                <em>/100</em>
                <b>{data.mine.level}</b>
              </div>
              <div className="drill-mine-profile-score-bars">
                {data.scoreParts.map((part) => {
                  const Icon = mineProfileIconByPart[part.icon];
                  return (
                    <div key={part.label}>
                      <i><Icon aria-hidden="true" /></i>
                      <span>
                        <strong>{part.label}</strong>
                        <em>{part.description}</em>
                      </span>
                      <b>{part.value}<small>/{part.max}</small></b>
                      <div><mark style={{ width: part.percent }} /></div>
                      <p>璐＄尞搴?{part.percent}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <footer>娉細鍥炴祦淇鍒嗚寖鍥?-20 ~ +20，当前为 +5.3銆?</footer>
          </article>
        </section>

        <section id="risk-profile" className="drill-mine-profile-section">
          <h2>风险画像</h2>
          <article className="drill-mine-profile-panel">
            <h3>算法线索贡献</h3>
            <div className="drill-mine-profile-category-grid">
              {data.algorithmContributions.map((item) => {
                const Icon = mineProfileCategoryIcon[item.icon];
                return (
                  <section key={item.category}>
                    <header><Icon aria-hidden="true" /><strong>{item.category}</strong></header>
                    <p><span>线索数</span><b>{item.hit}</b><em>条</em></p>
                    <p><span>计分线索</span><b>{item.scored}</b><em>条</em></p>
                    <p><span>璐＄尞鍒?</span><b>{item.contribution}</b></p>
                    <dl>
                      <dt>代表算法</dt>
                      <dd>{item.algorithm}</dd>
                      <dt>异常摘要</dt>
                      <dd>{item.summary}</dd>
                    </dl>
                  </section>
                );
              })}
            </div>
          </article>

          <article className="drill-mine-profile-panel">
            <h3>关键线索</h3>
            <div className="drill-mine-profile-clue-table">
              <div className="head">{['序号', '关键线索', '来源算法', '时间', '区域/对象', '风险等级', '置信度', '贡献分', '证据标签'].map((item) => <span key={item}>{item}</span>)}</div>
              {data.keyClues.map((row, index) => (
                <div key={row.id}>
                  <span>{index + 1}</span>
                  <span>{row.title}</span>
                  <span>{row.source}</span>
                  <span>{row.time}</span>
                  <span>{row.area}</span>
                  <span><MineProfileTag level={row.risk} /></span>
                  <span>{row.confidence}</span>
                  <span>{row.score}</span>
                  <span>{row.tags.join(' | ')}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="drill-mine-profile-panel association">
            <h3>关联增强分析</h3>
            <div className="drill-mine-profile-association-row">
              {data.associationAnalysis.map((item) => (
                <section key={item.dimension}>
                  <header><ShieldAlert aria-hidden="true" /><strong>{item.dimension}</strong><MineProfileTag level={item.level} /></header>
                  <p>{item.clues}</p>
                  <span>澧炲己鍒?<b>{item.increment}</b></span>
                </section>
              ))}
              <section className="total">
                <strong>关联增强合计</strong>
                <b>+23.1</b>
                <span>/100</span>
              </section>
            </div>
          </article>
        </section>

        <section id="verification-loop" className="drill-mine-profile-section">
          <h2>核查闭环</h2>
          <div className="drill-mine-profile-verification-grid">
            <article className="drill-mine-profile-panel summary">
              <h3>核查要点</h3>
              <p>{data.verification.summary}</p>
            </article>
            <article className="drill-mine-profile-panel checklist">
              <h3>核查重点清单</h3>
              {data.verification.checklist.map((item) => (
                <p key={item.text}><i />{item.text}<MineProfileTag level={item.level} /></p>
              ))}
            </article>
            <article className="drill-mine-profile-panel priority">
              <h3>优先核查区域</h3>
              {data.verification.priorityAreas.map((item, index) => <p key={item}><b>{index + 1}</b>{item}</p>)}
            </article>
            <article className="drill-mine-profile-panel priority">
              <h3>优先核查对象</h3>
              {data.verification.priorityObjects.map((item, index) => <p key={item}><b>{index + 1}</b>{item}</p>)}
            </article>
            <article className="drill-mine-profile-panel evidence">
              <h3>关键证据重点</h3>
              <div>{data.verification.evidence.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          </div>

          <article className="drill-mine-profile-panel feedback">
            <h3>最近任务与回流</h3>
            <div className="drill-mine-profile-feedback-grid">
              <div className="timeline">
                {data.feedback.timeline.map((item, index) => (
                  <span key={item.label} className={index === data.feedback.timeline.length - 1 ? 'active' : ''}>
                    <i>{index + 1}</i>
                    <strong>{item.label}</strong>
                    <em>{item.time}</em>
                  </span>
                ))}
              </div>
              <div className="score-change">
                <span>回流效果（本次）</span>
                <p><b>{data.feedback.beforeScore}</b><ChevronRight aria-hidden="true" /><strong>{data.feedback.afterScore}</strong></p>
                <em>淇鍊?{data.feedback.correction}</em>
              </div>
              <div className="level-change">
                <span>风险等级变化</span>
                <strong>{data.feedback.levelChange}</strong>
                <b>维持不变</b>
              </div>
              <div className="follow-up">
                <span>后续跟踪</span>
                <p>{data.feedback.followUp}</p>
                <button type="button">生成跟踪任务</button>
              </div>
            </div>
            <div className="drill-mine-profile-task-table">
              <div className="head">{['任务编号', '任务名称', '任务类型', '责任单位', '鐘舵€?', '计划时间', '完成时间', '结论'].map((item) => <span key={item}>{item}</span>)}</div>
              {data.feedback.tasks.map((task) => (
                <div key={task.id}>
                  <span>{task.id}</span>
                  <span>{task.name}</span>
                  <span>{task.type}</span>
                  <span>{task.owner}</span>
                  <span>{task.status}</span>
                  <span>{task.plan}</span>
                  <span>{task.completed}</span>
                  <span>{task.conclusion}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

function VideoDispatchPage() {
  const data = shuanVideoDispatchData;

  return (
    <div className="drill-page tone-slate drill-video-page">
      <DrillContentHeader
        eyebrow="首页 Av3 / 视频入口"
        title={data.title}
        description={`鐓ょ熆鎬绘暟锛?{data.mineTotal}`}
        actions={
          <a className="drill-video-exit" href={routeHref('shuan-home-command-v3')} aria-label="退出视频联网页">
            <LogOut aria-hidden="true" />
            <span>退出</span>
          </a>
        }
        className="drill-video-content-header"
      />
      <section className="drill-video-workbench" aria-label="顶部视频入口下钻页面">
        <aside className="drill-video-mines">
          <label className="drill-video-search">
            <Search aria-hidden="true" />
            <input type="text" placeholder="请输入关键字..." aria-label="视频煤矿检" />
          </label>
          <div className="drill-video-filter-row">
            {data.filters.map((item) => (
              <button key={item.label} type="button" className={`tone-${item.tone}`}>{item.label}：{item.value}</button>
            ))}
          </div>
          <div className="drill-video-mine-list" aria-label="煤矿列表">
            {data.mines.map((mine, index) => (
              <article key={mine.name} className={index === 0 ? 'active' : ''}>
                <div>
                  <strong>{mine.name}</strong>
                  <span>{mine.county}</span>
                </div>
                <div className="drill-video-tags">
                  <em className={mine.status === '在线' ? 'online' : 'offline'}>{mine.status}</em>
                  <em>{mine.network}</em>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <main className="drill-video-center">
          <header className="drill-video-summary">
            <div className="drill-video-mine-state">
              <strong>{data.currentMine.name}</strong>
              <span>煤矿生产状态：<b>{data.currentMine.state}</b></span>
            </div>
            <div className="drill-video-summary-cards">
              {data.summaries.map((item) => {
                const Icon = item.kind === 'alarm' ? Bell : Video;
                return (
                  <article key={item.label} className={item.active ? 'active' : ''}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <i><Icon aria-hidden="true" /></i>
                  </article>
                );
              })}
            </div>
          </header>
          <section className="drill-video-wall" aria-label="视频预览">
            {[0, 1, 2, 3].map((item) => (
              <article key={item} className={item === 0 ? 'selected' : ''}>
                <div className="drill-video-placeholder">
                  <Camera aria-hidden="true" />
                  <span>{item === 0 ? '11209回风巷及附属工程T2' : '等待视频画面接入'}</span>
                </div>
              </article>
            ))}
          </section>
          <footer className="drill-video-layout-bar" aria-label="视频分屏布局">
            {data.layouts.map((layout) => <button key={layout} type="button">{layout}</button>)}
            <button type="button" aria-label="关闭视频" className="close">脳</button>
          </footer>
        </main>

        <aside className="drill-video-groups">
          <header className="drill-video-tabs">
            <button type="button" className="active">鎸夊尯鍩?</button>
            <button type="button">鎸夊垎缁?</button>
            <button type="button" aria-label="导出"><Download aria-hidden="true" /></button>
          </header>
          <label className="drill-video-search">
            <Search aria-hidden="true" />
            <input type="text" placeholder="视频查找" aria-label="视频点位查找" />
          </label>
          <div className="drill-video-group-list" aria-label="视频点位分组">
            {data.groups.map((group) => (
              <section key={group.title} className={group.expanded ? 'expanded' : ''}>
                <header>
                  <strong>{group.title} <b>{group.count}</b>涓棰?</strong>
                  <ChevronRight aria-hidden="true" />
                </header>
                {group.expanded ? (
                  <div>
                    {group.videos.map((video) => (
                      <article key={video.name}>
                        <div>
                          <span>{video.name}</span>
                          <em className={video.status === '在线' ? 'online' : 'offline'}>{video.status}</em>
                        </div>
                        <p>
                          <ClipboardList aria-hidden="true" />
                          <Video aria-hidden="true" />
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function OverviewPage() {
  const secondary = shuanDrilldownPages.filter((page) => page.kind === 'secondary');
  const algorithms = shuanDrilldownPages.filter((page) => page.kind === 'algorithm');

  return (
    <div className="drill-page tone-blue">
      <DrillContentHeader
        eyebrow="铚€瀹夐页Av3"
        title="下钻页面框架总览"
        description="首页作为固定底稿保留在下层，二级页和三级页统一以覆盖层方式叠加在内容区，不再单独绘制全局顶部菜单。"
        icon={<GitBranch aria-hidden="true" />}
        actions={<a href={routeHref('shuan-home-command-v3')}><ArrowLeft aria-hidden="true" />返回首页 Av3</a>}
      />
      <section className="drill-overview-block">
        <h2>二级下钻页面</h2>
        <div className="drill-card-grid">
          {secondary.map((page) => {
            const Icon = getPageIcon(page);
            return (
              <a key={page.id} className={`drill-nav-card tone-${page.tone}`} href={routeHref(page.id)}>
                <Icon aria-hidden="true" />
                <strong>{page.title}</strong>
                <span>{page.scenario}</span>
              </a>
            );
          })}
        </div>
      </section>
      <section className="drill-overview-block">
        <h2>打非治违三级算法页面</h2>
        <div className="drill-card-grid compact">
          {algorithms.map((page) => {
            const Icon = getPageIcon(page);
            return (
              <a key={page.id} className={`drill-nav-card tone-${page.tone}`} href={routeHref(page.id)}>
                <Icon aria-hidden="true" />
                <strong>{page.title}</strong>
                <span>{page.scenario}</span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function ShuanDrilldownContent({ pageId, onExit }: { pageId: string; onExit?: () => void }) {
  if (pageId === 'shuan-home-command-v3-wireframes') {
    return <OverviewPage />;
  }
  if (pageId === 'shuan-home-command-v3-production-status') {
    return <CoalBasicStatisticsPage />;
  }
  if (pageId === 'shuan-home-command-v3-production-operation') {
    return <ProductionOperationPage onExit={onExit} />;
  }
  if (pageId === 'shuan-home-command-v3-personnel-safety') {
    return <PersonnelSafetyPage onExit={onExit} />;
  }
  if (pageId === 'shuan-home-command-v3-video-dispatch') {
    return <VideoDispatchPage />;
  }
  if (pageId === 'shuan-home-command-v3-illegal-algorithms') {
    return <IllegalCluePage />;
  }
  if (pageId === 'shuan-home-command-v3-daily-regulation') {
    return <DailyRegulationAnalysisPage />;
  }
  if (pageId === shuanRiskControlData.route) {
    return <RiskControlPage />;
  }
  if (pageId === shuanDangerousWorkReportData.route) {
    return <DangerousWorkReportPage onExit={onExit} />;
  }
  if (pageId === shuanLicenseExpiryReminderData.route) {
    return <LicenseExpiryReminderPage />;
  }
  if (pageId === shuanMajorHazardReminderData.route) {
    return <MajorHazardReminderPage />;
  }
  if (pageId === shuanHiddenDangerData.route) {
    return <HiddenDangerManagementPage />;
  }
  if (pageId === shuanRectificationReviewData.route) {
    return <RectificationReviewPage />;
  }
  if (pageId === shuanCountyInspectionData.route) {
    return <CountyInspectionPage onExit={onExit} />;
  }
  if (pageId === 'shuan-home-command-v3-illegal-disposal-city-analysis') {
    return <IllegalCityAnalysisPage onExit={onExit} />;
  }
  if (pageId === shuanProvinceSupervisionData.route) {
    return <ProvinceSupervisionPage />;
  }
  if (pageId === shuanHiddenFaceMineProfileData.route) {
    return <HiddenFaceMineProfilePage />;
  }
  if (shuanIllegalCampaignModules.some((item) => item.route === pageId)) {
    return <IllegalCampaignReferenceV2Page />;
  }
  const page = shuanDrilldownPages.find((item) => item.id === pageId);
  return page ? <DetailPage page={page} /> : <OverviewPage />;
}

export function ShuanDrilldownPage({ pageId }: { pageId: string }) {
  return (
    <DrilldownFrame pageId={pageId}>
      <ShuanDrilldownContent pageId={pageId} />
    </DrilldownFrame>
  );
}











