import React from 'react';
import { BarChart3, Check, ChevronDown, ChevronUp, Clock, Download, Plus, RefreshCw, Search, Settings, Upload } from 'lucide-react';
import { PageScaffold, Toolbar } from '../components/AppShell';
import { DataTable, Field, Pagination, QueryPanel, RowActions } from '../components/Primitives';

type MonitorPageKind =
  | 'monitor-alarm-query'
  | 'monitor-disposal-record'
  | 'monitor-methane-record'
  | 'monitor-warning-query'
  | 'monitor-warning-rule'
  | 'monitor-record-fix'
  | 'monitor-env-monitor'
  | 'monitor-person-track'
  | 'monitor-shift-record-query'
  | 'monitor-enterprise-shift-record'
  | 'monitor-sms-record'
  | 'monitor-sms-rule'
  | 'monitor-sms-government-receiver'
  | 'monitor-sms-enterprise-receiver'
  | 'monitor-sms-template'
  | 'monitor-shift-setting'
  | 'monitor-alarm-rule'
  | 'monitor-sensor-log'
  | 'monitor-leader-plan'
  | 'monitor-leader-completion'
  | 'monitor-downhole-record'
  | 'monitor-report-audit'
  | 'monitor-report-query'
  | 'monitor-report-statistics'
  | 'monitor-network-statistics'
  | 'monitor-alarm-statistics'
  | 'monitor-alarm-ranking'
  | 'monitor-person-history-statistics'
  | 'monitor-person-location-statistics'
  | 'monitor-comprehensive-report'
  | 'monitor-disconnect-statistics'
  | 'monitor-duty-vacancy-statistics'
  | 'monitor-key-sensor-ranking'
  | 'monitor-sensor-count-statistics'
  | 'monitor-workgroup'
  | 'monitor-regulatory-list'
  | 'monitor-downhole-statistics';

interface SimpleRow extends Record<string, unknown> {
  id: number;
  area?: string;
  mine?: string;
  type?: string;
  content?: string;
  status?: string;
  time?: string;
  operator?: string;
}

interface SensorChangeRow extends Record<string, unknown> {
  id: number;
  mine: string;
  location: string;
  sensorType: string;
  time: string;
  actionType: string;
  description: string;
}

interface AlarmQueryRow extends Record<string, unknown> {
  id: number;
  area: string;
  mine: string;
  alarmType: string;
  alarmContent: string;
  maxValue: string;
  reason: string;
  disposalState: string;
  measure: string;
  startTime: string;
  endTime: string;
  duration: string;
  confirmTime: string;
  operator?: string;
}

interface DisposalRow extends Record<string, unknown> {
  id: number;
  area: string;
  mine: string;
  alarmType: string;
  alarmContent: string;
  maxValue: string;
  reason: string;
  startTime: string;
  endTime: string;
  duration: string;
  record: string;
}

interface AmendRow extends Record<string, unknown> {
  id: number;
  mine: string;
  alarmType: string;
  alarmContent: string;
  maxValue: string;
  startTime: string;
  handler: string;
  handleTime: string;
  urgeWay: string;
  amendTime: string;
  status: string;
  operator?: string;
}

const commonColumns = [
  { key: 'id', title: '序号', width: 70 },
  { key: 'area', title: '区县', width: 120 },
  { key: 'mine', title: '煤矿名称', width: 160 },
  { key: 'type', title: '类型', width: 150 },
  { key: 'content', title: '内容', width: 260, align: 'left' as const },
  { key: 'status', title: '状态', width: 110 },
  { key: 'time', title: '时间', width: 170 },
  { key: 'operator', title: '操作', width: 110, render: () => <RowActions /> },
];

const sensorChangeColumns = [
  { key: 'id', title: '序号', width: 70 },
  { key: 'mine', title: '煤矿名称', width: 180 },
  { key: 'location', title: '安装地点', width: 300, align: 'left' as const },
  { key: 'sensorType', title: '传感器类型', width: 120 },
  { key: 'time', title: '操作时间', width: 170 },
  { key: 'actionType', title: '操作类型', width: 120 },
  { key: 'description', title: '内容描述', width: 520, align: 'left' as const },
];

const alarmQueryColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'area', title: '区县', width: 90 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'alarmType', title: '报警类型', width: 130 },
  { key: 'alarmContent', title: '报警内容', width: 260, align: 'left' as const },
  { key: 'maxValue', title: '最大值', width: 110 },
  { key: 'reason', title: '报警原因', width: 130 },
  { key: 'disposalState', title: '处置情况', width: 130 },
  { key: 'measure', title: '处置措施', width: 240, align: 'left' as const },
  { key: 'startTime', title: '开始时间', width: 170 },
  { key: 'endTime', title: '结束时间', width: 170 },
  { key: 'duration', title: '持续时长', width: 140 },
  { key: 'confirmTime', title: '确认时间', width: 170 },
  { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> },
];

const disposalColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'area', title: '区县', width: 90 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'alarmType', title: '报警类型', width: 140 },
  { key: 'alarmContent', title: '报警内容', width: 280, align: 'left' as const },
  { key: 'maxValue', title: '最大值', width: 100 },
  { key: 'reason', title: '报警原因', width: 120 },
  { key: 'startTime', title: '开始时间', width: 170 },
  { key: 'endTime', title: '结束时间', width: 170 },
  { key: 'duration', title: '持续时长', width: 140 },
  { key: 'record', title: '处置记录', width: 720, align: 'left' as const },
];

const amendColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'alarmType', title: '报警类型', width: 120 },
  { key: 'alarmContent', title: '报警内容', width: 320, align: 'left' as const },
  { key: 'maxValue', title: '最大值', width: 100 },
  { key: 'startTime', title: '开始时间', width: 170 },
  { key: 'handler', title: '处置人', width: 100 },
  { key: 'handleTime', title: '处置时间', width: 170 },
  { key: 'urgeWay', title: '督促方式', width: 110 },
  { key: 'amendTime', title: '修正时间', width: 170 },
  { key: 'status', title: '状态', width: 100 },
  { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> },
];

const personnelTrackColumns = [
  { key: 'id', title: '序号', width: 70 },
  { key: 'area', title: '区县', width: 100 },
  { key: 'mine', title: '煤矿名称', width: 160 },
  { key: 'name', title: '姓名', width: 110 },
  { key: 'downTime', title: '下井时间', width: 170 },
  { key: 'downPlace', title: '下井位置', width: 180 },
  { key: 'upTime', title: '出井时间', width: 170 },
  { key: 'upPlace', title: '出井位置', width: 180 },
  { key: 'duration', title: '下井时长', width: 130 },
  { key: 'status', title: '状态', width: 100 },
  { key: 'operator', title: '操作', width: 90 },
];

