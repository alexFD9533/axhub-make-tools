import * as React from "react";
import { AlertTriangle, BarChart3, ClipboardList, Clock3, Factory, Gauge, HardHat, LogOut, Network, ShieldAlert, ShieldCheck, Truck, Users, Waves, Zap } from "lucide-react";
import "./coal-quantity-comparison-clue.css";

type Props = { onExit?: (pageId?: string) => void };

const checks = [
  "核查主运输设备运行记录及煤流去向",
  "核对运输回路用电与设备启停记录",
  "复测合法工作面进尺及采高参数",
  "核查人员集中活动区域及对应时段",
  "核查瓦斯涌出量上涨时段对应的采掘区域、作业活动及煤量填报真实性",
  "核对民爆品领用、消耗和剩余数量",
];

function Trend({ kind }: { kind: "up" | "gas" }) {
  const points = kind === "gas" ? "4,60 28,48 52,36 76,36 100,32 124,20 148,12" : "4,68 28,52 52,44 76,27 100,17 124,12 148,11";
  return <svg className="coal-clue-trend" viewBox="0 0 156 82" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={`fill-${kind}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff6a30" stopOpacity=".62"/><stop offset="1" stopColor="#ff6a30" stopOpacity=".05"/></linearGradient></defs>
    <path d="M4 70H152M4 48H152M4 26H152" className="coal-clue-grid"/>
    {kind === "gas" && <polyline points="4,52 28,52 52,52 76,52 100,52 124,52 148,52" className="coal-clue-line cyan"/>}
    <polygon points={`${points} 148,70 4,70`} fill={`url(#fill-${kind})`}/><polyline points={points} className="coal-clue-line orange"/>
  </svg>;
}

function EvidenceCard({ title, icon, children, conclusion }: { title: string; icon: React.ReactNode; children: React.ReactNode; conclusion: string }) {
  return <article className="coal-clue-card"><header><span className="coal-clue-card-icon">{icon}</span><strong>{title}</strong><em>支持异常</em></header>{children}<p>{conclusion}</p></article>;
}

export function CoalQuantityComparisonCluePage({ onExit }: Props) {
  return <div className="coal-clue-viewport"><div className="coal-clue-canvas">
    <header className="coal-clue-titlebar"><h1>广元天安煤矿 - 煤量比对异常</h1><button type="button" onClick={() => onExit?.("shuan-home-command-v3-illegal-algorithms")}><LogOut aria-hidden="true"/>退出</button></header>
    <main className="coal-clue-layout">
      <aside className="coal-clue-left"><h2>异常情况</h2><div className="coal-clue-facts">
        <p><Factory/><span>煤矿名称</span><b>广元天安煤矿</b></p><p><Clock3/><span>异常时间窗口</span><b>2025-05-10 至 2025-05-16</b></p><p><ClipboardList/><span>异常结论</span><b>主运输煤量明显高于近期产量基线及合法工作面可解释煤量，存在未解释煤量。</b></p>
      </div><div className="coal-clue-metrics"><p><Truck/><span>主运输煤量</span><b>2,680<small>吨</small></b></p><p><BarChart3/><span>近期产量基线</span><b>1,520<small>吨</small></b></p><p><HardHat/><span>合法工作面可解释煤量</span><b>1,610<small>吨</small></b></p><p className="hot"><AlertTriangle/><span>未解释煤量</span><b>1,070<small>吨</small></b></p><p className="hot"><TrendingIcon/><span>较近期升高</span><b>76.3<small>%</small></b></p></div>
        <section className="coal-clue-bars"><h3>煤量对比 <small>（单位：吨）</small></h3><div className="coal-clue-bar-chart"><i/><i/><i/><i/><span className="b1" style={{height:"57%"}}><b>1,520</b><em>近期产量基线</em></span><span className="b2" style={{height:"60%"}}><b>1,610</b><em>合法可解释煤量</em></span><span className="b3" style={{height:"100%"}}><b>2,680</b><em>主运输煤量</em></span><span className="b4" style={{height:"40%"}}><b>1,070</b><em>未解释煤量</em></span></div></section>
      </aside>
      <section className="coal-clue-evidence"><h2>多源分析印证</h2><h3>直接印证</h3><div className="coal-clue-card-grid">
        <EvidenceCard title="提升运输运行时长" icon={<Clock3/>} conclusion="设备运行强度与主运输煤量同步增加。"><div className="coal-clue-compare"><span>最近7日平均<b>9.6 小时/日</b></span><span>上周期<b>6.1 小时/日</b></span><strong>提升 57.4%</strong></div><Trend kind="up"/></EvidenceCard>
        <EvidenceCard title="提升运输用电量" icon={<Zap/>} conclusion="运输回路用电增长与煤量增加相互印证。"><div className="coal-clue-compare"><span>最近7日平均<b>15.2 万 kWh/日</b></span><span>上周期<b>9.7 万 kWh/日</b></span><strong>提升 56.7%</strong></div><Trend kind="up"/></EvidenceCard>
        <EvidenceCard title="进尺工程测算" icon={<Gauge/>} conclusion="合法工作面填报基本合理，但无法解释主运输新增煤量。"><div className="coal-clue-flow"><b>进尺 4.2 米</b><i>→</i><b>测算 1,580 吨</b><i>≈</i><b>填报 1,610 吨</b></div><dl><dt>主运输煤量</dt><dd>2,680 吨</dd><dt className="orange">未解释差额</dt><dd className="orange">1,070 吨</dd></dl></EvidenceCard>
      </div><h3>关联印证</h3><div className="coal-clue-card-grid">
        <EvidenceCard title="入井人数匹配" icon={<Users/>} conclusion="人员活动强度增加，与异常采掘活动特征一致。"><div className="coal-clue-compare"><span>最近7日平均<b>612 人次/日</b></span><span>上周期<b>498 人次/日</b></span><strong>提升 22.9%</strong></div><div className="coal-clue-dual-bars"><i style={{height:"49%"}}/><i style={{height:"63%"}}/></div></EvidenceCard>
        <EvidenceCard title="相对瓦斯涌出量匹配" icon={<Waves/>} conclusion="涌出量上涨、填报煤量持平，趋势不匹配，支持异常。"><div className="coal-clue-gas-copy">相对瓦斯涌出量较上周期明显上涨；煤矿填报煤量基本没有变化。</div><Trend kind="gas"/></EvidenceCard>
        <EvidenceCard title="民爆品与采掘作业" icon={<Network/>} conclusion="民爆品消耗超出合法工程需求，存在未解释作业量。"><div className="coal-clue-compare"><span>实际消耗<b>1,850 kg</b></span><span>合法工程需用<b>1,220 kg</b></span><strong>差额 630 kg，超出 51.6%</strong></div><div className="coal-clue-dual-bars orange"><i style={{height:"54%"}}/><i style={{height:"82%"}}/></div></EvidenceCard>
      </div></section>
      <aside className="coal-clue-right"><section className="coal-clue-summary"><span><ShieldCheck/><b>直接验证<br/><strong>3</strong> 项形成证据</b></span><span><Network/><b>关联印证<br/><strong>3</strong> 项形成证据</b></span><span><AlertTriangle/><b>综合风险度<br/><strong>高</strong></b></span></section><section className="coal-clue-risk"><ShieldAlert/><div><strong>高风险</strong><p>主运输煤量真实增加的可能性较高，但合法工作面无法解释新增煤量，建议重点核查是否存在未备案采掘活动。</p></div></section><section className="coal-clue-checks"><h2>现场核查事项</h2>{checks.map((item,index)=><p key={item}><b>{index+1}</b><span>{item}</span><i>›</i></p>)}</section><section className="coal-clue-score"><BarChart3/><span>本线索风险评分贡献</span><strong>+12.6<small>分</small></strong></section></aside>
    </main>
  </div></div>;
}

function TrendingIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l6-6 4 4 6-7M16 8h4v4" fill="none" stroke="currentColor" strokeWidth="2"/></svg>; }
