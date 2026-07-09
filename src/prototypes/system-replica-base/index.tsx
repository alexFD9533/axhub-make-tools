/**
 * @name 煤矿安全综管平台
 * @mode axure
 */
import React, { useMemo } from 'react';
import { AnnotationViewer, setProtoDevState } from '@axhub/annotation';
import type { AnnotationDirectoryRouteNode, AnnotationSourceDocument, AnnotationViewerOptions } from '@axhub/annotation';
import './style.css';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import { AppShell } from './components/AppShell';
import { menuGroups, pageToModule, TopModuleId } from './data';
import { AlarmDisposalPage } from './pages/AlarmDisposalPage';
import { EnterpriseArchivePage } from './pages/EnterpriseArchivePage';
import { isMonitoringReplicaPage, MonitoringReplicaPage } from './pages/MonitoringPages';
import { isMiningGuardPage, MiningGuardPage } from './pages/MiningGuardPages';
import { isHiddenRiskPage, HiddenRiskPage } from './pages/HiddenRiskPages';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { SmsEnterpriseReceiverPage, SmsGovernmentReceiverPage, SmsOtherUnitAddressBookPage, SmsRecordPage, SmsRulePage, SmsTemplatePage } from './pages/SmsPages';
import { SystemConfigPage, SystemDeptPage, SystemDictPage, SystemJobPage, SystemLoginlogPage, SystemMenuPage, SystemNoticePage, SystemOnlinePage, SystemOperlogPage, SystemOrganizationPage, SystemPersonnelPage, SystemPostPage, SystemRolePage, SystemUserPage } from './pages/SystemPages';
import { VideoDetailPage } from './pages/VideoDetailPage';
import { getShuanVariantFromPage, ShuanHomeConceptPage, ShuanHomeVariant } from './pages/ShuanHomeConcepts';
import { ShuanHomeCommandV2Page } from './pages/ShuanHomeCommandV2';
import { ShuanHomeCommandV3Page } from './pages/ShuanHomeCommandV3';
import { shuanDrilldownRoutePages } from './pages/shuan-drilldowns/data';
import { shuanDrilldownWireframeRoutePages } from './pages/ShuanDrilldownWireframes';
import annotationSourceDocument from './annotation-source-runtime';