const envColumns = [
  { key: 'location', title: '安装地点', width: 360, align: 'left' as const },
  { key: 'value', title: '监测值', width: 120 },
  { key: 'operator', title: '操作', width: 90 },
  { key: 'location2', title: '安装地点', width: 360, align: 'left' as const },
  { key: 'value2', title: '监测值', width: 120 },
  { key: 'operator2', title: '操作', width: 90 },
];

const emptyRows: SimpleRow[] = [];

const sampleRows: SimpleRow[] = [
  { id: 1, area: '金沙县', mine: '大运煤矿', type: '甲烷超限', content: '11121回风顺槽掘进工作面甲烷T1 超限报警', status: '已确认', time: '2026-06-13 22:18:41' },
  { id: 2, area: '金沙县', mine: '金鸡煤矿', type: '传感器异常', content: '主运输巷风速传感器离线恢复后待复核', status: '待处理', time: '2026-06-13 21:47:09' },
];

const sensorChangeRows: SensorChangeRow[] = [
  { id: 1, mine: '林东龙凤煤矿(小)', location: '(048A07) 121314辅助进风巷掘进工作面回风温度', sensorType: '环境温度', time: '2026-06-14 12:25:37', actionType: '关联关系变动', description: '传感器关联关系由修改为D-52052301564101KG1009065C06-121314辅助进风巷掘进工作面掘进机动力电源' },
  { id: 2, mine: '林东龙凤煤矿(小)', location: '(048A06) 121314辅助进风巷掘进工作面回风一氧化碳', sensorType: '一氧化碳', time: '2026-06-14 12:25:37', actionType: '关联关系变动', description: '传感器关联关系由D-52052301564101KG1009065C06修改为D-52052301564101KG1009019C07' },
  { id: 3, mine: '林东龙凤煤矿(小)', location: '(048A01) 121314辅助进风巷掘进工作面甲烷T1', sensorType: '激光甲烷', time: '2026-06-14 12:25:37', actionType: '关联关系变动', description: '传感器关联关系由掘进机动力电源修改为短皮带动力电源关联关系' },
  { id: 4, mine: '重源煤矿', location: '(001A06) 一采区回风上山风速', sensorType: '风速', time: '2026-06-14 12:18:09', actionType: '新增', description: '新增(52052301731101MN0002001A06)一采区回风上山风速' },
  { id: 5, mine: '杉树堡煤矿', location: '(007A10) 地面瓦斯抽放泵站温度传感器', sensorType: '环境温度', time: '2026-06-14 12:16:10', actionType: '修改', description: '【报警】上限由34.0修改为35.0，【解报】上限由33.99修改为34.99' },
  { id: 6, mine: '安晟龙凤煤矿', location: '(020A10) 测试', sensorType: '一氧化碳', time: '2026-06-14 12:12:20', actionType: '删除', description: '删除(52052301656101MN0004020A10)测试' },
];

const alarmQueryRows: AlarmQueryRow[] = [
  { id: 1, area: '金沙县', mine: '盛安煤矿', alarmType: '超限报警', alarmContent: '10907回风巷打钻一氧化碳 一氧化碳 超限报警 最大值：87PPm 最大值时刻：2026-06-14 10:48:33', maxValue: '87PPm', reason: '一采区三段辅助水仓工作面放炮导致', disposalState: '县局企业', measure: '已提前撤出该工作面及受影响工作面所有人员', startTime: '2026-06-14 10:46:21', endTime: '2026-06-14 10:54:47', duration: '0天0小时8分26秒', confirmTime: '2026-06-14 10:47:45' },
  { id: 2, area: '金沙县', mine: '新化煤矿五号井', alarmType: '县矿传输专网断线', alarmContent: '断线 断线 县矿传输专网断线', maxValue: '', reason: '专网断线', disposalState: '市局县局企业', measure: '已通知专业人员检查外网线路，及时恢复', startTime: '2026-06-14 00:00:00', endTime: '2026-06-14 02:16:00', duration: '0天2小时16分0秒', confirmTime: '2026-06-14 00:30:53' },
];



type AlarmQueryTabKey = 'monitor' | 'timeout' | 'overstaff' | 'restricted' | 'rescue';

const alarmQueryTabs: Array<{ key: AlarmQueryTabKey; label: string }> = [
  { key: 'monitor', label: '监控报警' },
  { key: 'timeout', label: '人员超时' },
  { key: 'overstaff', label: '人员超员' },
  { key: 'restricted', label: '进入限制区域报警' },
  { key: 'rescue', label: '人员求救' },
];

const personnelAlarmColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'area', title: '区县', width: 90 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'cardNo', title: '人员卡编码', width: 170 },
  { key: 'name', title: '姓名', width: 100 },
  { key: 'downTime', title: '下井时间', width: 155 },
  { key: 'alarmStartTime', title: '报警开始时间', width: 165 },
  { key: 'alarmEndTime', title: '报警结束时间', width: 165 },
  { key: 'areaName', title: '区域名称', width: 150 },
  { key: 'enterAreaTime', title: '进入当前所处区域时间', width: 190 },
  { key: 'stationName', title: '基站名称', width: 190, align: 'left' as const },
  { key: 'enterStationTime', title: '进入当前所处基站时间', width: 190 },
];

const overstaffAlarmColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'area', title: '区县', width: 90 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'alarmType', title: '报警类型', width: 130 },
  { key: 'quota', title: '定员数', width: 100 },
  { key: 'currentTotal', title: '当前总人数', width: 120 },
  { key: 'overCount', title: '超员数', width: 100 },
  { key: 'areaName', title: '区域名称', width: 260, align: 'left' as const },
  { key: 'alarmStartTime', title: '报警开始时间', width: 170 },
  { key: 'alarmEndTime', title: '报警结束时间', width: 170 },
];

const rescueAlarmColumns = [
  { key: 'id', title: '序号', width: 60 },
  { key: 'area', title: '区县', width: 90 },
  { key: 'mine', title: '煤矿名称', width: 150 },
  { key: 'cardNo', title: '人员卡编码', width: 170 },
  { key: 'name', title: '姓名', width: 100 },
  { key: 'downTime', title: '下井时间', width: 155 },
  { key: 'rescueStartTime', title: '求救开始时间', width: 165 },
  { key: 'rescueEndTime', title: '求救结束时间', width: 165 },
  { key: 'areaName', title: '当前所处区域', width: 150 },
  { key: 'enterAreaTime', title: '进入当前所处区域时间', width: 190 },
  { key: 'stationName', title: '当前所处基站', width: 190, align: 'left' as const },
  { key: 'enterStationTime', title: '进入当前所处基站时间', width: 190 },
];

