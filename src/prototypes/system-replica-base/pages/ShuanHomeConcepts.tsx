import React, { useState } from 'react';
import { ChevronDown, Settings, UserRound } from 'lucide-react';
import sichuanMapSvg from '../../../resources/shuan/sichuan-map.svg?raw';
import { normalizeInlineSvg } from '../../../common/inlineSvg';
import cockpitIconsSprite from '../../../resources/shuan/cockpit/icons.svg?raw';

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
  ['正常生产', '278处', 'mine'],
  ['正常建设', '73处', 'shield'],
  ['停产停建', '130处', 'warning'],
  ['长期关停', '4处', 'check'],
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
  ['煤矿基础数据', '煤矿档案、企业信息、证照、采矿权、井田范围', '已汇聚', '36项'],
  ['安全监测数据', '甲烷、CO、风速、风压、水位、烟雾、设备状态', '已汇聚', '58项'],
  ['人员与用工数据', '人员定位、入井出井、带班领导、特种作业、社保参保', '已汇聚', '41项'],
  ['生产运行数据', '产量、进尺、采掘工作面、班次、报备、用电量', '已汇聚', '32项'],
  ['自然灾害数据', '降雨、水文、地震、地质灾害、气象预警', '已汇聚', '24项'],
  ['事故与保障数据', '事故记录、应急资源、救援队伍、物资储备', '已汇聚', '19项'],
];

const dataStabilityStats = [
  ['最近更新', '2分钟前'],
  ['今日数据批次', '1,286批'],
  ['延迟波动', '5项'],
  ['中断待恢复', '2项'],
];

const alarmLevels = [
  ['红色', '9', '7.6%', 'red'],
  ['橙色', '22', '18.6%', 'orange'],
  ['黄色', '47', '39.8%', 'yellow'],
  ['蓝色', '40', '33.9%', 'blue'],
] as const;

const classifiedAlarmRows = [
  { name: '环境监测', items: [['甲烷超限', 42], ['CO超限', 30]] },
  { name: '人员定位', items: [['区域超员', 11], ['人员求救', 7]] },
  { name: '水害防治', items: [['长观孔水位', 16], ['矿井涌水量', 12]] },
];

const reminderTasks = [
  { tone: 'amber', title: '生产证照核验', highlight: '3家过期', detail: '需在72小时内完成现场核验与登记。', action: '去核验' },
  { tone: 'cyan', title: '重大灾害预警', highlight: '2条', detail: '暴雨1条、地震1条，已派单矿调度。', action: '去派单' },
] as const;

const analysisWarningRows = [
  { id: 'gas', name: '瓦斯', count: '18条', icon: 'cloud' as CockpitIconName, alarms: [['瓦斯超限未报警', '9条', '4处待核查'], ['瓦斯变化异常', '6条', '2处待处置'], ['瓦斯恒值异常', '3条', '2处待确认'], ['甲烷传感器离线', '8台', '3处待恢复'], ['校准异常', '5项', '1项待复核']] },
  { id: 'wind', name: '通风', count: '12条', icon: 'fan' as CockpitIconName, alarms: [['主通风机全停', '8条', '2处待核查'], ['风量异常', '14条', '3处待处置'], ['风压异常', '9条', '1处待确认'], ['风筒报警', '18条', '4处待核查'], ['局扇停运异常', '6台', '2处待恢复']] },
  { id: 'personnel', name: '人员', count: '15条', icon: 'users' as CockpitIconName, alarms: [['超核定人数', '11条', '2处待核查'], ['越界停留', '7条', '1处待处置'], ['带班空岗', '10条', '2处待确认'], ['入井轨迹异常', '6条', '2处待核查'], ['特种作业证异常', '4项', '1项待确认']] },
  { id: 'coal', name: '产量', count: '9条', icon: 'mine' as CockpitIconName, alarms: [['产量异常波动', '6条', '1处待核查'], ['进出煤量不符', '8条', '1处待处置'], ['夜间异常出煤', '4条', '1处待确认'], ['停产报备产量', '3条', '1处待核查'], ['采掘面进尺异常', '5项', '2项待确认']] },
  { id: 'power', name: '电量', count: '13条', icon: 'zap' as CockpitIconName, alarms: [['用电负荷突降', '10条', '2处待核查'], ['停产用电异常', '6条', '1处待处置'], ['电量煤量倒挂', '8条', '1处待确认'], ['夜间负荷异常', '7条', '2处待核查'], ['主扇电流异常', '5条', '1处待恢复']] },
];

