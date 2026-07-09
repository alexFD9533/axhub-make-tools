import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Camera,
  ChevronDown,
  Clock3,
  GitBranch,
  LogOut,
  MapPinned,
  RefreshCcw,
  Route,
  Search,
  ShieldCheck,
  UserRound,
  Video,
} from 'lucide-react';

type InspectionStatus = '待签收' | '待核查' | '核查中' | '已回传' | '超时任务';
type ConclusionCode = 'confirmed' | 'partial' | 'rejected' | 'rectification' | 'city-review' | 'province-supervision';

type InspectionTask = {
  id: string;
  mine: string;
  source: string;
  campaign: string;
  assignedAt: string;
  deadline: string;
  owner: string;
  status: InspectionStatus;
  team: string;
  lead: string;
  members: string[];
  target: string;
  clueSummary: string;
  timeIn: string;
  timeOut: string;
  trajectory: string;
  gpsStatus: string;
  checklist: Array<{ title: string; result: string; level: '高' | '中' | '低' }>;
  records: string[];
  media: Array<{ label: string; type: 'photo' | 'video'; count: string }>;
  conclusions: Array<{ code: ConclusionCode; label: string; recommended?: boolean }>;
  nextStep: string;
};

const countyInspectionTasks: InspectionTask[] = [
  {
    id: 'XC-20260708-01',
    mine: '达州兴隆煤矿',
    source: '瓦斯曲线异常 + 夜间人员停留',
    campaign: '隐蔽工作面专项整治',
    assignedAt: '07-08 08:40',
    deadline: '07-09 18:00',
    owner: '达川区监管组',
    status: '待签收',
    team: '县级联合核查一组',
    lead: '王海东',
    members: ['驻矿监管员 1 名', '机电专家 1 名', '执法记录员 1 名'],
    target: '31203 回风巷、夜班入井轨迹、瓦斯超限联动记录',
    clueSummary: '算法连续 3 次命中停产期间疑似生产，伴随局部风量波动和夜间轨迹聚集。',
    timeIn: '待入场',
    timeOut: '待离场',
    trajectory: '待生成',
    gpsStatus: '待签到',
    checklist: [
      { title: '核对停产状态与现场作业面实际活动', result: '待执行', level: '高' },
      { title: '抽查瓦斯传感器、风门和闭锁联动', result: '待执行', level: '高' },
      { title: '核对夜班入井台账与定位轨迹', result: '待执行', level: '中' },
    ],
    records: [
      '08:40 市级线索转县级核查，任务待签收。',
      '08:46 系统自动推送核查重点清单与风险截图。',
    ],
    media: [
      { label: '现场照片', type: 'photo', count: '0/6' },
      { label: '执法视频', type: 'video', count: '0/2' },
    ],
    conclusions: [
      { code: 'confirmed', label: '属实' },
      { code: 'partial', label: '部分属实' },
      { code: 'rejected', label: '不属实' },
      { code: 'rectification', label: '转整改', recommended: true },
      { code: 'city-review', label: '转市级研判' },
      { code: 'province-supervision', label: '建议挂牌督办' },
    ],
    nextStep: '签收后进入现场核查，若发现隐蔽作业证据，优先转整改并同步市级研判。',
  },
  {
    id: 'XC-20260708-02',
    mine: '宜宾安平煤矿',
    source: '监控断点 + 甲烷趋势漂移',
    campaign: '监控系统造假专项整治',
    assignedAt: '07-08 07:55',
    deadline: '07-08 20:00',
    owner: '珙县监管组',
    status: '待核查',
    team: '县级联合核查二组',
    lead: '刘颖',
    members: ['驻矿监管员 1 名', '监测专家 1 名', '执法记录员 1 名'],
    target: '监控主机、断点时段、瓦斯监测和停送电日志',
    clueSummary: '监控断点与甲烷曲线平直异常重叠，疑似存在监测遮蔽行为。',
    timeIn: '09:20',
    timeOut: '待离场',
    trajectory: '县局 -> 安平煤矿 -> 监控室 -> 回风巷',
    gpsStatus: '已签到，轨迹回传中',
    checklist: [
      { title: '核查监控主机与采集器在线状态', result: '待完成', level: '高' },
      { title: '抽检断点前后传感器原始记录', result: '待完成', level: '高' },
      { title: '调阅停送电日志与人员值守记录', result: '待完成', level: '中' },
    ],
    records: [
      '08:10 县级任务签收完成。',
      '09:20 核查组到矿签到，进入监控室调阅原始数据。',
      '09:45 发现断点时段存在人工重启痕迹，待现场固定证据。',
    ],
    media: [
      { label: '现场照片', type: 'photo', count: '4/6' },
      { label: '执法视频', type: 'video', count: '1/2' },
    ],
    conclusions: [
      { code: 'confirmed', label: '属实', recommended: true },
      { code: 'partial', label: '部分属实' },
      { code: 'rejected', label: '不属实' },
      { code: 'rectification', label: '转整改' },
      { code: 'city-review', label: '转市级研判' },
      { code: 'province-supervision', label: '建议挂牌督办' },
    ],
    nextStep: '完成证据固定后可直接认定属实，并将结论同步转市级研判复核。',
  },
  {
    id: 'XC-20260708-03',
    mine: '乐山忠达煤矿',
    source: '人员定位偏差 + 入井人数不匹配',
    campaign: '隐瞒入井人数专项整治',
    assignedAt: '07-08 06:20',
    deadline: '07-08 18:00',
    owner: '犍为县监管组',
    status: '核查中',
    team: '县级联合核查三组',
    lead: '周成',
    members: ['驻矿监管员 2 名', '人员定位专家 1 名'],
    target: '井口考勤、人员定位基站、夜班排班与值守记录',
    clueSummary: '夜班入井人数与定位在线人数连续两班次偏差超过 12%。',
    timeIn: '07:30',
    timeOut: '待离场',
    trajectory: '县局 -> 井口签到 -> 调度室 -> 基站区域 -> 井口复核',
    gpsStatus: '轨迹正常，弱网断续补传',
    checklist: [
      { title: '核对夜班入井人数与井口虹膜记录', result: '已完成', level: '高' },
      { title: '检查定位基站离线与补传情况', result: '进行中', level: '高' },
      { title: '抽查班组长点名台账', result: '进行中', level: '中' },
    ],
    records: [
      '07:30 到矿签到并接收矿方陪同。',
      '08:05 井口考勤与定位人数差异锁定在夜班二采区。',
      '08:42 基站补传日志存在 27 分钟空窗，已要求导出原始包。',
    ],
    media: [
      { label: '现场照片', type: 'photo', count: '6/6' },
      { label: '执法视频', type: 'video', count: '2/2' },
    ],
    conclusions: [
      { code: 'confirmed', label: '属实' },
      { code: 'partial', label: '部分属实', recommended: true },
      { code: 'rejected', label: '不属实' },
      { code: 'rectification', label: '转整改' },
      { code: 'city-review', label: '转市级研判' },
      { code: 'province-supervision', label: '建议挂牌督办' },
    ],
    nextStep: '待补齐基站原始数据后，优先认定为部分属实并转整改，必要时请市级复核定位链路。',
  },
  {
    id: 'XC-20260708-04',
    mine: '广元青排煤矿',
    source: '煤流持续运行 + 停产期间疑似生产',
    campaign: '隐蔽工作面专项整治',
    assignedAt: '07-07 15:10',
    deadline: '07-08 12:00',
    owner: '旺苍县监管组',
    status: '已回传',
    team: '县级联合核查四组',
    lead: '陈宇',
    members: ['驻矿监管员 1 名', '采掘专家 1 名'],
    target: '停产通知、皮带运行记录、作业面活动痕迹',
    clueSummary: '停产期间煤流与皮带电流持续活跃，疑似局部违规作业。',
    timeIn: '07-07 16:00',
    timeOut: '07-07 20:10',
    trajectory: '县局 -> 调度室 -> 皮带机巷 -> 采面',
    gpsStatus: '轨迹与照片水印一致',
    checklist: [
      { title: '核查停产通知与生产组织记录', result: '已完成', level: '高' },
      { title: '核对皮带运行和电流历史曲线', result: '已完成', level: '高' },
      { title: '抽查采面活动痕迹与现场堆煤', result: '已完成', level: '中' },
    ],
    records: [
      '16:20 皮带机巷地面积煤与近时段运行数据匹配。',
      '17:30 采面发现近期作业痕迹，已拍照留证。',
      '20:10 县级核查结论回传，建议转整改并同步市级研判。',
    ],
    media: [
      { label: '现场照片', type: 'photo', count: '8/8' },
      { label: '执法视频', type: 'video', count: '2/2' },
    ],
    conclusions: [
      { code: 'confirmed', label: '属实' },
      { code: 'partial', label: '部分属实' },
      { code: 'rejected', label: '不属实' },
      { code: 'rectification', label: '转整改', recommended: true },
      { code: 'city-review', label: '转市级研判' },
      { code: 'province-supervision', label: '建议挂牌督办' },
    ],
    nextStep: '等待市级确认是否追加专项复核；县级已完成回传。',
  },
  {
    id: 'XC-20260708-05',
    mine: '泸州宏达煤矿',
    source: '多类异常叠加未闭环',
    campaign: '综合线索复核',
    assignedAt: '07-07 09:00',
    deadline: '07-08 10:00',
    owner: '古蔺县监管组',
    status: '超时任务',
    team: '县级联合核查五组',
    lead: '谢波',
    members: ['驻矿监管员 1 名', '通风专家 1 名'],
    target: '回风巷、停送电记录、瓦斯与人员轨迹交叉点',
    clueSummary: '前序核查未形成明确认定，任务已超时 2 小时。',
    timeIn: '07-07 10:10',
    timeOut: '待补录',
    trajectory: '县局 -> 矿区 -> 井口 -> 调度室',
    gpsStatus: '存在离场未签退',
    checklist: [
      { title: '补录离场时间与轨迹', result: '超时未补', level: '高' },
      { title: '补全照片与视频证据', result: '超时未补', level: '中' },
      { title: '形成结论并明确流转方向', result: '超时未补', level: '高' },
    ],
    records: [
      '07-07 18:20 初步回传材料缺少离场时间与完整媒体证据。',
      '07-08 08:30 系统自动催办。',
      '07-08 10:00 任务进入超时状态，待县局补录并上报原因。',
    ],
    media: [
      { label: '现场照片', type: 'photo', count: '3/6' },
      { label: '执法视频', type: 'video', count: '0/2' },
    ],
    conclusions: [
      { code: 'confirmed', label: '属实' },
      { code: 'partial', label: '部分属实' },
      { code: 'rejected', label: '不属实' },
      { code: 'rectification', label: '转整改' },
      { code: 'city-review', label: '转市级研判', recommended: true },
      { code: 'province-supervision', label: '建议挂牌督办' },
    ],
    nextStep: '优先补齐证据并转市级研判，避免县级直接空结论闭环。',
  },
];

