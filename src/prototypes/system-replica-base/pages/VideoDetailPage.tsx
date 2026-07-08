import React from 'react';
import { PageScaffold } from '../components/AppShell';
import { CloseMark, DetailSection } from '../components/Primitives';

const basicRows: Array<[string, string, string, string]> = [
  ['视频名称', '鉴定措施巷一联络巷掘进工作面T1', '视频分类', '重要瓦斯传感器'],
  ['监控区域', '掘进工作面T1传感器处', '厂商', '海康'],
  ['ip', '172.16.10.138', '端口号', '8000'],
  ['流媒体ip', '172.19.193.80', '设备位置(X)', ''],
  ['设备位置(Y)', '', '设备位置(Z)', ''],
];

const changeRows: Array<[string, string, string, string]> = [
  ['变更类型', '修改', '变更时间', '2026-06-08 10:21:18'],
  ['变更内容', '通道名称:鉴定措施巷一掘进工作面T1->鉴定措施巷一联络巷掘进工作面T1;', '变更理由', '修改通道。'],
];

export function VideoDetailPage() {
  return <PageScaffold title="视频信息" rightExtra={<CloseMark />}>
    <div className="detail-page">
      <DetailSection title="基本信息" rows={basicRows} />
      <DetailSection title="变更详情" rows={changeRows} />
      <div className="detail-bottom-line" />
    </div>
  </PageScaffold>;
}