const timeoutAlarmRows = [
  { id: 1, area: '金沙县', mine: '安能煤矿', cardNo: '52052301536700669', name: '李国虎', downTime: '2026-06-14 00:16', alarmStartTime: '2026-06-14 14:16', alarmEndTime: '', areaName: '其他区域', enterAreaTime: '2026-06-14 14:16', stationName: '运输大巷750处#分站', enterStationTime: '2026-06-14 14:16' },
  { id: 2, area: '金沙县', mine: '盛安煤矿', cardNo: '52052300257402404', name: '何高云', downTime: '2026-06-14 00:44', alarmStartTime: '2026-06-14 14:44', alarmEndTime: '', areaName: '普通区域', enterAreaTime: '2026-06-14 12:38', stationName: '副斜井定位分站', enterStationTime: '2026-06-14 12:38' },
  { id: 3, area: '金沙县', mine: '回归煤矿', cardNo: '52052300299200219', name: '何天文', downTime: '2026-06-14 01:08', alarmStartTime: '2026-06-14 15:08', alarmEndTime: '', areaName: '全矿井', enterAreaTime: '2026-06-14 01:08', stationName: '主井口定位分站', enterStationTime: '2026-06-14 01:08' },
];

const restrictedAlarmRows = [
  { id: 1, area: '金沙县', mine: '熊家湾煤矿', alarmType: '区域超员', quota: 9, currentTotal: 13, overCount: 4, areaName: '11501回风巷', alarmStartTime: '2026-06-14 15:15', alarmEndTime: '' },
  { id: 2, area: '金沙县', mine: '熊家湾煤矿', alarmType: '区域超员', quota: 200, currentTotal: 202, overCount: 2, areaName: '全矿井', alarmStartTime: '2026-06-14 15:10', alarmEndTime: '' },
  { id: 3, area: '金沙县', mine: '木孔煤矿', alarmType: '区域超员', quota: 15, currentTotal: 19, overCount: 4, areaName: '11707运输巷专回掘进工作面', alarmStartTime: '2026-06-14 14:58', alarmEndTime: '' },
];

const rescueAlarmRows = [
  { id: 1, area: '金沙县', mine: '新化煤矿五号井', cardNo: '52052301553900600', name: '赵登林', downTime: '2026-06-14 07:23', rescueStartTime: '2026-06-14 14:59', rescueEndTime: '2026-06-14 15:00', areaName: '普通区域', enterAreaTime: '2026-06-14 14:40', stationName: '主井底变平点', enterStationTime: '2026-06-14 14:40' },
  { id: 2, area: '金沙县', mine: '熊家湾煤矿', cardNo: '52052300222803525', name: '曾光坤', downTime: '2026-06-14 06:50', rescueStartTime: '2026-06-14 13:42', rescueEndTime: '2026-06-14 13:45', areaName: '全矿井', enterAreaTime: '2026-06-14 09:18', stationName: '690车场分站', enterStationTime: '2026-06-14 09:18' },
  { id: 3, area: '金沙县', mine: '新化煤矿五号井', cardNo: '52052301553900626', name: '顾广福', downTime: '2026-06-14 07:31', rescueStartTime: '2026-06-14 12:26', rescueEndTime: '2026-06-14 12:29', areaName: '普通区域', enterAreaTime: '2026-06-14 11:57', stationName: '11303回风顶抽巷530米处', enterStationTime: '2026-06-14 11:57' },
];

const alarmQueryTabData: Record<AlarmQueryTabKey, { columns: Array<Record<string, unknown>>; rows: Array<Record<string, unknown>>; total?: number }> = {
  monitor: { columns: alarmQueryColumns, rows: alarmQueryRows, total: 2 },
  timeout: { columns: personnelAlarmColumns, rows: timeoutAlarmRows, total: 28 },
  overstaff: { columns: overstaffAlarmColumns, rows: [], total: undefined },
  restricted: { columns: overstaffAlarmColumns, rows: restrictedAlarmRows, total: 5739 },
  rescue: { columns: rescueAlarmColumns, rows: rescueAlarmRows, total: 35 },
};

const disposalRows: DisposalRow[] = [
  { id: 1, area: '金沙县', mine: '盛安煤矿', alarmType: '超限报警', alarmContent: '10907回风巷打钻一氧化碳 一氧化碳 超限报警 最大值：87.00 最大值时刻：2026-06-14 10:48:33', maxValue: '87.00', reason: '其它（放炮导致）', startTime: '2026-06-14 10:46:21', endTime: '2026-06-14 10:54:47', duration: '0天0小时8分26秒', record: '县局：督促方式：电话,督促时间：2026-06-14 10:55:01 电话:去电时间：2026-06-14 10:49:01,去电人员：杨浪,接电话人员：张永江、吴平志,报警原因：放炮导致。' },
  { id: 2, area: '金沙县', mine: '新化煤矿五号井', alarmType: '县矿传输专网断线', alarmContent: '断线 断线 县矿传输专网断线', maxValue: '', reason: '网络故障', startTime: '2026-06-14 00:00:00', endTime: '2026-06-14 02:16:00', duration: '0天2小时16分0秒', record: '县局：督促方式：电话,督促时间：2026-06-14 01:23:47 电话:去电人员：张哲,接电话人员：毛洪波、万志来、冯飞、周超、何钦,报警原因：网络故障。' },
];

const amendRows: AmendRow[] = [
  { id: 1, mine: '闽安煤矿', alarmType: '超限报警', alarmContent: '11501回风巷打钻处2一氧化碳超限报警 最大值：679 最大值时刻：2023-12-10 15:18:59', maxValue: '679', startTime: '2023-12-10 15:18:20', handler: '', handleTime: '2023-12-10 16:00:52', urgeWay: '电话', amendTime: '2023-12-10 18:04:53', status: '已生效' },
  { id: 2, mine: '闽安煤矿', alarmType: '超限报警', alarmContent: '回风斜井一氧化碳超限报警 最大值：61 最大值时刻：2023-12-10 15:35:56', maxValue: '61', startTime: '2023-12-10 15:34:45', handler: '', handleTime: '2023-12-10 16:00:52', urgeWay: '电话', amendTime: '2023-12-10 18:05:43', status: '已生效' },
];

