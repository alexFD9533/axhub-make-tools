import React from 'react';
import { Bell, EyeOff, LineChart, RefreshCw, Volume2, X } from 'lucide-react';
import { PageScaffold, SoundControls, Toolbar } from '../components/AppShell';
import { DataTable } from '../components/Primitives';

interface AlarmRow {
  id: number;
  level: string;
  area: string;
  mine: string;
  type: string;
  content: React.ReactNode;
  value: string;
  max: string;
  reason: string;
  measure: string;
  start: string;
  end: string;
  duration: string;
}

const alarmRows: AlarmRow[] = [
  {
    id: 1,
    level: '监管组甲烷超限类告警规则【1，1.5）',
    area: '金沙县',
    mine: '大运煤矿',
    type: '超限报警',
    content: (
      <div className="alarm-content-cell">
        <div>11121回风顺槽掘进工作面甲烷T1</div>
        <div>激光甲烷 超限报警</div>
        <div>最大值：1.03%CH4</div>
        <div>最大值时刻：2026-06-14 11:23:26</div>
      </div>
    ),
    value: '0.05%CH4',
    max: '1.03%CH4',
    reason: '',
    measure: '',
    start: '2026-06-14 11:23:24',
    end: '2026-06-14 11:23:27',
    duration: '3秒',
  },
];

const columns = [
  { key: 'select', title: <input type="checkbox" aria-label="选择" />, width: 52, render: () => <input type="checkbox" aria-label="选择行" /> },
  { key: 'id', title: '序号', width: 88 },
  { key: 'level', title: '级别', width: 126 },
  { key: 'area', title: '区县', width: 122 },
  { key: 'mine', title: '煤矿名称', width: 122 },
  { key: 'type', title: '报警类型', width: 122 },
  { key: 'content', title: '报警内容', width: 150, render: (row: AlarmRow) => row.content },
  { key: 'value', title: '监测值', width: 120 },
  { key: 'max', title: <>最大值 <span className="sort-mark">◆</span></>, width: 122 },
  { key: 'reason', title: '报警原因', width: 122 },
  { key: 'measure', title: '处置措施', width: 130 },
  { key: 'start', title: <>开始时间 <span className="sort-mark">◆</span></>, width: 160 },
  { key: 'end', title: '结束时间', width: 160 },
  { key: 'duration', title: <>持续时长 <span className="sort-mark">◆</span></>, width: 122 },
  { key: 'operate', title: '操作', width: 120, render: () => <div className="alarm-row-actions"><EyeOff size={20} /><span className="wave-icon">〰</span><LineChart size={19} /></div> },
];

function AuditToast() {
  return (
    <aside className="audit-toast" aria-label="报备审核提示">
      <button className="audit-close" type="button"><X size={16} /></button>
      <h2>报备审核提示</h2>
      <div className="audit-toast-body">
        <Bell size={16} fill="#7b8190" />
        <span>您有1条报备数据待审核！</span>
        <button type="button">去审核</button>
      </div>
    </aside>
  );
}

export function AlarmDisposalPage() {
  return (
    <PageScaffold title="报警处置" rightExtra={<div className="shift-text">晚班:2026-06-13 （20:00 - 08:00） 跨天</div>}>
      <div className="monitor-page-shell">
        <div className="tab-strip monitor-tab-strip">
          <button className="tab active">未确认报警（1）</button>
          <button className="tab">已确认报警（7）</button>
          <div className="tab-tools"><SoundControls /></div>
        </div>
        <Toolbar>
          <button className="icon-button muted-action" type="button"><EyeOff size={17} /></button>
          <div className="alarm-toolbar-spacer" />
          <span className="alarm-total">共 1 条</span>
          <select className="alarm-page-size"><option>20条/页</option></select>
          <button className="alarm-refresh" type="button"><span>刷新</span><RefreshCw size={16} /></button>
          <button className="batch-confirm" type="button"><span>批量确认报警</span><EyeOff size={16} /></button>
        </Toolbar>
        <div className="alarm-table-panel" data-annotation-id="alarm-table">
          <DataTable<AlarmRow> columns={columns} rows={alarmRows as unknown as Record<string, unknown>[] as AlarmRow[]} />
        </div>
      </div>
      <AuditToast />
    </PageScaffold>
  );
}
