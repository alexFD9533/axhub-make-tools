import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore The direct ESM build avoids Axhub preview dependency pre-bundling.
import * as echarts from "../../../../../node_modules/echarts/dist/echarts.esm.js";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  BellRing,
  ChevronDown,
  RefreshCcw,
  Wifi,
} from "lucide-react";
import { shuanDailyRegulationAnalysis } from "./data";
import "./daily-regulation-overview.css";

type Period = "day" | "week" | "month";
type HandlingPeriod = "week" | "month";
type ChartOption = Record<string, unknown>;

const levelColors = ["#ff4e5b", "#ff871f", "#f5c31f", "#3998f4"];
const levelTones = ["red", "orange", "yellow", "blue"];

const baseAlarmRows = shuanDailyRegulationAnalysis.matrix.slice(0, 4).map((item, index) => ({
  ...item,
  tone: levelTones[index],
  color: levelColors[index],
}));

const networkRows = [
  { city: "达州市", online: 14, interrupted: 0, networked: 14 },
  { city: "乐山市", online: 13, interrupted: 0, networked: 13 },
  { city: "攀枝花市", online: 11, interrupted: 0, networked: 11 },
  { city: "广安市", online: 10, interrupted: 0, networked: 10 },
  { city: "内江市", online: 7, interrupted: 0, networked: 7 },
  { city: "广元市", online: 6, interrupted: 0, networked: 6 },
];

const categoryRows = [
  { label: "甲烷超限", value: 42 },
  { label: "CO超限", value: 30 },
  { label: "长观孔水位", value: 16 },
  { label: "矿井涌水量", value: 12 },
  { label: "区域超员", value: 11 },
  { label: "人员求救", value: 7 },
];

const periodFactors: Record<Period, number> = {
  day: 1,
  week: 6.14,
  month: 24.27,
};

function EChartView({
  option,
  className = "",
  ariaLabel,
}: {
  option: ChartOption;
  className?: string;
  ariaLabel: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const chart = echarts.init(rootRef.current, undefined, { renderer: "canvas" });
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [option]);

  return <div ref={rootRef} className={className} role="img" aria-label={ariaLabel} />;
}

function createRingOption(values: number[], centerValue: string): ChartOption {
  return {
    animationDuration: 480,
    animationEasing: "cubicOut",
    tooltip: { show: false },
    graphic: [{
      type: "text",
      left: "center",
      top: "42%",
      style: {
        text: centerValue,
        fill: "#f5fbff",
        fontSize: 25,
        fontWeight: 700,
        textAlign: "center",
      },
    }],
    series: values.map((value, index) => ({
      type: "pie",
      radius: [`${23 + index * 13}%`, `${30 + index * 13}%`],
      center: ["50%", "50%"],
      startAngle: 90,
      clockwise: true,
      silent: true,
      label: { show: false },
      emphasis: { disabled: true },
      data: [
        {
          value,
          itemStyle: { color: levelColors[index], borderRadius: 3 },
        },
        {
          value: 100 - value,
          itemStyle: { color: "rgba(52, 112, 157, 0.17)" },
        },
      ],
    })),
  };
}