const envRows = [
  { id: 1, location: '(017A16)1010水仓回风流甲烷', value: '0.04%', operator: '', location2: '(006A02)10802运输巷皮带机尾温度', value2: '19.6℃', operator2: '' },
  { id: 2, location: '(009Z01)1010水泵房水泵开停1', value: '停止', operator: '', location2: '(006D03)10802运输巷皮带机尾烟雾', value2: '无烟雾', operator2: '' },
  { id: 3, location: '(009Z02)1010水泵房水泵开停2', value: '停止', operator: '', location2: '(010A12)10802采面上隅角一氧化碳', value2: '0.0ppm', operator2: '' },
  { id: 4, location: '(009A04)1010水泵房温度', value: '19.4℃', operator: '', location2: '(010A08)10802采面上隅角甲烷T0', value2: '0.0%CH4', operator2: '' },
  { id: 5, location: '(009A03)1010水泵房甲烷', value: '0.0%', operator: '', location2: '(010C08)10802采面回风巷断电仪', value2: '复电', operator2: '' },
];

type PageMeta = {
  title: string;
  fields: Array<[string, string, 'input' | 'select' | 'tree'?]>;
  columns?: typeof commonColumns | typeof sensorChangeColumns | typeof alarmQueryColumns | typeof disposalColumns | typeof amendColumns | typeof personnelTrackColumns | typeof envColumns;
  rows?: Array<SimpleRow | SensorChangeRow | AlarmQueryRow | DisposalRow | AmendRow | Record<string, unknown>>;
  note?: string;
  chart?: boolean;
};

