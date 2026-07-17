import React, { useState } from 'react';
import { Activity, BellRing, BrainCircuit, CalendarDays, ChevronRight, CircleCheck, Database, FileSearch, Flame, RefreshCw, ShieldAlert, UsersRound, Wind, Zap } from 'lucide-react';
import networkOrb from '../../../resources/shuan/risk-agent/hidden-workface-network.png';
import './RiskAgentDetailPage.css';

const clues = [
  [Zap, '电', '临时停电频繁波动', '12 条'], [Wind, '风', '局扇电流异常偏高', '14 条'],
  [Activity, '煤', '运输环节粉尘超限', '10 条'], [UsersRound, '人', '人员定位信号丢失', '8 条'], [Flame, '瓦斯', '瓦斯浓度波动异常', '15 条'],
] as const;

const rows = [
  ['2026-07-15 08:42:13', '电', '回采工作面下顺槽局部停电 3 次，持续 12–28 秒', '电-风', '电-人'],
  ['2026-07-15 08:35:41', '风', '局扇电流突升至 115A，较基线偏高 35%', '风-瓦斯', '风-煤'],
  ['2026-07-15 08:28:56', '煤', '皮带转载点粉尘浓度 58mg/m³，超限 2.9 倍', '煤-人', '煤-瓦斯'],
  ['2026-07-15 08:17:33', '人', '102 号支架工区域人员定位信号中断 2 分 14 秒', '人-瓦斯', '人-电'],
  ['2026-07-15 08:09:27', '瓦斯', '工作面上隅角瓦斯浓度 0.9%，波动幅度异常', '瓦斯-风', '瓦斯-电'],
];

export function RiskAgentDetailPage() {
  const [updated, setUpdated] = useState(false);
  return (
    <div className="ra-page">
      <header className="ra-head">
        <div><span>综合风险评估智能体 / 专项研判详情</span><h1>达州县河煤矿 <i>/</i> 隐蔽工作面专项风险研判</h1></div>
        <div className="ra-meta">生产状态：<b>● 正常生产</b>　所属区域：达州市 · 渠县　数据更新时间：2026-07-15 09:30:00 <button type="button" onClick={() => setUpdated(true)}><RefreshCw size={15} className={updated ? 'is-refreshing' : ''}/>{updated ? '已更新' : '扩充证据'}</button></div>
      </header>
      <section className="ra-steps" aria-label="五步智能体研判链路">
        {['异常线索汇聚', '大模型辅助综合分析', '评分算法计算', '任务阈值触发', '检查回流修正'].map((name, index) => <React.Fragment key={name}>
          <div><b>0{index + 1}</b><span>{name}<small>{['汇聚异常线索', '提取语义关系', '线索基础分 + 综合分析分', '阈值判定与任务触发', '任务回流修正与风险更新'][index]}</small></span></div>
          {index < 4 && <ChevronRight aria-hidden="true"/>}
        </React.Fragment>)}
      </section>
      <section className="ra-flow">
        <article><header><BellRing/>异常线索汇聚</header>{clues.map(([Icon, name, description, count]) => <p className="ra-clue" key={name}><Icon/><b>{name}</b><span>{description}</span><em>{count}</em></p>)}<footer>共 <b>59</b> 条异常线索</footer></article>
        <article className="ra-brain"><header><BrainCircuit/>大模型辅助综合分析</header><div className="ra-brainbody"><img className="ra-network-orb" src={networkOrb} alt="多源线索关系网络"/><div><b>综合结论</b><p>隐蔽工作面存在异常联动，局部通风、用电负荷、人员轨迹进入受限区域的风险特征显著。</p>{[['时间窗口关联', '+9.6'], ['对象一致性关联', '+8.4'], ['多源印证', '+23.1'], ['数据质量评分修正', '-2.6']].map(([label, value]) => <span key={label}>{label}<em>{value}</em></span>)}</div></div><footer>语义理解 · 关系分析 · 证据融合</footer></article>
        <article><header><Database/>评分算法计算</header><div className="ra-score"><div>线索基础分<b>41.7</b><small>来自 228 条已评分线索</small></div><strong>+</strong><div>综合分析分<b>38.5</b><small>基于分析结果计算</small></div><strong>=</strong><div className="danger">任务触发前得分<b>80.2</b><small>触发阈值：80</small></div></div></article>
        <article><header><ShieldAlert/>任务阈值触发</header><div className="ra-gauge">市级阈值<b>80</b><small>已跨越阈值线</small></div><p className="ra-status">任务状态<b>执行中</b></p></article>
        <article className="ra-back"><header><RefreshCw/>检查回流修正</header><div>任务回流修正分<b>-5.3</b><small>（核查为正常 / 已整改等）</small></div><div className="ra-current">当前风险分<strong>74.9</strong><small>/100</small><em>高风险</em></div><footer>触发时得分 <b>80.2</b>　当前风险分 <b>74.9</b></footer></article>
      </section>
      <section className="ra-bottom">
        <article><header><FileSearch/>关键异常线索（节选）</header><table><thead><tr><th>时间</th><th>维度</th><th>异常事实描述</th><th>证据成熟度</th><th>跨专题关联</th><th>操作</th></tr></thead><tbody>{rows.map(([time, dimension, description, tagOne, tagTwo]) => <tr key={time}><td>{time}</td><td><b className="dim">{dimension}</b></td><td>{description}</td><td className="stars">★★★★<i>★</i></td><td><span>{tagOne}</span><span>{tagTwo}</span></td><td><a href="#page=guard-hidden-risk-clue-ledger">分析证据</a></td></tr>)}</tbody></table></article>
        <article className="ra-tasks"><header><CalendarDays/>检查任务要点与方向<small>任务下发时间：2026-07-15 10:05:21</small></header>{['通风系统稳定性与异常波动成因排查', '瓦斯监测与超限处置闭环管理', '电气设备防爆性能与故障隐患排查'].map((title, index) => <div className="task" key={title}><b>{index + 1}</b><p><strong>{title}</strong><span>{['重点排查局扇运行状态、风量波动、风门联锁及风筒阻塞情况', '核查瓦斯传感器校准、报警响应、超限处置与记录完整性', '检查电气设备防爆完整性、接线盒密封与漏电保护有效性'][index]}</span></p><CircleCheck/></div>)}<a className="ra-btn" href="#page=guard-hidden-risk-task">查看任务详情 <ChevronRight/></a></article>
      </section>
    </div>
  );
}
