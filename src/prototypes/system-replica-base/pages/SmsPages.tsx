import React, { useState } from 'react';
import { setProtoDevState, useProtoDevState } from '@axhub/annotation';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, CircleChevronUp, Eye, FileText, Folder, Plus, RefreshCw, RotateCcw, Search, Settings, SlidersHorizontal, Upload, X } from 'lucide-react';
import { PageScaffold } from '../components/AppShell';
import { Column, DataTable, Field } from '../components/Primitives';

type Row = Record<string, unknown>;
type SmsRecordScope = 'own' | 'other';
type SmsAddressBookMode = 'list' | 'detail';

function normalizeRecordScope(value: unknown): SmsRecordScope {
  return value === 'other' ? 'other' : 'own';
}

function normalizeAddressBookMode(value: unknown): SmsAddressBookMode {
  return value === 'detail' ? 'detail' : 'list';
}

const smsText = (mine: string, place: string, value: string, date = '2026年06月11日19时45分40秒') =>
  `{"alarmType": "001","templateParam":{"beginDate" : "${date}\\n", "content" : "${mine}${place}超限报警 , 当前最大值 ${value}ppm，报警未解除，原因待查 "}}`;

function SmsToolbar({ total, pages = ['1', '2', '3'], add, exportButton, batch, noPager = false }: { total: number; pages?: string[]; add?: boolean; exportButton?: boolean; batch?: string; noPager?: boolean }) {
  return <div className="sms-toolbar">
    <button className="icon-button" type="button"><RefreshCw size={17} /></button>
    {batch && <button className="sms-tool-text" type="button"><Settings size={15} />{batch}</button>}
    {exportButton && <button className="sms-tool-text" type="button"><Upload size={15} />导出</button>}
    {add && <button className="sms-tool-text" type="button"><Plus size={15} />新增</button>}
    {!noPager && <div className="pagination sms-pagination"><span>共 {total} 条</span><button disabled><ChevronLeft size={16}/></button>{pages.map((page, index) => <button key={page} className={index === 0 ? 'page-active' : ''}>{page}</button>)}{pages.length > 5 && <button>···</button>}<button><ChevronRight size={16}/></button><select><option>20条/页</option></select><CircleChevronUp size={15}/></div>}
    {noPager && <div className="pagination sms-pagination"><span>共 {total} 条</span><select><option>20条/页</option></select></div>}
  </div>;
}

function ActionIcons({ kind = 'edit' }: { kind?: 'edit' | 'rule' | 'settings' }) {
  const text = kind === 'rule' ? '    ' : kind === 'settings' ? '' : '  ';
  return <span className="sms-actions">{text}</span>;
}

const recordRows: Row[] = [
  { id: 1, name: '王贤雷', phone: '18982842288', mine: '金刚煤矿', content: smsText('达竹中心金刚煤矿', '-100m西翼南部探巷回风CO', '114.00', '2026年06月11日19时46分38秒'), time: '2026-06-11 19:51', sent: '是', result: '成功' },
  { id: 2, name: '周堃', phone: '18395201466', mine: '金刚煤矿', content: smsText('达竹中心金刚煤矿', '-100m西翼南部探巷回风CO', '114.00', '2026年06月11日19时46分38秒'), time: '2026-06-11 19:51', sent: '是', result: '成功' },
  { id: 3, name: '王贤雷', phone: '18982842288', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '115.00'), time: '2026-06-11 19:49', sent: '是', result: '成功' },
  { id: 4, name: '周堃', phone: '18395201466', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '115.00'), time: '2026-06-11 19:49', sent: '是', result: '成功' },
  { id: 5, name: '周堃', phone: '18395201466', mine: '金刚煤矿', content: smsText('达竹中心金刚煤矿', '-100m西翼南部探巷回风CO', '68.00', '2026年06月11日19时46分38秒'), time: '2026-06-11 19:49', sent: '是', result: '成功' },
  { id: 6, name: '周堃', phone: '18395201466', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '64.00'), time: '2026-06-11 19:49', sent: '是', result: '成功' },
  { id: 7, name: '张元林', phone: '13982863361', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '54.00'), time: '2026-06-11 19:47', sent: '是', result: '成功' },
  { id: 8, name: '王显进', phone: '15882958260', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '54.00'), time: '2026-06-11 19:47', sent: '是', result: '成功' },
  { id: 9, name: '陈为健', phone: '13982833223', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '54.00'), time: '2026-06-11 19:47', sent: '是', result: '成功' },
  { id: 10, name: '张兴军', phone: '15983893410', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '54.00'), time: '2026-06-11 19:47', sent: '是', result: '成功' },
];

