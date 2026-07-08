import React from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, ChevronRight, ClipboardList, MapPin, Minus, RefreshCw, Search, ShieldAlert, ShieldCheck, Timer, TrendingUp } from 'lucide-react';
import { PageScaffold } from '../components/AppShell';
import { DataTable, Field } from '../components/Primitives';

export type HiddenRiskPageKind =
  | 'guard-hidden-risk-overview'
  | 'guard-hidden-risk-mine-profile'
  | 'guard-hidden-risk-clue-ledger'
  | 'guard-hidden-risk-task'
  | 'guard-hidden-risk-config';

const HIDDEN_RISK_PAGES: HiddenRiskPageKind[] = [
  'guard-hidden-risk-overview',
  'guard-hidden-risk-mine-profile',
  'guard-hidden-risk-clue-ledger',
  'guard-hidden-risk-task',
  'guard-hidden-risk-config',
];

export function isHiddenRiskPage(page: string): page is HiddenRiskPageKind {
  return (HIDDEN_RISK_PAGES as string[]).includes(page);
}

export function HiddenRiskPage({ page }: { page: HiddenRiskPageKind }) {
  if (page === 'guard-hidden-risk-overview') return <HiddenRiskOverviewPage />;
  if (page === 'guard-hidden-risk-mine-profile') return <HiddenRiskMineProfilePage />;
  return <HiddenRiskPlaceholderPage page={page} />;
}

const PLACEHOLDER_INTENT: Record<Exclude<HiddenRiskPageKind, 'guard-hidden-risk-overview' | 'guard-hidden-risk-mine-profile'>, { title: string; intent: string }> = {
  'guard-hidden-risk-clue-ledger': { title: '线索证据台账', intent: '汇总线索统计、线索列表、线索详情、证据查看、参与评分情况和关联可疑点，不把线索作为独立处置对象。' },
  'guard-hidden-risk-task': { title: '工作安排处置', intent: '把煤矿风险等级和可疑点转成日常检查、重点核查或专项排查任务，完成派发、填报、复核与结果回流。' },
  'guard-hidden-risk-config': { title: '配置管理', intent: '维护指标、权重、等级阈值、时间窗口、关联关系、可疑点和回流修正规则。' },
};

function HiddenRiskPlaceholderPage({ page }: { page: Exclude<HiddenRiskPageKind, 'guard-hidden-risk-overview' | 'guard-hidden-risk-mine-profile'> }) {
  const meta = PLACEHOLDER_INTENT[page];
  return (
    <PageScaffold title={meta.title}>
      <div className="module-placeholder">
        <ShieldAlert size={36} />
        <h2>{meta.title}（待展开）</h2>
        <p>{meta.intent}</p>
        <p>本轮已先完成「风险总览一张图」和「煤矿风险画像」。后续按新业务主线继续展开：线索证据台账 → 工作安排处置 → 配置管理。</p>
        <div className="placeholder-steps">
          <span>1. 固定业务对象与字段口径</span>
          <span>2. 接入任务回流和风险等级修正</span>
          <span>3. 同步补充开发文档和说明面板</span>
        </div>
      </div>
    </PageScaffold>
  );
}

function HiddenRiskOverviewPage() {
  const [selectedSuspiciousType, setSelectedSuspiciousType] = React.useState<SuspiciousType>('全部');
  const filteredMines = React.useMemo(
    () => HIGH_RISK_MINES.filter((mine) => matchesSuspiciousType(mine, selectedSuspiciousType)),
    [selectedSuspiciousType],
  );
  const selectedPoint = selectedSuspiciousType === '全部'
    ? undefined
    : SUSPICIOUS_POINTS.find((item) => item.type === selectedSuspiciousType);
  const filterSupportClues = filteredMines.reduce((sum, mine) => sum + mine.supportClues, 0);

  return (
    <PageScaffold
      title="隐蔽面风险综合分析 / 风险总览一张图"
      rightExtra={<span className="hidden-risk-title-note">最近更新：2026-06-15 08:00 · 数据来源：矿数卫士</span>}
    >
      <RiskFilterBar selectedType={selectedSuspiciousType} onTypeChange={setSelectedSuspiciousType} />
      <RiskMetricRow />
      <FilterFeedback selectedType={selectedSuspiciousType} selectedPoint={selectedPoint} matchedMineCount={filteredMines.length} supportClues={filterSupportClues} />
      <div key={selectedSuspiciousType} className="hidden-risk-result-surface">
        <div className="hidden-risk-grid">
          <AreaRiskCard />
          <SuspiciousPointCard selectedType={selectedSuspiciousType} onTypeChange={setSelectedSuspiciousType} />
        </div>
        <TrendCard selectedType={selectedSuspiciousType} />
        <HighRiskMinesCard rows={filteredMines} selectedType={selectedSuspiciousType} />
        <TaskBackflowCard selectedType={selectedSuspiciousType} matchedMineCount={filteredMines.length} />
      </div>
    </PageScaffold>
  );
}

