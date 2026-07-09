import React from 'react';
import { BellRing, CalendarClock, ClipboardCheck, FileCheck2, LogOut, RefreshCcw, SendToBack, ShieldCheck } from 'lucide-react';
import { shuanProvinceSupervisionData } from './data';

function routeHref(page: string) {
  return `#page=${page}`;
}

function TonePill({ tone, children }: { tone: 'red' | 'amber' | 'cyan' | 'green' | 'blue'; children: React.ReactNode }) {
  return <span className={`drill-supervision-pill tone-${tone}`}>{children}</span>;
}

export function ProvinceSupervisionPage() {
  const data = shuanProvinceSupervisionData;

  return (
    <div className="drill-page drill-supervision-page drill-supervision-v2">
      <header className="drill-supervision-topline">
        <div>
          <p>{data.subtitle}</p>
          <h1>{data.title}</h1>
        </div>
        <a className="drill-supervision-exit" href={routeHref('shuan-home-command-v3')}>
          <LogOut aria-hidden="true" />
          <span>退出</span>
        </a>
      </header>

      <section className="drill-supervision-toolbar" aria-label="挂牌督办工具栏">
        <div className="drill-supervision-toolbar-group">
          {data.filters.map((item, index) => (
            <button key={item} type="button" className={index === 0 ? 'active' : ''}>
              {item}
            </button>
          ))}
        </div>
        <div className="drill-supervision-toolbar-meta">
          <span>统计口径：{data.scope}</span>
          <span>更新时间：{data.updatedAt}</span>
          <button type="button"><RefreshCcw aria-hidden="true" />刷新</button>
        </div>
      </section>

      <section className="drill-supervision-kpis" aria-label="挂牌督办核心指标">
        {data.kpis.map((item) => (
          <article key={item.label} className={`tone-${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="drill-supervision-main">
        <div className="drill-supervision-left">
          <section className="drill-supervision-panel">
            <header className="drill-supervision-panel-head">
              <div>
                <strong>重大事项督办台账</strong>
                <span>围绕责任主体、督办时限、催办频次和销号条件统一落账</span>
              </div>
              <div className="drill-supervision-head-metrics">
                <span><em>临期提醒</em><b>5项</b></span>
                <span><em>超期压办</em><b>3项</b></span>
                <span><em>待复核销号</em><b>6项</b></span>
              </div>
            </header>

            <div className="drill-supervision-table">
              <div className="drill-supervision-table-row head">
                <span>事项编号</span>
                <span>煤矿名称</span>
                <span>挂牌原因</span>
                <span>责任单位</span>
                <span>督办时限</span>
                <span>当前节点</span>
                <span>状态</span>
              </div>
              {data.tableRows.map((row) => (
                <div className="drill-supervision-table-row" key={row.id}>
                  <span>{row.id}</span>
                  <span>{row.mine}</span>
                  <span>{row.reason}</span>
                  <span>{row.owner}</span>
                  <span>{row.deadline}</span>
                  <span>{row.node}</span>
                  <span>
                    <TonePill tone={row.tone}>{row.status}</TonePill>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="drill-supervision-panel drill-supervision-audit-zone">
            <header className="drill-supervision-panel-head">
              <div>
                <strong>销号审核区</strong>
                <span>明确销号申请、审核结论和退回后的再整改要求</span>
              </div>
            </header>

            <div className="drill-supervision-audit-grid">
              <article>
                <header><SendToBack aria-hidden="true" /><strong>销号申请</strong></header>
                <dl>
                  <div><dt>申请事项</dt><dd>{data.audit.application.item}</dd></div>
                  <div><dt>申请单位</dt><dd>{data.audit.application.owner}</dd></div>
                  <div><dt>提交时间</dt><dd>{data.audit.application.submittedAt}</dd></div>
                  <div><dt>佐证材料</dt><dd>{data.audit.application.materials}</dd></div>
                </dl>
              </article>

              <article>
                <header><ClipboardCheck aria-hidden="true" /><strong>审核结论</strong></header>
                <div className="drill-supervision-audit-result">
                  <TonePill tone={data.audit.decision.tone}>{data.audit.decision.status}</TonePill>
                  <p>{data.audit.decision.summary}</p>
                  <ul>
                    {data.audit.decision.points.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>

              <article>
                <header><FileCheck2 aria-hidden="true" /><strong>退回与再整改要求</strong></header>
                <div className="drill-supervision-rectify-box">
                  <p><b>退回原因：</b>{data.audit.rectify.reason}</p>
                  <p><b>再整改时限：</b>{data.audit.rectify.deadline}</p>
                  <ul>
                    {data.audit.rectify.actions.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            </div>
          </section>
        </div>

        <aside className="drill-supervision-right">
          <section className="drill-supervision-panel">
            <header className="drill-supervision-panel-head">
              <div>
                <strong>处置闭环时间轴</strong>
                <span>下发、签收、整改反馈、复核、销号全链跟踪</span>
              </div>
            </header>

            <div className="drill-supervision-timeline">
              {data.timeline.map((item, index) => (
                <div key={item.label} className={item.active ? 'active' : ''}>
                  <i>{index + 1}</i>
                  <section>
                    <strong>{item.label}</strong>
                    <span>{item.time}</span>
                    <p>{item.detail}</p>
                  </section>
                </div>
              ))}
            </div>
          </section>

          <section className="drill-supervision-panel">
            <header className="drill-supervision-panel-head">
              <div>
                <strong>催办记录与领导批示</strong>
                <span>直接回答“催办几次、是否已通报、批示落到了谁”</span>
              </div>
            </header>

            <div className="drill-supervision-side-stack">
              <article className="drill-supervision-side-card">
                <header><BellRing aria-hidden="true" /><strong>催办记录</strong></header>
                {data.reminders.map((item) => (
                  <p key={item.time}>
                    <span>{item.time}</span>
                    <b>{item.channel}</b>
                    <em>{item.target}</em>
                  </p>
                ))}
              </article>

              <article className="drill-supervision-side-card">
                <header><CalendarClock aria-hidden="true" /><strong>通报状态</strong></header>
                <div className="drill-supervision-notice">
                  <TonePill tone={data.notice.tone}>{data.notice.status}</TonePill>
                  <p>{data.notice.summary}</p>
                </div>
              </article>

              <article className="drill-supervision-side-card">
                <header><ShieldCheck aria-hidden="true" /><strong>领导批示与销号判断</strong></header>
                <div className="drill-supervision-judgement">
                  <p className="directive">{data.directive}</p>
                  <div className="drill-supervision-closure">
                    <TonePill tone={data.closure.tone}>{data.closure.status}</TonePill>
                    <p>{data.closure.summary}</p>
                    <ul>
                      {data.closure.conditions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