const otherUnitRecordRows: Row[] = [
  { id: 1, unit: '大竹县', name: '王贤雷', phone: '18982842288', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '115.00'), time: '2026-06-11 19:49', sent: '是', result: '成功' },
  { id: 2, unit: '大竹县', name: '张元林', phone: '13982863361', mine: '堡子煤矿', content: smsText('大竹县堡子煤矿', '33采区北外大连采煤工作面回风一氧化碳', '54.00'), time: '2026-06-11 19:47', sent: '是', result: '成功' },
  { id: 3, unit: '达川区', name: '刘远峰', phone: '13882891234', mine: '金刚煤矿', content: smsText('达川区金刚煤矿', '-100m西翼南部探巷回风CO', '86.00'), time: '2026-06-11 19:44', sent: '是', result: '成功' },
  { id: 4, unit: '达川区', name: '陈为健', phone: '13982833223', mine: '金刚煤矿', content: smsText('达川区金刚煤矿', '-100m西翼南部探巷回风CO', '76.00'), time: '2026-06-11 19:42', sent: '是', result: '成功' },
  { id: 5, unit: '宣汉县', name: '周堃', phone: '18395201466', mine: '茶园煤矿', content: smsText('宣汉县茶园煤矿', '二采区回风巷一氧化碳', '69.00'), time: '2026-06-11 19:40', sent: '是', result: '成功' },
  { id: 6, unit: '开江县', name: '王显进', phone: '15882958260', mine: '保康煤矿', content: smsText('开江县保康煤矿', '主斜井回风CO', '58.00'), time: '2026-06-11 19:37', sent: '是', result: '成功' },
  { id: 7, unit: '渠县', name: '张兴军', phone: '15983893410', mine: '福禄煤矿', content: smsText('渠县福禄煤矿', '采煤工作面回风一氧化碳', '51.00'), time: '2026-06-11 19:35', sent: '是', result: '成功' },
  { id: 8, unit: '万源市', name: '李星', phone: '13882880001', mine: '楠木沟煤矿', content: smsText('万源市楠木沟煤矿', '运输巷CO', '48.00'), time: '2026-06-11 19:32', sent: '是', result: '成功' },
];

const recordColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 80 }, { key: 'name', title: '接收人员', width: 90 }, { key: 'phone', title: '人员电话', width: 150 }, { key: 'mine', title: '煤矿名称', width: 190 },
  { key: 'content', title: '短信内容', width: 650, render: (r) => <span className="sms-long-text">{String(r.content)}</span> }, { key: 'time', title: '发送时间', width: 150 },
  { key: 'sent', title: '是否发送', width: 90, render: (r) => <span className="yes-tag">{String(r.sent)}</span> }, { key: 'result', title: '发送结果', width: 160 },
];

const otherUnitRecordColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 70 }, { key: 'unit', title: '发送单位', width: 110 }, { key: 'name', title: '接收人员', width: 90 }, { key: 'phone', title: '人员电话', width: 140 }, { key: 'mine', title: '煤矿名称', width: 180 },
  { key: 'content', title: '短信内容', width: 600, render: (r) => <span className="sms-long-text">{String(r.content)}</span> }, { key: 'time', title: '发送时间', width: 150 },
  { key: 'sent', title: '是否发送', width: 90, render: (r) => <span className="yes-tag">{String(r.sent)}</span> }, { key: 'result', title: '发送结果', width: 150 },
];

