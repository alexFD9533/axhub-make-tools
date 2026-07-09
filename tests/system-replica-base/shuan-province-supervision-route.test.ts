import { describe, expect, it } from 'vitest';
import { shuanDrilldownRoutePages, shuanIllegalDisposalRows, shuanProvinceSupervisionData } from '../../src/prototypes/system-replica-base/pages/shuan-drilldowns/data';

describe('shuan province supervision drilldown route', () => {
  it('registers the province supervision route in drilldown routes', () => {
    expect(shuanProvinceSupervisionData.route).toBe('shuan-home-command-v3-illegal-disposal-province-supervision');

    expect(
      shuanDrilldownRoutePages.some(
        (page) =>
          page.id === shuanProvinceSupervisionData.route
          && page.title === shuanProvinceSupervisionData.title,
      ),
    ).toBe(true);
  });

  it('wires the homepage disposal card to the province supervision route', () => {
    const provinceCard = shuanIllegalDisposalRows.find((item) => item.title === '省挂牌督办');

    expect(provinceCard).toBeDefined();
    expect(provinceCard?.page).toBe(shuanProvinceSupervisionData.route);
  });
});