const route = defineHashPageRoute([
  { id: 'shuan-home-command', title: '蜀安首页方案A' },
  { id: 'shuan-home-command-v2', title: '蜀安首页方案A V2' },
  { id: 'shuan-home-command-v3', title: '蜀安首页方案A V3' },
  ...shuanDrilldownWireframeRoutePages,
  { id: 'shuan-home-portal', title: '蜀安首页方案B' },
  { id: 'shuan-home-dispatch', title: '蜀安首页方案C' },
  { id: 'guard-home', title: '矿数卫士首页' },
  { id: 'guard-gas-emission-abnormal', title: '瓦斯涌出异常' },
  { id: 'guard-carbon-monoxide-abnormal', title: '一氧化碳变化异常' },
  { id: 'guard-pipeline-flow-abnormal', title: '管道流量变化异常' },
  { id: 'guard-pipeline-pressure-abnormal', title: '管道压力变化异常' },
  { id: 'guard-methane-change-abnormal', title: '瓦斯变化异常' },
  { id: 'guard-methane-constant-abnormal', title: '瓦斯恒值异常' },
  { id: 'guard-stop-group-abnormal', title: '开停组停运异常' },
  { id: 'guard-lock-cycle-abnormal', title: '闭锁周期异常' },
  { id: 'guard-downhole-count-abnormal', title: '人员下井次数不达标' },
  { id: 'guard-leader-handover-abnormal', title: '带班领导交接班异常' },
  { id: 'guard-downhole-inspection-abnormal', title: '人员下井巡检异常' },
  { id: 'guard-video-offline', title: '视频断线' },
  { id: 'guard-overlimit-no-alarm', title: '超限未报警' },
  { id: 'guard-report-export', title: '报表导出' },
  { id: 'guard-gas-emission-search', title: '瓦斯涌出量查询' },
  { id: 'guard-workface-query', title: '工作面查询' },
  { id: 'guard-log-query', title: '操作日志查询' },
  { id: 'guard-log-router', title: '操作日志路由配置' },
  { id: 'guard-gas-dispose', title: '处置管理' },
  { id: 'guard-outburst-point', title: '涌出点管理' },
  { id: 'guard-rule-approval', title: '煤矿规则审批' },
  { id: 'guard-safe-risk-report', title: '安全风险研判报告' },
  { id: 'guard-hidden-risk-overview', title: '风险总览一张图' },
  { id: 'guard-hidden-risk-mine-profile', title: '煤矿风险画像' },
  { id: 'guard-hidden-risk-clue-ledger', title: '线索证据台账' },
  { id: 'guard-hidden-risk-task', title: '工作安排处置' },
  { id: 'guard-hidden-risk-config', title: '配置管理' },
  { id: 'alarm-disposal', title: '报警处置' },
  { id: 'monitor-alarm-query', title: '报警查询' },
  { id: 'monitor-disposal-record', title: '处置记录' },
  { id: 'monitor-methane-record', title: '甲烷超限处置记录' },
  { id: 'monitor-warning-query', title: '预警查询' },
  { id: 'monitor-warning-rule', title: '预警规则设置' },
  { id: 'monitor-record-fix', title: '处置记录修正管理' },
  { id: 'monitor-env-monitor', title: '环境监测监控' },
  { id: 'monitor-person-track', title: '人员轨迹历史查询' },
  { id: 'monitor-shift-record-query', title: '交接班记录查询' },
  { id: 'monitor-enterprise-shift-record', title: '企业交接班记录' },
  { id: 'monitor-sms-record', title: '短信发送记录查询' },
  { id: 'monitor-sms-rule', title: '短信发送规则设置' },
  { id: 'monitor-sms-government-receiver', title: '政府接收人员' },
  { id: 'monitor-sms-enterprise-receiver', title: '企业接收人员' },
  { id: 'monitor-sms-template', title: '短信内容模板设置' },
  { id: 'monitor-shift-setting', title: '班次设置' },
  { id: 'monitor-alarm-rule', title: '报警提示规则设置' },
  { id: 'monitor-sensor-log', title: '传感器变更日志' },
  { id: 'monitor-leader-plan', title: '带班计划' },
  { id: 'monitor-leader-completion', title: '带班计划完成情况' },
  { id: 'monitor-downhole-record', title: '下井带班记录' },
  { id: 'monitor-report-audit', title: '报备审核' },
  { id: 'monitor-report-query', title: '报备查询' },
  { id: 'monitor-report-statistics', title: '报备统计' },
  { id: 'monitor-network-statistics', title: '联网统计' },
  { id: 'monitor-alarm-statistics', title: '报警处置统计' },
  { id: 'monitor-alarm-ranking', title: '报警排行榜' },
  { id: 'monitor-person-history-statistics', title: '人员历史数据统计' },
  { id: 'monitor-person-location-statistics', title: '人员定位统计' },
  { id: 'monitor-comprehensive-report', title: '综合报告分析' },
  { id: 'monitor-disconnect-statistics', title: '断线统计' },
  { id: 'monitor-duty-vacancy-statistics', title: '带班空岗统计' },
  { id: 'monitor-key-sensor-ranking', title: '重点传感器排行榜' },
  { id: 'monitor-sensor-count-statistics', title: '传感器数量统计' },
  { id: 'monitor-workgroup', title: '煤矿监管工作组管理' },
  { id: 'monitor-regulatory-list', title: '监管名单' },
  { id: 'monitor-downhole-statistics', title: '下井记录统计' },
  { id: 'enterprise-archive', title: '企业档案查询' },
  { id: 'video-detail', title: '视频信息' },
  { id: 'sms-record', title: '短信发送记录查询' },
  { id: 'sms-rule', title: '短信发送规则设置' },
  { id: 'sms-enterprise-receiver', title: '企业接收人员' },
  { id: 'sms-government-receiver', title: '政府接收人员' },
  { id: 'sms-other-unit-address-book', title: '其他单位通讯录' },
  { id: 'sms-template', title: '短信内容模板设置' },
  { id: 'system-organization', title: '组织机构' },
  { id: 'system-personnel', title: '系统人员' },
  { id: 'system-user', title: '系统用户' },
  { id: 'system-role', title: '角色管理' },
  { id: 'system-menu', title: '菜单管理' },
  { id: 'system-dept', title: '部门管理' },
  { id: 'system-post', title: '岗位管理' },
  { id: 'system-dict', title: '字典管理' },
  { id: 'system-config', title: '参数设置' },
  { id: 'system-notice', title: '通知公告' },
  { id: 'system-operlog', title: '操作日志' },
  { id: 'system-loginlog', title: '登录日志' },
  { id: 'system-online', title: '在线用户' },
  { id: 'system-job', title: '定时任务' },
], { defaultPageId: 'shuan-home-command' });

function findMenuTitle(pageId: string): string {
  for (const group of Object.values(menuGroups)) {
    for (const item of group) {
      if (item.page === pageId) return item.label;
      const child = item.children?.find((node) => node.page === pageId);
      if (child) return child.label;
    }
  }
  return pageId.replace(/^placeholder-/, '').replaceAll('-', ' ');
}

function findModuleByPage(pageId: string): TopModuleId {
  if (pageToModule[pageId]) return pageToModule[pageId];
  for (const [moduleId, group] of Object.entries(menuGroups)) {
    for (const item of group) {
      if (item.page === pageId || item.children?.some((child) => child.page === pageId)) {
        return moduleId as TopModuleId;
      }
    }
  }
  return 'monitoring';
}