function SendUnitField() {
  return <label className="query-field send-unit-field"><span>发送单位：</span><select className="sms-native-select" defaultValue="" aria-label="发送单位"><option value="">全部发送单位</option><option>大竹县</option><option>达川区</option><option>宣汉县</option><option>开江县</option><option>渠县</option><option>万源市</option></select></label>;
}

export function SmsRecordPage() {
  const protoState = useProtoDevState<{ sms_record_scope?: SmsRecordScope }>();
  const [localUnitScope, setLocalUnitScope] = useState<SmsRecordScope>('own');
  const unitScope = normalizeRecordScope(protoState.sms_record_scope ?? localUnitScope);
  const isOtherUnit = unitScope === 'other';
  const handleScopeChange = (nextScope: SmsRecordScope) => {
    setLocalUnitScope(nextScope);
    setProtoDevState({ sms_record_scope: nextScope });
  };

  return <PageScaffold title="短信发送记录查询">
    <div className="sms-record-unit-tabs" role="tablist" aria-label="短信记录单位范围" data-annotation-id="sms-record-tabs">
      <button className={!isOtherUnit ? 'active' : ''} type="button" role="tab" aria-selected={!isOtherUnit} onClick={() => handleScopeChange('own')}>本单位</button>
      <button className={isOtherUnit ? 'active' : ''} type="button" role="tab" aria-selected={isOtherUnit} onClick={() => handleScopeChange('other')}>其他单位</button>
    </div>
    <section className={`sms-query-panel record-query ${isOtherUnit ? 'other-unit-query' : ''}`} data-annotation-id="sms-record-query">
      <label className="sms-query-field date-field"><span>生成日期：</span><button className="date-chip active" type="button">一周</button><button className="date-chip" type="button">自定义</button><div className="date-range"><span>▦</span><em>2026-06-04</em><b>至</b><em>2026-06-11</em></div></label>
      <label className="sms-query-field compact"><span>是否发送：</span><button className="date-chip small active" type="button">是</button><button className="date-chip small" type="button">否</button></label>
      {isOtherUnit && <SendUnitField />}
      <Field label="煤矿名称" placeholder="请输入煤矿名称" type="select" />
      <Field label="接收人员" placeholder="请输入接收人员" />
      <div className="sms-query-actions"><button className="primary-button" type="button"><Search size={15}/>查询</button><button className="light-button" type="button"><RotateCcw size={15}/>重置</button></div>
    </section>
    <SmsToolbar total={isOtherUnit ? 486 : 2112} pages={isOtherUnit ? ['1','2','3','4','5','…','25'] : ['1','2','3','4','5','6','…','106']} />
    <div data-annotation-id="sms-record-table">
      <DataTable<Row> columns={isOtherUnit ? otherUnitRecordColumns : recordColumns} rows={isOtherUnit ? otherUnitRecordRows : recordRows} />
    </div>
  </PageScaffold>;
}
const ruleRows: Row[] = [
  { id: 1, exp: '', name: '【橙色】监管人员、驻矿员网络/数据系统断线【T≥180】（共1条）', mine: '否', status: '启用' },
  { id: 2, exp: '', name: '【黄色】监管人员、驻矿员网络/数据系统断线【120≤T＜180】（共1条）', mine: '否', status: '启用' },
  { id: 3, exp: '', name: '【蓝色】监管人员、驻矿员网络/数据系统断线【60≤T＜120】（共1条）', mine: '否', status: '启用' },
  { id: 4, exp: '', name: '【橙色】市级、县级一氧化碳超限值【300≤CO】时间【T＜20】（共4条）', mine: '否', status: '启用' },
  { id: 5, exp: '', name: '【黄色】市级、县级一氧化碳超限值【100≤CO＜300】时间【T＜20】（共4条）', mine: '否', status: '启用' },
];
const ruleColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 90 }, { key: 'exp', title: '', width: 44 }, { key: 'name', title: '规则名称', width: 720, align: 'left' }, { key: 'mine', title: '是否为煤矿规则', width: 170 }, { key: 'status', title: '状态', width: 120 }, { key: 'op', title: '操作', width: 180, render: () => <ActionIcons kind="rule"/> },
];