const closureRows: Array<[string, string, string, CockpitIconName]> = [
  ['矿处置', '276件', '1011件', 'building'],
  ['县核查', '132件', '915件', 'shield'],
  ['市确认', '68件', '847件', 'building'],
  ['省确认', '24件', '823件', 'badge'],
];

const mapPoints = [
  { name: '阿坝州', x: 47, y: 32, mineCount: '23处', alarmCount: 6, risk: 'yellow' as const },
  { name: '广元市', x: 73, y: 38, mineCount: '81处', alarmCount: 14, risk: 'orange' as const },
  { name: '达州市', x: 86, y: 55, mineCount: '190处', alarmCount: 38, risk: 'red' as const },
  { name: '成都市', x: 52, y: 61, mineCount: '138处', alarmCount: 22, risk: 'orange' as const },
  { name: '乐山市', x: 48, y: 73, mineCount: '65处', alarmCount: 17, risk: 'yellow' as const },
  { name: '宜宾市', x: 61, y: 82, mineCount: '51处', alarmCount: 21, risk: 'orange' as const },
  { name: '凉山州', x: 44, y: 89, mineCount: '32处', alarmCount: 7, risk: 'yellow' as const },
  { name: '甘孜州', x: 28, y: 55, mineCount: '2处', alarmCount: 1, risk: 'blue' as const },
];

const riskLegend = [
  { key: 'red', label: '红色预警' },
  { key: 'orange', label: '橙色预警' },
  { key: 'yellow', label: '黄色预警' },
  { key: 'blue', label: '蓝色提示' },
  { key: 'safe', label: '运行正常' },
] as const;

const normalizedSichuanMapSvg = normalizeInlineSvg(sichuanMapSvg);

function CockpitIconSprite() {
  return <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: cockpitIconsSprite }} />;
}

