import React from 'react';
import {
  ClipboardList,
  UserRound,
  Clock,
  Minus,
  Wind,
  Siren,
  Flame,
  House,
  ShieldAlert,
  Building2,
  Waves,
  Search,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  MapPinned,
  Gauge,
  Users,
  Factory,
  TrendingUp,
} from 'lucide-react';
import { normalizeInlineSvg } from '../../../../common/inlineSvg';
import sichuanMapSvg from '../../../../resources/shuan/sichuan-map.svg?raw';

const normalizedSichuanMapSvg = normalizeInlineSvg(sichuanMapSvg);

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function DangerousPanel({ title, aside, action, children }: { title: string; aside?: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="drill-dangerous-panel">
      <header>
        <div>
          <i />
          <strong>{title}</strong>
          {aside ? <em>{aside}</em> : null}
        </div>
        {action ? (
          <button type="button">
            {action}
            <ChevronRight aria-hidden="true" />
          </button>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function DangerousTable({ head, rows, className = '' }: { head: React.ReactNode[]; rows: React.ReactNode[][]; className?: string }) {
  return (
    <div className={`drill-dangerous-table ${className}`}>
      {[head, ...rows].map((row, index) => (
        <div key={index} className={index === 0 ? 'head' : ''}>
          {row.map((cell, cellIndex) => (
            <span key={`${index}-${cellIndex}`}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DangerousWorkReportPage() {
  const kpis = [
    { label: '今日报备总数', value: '128', unit: '次', delta: '较昨日  +18 ↑', tone: 'cyan', icon: ClipboardList },
    { label: '当前作业中', value: '47', unit: '次', delta: '较昨日  +7 ↑', tone: 'cyan', icon: UserRound },
    { label: '即将开始', value: '23', unit: '次', delta: '较昨日  +5 ↑', tone: 'blue', icon: Clock },
    { label: '已撤销', value: '12', unit: '次', delta: '较昨日  -3 ↓', tone: 'green', icon: Minus },
    { label: '涉瓦斯作业', value: '36', unit: '次', delta: '占比 28.1%', tone: 'amber', icon: Wind },
    { label: '涉爆破作业', value: '19', unit: '次', delta: '占比 14.8%', tone: 'red', icon: Siren },
  ];

  const typeCards = [
    ['动火作业', '26次', Flame, 'orange'],
    ['放炮作业', '19次', Siren, 'red'],
    ['排放瓦斯', '36次', Wind, 'amber'],
    ['清理煤仓', '11次', House, 'blue'],
    ['起封密闭', '9次', ShieldAlert, 'blue'],
    ['强制放顶', '8次', Building2, 'blue'],
    ['探放水', '11次', Waves, 'cyan'],
    ['其他', '8次', MoreIcon, 'slate'],
  ] as const;

  const ranks = [
    ['泸州市', '38次', 100],
    ['达州市', '24次', 76],
    ['广元市', '18次', 56],
    ['宜宾市', '16次', 50],
    ['攀枝花市', '12次', 42],
  ] as const;

  const trendDays = ['05-18', '05-19', '05-20', '05-21', '05-22', '05-23', '05-24'];
  const totalTrend = [92, 88, 95, 110, 101, 109, 128];
  const activeTrend = [32, 29, 31, 42, 38, 40, 47];

  const toTrendPoints = (values: number[], max: number) =>
    values.map((value, index) => `${8 + index * 14.5},${88 - (value / max) * 66}`).join(' ');

  const statusItems = [
    ['已报备', '518次', ClipboardList, 'blue'],
    ['即将开始', '23次', Clock, 'cyan'],
    ['进行中', '47次', Minus, 'green'],
    ['已结束', '426次', ClipboardList, 'cyan'],
    ['已撤销', '12次', Siren, 'red'],
  ] as const;

  const mapPoints = [
    ['广元市', 46, 23, 6, 'blue'],
    ['绵阳市', 50, 31, 5, 'blue'],
    ['巴中市', 61, 29, 4, 'green'],
    ['达州市', 70, 37, 12, 'amber'],
    ['南充市', 59, 39, 7, 'cyan'],
    ['成都市', 50, 44, 3, 'blue'],
    ['雅安市', 41, 55, 4, 'green'],
    ['眉山市', 48, 51, 8, 'amber'],
    ['乐山市', 46, 63, 6, 'blue'],
    ['宜宾市', 55, 73, 10, 'blue'],
    ['泸州市', 69, 75, 22, 'amber'],
    ['凉山州', 32, 64, 2, 'blue'],
    ['攀枝花市', 38, 82, 1, 'blue'],
    ['甘孜州', 36, 39, 2, 'blue'],
    ['遂宁市', 58, 49, 3, 'green'],
    ['资阳市', 62, 58, 3, 'blue'],
    ['自贡市', 64, 68, 2, 'blue'],
  ] as const;

  const keyRows = [
    ['高', '古蔺县菜煤矿', '排放瓦斯', '2112采面', '05-24 09:00', '进行中'],
    ['高', '古蔺县荣煤矿', '放炮作业', '+350米回风巷', '05-24 14:00', '即将开始'],
    ['中', '古蔺县荣煤矿', '排放瓦斯', '2105采面', '05-24 08:30', '进行中'],
    ['中', '叙永县某煤矿', '放炮作业', '天井口', '05-24 10:00', '即将开始'],
    ['中', '泸县某煤矿', '动火作业', '主运皮带巷', '05-24 11:00', '即将开始'],
  ];

  const upcomingRows = [
    ['叙永县荣煤矿', '放炮作业', '+230米运输巷', '05-24 15:00', '1小时后'],
    ['泸县某煤矿', '排放瓦斯', '三采区回风巷', '05-24 16:00', '2小时后'],
    ['古蔺县荣煤矿', '动火作业', '井口房', '05-24 17:00', '3小时后'],
  ];

  const cancelRows = [
    ['古蔺县荣煤矿', '放炮作业', '05-24 13:00', '05-24 10:20', '条件不具备'],
    ['泸县某煤矿', '排放瓦斯', '05-24 09:30', '05-24 08:15', '设备故障'],
    ['叙永县某煤矿', '动火作业', '05-24 11:00', '05-24 09:05', '计划调整'],
  ];

  const ledgerRows = [
    ['BB20250524001', '古蔺县荣煤矿', '排放瓦斯', '2112采面', '05-24 09:00', '05-24 17:00', '张建国', '进行中'],
    ['BB20250524002', '古蔺县荣煤矿', '放炮作业', '+350米回风巷', '05-24 14:00', '05-24 16:30', '李强', '即将开始'],
    ['BB20250524003', '叙永县荣煤矿', '动火作业', '主运皮带巷', '05-24 11:00', '05-24 12:30', '王伟', '即将开始'],
    ['BB20250524004', '泸县某煤矿', '排放瓦斯', '三采区回风巷', '05-24 16:00', '05-24 20:00', '陈刚', '即将开始'],
    ['BB20250524005', '古蔺县荣煤矿', '清理煤仓', '储煤仓2', '05-24 08:30', '05-24 10:30', '赵辉', '已结束'],
  ];

  const mineCards = [
    ['古蔺县荣煤矿', '12次', '8次', '2条', '高'],
    ['叙永县荣煤矿', '8次', '5次', '1条', '中'],
    ['泸县某煤矿', '6次', '4次', '2条', '中'],
    ['某示范煤矿', '5次', '3次', '0条', '低'],
  ];

  const statusClass = (status: string) =>
    status.includes('进行') ? 'running' : status.includes('即将') ? 'soon' : status.includes('结束') ? 'done' : 'cancel';

  return (
    <div className="drill-page drill-dangerous-work-page tone-cyan">
      <header className="drill-dangerous-titlebar">
        <div>
          <span>危险作业报备</span>
          <strong>今日作业报备监测</strong>
          <em>报备总览、地图定位、重点作业与异常关联一屏联动</em>
        </div>
        <button type="button" className="drill-dangerous-promote-button">
          <TrendingUp aria-hidden="true" />
          提升
        </button>
      </header>

      <section className="drill-dangerous-kpis" aria-label="危险作业报备核心指标">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`tone-${item.tone}`}>
              <div className="drill-dangerous-kpi-icon">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <span>{item.label}</span>
                <strong>
                  {item.value}
                  <small>{item.unit}</small>
                </strong>
                <em>{item.delta}</em>
              </div>
            </article>
          );
        })}
      </section>

      <section className="drill-dangerous-board">
        <aside className="drill-dangerous-left">
          <DangerousPanel title="作业类型分布" action="更多">
            <div className="drill-dangerous-type-grid">
              {typeCards.map(([label, value, Icon, tone]) => (
                <article key={label} className={`tone-${tone}`}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                </article>
              ))}
            </div>
          </DangerousPanel>

          <DangerousPanel title="分地区报备排行" aside="今日" action="更多">
            <div className="drill-dangerous-rank-list">
              {ranks.map(([name, value, width], index) => (
                <div key={name}>
                  <b>{index + 1}</b>
                  <span>{name}</span>
                  <i>
                    <em style={{ width: `${width}%` }} />
                  </i>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </DangerousPanel>

          <DangerousPanel title="近7日报备趋势">
            <div className="drill-dangerous-trend-head">
              <span>单位：次</span>
              <em>
                <i />
                报备总数
              </em>
              <em>
                <i className="green" />
                作业中
              </em>
            </div>
            <svg className="drill-dangerous-line" viewBox="0 0 110 100" preserveAspectRatio="none" aria-hidden="true">
              {[0, 20, 40, 60, 80, 100].map((v) => (
                <g key={v}>
                  <line x1="7" x2="108" y1={88 - v * 0.66} y2={88 - v * 0.66} />
                  <text x="0" y={91 - v * 0.66}>
                    {v}
                  </text>
                </g>
              ))}
              <polyline points={toTrendPoints(totalTrend, 130)} className="blue" />
              <polyline points={toTrendPoints(activeTrend, 60)} className="green" />
              {totalTrend.map((v, i) => (
                <text key={`t-${v}-${i}`} x={6 + i * 14.5} y={84 - (v / 130) * 66}>
                  {v}
                </text>
              ))}
              {activeTrend.map((v, i) => (
                <text key={`a-${v}-${i}`} x={6 + i * 14.5} y={84 - (v / 60) * 66}>
                  {v}
                </text>
              ))}
            </svg>
            <div className="drill-dangerous-axis">
              {trendDays.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </DangerousPanel>

          <DangerousPanel title="状态统计" aside="当前" action="更多">
            <div className="drill-dangerous-status">
              {statusItems.map(([label, value, Icon, tone]) => (
                <article key={label} className={`tone-${tone}`}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          </DangerousPanel>
        </aside>

        <main className="drill-dangerous-map-panel">
          <section className="drill-dangerous-map-toolbar">
            <label>
              <Search aria-hidden="true" />
              <input placeholder="搜索煤矿名称" />
            </label>
            <span>作业类型</span>
            <button type="button">
              请选择 <ChevronDown aria-hidden="true" />
            </button>
            <span>状态</span>
            <button type="button">
              请选择 <ChevronDown aria-hidden="true" />
            </button>
            <span>时间</span>
            <button type="button">
              2025-05-24 <CalendarDays aria-hidden="true" />
            </button>
            <button type="button" className="reset">
              重置
            </button>
          </section>
          <section className="drill-dangerous-map-stage">
            <div className="drill-dangerous-map-svg" dangerouslySetInnerHTML={{ __html: normalizedSichuanMapSvg }} />
            {mapPoints.map(([name, x, y, value, tone]) => (
              <div
                key={name}
                className={`drill-dangerous-map-point tone-${tone}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <b>{value}</b>
                <span>{name}</span>
              </div>
            ))}
            <div className="drill-dangerous-map-legend">
              {['已报备', '即将开始', '进行中', '已结束', '已撤销'].map((item, index) => (
                <span key={item} className={`s-${index}`}>
                  <i />
                  {item}
                </span>
              ))}
            </div>
            <div className="drill-dangerous-map-pop">
              <h3>
                <MapPinned aria-hidden="true" />
                泸州市
              </h3>
              <p>
                <span>煤矿数</span>
                <strong>22处</strong>
              </p>
              <p>
                <span>今日报备</span>
                <strong>38次</strong>
              </p>
              <p>
                <span>当前作业中</span>
                <strong>22次</strong>
              </p>
              <p>
                <span>重点关注</span>
                <strong className="red">6项</strong>
              </p>
              <button type="button">进入泸州市</button>
            </div>
            <div className="drill-dangerous-map-tools">
              <button type="button">+</button>
              <button type="button">−</button>
              <button type="button">
                <Gauge aria-hidden="true" />
              </button>
            </div>
          </section>
        </main>

        <aside className="drill-dangerous-right">
          <DangerousPanel title="重点作业清单" action="更多">
            <DangerousTable
              className="key"
              head={['风险', '煤矿名称', '作业类型', '作业地点', '计划时间', '状态']}
              rows={keyRows.map((r) => [
                <em className={`level ${r[0] === '高' ? 'high' : 'mid'}`}>{r[0]}</em>,
                r[1],
                <strong className="orange">{r[2]}</strong>,
                r[3],
                r[4],
                <b className={statusClass(r[5])}>{r[5]}</b>,
              ])}
            />
          </DangerousPanel>

          <DangerousPanel title="即将开始作业" aside="未来24小时" action="更多">
            <DangerousTable
              head={['煤矿名称', '作业类型', '作业地点', '计划时间', '状态']}
              rows={upcomingRows.map((r) => [
                r[0],
                <strong className="orange">{r[1]}</strong>,
                r[2],
                r[3],
                <b className="soon">{r[4]}</b>,
              ])}
            />
          </DangerousPanel>

          <DangerousPanel title="已撤销报备" aside="今日" action="更多">
            <DangerousTable
              head={['煤矿名称', '作业类型', '原计划时间', '撤销时间', '撤销原因']}
              rows={cancelRows.map((r) => [
                r[0],
                <strong className="orange">{r[1]}</strong>,
                r[2],
                r[3],
                <b className="cancel">{r[4]}</b>,
              ])}
            />
          </DangerousPanel>

          <DangerousPanel title="关联异常提示" aside="今日" action="更多">
            <div className="drill-dangerous-alerts">
              <article className="amber">
                <Wind aria-hidden="true" />
                <div>
                  <strong>瓦斯超限关联</strong>
                  <span>
                    <b>6</b>条　涉及<b>5</b>处煤矿
                  </span>
                </div>
              </article>
              <article className="red">
                <Users aria-hidden="true" />
                <div>
                  <strong>人员异常关联</strong>
                  <span>
                    <b>4</b>条　涉及<b>3</b>处煤矿
                  </span>
                </div>
              </article>
              <article className="purple">
                <ClipboardList aria-hidden="true" />
                <div>
                  <strong>监测预警关联</strong>
                  <span>
                    <b>8</b>条　涉及<b>6</b>处煤矿
                  </span>
                </div>
              </article>
            </div>
          </DangerousPanel>
        </aside>
      </section>

      <section className="drill-dangerous-bottom">
        <DangerousPanel title="报备明细滚动台账" aside="今日" action="更多">
          <DangerousTable
            className="ledger"
            head={['报备编号', '煤矿名称', '作业类型', '作业地点', '计划开始', '计划结束', '报备人', '状态']}
            rows={ledgerRows.map((r) => [
              r[0],
              r[1],
              <strong className="orange">{r[2]}</strong>,
              r[3],
              r[4],
              r[5],
              r[6],
              <b className={statusClass(r[7])}>{r[7]}</b>,
            ])}
          />
        </DangerousPanel>

        <DangerousPanel title="时段分布" aside="今日" action="更多">
          <div className="drill-dangerous-time-bars">
            {[
              ['上午', '6-12时', 54, 'blue'],
              ['下午', '12-18时', 48, 'green'],
              ['夜间', '18-次日6时', 26, 'orange'],
            ].map(([label, time, value, tone]) => (
              <div key={label as string}>
                <span>
                  {label}
                  <small>{time}</small>
                </span>
                <i>
                  <b className={tone as string} style={{ width: `${Number(value) * 1.55}%` }} />
                </i>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </DangerousPanel>

        <DangerousPanel title="重点煤矿关注" action="更多">
          <div className="drill-dangerous-mine-cards">
            {mineCards.map((m) => (
              <article key={m[0]}>
                <h4>
                  <Factory aria-hidden="true" />
                  {m[0]}
                </h4>
                <p>
                  今日报备 <b>{m[1]}</b>
                </p>
                <p>
                  作业中 <b>{m[2]}</b>
                </p>
                <p>
                  异常关联 <b className="red">{m[3]}</b>
                </p>
                <em className={m[4] === '高' ? 'high' : m[4] === '低' ? 'low' : 'mid'}>
                  风险等级　{m[4]}
                </em>
              </article>
            ))}
          </div>
        </DangerousPanel>
      </section>
    </div>
  );
}