export function SmsRulePage() {
  return <PageScaffold title="短信发送规则设置">
    <section className="sms-query-panel two-query"><Field label="传感器类型" placeholder="请选择传感器类型" type="select" /><Field label="报警类型" placeholder="请选择报警类型" type="select" /><div className="sms-query-actions"><button className="primary-button" type="button"><Search size={15}/>查询</button><button className="light-button" type="button"><RotateCcw size={15}/>重置</button></div></section>
    <SmsToolbar total={38} pages={['1','2']} add />
    <DataTable<Row> columns={ruleColumns} rows={ruleRows} />
  </PageScaffold>;
}

const enterpriseRows: Row[] = [
  { id: 1, name: '孙伟', duty: '调度主任', job: '调度负责人', type: '安全管理人员', phone: '13558695473', rule: '', sms: '否' },
  { id: 2, name: '李阳凯', duty: '生产副矿长', job: '生产副矿长', type: '安全管理人员', phone: '18982895999', rule: '', sms: '否' },
  { id: 3, name: '杨涛', duty: '机电科长', job: '机电负责人', type: '安全管理人员', phone: '14726660289', rule: '', sms: '否' },
  { id: 4, name: '黄正义', duty: '通防副矿长', job: '通防负责人', type: '安全管理人员', phone: '13778344199', rule: '煤矿规则', sms: '否' },
  { id: 5, name: '王小林', duty: '安全副矿长', job: '安全负责人', type: '安全管理人员', phone: '13982861112', rule: '', sms: '否' },
];
const enterpriseColumns: Column<Row>[] = [
  { key: 'sel', title: <input type="checkbox" aria-label="选择" />, width: 44, render: () => <input type="checkbox" aria-label="选择行" /> }, { key: 'id', title: '序号', width: 60 }, { key: 'name', title: '姓名', width: 90 }, { key: 'duty', title: '职务', width: 140 }, { key: 'job', title: '工种', width: 140 }, { key: 'type', title: '工种类别', width: 140 }, { key: 'phone', title: '手机号码', width: 150 }, { key: 'rule', title: '短信接收规则', width: 180 }, { key: 'sms', title: '是否接收短信', width: 140, render: (r) => <span className="switch-copy"><i/>否</span> },
];

function TreeExpander({ muted = false }: { muted?: boolean }) {
  return <ChevronRight className="tree-expander" size={13} aria-hidden="true" strokeWidth={2.1} data-muted={muted || undefined} />;
}

function TreeFolderIcon() {
  return <Folder className="tree-node-icon folder-icon" size={15} aria-hidden="true" strokeWidth={1.7} />;
}

function TreeFileIcon() {
  return <FileText className="tree-node-icon file-icon" size={14} aria-hidden="true" strokeWidth={1.6} />;
}

function MineTree({ gov = false }: { gov?: boolean }) {
  const mines = ['杨家沟煤矿','新兴煤矿','水沟槽煤矿','达州市建设煤矿','易家沟煤矿三号井','达昌煤矿','高益煤矿','保康煤矿','茶园煤矿','兰草沟煤矿','黑石溪二井','上峡煤矿','炉坪煤矿','大路南矿','楠木沟煤矿','福禄煤矿','堡子煤矿','金刚煤矿','柏林煤矿','小河嘴煤矿','铁山南煤矿','斌郎煤矿'];
  return <aside className="sms-tree-panel"><div className="tree-search"><button type="button" aria-label="展开树节点"><ChevronRight size={15} aria-hidden="true" /></button><input placeholder="请输入关键字进行过滤"/><SlidersHorizontal size={15}/></div><div className="tree-list">{gov ? <><div className="tree-item folder"><TreeExpander /><TreeFolderIcon />达州市</div><div className="tree-item child"><TreeExpander muted /><TreeFolderIcon />达州市监管</div></> : mines.map((m) => <div className="tree-item" key={m}><TreeFileIcon />{m}</div>)}</div></aside>;
}

