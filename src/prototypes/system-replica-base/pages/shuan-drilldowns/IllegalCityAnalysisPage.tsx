import React from 'react';
import {
  ChevronDown,
  Clock3,
  GitBranch,
  LogOut,
  RefreshCcw,
  Search,
  ShieldAlert,
  Siren,
  Undo2,
} from 'lucide-react';

function CityAnalysisPanel({
  title,
  aside,
  action,
  children,
  className = '',
}: {
  title: string;
  aside?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`city-analysis-panel${className ? ` ${className}` : ''}`}>
      <header className="city-analysis-panel__head">
        <div>
          <strong>{title}</strong>
          {aside ? <span>{aside}</span> : null}
        </div>
        {action ? <div className="city-analysis-panel__action">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}

export function IllegalCityAnalysisPage({ onExit }: { onExit?: () => void }) {
  const metrics = [
    { label: '待研判', value: '18', hint: '县级上报未定性事项', tone: 'cyan' },
    { label: '研判中', value: '7', hint: '已进入市级会商', tone: 'blue' },
    { label: '建议升级', value: '5', hint: '拟转挂牌督办', tone: 'red' },
    { label: '退回补查', value: '4', hint: '证据链不完整', tone: 'amber' },
    { label: '已形成意见', value: '26', hint: '当周已出具意见', tone: 'green' },
  ] as const;

  const tableRows = [
    ['达州星河煤矿', '达州市', '12', '隐蔽工作面 / 夜间异常', '疑似采掘未停', '人员定位与视频人数不一致', '待会商'],
    ['宜宾荣泰煤矿', '宜宾市', '9', '监控造假 / 瓦斯异常', '传感器异常待复核', '闭锁日志缺失', '研判中'],
    ['泸州古叙煤矿', '泸州市', '11', '隐瞒入井人数 / 夜间异常', '县级建议继续核查', '考勤与入井审批冲突', '建议升级'],
    ['广元北辰煤矿', '广元市', '7', '监控造假', '初判误报', '异常时段仍有辅证', '退回补查'],
    ['乐山嘉阳煤矿', '乐山市', '8', '隐蔽工作面 / 产量异常', '疑似停产期生产', '煤流与电流峰值无法解释', '已形成意见'],
  ] as const;

  const sourceCards = [
    { key: 'gas', title: '瓦斯线索', count: '14', detail: '超限、恒值、夜间波动叠加', tone: 'cyan' },
    { key: 'wind', title: '通风线索', count: '9', detail: '局扇启停与风量趋势冲突', tone: 'blue' },
    { key: 'person', title: '人员线索', count: '16', detail: '入井审批、定位、视频人数不一致', tone: 'amber' },
    { key: 'coal', title: '产量线索', count: '11', detail: '停产期煤流、皮带、日报矛盾', tone: 'red' },
    { key: 'power', title: '用电线索', count: '8', detail: '夜间负荷异常与停送电记录冲突', tone: 'green' },
  ] as const;

  const timeline = [
    ['07-08 08:20', '县级上报', '古叙煤矿补充入井审批与视频截图'],
    ['07-08 09:10', '多源归并', '系统完成瓦斯、人员、煤流、电流关联聚类'],
    ['07-08 10:00', '争议锁定', '人员定位与视频人数差值扩大至 9 人'],
    ['07-08 11:15', '会商研判', '市级专班要求补查夜班交接和闭锁记录'],
    ['07-08 14:00', '形成建议', '拟转挂牌督办并同步追加现场复核'],
  ] as const;

  const disputePoints = [
    '县级认为属于临时检修，但煤流、电流和人员定位同时活跃。',
    '视频抽帧显示夜间运输巷有持续人员流动，与停产说明不一致。',
    '局部闭锁记录缺失，无法排除监控造假或人工屏蔽的可能。',
  ];

  const conclusion = [
    '当前事项不适合继续停留在县级核查层，需由市级统一整合多源证据后给出处置去向。',
    '综合研判倾向为“疑似停产期组织生产并伴随监测规避行为”，建议按高风险事项升级处置。',
  ];

  const suggestions = [
    '继续核查夜班交接、停送电、入井审批三类台账是否互相印证。',
    '同步转挂牌督办预审，锁定矿井、区域、责任单位和会商纪要编号。',
    '对缺失日志的监测点补拉原始数据，判断是否存在造假或误报。',
  ];

  const records = [
    ['10:00', '市级专班', '要求补齐 7 月 7 日 20:00-24:00 视频抽帧与交接班记录。'],
    ['11:15', '应急监管处', '确认县级现有结论证据不足，先不予闭环。'],
    ['14:00', '联合会商', '形成“继续核查 + 预转挂牌督办”的双轨意见。'],
  ] as const;

  const actionButtons = [
    { label: '维持整改', tone: 'blue', icon: ShieldAlert },
    { label: '继续核查', tone: 'cyan', icon: Search },
    { label: '转挂牌督办', tone: 'red', icon: GitBranch },
    { label: '排除误报', tone: 'slate', icon: Undo2 },
  ] as const;

  return (
    <div className="drill-page drill-city-analysis-page tone-red">
      <header className="city-analysis-titlebar">
        <div>
          <strong>专项研判 / 市级研判</strong>
          <span>复杂事项升级研判页</span>
        </div>
        <button type="button" className="city-analysis-exit" onClick={onExit}>
          <LogOut aria-hidden="true" />
          退出
        </button>
      </header>

      <section className="city-analysis-toolbar" aria-label="专项研判筛选与工具">
        <div className="city-analysis-toolbar__intro">
          <span>县级难以定性的事项，由市级汇聚多源线索、统一形成意见并决定去向。</span>
        </div>
        <div className="city-analysis-toolbar__filters">
          <label className="city-analysis-filter wide">
            <span>矿井 / 事项</span>
            <button type="button">
              <em>古叙煤矿 / 夜间异常组织生产</em>
              <ChevronDown aria-hidden="true" />
            </button>
          </label>
          <label className="city-analysis-filter">
            <span>统计周期</span>
            <button type="button">
              <em>近 7 日</em>
              <ChevronDown aria-hidden="true" />
            </button>
          </label>
          <label className="city-analysis-filter">
            <span>当前状态</span>
            <button type="button">
              <em>全部</em>
              <ChevronDown aria-hidden="true" />
            </button>
          </label>
          <button type="button" className="city-analysis-refresh">
            <RefreshCcw aria-hidden="true" />
            刷新归并
          </button>
        </div>
      </section>

      <section className="city-analysis-summary" aria-label="专项研判核心指标">
        {metrics.map((item) => (
          <article key={item.label} className={`tone-${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <em>{item.hint}</em>
          </article>
        ))}
      </section>

      <section className="city-analysis-layout">
        <div className="city-analysis-main">
          <CityAnalysisPanel title="复杂事项主清单" aside="按当前优先级排序">
            <div className="city-analysis-table" role="table" aria-label="市级专项研判主表格">
              <div className="city-analysis-table__row head" role="row">
                <span>煤矿名称</span>
                <span>区域</span>
                <span>来源线索数</span>
                <span>关联专项</span>
                <span>县级结论</span>
                <span>争议点</span>
                <span>当前状态</span>
              </div>
              {tableRows.map((row) => (
                <div key={`${row[0]}-${row[1]}`} className="city-analysis-table__row" role="row">
                  <span>{row[0]}</span>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>{row[3]}</span>
                  <span>{row[4]}</span>
                  <span>{row[5]}</span>
                  <span className={`status-${row[6]}`}>{row[6]}</span>
                </div>
              ))}
            </div>
          </CityAnalysisPanel>

          <div className="city-analysis-core-grid">
            <CityAnalysisPanel title="多源线索归并视图" aside="瓦斯 / 风 / 人 / 煤 / 电">
              <div className="city-analysis-source-grid">
                {sourceCards.map((item) => (
                  <article key={item.key} className={`tone-${item.tone}`}>
                    <header>
                      <span>{item.title}</span>
                      <strong>{item.count}</strong>
                    </header>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
              <div className="city-analysis-merge-links" aria-hidden="true">
                <i className="center" />
                <span className="tag county">县级结论</span>
                <span className="tag city">市级归并</span>
              </div>
              <div className="city-analysis-merge-center">
                <b>夜间异常组织生产</b>
                <span>古叙煤矿</span>
                <em>5 类线索交叉命中，争议仍未消除</em>
              </div>
            </CityAnalysisPanel>

            <CityAnalysisPanel title="异常时间轴" aside="聚焦证据收敛过程">
              <div className="city-analysis-timeline">
                {timeline.map((item, index) => (
                  <article key={`${item[0]}-${item[1]}`}>
                    <i aria-hidden="true" className={index === timeline.length - 1 ? 'end' : ''} />
                    <div>
                      <header>
                        <strong>{item[1]}</strong>
                        <span>{item[0]}</span>
                      </header>
                      <p>{item[2]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </CityAnalysisPanel>
          </div>
        </div>

        <aside className="city-analysis-side">
          <CityAnalysisPanel
            title="研判意见区"
            aside="围绕争议、结论、动作与会商留痕"
            action={
              <button type="button" className="city-analysis-opinion-meta">
                <Clock3 aria-hidden="true" />
                最近更新时间 07-08 14:00
              </button>
            }
          >
            <div className="city-analysis-opinion-section">
              <strong>核心争议</strong>
              <ul>
                {disputePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="city-analysis-opinion-section">
              <strong>研判结论</strong>
              <ul>
                {conclusion.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="city-analysis-opinion-section">
              <strong>建议动作</strong>
              <ul>
                {suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="city-analysis-opinion-section records">
              <strong>会商记录</strong>
              <div className="city-analysis-records">
                {records.map((item) => (
                  <article key={`${item[0]}-${item[1]}`}>
                    <span>{item[0]}</span>
                    <b>{item[1]}</b>
                    <p>{item[2]}</p>
                  </article>
                ))}
              </div>
            </div>
          </CityAnalysisPanel>
        </aside>
      </section>

      <footer className="city-analysis-actions" aria-label="专项研判处置动作">
        {actionButtons.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} type="button" className={`tone-${item.tone}`}>
              <Icon aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </footer>
    </div>
  );
}