function HiddenRiskMineProfilePage() {
  return (
    <PageScaffold
      title="煤矿风险画像"
      rightExtra={<span className="hidden-risk-title-note">金沙县-林华煤矿 · 最近评分：2026-06-15 08:00</span>}
    >
      <ProfileHero />
      <div className="hidden-risk-profile-grid">
        <div className="hidden-risk-profile-main">
          <RiskCompositionCard />
          <ProfileSuspiciousPointsCard />
          <ProfileEvidenceCard />
        </div>
        <aside className="hidden-risk-profile-side">
          <ProfileTaskCard />
          <ProfileBackflowCard />
          <ProfileAdviceCard />
        </aside>
      </div>
    </PageScaffold>
  );
}

/* ---------------- 数据 ---------------- */

type Tone = 'danger' | 'warn' | 'normal';
type RiskLevel = '高风险' | '中风险' | '低风险';
type StatusTone = Tone | 'info';
type SuspiciousType = typeof SUSPICIOUS_TYPES[number];

const SUSPICIOUS_TYPES = ['全部', '停产期间疑似生产', '夜间异常活动', '同一区域多类异常', '数据遮蔽风险', '历史问题复发'] as const;

const TOP_METRICS: Array<{ id: string; label: string; value: string; tone: Tone; hint: string; icon: React.ElementType }> = [
  { id: 'mine-total', label: '煤矿总数', value: '39', tone: 'normal', hint: '当前接入矿数卫士的煤矿', icon: ShieldCheck },
  { id: 'high-risk', label: '高风险煤矿', value: '5', tone: 'danger', hint: '综合评分 ≥ 80，需专项排查', icon: ShieldAlert },
  { id: 'mid-risk', label: '中风险煤矿', value: '11', tone: 'warn', hint: '综合评分 60 ~ 79，纳入重点核查', icon: AlertTriangle },
  { id: 'pending-high-risk', label: '待核查高风险煤矿', value: '4', tone: 'warn', hint: '高风险等级，待安排或反馈专项排查', icon: ClipboardList },
  { id: 'overdue-task', label: '逾期核查任务', value: '3', tone: 'danger', hint: '超出办理时限的核查/排查任务', icon: Timer },
];

const AREA_RISK = [
  { area: '金沙县', total: 12, high: 3, mid: 4, low: 5, delta: 2 },
  { area: '黔西市', total: 9, high: 1, mid: 3, low: 5, delta: 0 },
  { area: '七星关区', total: 7, high: 1, mid: 2, low: 4, delta: -1 },
  { area: '纳雍县', total: 6, high: 0, mid: 1, low: 5, delta: 0 },
  { area: '威宁县', total: 5, high: 0, mid: 1, low: 4, delta: 1 },
];

const SUSPICIOUS_POINTS = [
  { type: '停产期间疑似生产', count: 12, high: 4, tone: 'danger' as const, hint: '停产状态与人员、用电、煤流线索冲突' },
  { type: '夜间异常活动', count: 9, high: 3, tone: 'warn' as const, hint: '夜间人员、设备、视频异常相互印证' },
  { type: '同一区域多类异常', count: 8, high: 2, tone: 'warn' as const, hint: '同一工作面或测点附近多方向异常集中' },
  { type: '数据遮蔽风险', count: 6, high: 2, tone: 'danger' as const, hint: '视频、定位或监测离线伴随其他异常' },
  { type: '历史问题复发', count: 5, high: 1, tone: 'normal' as const, hint: '与历史检查问题或整改区域相似' },
];

interface HighRiskMineRow extends Record<string, unknown> {
  id: number;
  mine: string;
  area: string;
  score: number;
  level: RiskLevel;
  suspiciousPoint: string;
  supportClues: number;
  trackingStatus: string;
  trend: '上升' | '下降' | '持平';
}

