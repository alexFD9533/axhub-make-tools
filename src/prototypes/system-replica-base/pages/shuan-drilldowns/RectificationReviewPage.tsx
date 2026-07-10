import React from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  LogOut,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { shuanRectificationReviewData } from './data';

function routeHref(page: string) {
  return `#page=${page}`;
}

export function RectificationReviewPage() {
  const data = shuanRectificationReviewData;
  const reasonMax = Math.max(...data.rejectReasons.map((item) => item.count));

  return (
    <div className="drill-page drill-review-page tone-cyan">
      <header className="drill-review-topline">
        <nav aria-label="页面标题">
          <span className="active">{data.title}</span>
        </nav>
        <a className="drill-review-exit" href={routeHref('shuan-home-command-v3')}>
          <LogOut aria-hidden="true" />
          <span>退出</span>
        </a>
      </header>

      <section className="drill-review-toolbox" aria-label="整改复核筛选与工具">
        <div className="drill-review-toolbox-main">
          <label>
            <span>统计周期</span>
            <button type="button">
              <CalendarDays aria-hidden="true" />
              {data.timeRange}
            </button>
          </label>
          <label className="drill-review-search">
            <span>煤矿检索</span>
            <div>
              <Search aria-hidden="true" />
              <input type="text" readOnly placeholder="煤矿名称 / 问题编号 / 责任人" aria-label="煤矿名称检索" />
            </div>
          </label>
          <div className="drill-review-filter-group">
            <span>状态</span>
            <div>
              {data.filters.statuses.map((item, index) => (
                <button key={item} type="button" className={index === 0 ? 'active' : ''}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="drill-review-kpis" aria-label="整改复核核心指标">
        {data.kpis.map((item) => (
          <article key={item.label} className={`tone-${item.tone}`}>
            <span>{item.label}</span>
            <strong>
              {item.value}
              <em>{item.unit}</em>
            </strong>
            <p>{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="drill-review-summary-grid">
        <article className="drill-review-panel drill-review-focus-card">
          <header>
            <strong>页面关注点</strong>
            <span>{data.updatedAt}</span>
          </header>
          <div className="drill-review-escalation-grid">
            {data.escalationCards.map((item) => (
              <section key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.hint}</em>
              </section>
            ))}
          </div>
        </article>

        <article className="drill-review-panel drill-review-compare-panel">
          <header>
            <strong>整改前后对比</strong>
            <span>看矿上改没改</span>
          </header>
          <div className="drill-review-compare-grid">
            <section className="before">
              <span>整改前</span>
              <strong>{data.compare.before.title}</strong>
              <p>{data.compare.before.summary}</p>
              <ul>
                {data.compare.before.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="after">
              <span>整改后</span>
              <strong>{data.compare.after.title}</strong>
              <p>{data.compare.after.summary}</p>
              <ul>
                {data.compare.after.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </section>

      <main className="drill-review-main">
        <section className="drill-review-panel drill-review-ledger">
          <header>
            <div>
              <strong>整改复核任务台账</strong>
              <span>县级复核主任务池</span>
            </div>
            <div className="drill-review-ledger-actions">
              <button type="button">仅看退回</button>
              <button type="button">仅看逾期</button>
            </div>
          </header>
          <div className="drill-review-ledger-summary" aria-label="整改复核台账摘要">
            <span><b>26</b>共计事项</span>
            <span><b>15</b>待县级复核</span>
            <span><b>7</b>复核退回</span>
            <span><b>5</b>逾期事项</span>
          </div>
          <div className="drill-review-table">
            <div className="head">
              {['煤矿名称', '问题来源', '所属专项', '整改期限', '当前状态', '责任人'].map((item) => <span key={item}>{item}</span>)}
            </div>
            {data.ledgerRows.map((row, index) => (
              <div key={`${row.mine}-${row.owner}`} className={index === 0 ? 'selected' : ''}>
                <span>{row.mine}</span>
                <span>{row.source}</span>
                <span>{row.campaign}</span>
                <span>{row.deadline}</span>
                <span><i className={`drill-review-status ${row.statusTone}`}>{row.status}</i></span>
                <span>{row.owner}</span>
              </div>
            ))}
          </div>
          <section className="drill-review-selected-task" aria-label="当前选中复核事项">
            <header>
              <div>
                <span>当前选中事项</span>
                <strong>{data.ledgerRows[0].mine}</strong>
              </div>
              <i className={`drill-review-status ${data.ledgerRows[0].statusTone}`}>{data.ledgerRows[0].status}</i>
            </header>
            <div>
              <article>
                <FileText aria-hidden="true" />
                <p><span>问题与专项</span><strong>{data.ledgerRows[0].source}</strong><em>{data.ledgerRows[0].campaign}</em></p>
              </article>
              <article>
                <Clock3 aria-hidden="true" />
                <p><span>整改时限</span><strong>{data.ledgerRows[0].deadline}</strong><em>责任人：{data.ledgerRows[0].owner}</em></p>
              </article>
              <article>
                <CheckCheck aria-hidden="true" />
                <p><span>复核建议</span><strong>{data.conclusions[0].conclusion}</strong><em>{data.upgradeRules[0].action}</em></p>
              </article>
            </div>
          </section>
          <footer className="drill-review-pagination">
            <span>共 26 项</span>
            <div>
              <button type="button" aria-label="上一页"><ChevronLeft aria-hidden="true" /></button>
              <b>1 / 3</b>
              <button type="button" aria-label="下一页"><ChevronRight aria-hidden="true" /></button>
            </div>
          </footer>
        </section>

        <aside className="drill-review-side drill-review-insight-panel">
          <header className="drill-review-side-head">
            <div>
              <strong>复核辅助判断</strong>
              <span>结论、退回原因与升级建议</span>
            </div>
            <em>基于当前台账</em>
          </header>
          <section className="drill-review-insight-section conclusion">
            <header>
              <strong>复核结论</strong>
              <span>看县里过没过</span>
            </header>
            <div className="drill-review-conclusion-list">
              {data.conclusions.map((item) => (
                <article key={`${item.mine}-${item.conclusion}`}>
                  <div>
                    <strong>{item.mine}</strong>
                    <span>{item.conclusion}</span>
                  </div>
                  <em>{item.reviewer}</em>
                </article>
              ))}
            </div>
          </section>

          <section className="drill-review-insight-section reasons">
            <header>
              <strong>退回原因排行</strong>
              <span>看为什么被退回</span>
            </header>
            <div className="drill-review-reason-list">
              {data.rejectReasons.map((item) => (
                <article key={item.label}>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <i>
                    <b style={{ width: `${(item.count / reasonMax) * 100}%` }} />
                  </i>
                  <em>{item.count}件 / {item.share}</em>
                </article>
              ))}
            </div>
          </section>

          <section className="drill-review-insight-section upgrade">
            <header>
              <strong>升级流转判断</strong>
              <span>看是否需要升级流转</span>
            </header>
            <div className="drill-review-upgrade-list">
              {data.upgradeRules.map((item) => (
                <article key={item.title}>
                  <ShieldAlert aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <em>{item.action}</em>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <section className="drill-review-bottom">
        <section className="drill-review-panel">
          <header>
            <strong>附件材料</strong>
            <span>支撑复核结论与销号归档</span>
          </header>
          <div className="drill-review-attachment-list">
            {data.attachments.map((item) => (
              <article key={item.name}>
                <span className="drill-review-attachment-icon">
                  <FileText aria-hidden="true" />
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.meta}</span>
                </div>
                <em>{item.status}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="drill-review-panel">
          <header>
            <strong>复核动作提示</strong>
            <span>当前阶段要做什么</span>
          </header>
          <div className="drill-review-action-grid">
            {data.actionTips.map((item) => (
              <article key={item.title}>
                {item.icon === 'check' ? <CheckCheck aria-hidden="true" /> : item.icon === 'clock' ? <Clock3 aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="drill-review-flow" aria-label="整改复核闭环流程">
        {data.flow.map((item, index) => (
          <React.Fragment key={item.label}>
            <article className={item.active ? 'active' : ''}>
              <span>{index + 1}</span>
              <strong>{item.label}</strong>
              <em>{item.owner}</em>
            </article>
            {index < data.flow.length - 1 ? <i aria-hidden="true" /> : null}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
}
