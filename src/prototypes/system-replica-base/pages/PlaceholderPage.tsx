import React from 'react';
import { FileSearch } from 'lucide-react';
import { PageScaffold } from '../components/AppShell';

export function PlaceholderPage({ title }: { title: string }) {
  return <PageScaffold title={title}>
    <div className="module-placeholder">
      <FileSearch size={42} />
      <h2>该模块待复刻</h2>
      <p>当前已接入顶部导航、左侧菜单和通用内容容器。请提供该页面截图或链接后，可高保真复刻为优化底稿。</p>
      <div className="placeholder-steps"><span>1 提供页面截图/链接</span><span>2 复刻原页面</span><span>3 确认像不像</span><span>4 基于底稿优化</span></div>
    </div>
  </PageScaffold>;
}