export function SmsEnterpriseReceiverPage() {
  return <PageScaffold title="企业接收人员">
    <div className="sms-split"><MineTree /><main className="sms-split-main"><div className="sms-tabs"><button className="active">按区域</button><button>按集团</button></div><section className="sms-query-panel receiver-query"><label className="sms-query-field wide"><span>工种类别：</span><button className="date-chip active"></button><button className="date-chip">安全管理人员</button><button className="date-chip">特种作业人员</button><button className="date-chip">井下作业人员</button><button className="date-chip">地面作业人员</button></label><Field label="姓名" placeholder="请输入姓名" /><div className="sms-query-actions"><button className="primary-button" type="button"><Search size={15}/>查询</button><button className="light-button" type="button"><RotateCcw size={15}/>重置</button></div></section><SmsToolbar total={108} pages={['1','2','3','4','5','6']} batch="批量设置"/><DataTable<Row> columns={enterpriseColumns} rows={enterpriseRows}/></main></div>
  </PageScaffold>;
}

const govRows: Row[] = [
  { id: 1, name: '申权', duty: '一般工作人员', phone: '18085885520', rule: '', perm: '监管', sms: '否', set: '否', count: 0 },
  { id: 2, name: '李星', duty: '值班人员', phone: '13882880001', rule: '', perm: '监管', sms: '否', set: '否', count: 0 },
  { id: 3, name: '刘鹏', duty: '科室负责人', phone: '13982880002', rule: '监管规则', perm: '监管', sms: '是', set: '是', count: 12 },
];
const govColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 60 }, { key: 'name', title: '姓名', width: 90 }, { key: 'duty', title: '职务', width: 150 }, { key: 'phone', title: '手机号码', width: 140 }, { key: 'rule', title: '短信接收规则', width: 150 }, { key: 'perm', title: '数据权限', width: 110 }, { key: 'sms', title: '是否接收短信', width: 130 }, { key: 'set', title: '是否设置', width: 110 }, { key: 'count', title: '接收企业（家）', width: 130 }, { key: 'op', title: '操作', width: 90, render: () => <ActionIcons kind="settings"/> },
];
export function SmsGovernmentReceiverPage() {
  return <PageScaffold title="政府接收人员"><div className="sms-split"><MineTree gov/><main className="sms-split-main"><section className="sms-query-panel gov-query"><Field label="姓名" placeholder="请输入姓名" /><div className="sms-query-actions"><button className="primary-button" type="button"><Search size={15}/>查询</button><button className="light-button" type="button"><RotateCcw size={15}/>重置</button></div></section><SmsToolbar total={44} pages={['1','2','3']} exportButton/><DataTable<Row> columns={govColumns} rows={govRows}/></main></div></PageScaffold>;
}


const otherUnitContacts: Row[] = [
  { id: 1, unit: '达州市应急管理局', department: '煤矿安全监管科', name: '申权', duty: '一般工作人员', phone: '18085885520', ruleCount: 8, sms: '是', set: '是', count: 27 },
  { id: 2, unit: '达州市应急管理局', department: '值班调度中心', name: '李星', duty: '值班人员', phone: '13882880001', ruleCount: 6, sms: '是', set: '是', count: 18 },
  { id: 3, unit: '大竹县应急管理局', department: '煤矿安全股', name: '刘鹏', duty: '科室负责人', phone: '13982880002', ruleCount: 12, sms: '是', set: '是', count: 12 },
  { id: 4, unit: '宣汉县应急管理局', department: '监管执法大队', name: '周堃', duty: '监管人员', phone: '18395201466', ruleCount: 4, sms: '是', set: '是', count: 9 },
  { id: 5, unit: '渠县应急管理局', department: '煤矿监管股', name: '王显进', duty: '监管人员', phone: '15882958260', ruleCount: 0, sms: '否', set: '否', count: 0 },
  { id: 6, unit: '万源市应急管理局', department: '值班室', name: '张兴军', duty: '值班人员', phone: '15983893410', ruleCount: 3, sms: '是', set: '是', count: 6 },
];