const HIGH_RISK_MINES: HighRiskMineRow[] = [
  { id: 1, mine: '金沙县-林华煤矿', area: '金沙县', score: 92, level: '高风险', suspiciousPoint: '停产期间疑似生产 / 数据遮蔽风险', supportClues: 9, trackingStatus: '专项排查中', trend: '上升' },
  { id: 2, mine: '金沙县-老虎石煤矿', area: '金沙县', score: 88, level: '高风险', suspiciousPoint: '夜间异常活动 / 同一区域多类异常', supportClues: 7, trackingStatus: '待派发', trend: '上升' },
  { id: 3, mine: '安晟龙凤煤矿', area: '金沙县', score: 84, level: '高风险', suspiciousPoint: '历史问题复发 / 通风数据异常', supportClues: 6, trackingStatus: '结果已回流', trend: '持平' },
  { id: 4, mine: '黔西市-青龙煤矿', area: '黔西市', score: 81, level: '高风险', suspiciousPoint: '数据遮蔽风险 / 一氧化碳异常', supportClues: 5, trackingStatus: '待办理', trend: '上升' },
  { id: 5, mine: '七星关区-永福煤矿', area: '七星关区', score: 80, level: '高风险', suspiciousPoint: '人员定位异常 / 视频离线', supportClues: 5, trackingStatus: '持续跟踪', trend: '下降' },
  { id: 6, mine: '金沙县-新化煤矿一号井', area: '金沙县', score: 76, level: '中风险', suspiciousPoint: '闭锁周期异常 / 报备缺失', supportClues: 4, trackingStatus: '已纳入检查', trend: '持平' },
  { id: 7, mine: '回归煤矿', area: '黔西市', score: 72, level: '中风险', suspiciousPoint: '带班领导交接班异常', supportClues: 3, trackingStatus: '已降级', trend: '下降' },
  { id: 8, mine: '吉盛煤矿', area: '七星关区', score: 68, level: '中风险', suspiciousPoint: '煤流异常 / 数据质量差', supportClues: 3, trackingStatus: '未核查', trend: '上升' },
];

const TREND_BARS = [
  { label: '06-09', high: 3, mid: 8, low: 18 },
  { label: '06-10', high: 3, mid: 9, low: 17 },
  { label: '06-11', high: 4, mid: 10, low: 18 },
  { label: '06-12', high: 4, mid: 10, low: 19 },
  { label: '06-13', high: 5, mid: 11, low: 18 },
  { label: '06-14', high: 5, mid: 11, low: 18 },
  { label: '06-15', high: 5, mid: 11, low: 19 },
];

const TASK_STATS: Array<{ id: string; label: string; value: string; tone: Tone; hint: string }> = [
  { id: 'pending', label: '待派发', value: '4', tone: 'warn', hint: '高风险煤矿已生成排查建议' },
  { id: 'todo', label: '待办理', value: '7', tone: 'warn', hint: '已派发，等待执行人员反馈' },
  { id: 'doing', label: '专项排查中', value: '4', tone: 'danger', hint: '高风险煤矿正在现场排查' },
  { id: 'backflow', label: '结果已回流', value: '12', tone: 'normal', hint: '已修正线索有效性或风险等级' },
  { id: 'tracking', label: '持续跟踪', value: '6', tone: 'warn', hint: '未满足风险解除条件' },
  { id: 'overdue', label: '逾期任务', value: '3', tone: 'danger', hint: '超出办理时限，需催办' },
];

const SCORE_PARTS = [
  { name: '方向基础分', value: 42, note: '人员、用电、煤流、视频方向有效线索聚合' },
  { name: '关联印证分', value: 18, note: '停产状态下人员活动、用电负荷、煤流波动共同出现' },
  { name: '状态冲突分', value: 12, note: '停产报备与实际监测线索冲突' },
  { name: '历史复发分', value: 8, note: '历史检查曾提示相近区域异常' },
  { name: '数据质量修正分', value: 7, note: '视频离线与定位间断构成遮蔽风险' },
  { name: '核查回流修正分', value: 5, note: '尚未形成排除或整改确认，暂不降分' },
];

interface SuspiciousPointRow extends Record<string, unknown> {
  id: number;
  point: string;
  basis: string;
  clues: string;
  focus: string;
  status: string;
}

const PROFILE_SUSPICIOUS_POINTS: SuspiciousPointRow[] = [
  { id: 1, point: '停产期间疑似生产', basis: '停产报备与人员/用电/煤流线索冲突', clues: '4 条', focus: '核查停产期间是否存在实际作业、设备运行或隐蔽采掘活动', status: '专项排查中' },
  { id: 2, point: '数据遮蔽风险', basis: '视频离线期间出现人员轨迹和用电负荷异常', clues: '3 条', focus: '核查视频离线原因、定位中断原因及是否规避监管', status: '待确认' },
  { id: 3, point: '历史问题复发', basis: '当前异常区域与历史整改记录相近', clues: '2 条', focus: '核查历史问题是否整改到位，是否出现重复作业风险', status: '持续跟踪' },
];

interface EvidenceRow extends Record<string, unknown> {
  id: number;
  direction: string;
  clueType: string;
  time: string;
  level: string;
  validity: string;
  scoreUse: string;
  evidence: string;
}