function CockpitIcon({ name, className = '' }: { name: CockpitIconName; className?: string }) {
  return (
    <svg className={`cockpit-svg-icon ${className}`} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}

function TopHeader() {
  return (
    <header className="shuan-header">
      <div className="shuan-brand">
        <span className="shuan-emblem">蜀</span>
        <div className="shuan-title">蜀安多源异构监测系统</div>
      </div>
      <nav className="command-nav" aria-label="系统顶部导航">
        {navItems.map(([label, icon]) => (
          <button key={label} type="button" className={label === '首页' ? 'active' : ''}>
            <CockpitIcon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="shuan-top-tools">
        <button type="button" className="shuan-region">四川 <ChevronDown /></button>
        <button type="button" className="shuan-tool-badge" aria-label="报警消息"><CockpitIcon name="bell" /><b>0</b></button>
        <button type="button" className="shuan-tool-round" aria-label="用户"><UserRound /></button>
        <span className="shuan-user">李明远 <ChevronDown /></span>
        <button type="button" className="shuan-icon-tool" aria-label="设置"><Settings /></button>
      </div>
    </header>
  );
}

function Panel({ title, children, className = '', action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <section className={`shuan-panel ${className}`}>
      <div className="panel-title">{title}</div>
      {action && <div className="panel-action">{action}</div>}
      {children}
    </section>
  );
}

function TimeRangeControl({ value, onChange, label }: { value: TimeRangeValue; onChange: (value: TimeRangeValue) => void; label: string }) {
  return (
    <div className="panel-time-range" role="group" aria-label={label}>
      {timeRangeOptions.map((option) => (
        <button key={option.value} type="button" className={value === option.value ? 'active' : ''} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

function RegulatedMinePanel() {
  return (
    <Panel title="监管煤矿情况" className="regulated-mine-panel">
      <div className="mine-overview-card">
        <div className="mine-overview-main">
          <strong>485处</strong>
          <span>监管煤矿</span>
          <em>覆盖四川主要产煤市州</em>
        </div>
        <div className="mine-status-bars">
          {mineStatusRows.map(([label, value, icon]) => (
            <span key={label}><CockpitIcon name={icon} /><b>{value}</b><em>{label}</em></span>
          ))}
        </div>
      </div>
      <div className="mine-domain-card">
        <div className="mine-domain-head"><span>生产情况</span></div>
        <div className="coal-production-grid">
          {coalProductionStats.map(([label, value, icon]) => (
            <div key={label}><CockpitIcon name={icon} /><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>
      <div className="mine-domain-card">
        <div className="mine-domain-head"><span>人员情况</span></div>
        <div className="underground-scene-grid">
          {undergroundSceneStats.map(([label, value, icon]) => (
            <div key={label}><CockpitIcon name={icon} /><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function DataAggregationPanel() {
  return (
    <Panel title="汇聚数据情况" className="data-aggregation-panel">
      <div className="data-catalog-grid">
        {dataCatalogStats.map(([label, value, icon]) => (
          <div key={label}><CockpitIcon name={icon} /><strong>{value}</strong><span>{label}</span></div>
        ))}
      </div>
      <div className="data-catalog-head" aria-hidden="true">
        <span>多源数据构成</span><span>汇聚内容</span><span>状态</span><span>资源</span>
      </div>
      <div className="data-catalog-list">
        {dataCatalogRows.map(([name, detail, state, count]) => (
          <div key={name}><span>{name}</span><p>{detail}</p><b>{state}</b><em>{count}</em></div>
        ))}
      </div>
      <div className="data-stability-strip" aria-label="汇聚稳定性">
        {dataStabilityStats.map(([label, value]) => (
          <span key={label}><em>{label}</em><b>{value}</b></span>
        ))}
      </div>
    </Panel>
  );
}

function MapStage() {
  return (
    <section className="command-map-stage">
      <div className="map-tabs"><button type="button" className="active">煤矿分布</button><button type="button">报警数量</button></div>
      <div className="shuan-map dark">
        <div className="shuan-svg-map" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
        <div className="shuan-map-points" aria-label="四川煤矿监测点位">
          {mapPoints.map((point) => (
            <div key={point.name} className={`shuan-map-point risk-${point.risk}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} role="img" aria-label={`${point.name} ${point.mineCount}，待处置报警 ${point.alarmCount} 条`}>
              <i aria-hidden="true" />
              <b><strong>{point.mineCount.replace('处', '')}</strong><small>处</small></b>
              <span>{point.name}</span>
              <u className="shuan-map-point-alarm" aria-hidden="true">待处置<b>{point.alarmCount}</b></u>
            </div>
          ))}
        </div>
        <div className="shuan-map-legend" aria-label="地图风险图例">
          {riskLegend.map((item) => <span key={item.key} className={`legend-chip tone-${item.key}`}><i aria-hidden="true" />{item.label}</span>)}
        </div>
      </div>
      <div className="map-summary"><span><b>485处</b><em>监管煤矿</em></span><span><b>126条</b><em>今日报警</em></span><span><b>12处</b><em>高风险点位</em></span></div>
    </section>
  );
}

function DailyRegulationPanel() {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  return (
    <Panel title="日常监管" className="daily-regulation-panel" action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="日常监管数据时间范围" />}>
      <div className="alarm-command-summary">
        <div className="alarm-total-card">
          <div className="alarm-total-main"><span>报警总数</span><strong>118<small>条</small></strong></div>
          <div className="alarm-level-strip" aria-label="报警分级结构">
            {alarmLevels.map(([label, value, percent, tone]) => <i key={label} className={`tone-${tone}`} style={{ flexGrow: Number(value) }}><b>{label}</b><em>{value}条</em><small>{percent}</small></i>)}
          </div>
        </div>
        <div className="alarm-rate-card">
          <div className="alarm-card-head"><span>处置率</span><strong>82%</strong></div>
          <div className="alarm-disposal-progress"><i style={{ width: '82%' }} /></div>
          <div className="alarm-disposal-meta"><span>已处置<b>97条</b></span><span>待处置<b>21条</b></span></div>
        </div>
      </div>
      <div className="section-chip">分级报警处置</div>
      <div className="classified-alarm-grid">
        {classifiedAlarmRows.map((row) => <div key={row.name} className="classified-alarm-card"><header><span>{row.name}</span></header><p>{row.items.map(([name, count]) => <em key={name}>{name}<b>{count}条</b></em>)}</p></div>)}
      </div>
      <div className="reminder-notice-strip" aria-label="提醒通知">
        <span className="reminder-notice-label">提醒通知</span>
        {reminderTasks.map((task) => <em key={task.title} className={`reminder-task tone-${task.tone}`}><b>{task.title}</b><strong>{task.highlight}</strong><small>{task.detail}</small><button type="button" className="reminder-task-action">{task.action}</button></em>)}
      </div>
    </Panel>
  );
}

function IllegalTreatmentPanel() {
  const [activeWarningId, setActiveWarningId] = useState(analysisWarningRows[0].id);
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('today');
  const activeWarning = analysisWarningRows.find((item) => item.id === activeWarningId) || analysisWarningRows[0];
  return (
    <Panel title="打非治违" className="illegal-treatment-panel" action={<TimeRangeControl value={timeRange} onChange={setTimeRange} label="打非治违数据时间范围" />}>
      <div className="section-chip">分析预警</div>
      <div className="illegal-warning-switch" role="tablist" aria-label="分析预警分类">
        {analysisWarningRows.map(({ id, name, count, icon }) => <button key={id} type="button" role="tab" aria-selected={activeWarning.id === id} className={activeWarning.id === id ? 'active' : ''} onClick={() => setActiveWarningId(id)}><CockpitIcon name={icon} /><span>{name}</span><strong>{count}</strong></button>)}
      </div>
      <div className="illegal-warning-detail">
        <div className="warning-detail-head" aria-hidden="true"><span>预警子项</span><span>数量</span><span>处置状态</span></div>
        <div className="warning-detail-list">{activeWarning.alarms.map(([name, count, status]) => <div key={name}><span>{name}</span><strong>{count}</strong><em>{status}</em></div>)}</div>
      </div>
      <div className="section-chip">处置闭环流程</div>
      <div className="illegal-closure-grid">{closureRows.map(([label, waiting, done, icon], index) => <React.Fragment key={label}><span><em>{index + 1}</em><CockpitIcon name={icon} /><strong>{label}</strong><small>待办<b>{waiting}</b></small><small>已办<b>{done}</b></small></span>{index < closureRows.length - 1 && <i />}</React.Fragment>)}</div>
    </Panel>
  );
}

function CommandConcept() {
  return (
    <div className="shuan-concept shuan-command">
      <CockpitIconSprite />
      <TopHeader />
      <main className="command-grid">
        <div className="command-left"><RegulatedMinePanel /><DataAggregationPanel /></div>
        <MapStage />
        <div className="command-right"><DailyRegulationPanel /><IllegalTreatmentPanel /></div>
      </main>
    </div>
  );
}

export function ShuanHomeConceptPage(_props: ShuanHomeConceptPageProps) {
  return <CommandConcept />;
}

export function getShuanVariantFromPage(page: string): ShuanHomeVariant | null {
  if (page === 'shuan-home-command') return 'command';
  if (page === 'shuan-home-portal') return 'portal';
  if (page === 'shuan-home-dispatch') return 'dispatch';
  return null;
}