const otherUnitRuleRows: Row[] = [
  { id: 1, name: '【橙色】市级、县级一氧化碳超限值【300≤CO】时间【T＜20】', type: '一氧化碳超限', scope: '达州市监管煤矿', status: '启用' },
  { id: 2, name: '【黄色】市级、县级一氧化碳超限值【100≤CO＜300】时间【T＜20】', type: '一氧化碳超限', scope: '辖区重点煤矿', status: '启用' },
  { id: 3, name: '监管人员、驻矿员网络/数据系统断线【T≥180】', type: '系统断线', scope: '联网矿井', status: '启用' },
  { id: 4, name: '甲烷传感器超限报警通知规则', type: '甲烷超限', scope: '高瓦斯矿井', status: '启用' },
];

function OtherUnitTree() {
  const roots = [
    { name: '达州市应急管理局', children: ['煤矿安全监管科', '值班调度中心'] },
    { name: '大竹县应急管理局', children: ['煤矿安全股', '驻矿监管组'] },
    { name: '宣汉县应急管理局', children: ['监管执法大队'] },
    { name: '渠县应急管理局', children: ['煤矿监管股'] },
    { name: '万源市应急管理局', children: ['值班室'] },
  ];
  return <aside className="sms-tree-panel other-unit-tree" data-annotation-id="other-unit-directory"><div className="tree-search"><button type="button" aria-label="展开树节点"><ChevronRight size={15} aria-hidden="true" /></button><input placeholder="请输入单位或人员关键字"/><SlidersHorizontal size={15}/></div><div className="tree-list">{roots.map((root, index) => <div className="other-unit-root" key={root.name}><div className={`tree-item folder ${index === 0 ? 'active' : ''}`}><TreeExpander /><TreeFolderIcon />{root.name}</div>{root.children.map((child) => <div className="tree-item child" key={child}><TreeExpander muted /><TreeFolderIcon />{child}</div>)}</div>)}</div></aside>;
}

function getOtherUnitRules(count: number): Row[] {
  const rows: Row[] = [
    { id: 1, name: '【橙色】市级、县级一氧化碳超限值【300≤CO】时间【T＜20】', mine: '否', status: '启用' },
    { id: 2, name: '【黄色】市级、县级一氧化碳超限值【100≤CO＜300】时间【T＜20】', mine: '否', status: '启用' },
    { id: 3, name: '监管人员、驻矿员网络/数据系统断线【T≥180】', mine: '否', status: '启用' },
    { id: 4, name: '甲烷传感器超限报警通知规则', mine: '是', status: '启用' },
    { id: 5, name: '【黄色】驻矿员、监管人员甲烷超限【1.0≤CH4＜1.5】【5≤T＜10】', mine: '否', status: '启用' },
    { id: 6, name: '【蓝色】驻矿员、监管人员甲烷超限【1.0≤CH4＜1.5】【T＜5】', mine: '否', status: '启用' },
    { id: 7, name: '驻矿员、监管人员传感器断线/无数据上传类', mine: '否', status: '启用' },
    { id: 8, name: '驻矿员、监管人员标校异常', mine: '否', status: '启用' },
    { id: 9, name: '【橙色】监管人员、驻矿员网络/数据系统断线【120≤T＜180】', mine: '否', status: '启用' },
    { id: 10, name: '【红色】局领导、监管人员、驻矿员一氧化碳超限【CO≥500】', mine: '否', status: '启用' },
    { id: 11, name: '【黄色】驻矿员、监管人员一氧化碳超限【100≤CO＜300】', mine: '否', status: '启用' },
    { id: 12, name: '【红色】局领导、监管人员、驻矿员甲烷超限关键字【进风巷】【回风巷】', mine: '否', status: '启用' },
  ];
  return rows.slice(0, Math.max(0, Math.min(count, rows.length)));
}

function getOtherUnitRuleNames(count: number) {
  return getOtherUnitRules(count).map((row) => String(row.name ?? '')).join('、');
}

function ConfigSectionHeader({ title, collapsed, onToggle }: { title: string; collapsed: boolean; onToggle: () => void }) {
  return <header><span>{title}</span><button className="config-collapse-button" type="button" onClick={onToggle} aria-label={collapsed ? `展开${title}` : `收起${title}`} aria-expanded={!collapsed}>{collapsed ? <ChevronRight size={16}/> : <ChevronDown size={16}/>}</button></header>;
}

