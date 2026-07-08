import React, { useState } from 'react';
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
  LogOut,
  MapPinned,
  Minus,
  MonitorCog,
  RefreshCcw,
  Search,
  ShieldAlert,
  Siren,
  Table2,
  TrendingUp,
  UserRound,
  Users,
  Video,
  Waves,
  Wind,
  Zap,
} from 'lucide-react';
import { useMemo } from 'react';
import sichuanMapSvg from '../../../../resources/shuan/sichuan-map.svg?raw';
import { normalizeInlineSvg } from '../../../../common/inlineSvg';
import { DangerousWorkReportPage } from './DangerousWorkReportPage';
import { DrilldownPage, DrilldownTone, shuanDailyRegulationAnalysis, shuanDangerousWorkReportData, shuanDrilldownPages, shuanHiddenDangerData, shuanHiddenFaceMineProfileData, shuanIllegalCampaignModules, shuanRiskControlDashboardData, shuanRiskControlData, shuanVideoDispatchData } from './data';

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
              <li>首页 Av3 顶部系统栏固定保留，二级页和三级页都不再单独绘制全局菜单。</li>
              <li>当前覆盖层只替换 `drill-stage` 内的业务内容，保持首页作为统一底稿。</li>
              <li>三级算法页继续在同一覆盖层里切换，避免重复页面框架和多套顶栏。</li>
            </ol>
          </section>
          <NextPages page={page} />
        </aside>
      </main>
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
                <div className="chips">{data.mapFilters.levels.map((item, index) => <button key={item} type="button" className={`chip-${index}`}>{item}{item !== '低风险' ? <span>×</span> : null}</button>)}</div>
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
                  <div className="drill-risk-v2-disposal-stats">{item.stats.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}项</b></span>)}</div>
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
            <div className="drill-risk-v2-subhead"><strong>近30日风险变化趋势</strong><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-risk-v2-trend-legend">{data.riskTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <svg className="drill-risk-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {[0, 300, 600, 900, 1200, 1500].map((value) => <g key={value}><line x1="8" x2="98" y1={90 - (value / riskTrendMax) * 64} y2={90 - (value / riskTrendMax) * 64} /><text x="0.4" y={92 - (value / riskTrendMax) * 64}>{value.toLocaleString()}</text></g>)}
              {data.riskTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, riskTrendMax)} stroke={item.color} />)}
            </svg>
            <div className="drill-risk-v2-axis-labels">{data.riskTrendDays.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="drill-risk-v2-panel">
          <div className="drill-risk-v2-trend-card">
            <div className="drill-risk-v2-subhead"><strong>风险升降级趋势</strong><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div>
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
            <div className="drill-risk-v2-subhead"><strong>区域风险热力趋势</strong><div className="drill-risk-v2-inline-controls"><button type="button">风险热力指数 <ChevronDown aria-hidden="true" /></button><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div></div>
            <div className="drill-risk-v2-heat-layout">
              <svg className="drill-risk-v2-line-chart heat" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {[0, 20, 40, 60, 80, 100].map((value) => <g key={value}><line x1="8" x2="98" y1={90 - (value / heatTrendMax) * 64} y2={90 - (value / heatTrendMax) * 64} /><text x="0.4" y={92 - (value / heatTrendMax) * 64}>{value}</text></g>)}
                {data.regionHeatSeries.map((item) => <polyline key={item.label} points={linePath(item.values, heatTrendMax)} stroke={item.color} />)}
              </svg>
              <div className="drill-risk-v2-heat-legend">{data.regionHeatSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}<b>{item.values[item.values.length - 1]}</b></span>)}</div>
            </div>
            <div className="drill-risk-v2-axis-labels">{data.riskTrendDays.map((item) => <span key={item}>{item}</span>)}</div>
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
                <div className="chips">{data.mapFilters.statuses.map((item, index) => <button key={item} type="button" className={`chip-${index}`}>{item}<span>×</span></button>)}</div>
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
                  <div className="drill-hazard-v2-disposal-stats">{item.stats.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}项</b></span>)}</div>
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
          <div className="drill-hazard-v2-subhead trend"><strong>趋势分析</strong></div>
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>近30日隐患新增趋势</strong><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend">{data.newTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <svg className="drill-hazard-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {[0, 40, 80, 120].map((value) => <g key={value}><line x1="8" x2="98" y1={90 - (value / newTrendMax) * 66} y2={90 - (value / newTrendMax) * 66} /><text x="0.4" y={92 - (value / newTrendMax) * 66}>{value}</text></g>)}
              {data.newTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, newTrendMax)} stroke={item.color} />)}
            </svg>
            <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="drill-hazard-v2-panel">
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>隐患整改闭环趋势</strong><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend"><span><i style={{ background: data.closureTrend.line.color }} />闭环率</span><span><i style={{ background: data.closureTrend.bars.color }} />环比提升</span></div>
            <div className="drill-hazard-v2-combo-chart">
              {data.closureTrend.bars.values.map((value, index) => (
                <i key={`${data.trendDays[index]}-${value}`} className={value >= 0 ? 'plus' : 'minus'} style={{ height: `${(Math.abs(value) / closureBarMax) * 42}%` }} />
              ))}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {[0, 50, 100].map((value) => <g key={value}><line x1="8" x2="98" y1={90 - (value / closureMax) * 66} y2={90 - (value / closureMax) * 66} /><text x="0.4" y={92 - (value / closureMax) * 66}>{value}</text></g>)}
                <polyline points={linePath(data.closureTrend.line.values, closureMax)} stroke={data.closureTrend.line.color} />
              </svg>
            </div>
            <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="drill-hazard-v2-panel">
          <div className="drill-hazard-v2-trend-card">
            <div className="drill-hazard-v2-subhead"><strong>逾期隐患趋势</strong><button type="button">近30日 <ChevronDown aria-hidden="true" /></button></div>
            <div className="drill-hazard-v2-trend-legend">{data.overdueTrendSeries.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
            <svg className="drill-hazard-v2-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {[0, 100, 200, 300].map((value) => <g key={value}><line x1="8" x2="98" y1={90 - (value / overdueTrendMax) * 66} y2={90 - (value / overdueTrendMax) * 66} /><text x="0.4" y={92 - (value / overdueTrendMax) * 66}>{value}</text></g>)}
              {data.overdueTrendSeries.map((item) => <polyline key={item.label} points={linePath(item.values, overdueTrendMax)} stroke={item.color} />)}
            </svg>
            <div className="drill-hazard-v2-axis-labels">{data.trendDays.map((item) => <span key={item}>{item}</span>)}</div>
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
                <button type="button">近7日</button>
                <button type="button">近30日</button>
              </div>
              <button type="button" className="drill-reference-select">市州 <ChevronDown aria-hidden="true" /></button>
              <button type="button" className="drill-reference-select">煤矿 <ChevronDown aria-hidden="true" /></button>
              <button type="button" className="drill-reference-refresh"><Activity aria-hidden="true" />刷新</button>
            </section>
          </div>
        )}
      />

      <section className="drill-reference-summary-tabs" aria-label="入口径切换，同页刷新统计与明细">
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
            <strong>子系统来源分布</strong>
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
            <strong>等级 × 处置交叉分析</strong>
            <button type="button" className="drill-panel-corner" aria-label="全屏查看"><Search aria-hidden="true" /></button>
          </header>
          <div className="drill-matrix-table">
            <div className="head"><span>等级</span><span>已处置</span><span>待处置</span><span>合计</span><span>占比</span></div>
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
            <strong>区域与煤矿分布</strong>
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
                <button type="button">□</button>
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
                {item.value ? <b>{item.value}</b> : <p>{item.text.replace('待处置 21 条，', '待处置 21 条，')}</p>}
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
            <span>煤矿名称</span><span>市州</span><span>子系统</span><span>预警类型</span><span>等级</span><span>状态</span><span>发生时间</span><span>处置情况</span><span>操作</span>
          </div>
          {shuanDailyRegulationAnalysis.details.map((row) => (
            <div key={`${row.mine}-${row.time}`}>
              <span>{row.mine}</span>
              <span>{row.city}</span>
              <span>{row.source}</span>
              <span>{row.type}</span>
              <span><b className={`level-tag tone-${row.level}`}>{row.level}</b></span>
              <span><b className={`status-tag ${row.status === '已处置' ? 'done' : 'pending'}`}>{row.status}</b></span>
              <span>{row.time}</span>
              <span>{row.disposal}</span>
              <span className="actions"><button type="button">查看</button></span>
            </div>
          ))}
        </div>
        <footer className="drill-reference-table-footer">
          <div className="drill-reference-table-total">共 {shuanDailyRegulationAnalysis.pagination.total} 条 <span>每页显示：</span><button type="button" className="drill-reference-page-size">{shuanDailyRegulationAnalysis.pagination.pageSize} <ChevronDown aria-hidden="true" /></button></div>
          <div className="drill-reference-pagination">
            <button type="button">‹</button>
            {shuanDailyRegulationAnalysis.pagination.pages.map((page) => <button key={page} type="button" className={page === shuanDailyRegulationAnalysis.pagination.current ? 'active' : ''}>{page}</button>)}
            <button type="button">…</button>
            <button type="button">›</button>
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
  focusLabel: '高风险' | '今日新增';
  focusValue: number;
  priority: IllegalOverviewPriority;
  pageId?: string;
}

