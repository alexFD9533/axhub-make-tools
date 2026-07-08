import React from 'react';
import { AlertTriangle, BarChart3, Bell, CheckCircle2, ClipboardList, Download, FileText, RefreshCw, Search, Settings, ShieldAlert, SlidersHorizontal, Upload, XCircle } from 'lucide-react';
import { PageScaffold, Toolbar } from '../components/AppShell';
import { DataTable, Field, Pagination, QueryPanel, RowActions } from '../components/Primitives';

type MiningGuardPageKind =
  | 'guard-home'
  | 'guard-gas-emission-abnormal'
  | 'guard-carbon-monoxide-abnormal'
  | 'guard-pipeline-flow-abnormal'
  | 'guard-pipeline-pressure-abnormal'
  | 'guard-methane-change-abnormal'
  | 'guard-methane-constant-abnormal'
  | 'guard-stop-group-abnormal'
  | 'guard-lock-cycle-abnormal'
  | 'guard-downhole-count-abnormal'
  | 'guard-leader-handover-abnormal'
  | 'guard-downhole-inspection-abnormal'
  | 'guard-video-offline'
  | 'guard-overlimit-no-alarm'
  | 'guard-report-export'
  | 'guard-gas-emission-search'
  | 'guard-workface-query'
  | 'guard-log-query'
  | 'guard-log-router'
  | 'guard-gas-dispose'
  | 'guard-outburst-point'
  | 'guard-rule-approval'
  | 'guard-safe-risk-report';

interface GuardRow extends Record<string, unknown> {
  id: number;
  area?: string;
  mine?: string;
  level?: string;
  sensor?: string;
  start?: string;
  end?: string;
  status?: string;
  desc?: string;
  time?: string;
  operator?: string;
}

const mines = ['金沙县-林华煤矿', '金沙县-老虎石煤矿', '金沙县-新化煤矿一号井', '安晟龙凤煤矿', '偏坡寨煤矿', '吉盛煤矿', '回归煤矿', '大运煤矿'];

const guardStats = [
  { group: '疑似规避监管', items: [['异常断线', 0], ['逻辑异常', 0], ['异常标校', 0], ['涌出量不匹配', 0]] },
  { group: '传感器设置异常', items: [['风速设置异常', 0], ['一氧化碳设置', 0], ['甲烷设置异常', 0]] },
  { group: '数据高风险', items: [['馈电异常', 1], ['开停组停运异常', 0], ['瓦斯变化异常', 4], ['瓦斯涌出量异常', 0], ['一氧化碳异常', 0], ['管道流量异常', 1], ['管道压力异常', 0], ['闭锁周期异常', 2], ['视频断线', 0], ['打钻甲烷逻辑异常', 0], ['超限未报警', 0]] },
];