const pageMeta: Record<MonitorPageKind, PageMeta> = {
  'monitor-alarm-query': { title: '报警查询', fields: [], columns: alarmQueryColumns, rows: alarmQueryRows },
  'monitor-disposal-record': { title: '处置记录', fields: [], columns: disposalColumns, rows: disposalRows },
  'monitor-methane-record': { title: '甲烷超限处置记录', fields: [], columns: [...disposalColumns.slice(0, 10), { key: 'operator', title: '操作', width: 90, render: () => <RowActions /> }], rows: [] },
  'monitor-warning-query': { title: '预警查询', fields: [['预警类型', '请选择预警类型', 'select'], ['煤矿名称', '请输入煤矿名称'], ['预警状态', '请选择状态', 'select'], ['预警时间', '开始时间 -  结束时间']], rows: sampleRows },
  'monitor-warning-rule': { title: '预警规则设置', fields: [['规则名称', '请输入规则名称'], ['规则类型', '请选择规则类型', 'select'], ['启用状态', '请选择状态', 'select']], rows: sampleRows, note: '规则列表采用启用、停用、编辑、查看的后台管理表格结构。' },
  'monitor-record-fix': { title: '处置记录修正管理', fields: [], columns: amendColumns, rows: amendRows },
  'monitor-env-monitor': { title: '环境监测监控', fields: [], columns: envColumns, rows: envRows },
  'monitor-person-track': { title: '人员轨迹历史查询', fields: [], columns: personnelTrackColumns, rows: [] },
  'monitor-shift-record-query': { title: '交接班记录查询', fields: [['班次', '请选择班次', 'select'], ['交班人', '请输入交班人'], ['接班人', '请输入接班人'], ['交接班日期', '请选择日期']], rows: emptyRows },
  'monitor-enterprise-shift-record': { title: '企业交接班记录', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['班次', '请选择班次', 'select'], ['日期', '请选择日期']], rows: sampleRows },
  'monitor-sms-record': { title: '短信发送记录查询', fields: [['发送单位', '请输入发送单位'], ['接收人员', '请输入接收人'], ['发送状态', '请选择状态', 'select'], ['发送时间', '开始时间 -  结束时间']], rows: sampleRows },
  'monitor-sms-rule': { title: '短信发送规则设置', fields: [['规则名称', '请输入规则名称'], ['报警类型', '请选择报警类型', 'select'], ['启用状态', '请选择状态', 'select']], rows: sampleRows },
  'monitor-sms-government-receiver': { title: '政府接收人员', fields: [['区县', '请选择区县', 'tree'], ['姓名', '请输入姓名'], ['手机号码', '请输入手机号']], rows: sampleRows },
  'monitor-sms-enterprise-receiver': { title: '企业接收人员', fields: [['煤矿名称', '请输入煤矿名称'], ['姓名', '请输入姓名'], ['手机号码', '请输入手机号']], rows: sampleRows },
  'monitor-sms-template': { title: '短信内容模板设置', fields: [['模板名称', '请输入模板名称'], ['模板类型', '请选择模板类型', 'select'], ['启用状态', '请选择状态', 'select']], rows: sampleRows },
  'monitor-shift-setting': { title: '班次设置', fields: [['班次名称', '请输入班次名称'], ['是否启用', '请选择状态', 'select']], rows: sampleRows },
  'monitor-alarm-rule': { title: '报警提示规则设置', fields: [['规则名称', '请输入规则名称'], ['报警类型', '请选择报警类型', 'select'], ['提示方式', '请选择提示方式', 'select']], rows: sampleRows },
  'monitor-sensor-log': { title: '传感器变更日志', fields: [], columns: sensorChangeColumns, rows: sensorChangeRows },
  'monitor-leader-plan': { title: '带班计划', fields: [['煤矿名称', '请输入煤矿名称'], ['带班领导', '请输入姓名'], ['计划日期', '请选择日期']], rows: sampleRows },
  'monitor-leader-completion': { title: '带班计划完成情况', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['完成状态', '请选择状态', 'select']], rows: sampleRows },
  'monitor-downhole-record': { title: '下井带班记录', fields: [['煤矿名称', '请输入煤矿名称'], ['带班领导', '请输入姓名'], ['下井时间', '开始时间 -  结束时间']], rows: sampleRows },
  'monitor-report-audit': { title: '报备审核', fields: [['报备类型', '请选择报备类型', 'select'], ['煤矿名称', '请输入煤矿名称'], ['审核状态', '请选择状态', 'select']], rows: sampleRows },
  'monitor-report-query': { title: '报备查询', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['报备时间', '开始时间 -  结束时间']], rows: sampleRows },
  'monitor-report-statistics': { title: '报备统计', fields: [['报备类型', '请选择报备类型', 'select'], ['统计时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
  'monitor-network-statistics': { title: '联网统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['统计周期', '请选择统计周期', 'select']], rows: sampleRows, chart: true },
  'monitor-alarm-statistics': { title: '报警处置统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['统计周期', '请选择周期', 'select']], rows: sampleRows, chart: true },
  'monitor-alarm-ranking': { title: '报警排行榜', fields: [['区县', '请选择区县', 'tree'], ['报警类型', '请选择报警类型', 'select'], ['统计时间', '请选择月份']], rows: sampleRows, chart: true },
  'monitor-person-history-statistics': { title: '人员历史数据统计', fields: [['煤矿名称', '请输入煤矿名称'], ['统计时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
  'monitor-person-location-statistics': { title: '人员定位统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称']], rows: sampleRows, chart: true },
  'monitor-comprehensive-report': { title: '综合报告分析', fields: [['报告类型', '请选择报告类型', 'select'], ['统计时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
  'monitor-disconnect-statistics': { title: '断线统计', fields: [['煤矿名称', '请输入煤矿名称'], ['断线时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
  'monitor-duty-vacancy-statistics': { title: '带班空岗统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['统计时间', '请选择月份']], rows: sampleRows, chart: true },
  'monitor-key-sensor-ranking': { title: '重点传感器排行榜', fields: [['传感器类型', '请选择传感器类型', 'select'], ['统计时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
  'monitor-sensor-count-statistics': { title: '传感器数量统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['传感器类型', '请选择传感器类型', 'select']], rows: sampleRows, chart: true },
  'monitor-workgroup': { title: '煤矿监管工作组管理', fields: [['工作组名称', '请输入工作组名称'], ['所属区县', '请选择区县', 'tree'], ['启用状态', '请选择状态', 'select']], rows: sampleRows },
  'monitor-regulatory-list': { title: '监管名单', fields: [['煤矿名称', '请输入煤矿名称'], ['监管类型', '请选择监管类型', 'select']], rows: sampleRows },
  'monitor-downhole-statistics': { title: '下井记录统计', fields: [['区县', '请选择区县', 'tree'], ['煤矿名称', '请输入煤矿名称'], ['下井时间', '开始时间 -  结束时间']], rows: sampleRows, chart: true },
};

function MonitorToolbar({ chart, total }: { chart?: boolean; total?: number }) {
  return (
    <Toolbar>
      <button className="sms-tool-text" type="button"><Search size={15} />查看</button>
      <button className="sms-tool-text" type="button"><Plus size={15} />新增</button>
      <button className="sms-tool-text" type="button"><Upload size={15} />导入</button>
      <button className="sms-tool-text" type="button"><Download size={15} />导出</button>
      {chart && <button className="sms-tool-text" type="button"><BarChart3 size={15} />图表</button>}
      <button className="sms-tool-text" type="button"><RefreshCw size={15} />刷新</button>
      <div className="pagination sms-pagination"><Pagination total={total ?? (chart ? 12 : 43)} /></div>
    </Toolbar>
  );
}

function ChartPreview({ title }: { title: string }) {
  return (
    <section className="monitor-chart-card">
      <header><BarChart3 size={18} /><span>{title}</span><button type="button"><Settings size={15} /></button></header>
      <div className="monitor-chart-body">
        <div className="chart-bars">{[66, 48, 74, 38, 58, 44, 71].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
        <div className="chart-legend"><span>报警</span><span>已处置</span><span>待审核</span></div>
      </div>
    </section>
  );
}

function SensorChangeQueryPanel() {
  const mines = ['金泰煤矿', '熊家湾煤矿', '禹谟镇大沟煤矿', '盛安煤矿', '回归煤矿', '高坪镇鑫达煤矿', '偏坡寨煤矿', '永晟煤矿', '闽安煤矿', '龙宫煤矿一号井', '木孔煤矿', '安能煤矿', '金鸡煤矿', '枫香林煤矿', '大运煤矿', '兴安煤矿', '林东龙凤煤矿(小)', '田湾煤矿', '长兴煤矿', '贵源煤矿', '林华煤矿', '新化煤矿一号井', '玉龙煤矿', '立新煤矿', '安晟龙凤煤矿', '白坪煤矿', '老虎石煤矿', '重源煤矿', '龙宫煤矿二号井', '新华煤矿', '路边煤矿', '新化煤矿五号井', '福利院煤矿', '鸡爬坎煤矿', '吉盛煤矿', '牌坊岩煤矿', '祁兴煤矿', '东风煤矿', '杉树堡煤矿'];
  const sensorTypes = ['环境瓦斯', '激光甲烷', '高低浓瓦斯', '一氧化碳', '管道瓦斯', '管道温度', '风速', '环境温度', '风压', '负压', '水池水位', '煤位', '硫化氢', '氧气', '二氧化碳', '粉尘', '电压', '频率', '电流', '湿度', '风量', '顶板离层', '位移', '水质', '管道压力', '轴承温度', '噪音', '电机温度'];
  return (
    <section className="sensor-change-query">
      <label className="sensor-filter-line"><span>操作类型</span><div className="sensor-chip-row"><button>新增</button><button>删除</button><button>修改</button><button>关联关系变动</button></div></label>
      <Field label="操作时间" placeholder="开始时间 -  结束时间" />
      <label className="sensor-filter-line wide"><span>煤矿名称</span><div className="sensor-token-list">{mines.map((mine) => <button key={mine}>{mine}</button>)}</div></label>
      <label className="sensor-filter-line wide"><span>传感器类型</span><div className="sensor-token-list">{sensorTypes.map((type) => <button key={type}>{type}</button>)}</div></label>
      <Field label="安装地点" placeholder="请输入安装地点" />
      <div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RefreshCw size={15} />重置</button></div>
    </section>
  );
}

function FilterTokens({
  items,
  selected,
  checkFirst = false,
}: {
  items: string[];
  selected?: string;
  checkFirst?: boolean;
}) {
  return (
    <div className="alarm-token-list">
      {checkFirst && (
        <button className="alarm-token-check" type="button" aria-label="已选择全部报警级别">
          <Check size={16} strokeWidth={3} />
        </button>
      )}
      {items.map((item) => (
        <button key={item} className={selected === item ? 'active' : ''} type="button">{item}</button>
      ))}
    </div>
  );
}

function AlarmSelect({ placeholder, width = 250 }: { placeholder: string; width?: number }) {
  return (
    <button className="alarm-select" style={{ width }} type="button">
      <span>{placeholder}</span>
      <ChevronDown size={15} />
    </button>
  );
}

function AlarmInput({ placeholder, width = 200 }: { placeholder: string; width?: number }) {
  return <input className="alarm-input" style={{ width }} placeholder={placeholder} readOnly />;
}

function AlarmDateRange() {
  return (
    <div className="alarm-date-range">
      <Clock size={14} />
      <span>2026-06-15 00:00:00</span>
      <b>至</b>
      <span>2026-06-15 17:35:32</span>
    </div>
  );
}

function AlarmFilterRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`alarm-filter-row ${className}`}>{children}</div>;
}

function AlarmFilterItem({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`alarm-filter-item ${className}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function AlarmQueryPanel({ activeTab, onTabChange }: { activeTab: AlarmQueryTabKey; onTabChange: (tab: AlarmQueryTabKey) => void }) {
  const [expanded, setExpanded] = React.useState(false);
  const alarmTypes = ['断线类', '甲烷断线', '一氧化碳断线'];
  const timeLabel = activeTab === 'rescue' ? '求救时间：' : '报警时间：';
  const isMonitor = activeTab === 'monitor';

  React.useEffect(() => {
    setExpanded(false);
  }, [activeTab]);

  return (
    <section className={`alarm-query-panel${isMonitor ? '' : ' alarm-query-panel-compact'}${expanded ? ' expanded' : ' collapsed'}`}>
      <div className="alarm-query-tabs">
        {alarmQueryTabs.map((tab) => (
          <button key={tab.key} className={activeTab === tab.key ? 'active' : ''} type="button" onClick={() => onTabChange(tab.key)}>{tab.label}</button>
        ))}
      </div>

      {isMonitor ? (
        <div className="alarm-system-filter">
          <AlarmFilterRow>
            <AlarmFilterItem label="报备情况："><FilterTokens items={['已报备', '未报备']} /></AlarmFilterItem>
          </AlarmFilterRow>
          <AlarmFilterRow>
            <AlarmFilterItem label="报警时间：" className="alarm-time-item">
              <FilterTokens items={['昨日', '当天', '一周', '当月', '自定义']} selected="当天" />
              <AlarmDateRange />
            </AlarmFilterItem>
            <AlarmFilterItem label="处置情况：" className="alarm-disposal-item">
              <FilterTokens items={['市局', '县局', '企业']} selected="县局" />
            </AlarmFilterItem>
          </AlarmFilterRow>
          <AlarmFilterRow>
            <AlarmFilterItem label="报警级别："><FilterTokens items={['红色', '橙色', '黄色', '蓝色', '未分级']} checkFirst /></AlarmFilterItem>
          </AlarmFilterRow>
          {expanded && (
            <>
              <AlarmFilterRow>
                <AlarmFilterItem label="报警类型：" className="alarm-type-item">
                  <FilterTokens items={alarmTypes} />
                  <AlarmSelect placeholder="请选择报警类型" width={252} />
                </AlarmFilterItem>
                <AlarmFilterItem label="传感器类型：" className="alarm-right-item"><AlarmSelect placeholder="请选择传感器类型" width={202} /></AlarmFilterItem>
              </AlarmFilterRow>
              <AlarmFilterRow>
                <AlarmFilterItem label="煤矿名称："><AlarmSelect placeholder="请选择煤矿名称" width={220} /></AlarmFilterItem>
                <AlarmFilterItem label="最大值：" className="alarm-range-item">
                  <AlarmInput placeholder="请输入最大值下限" width={200} />
                  <em>-</em>
                  <AlarmInput placeholder="请输入最大值上限" width={200} />
                </AlarmFilterItem>
                <AlarmFilterItem label="持续时长(分钟)>=：" className="alarm-right-item"><AlarmInput placeholder="请输入持续时长(分钟)>=" width={220} /></AlarmFilterItem>
              </AlarmFilterRow>
              <AlarmFilterRow>
                <AlarmFilterItem label="关键字包含："><AlarmInput placeholder="请输入关键字包含" width={322} /></AlarmFilterItem>
                <AlarmFilterItem label="关键字不包含："><AlarmInput placeholder="请输入关键字不包含" width={202} /></AlarmFilterItem>
                <AlarmFilterItem label="传感器名称：" className="alarm-right-item"><AlarmInput placeholder="请输入传感器名称" width={220} /></AlarmFilterItem>
              </AlarmFilterRow>
            </>
          )}
        </div>
      ) : activeTab === 'timeout' || activeTab === 'rescue' ? (
        <div className="alarm-system-filter compact-filter">
          <AlarmFilterRow>
            <AlarmFilterItem label={timeLabel} className="alarm-time-item">
              <FilterTokens items={['昨日', '当天', '一周', '当月', '自定义']} selected="当天" />
              <AlarmDateRange />
            </AlarmFilterItem>
          </AlarmFilterRow>
          {expanded && (
            <AlarmFilterRow>
              <AlarmFilterItem label="煤矿名称："><AlarmSelect placeholder="请选择煤矿名称" width={220} /></AlarmFilterItem>
              <AlarmFilterItem label="姓名："><AlarmInput placeholder="请输入姓名" width={220} /></AlarmFilterItem>
            </AlarmFilterRow>
          )}
        </div>
      ) : (
        <div className="alarm-system-filter compact-filter">
          <AlarmFilterRow>
            <AlarmFilterItem label="报警时间：" className="alarm-time-item">
              <FilterTokens items={['昨日', '当天', '一周', '当月', '自定义']} selected="当天" />
              <AlarmDateRange />
            </AlarmFilterItem>
          </AlarmFilterRow>
          {expanded && (
            <AlarmFilterRow>
              <AlarmFilterItem label="报警类型："><FilterTokens items={['矿井超员', '区域超员']} /></AlarmFilterItem>
              <AlarmFilterItem label="煤矿名称："><AlarmSelect placeholder="请选择煤矿名称" width={220} /></AlarmFilterItem>
            </AlarmFilterRow>
          )}
        </div>
      )}
      <div className="query-actions alarm-query-actions">
        <button className="primary-button" type="button"><Search size={15} />查询</button>
        <button className="light-button" type="button"><RefreshCw size={15} />重置</button>
        <button className="light-button alarm-collapse-toggle" type="button" onClick={() => setExpanded((value) => !value)} aria-label={expanded ? '收起筛选项' : '展开筛选项'}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
    </section>
  );
}

function AlarmQueryToolbar({ activeTab }: { activeTab: AlarmQueryTabKey }) {
  const tabData = alarmQueryTabData[activeTab];
  return (
    <Toolbar>
      <button className="sms-tool-text" type="button"><RefreshCw size={15} />{'刷新'}</button>
      {activeTab === 'monitor' && <button className="sms-tool-text" type="button"><Plus size={15} />{'批量报警处置'}</button>}
      {activeTab === 'monitor' && <button className="sms-tool-text" type="button"><Download size={15} />{'导出'}</button>}
      {activeTab === 'monitor' && <button className="sms-tool-text" type="button"><Download size={15} />{'瓦斯超限导出'}</button>}
      {typeof tabData.total === 'number' && <div className="pagination sms-pagination"><Pagination total={tabData.total} /></div>}
    </Toolbar>
  );
}

function DisposalQueryPanel({ methane = false }: { methane?: boolean }) {
  const alarmTypes = ['断线类', '甲烷断线', '一氧化碳断线', '超限报警', '断电报警', '馈电异常', '传感器断线', '基站断电', '基站不通', '标校超量程', '超上限预警', '超下限预警', '开停报警', '一氧化碳高风险', '传感器无数据上传', '超核定人数', '带班空岗报警', '全矿停电', '主通风机全停', '烟雾报警', '风筒报警', '监控系统断线', '人员定位断线', '市县传输专网断线', '县矿传输专网断线', '省平台监控系统断线', '省平台人员定位断线', '省平台网络断线'];
  const sensorTypes = ['环境瓦斯', '激光甲烷', '高低浓瓦斯', '一氧化碳', '管道瓦斯', '管道温度', '风速', '环境温度', '风压', '负压', '水池水位', '煤位', '硫化氢', '水温度', '氧气', '二氧化碳', '粉尘', '电压', '频率', '电流', '湿度', '风量', '顶板离层', '位移', '坝体位移', '水质', '管道压力', '轴承温度', '噪音', '电机温度'];
  const mines = ['金泰煤矿', '熊家湾煤矿', '禹谟镇大沟煤矿', '盛安煤矿', '回归煤矿', '高坪镇鑫达煤矿', '偏坡寨煤矿', '永晟煤矿', '闽安煤矿', '龙宫煤矿一号井', '木孔煤矿', '安能煤矿', '金鸡煤矿', '枫香林煤矿', '大运煤矿', '兴安煤矿', '林东龙凤煤矿(小)', '田湾煤矿', '长兴煤矿', '贵源煤矿', '林华煤矿', '新化煤矿一号井', '玉龙煤矿', '立新煤矿', '安晟龙凤煤矿', '白坪煤矿', '老虎石煤矿', '重源煤矿', '龙宫煤矿二号井', '新华煤矿', '路边煤矿', '新化煤矿五号井', '福利院煤矿', '鸡爬坎煤矿', '吉盛煤矿', '牌坊岩煤矿', '祁兴煤矿', '东风煤矿', '杉树堡煤矿'];
  return (
    <section className="alarm-query-panel disposal-query-panel">
      <div className="alarm-query-tabs"><button className="active">{methane ? '甲烷超限处置记录' : '处置记录'}</button></div>
      <div className="alarm-filter-grid">
        <label className="alarm-filter-line"><span>报警级别</span><FilterTokens items={['红色', '橙色', '黄色', '蓝色', '未分级']} compact /></label>
        <label className="alarm-filter-line"><span>报警时间</span><FilterTokens items={['昨日', '当天', '一周', '当月', '自定义', '至']} compact /></label>
        <label className="alarm-filter-line"><span>处置情况</span><FilterTokens items={['市局', '县局', '企业']} compact /></label>
        {!methane && <label className="alarm-filter-line wide"><span>报警类型</span><FilterTokens items={alarmTypes} /></label>}
        {!methane && <label className="alarm-filter-line sensor-type"><span>传感器类型</span><FilterTokens items={sensorTypes} compact /></label>}
        <label className="alarm-filter-line mine-line"><span>煤矿名称</span><FilterTokens items={mines} compact /></label>
        <Field label="传感器名称" placeholder="" />
        <Field label="最大值" placeholder="- " />
        <Field label="持续时长(分钟)>=" placeholder="" />
        <Field label="关键字包含" placeholder="" />
        <Field label="关键字不包含" placeholder="" />
      </div>
      <div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RefreshCw size={15} />重置</button></div>
    </section>
  );
}

function DisposalToolbar({ methane = false }: { methane?: boolean }) {
  return (
    <Toolbar>
      <button className="sms-tool-text" type="button"><RefreshCw size={15} />刷新</button>
      <button className="sms-tool-text" type="button"><Download size={15} />导出</button>
      {!methane && <button className="sms-tool-text" type="button"><Download size={15} />断线类导出</button>}
      {!methane && <button className="sms-tool-text" type="button">打印</button>}
      {!methane && <button className="sms-tool-text" type="button"><Download size={15} />一氧化碳超限导出</button>}
      {!methane && <div className="pagination sms-pagination"><Pagination total={2} /></div>}
    </Toolbar>
  );
}

function RecordFixQueryPanel() {
  const mines = ['金泰煤矿', '熊家湾煤矿', '禹谟镇大沟煤矿', '盛安煤矿', '回归煤矿', '高坪镇鑫达煤矿', '偏坡寨煤矿', '永晟煤矿', '闽安煤矿', '龙宫煤矿一号井', '木孔煤矿', '安能煤矿', '金鸡煤矿', '枫香林煤矿', '大运煤矿', '兴安煤矿', '林东龙凤煤矿(小)', '田湾煤矿', '长兴煤矿', '贵源煤矿', '林华煤矿', '新化煤矿一号井', '玉龙煤矿', '立新煤矿', '安晟龙凤煤矿', '白坪煤矿', '老虎石煤矿', '重源煤矿', '龙宫煤矿二号井', '新华煤矿', '路边煤矿', '新化煤矿五号井', '福利院煤矿', '鸡爬坎煤矿', '吉盛煤矿', '牌坊岩煤矿', '祁兴煤矿', '东风煤矿', '杉树堡煤矿'];
  return (
    <section className="alarm-query-panel record-fix-query">
      <div className="alarm-query-tabs"><button className="active">处置记录修正管理</button></div>
      <div className="alarm-filter-grid">
        <label className="alarm-filter-line"><span>状态</span><FilterTokens items={['已生效', '已撤销']} compact /></label>
        <Field label="修正时间" placeholder="" />
        <label className="alarm-filter-line wide"><span>煤矿名称</span><FilterTokens items={mines} compact /></label>
        <label className="alarm-filter-line"><span>报警级别</span><FilterTokens items={['红色', '橙色', '黄色', '蓝色', '未分级']} compact /></label>
      </div>
      <div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RefreshCw size={15} />重置</button></div>
    </section>
  );
}

function SimpleRefreshToolbar({ total, add = false, exportText = '导出' }: { total?: number; add?: boolean; exportText?: string | null }) {
  return (
    <Toolbar>
      <button className="sms-tool-text" type="button"><RefreshCw size={15} />刷新</button>
      {add && <button className="sms-tool-text" type="button"><Plus size={15} />新增</button>}
      {exportText && <button className="sms-tool-text" type="button"><Download size={15} />{exportText}</button>}
      {typeof total === 'number' && <div className="pagination sms-pagination"><Pagination total={total} /></div>}
    </Toolbar>
  );
}

function PersonnelTrackQueryPanel() {
  const mines = ['金泰煤矿', '熊家湾煤矿', '禹谟镇大沟煤矿', '盛安煤矿', '回归煤矿', '高坪镇鑫达煤矿', '偏坡寨煤矿', '永晟煤矿', '闽安煤矿', '龙宫煤矿一号井', '木孔煤矿', '安能煤矿', '金鸡煤矿', '枫香林煤矿', '大运煤矿', '兴安煤矿', '林东龙凤煤矿(小)', '田湾煤矿', '长兴煤矿', '贵源煤矿', '林华煤矿', '新化煤矿一号井', '玉龙煤矿', '立新煤矿', '安晟龙凤煤矿', '白坪煤矿', '老虎石煤矿', '重源煤矿', '龙宫煤矿二号井', '新华煤矿', '路边煤矿', '新化煤矿五号井', '福利院煤矿', '鸡爬坎煤矿', '吉盛煤矿', '牌坊岩煤矿', '祁兴煤矿', '东风煤矿', '杉树堡煤矿'];
  return (
    <section className="alarm-query-panel personnel-query">
      <div className="alarm-query-tabs"><button className="active">人员轨迹历史查询</button></div>
      <div className="alarm-filter-grid">
        <label className="alarm-filter-line"><span>下井时间</span><FilterTokens items={['当天', '一周', '当月', '自定义', '至']} compact /></label>
        <label className="alarm-filter-line wide"><span>煤矿名称</span><FilterTokens items={mines} compact /></label>
        <label className="alarm-filter-line"><span>状态</span><FilterTokens items={['井口', '未出井', '已出井']} compact /></label>
        <Field label="姓名" placeholder="" />
      </div>
      <div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RefreshCw size={15} />重置</button></div>
    </section>
  );
}

function EnvMonitorPage() {
  const mines = ['金泰煤矿', '熊家湾煤矿', '禹谟镇大沟煤矿', '盛安煤矿', '回归煤矿', '高坪镇鑫达煤矿', '偏坡寨煤矿', '永晟煤矿', '闽安煤矿', '龙宫煤矿一号井', '木孔煤矿', '安能煤矿', '金鸡煤矿', '枫香林煤矿', '大运煤矿', '兴安煤矿', '林东龙凤煤矿(小)', '田湾煤矿', '长兴煤矿', '贵源煤矿', '林华煤矿', '新化煤矿一号井', '玉龙煤矿', '立新煤矿', '安晟龙凤煤矿', '白坪煤矿', '老虎石煤矿', '重源煤矿', '龙宫煤矿二号井', '新华煤矿', '路边煤矿', '新化煤矿五号井', '福利院煤矿', '鸡爬坎煤矿', '吉盛煤矿', '牌坊岩煤矿', '祁兴煤矿', '东风煤矿', '杉树堡煤矿'];
  return (
    <>
      <section className="env-overview">
        <div className="env-stat-line">辖区井下总人数：<b>4139人</b><span>带班领导：41人</span><span>班组长：98人</span><span>特种人员：967人</span><button>查看详情</button></div>
        <div className="env-company-panel">
          <header>联网企业（39家）<span>断线：2</span><span>异常：0</span><span>正常：37</span></header>
          <div className="env-mine-grid">{mines.map((mine) => <span key={mine} className={mine === '兴安煤矿' || mine === '祁兴煤矿' ? 'offline' : ''}>{mine}<em>金沙县</em><b>{mine === '兴安煤矿' || mine === '祁兴煤矿' ? '断线' : '正常'}</b></span>)}</div>
          <footer>说明：金泰煤矿　安全监控　瓦斯抽采　人员定位　系统监测概述　通讯录</footer>
        </div>
      </section>
      <section className="alarm-query-panel env-sensor-query">
        <div className="alarm-filter-grid">
          <label className="alarm-filter-line wide"><span>传感器状态</span><FilterTokens items={['正常', '超限报警', '断电报警', '标校', '标校报警', '超量程', '分站故障', '不巡检', '暂停', '传感器故障']} /></label>
          <label className="alarm-filter-line wide"><span>传感器类型</span><FilterTokens items={['环境瓦斯', '激光甲烷', '高低浓瓦斯', '一氧化碳', '管道瓦斯', '管道温度', '风速', '环境温度', '风压', '负压', '水池水位', '煤位', '硫化氢', '氧气', '二氧化碳', '粉尘']} /></label>
          <Field label="安装地点" placeholder="" />
          <Field label="传感器编号" placeholder="" />
        </div>
        <div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RefreshCw size={15} />重置</button></div>
      </section>
    </>
  );
}

export function isMonitoringReplicaPage(page: string): page is MonitorPageKind {
  return page in pageMeta;
}

export function MonitoringReplicaPage({ page }: { page: MonitorPageKind }) {
  const meta = pageMeta[page];
  const isSensorLog = page === 'monitor-sensor-log';
  const isAlarmQuery = page === 'monitor-alarm-query';
  const isDisposal = page === 'monitor-disposal-record';
  const isMethane = page === 'monitor-methane-record';
  const isRecordFix = page === 'monitor-record-fix';
  const isEnv = page === 'monitor-env-monitor';
  const isPersonnel = page === 'monitor-person-track';
  const [activeAlarmTab, setActiveAlarmTab] = React.useState<AlarmQueryTabKey>('monitor');
  const activeAlarmData = alarmQueryTabData[activeAlarmTab];
  const tableColumns = isAlarmQuery ? activeAlarmData.columns : (meta.columns || commonColumns);
  const tableRows = isAlarmQuery ? activeAlarmData.rows : ((meta.rows || emptyRows) as Record<string, unknown>[]);
  return (
    <PageScaffold title={meta.title}>
      {isAlarmQuery ? <AlarmQueryPanel activeTab={activeAlarmTab} onTabChange={setActiveAlarmTab} /> : isDisposal ? <DisposalQueryPanel /> : isMethane ? <DisposalQueryPanel methane /> : isRecordFix ? <RecordFixQueryPanel /> : isEnv ? <EnvMonitorPage /> : isPersonnel ? <PersonnelTrackQueryPanel /> : isSensorLog ? <SensorChangeQueryPanel /> : (
        <QueryPanel>
          {meta.fields.map(([label, placeholder, type]) => <Field key={label} label={label} placeholder={placeholder} type={type} />)}
        </QueryPanel>
      )}
      {meta.note && <div className="monitor-page-note">{meta.note}</div>}
      {meta.chart && <ChartPreview title={`${meta.title}??`} />}
      {isAlarmQuery ? <AlarmQueryToolbar activeTab={activeAlarmTab} /> : isDisposal ? <DisposalToolbar /> : isMethane ? <DisposalToolbar methane /> : isRecordFix ? <SimpleRefreshToolbar total={2} add exportText={null} /> : isEnv ? <SimpleRefreshToolbar total={238} exportText="简略模式　详细模式" /> : isPersonnel ? <SimpleRefreshToolbar exportText="导出" /> : <MonitorToolbar chart={meta.chart} total={isSensorLog ? 607235 : undefined} />}
      <div className="monitor-list-panel">
        <DataTable<Record<string, unknown>> columns={tableColumns} rows={tableRows} />
      </div>
    </PageScaffold>
  );
}