function CurrentPage({ page }: { page: string }) {
  if (page === 'alarm-disposal') return <AlarmDisposalPage />;
  if (isMonitoringReplicaPage(page)) return <MonitoringReplicaPage page={page} />;
  if (isHiddenRiskPage(page)) return <HiddenRiskPage page={page} />;
  if (isMiningGuardPage(page)) return <MiningGuardPage page={page} />;
  if (page === 'enterprise-archive') return <EnterpriseArchivePage />;
  if (page === 'video-detail') return <VideoDetailPage />;
  if (page === 'sms-record') return <SmsRecordPage />;
  if (page === 'sms-rule') return <SmsRulePage />;
  if (page === 'sms-enterprise-receiver') return <SmsEnterpriseReceiverPage />;
  if (page === 'sms-government-receiver') return <SmsGovernmentReceiverPage />;
  if (page === 'sms-other-unit-address-book') return <SmsOtherUnitAddressBookPage />;
  if (page === 'sms-template') return <SmsTemplatePage />;
  if (page === 'system-organization') return <SystemOrganizationPage />;
  if (page === 'system-personnel') return <SystemPersonnelPage />;
  if (page === 'system-user') return <SystemUserPage />;
  if (page === 'system-role') return <SystemRolePage />;
  if (page === 'system-menu') return <SystemMenuPage />;
  if (page === 'system-dept') return <SystemDeptPage />;
  if (page === 'system-post') return <SystemPostPage />;
  if (page === 'system-dict') return <SystemDictPage />;
  if (page === 'system-config') return <SystemConfigPage />;
  if (page === 'system-notice') return <SystemNoticePage />;
  if (page === 'system-operlog') return <SystemOperlogPage />;
  if (page === 'system-loginlog') return <SystemLoginlogPage />;
  if (page === 'system-online') return <SystemOnlinePage />;
  if (page === 'system-job') return <SystemJobPage />;
  return <PlaceholderPage title={findMenuTitle(page)} />;
}

const Component = () => {
  const { page, setPage } = useHashPage(route);
  const shuanVariant = getShuanVariantFromPage(page);
  const activeModule = useMemo(() => findModuleByPage(page), [page]);
  const annotationOptions = useMemo<AnnotationViewerOptions>(() => ({
    showToolbar: true,
    showThemeToggle: true,
    showColorFilter: true,
    emptyWhenNoData: false,
    toolbarEdge: 'right',
    currentPageId: page,
    zIndex: 1500,
    onDirectoryRoute: (node: AnnotationDirectoryRouteNode) => {
      if (typeof node.route === 'string') {
        setPage(node.route);
      }
      if (node.payload && typeof node.payload === 'object') {
        setProtoDevState(node.payload as Record<string, unknown>);
      }
    },
  }), [page, setPage]);

  const handleModuleChange = (moduleId: TopModuleId) => {
    const first = menuGroups[moduleId]?.[0];
    if (!first) {
      setPage(`placeholder-${moduleId}`);
      return;
    }
    setPage(first.children?.[0]?.page || first.page);
  };

  const handleShuanVariantChange = (variant: ShuanHomeVariant) => {
    setPage(`shuan-home-${variant}`);
  };

  const annotationViewer = (
    <AnnotationViewer
      source={annotationSourceDocument as unknown as AnnotationSourceDocument}
      options={annotationOptions}
    />
  );

  if (page === 'shuan-home-command-v3') {
    return (
      <>
        <ShuanHomeCommandV3Page variant="command" onVariantChange={handleShuanVariantChange} onOpenPage={setPage} />
        {annotationViewer}
      </>
    );
  }

  if (
    page === 'shuan-home-command-v3-wireframes' ||
    page.startsWith('shuan-home-command-v3-algorithm-') ||
    shuanDrilldownRoutePages.some((routePage) => routePage.id === page)
  ) {
    return (
      <>
        <ShuanHomeCommandV3Page variant="command" onVariantChange={handleShuanVariantChange} onOpenPage={setPage} activeOverlayPage={page} />
        {annotationViewer}
      </>
    );
  }

  if (page === 'shuan-home-command-v2') {
    return (
      <>
        <ShuanHomeCommandV2Page variant="command" onVariantChange={handleShuanVariantChange} />
        {annotationViewer}
      </>
    );
  }

  if (shuanVariant) {
    return (
      <>
        <ShuanHomeConceptPage variant={shuanVariant} onVariantChange={handleShuanVariantChange} />
        {annotationViewer}
      </>
    );
  }

  return (
    <>
      <AppShell activeModule={activeModule} activePage={page} onModuleChange={handleModuleChange} onPageChange={setPage}>
        <CurrentPage page={page} />
      </AppShell>
      {annotationViewer}
    </>
  );
};

export default Component;