export function DailyRegulationOverviewPage() {
  const [period, setPeriod] = useState<Period>("day");
  const [handlingPeriod, setHandlingPeriod] = useState<HandlingPeriod>("week");
  const [city, setCity] = useState("all");
  const [mine, setMine] = useState("all");
  const [productionStatus, setProductionStatus] = useState("normal");
  const [networkRegion, setNetworkRegion] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const factor = periodFactors[period];
  const alarmRows = useMemo(
    () => baseAlarmRows.map((item) => ({
      ...item,
      total: Math.round(item.total * factor),
      pending: Math.round(item.pending * factor),
      closed: Math.round(item.closed * factor),
    })),
    [factor],
  );
  const alarmTotal = alarmRows.reduce((sum, item) => sum + item.total, 0);
  const pendingTotal = alarmRows.reduce((sum, item) => sum + item.pending, 0);
  const closedTotal = alarmRows.reduce((sum, item) => sum + item.closed, 0);

  const receiptOption = useMemo(() => createRingOption([100, 100, 100, 100], "100%"), []);
  const handlingRate = handlingPeriod === "week" ? 82 : 86;
  const handlingOption = useMemo(
    () => createRingOption(
      handlingPeriod === "week" ? [67, 82, 72, 98] : [74, 86, 79, 99],
      `${handlingPeriod === "week" ? 82 : 86}%`,
    ),
    [handlingPeriod],
  );

  const categoryOption = useMemo<ChartOption>(() => ({
    animationDuration: 420,
    animationEasing: "cubicOut",
    grid: { left: 92, right: 46, top: 8, bottom: 28 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(3, 19, 39, .94)",
      borderColor: "rgba(57, 152, 244, .55)",
      textStyle: { color: "#dcefff" },
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 50,
      splitNumber: 5,
      axisLabel: { color: "#7491aa", fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(67, 126, 169, 0.16)" } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: categoryRows.map((item) => item.label),
      axisLabel: { color: "#c6d9e8", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [{
      type: "bar",
      data: categoryRows.map((item) => item.value),
      barWidth: 12,
      itemStyle: {
        color: "#2f91e8",
        borderRadius: [0, 3, 3, 0],
      },
      label: {
        show: true,
        position: "right",
        color: "#dcefff",
        fontSize: 11,
        formatter: "{c}",
      },
    }],
  }), []);

  const visibleNetworkRows = useMemo(
    () => networkRegion === "all"
      ? networkRows
      : networkRows.filter((item) => item.city === networkRegion),
    [networkRegion],
  );
  const visibleOnline = visibleNetworkRows.reduce((sum, item) => sum + item.online, 0);
  const visibleInterrupted = visibleNetworkRows.reduce((sum, item) => sum + item.interrupted, 0);
  const visibleNetworked = visibleNetworkRows.reduce((sum, item) => sum + item.networked, 0);
  const networkSummary = networkRegion === "all"
    ? { online: 80, interrupted: 0, networked: 80 }
    : { online: visibleOnline, interrupted: visibleInterrupted, networked: visibleNetworked };

  function handleRefresh() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 520);
  }

  return (
    <div className="daily-regulation-stats-page" data-reference-page="daily-regulation-statistics">
      <header className="daily-regulation-stats-header">
        <div className="daily-regulation-heading">
          <h1>日常监管统计</h1>
          <p>查看今日预警、联网状态和分级处置情况。</p>
        </div>
        <div className="daily-regulation-stats-actions">
          <div className="daily-regulation-period" aria-label="数据时间范围">
            {([
              ["day", "今日"],
              ["week", "近7日"],
              ["month", "近30日"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={period === value ? "active" : ""}
                aria-pressed={period === value}
                onClick={() => setPeriod(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="daily-regulation-select">
            <span className="sr-only">市州</span>
            <select value={city} aria-label="市州" onChange={(event) => {
              setCity(event.target.value);
              setMine("all");
            }}>
              <option value="all">市州</option>
              <option value="达州市">达州市</option>
              <option value="乐山市">乐山市</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </label>
          <label className="daily-regulation-select">
            <span className="sr-only">煤矿</span>
            <select value={mine} aria-label="煤矿" onChange={(event) => setMine(event.target.value)}>
              <option value="all">煤矿</option>
              <option value="示范煤矿">{city === "all" ? "示范煤矿" : `${city}示范煤矿`}</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </label>
          <button type="button" className="daily-regulation-refresh" onClick={handleRefresh}>
            <RefreshCcw className={refreshing ? "is-spinning" : ""} aria-hidden="true" />
            {refreshing ? "刷新中" : "刷新"}
          </button>
          <a href="#page=shuan-home-command-v3" className="daily-regulation-exit">
            <ArrowLeft aria-hidden="true" />返回首页
          </a>
        </div>
      </header>

      <main className="daily-regulation-stat-grid" aria-live="polite">
        <section className="daily-stat-panel daily-alarm-panel">
          <div className="daily-alarm-total">
            <div className="daily-stat-heading"><BellRing aria-hidden="true" /><strong>今日报警</strong></div>
            <b>{alarmTotal}</b>
            <span>总数</span>
          </div>
          <div className="daily-alarm-levels">
            {alarmRows.map((item) => (
              <article key={item.level} className={`daily-alarm-level level-${item.tone}`}>
                <h3>{item.level}预警</h3>
                <strong>{item.total}</strong>
                <p><span>待处置 <b>{item.pending}</b></span><i /><span>已处置 <b>{item.closed}</b></span></p>
                <em><i style={{ width: item.share }} /></em>
              </article>
            ))}
          </div>
          <div className="daily-alarm-distribution">
            <h3>分级占比分布</h3>
            <div className="daily-distribution-bar">
              {alarmRows.map((item) => <i key={item.level} style={{ width: item.share, background: item.color }} />)}
            </div>
            <div className="daily-distribution-labels">
              {alarmRows.map((item) => <span key={item.level}>{item.share}</span>)}
            </div>
            <p><span>待处置 <b>{pendingTotal}</b></span><span>已处置 <b>{closedTotal}</b></span></p>
          </div>
        </section>

        <section className="daily-stat-panel daily-handling-panel">
          <header className="daily-stat-title">
            <div><Activity aria-hidden="true" /><strong>分级预警处置</strong></div>
            <div className="daily-handling-toggle" aria-label="处置统计周期">
              <button type="button" aria-pressed={handlingPeriod === "week"} className={handlingPeriod === "week" ? "active" : ""} onClick={() => setHandlingPeriod("week")}>周</button>
              <button type="button" aria-pressed={handlingPeriod === "month"} className={handlingPeriod === "month" ? "active" : ""} onClick={() => setHandlingPeriod("month")}>月</button>
            </div>
          </header>
          <div className="daily-handling-content">
            <div className="daily-ring-legend" aria-label="预警等级图例">
              {alarmRows.map((item, index) => <span key={item.level}><i style={{ background: levelColors[index] }} />{item.level}预警</span>)}
            </div>
            <div className="daily-ring-grid">
              <div>
                <h3>煤矿处置率</h3>
                <EChartView option={receiptOption} className="daily-ring-chart" ariaLabel="煤矿处置率分级环形图，100%" />
                <p>已处置 <strong>{alarmTotal} / {alarmTotal}</strong></p>
              </div>
              <div>
                <h3>监管响应率</h3>
                <EChartView option={handlingOption} className="daily-ring-chart" ariaLabel={`监管响应率分级环形图，${handlingRate}%`} />
                <p>已响应 <strong>{closedTotal} / {alarmTotal}</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="daily-stat-panel daily-category-panel">
          <header className="daily-stat-title">
            <div><BarChart3 aria-hidden="true" /><strong>分类预警统计</strong></div>
            <span>单位：条</span>
          </header>
          <EChartView option={categoryOption} className="daily-category-chart" ariaLabel="分类预警数量横向条形图" />
        </section>

        <section className="daily-stat-panel daily-network-panel">
          <header className="daily-network-header">
            <div className="daily-stat-heading"><Wifi aria-hidden="true" /><strong>联网情况</strong></div>
            <div className="daily-network-summary">
              <span><strong>{networkSummary.online}</strong>在线矿数</span>
              <span className="is-danger"><strong>{networkSummary.interrupted}</strong>中断矿数</span>
              <span className="is-networked"><strong>{networkSummary.networked}</strong>联网矿数</span>
            </div>
            <div className="daily-network-filters">
              <select aria-label="煤矿生产状态" value={productionStatus} onChange={(event) => setProductionStatus(event.target.value)}>
                <option value="normal">正常生产</option>
                <option value="all">全部生产状态</option>
              </select>
              <select aria-label="联网区域" value={networkRegion} onChange={(event) => setNetworkRegion(event.target.value)}>
                <option value="all">全部区域</option>
                {networkRows.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}
              </select>
            </div>
          </header>
          <div className="daily-network-table" role="table" aria-label="市州煤矿联网排名">
            <div className="daily-network-table-head" role="row">
              <span>排名</span><span>市</span><span>在线矿数</span><span>中断矿数</span><span>联网矿数</span>
            </div>
            {visibleNetworkRows.map((item, index) => (
              <div key={item.city} className="daily-network-table-row" role="row">
                <span className={index < 3 ? "rank-top" : ""}>{index + 1}</span>
                <strong>{item.city}</strong>
                <div><i><b style={{ width: `${(item.online / 14) * 100}%` }} /></i><em>{item.online}</em></div>
                <em className="is-danger">{item.interrupted}</em>
                <em className="is-networked">{item.networked}</em>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