const summaryMetrics = [
  { label: '待签收', value: '4', hint: '含 2 条高风险线索' },
  { label: '待核查', value: '9', hint: '已下发待到矿' },
  { label: '核查中', value: '7', hint: '3 条弱网补传' },
  { label: '已回传', value: '18', hint: '今日已形成结论' },
  { label: '超时任务', value: '2', hint: '需县局补录原因' },
] as const;

const statusToneMap: Record<InspectionStatus, string> = {
  待签收: 'amber',
  待核查: 'blue',
  核查中: 'cyan',
  已回传: 'green',
  超时任务: 'red',
};

export function CountyInspectionPage({ onExit }: { onExit?: () => void }) {
  const [selectedTaskId, setSelectedTaskId] = useState(countyInspectionTasks[1].id);
  const [keyword, setKeyword] = useState('');

  const visibleTasks = useMemo(() => {
    const normalizedKeyword = keyword.trim();
    if (!normalizedKeyword) return countyInspectionTasks;
    return countyInspectionTasks.filter((item) =>
      item.mine.includes(normalizedKeyword)
      || item.source.includes(normalizedKeyword)
      || item.campaign.includes(normalizedKeyword)
      || item.owner.includes(normalizedKeyword),
    );
  }, [keyword]);

  const selectedTask = visibleTasks.find((item) => item.id === selectedTaskId) || countyInspectionTasks[1];

  return (
    <div className="drill-page drill-county-inspection-page tone-cyan">
      <section className="county-inspection-header">
        <div className="county-inspection-title">
          <div>
            <h1>现场核查 / 县级走访</h1>
            <p>围绕县级执行现场的签收、核查、认定和流转，统一承接打非治违分级协同处置任务。</p>
          </div>
          {onExit ? (
            <button type="button" className="county-inspection-exit" onClick={onExit}>
              <LogOut aria-hidden="true" />
              <span>退出</span>
            </button>
          ) : (
            <a className="county-inspection-exit" href="#page=shuan-home-command-v3">
              <LogOut aria-hidden="true" />
              <span>退出</span>
            </a>
          )}
        </div>

        <div className="county-inspection-toolbox" aria-label="现场核查工具箱">
          <div className="county-inspection-filters">
            <label className="county-inspection-filter wide">
              <span>统计时间</span>
              <button type="button">
                <em>2026-07-08 00:00</em>
                <i>~</i>
                <em>2026-07-08 23:59</em>
                <CalendarDays aria-hidden="true" />
              </button>
            </label>
            <label className="county-inspection-filter">
              <span>所属区域</span>
              <button type="button">全部县区<ChevronDown aria-hidden="true" /></button>
            </label>
            <label className="county-inspection-filter">
              <span>专项类型</span>
              <button type="button">全部专项<ChevronDown aria-hidden="true" /></button>
            </label>
            <label className="county-inspection-filter">
              <span>任务状态</span>
              <button type="button">全部状态<ChevronDown aria-hidden="true" /></button>
            </label>
          </div>
          <div className="county-inspection-actions">
            <label className="county-inspection-search">
              <Search aria-hidden="true" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索煤矿 / 线索 / 责任组"
                aria-label="搜索现场核查任务"
              />
            </label>
            <button type="button"><RefreshCcw aria-hidden="true" />刷新任务</button>
            <button type="button">批量催办</button>
          </div>
        </div>
      </section>

      <section className="county-inspection-metrics" aria-label="现场核查核心指标">
        {summaryMetrics.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <em>{item.hint}</em>
          </article>
        ))}
      </section>

      <main className="county-inspection-main">
        <section className="county-inspection-panel county-inspection-table-panel">
          <header className="county-inspection-panel-head">
            <div>
              <h2>核查任务清单</h2>
              <p>回答“谁去查、查了什么”，并在任务级别确认当前执行状态。</p>
            </div>
            <span>共 {visibleTasks.length} 条</span>
          </header>
          <div className="county-inspection-table">
            <div className="county-inspection-table-row head">
              <span>煤矿名称</span>
              <span>线索来源</span>
              <span>所属专项</span>
              <span>派发时间</span>
              <span>截止时间</span>
              <span>当前负责人</span>
              <span>状态</span>
            </div>
            {visibleTasks.map((task) => (
              <button
                type="button"
                key={task.id}
                className={`county-inspection-table-row${task.id === selectedTask.id ? ' active' : ''}`}
                onClick={() => setSelectedTaskId(task.id)}
              >
                <span>{task.mine}</span>
                <span>{task.source}</span>
                <span>{task.campaign}</span>
                <span>{task.assignedAt}</span>
                <span>{task.deadline}</span>
                <span>{task.owner}</span>
                <span><em className={`status-tag ${statusToneMap[task.status]}`}>{task.status}</em></span>
              </button>
            ))}
          </div>
        </section>

        <aside className="county-inspection-side">
          <section className="county-inspection-panel county-inspection-summary-panel">
            <header className="county-inspection-panel-head">
              <div>
                <h2>当前执行摘要</h2>
                <p>回答“谁去查、现场怎么跑”。</p>
              </div>
              <em className={`status-tag ${statusToneMap[selectedTask.status]}`}>{selectedTask.status}</em>
            </header>
            <div className="county-inspection-owner-card">
              <div className="county-inspection-owner-row">
                <span><UserRound aria-hidden="true" />核查组</span>
                <strong>{selectedTask.team}</strong>
              </div>
              <div className="county-inspection-owner-row">
                <span>当前负责人</span>
                <strong>{selectedTask.lead}</strong>
              </div>
              <div className="county-inspection-owner-row">
                <span>同行人员</span>
                <strong>{selectedTask.members.join(' / ')}</strong>
              </div>
              <div className="county-inspection-owner-row">
                <span>核查对象</span>
                <strong>{selectedTask.target}</strong>
              </div>
              <div className="county-inspection-owner-row">
                <span>线索摘要</span>
                <strong>{selectedTask.clueSummary}</strong>
              </div>
            </div>
          </section>

          <section className="county-inspection-panel county-inspection-flow-panel">
            <header className="county-inspection-panel-head">
              <div>
                <h2>下一步流向</h2>
                <p>回答“现场如何认定、下一步流向哪”。</p>
              </div>
            </header>
            <div className="county-inspection-conclusion-list">
              {selectedTask.conclusions.map((item) => (
                <span key={item.code} className={item.recommended ? 'recommended' : ''}>
                  {item.label}
                </span>
              ))}
            </div>
            <div className="county-inspection-next-step">
              <strong>推荐流向</strong>
              <p>{selectedTask.nextStep}</p>
            </div>
            <div className="county-inspection-route-chain">
              <span>县级核查</span>
              <i aria-hidden="true" />
              <span>结果认定</span>
              <i aria-hidden="true" />
              <span>整改 / 市级研判 / 挂牌督办</span>
            </div>
          </section>
        </aside>
      </main>

      <section className="county-inspection-detail-grid">
        <section className="county-inspection-panel">
          <header className="county-inspection-panel-head">
            <div>
              <h2><ShieldCheck aria-hidden="true" />核查重点清单</h2>
              <p>回答“查了什么”。</p>
            </div>
          </header>
          <div className="county-inspection-checklist">
            {selectedTask.checklist.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <div>
                  <span className={`level-tag level-${item.level}`}>{item.level}</span>
                  <em>{item.result}</em>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="county-inspection-panel">
          <header className="county-inspection-panel-head">
            <div>
              <h2><Clock3 aria-hidden="true" />现场记录</h2>
              <p>回答“现场如何认定”。</p>
            </div>
          </header>
          <ol className="county-inspection-records">
            {selectedTask.records.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        <section className="county-inspection-panel">
          <header className="county-inspection-panel-head">
            <div>
              <h2><Camera aria-hidden="true" />照片视频</h2>
              <p>检查证据是否齐备、是否足以支持认定。</p>
            </div>
          </header>
          <div className="county-inspection-media">
            {selectedTask.media.map((item) => (
              <article key={item.label}>
                <span>{item.type === 'photo' ? <Camera aria-hidden="true" /> : <Video aria-hidden="true" />}{item.label}</span>
                <strong>{item.count}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="county-inspection-panel">
          <header className="county-inspection-panel-head">
            <div>
              <h2><Route aria-hidden="true" />GPS / 轨迹与到离场</h2>
              <p>检查是否完成签到、签退和过程轨迹回传。</p>
            </div>
          </header>
          <div className="county-inspection-track">
            <p><MapPinned aria-hidden="true" />轨迹摘要：{selectedTask.trajectory}</p>
            <p><Clock3 aria-hidden="true" />到场时间：{selectedTask.timeIn}</p>
            <p><Clock3 aria-hidden="true" />离场时间：{selectedTask.timeOut}</p>
            <p><GitBranch aria-hidden="true" />GPS 状态：{selectedTask.gpsStatus}</p>
          </div>
        </section>
      </section>
    </div>
  );
}