const PROFILE_EVIDENCE: EvidenceRow[] = [
  { id: 1, direction: '人员', clueType: '停产期间人员活动', time: '06-14 22:10-23:40', level: '高', validity: '当前有效', scoreUse: '方向基础分 / 状态冲突分', evidence: '人员轨迹、下井记录' },
  { id: 2, direction: '用电', clueType: '夜间负荷异常', time: '06-14 21:30-06-15 01:00', level: '高', validity: '当前有效', scoreUse: '关联印证分', evidence: '分项用电曲线' },
  { id: 3, direction: '煤流', clueType: '运输波动异常', time: '06-14 23:15', level: '中', validity: '待人工确认', scoreUse: '关联印证分', evidence: '皮带运行记录' },
  { id: 4, direction: '视频', clueType: '关键视频离线', time: '06-14 20:50-23:55', level: '高', validity: '当前有效', scoreUse: '数据质量修正分', evidence: '视频离线日志' },
  { id: 5, direction: '历史检查', clueType: '相近区域整改复查', time: '2026-05-28', level: '中', validity: '当前有效', scoreUse: '历史复发分', evidence: '历史检查记录' },
];

/* ---------------- 总览组件 ---------------- */

function RiskFilterBar({ selectedType, onTypeChange }: { selectedType: SuspiciousType; onTypeChange: (type: SuspiciousType) => void }) {
  return (
    <section className="hidden-risk-filter" data-annotation-id="hidden-risk-filter">
      <div className="hidden-risk-filter-row">
        <label className="guard-date-line">
          <span>统计周期：</span>
          <button className="date-chip">当日</button>
          <button className="date-chip active">近 7 天</button>
          <button className="date-chip">近 30 天</button>
          <button className="date-chip">自定义</button>
          <div className="date-range"><em>2026-06-09</em><b>至</b><em>2026-06-15</em></div>
        </label>
        <Field label="区域" placeholder="全部区县" type="select" />
        <Field label="风险等级" placeholder="高 / 中 / 低" type="select" />
        <Field label="跟踪状态" placeholder="未核查 / 已回流 / 持续跟踪" type="select" />
      </div>
      <div className="hidden-risk-filter-row">
        <div className="hidden-risk-chip-line">
          <span className="hidden-risk-chip-label">可疑点类型：</span>
          {SUSPICIOUS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`hidden-risk-chip ${selectedType === type ? 'active' : ''}`}
              aria-pressed={selectedType === type}
              onClick={() => onTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="hidden-risk-filter-actions">
          <button className="primary-button" type="button"><Search size={15} />查询</button>
          <button className="light-button" type="button" onClick={() => onTypeChange('全部')}><RefreshCw size={15} />重置</button>
        </div>
      </div>
    </section>
  );
}

function FilterFeedback({ selectedType, selectedPoint, matchedMineCount, supportClues }: { selectedType: SuspiciousType; selectedPoint?: typeof SUSPICIOUS_POINTS[number]; matchedMineCount: number; supportClues: number }) {
  if (selectedType === '全部') {
    return (
      <section className="hidden-risk-filter-feedback">
        <b>当前展示全部可疑点类型</b>
        <span>高风险煤矿排行、可疑点统计和任务回流保持全量视图。</span>
      </section>
    );
  }
  return (
    <section className="hidden-risk-filter-feedback is-active">
      <b>已筛选：{selectedType}</b>
      <span>命中 {matchedMineCount} 家煤矿、{supportClues} 条支撑线索；右侧统计和下方排行已聚焦到该类可疑点。</span>
      {selectedPoint ? <em>{selectedPoint.hint}</em> : null}
    </section>
  );
}

function RiskMetricRow() {
  return (
    <section className="hidden-risk-metric-row" data-annotation-id="hidden-risk-metrics">
      {TOP_METRICS.map((metric) => {
        const Icon = metric.icon;
        return (
          <button key={metric.id} type="button" className={`hidden-risk-metric tone-${metric.tone}`}>
            <span className="hidden-risk-metric-icon"><Icon size={22} /></span>
            <span className="hidden-risk-metric-body">
              <em className="hidden-risk-metric-label">{metric.label}</em>
              <b className="hidden-risk-metric-value">{metric.value}</b>
              <i className="hidden-risk-metric-hint">{metric.hint}</i>
            </span>
          </button>
        );
      })}
    </section>
  );
}

function AreaRiskCard() {
  return (
    <section className="hidden-risk-card hidden-risk-area" data-annotation-id="hidden-risk-area">
      <header>
        <span className="hidden-risk-card-title"><MapPin size={16} /> 区域风险态势</span>
        <button className="hidden-risk-link" type="button">查看区域明细 <ChevronRight size={14} /></button>
      </header>
      <div className="hidden-risk-area-grid">
        {AREA_RISK.map((area) => <AreaRiskTile key={area.area} {...area} />)}
      </div>
      <footer className="hidden-risk-card-footer">说明：色块按区域当前最高风险等级着色；变化值为本周期相对上一周期的高风险煤矿数差。</footer>
    </section>
  );
}

function AreaRiskTile({ area, total, high, mid, low, delta }: { area: string; total: number; high: number; mid: number; low: number; delta: number }) {
  const tone: Tone = high > 0 ? 'danger' : mid > 0 ? 'warn' : 'normal';
  return (
    <button type="button" className={`hidden-risk-area-tile tone-${tone}`}>
      <span className="hidden-risk-area-name">{area}</span>
      <span className="hidden-risk-area-total">{total} 矿</span>
      <span className="hidden-risk-area-breakdown">
        <em className="badge-high">高 {high}</em>
        <em className="badge-mid">中 {mid}</em>
        <em className="badge-low">低 {low}</em>
      </span>
      <span className="hidden-risk-area-delta">
        {delta > 0 && <><ArrowUpRight size={13} />环比 +{delta}</>}
        {delta < 0 && <><ArrowDownRight size={13} />环比 {delta}</>}
        {delta === 0 && <><Minus size={13} />持平</>}
      </span>
    </button>
  );
}

function SuspiciousPointCard({ selectedType, onTypeChange }: { selectedType: SuspiciousType; onTypeChange: (type: SuspiciousType) => void }) {
  return (
    <section className="hidden-risk-card hidden-risk-suspicious" data-annotation-id="hidden-risk-suspicious">
      <header>
        <span className="hidden-risk-card-title"><AlertTriangle size={16} /> 可疑点统计</span>
        <button className="hidden-risk-link" type="button">查看可疑点明细 <ChevronRight size={14} /></button>
      </header>
      <div className="hidden-risk-suspicious-list">
        {SUSPICIOUS_POINTS.map((item) => (
          <button
            key={item.type}
            type="button"
            className={`hidden-risk-suspicious-item tone-${item.tone} ${selectedType === item.type ? 'active' : ''}`}
            onClick={() => onTypeChange(item.type)}
          >
            <span className="hidden-risk-suspicious-title">{item.type}</span>
            <b>{item.count}</b>
            <em>高风险 {item.high}</em>
            <i>{item.hint}</i>
          </button>
        ))}
      </div>
      <footer className="hidden-risk-card-footer">可疑点用于解释煤矿风险等级和生成检查重点，不作为独立对象进入任务闭环。</footer>
    </section>
  );
}

function TrendCard({ selectedType }: { selectedType: SuspiciousType }) {
  const maxTotal = Math.max(...TREND_BARS.map((bar) => bar.high + bar.mid + bar.low));
  const footerText = selectedType === '全部'
    ? '高风险煤矿数从 06-09 的 3 家上升至 06-15 的 5 家；趋势用于观察煤矿风险等级变化。'
    : `当前聚焦“${selectedType}”相关煤矿，趋势区保留全局等级走势，作为筛选后的背景参照。`;
  return (
    <section className="hidden-risk-card hidden-risk-trend" data-annotation-id="hidden-risk-trend">
      <header>
        <span className="hidden-risk-card-title"><TrendingUp size={16} /> 风险等级变化趋势</span>
        <div className="hidden-risk-trend-toggle">
          <button className="date-chip active">按日</button>
          <button className="date-chip">按周</button>
          <button className="date-chip">按月</button>
        </div>
      </header>
      <div className="hidden-risk-trend-body">
        <div className="hidden-risk-trend-chart">
          {TREND_BARS.map((bar) => {
            const total = bar.high + bar.mid + bar.low;
            const scale = (value: number) => `${(value / maxTotal) * 100}%`;
            return (
              <div key={bar.label} className="hidden-risk-trend-col">
                <div className="hidden-risk-trend-stack" title={`高 ${bar.high} / 中 ${bar.mid} / 低 ${bar.low}`}>
                  <i className="trend-low" style={{ height: scale(bar.low) }} />
                  <i className="trend-mid" style={{ height: scale(bar.mid) }} />
                  <i className="trend-high" style={{ height: scale(bar.high) }} />
                </div>
                <span className="hidden-risk-trend-label">{bar.label}</span>
                <span className="hidden-risk-trend-total">{total}</span>
              </div>
            );
          })}
        </div>
        <div className="hidden-risk-trend-legend">
          <span><i className="dot dot-high" />高风险煤矿</span>
          <span><i className="dot dot-mid" />中风险煤矿</span>
          <span><i className="dot dot-low" />低风险煤矿</span>
        </div>
      </div>
      <footer className="hidden-risk-card-footer">{footerText}</footer>
    </section>
  );
}

function HighRiskMinesCard({ rows, selectedType }: { rows: HighRiskMineRow[]; selectedType: SuspiciousType }) {
  const columns = [
    { key: 'rank', title: '排名', width: 70, align: 'center' as const, render: (_row: HighRiskMineRow, index: number) => <span className="hidden-risk-rank-number">{index + 1}</span> },
    { key: 'mine', title: '煤矿名称', width: 220, align: 'left' as const },
    { key: 'area', title: '所属区域', width: 120 },
    { key: 'score', title: '综合风险分', width: 110, render: (row: HighRiskMineRow) => <RiskScoreBar score={row.score} /> },
    { key: 'level', title: '风险等级', width: 100, render: (row: HighRiskMineRow) => <RiskLevelTag level={row.level} /> },
    { key: 'suspiciousPoint', title: '主要可疑点', width: 300, align: 'left' as const, render: (row: HighRiskMineRow) => <SuspiciousPointText text={row.suspiciousPoint} selectedType={selectedType} /> },
    { key: 'supportClues', title: '支撑线索', width: 90 },
    { key: 'trackingStatus', title: '最近核查状态', width: 120, render: (row: HighRiskMineRow) => <StatusPill status={row.trackingStatus} tone={trackingStatusTone(row.trackingStatus)} /> },
    { key: 'trend', title: '环比', width: 90, render: (row: HighRiskMineRow) => <TrendIndicator trend={row.trend} /> },
    { key: 'action', title: '操作', width: 150, render: () => (
      <div className="hidden-risk-actions">
        <a href="#page=guard-hidden-risk-mine-profile" className="hidden-risk-text-btn">画像</a>
        <a href="#page=guard-hidden-risk-task" className="hidden-risk-text-btn">安排排查</a>
      </div>
    ) },
  ];
  return (
    <section className="hidden-risk-card hidden-risk-rank" data-annotation-id="hidden-risk-mine-rank">
      <header>
        <span className="hidden-risk-card-title"><ShieldAlert size={16} /> 高风险煤矿排行</span>
        <div className="hidden-risk-rank-tools">
          <button className="date-chip active">按风险分</button>
          <button className="date-chip">按支撑线索数</button>
          <button className="date-chip">按核查状态</button>
          <button className="hidden-risk-link" type="button">导出 <ChevronRight size={14} /></button>
        </div>
      </header>
      <DataTable columns={columns} rows={rows} emptyText="当前筛选条件下暂无煤矿" />
      <footer className="hidden-risk-card-footer">
        {selectedType === '全部'
          ? '点击「画像」查看煤矿风险等级、评分依据、可疑点和证据；点击「安排排查」从煤矿风险等级和可疑点创建核查任务。'
          : `已聚焦“${selectedType}”相关煤矿；点击「画像」进入单矿详情后，可继续查看该可疑点的形成依据和支撑线索。`}
      </footer>
    </section>
  );
}

function TaskBackflowCard({ selectedType, matchedMineCount }: { selectedType: SuspiciousType; matchedMineCount: number }) {
  return (
    <section className="hidden-risk-card hidden-risk-inspection" data-annotation-id="hidden-risk-inspection">
      <header>
        <span className="hidden-risk-card-title"><ClipboardList size={16} /> 核查任务与风险回流</span>
        <a className="hidden-risk-link" href="#page=guard-hidden-risk-task">进入工作安排处置 <ChevronRight size={14} /></a>
      </header>
      <div className="hidden-risk-inspection-grid">
        {TASK_STATS.map((stat) => (
          <button key={stat.id} type="button" className={`hidden-risk-inspection-tile tone-${stat.tone}`}>
            <em className="hidden-risk-inspection-label">{stat.label}</em>
            <b className="hidden-risk-inspection-value">{stat.value}</b>
            <i className="hidden-risk-inspection-hint">{stat.hint}</i>
          </button>
        ))}
      </div>
      <footer className="hidden-risk-card-footer">
        {selectedType === '全部'
          ? '任务完成不等于风险自动消除；只有核查结果改变线索有效性、可疑点结论或评分依据后，才会触发风险等级维持、升高、降级或解除跟踪。'
          : `当前筛选命中 ${matchedMineCount} 家煤矿；任务区展示全局办理状态，用于判断该类可疑点后续是否还需要催办或持续跟踪。`}
      </footer>
    </section>
  );
}

/* ---------------- 画像组件 ---------------- */

function ProfileHero() {
  return (
    <section className="hidden-risk-profile-hero" data-annotation-id="hidden-risk-profile-hero">
      <div className="hidden-risk-profile-summary">
        <div>
          <span className="hidden-risk-profile-kicker">煤矿风险画像</span>
          <h2>金沙县-林华煤矿</h2>
          <p>系统基于 9 条有效线索、5 类关联关系和 3 个可疑点，判定当前存在较高隐蔽工作面风险，需要专项排查。</p>
        </div>
        <div className="hidden-risk-profile-score">
          <em>综合风险分</em>
          <b>92</b>
          <RiskLevelTag level="高风险" />
        </div>
      </div>
      <div className="hidden-risk-profile-metrics">
        <ProfileMiniMetric label="区域排名" value="第 1" hint="金沙县高风险煤矿排行" tone="danger" />
        <ProfileMiniMetric label="支撑线索" value="9 条" hint="当前有效并参与评分" tone="warn" />
        <ProfileMiniMetric label="主要可疑点" value="3 类" hint="停产疑似生产、数据遮蔽、历史复发" tone="warn" />
        <ProfileMiniMetric label="跟踪状态" value="专项排查中" hint="任务 ZXRW-20260615-001" tone="danger" />
        <ProfileMiniMetric label="回流结论" value="未降级" hint="尚未满足风险解除条件" tone="normal" />
      </div>
    </section>
  );
}

function ProfileMiniMetric({ label, value, hint, tone }: { label: string; value: string; hint: string; tone: Tone }) {
  return (
    <div className={`hidden-risk-profile-mini tone-${tone}`}>
      <em>{label}</em>
      <b>{value}</b>
      <span>{hint}</span>
    </div>
  );
}

function RiskCompositionCard() {
  const max = Math.max(...SCORE_PARTS.map((item) => item.value));
  return (
    <section className="hidden-risk-card hidden-risk-profile-card" data-annotation-id="hidden-risk-profile-score">
      <header>
        <span className="hidden-risk-card-title"><TrendingUp size={16} /> 评分构成与依据</span>
        <button className="hidden-risk-link" type="button">查看评分快照 <ChevronRight size={14} /></button>
      </header>
      <div className="hidden-risk-score-parts">
        {SCORE_PARTS.map((item) => (
          <div key={item.name} className="hidden-risk-score-part">
            <div className="hidden-risk-score-part-head"><span>{item.name}</span><b>{item.value}</b></div>
            <div className="hidden-risk-score-part-bar"><i style={{ width: `${(item.value / max) * 100}%` }} /></div>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
      <footer className="hidden-risk-card-footer">评分由线索、关联关系和核查回流共同决定；当前尚无可降低风险等级的有效回流结论。</footer>
    </section>
  );
}

function ProfileSuspiciousPointsCard() {
  const columns = [
    { key: 'point', title: '可疑点', width: 160, align: 'left' as const },
    { key: 'basis', title: '形成依据', width: 260, align: 'left' as const },
    { key: 'clues', title: '线索数', width: 80 },
    { key: 'focus', title: '核查重点', width: 360, align: 'left' as const },
    { key: 'status', title: '当前结论', width: 110, render: (row: SuspiciousPointRow) => <StatusPill status={row.status} tone={row.status === '专项排查中' ? 'danger' : 'warn'} /> },
  ];
  return (
    <section className="hidden-risk-card hidden-risk-profile-card" data-annotation-id="hidden-risk-profile-suspicious">
      <header>
        <span className="hidden-risk-card-title"><AlertTriangle size={16} /> 可疑点与检查重点</span>
        <a className="hidden-risk-link" href="#page=guard-hidden-risk-task">生成专项排查 <ChevronRight size={14} /></a>
      </header>
      <DataTable columns={columns} rows={PROFILE_SUSPICIOUS_POINTS} />
      <footer className="hidden-risk-card-footer">可疑点是连接风险评分和任务落实的对象，任务围绕煤矿和可疑点创建，不对线索本身做处置。</footer>
    </section>
  );
}

function ProfileEvidenceCard() {
  const columns = [
    { key: 'direction', title: '方向', width: 90 },
    { key: 'clueType', title: '线索类型', width: 170, align: 'left' as const },
    { key: 'time', title: '发生时间', width: 170 },
    { key: 'level', title: '等级', width: 70, render: (row: EvidenceRow) => <StatusPill status={row.level} tone={row.level === '高' ? 'danger' : 'warn'} /> },
    { key: 'validity', title: '有效性', width: 110, render: (row: EvidenceRow) => <StatusPill status={row.validity} tone={row.validity === '当前有效' ? 'normal' : 'warn'} /> },
    { key: 'scoreUse', title: '参与评分', width: 220, align: 'left' as const },
    { key: 'evidence', title: '证据材料', width: 160, align: 'left' as const },
  ];
  return (
    <section className="hidden-risk-card hidden-risk-profile-card" data-annotation-id="hidden-risk-profile-evidence">
      <header>
        <span className="hidden-risk-card-title"><ClipboardList size={16} /> 支撑线索与证据链</span>
        <a className="hidden-risk-link" href="#page=guard-hidden-risk-clue-ledger">进入线索证据台账 <ChevronRight size={14} /></a>
      </header>
      <DataTable columns={columns} rows={PROFILE_EVIDENCE} />
      <footer className="hidden-risk-card-footer">线索一经生成即参与评分或证据追溯；核查结果用于修正线索有效性和评分依据。</footer>
    </section>
  );
}

function ProfileTaskCard() {
  return (
    <section className="hidden-risk-card hidden-risk-side-card" data-annotation-id="hidden-risk-profile-task">
      <header><span className="hidden-risk-card-title"><Timer size={16} /> 最近任务</span></header>
      <div className="hidden-risk-side-list">
        <div className="hidden-risk-side-item active">
          <b>专项排查任务</b>
          <span>ZXRW-20260615-001</span>
          <p>核查停产期间疑似生产、视频离线期间人员活动、历史问题复发区域。</p>
          <StatusPill status="办理中" tone="danger" />
        </div>
        <div className="hidden-risk-side-item">
          <b>日常检查补充核查</b>
          <span>RCRW-20260610-014</span>
          <p>已补充用电负荷曲线和人员轨迹说明。</p>
          <StatusPill status="已回流" tone="normal" />
        </div>
      </div>
    </section>
  );
}

function ProfileBackflowCard() {
  return (
    <section className="hidden-risk-card hidden-risk-side-card" data-annotation-id="hidden-risk-profile-backflow">
      <header><span className="hidden-risk-card-title"><RefreshCw size={16} /> 风险回流判断</span></header>
      <div className="hidden-risk-backflow-box">
        <StatusPill status="高风险维持" tone="danger" />
        <p>当前专项排查尚未完成，关键线索仍为当前有效，未满足降级或解除跟踪条件。</p>
      </div>
      <ul className="hidden-risk-rule-list">
        <li>确认属实：维持高风险或升高，进入整改督促和复核。</li>
        <li>误报排除：修正线索有效性并重新计算评分。</li>
        <li>无持续线索且复核确认：可降级或解除跟踪。</li>
      </ul>
    </section>
  );
}

function ProfileAdviceCard() {
  return (
    <section className="hidden-risk-card hidden-risk-side-card" data-annotation-id="hidden-risk-profile-advice">
      <header><span className="hidden-risk-card-title"><ShieldCheck size={16} /> 检查建议</span></header>
      <ol className="hidden-risk-advice-list">
        <li>核查 06-14 夜间停产期间是否存在人员入井和设备运行。</li>
        <li>调取视频离线时段的现场记录、网络日志和备用监控材料。</li>
        <li>复查历史整改区域是否存在重复作业或整改不到位。</li>
        <li>任务反馈时明确每个可疑点属实、部分属实、排除或无法确认。</li>
      </ol>
    </section>
  );
}

/* ---------------- 通用辅助 ---------------- */

function RiskScoreBar({ score }: { score: number }) {
  const tone: Tone = score >= 80 ? 'danger' : score >= 60 ? 'warn' : 'normal';
  return (
    <div className={`hidden-risk-score tone-${tone}`}>
      <span className="hidden-risk-score-value">{score}</span>
      <span className="hidden-risk-score-bar"><i style={{ width: `${score}%` }} /></span>
    </div>
  );
}

function RiskLevelTag({ level }: { level: RiskLevel }) {
  const tone: Tone = level === '高风险' ? 'danger' : level === '中风险' ? 'warn' : 'normal';
  return <span className={`hidden-risk-level-tag tone-${tone}`}>{level}</span>;
}

function SuspiciousPointText({ text, selectedType }: { text: string; selectedType: SuspiciousType }) {
  if (selectedType === '全部' || !text.includes(selectedType)) return <span>{text}</span>;
  return (
    <span>
      {text.split(' / ').map((part, index) => (
        <React.Fragment key={`${part}-${index}`}>
          {index > 0 ? ' / ' : null}
          {part === selectedType ? <mark className="hidden-risk-highlight-text">{part}</mark> : part}
        </React.Fragment>
      ))}
    </span>
  );
}

function StatusPill({ status, tone }: { status: string; tone: StatusTone }) {
  return <span className={`hidden-risk-status-pill tone-${tone}`}>{status}</span>;
}

function matchesSuspiciousType(row: HighRiskMineRow, selectedType: SuspiciousType) {
  return selectedType === '全部' || row.suspiciousPoint.includes(selectedType);
}

function trackingStatusTone(status: string): StatusTone {
  if (['专项排查中', '待派发', '待办理'].includes(status)) return status === '专项排查中' ? 'danger' : 'warn';
  if (['结果已回流', '已降级'].includes(status)) return 'normal';
  if (status === '持续跟踪') return 'warn';
  return 'info';
}

function TrendIndicator({ trend }: { trend: '上升' | '下降' | '持平' }) {
  if (trend === '上升') return <span className="hidden-risk-trend-up"><ArrowUpRight size={14} />{trend}</span>;
  if (trend === '下降') return <span className="hidden-risk-trend-down"><ArrowDownRight size={14} />{trend}</span>;
  return <span className="hidden-risk-trend-flat"><Minus size={14} />{trend}</span>;
}