const anomalyMeta: Record<string, { title: string; total?: number; extraFilters?: string[]; buttons?: string[]; columns: Array<Record<string, unknown>>; rows: GuardRow[] }> = {
  'guard-gas-emission-abnormal': { title: '瓦斯涌出量异常', buttons: ['全局规则配置', '煤矿规则配置', '工作面查询'], extraFilters: ['细分类型'], columns: commonAnomalyColumns(), rows: [] },
  'guard-carbon-monoxide-abnormal': { title: '一氧化碳异常', buttons: ['全局规则配置', '煤矿规则配置'], columns: commonAnomalyColumns(), rows: [] },
  'guard-pipeline-flow-abnormal': { title: '管道流量异常', total: 1, buttons: ['全局规则配置', '煤矿规则配置'], columns: commonAnomalyColumns(), rows: [{ id: 1, area: '金沙县', mine: '金沙县-林华煤矿', level: '一级预警', sensor: '一采区瓦斯抽放泵房高负压抽放3#主管-标况瞬时流量', start: '2026-06-15 05:20:28', end: '2026-06-15 06:23:00', status: '已闭环', desc: '管道流量在指定时间段内持续异常波动，系统自动生成风险预警。' }] },
  'guard-pipeline-pressure-abnormal': { title: '管道压力异常', buttons: ['全局规则配置', '煤矿规则配置'], columns: commonAnomalyColumns(), rows: [] },
  'guard-methane-change-abnormal': { title: '瓦斯变化异常', total: 4, buttons: ['全局规则配置', '煤矿规则配置'], columns: commonAnomalyColumns(), rows: [{ id: 1, area: '金沙县', mine: '金沙县-老虎石煤矿', level: '一级预警', sensor: '11204综采工作面甲烷T1', start: '2026-06-15 15:21:51', end: '2026-06-15 15:25:18', status: '待区县核查', desc: '甲烷T1短时异常上升，需核查现场作业与通风情况。' }, { id: 2, area: '金沙县', mine: '金沙县-林华煤矿', level: '二级预警', sensor: '主回风巷甲烷T2', start: '2026-06-15 08:02:10', end: '2026-06-15 08:16:30', status: '待煤矿处置', desc: '瓦斯变化趋势异常。' }] },
  'guard-methane-constant-abnormal': { title: '瓦斯恒值异常', buttons: ['全局规则配置', '煤矿规则配置'], columns: constantColumns(), rows: [] },
  'guard-stop-group-abnormal': { title: '开停组停运异常', buttons: ['全局规则配置', '煤矿规则配置'], extraFilters: ['细分类型'], columns: stopColumns(), rows: [] },
  'guard-lock-cycle-abnormal': { title: '闭锁周期异常', total: 2, buttons: ['全局规则配置', '煤矿规则配置'], columns: lockColumns(), rows: [{ id: 1, mine: '金沙县-新化煤矿一号井', status: '已闭环', sensor: '11503备采面甲烷T2', start: '2025-08-25 08:05:53', desc: '距上次甲烷电闭锁已超过半个月' }, { id: 2, mine: '金沙县-新化煤矿一号井', status: '已闭环', sensor: '11503备采面甲烷T1', start: '2025-08-25 08:05:53', desc: '闭锁周期超期提醒' }] },
  'guard-downhole-count-abnormal': { title: '人员下井次数不达标', buttons: ['全局规则配置', '入井台账'], columns: personnelColumns(), rows: [] },
  'guard-leader-handover-abnormal': { title: '带班领导交接班异常', buttons: ['全局规则配置', '煤矿交接台账'], columns: leaderColumns(), rows: [] },
  'guard-downhole-inspection-abnormal': { title: '人员下井巡检异常', buttons: ['全局规则配置', '煤矿规则配置'], columns: inspectionColumns(), rows: [] },
  'guard-video-offline': { title: '视频断线', buttons: ['全局规则配置', '煤矿规则配置'], columns: videoColumns(), rows: [] },
  'guard-overlimit-no-alarm': { title: '超限未报警', buttons: ['全局规则配置', '煤矿规则配置'], extraFilters: ['传感器类型'], columns: overlimitColumns(), rows: [] },
};