interface IllegalOverviewMineRow {
  mine: string;
  categoryId: IllegalOverviewCategoryId;
  clueCount: number;
  algorithmCount: number;
  risk: '高风险' | '中风险' | '低风险';
}

interface IllegalOverviewPreviewRow {
  title: string;
  mine: string;
  categoryId: IllegalOverviewCategoryId;
  algorithm: string;
  time: string;
  risk: '高风险' | '中风险' | '低风险';
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
    gas: ['瓦斯恒值异常', '甲烷趋势漂移', '抽采负压波动', '传感器平直异常', '瓦斯曲线反常', '瓦斯超限迟报', '甲烷闭锁缺失'],
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
  { mine: '赵家注煤矿', categoryId: 'power', clueCount: 95, algorithmCount: 6, risk: '中风险' },
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
            <p>按分类、来源页面和矿井集中度查看线索分布</p>
          </div>
          <a className="illegal-overview-title__back" href={routeHref('shuan-home-command-v3')}>
            <ArrowLeft aria-hidden="true" />
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
            <span>所属矿井</span>
            <button type="button">全部矿井<ChevronDown aria-hidden="true" /></button>
          </label>
          <label className="illegal-overview-filter">
            <span>状态</span>
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
                <span><em>高风险</em><b>{item.highRisk}</b></span>
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
              <span>共 {filteredAlgorithms.length} 项</span>
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
              <span>只看有线索</span>
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
        <span>说明：统计数据每小时更新一次，趋势图基于近7日数据</span>
        <span>数据更新时间：2025-07-06 09:30:24</span>
      </footer>
    </div>
  );
}
function IllegalCampaignReferenceV2Page() {
  const moduleCards = [
    { title: '隐蔽工作面', subtitle: '停产疑似生产 / 隐蔽采掘风险', icon: MapPinned, route: 'shuan-home-command-v3-illegal-campaign-hidden-face' },
    { title: '监控造假', subtitle: '传感器异常 / 报警闭锁造假风险', icon: MonitorCog, route: 'shuan-home-command-v3-illegal-campaign-monitor-fake' },
    { title: '隐瞒入井人数', subtitle: '人员定位 / 视频人数不匹配风险', icon: Users, route: 'shuan-home-command-v3-illegal-campaign-hidden-person' },
  ];
  const kpis = [
    { label: '疑似矿井数', value: '18', trend: '环比 +2', helper: '命中专项整治规则', icon: ShieldAlert, tone: 'warn' },
    { label: '高风险矿井数', value: '9', trend: '环比 +1', helper: '建议优先核查', icon: Siren, tone: 'danger' },
    { label: '支撑线索数', value: '76', trend: '环比 +12', helper: '多源线索汇聚', icon: GitBranch, tone: 'blue' },
    { label: '待核查任务数', value: '23', trend: '环比 +5', helper: '已生成核查建议', icon: ClipboardList, tone: 'cyan' },
    { label: '逾期任务数', value: '3', trend: '环比 +1', helper: '需借力跟进', icon: Bell, tone: 'amber' },
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
            <p>多源数据关联识别隐蔽采掘活动，构建线索闭环治理链路，提升打非治违精准度。</p>
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
        {['当日', '近7天', '近30天'].map((item) => <button key={item} className={item === '近7天' ? 'active' : ''}>{item}</button>)}
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
                <header><b>{item.label}</b><em>{item.trend}<i>↑</i></em></header>
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
              <span>图例（风险矿井数）</span>
              {['6+', '3-5', '1-2', '0'].map((item, index) => <em key={item} className={`l${index}`}>{item}</em>)}
            </div>
          </div>
        </section>

        <section className="campaign-v2-panel campaign-v2-donut-panel">
          <header><strong>可疑线索统计（按类型）</strong></header>
          <div className="campaign-v2-donut-body">
            <div className="campaign-v2-donut" style={{ background: `conic-gradient(${donutStops})` }}>
              <span><b>76</b><em>总线索</em></span>
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
          <header><strong>风险趋势（近7天）</strong><div className="campaign-v2-trend-legend"><span className="suspect">疑似矿井数</span><span className="high">高风险矿井数</span><span className="new">新增线索数</span></div></header>
          <div className="campaign-v2-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline className="suspect" points={trendPoints.suspect} />
              <polyline className="high" points={trendPoints.high} />
              <polyline className="new" points={trendPoints.new} />
            </svg>
            <div className="campaign-v2-chart-grid">{[20, 15, 10, 5, 0].map((item) => <span key={item}>{item}</span>)}</div>
            <div className="campaign-v2-tooltip"><b>05-11</b><span>疑似矿井数 16</span><span>高风险矿井数 8</span><span>新增线索数 28</span></div>
          </div>
          <div className="campaign-v2-axis">{['05-07', '05-08', '05-09', '05-10', '05-11', '05-12', '05-13'].map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="campaign-v2-panel campaign-v2-top-table">
          <header><strong>高风险矿井TOP10（按风险评分）</strong></header>
          <div className="campaign-v2-table campaign-v2-rank-table">
            <div className="head">{['排名', '矿井名称', '所属区域', '风险评分', '风险等级', '主要触发线索', '最新异常时间', '操作'].map((item) => <span key={item}>{item}</span>)}</div>
            {topRows.map((row) => (
              <div key={row[0]}>
                {row.map((cell, i) => {
                  const className = i === 4 ? (cell === '高风险' ? 'risk high' : 'risk mid') : i === 7 ? 'link' : '';
                  if (i === 7 && row[1] === '达星XX煤矿') {
                    return <span key={`${row[0]}-${i}`} className={className}><a href={routeHref(shuanHiddenFaceMineProfileData.route)}>{cell}</a></span>;
                  }
                  return <span key={`${row[0]}-${i}`} className={className}>{cell}</span>;
                })}
              </div>
            ))}
          </div>
          <footer><span>共50条</span><button>‹</button><button className="active">1</button><button>2</button><button>›</button><button>10条/页</button></footer>
        </section>

        <section className="campaign-v2-panel campaign-v2-task-table-panel">
          <header><strong>待核查任务</strong></header>
          <div className="campaign-v2-task-tabs"><button className="active">待核查(23)</button><button>核查中(7)</button><button>已办结(126)</button></div>
          <div className="campaign-v2-table campaign-v2-task-table">
            <div className="head">{['任务标题', '所属矿井', '风险等级', '创建时间', '操作'].map((item) => <span key={item}>{item}</span>)}</div>
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
            <p>隐蔽工作面专项整治 / 三级煤矿画像</p>
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
              <em>较上次 {data.mine.previousDelta} ↑</em>
            </article>
            <article className="drill-mine-profile-card level-card">
              <span>风险等级</span>
              <strong>{data.mine.level}</strong>
              <b>{data.mine.levelReason}</b>
            </article>
            <article className="drill-mine-profile-card">
              <span>区域排名</span>
              <strong>{data.mine.regionRank}</strong>
              <p>同区域</p>
            </article>
            <article className="drill-mine-profile-card">
              <span>有效线索数</span>
              <strong>{data.mine.validClues}</strong>
              <p>较上次 +23</p>
            </article>
          </div>

          <div className="drill-mine-profile-status-strip">
            <span><em>计分线索</em><strong>{data.mine.scoringClues}</strong><b>占比 {data.mine.scoringRatio}</b></span>
            <span><em>最新评分时间</em><strong>{data.mine.lastScoreTime}</strong><b>每日更新</b></span>
            <span><em>最近核查状态</em><strong>{data.mine.verificationStatus}</strong><b>{data.mine.verificationProgress}</b></span>
            <span><em>最新反馈结论</em><strong>{data.mine.feedbackConclusion}</strong><b>{data.mine.pendingIssues}</b></span>
          </div>

          <article className="drill-mine-profile-panel score-breakdown">
            <header>
              <h3>综合评分</h3>
              <span>综合风险分 = 线索基础分 + 关联增强分 + 回流修正分</span>
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
                      <p>贡献度 {part.percent}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <footer>注：回流修正分范围 -20 ~ +20，当前为 +5.3。</footer>
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
                    <p><span>贡献分</span><b>{item.contribution}</b></p>
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
                  <span>增强分 <b>{item.increment}</b></span>
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
                <em>修正值 {data.feedback.correction}</em>
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
              <div className="head">{['任务编号', '任务名称', '任务类型', '责任单位', '状态', '计划时间', '完成时间', '结论'].map((item) => <span key={item}>{item}</span>)}</div>
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
        description={`煤矿总数：${data.mineTotal}`}
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
            <button type="button" aria-label="关闭视频" className="close">×</button>
          </footer>
        </main>

        <aside className="drill-video-groups">
          <header className="drill-video-tabs">
            <button type="button" className="active">按区域</button>
            <button type="button">按分组</button>
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
                  <strong>{group.title} <b>{group.count}</b>个视频</strong>
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
        eyebrow="蜀安首页 Av3"
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

export function ShuanDrilldownContent({ pageId }: { pageId: string }) {
  if (pageId === 'shuan-home-command-v3-wireframes') {
    return <OverviewPage />;
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
    return <DangerousWorkReportPage />;
  }
  if (pageId === shuanHiddenDangerData.route) {
    return <HiddenDangerManagementPage />;
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








