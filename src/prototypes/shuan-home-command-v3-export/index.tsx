/**
 * @name 蜀安首页方案A V3 单页导出
 * @mode axure
 */
import React, { useMemo } from 'react';
import { AnnotationViewer } from '@axhub/annotation';
import type { AnnotationSourceDocument, AnnotationViewerOptions } from '@axhub/annotation';
import '../system-replica-base/style.css';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import { ShuanHomeCommandV3Page } from '../system-replica-base/pages/ShuanHomeCommandV3';
import { shuanDrilldownRoutePages } from '../system-replica-base/pages/shuan-drilldowns/data';
import type { ShuanHomeVariant } from '../system-replica-base/pages/ShuanHomeConcepts';
import annotationSourceDocument from './annotation-source-runtime';

const route = defineHashPageRoute([
  { id: 'shuan-home-command-v3', title: '蜀安首页方案A V3' },
  ...shuanDrilldownRoutePages.filter((page) => page.id !== 'shuan-home-command-v3-wireframes'),
], { defaultPageId: 'shuan-home-command-v3' });

function Component() {
  const { page, setPage } = useHashPage(route);

  const annotationOptions = useMemo<AnnotationViewerOptions>(() => ({
    showToolbar: true,
    showThemeToggle: true,
    showColorFilter: true,
    emptyWhenNoData: false,
    toolbarEdge: 'right',
    currentPageId: page,
    zIndex: 1500,
  }), [page]);

  const handleVariantChange = (_variant: ShuanHomeVariant) => {
    setPage('shuan-home-command-v3');
  };

  return (
    <>
      <ShuanHomeCommandV3Page
        variant="command"
        onVariantChange={handleVariantChange}
        onOpenPage={setPage}
        activeOverlayPage={page === 'shuan-home-command-v3' ? null : page}
      />
      <AnnotationViewer
        source={annotationSourceDocument as unknown as AnnotationSourceDocument}
        options={annotationOptions}
      />
    </>
  );
}

export default Component;