function commonAnomalyColumns() {
  return [
    { key: 'id', title: '序号', width: 70 }, { key: 'time', title: '预警日期', width: 120, render: (row: GuardRow) => row.time || '2026-06-15' },
    { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'level', title: '级别', width: 100 },
    { key: 'sensor', title: '传感器名称', width: 260, align: 'left' as const }, { key: 'start', title: '开始时间', width: 170 }, { key: 'end', title: '结束时间', width: 170 },
    { key: 'report', title: '报备情况', width: 100, render: () => '未启用' }, { key: 'status', title: '处置环节', width: 120 },
    { key: 'desc', title: '描述', width: 360, align: 'left' as const }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> },
  ];
}
function constantColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'type', title: '风险类型', width: 140, render: () => '瓦斯恒值异常' }, { key: 'sensor', title: '传感器名称', width: 220 }, { key: 'rule', title: '规则名称', width: 160, render: () => '恒值判断' }, { key: 'start', title: '预警开始时间', width: 170 }, { key: 'end', title: '预警结束时间', width: 170 }, { key: 'desc', title: '描述', width: 360 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function stopColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'time', title: '预警日期', width: 120 }, { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'level', title: '级别', width: 100 }, { key: 'type', title: '类型细分', width: 150 }, { key: 'sensor', title: '设备名称', width: 220 }, { key: 'start', title: '开始时间', width: 170 }, { key: 'end', title: '结束时间', width: 170 }, { key: 'desc', title: '风险描述', width: 360 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function lockColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'mine', title: '企业名称', width: 190 }, { key: 'state', title: '生产状态', width: 120, render: () => '正常生产' }, { key: 'sensor', title: '传感器名称', width: 220 }, { key: 'type', title: '风险细分', width: 160, render: () => '甲烷电闭锁周期异常' }, { key: 'last', title: '上次闭锁日期', width: 170, render: () => '2025-08-08 17:54:54' }, { key: 'days', title: '距上次闭锁（天）', width: 140, render: () => '310' }, { key: 'start', title: '预警开始时间', width: 170 }, { key: 'desc', title: '描述', width: 360 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function personnelColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'state', title: '生产状态', width: 120 }, { key: 'type', title: '风险类型', width: 150 }, { key: 'month', title: '异常月份', width: 120 }, { key: 'count', title: '不达标人数', width: 120 }, { key: 'desc', title: '描述', width: 360 }, { key: 'time', title: '预警日期', width: 150 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function leaderColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'state', title: '生产状态', width: 120 }, { key: 'type', title: '风险类型', width: 150 }, { key: 'date', title: '异常日期', width: 130 }, { key: 'from', title: '交班人及班次', width: 180 }, { key: 'to', title: '接班人及班次', width: 180 }, { key: 'desc', title: '描述', width: 360 }, { key: 'time', title: '预警日期', width: 150 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function inspectionColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'state', title: '生产状态', width: 120 }, { key: 'type', title: '风险类型', width: 150 }, { key: 'name', title: '异常人员', width: 120 }, { key: 'date', title: '异常日期', width: 130 }, { key: 'desc', title: '描述', width: 360 }, { key: 'time', title: '预警日期', width: 150 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function videoColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'area', title: '市县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'state', title: '生产状态', width: 120 }, { key: 'type', title: '风险类型', width: 150 }, { key: 'rule', title: '规则名称', width: 150 }, { key: 'place', title: '摄像头安装地点', width: 240 }, { key: 'start', title: '开始时间', width: 170 }, { key: 'end', title: '结束时间', width: 170 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'desc', title: '描述', width: 320 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }
function overlimitColumns() { return [{ key: 'id', title: '序号', width: 70 }, { key: 'time', title: '预警日期', width: 120 }, { key: 'area', title: '区县', width: 90 }, { key: 'mine', title: '企业名称', width: 180 }, { key: 'sensor', title: '传感器名称', width: 240 }, { key: 'type', title: '传感器类型', width: 130 }, { key: 'start', title: '异常开始时间', width: 170 }, { key: 'status', title: '处置环节', width: 120 }, { key: 'desc', title: '描述', width: 360 }, { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }]; }

export function isMiningGuardPage(page: string): page is MiningGuardPageKind {
  return page === 'guard-home' || page in anomalyMeta || ['guard-report-export','guard-gas-emission-search','guard-workface-query','guard-log-query','guard-log-router','guard-gas-dispose','guard-outburst-point','guard-rule-approval','guard-safe-risk-report'].includes(page);
}

export function MiningGuardPage({ page }: { page: MiningGuardPageKind }) {
  if (page === 'guard-home') return <GuardDashboard />;
  if (page in anomalyMeta) return <AnomalyListPage page={page} />;
  if (page === 'guard-gas-emission-search') return <GasEmissionSearchPage />;
  if (page === 'guard-workface-query') return <WorkfaceQueryPage />;
  if (page === 'guard-log-query') return <LogQueryPage />;
  if (page === 'guard-log-router') return <LogRouterPage />;
  if (page === 'guard-gas-dispose') return <DisposePage />;
  if (page === 'guard-outburst-point') return <OutburstPointPage />;
  if (page === 'guard-rule-approval') return <RuleApprovalPage />;
  if (page === 'guard-safe-risk-report') return <SafeRiskReportPage />;
  return <ReportExportPage />;
}

function GuardDashboard() {
  return (
    <div className="guard-dashboard">
      <section className="guard-filter-bar">
        <Field label="企业名称" placeholder="请选择企业名称" type="select" />
        <label className="guard-date-line"><span>时间：</span><button className="date-chip active">当日</button><button className="date-chip">当月</button><button className="date-chip">自定义</button><div className="date-range"><em>2026-06-15</em><b>至</b><em>2026-06-15</em></div></label>
        <div className="guard-filter-actions"><button className="primary-button"><Search size={15}/>查询</button><button className="light-button"><RefreshCw size={15}/>重置</button></div>
      </section>
      <div className="guard-dashboard-grid">
        <main className="guard-main-column">
          <div className="guard-stat-row top-cards">{guardStats.slice(0,2).map((group) => <GuardStatCard key={group.group} {...group} />)}</div>
          <GuardStatCard {...guardStats[2]} wide />
          <section className="guard-chart-card"><header><span>趋势变化</span><button className="date-chip active">按日</button><button className="date-chip">按月</button><select><option>异常断线 +17</option></select></header><div className="guard-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></section>
        </main>
        <aside className="guard-side-column"><Toolbox /><DisposeSummary /><EnterpriseAbnormalTable /></aside>
      </div>
    </div>
  );
}

function GuardStatCard({ group, items, wide = false }: { group: string; items: Array<[string, number]>; wide?: boolean }) {
  return <section className={`guard-stat-card ${wide ? 'wide' : ''}`}><h2>{group}</h2><div className="guard-stat-grid">{items.map(([label, value]) => <div className="guard-stat-tile" key={label}><span>{label}<AlertTriangle size={13}/></span><b className={value > 0 ? 'danger' : ''}>{value}</b></div>)}</div></section>;
}
function Toolbox() { return <section className="guard-toolbox"><h2>工具箱</h2><div>{['报表导出','安全风险研判报告','短信通知','瓦斯涌出量查询','工作面查询','通知提醒','涌出点管理','煤矿规则审批'].map((tool, idx)=><button key={tool}>{tool}{idx>4 && <em>0</em>}</button>)}</div></section>; }
function DisposeSummary() { return <section className="guard-dispose-summary"><h2>处置管理（最近30天）</h2><div><span><ShieldAlert/>待核查异常<b>7条</b></span><span><CheckCircle2/>临近超时异常<b>0条</b></span><span><XCircle/>超时未响应异常<b>0条</b></span><span><BarChart3/>处置统计分析</span></div></section>; }
function EnterpriseAbnormalTable() { return <section className="guard-enterprise-table"><header>企业异常清单 <button>大</button><button>子</button></header><DataTable columns={[{key:'id', title:'序号', width:70},{key:'mine', title:'企业名称', width:180},{key:'a', title:'疑似规避监管', width:130},{key:'b', title:'传感器设置异常', width:150},{key:'c', title:'数据高风险', width:120}]} rows={mines.slice(0,6).map((mine, i)=>({id:i+1,mine,a:0,b:0,c:i===0?1:0}))} /></section>; }

function AnomalyListPage({ page }: { page: MiningGuardPageKind }) {
  const meta = anomalyMeta[page];
  return <PageScaffold title={meta.title}><GuardAnomalyQuery extraFilters={meta.extraFilters} /><GuardToolbar total={meta.total} buttons={meta.buttons} /><div className="monitor-list-panel guard-list-panel"><DataTable columns={meta.columns} rows={meta.rows} /></div></PageScaffold>;
}
function GuardAnomalyQuery({ extraFilters = [] }: { extraFilters?: string[] }) { return <section className="guard-query-panel"><label><span>时间：</span><button className="date-chip active">当日</button><button className="date-chip">一周</button><button className="date-chip">当月</button><button className="date-chip">自定义</button><div className="date-range"><em>2026-06-15</em><b>至</b><em>2026-06-15</em></div></label><Field label="企业名称" placeholder="请选择企业名称" type="select" /><Field label="处置环节" placeholder="请选择处置环节" type="select" /><Field label="报备情况" placeholder="请选择报备情况" type="select" />{extraFilters.map(f=><Field key={f} label={f} placeholder={`请选择${f}`} type="select" />)}<div className="sms-query-actions"><button className="primary-button"><Search size={15}/>查询</button><button className="light-button"><RefreshCw size={15}/>重置</button></div></section>; }
function GuardToolbar({ total, buttons = [] }: { total?: number; buttons?: string[] }) { return <Toolbar><button className="sms-tool-text"><RefreshCw size={15}/>刷新</button><button className="sms-tool-text"><Download size={15}/>导出</button>{buttons.map((button)=><button className="sms-tool-text" key={button}><Settings size={15}/>{button}</button>)}{typeof total === 'number' && <div className="pagination sms-pagination"><Pagination total={total}/></div>}</Toolbar>; }

function ReportExportPage() { return <PageScaffold title="报表导出"><QueryPanel><Field label="报表类型" placeholder="请选择报表类型" type="select"/><Field label="企业名称" placeholder="请选择企业名称" type="select"/><Field label="统计时间" placeholder="请选择时间"/></QueryPanel><Toolbar><button className="sms-tool-text"><Download size={15}/>导出</button></Toolbar><div className="guard-report-grid">{['异常日报','风险统计月报','处置闭环报表','企业异常清单'].map((name)=><section key={name}><FileText/><h3>{name}</h3><p>按原系统“报表导出”工具入口复刻，支持筛选后导出。</p></section>)}</div></PageScaffold>; }
function GasEmissionSearchPage() { return <PageScaffold title="瓦斯涌出量查询"><div className="guard-tabs"><button className="active">平均瓦斯涌出量查询</button><button>日瓦斯涌出增量趋势查询</button><button>日瓦斯涌出增量明细查询</button></div><GuardAnomalyQuery /><Toolbar><button className="sms-tool-text"><RefreshCw size={15}/>刷新</button><button className="sms-tool-text"><Download size={15}/>导出</button></Toolbar><section className="gas-summary"><span>工作面类型：</span><span>平均瓦斯涌出量：</span><span>断面面积：</span><span>T2传感器：</span><span>风速传感器：</span><span>平均瓦斯浓度：</span><span>平均风速：</span><span>平均风量：</span></section><DataTable columns={[{key:'time', title:'时间点'},{key:'gas', title:'瞬时涌出量'},{key:'t2', title:'T2实时值'},{key:'wind', title:'风速实时值'},{key:'flow', title:'风量实时值'}]} rows={[]} /><AuditToast /></PageScaffold>; }
function WorkfaceQueryPage() { return <PageScaffold title="工作面查询"><section className="workface-overview"><b>区县</b><b>煤矿</b><span>煤矿总数</span><strong>39</strong><span>工作面总数</span><strong>126</strong><span>分析正常工作面</span><strong>118</strong><span>分析异常工作面</span><strong>8</strong></section><QueryPanel><Field label="煤矿名称" placeholder="请选择煤矿名称" type="select" /></QueryPanel><GuardToolbar/><DataTable columns={[{key:'id', title:'序号'},{key:'mine', title:'煤矿名称'},{key:'total', title:'工作面总数'},{key:'normal', title:'分析正常工作面总数'},{key:'abnormal', title:'分析异常工作面总数'}]} rows={[]} /><AuditToast /></PageScaffold>; }
function LogQueryPage() { const rows = [{ id:1, dept:'金沙县能源局', name:'吴平志', job:'副中队长', account:'吴平志', phone:'18216705806', ip:'117.188.177.211', source:'移动端', type:'首页访问', time:'2026-06-15 20:04:48' }, { id:2, dept:'大西南矿业集团有限公司金沙县新化乡安能煤矿', name:'安能煤矿管理员', account:'520523015367', ip:'117.188.183.44', source:'PC端', type:'首页访问', time:'2026-06-15 19:57:01' }, { id:3, dept:'金沙县能源局', name:'软开部', account:'rkb', phone:'13988888881', ip:'172.19.0.100', source:'PC端', type:'首页访问', time:'2026-06-15 19:54:48' }]; return <PageScaffold title="操作日志查询"><QueryPanel><Field label="时间" placeholder="请选择时间"/><Field label="类型" placeholder="请选择类型" type="select"/><Field label="来源" placeholder="请选择来源" type="select"/><Field label="账号" placeholder="请输入账号"/></QueryPanel><GuardToolbar total={587050}/><DataTable columns={[{key:'id',title:'序号',width:70},{key:'dept',title:'部门',width:240},{key:'name',title:'姓名',width:120},{key:'job',title:'职务',width:120},{key:'account',title:'账号',width:130},{key:'phone',title:'手机号',width:140},{key:'ip',title:'IP',width:150},{key:'source',title:'来源',width:100},{key:'type',title:'类型',width:120},{key:'time',title:'创建时间',width:170}]} rows={rows}/></PageScaffold>; }
function LogRouterPage() { const rows = ['风向传感器定义异常','甲烷异常波动','馈电异常','异常上升','开停组停运异常'].map((name, i)=>({id:i+1,name,type:'算法',param:'functionCode',value:String(16+i),time:'2023-10-08 11:22:28',path:'/safe-web/guard/anomalous/detail/dataList'})); return <PageScaffold title="操作日志路由配置"><QueryPanel><Field label="名称" placeholder="请输入名称"/><Field label="路径" placeholder="请输入路径"/></QueryPanel><GuardToolbar total={70} buttons={['新增']}/><DataTable columns={[{key:'id',title:'序号',width:70},{key:'name',title:'名称',width:190},{key:'type',title:'类型',width:100},{key:'param',title:'参数名称',width:130},{key:'value',title:'参数值',width:100},{key:'time',title:'创建时间',width:170},{key:'path',title:'路径',width:300},{key:'operator',title:'操作',width:90,render:()=> <RowActions/>}]} rows={rows}/></PageScaffold>; }
function DisposePage() { const rows = ['东风煤矿','偏坡寨煤矿','兴安煤矿','吉盛煤矿','回归煤矿','大运煤矿','安晟龙凤煤矿'].map((mine,i)=>({id:i+1,mine,total:[0,9,0,3,7,5,12][i], county:[0,9,0,2,7,3,12][i], city:[0,1,0,1,4,2,11][i], closed:[0,9,0,3,7,5,12][i], mineWait:0, countyWait:0, cityWait:0, mineTimeout:i===1?1:0, countyTimeout:i===3?1:0, cityTimeout:0})); return <PageScaffold title="处置管理"><div className="guard-tabs"><button className="active">闭环统计</button><button>核查统计</button><button>煤矿处置统计</button><button>明细数据</button></div><QueryPanel><Field label="时间" placeholder="最近30天" type="select"/><Field label="风险类型" placeholder="请选择风险类型" type="select"/><Field label="企业名称" placeholder="请选择企业名称" type="select"/></QueryPanel><GuardToolbar total={39} buttons={['处置人设置']}/><DataTable columns={[{key:'id',title:'序号',width:70},{key:'mine',title:'企业名称',width:180},{key:'total',title:'异常总数',width:100},{key:'county',title:'需县核查',width:100},{key:'city',title:'需市核查',width:100},{key:'closed',title:'已闭环',width:90},{key:'mineWait',title:'待矿处置',width:100},{key:'countyWait',title:'待县处置',width:100},{key:'cityWait',title:'待市处置',width:100},{key:'mineTimeout',title:'煤矿处置超时',width:120},{key:'countyTimeout',title:'县处置超时',width:110},{key:'cityTimeout',title:'市处置超时',width:110}]} rows={rows}/></PageScaffold>; }
function OutburstPointPage() { const rows = ['东翼回风大巷','1903轨顺底抽巷','1907轨顺底抽巷','1905运输巷'].map((point,i)=>({id:i+1,area:'金沙县',mine:'安晟龙凤煤矿',point,value:[2.99,1.98,2.71,1.65][i],valid:'有效',period:'2026-04-06至2026-06-30',reason:'全风压通风巷道',reporter:'骆超',date:'2026-04-07',status:'通过',auditor:'万志来',auditTime:'2026-04-07'})); return <PageScaffold title="涌出点管理"><QueryPanel><Field label="填报时间" placeholder="当月" type="select"/><Field label="企业名称" placeholder="请选择企业名称" type="select"/><Field label="有效情况" placeholder="有效 / 已过期 / 未生效" type="select"/><Field label="审核状态" placeholder="通过 / 审批中" type="select"/></QueryPanel><GuardToolbar total={45} buttons={['批量同意','批量驳回']}/><DataTable columns={[{key:'id',title:'序号',width:70},{key:'area',title:'区县',width:90},{key:'mine',title:'煤矿名称',width:180},{key:'point',title:'涌出点名称',width:180},{key:'value',title:'日平均瓦斯涌出量(m³/min)',width:190},{key:'valid',title:'有效情况',width:100},{key:'period',title:'有效期间',width:190},{key:'reason',title:'涌出原因描述',width:180},{key:'reporter',title:'填报人',width:100},{key:'date',title:'填报日期',width:120},{key:'status',title:'审核状态',width:100},{key:'auditor',title:'审核人',width:100},{key:'auditTime',title:'审核时间',width:120}]} rows={rows}/></PageScaffold>; }
function RuleApprovalPage() { return <PageScaffold title="煤矿规则审批" rightExtra={<span className="guard-title-note">确认并配置煤矿是否需要开启特殊的单矿规则</span>}><section className="rule-metrics"><span>新增申请 <b>0 条</b></span><span>待审批 <b>0 条</b></span><span>生效中规则 <b>0 条</b></span></section><QueryPanel><Field label="煤矿名称" placeholder="请选择煤矿名称" type="select"/><Field label="规则状态" placeholder="请选择规则状态" type="select"/><Field label="申请时间" placeholder="本日 / 一周 / 本月"/></QueryPanel><GuardToolbar/><DataTable columns={[{key:'id',title:'序号'},{key:'mine',title:'煤矿名称'},{key:'time',title:'申请时间'},{key:'name',title:'调整异常名称'},{key:'date',title:'截止日期'},{key:'status',title:'规则状态'},{key:'last',title:'最后审批时间'},{key:'operator',title:'操作'}]} rows={[]} /><AuditToast /></PageScaffold>; }
function SafeRiskReportPage() { return <PageScaffold title="安全风险研判报告"><QueryPanel><Field label="分析月份" placeholder="2026-05 / 2026-04 / 2026-03" type="select"/><Field label="自定义" placeholder="请选择月份范围"/></QueryPanel><GuardToolbar/><DataTable columns={[{key:'id',title:'序号'},{key:'area',title:'分析地区'},{key:'month',title:'分析月份'},{key:'operator',title:'操作'}]} rows={[]} /><AuditToast /></PageScaffold>; }
function AuditToast() { return <div className="audit-toast guard-audit-toast"><h2>报备审核提示</h2><div className="audit-toast-body"><Bell size={16}/>您有1条报备数据待审核！<button>去审核</button></div></div>; }