function OtherUnitContactDetail({ row, onBack }: { row: Row; onBack: () => void }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => setCollapsed((current) => ({ ...current, [key]: !current[key] }));
  const ruleRows = getOtherUnitRules(Number(row.ruleCount) || 0);
  const ruleColumns: Column<Row>[] = [
    { key: 'name', title: '规则名称', width: 620, align: 'left' },
    { key: 'mine', title: '是否为煤矿规则', width: 190 },
    { key: 'status', title: '状态', width: 170, render: (r) => <span className="yes-tag">{String(r.status)}</span> },
  ];
  const companyRows: Row[] = [
    { id: 1, district: '通川区', company: '杨家沟煤矿' },
    { id: 2, district: '通川区', company: '新兴煤矿' },
    { id: 3, district: '达川区', company: '易家沟煤矿三号井' },
    { id: 4, district: '达川区', company: '达昌煤矿' },
    { id: 5, district: '达川区', company: '茶园煤矿' },
    { id: 6, district: '达川区', company: '达州市建设煤矿' },
    { id: 7, district: '达川区', company: '保康煤矿' },
    { id: 8, district: '宣汉县', company: '兰草沟煤矿' },
  ];
  const companyColumns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 80 },
    { key: 'district', title: '区县', width: 270 },
    { key: 'company', title: '企业名称', width: 720, align: 'left' },
  ];

  return <div className="config-view-page">
    <div className="config-view-top"><h1>详情</h1><button className="close-mark config-close-button" type="button" onClick={onBack} aria-label="关闭"><X size={15}/></button></div>
    <section className="config-card" data-annotation-id="other-unit-detail-basic">
      <ConfigSectionHeader title="基本信息" collapsed={Boolean(collapsed.basic)} onToggle={() => toggleSection('basic')} />
      {!collapsed.basic && <div className="config-basic-grid compact-basic-grid">
        <div className="config-label">姓名</div><div className="config-value">{String(row.name)}</div>
        <div className="config-label">职务</div><div className="config-value">{String(row.duty || '其他职务')}</div>
        <div className="config-label">手机号码</div><div className="config-value"><span className="readonly-text">{String(row.phone)}</span></div>
        <div className="config-label">是否接收短信</div><div className="config-value"><span>{String(row.sms)}</span></div>
        <div className="config-label">所属单位</div><div className="config-value">{String(row.unit)}</div>
        <div className="config-label">所属部门</div><div className="config-value">{String(row.department)}</div>
        <div className="config-label">短信接收规则数</div><div className="config-value">{String(row.ruleCount)} 条</div>
        <div className="config-label">接收企业（家）</div><div className="config-value">{String(row.count)} 家</div>
      </div>}
    </section>
    <section className="config-card readonly-rule-card" data-annotation-id="other-unit-detail-rules">
      <ConfigSectionHeader title="短信接收规则" collapsed={Boolean(collapsed.rules)} onToggle={() => toggleSection('rules')} />
      {!collapsed.rules && <DataTable<Row> columns={ruleColumns} rows={ruleRows} emptyText="该人员暂未设置短信接收规则" />}
    </section>
    <section className="config-card receive-company-card readonly-company-card" data-annotation-id="other-unit-detail-companies">
      <ConfigSectionHeader title="接收企业" collapsed={Boolean(collapsed.companies)} onToggle={() => toggleSection('companies')} />
      {!collapsed.companies && <DataTable<Row> columns={companyColumns} rows={companyRows} />}
    </section>
  </div>;
}
export function SmsOtherUnitAddressBookPage() {
  const protoState = useProtoDevState<{ sms_address_book_mode?: SmsAddressBookMode }>();
  const [selected, setSelected] = useState<Row | null>(null);
  const mode = normalizeAddressBookMode(protoState.sms_address_book_mode);
  const fallbackRow = otherUnitContacts[0] ?? null;
  const detailRow = selected ?? fallbackRow;

  if (mode === 'detail' && detailRow) {
    return <OtherUnitContactDetail row={detailRow} onBack={() => {
      setSelected(null);
      setProtoDevState({ sms_address_book_mode: 'list' });
    }} />;
  }

  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 60 },
    { key: 'unit', title: '所属单位', width: 180, align: 'left' },
    { key: 'name', title: '姓名', width: 90 },
    { key: 'duty', title: '职务', width: 140 },
    { key: 'phone', title: '手机号码', width: 140 },
    { key: 'ruleCount', title: '短信接收规则', width: 150, render: (r) => {
      const ruleNames = getOtherUnitRuleNames(Number(r.ruleCount) || 0);
      return <span className="sms-rule-name sms-rule-name-single-line" title={ruleNames} data-annotation-id={Number(r.id) === 1 ? 'other-unit-rule-cell' : undefined}>{ruleNames}</span>;
    } },
    { key: 'sms', title: '是否接收短信', width: 130, render: (r) => String(r.sms) === '是' ? <span className="yes-tag">是</span> : <span>否</span> },
    { key: 'set', title: '是否设置', width: 110 },
    { key: 'count', title: '接收企业（家）', width: 130 },
    { key: 'op', title: '操作', width: 100, render: (r) => <button className="sms-view-button" type="button" onClick={() => { setSelected(r); setProtoDevState({ sms_address_book_mode: 'detail' }); }}><Eye size={15}/>查看</button> },
  ];

  return <PageScaffold title="其他单位通讯录"><div className="sms-split"><OtherUnitTree/><main className="sms-split-main" data-annotation-id="other-unit-list"><section className="sms-query-panel other-address-query"><Field label="姓名" placeholder="请输入姓名" /><Field label="手机号码" placeholder="请输入手机号码" /><label className="sms-query-field compact"><span>是否接收短信：</span><button className="date-chip small active" type="button">全部</button><button className="date-chip small" type="button">是</button><button className="date-chip small" type="button">否</button></label><div className="sms-query-actions"><button className="primary-button" type="button"><Search size={15}/>查询</button><button className="light-button" type="button"><RotateCcw size={15}/>重置</button></div></section><SmsToolbar total={68} pages={['1','2','3','4']} exportButton/><DataTable<Row> columns={columns} rows={otherUnitContacts}/></main></div></PageScaffold>;
}
const templateRows: Row[] = [
  { id: 1, name: '甲烷、一氧化碳超限报警模板', type: '超限报警,标校,报警,正常', content: '{"alarmType": "001","templateParam":{"beginDate" : "${sms.beginDate}\\n", "content" : "${sms.countyName}${sms.customerName}<#if sms.cdLocation?exists>${sms.cdLocation}</#if>${sms.alarmTypeName} ,<#if sms.maxValue?exists> 当前最大值 ${sms.maxValue}${sms.unitCode}，</#if>报警未解除，原因待查 "}}' },
  { id: 2, name: '网络断线报警模板', type: '监控系统断线,人员定位断线,报警,煤矿联网上传断线', content: '{"alarmType": "001","templateParam":{"beginDate" : "${sms.beginDate}\\n", "content" : "${sms.countyName}${sms.customerName}安全监控系统发生${sms.alarmTypeName}报警，持续时间${sms.keepTimeStr}，原因待查"}}' },
  { id: 3, name: '传感器断线模板', type: '传感器断线,离线,正常', content: '{"alarmType": "001","templateParam":{"beginDate" : "${sms.beginDate}\\n", "content" : "${sms.countyName}${sms.customerName}的${sms.cdLocation} 传感器断线，已持续${sms.keepTimeStr}"}}' },
];
const templateColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 80 }, { key: 'name', title: '模板名称', width: 240 }, { key: 'type', title: '报警类型', width: 320 }, { key: 'content', title: '模板内容', width: 760, align: 'left', render: (r) => <span className="sms-long-text">{String(r.content)}</span> }, { key: 'op', title: '操作', width: 120, render: () => <ActionIcons/> },
];
export function SmsTemplatePage() {
  return <PageScaffold title="短信内容模板设置"><SmsToolbar total={3} add noPager/><DataTable<Row> columns={templateColumns} rows={templateRows}/></PageScaffold>;
}






