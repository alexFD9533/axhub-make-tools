export type DrilldownTone = 'blue' | 'cyan' | 'green' | 'amber' | 'yellow' | 'red' | 'slate';
export type DrilldownKind = 'secondary' | 'algorithm';

export interface DrilldownMetric {
  label: string;
  value: string;
  hint: string;
}

export interface DrilldownSection {
  title: string;
  summary: string;
  items: Array<{ label: string; value: string; tone?: DrilldownTone }>;
}

export interface DrilldownTableRow {
  name: string;
  area: string;
  level: string;
  status: string;
  owner: string;
}

export interface DrilldownPage {
  id: string;
  title: string;
  subtitle: string;
  kind: DrilldownKind;
  tone: DrilldownTone;
  scenario: string;
  metrics: DrilldownMetric[];
  sections: DrilldownSection[];
  tableTitle: string;
  tableRows: DrilldownTableRow[];
  next?: Array<{ label: string; page: string; description: string }>;
}

export interface IllegalCampaignMineRow {
  mine: string;
  area: string;
  score: number;
  level: 'high' | 'mid' | 'low';
  point: string;
  clues: number;
  status: string;
  trend: 'up' | 'down' | 'flat';
  profileRoute?: string;
}

export interface HiddenFaceMineProfileData {
  route: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  catalog: Array<{ id: string; label: string; children?: string[] }>;
  mine: {
    name: string;
    company: string;
    location: string;
    productionStatus: string;
    score: number;
    previousDelta: string;
    level: string;
    levelReason: string;
    regionRank: string;
    validClues: string;
    scoringClues: string;
    scoringRatio: string;
    lastScoreTime: string;
    verificationStatus: string;
    verificationProgress: string;
    feedbackConclusion: string;
    pendingIssues: string;
  };
  scoreParts: Array<{ label: string; value: number; max: number; percent: string; description: string; icon: 'base' | 'association' | 'feedback' }>;
  algorithmContributions: Array<{ category: string; icon: 'gas' | 'wind' | 'person' | 'coal' | 'electric'; hit: number; scored: number; contribution: number; algorithm: string; summary: string }>;
  keyClues: Array<{ id: string; title: string; source: string; time: string; area: string; risk: '高' | '中' | '低'; confidence: string; score: number; tags: string[] }>;
  associationAnalysis: Array<{ dimension: string; level: '高' | '中' | '低'; increment: string; clues: string }>;
  verification: {
    summary: string;
    checklist: Array<{ text: string; level: '高' | '中' | '低' }>;
    priorityAreas: string[];
    priorityObjects: string[];
    evidence: string[];
  };
  feedback: {
    timeline: Array<{ label: string; time: string }>;
    beforeScore: string;
    afterScore: string;
    correction: string;
    levelChange: string;
    followUp: string;
    tasks: Array<{ id: string; name: string; type: string; owner: string; status: string; plan: string; completed: string; conclusion: string }>;
  };
}

export const shuanHiddenFaceMineProfileData: HiddenFaceMineProfileData = {
  route: 'shuan-home-command-v3-illegal-campaign-hidden-face-mine-profile',
  title: '煤矿隐蔽工作面风险画像',
  subtitle: '围绕单矿风险评分、关键线索、关联增强和核查建议，解释该矿当前隐蔽工作面风险状态。',
  updatedAt: '2025-05-23 08:30:00',
  catalog: [
    { id: 'mine-overview', label: '煤矿概况', children: ['综合评分'] },
    { id: 'risk-profile', label: '风险画像', children: ['算法线索贡献', '关键线索', '关联增强分析'] },
    { id: 'verification-loop', label: '核查闭环', children: ['核查要点', '任务与回流'] },
  ],
  mine: {
    name: '达星XX煤矿',
    company: '雷能控股集团有限公司',
    location: '山西省 · 晋城市 · 沁水县',
    productionStatus: '正常生产',
    score: 86.7,
    previousDelta: '+8.9',
    level: '高风险',
    levelReason: '修正后维持',
    regionRank: '8 /127',
    validClues: '152 条',
    scoringClues: '98 条',
    scoringRatio: '64.5%',
    lastScoreTime: '2025-05-23 08:30',
    verificationStatus: '部分核查中',
    verificationProgress: '完成 6 / 12 项',
    feedbackConclusion: '存在隐患',
    pendingIssues: '待处理 3 项',
  },
  scoreParts: [
    { label: '线索基础分', value: 58.3, max: 100, percent: '67.2%', description: '由多源线索权重、可信度和时效性计算得分', icon: 'base' },
    { label: '关联增强分', value: 23.1, max: 100, percent: '26.6%', description: '多维关联识别风险放大得分', icon: 'association' },
    { label: '回流修正分', value: 5.3, max: 100, percent: '6.2%', description: '因核查反馈修正评分依据', icon: 'feedback' },
  ],
  algorithmContributions: [
    { category: '瓦斯', icon: 'gas', hit: 48, scored: 31, contribution: 32.6, algorithm: '瓦斯涌出识别算法', summary: '异常浓度多点同步异常，夜间出现低阈值波动。' },
    { category: '风', icon: 'wind', hit: 32, scored: 18, contribution: 18.4, algorithm: '通风异常识别算法', summary: '风量波动偏大，局部风速降低。' },
    { category: '人', icon: 'person', hit: 26, scored: 12, contribution: 11.2, algorithm: '作业行为风险识别', summary: '夜班进出人员与作业风险高频交叉。' },
    { category: '煤', icon: 'coal', hit: 24, scored: 14, contribution: 9.8, algorithm: '采掘线换风路识别', summary: '煤流保持低频波动，疑似局部生产。' },
    { category: '电', icon: 'electric', hit: 22, scored: 11, contribution: 8.7, algorithm: '电气设备故障预测', summary: '局部供电活跃，保护动作频繁。' },
  ],
  keyClues: [
    { id: '31203', title: '31203回风巷瓦斯浓度持续超限', source: '瓦斯超限识别', time: '2025-05-23 07:45', area: '31203回风巷', risk: '高', confidence: '0.95', score: 7.8, tags: ['传感器', '趋势', '阈值'] },
    { id: '31201', title: '31201采空区上隅角液浓异常', source: '微震异常检测', time: '2025-05-22 22:31', area: '31201上隅角', risk: '高', confidence: '0.90', score: 6.5, tags: ['微震', '事件', '聚集'] },
    { id: 'vent-01', title: '通风机异常波动且记录值偏低', source: '通风异常识别', time: '2025-05-23 08:10', area: '主井通风系统', risk: '高', confidence: '0.88', score: 5.9, tags: ['风量', '波动', '异常'] },
    { id: 'coal-01', title: '采掘换线计时超速', source: '采掘换线风险识别', time: '2025-05-22 18:00', area: '31203工作面', risk: '中', confidence: '0.82', score: 4.3, tags: ['计划', '进度', '对比'] },
    { id: 'methane-02', title: '密闭墙气体浓度异常升高', source: '密闭气体异常识别', time: '2025-05-21 16:20', area: '31201密闭墙', risk: '中', confidence: '0.78', score: 3.8, tags: ['气体', '浓度', '趋势'] },
  ],
  associationAnalysis: [
    { dimension: '时间关联', level: '中', increment: '+4.6', clues: '多时段异常叠加' },
    { dimension: '空间关联', level: '中', increment: '+4.8', clues: '异常点位同邻近' },
    { dimension: '对象关联', level: '中', increment: '+4.5', clues: '多对象相互影响' },
    { dimension: '类型关联', level: '中', increment: '+3.9', clues: '多类型风险共现' },
    { dimension: '状态冲突', level: '中', increment: '+2.1', clues: '状态不一致冲突' },
    { dimension: '历史复发', level: '低', increment: '+2.5', clues: '历史问题重复出现' },
    { dimension: '数据质量', level: '低', increment: '+0.9', clues: '数据质量 75%' },
  ],
  verification: {
    summary: '该矿隐蔽工作面风险主要由瓦斯异常、通风系统波动、采掘线索不合理等多源信号共同影响，关键线索较为密集，历史核查发现同类异常倾向，建议从钻孔、通风末端阴阳巷与互联监测点切入排查。',
    checklist: [
      { text: '查看瓦斯超限点位，核查通风及瓦斯治理措施', level: '高' },
      { text: '核验采空区上隅角液浓异常点位', level: '高' },
      { text: '核查采掘线计划与实际执行情况', level: '中' },
      { text: '核验密闭墙及闭门记录情况', level: '中' },
      { text: '校验局部供电及保护动作情况', level: '低' },
    ],
    priorityAreas: ['31203回风巷及其邻近区域', '31201采空区上隅角区域', '3-2煤与4-2煤间夹层区域'],
    priorityObjects: ['隐蔽工作面瓦斯空区', '通风系统及控风设施', '采空区密闭及排调设施'],
    evidence: ['瓦斯浓度趋势及超限记录', '通风异常与风机运行曲线', '微震事件分布与位置参数', '采掘换线计划与进度对比', '密闭墙体温度与照片', '供电设备与保护动作日志'],
  },
  feedback: {
    timeline: [
      { label: '任务下达', time: '05-16 09:30' },
      { label: '现场排查', time: '05-17 08:30' },
      { label: '结果回传', time: '05-21 18:40' },
      { label: '评分更新', time: '05-23 08:30' },
    ],
    beforeScore: '88.2',
    afterScore: '86.7',
    correction: '-1.5',
    levelChange: '高风险 -> 高风险（维持）',
    followUp: '继续跟踪：是。原因：回流未全部闭合，关键风险仍聚集存在，建议持续关注。',
    tasks: [
      { id: 'XZZ20250516001', name: '隐蔽工作面风险专项核查', type: '专项复查', owner: '晋城市应急管理局', status: '部分核查中', plan: '05-16 - 05-20', completed: '-', conclusion: '部分核查中 6/12 项' },
      { id: 'XZZ20250516002', name: '通风系统及瓦斯治理措施复核', type: '复核核查', owner: '沁水县检查组', status: '待受理', plan: '05-24 - 05-27', completed: '-', conclusion: '-' },
    ],
  },
};

const detailRows: DrilldownTableRow[] = [
  { name: '达州星河煤矿', area: '达州市', level: '高风险', status: '待核查', owner: '市级研判专班' },
  { name: '宜宾安平煤矿', area: '宜宾市', level: '中风险', status: '核查中', owner: '县级监管组' },
  { name: '泸州宏达煤矿', area: '泸州市', level: '低风险', status: '已闭环', owner: '专项整治组' },
];

const basePage = (id: string, title: string, kind: DrilldownKind, tone: DrilldownTone): DrilldownPage => ({
  id,
  title,
  subtitle: kind === 'algorithm' ? '打非治违 / 三级算法明细' : '蜀安首页 Av3 / 二级下钻页面',
  kind,
  tone,
  scenario: kind === 'algorithm'
    ? '围绕当前算法命中结果展开矿井、区域和处置状态的三级研判明细。'
    : '承接首页 Av3 指标入口，在覆盖层内查看当前专题的二级业务下钻内容。',
  metrics: [
    { label: '纳入对象', value: '128', hint: '当前统计范围' },
    { label: '高风险', value: '18', hint: '建议优先处置' },
    { label: '闭环率', value: '76%', hint: '当前闭环进度' },
  ],
  sections: [
    {
      title: '重点信号',
      summary: '聚合当前专题最值得优先关注的异常信号与问题指向。',
      items: [
        { label: '异常线索', value: '42', tone: 'cyan' },
        { label: '待核查', value: '18', tone: 'amber' },
        { label: '高风险', value: '9', tone: 'red' },
      ],
    },
    {
      title: '处置进展',
      summary: '从发现、派发、核查到闭环的当前进度状态。',
      items: [
        { label: '已派发', value: '30', tone: 'blue' },
        { label: '核查中', value: '7', tone: 'amber' },
        { label: '已闭环', value: '23', tone: 'green' },
      ],
    },
  ],
  tableTitle: '风险清单',
  tableRows: detailRows,
});

export const shuanDrilldownPages: DrilldownPage[] = [
  basePage('shuan-home-command-v3-production-status', '生产态势', 'secondary', 'blue'),
  basePage('shuan-home-command-v3-personnel-safety', '人员安全', 'secondary', 'green'),
  basePage('shuan-home-command-v3-video-dispatch', '视频调度', 'secondary', 'slate'),
  basePage('shuan-home-command-v3-illegal-algorithms', '算法线索研判', 'algorithm', 'red'),
  basePage('shuan-home-command-v3-daily-regulation', '日常监管', 'secondary', 'cyan'),
  {
    id: 'shuan-home-command-v3-algorithm-gas-mismatch',
    title: '瓦斯浓度与作业状态不匹配',
    subtitle: '打非治违 / 三级算法明细',
    kind: 'algorithm',
    tone: 'red',
    scenario: '针对停产期间瓦斯曲线、设备工况和作业状态冲突的三级算法明细页。',
    metrics: [
      { label: '命中矿井', value: '12', hint: '当前统计周期' },
      { label: '高风险', value: '5', hint: '建议优先核查' },
      { label: '闭环率', value: '71%', hint: '已完成处置' },
    ],
    sections: [
      {
        title: '算法规则',
        summary: '从停产报备、瓦斯波动和设备活跃度三条线同时比对。',
        items: [
          { label: '停产报备冲突', value: '6', tone: 'red' },
          { label: '曲线异常升高', value: '4', tone: 'amber' },
          { label: '重复命中', value: '2', tone: 'cyan' },
        ],
      },
      {
        title: '处置承接',
        summary: '命中后直接衔接专项整治页和核查任务派发。',
        items: [
          { label: '待核查', value: '7', tone: 'amber' },
          { label: '核查中', value: '3', tone: 'blue' },
          { label: '已闭环', value: '2', tone: 'green' },
        ],
      },
    ],
    tableTitle: '命中明细',
    tableRows: [
      { name: '达星XX煤矿', area: '达州市', level: '高风险', status: '待核查', owner: '市级研判' },
      { name: '宜宾XX煤矿', area: '宜宾市', level: '高风险', status: '核查中', owner: '县级核查' },
      { name: '乐山XX煤矿', area: '乐山市', level: '中风险', status: '已闭环', owner: '专项整治' },
    ],
    next: [
      { label: '返回算法总览', page: 'shuan-home-command-v3-illegal-algorithms', description: '回到算法线索研判台继续切换其他算法。' },
      { label: '进入专项整治页', page: 'shuan-home-command-v3-illegal-campaign-hidden-face', description: '将当前命中矿井带入隐蔽工作面专项整治总览。' },
    ],
  },
];

export const shuanDailyRegulationAnalysis = {
  contexts: [
    { id: 'all', label: '今日预警总数', value: 118, title: '日常监管预警分析', description: '聚焦今日预警总量、来源分布、区域分布与处置进展。' },
    { id: 'red', label: '红色', value: 9, title: '红色预警分析', description: '重点查看红色预警命中矿井、区域分布与处置时效。' },
    { id: 'orange', label: '橙色', value: 22, title: '橙色预警分析', description: '关注橙色预警集中来源和待处置事项。' },
    { id: 'yellow', label: '黄色', value: 47, title: '黄色预警分析', description: '黄色预警最多，适合做批量派单与分级跟踪。' },
    { id: 'blue', label: '蓝色', value: 40, title: '蓝色预警分析', description: '蓝色预警以常规跟踪和闭环归档为主。' },
    { id: 'closed', label: '已处置', value: 97, title: '已处置预警分析', description: '查看已完成处置事项、闭环效率和区域贡献。' },
    { id: 'pending', label: '待处置', value: 21, title: '待处置预警分析', description: '定位待处置预警来源和重点矿井，优先安排派单。' },
    { id: 'env', label: '环境监测', value: 72, title: '环境监测预警分析', description: '环境监测仍是当前预警主要来源，甲烷与 CO 占比较高。' },
    { id: 'personnel', label: '人员定位', value: 18, title: '人员定位预警分析', description: '区域超员与人员求救构成人员定位类主风险。' },
    { id: 'water', label: '水害防治', value: 28, title: '水害防治预警分析', description: '长观孔水位和矿井涌水量是当前水害防治重点。' }
  ],
  summaryTabs: [
    { label: '今日预警总数', value: '118' },
    { label: '红色', value: '9' },
    { label: '橙色', value: '22' },
    { label: '黄色', value: '47' },
    { label: '蓝色', value: '40' },
    { label: '已处置', value: '97' },
    { label: '待处置', value: '21' },
    { label: '环境监测', value: '72' },
    { label: '人员定位', value: '18' },
    { label: '水害防治', value: '28' }
  ],
  kpis: [
    { label: '当前预警', value: '118', hint: '较昨日', delta: '+16', deltaDirection: 'up', icon: 'alert' },
    { label: '已处置', value: '97', hint: '较昨日', delta: '+21', deltaDirection: 'up', icon: 'check' },
    { label: '待处置', value: '21', hint: '较昨日', delta: '-5', deltaDirection: 'down', icon: 'todo' },
    { label: '处置率', value: '82%', hint: '较昨日', delta: '+6%', deltaDirection: 'up', icon: 'gauge' },
    { label: '涉及煤矿', value: '36', hint: '较昨日', delta: '+3', deltaDirection: 'up', icon: 'mine' },
    { label: '涉及市州', value: '8', hint: '较昨日', delta: '持平', deltaDirection: 'flat', icon: 'region' }
  ],
  sources: [
    { label: '环境监测', value: 72, share: '61.0%', done: 58, pending: 14, children: [{ name: '甲烷超限', value: '42（35.6%）' }, { name: 'CO超限', value: '30（25.4%）' }] },
    { label: '人员定位', value: 18, share: '15.3%', done: 11, pending: 7, children: [{ name: '区域超员', value: '11（9.3%）' }, { name: '人员求救', value: '7（5.9%）' }] },
    { label: '水害防治', value: 28, share: '23.7%', done: 28, pending: 0, children: [{ name: '长观孔水位', value: '16（13.6%）' }, { name: '矿井涌水量', value: '12（10.2%）' }] }
  ],
  matrix: [
    { level: '红色', total: 9, pending: 3, closed: 6, share: '7.6%' },
    { level: '橙色', total: 22, pending: 4, closed: 18, share: '18.6%' },
    { level: '黄色', total: 47, pending: 13, closed: 34, share: '39.8%' },
    { level: '蓝色', total: 40, pending: 1, closed: 39, share: '33.9%' },
    { level: '合计', total: 118, pending: 21, closed: 97, share: '100%' }
  ],
  trend: [9, 22, 47, 40],
  regions: [
    { name: '广元市', value: 12, x: 60, y: 17, tone: 'yellow' },
    { name: '绵阳市', value: 8, x: 42, y: 30, tone: 'yellow' },
    { name: '南充市', value: 11, x: 59, y: 40, tone: 'yellow' },
    { name: '遂宁市', value: 7, x: 47, y: 47, tone: 'yellow' },
    { name: '达州市', value: 21, x: 77, y: 37, tone: 'orange' },
    { name: '巴中市', value: 6, x: 77, y: 25, tone: 'red' },
    { name: '泸州市', value: 10, x: 66, y: 72, tone: 'yellow' },
    { name: '宜宾市', value: 18, x: 59, y: 82, tone: 'orange' },
    { name: '乐山市', value: 15, x: 37, y: 65, tone: 'orange' },
    { name: '攀枝花市', value: 4, x: 25, y: 88, tone: 'blue' }
  ],
  rankings: [
    { name: '达州市', value: 21 },
    { name: '宜宾市', value: 18 },
    { name: '乐山市', value: 15 },
    { name: '广元市', value: 12 },
    { name: '泸州市', value: 10 }
  ],
  focusPoints: [
    { label: '看来源：', text: '环境监测占比最高', value: '72条', icon: 'chip' },
    { label: '看等级：', text: '黄色预警最多', value: '47条', icon: 'cloud' },
    { label: '看处置：', text: '待处置 21 条，集中在环境监测和水害防治', value: '', icon: 'bell' }
  ],
  details: [
    { mine: '美鑫煤矿', city: '宜宾市', source: '环境监测', type: '甲烷超限', level: '红色', status: '待处置', time: '2025-05-15 09:36:21', disposal: '未处置' },
    { mine: '嘉阳煤矿', city: '乐山市', source: '环境监测', type: 'CO超限', level: '橙色', status: '待处置', time: '2025-05-15 09:21:15', disposal: '未处置' },
    { mine: '古叙煤矿', city: '泸州市', source: '环境监测', type: '通风异常', level: '黄色', status: '待处置', time: '2025-05-15 09:05:42', disposal: '未处置' },
    { mine: '达竹煤矿', city: '达州市', source: '水害防治', type: '长观孔水位超限', level: '橙色', status: '待处置', time: '2025-05-15 08:52:33', disposal: '未处置' },
    { mine: '小河沟煤矿', city: '广元市', source: '人员定位', type: '区域超员', level: '黄色', status: '已处置', time: '2025-05-15 08:41:10', disposal: '已处置（08:58:21）' },
    { mine: '宝鼎煤矿', city: '雅安市', source: '水害防治', type: '矿井涌水量超限', level: '蓝色', status: '已处置', time: '2025-05-15 08:30:55', disposal: '已处置（08:45:12）' },
    { mine: '新民煤矿', city: '南充市', source: '环境监测', type: '甲烷超限', level: '黄色', status: '已处置', time: '2025-05-15 08:22:17', disposal: '已处置（08:40:33）' },
    { mine: '金河煤矿', city: '内江市', source: '人员定位', type: '人员求救', level: '红色', status: '待处置', time: '2025-05-15 07:58:44', disposal: '未处置' }
  ],
  pagination: {
    total: 118,
    pageSize: 20,
    current: 1,
    pages: [1, 2, 3, 4, 5, 6]
  }
};

export const shuanIllegalClueTypes = [
  {
    id: 'gas',
    label: '瓦斯',
    title: '瓦斯异常线索',
    tone: 'red' as DrilldownTone,
    summary: '围绕瓦斯浓度、报警闭锁和传感器波动研判疑似异常作业。',
    clueTotal: 28,
    highRisk: 9,
    pending: 6,
    closedRate: '71%',
    mineTotal: 12,
    todayNew: 4,
    focus: ['停产矿井瓦斯波动与作业状态冲突', '局部报警缺失但设备工况持续活跃', '传感器长时间平直疑似遮蔽或造假'],
    disposal: ['优先派发高风险矿井现场复核', '补查报警日志与闭锁联动记录', '联动专项整治页继续查看矿井画像'],
    algorithms: [
      { name: '瓦斯浓度与作业状态不匹配', category: '隐蔽工作面', status: '运行中', description: '停产报备期间瓦斯浓度和设备活跃度同步升高，存在疑似生产作业。', clueCount: 11, risk: '高' },
      { name: '报警阈值触发但未记录事件', category: '监控造假', status: '运行中', description: '达到报警阈值但系统未形成处置记录，需核查报警链路和干预痕迹。', clueCount: 9, risk: '高' },
      { name: '传感器长时间平直', category: '监控造假', status: '新增', description: '单点数值长时间无波动，与相邻传感器和生产节奏不一致。', clueCount: 8, risk: '中' },
    ],
    clues: [
      { mine: '达星一矿', area: '达州市', algorithm: '瓦斯浓度与作业状态不匹配', clue: '停产期间回风巷瓦斯波动与设备运行趋势同步上升。', risk: '高', status: '待核查', time: '07-06 09:24' },
      { mine: '宜宾安平矿', area: '宜宾市', algorithm: '报警阈值触发但未记录事件', clue: '瓦斯超阈值持续 14 分钟但报警处置日志为空。', risk: '高', status: '研判中', time: '07-06 08:46' },
      { mine: '乐山宏达矿', area: '乐山市', algorithm: '传感器长时间平直', clue: '工作面瓦斯值 6 小时无变化，与邻近点位趋势背离。', risk: '中', status: '核查中', time: '07-05 21:10' },
    ],
  },
  {
    id: 'wind',
    label: '通风',
    title: '通风异常线索',
    tone: 'cyan' as DrilldownTone,
    summary: '围绕风门状态、风量平衡和局扇启停识别异常通风组织。',
    clueTotal: 19,
    highRisk: 6,
    pending: 5,
    closedRate: '68%',
    mineTotal: 9,
    todayNew: 2,
    focus: ['局扇停开与风量变化不一致', '局部回风短时衰减但作业状态未同步调整', '风门联动记录缺失'],
    disposal: ['优先核查高风险作业面通风组织', '补看风门/局扇时序曲线', '结合现场视频复核作业活动'],
    algorithms: [
      { name: '局扇启停与风量曲线冲突', category: '通风异常', status: '运行中', description: '局扇显示停机，但工作面风量仍维持高位。', clueCount: 7, risk: '高' },
      { name: '风门联动缺失', category: '监控造假', status: '运行中', description: '风门状态切换后无对应联动记录，疑似绕过闭锁。', clueCount: 6, risk: '中' },
      { name: '回风衰减异常', category: '通风异常', status: '新增', description: '回风量短时大幅衰减但人员定位和设备状态未见回撤。', clueCount: 6, risk: '中' },
    ],
    clues: [
      { mine: '广元青峰矿', area: '广元市', algorithm: '局扇启停与风量曲线冲突', clue: '局扇停机后 18 分钟风量仍保持高位。', risk: '高', status: '待核查', time: '07-06 10:12' },
      { mine: '达州兴隆矿', area: '达州市', algorithm: '风门联动缺失', clue: '风门开闭动作存在，闭锁联动日志为空。', risk: '中', status: '研判中', time: '07-06 08:18' },
      { mine: '泸州仁和矿', area: '泸州市', algorithm: '回风衰减异常', clue: '回风量下降 32% 且未见停产报备。', risk: '中', status: '核查中', time: '07-05 23:14' },
    ],
  },
  {
    id: 'personnel',
    label: '人员',
    title: '人员异常线索',
    tone: 'green' as DrilldownTone,
    summary: '围绕人员定位、视频计数和考勤状态识别瞒报与超员风险。',
    clueTotal: 34,
    highRisk: 7,
    pending: 8,
    closedRate: '69%',
    mineTotal: 15,
    todayNew: 5,
    focus: ['视频人数与定位人数不一致', '停产时段仍有连续入井轨迹', '超时滞留人员未形成闭环处置'],
    disposal: ['优先核查人数不一致矿井', '联动入井审批和考勤台账', '对连续异常矿井启动专项复盘'],
    algorithms: [
      { name: '视频人数与定位人数不匹配', category: '隐瞒入井人数', status: '运行中', description: '视频识别人数持续高于定位上报人数，存在瞒报可能。', clueCount: 13, risk: '高' },
      { name: '井下滞留超时', category: '人员异常', status: '运行中', description: '人员井下停留时长超过安全阈值，且未见作业任务闭环。', clueCount: 11, risk: '中' },
      { name: '停产时段仍有入井轨迹', category: '隐瞒入井人数', status: '新增', description: '停产报备期间仍有连续入井定位轨迹和考勤打点。', clueCount: 10, risk: '高' },
    ],
    clues: [
      { mine: '达州安顺矿', area: '达州市', algorithm: '视频人数与定位人数不匹配', clue: '副井口视频识别 23 人，定位系统仅记录 18 人。', risk: '高', status: '待核查', time: '07-06 09:58' },
      { mine: '宜宾福源矿', area: '宜宾市', algorithm: '井下滞留超时', clue: '2 名掘进人员连续滞留井下 13 小时。', risk: '中', status: '研判中', time: '07-06 07:50' },
      { mine: '乐山鑫和矿', area: '乐山市', algorithm: '停产时段仍有入井轨迹', clue: '停产报备期间 6 次入井刷卡与定位同时出现。', risk: '高', status: '核查中', time: '07-05 22:21' },
    ],
  },
  {
    id: 'coal',
    label: '产量',
    title: '产量异常线索',
    tone: 'blue' as DrilldownTone,
    summary: '围绕煤流、运输和产量报送的冲突识别疑似违规生产。',
    clueTotal: 24,
    highRisk: 8,
    pending: 6,
    closedRate: '73%',
    mineTotal: 11,
    todayNew: 3,
    focus: ['停产期间煤流皮带仍持续运行', '产量报送与设备负荷曲线明显背离', '运输环节夜间异常活跃'],
    disposal: ['核对产量日报与现场运输记录', '联动视频抽检煤流和皮带运行', '对重复命中的矿井下发专项任务'],
    algorithms: [
      { name: '停产期间煤流仍持续', category: '隐蔽工作面', status: '运行中', description: '停产报备期间煤流皮带负荷仍连续抬升。', clueCount: 9, risk: '高' },
      { name: '产量报送与设备负荷背离', category: '产量异常', status: '运行中', description: '日报产量偏低，但提升、运输设备负荷维持高位。', clueCount: 8, risk: '高' },
      { name: '夜间运输异常活跃', category: '产量异常', status: '新增', description: '夜间运输节奏明显高于近 30 日均值。', clueCount: 7, risk: '中' },
    ],
    clues: [
      { mine: '泸州宏远矿', area: '泸州市', algorithm: '停产期间煤流仍持续', clue: '停产报备 3 小时内煤流负荷持续高于日均值。', risk: '高', status: '待核查', time: '07-06 08:35' },
      { mine: '达州腾达矿', area: '达州市', algorithm: '产量报送与设备负荷背离', clue: '日报产量为 0，但运输设备负荷达到均值 82%。', risk: '高', status: '研判中', time: '07-06 06:42' },
      { mine: '宜宾宝兴矿', area: '宜宾市', algorithm: '夜间运输异常活跃', clue: '23:00 后皮带启停频次高于近 30 日均值 2.4 倍。', risk: '中', status: '核查中', time: '07-05 23:03' },
    ],
  },
  {
    id: 'power',
    label: '用电',
    title: '用电异常线索',
    tone: 'amber' as DrilldownTone,
    summary: '围绕电流负荷、回路切换和停送电记录识别异常生产痕迹。',
    clueTotal: 22,
    highRisk: 5,
    pending: 4,
    closedRate: '76%',
    mineTotal: 10,
    todayNew: 2,
    focus: ['停送电记录与负荷曲线不一致', '重点回路夜间负荷异常抬升', '同区域多回路同步活跃'],
    disposal: ['优先排查夜间负荷异常回路', '核验停送电台账和审批记录', '与产量、人员线索做交叉印证'],
    algorithms: [
      { name: '停送电记录与负荷曲线冲突', category: '用电异常', status: '运行中', description: '记录显示停电，但重点回路负荷持续存在。', clueCount: 8, risk: '高' },
      { name: '夜间负荷异常抬升', category: '用电异常', status: '运行中', description: '夜间负荷较近 30 日均值提升明显，疑似夜间作业。', clueCount: 7, risk: '中' },
      { name: '多回路同步活跃', category: '隐蔽工作面', status: '新增', description: '同区域多个回路短时同步抬升，存在隐蔽生产迹象。', clueCount: 7, risk: '中' },
    ],
    clues: [
      { mine: '广安顺发矿', area: '广安市', algorithm: '停送电记录与负荷曲线冲突', clue: '停电记录时段内提升回路仍有 41% 负荷。', risk: '高', status: '待核查', time: '07-06 07:28' },
      { mine: '达州南河矿', area: '达州市', algorithm: '夜间负荷异常抬升', clue: '夜间 01:00-03:00 回路负荷较均值上浮 65%。', risk: '中', status: '研判中', time: '07-06 01:43' },
      { mine: '宜宾金河矿', area: '宜宾市', algorithm: '多回路同步活跃', clue: '采区、运输、通风三类回路同一分钟内同步升高。', risk: '中', status: '核查中', time: '07-05 22:46' },
    ],
  },
];

export const shuanIllegalCampaignModules = [
  {
    id: 'hidden-face',
    route: 'shuan-home-command-v3-illegal-campaign-hidden-face',
    label: '隐蔽工作面',
    title: '隐蔽工作面专项整治',
    subtitle: '停产疑似生产与隐蔽采掘风险',
    tone: 'red' as DrilldownTone,
    summary: '聚焦停产疑似生产、夜间异常活动和多源信号冲突的专项整治总览。',
    metrics: [
      { label: '疑似矿井', value: '18', hint: '规则命中', tone: 'red' as DrilldownTone },
      { label: '高风险', value: '9', hint: '优先核查', tone: 'amber' as DrilldownTone },
      { label: '支撑线索', value: '76', hint: '多源汇聚', tone: 'cyan' as DrilldownTone },
    ],
    filters: ['全部', '达州市', '宜宾市', '泸州市'],
    areas: [
      { area: '达州市', total: 41, high: 6, mid: 8, low: 22, delta: 3 },
      { area: '宜宾市', total: 30, high: 4, mid: 6, low: 20, delta: 2 },
      { area: '泸州市', total: 13, high: 3, mid: 2, low: 8, delta: 1 },
    ],
    suspiciousPoints: [
      { type: '停产期间疑似生产', count: 12, high: 5, hint: '停产期间异常活跃', tone: 'red' as DrilldownTone },
      { type: '夜间异常活动', count: 9, high: 3, hint: '夜间活动偏高', tone: 'amber' as DrilldownTone },
    ],
    trend: [
      { label: '05-07', high: 5, mid: 8, low: 12 },
      { label: '05-08', high: 6, mid: 7, low: 13 },
      { label: '05-09', high: 8, mid: 9, low: 16 },
    ],
    mines: [
      { mine: '达星XX煤矿', area: '达州市', score: 93, level: 'high' as const, point: '停产期间疑似生产', clues: 8, status: '待核查', trend: 'up' as const, profileRoute: shuanHiddenFaceMineProfileData.route },
      { mine: '宜宾XX煤矿', area: '宜宾市', score: 86, level: 'high' as const, point: '数据遮蔽风险', clues: 6, status: '核查中', trend: 'flat' as const },
    ],
    tasks: [
      { label: '待核查任务', value: '23', hint: '待派发或待接收', tone: 'red' as DrilldownTone },
      { label: '现场核查', value: '7', hint: '处置进行中', tone: 'amber' as DrilldownTone },
    ],
  },
  {
    id: 'monitor-fake',
    route: 'shuan-home-command-v3-illegal-campaign-monitor-fake',
    label: '监控造假',
    title: '监控造假专项整治',
    subtitle: '传感器异常与报警闭锁造假风险',
    tone: 'cyan' as DrilldownTone,
    summary: '聚焦传感器平直、报警缺失和闭锁联动异常的专项整治场景。',
    metrics: [],
    filters: [],
    areas: [],
    suspiciousPoints: [],
    trend: [],
    mines: [],
    tasks: [],
  },
  {
    id: 'hidden-person',
    route: 'shuan-home-command-v3-illegal-campaign-hidden-person',
    label: '隐瞒入井人数',
    title: '隐瞒入井人数专项整治',
    subtitle: '人员定位与视频人数不匹配风险',
    tone: 'green' as DrilldownTone,
    summary: '聚焦入井人数瞒报、定位异常和视频人数冲突的专项整治场景。',
    metrics: [],
    filters: [],
    areas: [],
    suspiciousPoints: [],
    trend: [],
    mines: [],
    tasks: [],
  },
];

export const shuanVideoDispatchData = {
  title: '视频调度',
  mineTotal: 63,
  filters: [
    { label: '在线', value: '39', tone: 'green' as DrilldownTone },
    { label: '离线', value: '2', tone: 'red' as DrilldownTone },
    { label: '新国标', value: '37', tone: 'blue' as DrilldownTone },
  ],
  mines: [
    { name: '达星XX煤矿', county: '达州市', status: '在线', network: '新国标' },
    { name: '宜宾XX煤矿', county: '宜宾市', status: '在线', network: '新国标' },
    { name: '泸州XX煤矿', county: '泸州市', status: '离线', network: '旧标准' },
  ],
  currentMine: { name: '达星XX煤矿', state: '生产中' },
  summaries: [
    { label: '视频总数', value: '63', kind: 'camera' as const, active: true },
    { label: '异常视频', value: '1', kind: 'camera' as const },
    { label: '告警消息', value: '288', kind: 'alarm' as const },
  ],
  layouts: ['1', '4', '9', '16'],
  groups: [
    {
      title: '11209 回风巷',
      count: 4,
      expanded: true,
      videos: [
        { name: '摄像头 T1', status: '在线' },
        { name: '摄像头 T2', status: '在线' },
        { name: '摄像头 T3', status: '离线' },
      ],
    },
    {
      title: '主运输巷',
      count: 3,
      expanded: false,
      videos: [{ name: '摄像头 H1', status: '在线' }],
    },
  ],
};

const shuanRiskControlDataLegacy = {
  route: 'shuan-home-command-v3-risk-control',
  title: '风险分级管控',
  subtitle: '监管业务 / 风险分级管控',
  description: '先搭建风险分级管控的下钻工作台框架，后续可继续补充分级规则、风险点清单、管控措施和闭环处置细节。',
  timeRange: '近30天',
  updatedAt: '2026-07-07 10:30',
  kpis: [
    { label: '风险点总数', value: '186', hint: '已纳入分级管控', tone: 'cyan' as DrilldownTone },
    { label: '重大风险', value: '12', hint: '需领导包保跟踪', tone: 'red' as DrilldownTone },
    { label: '较大风险', value: '38', hint: '本周重点复核', tone: 'amber' as DrilldownTone },
    { label: '待复核措施', value: '21', hint: '含7项临期', tone: 'blue' as DrilldownTone },
    { label: '闭环率', value: '84%', hint: '较上周 +6%', tone: 'green' as DrilldownTone },
  ],
  grades: [
    { name: '重大风险', count: 12, percent: 16, tone: 'red' as DrilldownTone },
    { name: '较大风险', count: 38, percent: 32, tone: 'amber' as DrilldownTone },
    { name: '一般风险', count: 79, percent: 34, tone: 'cyan' as DrilldownTone },
    { name: '低风险', count: 57, percent: 18, tone: 'green' as DrilldownTone },
  ],
  domains: [
    { name: '瓦斯治理', total: 42, major: 5, owner: '通风防突组' },
    { name: '水害防治', total: 31, major: 3, owner: '地测防治水组' },
    { name: '顶板管理', total: 28, major: 2, owner: '采掘监管组' },
    { name: '机电运输', total: 37, major: 1, owner: '机运监管组' },
    { name: '人员行为', total: 48, major: 1, owner: '安全管理组' },
  ],
  riskRows: [
    { mine: '达州星河煤矿', area: '达州市', point: '回风巷瓦斯异常升高', grade: '重大风险', control: '领导包保 / 每日复核', status: '管控中', owner: '市级监管专班' },
    { mine: '宜宾安平煤矿', area: '宜宾市', point: '采掘接续与探放水记录不一致', grade: '重大风险', control: '专项核查 / 现场复测', status: '待复核', owner: '县级监管组' },
    { mine: '乐山宏达煤矿', area: '乐山市', point: '顶板离层监测连续预警', grade: '较大风险', control: '加密巡检 / 限时整改', status: '整改中', owner: '采掘监管组' },
    { mine: '广元青峰煤矿', area: '广元市', point: '主运输皮带保护动作频繁', grade: '较大风险', control: '设备检修 / 复查确认', status: '管控中', owner: '机运监管组' },
    { mine: '泸州仁和煤矿', area: '泸州市', point: '重点岗位人员异常换班', grade: '一般风险', control: '班组提醒 / 台账留痕', status: '已闭环', owner: '安全管理组' },
  ],
  tasks: [
    { label: '风险辨识', value: '本周新增 17 项', detail: '来源于报警、巡检、专家研判和企业自查。' },
    { label: '措施制定', value: '21 项待完善', detail: '重点补齐责任人、时限、复核频次和验收口径。' },
    { label: '现场复核', value: '7 项临期', detail: '优先安排重大风险和较大风险现场复核。' },
    { label: '动态调整', value: '9 项待调级', detail: '根据处置结果更新风险等级和管控状态。' },
  ],
};

export const shuanRiskControlData = {
  route: 'shuan-home-command-v3-risk-control',
  title: '风险分级管控',
  subtitle: '首页 / 日常监管 / 风险分级管控',
  timestamp: '2025-06-02 10:28:36',
  weather: '23℃ 多云',
  kpis: [
    { label: '风险总数', value: '1,286', percent: '', tone: 'cyan' as DrilldownTone, icon: 'radar' },
    { label: '重大风险', value: '118', percent: '9.2%', tone: 'red' as DrilldownTone, icon: 'alert' },
    { label: '较大风险', value: '234', percent: '18.2%', tone: 'amber' as DrilldownTone, icon: 'alert' },
    { label: '一般风险', value: '512', percent: '39.8%', tone: 'amber' as DrilldownTone, icon: 'warn' },
    { label: '低风险', value: '422', percent: '32.8%', tone: 'blue' as DrilldownTone, icon: 'shield' },
    { label: '待检查', value: '136', percent: '10.6%', tone: 'blue' as DrilldownTone, icon: 'clipboard' },
    { label: '逾期管控', value: '23', percent: '1.8%', tone: 'red' as DrilldownTone, icon: 'clock' },
  ],
  grades: [
    { name: '重大风险', count: 118, percent: '9.2%', tone: 'red' as DrilldownTone },
    { name: '较大风险', count: 234, percent: '18.2%', tone: 'amber' as DrilldownTone },
    { name: '一般风险', count: 512, percent: '39.8%', tone: 'amber' as DrilldownTone },
    { name: '低风险', count: 422, percent: '32.8%', tone: 'blue' as DrilldownTone },
  ],
  types: [
    { label: '瓦斯', value: 326, percent: '25.4%' },
    { label: '水害', value: 238, percent: '18.5%' },
    { label: '顶板', value: 214, percent: '16.6%' },
    { label: '机电', value: 176, percent: '13.7%' },
    { label: '运输', value: 142, percent: '11.0%' },
    { label: '通风', value: 108, percent: '8.4%' },
    { label: '火灾', value: 82, percent: '6.4%' },
  ],
  trendDays: ['05-03', '05-10', '05-17', '05-24', '05-31', '06-02'],
  trendSeries: [
    { label: '重大风险', color: '#ff4d5f', values: [2, 5, 4, 4, 7, 6] },
    { label: '较大风险', color: '#ff9f1a', values: [38, 40, 37, 36, 42, 43] },
    { label: '一般风险', color: '#ffd43b', values: [69, 74, 70, 68, 78, 80] },
    { label: '低风险', color: '#3c8dff', values: [102, 111, 108, 110, 121, 128] },
  ],
  majorRows: [
    { point: '采煤工作面瓦斯超限', mine: '广元市煤矿', level: '重大风险', area: '2312采煤工作面', owner: '张建国', measure: '安装瓦斯在线监测与断电装置，严格执行', cycle: '每日', status: '管控中' },
    { point: '回风巷片帮冒顶', mine: '达州市煤矿', level: '重大风险', area: '回风大巷（-450m）', owner: '王强', measure: '加强支护，设置锚索锚杆，定期巡检', cycle: '每日', status: '管控中' },
    { point: '主排水系统故障', mine: '雅安市煤矿', level: '重大风险', area: '主井底车场', owner: '刘伟', measure: '双电源与双水泵配置，定期试验排水能力', cycle: '每日', status: '管控中' },
    { point: '高瓦斯区域乱接线', mine: '泸州市煤矿', level: '重大风险', area: '123回风巷', owner: '陈刚', measure: '规范电气设备安装，加强电气巡检', cycle: '每日', status: '待复查' },
    { point: '煤与瓦斯突出危险区', mine: '凉山州煤矿', level: '重大风险', area: '三水平南翼', owner: '赵明', measure: '实施区域防突措施，超前钻孔预抽瓦斯', cycle: '每周', status: '管控中' },
    { point: '提升运输系统超载', mine: '内江市煤矿', level: '重大风险', area: '主斜井提升', owner: '周磊', measure: '设置载荷保护装置，严禁超载运行', cycle: '每日', status: '待复查' },
    { point: '通风系统不稳定', mine: '攀枝花煤矿', level: '重大风险', area: '通风系统', owner: '李刚', measure: '优化通风网络，各用风点定期试运转', cycle: '每周', status: '管控中' },
    { point: '粉尘积聚遇火源', mine: '自贡市煤矿', level: '重大风险', area: '皮带巷', owner: '孙涛', measure: '加强洒水降尘，清理积尘，严禁明火', cycle: '每周', status: '管控中' },
    { point: '主运输皮带跑偏', mine: '达州市煤矿', level: '较大风险', area: '主运输巷', owner: '李浩', measure: '调整托辊与保护装置，复核皮带张紧', cycle: '每周', status: '管控中' },
    { point: '机电设备绝缘不良', mine: '雅安市煤矿', level: '低风险', area: '机电硐室', owner: '刘伟', measure: '更换老化线路，纳入班检记录', cycle: '每月', status: '已完成' },
    { point: '通风设施风量不足', mine: '内江市煤矿', level: '较大风险', area: '西翼回风巷', owner: '王强', measure: '复测风量并校核调节风窗', cycle: '每周', status: '待复查' },
    { point: '岗位交接记录缺项', mine: '泸州市煤矿', level: '一般风险', area: '调度室', owner: '陈刚', measure: '完善交接班记录并抽查签字', cycle: '每月', status: '管控中' },
  ],
  inspectionRows: [
    { time: '2025-06-02 09:35', mine: '广元市煤矿', point: '2312采煤工作面瓦斯超限', level: '重大风险', inspector: '张建国', result: '不合格', issue: '瓦斯浓度传感器数值漂移', deadline: '2025-06-04', status: '整改中' },
    { time: '2025-06-02 08:40', mine: '达州市煤矿', point: '回风巷片帮冒顶', level: '重大风险', inspector: '李浩', result: '合格', issue: '支护完好，未发现隐患', deadline: '-', status: '已完成' },
    { time: '2025-06-01 16:20', mine: '雅安市煤矿', point: '主排水系统故障', level: '重大风险', inspector: '刘伟', result: '不合格', issue: '备用水泵未自动切换', deadline: '2025-06-03', status: '整改中' },
    { time: '2025-06-01 10:15', mine: '泸州市煤矿', point: '高瓦斯区域乱接线', level: '重大风险', inspector: '陈刚', result: '一般', issue: '部分接线不规范', deadline: '2025-06-07', status: '整改中' },
    { time: '2025-05-31 15:50', mine: '凉山州煤矿', point: '煤与瓦斯突出危险区', level: '重大风险', inspector: '赵明', result: '合格', issue: '预抽瓦斯钻孔已到位', deadline: '-', status: '已完成' },
    { time: '2025-05-31 10:20', mine: '达州市煤矿', point: '主运输皮带跑偏', level: '较大风险', inspector: '李浩', result: '一般', issue: '保护装置需重新标定', deadline: '2025-06-06', status: '整改中' },
    { time: '2025-05-30 14:30', mine: '雅安市煤矿', point: '机电设备绝缘不良', level: '低风险', inspector: '刘伟', result: '合格', issue: '已完成绝缘复测', deadline: '-', status: '已完成' },
    { time: '2025-05-30 09:10', mine: '泸州市煤矿', point: '岗位交接记录缺项', level: '一般风险', inspector: '陈刚', result: '一般', issue: '交接记录缺少复核签字', deadline: '2025-06-05', status: '整改中' },
  ],
  warnings: [
    { title: '重大风险预警', mine: '广元市煤矿', detail: '2312采煤工作面瓦斯浓度超限', time: '10:25', level: '重大' },
    { title: '较大风险预警', mine: '达州市煤矿', detail: '回风巷局部顶板离层', time: '09:58', level: '较大' },
    { title: '一般风险预警', mine: '雅安市煤矿', detail: '主排水系统水位上升', time: '09:32', level: '一般' },
    { title: '低风险提示', mine: '广元市煤矿', detail: '机电设备点检记录待补齐', time: '09:24', level: '低' },
    { title: '信息提示', mine: '泸州市煤矿', detail: '通风机负压波动', time: '09:15', level: '提示' },
  ],
  changes: [
    { time: '2025-06-02 08:10', mine: '广元市煤矿', point: '2312掘进工作面瓦斯', type: '升级', level: '重大风险' },
    { time: '2025-06-01 14:22', mine: '达州市煤矿', point: '主运输皮带打滑', type: '降级', level: '一般风险' },
    { time: '2025-05-31 16:45', mine: '雅安市煤矿', point: '机电设备绝缘不良', type: '降级', level: '低风险' },
    { time: '2025-05-30 09:30', mine: '内江市煤矿', point: '通风系统风量不足', type: '升级', level: '较大风险' },
  ],
  overdueRanks: [
    { rank: 1, name: '广元市煤矿', count: 8, days: '13天' },
    { rank: 2, name: '达州市煤矿', count: 6, days: '9天' },
    { rank: 3, name: '泸州市煤矿', count: 4, days: '6天' },
    { rank: 4, name: '雅安市煤矿', count: 3, days: '4天' },
    { rank: 5, name: '自贡市煤矿', count: 2, days: '3天' },
  ],
  mapPoints: [
    { x: 72, y: 22, tone: 'red' as DrilldownTone },
    { x: 63, y: 33, tone: 'amber' as DrilldownTone },
    { x: 78, y: 45, tone: 'blue' as DrilldownTone },
    { x: 52, y: 52, tone: 'amber' as DrilldownTone },
    { x: 41, y: 62, tone: 'cyan' as DrilldownTone },
    { x: 58, y: 72, tone: 'red' as DrilldownTone },
    { x: 32, y: 73, tone: 'blue' as DrilldownTone },
    { x: 46, y: 36, tone: 'cyan' as DrilldownTone },
    { x: 68, y: 62, tone: 'amber' as DrilldownTone },
    { x: 84, y: 68, tone: 'red' as DrilldownTone },
  ],
  mapLegend: [
    { label: '重大风险', value: 15, tone: 'red' as DrilldownTone },
    { label: '较大风险', value: 28, tone: 'amber' as DrilldownTone },
    { label: '一般风险', value: 62, tone: 'cyan' as DrilldownTone },
    { label: '低风险', value: 41, tone: 'blue' as DrilldownTone },
  ],
  bottomMetrics: [
    { label: '风险转隐患数量（本月）', value: '86', delta: '环比 -12.2%', tone: 'cyan' as DrilldownTone, icon: 'transfer' },
    { label: '闭环率（本月）', value: '92.3%', delta: '环比 +3.6%', tone: 'cyan' as DrilldownTone, icon: 'ring' },
    { label: '当前预警响应率（本月）', value: '96.8%', delta: '环比 +4.1%', tone: 'cyan' as DrilldownTone, icon: 'headset' },
    { label: '责任落实率（本月）', value: '94.7%', delta: '环比 +2.8%', tone: 'cyan' as DrilldownTone, icon: 'person' },
  ],
};

export const shuanRiskControlDashboardData = {
  title: '风险分级管控',
  breadcrumb: ['首页', '日常监管', '风险分级管控'],
  timestamp: '2025-05-24 10:30:45',
  weather: '多云 22~28℃',
  kpis: [
    { label: '风险总数', value: '1,236', unit: '项', deltaText: '较昨日', deltaValue: '68', deltaDirection: 'up', tone: 'blue' as DrilldownTone },
    { label: '重大风险', value: '68', unit: '项', deltaText: '较昨日', deltaValue: '6', deltaDirection: 'up', tone: 'red' as DrilldownTone },
    { label: '较大风险', value: '212', unit: '项', deltaText: '较昨日', deltaValue: '14', deltaDirection: 'up', tone: 'amber' as DrilldownTone },
    { label: '风险升级', value: '37', unit: '项', deltaText: '较昨日', deltaValue: '7', deltaDirection: 'up', tone: 'amber' as DrilldownTone },
    { label: '待管控', value: '156', unit: '项', deltaText: '较昨日', deltaValue: '8', deltaDirection: 'down', tone: 'blue' as DrilldownTone },
    { label: '管控逾期', value: '43', unit: '项', deltaText: '较昨日', deltaValue: '5', deltaDirection: 'up', tone: 'blue' as DrilldownTone },
  ],
  gradeDistribution: [
    { label: '重大风险', value: 68, percent: '5.5%', tone: 'red' as DrilldownTone },
    { label: '较大风险', value: 212, percent: '17.2%', tone: 'amber' as DrilldownTone },
    { label: '一般风险', value: 713, percent: '57.7%', tone: 'cyan' as DrilldownTone },
    { label: '低风险', value: 243, percent: '19.6%', tone: 'blue' as DrilldownTone },
  ],
  typeDistribution: [
    { label: '瓦斯', value: 352 },
    { label: '水害', value: 248 },
    { label: '顶板', value: 223 },
    { label: '机电', value: 165 },
    { label: '运输', value: 128 },
    { label: '通风', value: 120 },
  ],
  professionalShare: [
    { label: '采煤', value: 421, percent: '34.1%', tone: 'amber' as DrilldownTone },
    { label: '掘进', value: 325, percent: '26.3%', tone: 'cyan' as DrilldownTone },
    { label: '机电', value: 216, percent: '17.5%', tone: 'blue' as DrilldownTone },
    { label: '通风', value: 150, percent: '12.1%', tone: 'green' as DrilldownTone },
    { label: '其他', value: 124, percent: '10.0%', tone: 'slate' as DrilldownTone },
  ],
  mapFilters: {
    city: '全部市州',
    searchPlaceholder: '搜索煤矿名称',
    levels: ['重大风险', '较大风险', '一般风险', '低风险'],
  },
  mapLegend: [
    { label: '红色预警（重大风险）', tone: 'red' as DrilldownTone },
    { label: '橙色预警（较大风险）', tone: 'amber' as DrilldownTone },
    { label: '黄色预警（一般风险）', tone: 'cyan' as DrilldownTone },
    { label: '蓝色预警（低风险）', tone: 'blue' as DrilldownTone },
  ],
  mapPoints: [
    { name: '阿坝州', x: 36, y: 32, tone: 'red' as DrilldownTone, size: 'lg' as const },
    { name: '绵阳市', x: 53, y: 22, tone: 'blue' as DrilldownTone, size: 'sm' as const },
    { name: '德阳市', x: 55, y: 39, tone: 'amber' as DrilldownTone, size: 'sm' as const },
    { name: '成都市', x: 50, y: 50, tone: 'cyan' as DrilldownTone, size: 'sm' as const },
    { name: '雅安市', x: 43, y: 57, tone: 'red' as DrilldownTone, size: 'lg' as const },
    { name: '眉山市', x: 51, y: 61, tone: 'amber' as DrilldownTone, size: 'sm' as const },
    { name: '乐山市', x: 49, y: 71, tone: 'cyan' as DrilldownTone, size: 'sm' as const },
    { name: '宜宾市', x: 69, y: 73, tone: 'red' as DrilldownTone, size: 'lg' as const },
    { name: '泸州市', x: 73, y: 60, tone: 'blue' as DrilldownTone, size: 'sm' as const },
    { name: '遂宁市', x: 62, y: 52, tone: 'blue' as DrilldownTone, size: 'sm' as const },
    { name: '巴中市', x: 82, y: 35, tone: 'amber' as DrilldownTone, size: 'sm' as const },
    { name: '广元市', x: 72, y: 18, tone: 'cyan' as DrilldownTone, size: 'sm' as const },
    { name: '达州市', x: 75, y: 47, tone: 'red' as DrilldownTone, size: 'lg' as const },
    { name: '内江市', x: 62, y: 67, tone: 'amber' as DrilldownTone, size: 'sm' as const },
    { name: '攀枝花市', x: 40, y: 86, tone: 'blue' as DrilldownTone, size: 'sm' as const },
  ],
  disposalCards: [
    { title: '重大风险监管', value: '68', unit: '项', tone: 'red' as DrilldownTone, stats: [['未整治', '23'], ['整治中', '31'], ['已销号', '14']] },
    { title: '风险升级预警', value: '37', unit: '项', tone: 'amber' as DrilldownTone, stats: [['今日新增', '7'], ['48小时内', '12']] },
    { title: '管控措施未落实', value: '156', unit: '项', tone: 'amber' as DrilldownTone, stats: [['未落实', '96'], ['部分落实', '60']] },
    { title: '检查逾期提醒', value: '43', unit: '项', tone: 'blue' as DrilldownTone, stats: [['逾期1-7天', '24'], ['逾期8-30天', '13'], ['逾期30天以上', '6']] },
  ],
  top5Mines: [
    { rank: 1, name: '某某煤矿（达州市）', level: '重大风险', value: 96, tone: 'red' as DrilldownTone },
    { rank: 2, name: '某某煤矿（广元市）', level: '重大风险', value: 92, tone: 'red' as DrilldownTone },
    { rank: 3, name: '某某煤矿（南充市）', level: '较大风险', value: 85, tone: 'amber' as DrilldownTone },
    { rank: 4, name: '某某煤矿（宜宾市）', level: '较大风险', value: 82, tone: 'amber' as DrilldownTone },
    { rank: 5, name: '某某煤矿（泸州市）', level: '较大风险', value: 78, tone: 'amber' as DrilldownTone },
  ],
  riskTrendDays: ['04-24', '04-28', '05-02', '05-06', '05-10', '05-14', '05-18', '05-22', '05-24'],
  riskTrendSeries: [
    { label: '重大风险', color: '#ff545d', values: [1280, 1420, 1365, 1408, 1452, 1433, 1491, 1520, 1504] },
    { label: '较大风险', color: '#ff9d27', values: [812, 826, 804, 855, 901, 918, 965, 998, 1010] },
    { label: '一般风险', color: '#ffd34a', values: [372, 381, 396, 411, 428, 417, 445, 461, 472] },
    { label: '低风险', color: '#44a6ff', values: [162, 168, 171, 183, 192, 205, 214, 226, 238] },
  ],
  levelTrendBars: [
    { day: '04-24', up: 38, down: 24 },
    { day: '04-28', up: 62, down: 31 },
    { day: '05-02', up: 45, down: 28 },
    { day: '05-06', up: 58, down: 35 },
    { day: '05-10', up: 41, down: 26 },
    { day: '05-14', up: 53, down: 29 },
    { day: '05-18', up: 47, down: 23 },
    { day: '05-22', up: 68, down: 36 },
    { day: '05-24', up: 44, down: 27 },
  ],
  regionHeatSeries: [
    { label: '川东北', color: '#ff545d', values: [58, 61, 64, 63, 66, 65, 69, 73, 72] },
    { label: '成都平原', color: '#ff9d27', values: [51, 54, 55, 56, 57, 59, 61, 63, 64] },
    { label: '川中丘陵', color: '#ffd34a', values: [46, 48, 49, 50, 52, 53, 55, 57, 58] },
    { label: '川南地区', color: '#64d7ff', values: [39, 40, 42, 43, 44, 45, 46, 46, 46] },
    { label: '攀西地区', color: '#5d8dff', values: [29, 30, 31, 32, 32, 33, 34, 34, 34] },
    { label: '川西北', color: '#7b6aff', values: [22, 23, 24, 24, 25, 26, 27, 28, 28] },
  ],
};

export const shuanDangerousWorkReportData = {
  route: 'shuan-home-command-v3-dangerous-work-report',
  title: '危险作业报备',
  subtitle: '跟踪今日危险作业状态，辅助重点作业核查与风险处置',
  description: '围绕今日危险作业报备状态、重点作业清单、即将开始作业、撤销报备、关联异常和重点煤矿关注事项，支撑监管人员快速核查与处置。',
  updatedAt: '待接入业务数据',
  tools: ['今日', '近7日', '近30日'],
  slots: [
    { title: '报备总览区', hint: '预留统计卡片、趋势和作业类型分布。' },
    { title: '作业报备台账区', hint: '预留报备列表、审批状态、矿井、作业地点和时间窗口。' },
    { title: '风险校核与处置区', hint: '预留风险等级联动、措施确认、超期提醒和闭环动作。' },
  ],
};

export interface LicenseExpiryKpi {
  label: string;
  value: string;
  unit?: string;
  iconType: 'shield' | 'clock' | 'alert' | 'building' | 'user' | 'gauge';
  trend?: 'up';
}

export interface LicenseTypeRow {
  type: string;
  icon: string;
  upcoming: number;
  expired: number;
  total: number;
  highlight?: boolean;
}

export interface CityMapMarker {
  name: string;
  value: number;
  x: number;
  y: number;
}

export interface MineRankingItem {
  rank: number;
  name: string;
  total: number;
  upcoming: number;
  expired: number;
}

export interface TrendData {
  days: string[];
  upcoming: number[];
  expired: number[];
}

export interface DonutSlice {
  label: string;
  value: number;
  percent: string;
  color: string;
}

export interface PositionBarItem {
  label: string;
  value: number;
}

export interface UrgentReminder {
  company: string;
  licenseType: string;
  status: 'expired' | 'upcoming';
  days: number;
}

export interface LicenseExpiryReminderData {
  route: string;
  title: string;
  updatedAt: string;
  kpis: LicenseExpiryKpi[];
  licenseTypes: LicenseTypeRow[];
  cityMarkers: CityMapMarker[];
  mineRankings: MineRankingItem[];
  trend: TrendData;
  abnormalStructure: DonutSlice[];
  warningCategories: DonutSlice[];
  positionAbnormal: PositionBarItem[];
  urgentReminders: UrgentReminder[];
}

export const shuanLicenseExpiryReminderData: LicenseExpiryReminderData = {
  route: 'shuan-home-command-v3-license-expiry-reminder',
  title: '证照到期提醒',
  updatedAt: '2024-05-28 10:30:00',
  kpis: [
    { label: '预警总数', value: '118', iconType: 'shield', trend: 'up' },
    { label: '即将到期(30天内)', value: '93', iconType: 'clock', trend: 'up' },
    { label: '已过期', value: '25', iconType: 'alert', trend: 'up' },
    { label: '涉及煤矿', value: '67', unit: '家', iconType: 'building' },
    { label: '涉及人员', value: '1,602', unit: '人', iconType: 'user' },
    { label: '企业覆盖率', value: '82%', iconType: 'gauge' },
  ],
  licenseTypes: [
    { type: '营业执照', icon: 'file', upcoming: 0, expired: 1, total: 1 },
    { type: '采矿许可证', icon: 'pickaxe', upcoming: 10, expired: 2, total: 12 },
    { type: '安全生产许可证', icon: 'shield', upcoming: 12, expired: 25, total: 37, highlight: true },
    { type: '安全生产标准化证书', icon: 'award', upcoming: 18, expired: 18, total: 36 },
    { type: '职业病危害评价证书', icon: 'hospital', upcoming: 3, expired: 7, total: 10 },
    { type: '其他', icon: 'files', upcoming: 1, expired: 4, total: 5 },
  ],
  cityMarkers: [
    { name: '成都市', value: 5, x: 43, y: 42 },
    { name: '绵阳市', value: 9, x: 44, y: 30 },
    { name: '广元市', value: 8, x: 50, y: 20 },
    { name: '巴中市', value: 6, x: 58, y: 28 },
    { name: '南充市', value: 7, x: 55, y: 38 },
    { name: '达州市', value: 11, x: 68, y: 35 },
    { name: '遂宁市', value: 5, x: 52, y: 42 },
    { name: '广安市', value: 6, x: 62, y: 44 },
    { name: '资阳市', value: 4, x: 50, y: 48 },
    { name: '内江市', value: 10, x: 58, y: 52 },
    { name: '自贡市', value: 6, x: 58, y: 56 },
    { name: '泸州市', value: 12, x: 65, y: 62 },
    { name: '宜宾市', value: 4, x: 52, y: 62 },
    { name: '乐山市', value: 4, x: 43, y: 55 },
    { name: '眉山市', value: 4, x: 45, y: 48 },
    { name: '雅安市', value: 5, x: 38, y: 48 },
    { name: '攀枝花市', value: 3, x: 32, y: 72 },
    { name: '凉山州', value: 9, x: 36, y: 65 },
    { name: '阿坝州', value: 0, x: 36, y: 22 },
    { name: '甘孜州', value: 0, x: 28, y: 45 },
  ],
  mineRankings: [
    { rank: 1, name: '川煤集团华蓥山煤矿', total: 12, upcoming: 8, expired: 4 },
    { rank: 2, name: '达州CC煤业有限公司', total: 10, upcoming: 6, expired: 4 },
    { rank: 3, name: '达县小CC煤业有限责任公司', total: 9, upcoming: 6, expired: 3 },
    { rank: 4, name: '广元市CC煤矿', total: 8, upcoming: 6, expired: 2 },
    { rank: 5, name: '资中县CC煤业有限责任公司', total: 7, upcoming: 5, expired: 2 },
  ],
  trend: {
    days: ['04-29', '05-03', '05-07', '05-11', '05-15', '05-19', '05-23', '05-27'],
    upcoming: [30, 25, 28, 33, 30, 32, 22, 30],
    expired: [5, 3, 4, 6, 5, 4, 3, 7],
  },
  abnormalStructure: [
    { label: '安全生产许可证', value: 22, percent: '37.9%', color: '#2b7de9' },
    { label: '采矿许可证', value: 15, percent: '25.9%', color: '#ff9d27' },
    { label: '标准化证书', value: 6, percent: '10.3%', color: '#52c41a' },
    { label: '职业危害评', value: 6, percent: '10.3%', color: '#64d7ff' },
    { label: '营业执照', value: 3, percent: '5.2%', color: '#ff4d4f' },
    { label: '其他', value: 6, percent: '10.3%', color: '#8c8c8c' },
  ],
  warningCategories: [
    { label: '企业预警', value: 65, percent: '55.1%', color: '#ff9d27' },
    { label: '人员预警', value: 38, percent: '32.2%', color: '#2b7de9' },
    { label: '其他预警', value: 15, percent: '12.7%', color: '#52c41a' },
  ],
  positionAbnormal: [
    { label: '主要负责人', value: 16 },
    { label: '安全生产管理人员', value: 12 },
    { label: '特种作业人员', value: 10 },
    { label: '瓦斯检查员', value: 7 },
    { label: '爆破作业人员', value: 6 },
  ],
  urgentReminders: [
    { company: '达县小CC煤业有限责任公司', licenseType: '安全生产许可证', status: 'expired', days: -18 },
    { company: '达州CC煤业有限责任公司', licenseType: '采矿许可证', status: 'upcoming', days: 5 },
    { company: '广元市CC煤矿', licenseType: '安全生产标准化证书', status: 'upcoming', days: 8 },
    { company: '攀枝集团CC煤业有限责任公司', licenseType: '安全生产许可证', status: 'upcoming', days: 11 },
    { company: '川煤集团华蓥山煤矿', licenseType: '职业病危害评价许可证', status: 'upcoming', days: 15 },
  ],
};


export interface DisasterEvent {
  id: string;
  type: string;
  typeIcon: 'rain' | 'landslide' | 'earthquake' | 'lightning' | 'flood';
  warningLevel: 'orange' | 'yellow' | 'blue' | 'red';
  name: string;
  area: string;
  time: string;
  affectedMineCount: number;
  status: '处置中' | '监测中' | '已解除';
}

export interface AffectedMine {
  id: string;
  name: string;
  area: string;
  feedbackStatus: '已反馈' | '未反馈';
  needEvacuation: boolean;
  undergroundCount: number;
  unevacuatedCount: number;
  lastReportTime: string;
  status: '撤离中' | '持续监测' | '待反馈' | '无需撤离' | '已完成撤离' | '异常';
  phone: string;
}

export interface EvacuationStage {
  name: string;
  completed: boolean;
  time?: string;
}

export interface EvacuationDetail {
  totalUnderground: number;
  evacuated: number;
  unevacuated: number;
  completionRate: string;
  phone: string;
  lastReport: string;
  stages: EvacuationStage[];
}

export interface DisasterDetail {
  name: string;
  type: string;
  warningLevel: string;
  area: string;
  source: string;
  publishTime: string;
  updateTime: string;
  status: string;
}

export interface MapMineMarker {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'need-evacuation' | 'feedback' | 'no-feedback' | 'completed';
}

export interface MajorHazardWorkbenchData {
  route: string;
  title: string;
  globalStatus: {
    currentDisasterCount: number;
    affectedMineCount: number;
    needEvacuationCount: number;
    noFeedbackCount: number;
    disposalStatus: string;
    currentTime: string;
    autoRefresh: boolean;
  };
  currentDisasters: DisasterEvent[];
  historicalDisasters: DisasterEvent[];
  selectedDisaster: {
    detail: DisasterDetail;
    mapMines: MapMineMarker[];
    affectedMines: AffectedMine[];
    evacuationDetail: EvacuationDetail;
  };
}

export const shuanMajorHazardReminderData: MajorHazardWorkbenchData = {
  route: 'shuan-home-command-v3-major-hazard-reminder',
  title: '重大灾害提醒',
  globalStatus: {
    currentDisasterCount: 2,
    affectedMineCount: 5,
    needEvacuationCount: 1,
    noFeedbackCount: 1,
    disposalStatus: '处置中',
    currentTime: '2025-07-08 08:22:36',
    autoRefresh: true,
  },
  currentDisasters: [
    {
      id: 'd1',
      type: '暴雨',
      typeIcon: 'rain',
      warningLevel: 'orange',
      name: '广元市朝天区强降雨过程',
      area: '广元市朝天区',
      time: '08:10',
      affectedMineCount: 3,
      status: '处置中',
    },
    {
      id: 'd2',
      type: '滑坡',
      typeIcon: 'landslide',
      warningLevel: 'yellow',
      name: '乐山市马边县地质灾害风险',
      area: '乐山市马边县',
      time: '07-07 17:40',
      affectedMineCount: 1,
      status: '监测中',
    },
    {
      id: 'd3',
      type: '地震',
      typeIcon: 'earthquake',
      warningLevel: 'blue',
      name: '宜宾市珙县地震余震影响',
      area: '宜宾市珙县',
      time: '07-06 11:05',
      affectedMineCount: 1,
      status: '已解除',
    },
    {
      id: 'd4',
      type: '雷电',
      typeIcon: 'lightning',
      warningLevel: 'yellow',
      name: '凉山州盐源县雷电活动增强',
      area: '凉山州盐源县',
      time: '07-05 19:30',
      affectedMineCount: 2,
      status: '监测中',
    },
    {
      id: 'd5',
      type: '洪水',
      typeIcon: 'flood',
      warningLevel: 'blue',
      name: '雅安市汉源县河流水位上涨',
      area: '雅安市汉源县',
      time: '07-04 15:20',
      affectedMineCount: 1,
      status: '已解除',
    },
  ],
  historicalDisasters: [
    {
      id: 'h1',
      type: '暴雨',
      typeIcon: 'rain',
      warningLevel: 'orange',
      name: '成都市都江堰强降雨过程',
      area: '成都市都江堰',
      time: '06-28 06:30',
      affectedMineCount: 2,
      status: '已解除',
    },
    {
      id: 'h2',
      type: '地震',
      typeIcon: 'earthquake',
      warningLevel: 'yellow',
      name: '甘孜州泸定县地震余震',
      area: '甘孜州泸定县',
      time: '06-15 14:20',
      affectedMineCount: 3,
      status: '已解除',
    },
  ],
  selectedDisaster: {
    detail: {
      name: '广元市朝天区强降雨过程',
      type: '暴雨',
      warningLevel: '橙色预警',
      area: '广元市朝天区',
      source: '四川省气象台',
      publishTime: '2025-07-08 08:10',
      updateTime: '2025-07-08 08:20',
      status: '处置中',
    },
    mapMines: [
      { id: 'm1', name: '广元朝天煤矿', x: 52, y: 28, status: 'need-evacuation' },
      { id: 'm2', name: '平溪煤矿', x: 54, y: 30, status: 'feedback' },
      { id: 'm3', name: '羊木煤矿', x: 51, y: 26, status: 'no-feedback' },
      { id: 'm4', name: '柏杨煤矿', x: 55, y: 32, status: 'feedback' },
    ],
    affectedMines: [
      {
        id: 'm1',
        name: '广元朝天煤矿',
        area: '朝天区',
        feedbackStatus: '已反馈',
        needEvacuation: true,
        undergroundCount: 36,
        unevacuatedCount: 6,
        lastReportTime: '08:18',
        status: '撤离中',
        phone: '0839-8622001',
      },
      {
        id: 'm2',
        name: '平溪煤矿',
        area: '朝天区',
        feedbackStatus: '已反馈',
        needEvacuation: false,
        undergroundCount: 22,
        unevacuatedCount: 0,
        lastReportTime: '08:16',
        status: '持续监测',
        phone: '0839-8622002',
      },
      {
        id: 'm3',
        name: '羊木煤矿',
        area: '朝天区',
        feedbackStatus: '未反馈',
        needEvacuation: true,
        undergroundCount: 15,
        unevacuatedCount: 15,
        lastReportTime: '----',
        status: '待反馈',
        phone: '0839-8622003',
      },
      {
        id: 'm4',
        name: '柏杨煤矿',
        area: '朝天区',
        feedbackStatus: '已反馈',
        needEvacuation: false,
        undergroundCount: 10,
        unevacuatedCount: 0,
        lastReportTime: '08:05',
        status: '持续监测',
        phone: '0839-8622004',
      },
    ],
    evacuationDetail: {
      totalUnderground: 36,
      evacuated: 30,
      unevacuated: 6,
      completionRate: '83.3%',
      phone: '0839-8622001',
      lastReport: '2025-07-08 08:18',
      stages: [
        { name: '预警', completed: true, time: '08:10' },
        { name: '下达撤离', completed: true, time: '08:12' },
        { name: '井下广播', completed: true, time: '08:13' },
        { name: '人员升井', completed: true, time: '08:16' },
        { name: '清点核验', completed: false },
      ],
    },
  },
};

export const shuanHiddenDangerData = {
  route: 'shuan-home-command-v3-hidden-danger-management',
  title: '隐患排查治理',
  subtitle: '首页 / 日常监管 / 隐患排查治理',
  timestamp: '2025-05-24 10:30:45',
  weather: '多云 22~28℃',
  kpis: [
    { label: '隐患总数', value: '1,458', unit: '项', deltaText: '较昨日', deltaValue: '62', deltaDirection: 'up', tone: 'blue' as DrilldownTone },
    { label: '重大隐患', value: '71', unit: '项', deltaText: '较昨日', deltaValue: '8', deltaDirection: 'up', tone: 'red' as DrilldownTone },
    { label: '待整改', value: '612', unit: '项', deltaText: '较昨日', deltaValue: '41', deltaDirection: 'up', tone: 'amber' as DrilldownTone },
    { label: '待复查', value: '286', unit: '项', deltaText: '较昨日', deltaValue: '12', deltaDirection: 'down', tone: 'amber' as DrilldownTone },
    { label: '已逾期', value: '142', unit: '项', deltaText: '较昨日', deltaValue: '15', deltaDirection: 'up', tone: 'blue' as DrilldownTone },
    { label: '闭环率', value: '87.6', unit: '%', deltaText: '较昨日', deltaValue: '1.8%', deltaDirection: 'up', tone: 'blue' as DrilldownTone },
  ],
  gradeDistribution: [
    { label: '重大隐患', value: 71, percent: '4.9%', tone: 'red' as DrilldownTone },
    { label: '较大隐患', value: 198, percent: '13.6%', tone: 'amber' as DrilldownTone },
    { label: '一般隐患', value: 518, percent: '35.6%', tone: 'yellow' as DrilldownTone },
    { label: '低级隐患', value: 671, percent: '46.0%', tone: 'blue' as DrilldownTone },
  ],
  typeDistribution: [
    { label: '瓦斯', value: 392, tone: 'red' as DrilldownTone },
    { label: '顶板', value: 286, tone: 'amber' as DrilldownTone },
    { label: '机电', value: 248, tone: 'amber' as DrilldownTone },
    { label: '运输', value: 198, tone: 'yellow' as DrilldownTone },
    { label: '通风', value: 186, tone: 'blue' as DrilldownTone },
    { label: '水害', value: 148, tone: 'blue' as DrilldownTone },
  ],
  sourceDistribution: [
    { label: '企业自查', value: 612, percent: '42.0%', tone: 'red' as DrilldownTone },
    { label: '监管检查', value: 356, percent: '24.4%', tone: 'amber' as DrilldownTone },
    { label: '设备巡查', value: 214, percent: '14.7%', tone: 'green' as DrilldownTone },
    { label: '设备报警', value: 168, percent: '11.5%', tone: 'cyan' as DrilldownTone },
    { label: '员工上报', value: 108, percent: '7.4%', tone: 'blue' as DrilldownTone },
  ],
  mapFilters: {
    scope: '全省统计',
    searchPlaceholder: '搜索煤矿名称',
    statuses: ['重大隐患', '逾期隐患', '待整改', '已销号'],
  },
  mapLegend: [
    { label: '重大隐患（≥10项）', tone: 'red' as DrilldownTone },
    { label: '逾期隐患（≥5项）', tone: 'amber' as DrilldownTone },
    { label: '待整改隐患（1-4项）', tone: 'yellow' as DrilldownTone },
    { label: '已销号隐患', tone: 'green' as DrilldownTone },
  ],
  mapPoints: [
    { name: '阿坝州', x: 37, y: 31, tone: 'blue' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '绵阳市', x: 57, y: 21, tone: 'amber' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '广元市', x: 71, y: 16, tone: 'amber' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '德阳市', x: 55, y: 38, tone: 'amber' as DrilldownTone, value: 11, size: 'sm' as const },
    { name: '成都市', x: 50, y: 49, tone: 'amber' as DrilldownTone, value: 12, size: 'lg' as const },
    { name: '雅安市', x: 43, y: 56, tone: 'red' as DrilldownTone, value: 11, size: 'lg' as const },
    { name: '眉山市', x: 51, y: 61, tone: 'yellow' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '乐山市', x: 49, y: 70, tone: 'green' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '宜宾市', x: 69, y: 73, tone: 'red' as DrilldownTone, value: 10, size: 'lg' as const },
    { name: '泸州市', x: 73, y: 60, tone: 'amber' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '巴中市', x: 83, y: 34, tone: 'amber' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '达州市', x: 75, y: 47, tone: 'red' as DrilldownTone, value: 27, size: 'lg' as const },
    { name: '内江市', x: 62, y: 67, tone: 'amber' as DrilldownTone, value: 8, size: 'sm' as const },
    { name: '攀枝花市', x: 40, y: 86, tone: 'green' as DrilldownTone, value: 8, size: 'sm' as const },
  ],
  disposalCards: [
    { title: '重大隐患挂牌', value: '71', unit: '项', tone: 'red' as DrilldownTone, icon: 'shield', stats: [['本月新增', '18'], ['挂牌中', '32']] },
    { title: '整改进度跟踪', value: '612', unit: '项', tone: 'amber' as DrilldownTone, icon: 'box', stats: [['已完成', '326'], ['整改中', '286']] },
    { title: '复查退回提醒', value: '68', unit: '项', tone: 'yellow' as DrilldownTone, icon: 'clipboard', stats: [['今日退回', '8'], ['待复查', '286']] },
    { title: '逾期整改督办', value: '142', unit: '项', tone: 'blue' as DrilldownTone, icon: 'clock', stats: [['逾期1-7天', '62'], ['逾期>7天', '80']] },
  ],
  top5Mines: [
    { rank: 1, name: '某某煤矿（绵阳市）', level: '重大隐患', value: 18, tone: 'red' as DrilldownTone },
    { rank: 2, name: '某某煤矿（达州市）', level: '重大隐患', value: 16, tone: 'red' as DrilldownTone },
    { rank: 3, name: '某某煤矿（广元市）', level: '较大隐患', value: 12, tone: 'amber' as DrilldownTone },
    { rank: 4, name: '某某煤矿（宜宾市）', level: '较大隐患', value: 9, tone: 'amber' as DrilldownTone },
    { rank: 5, name: '某某煤矿（泸州市）', level: '一般隐患', value: 8, tone: 'yellow' as DrilldownTone },
  ],
  trendDays: ['04-24', '04-28', '05-02', '05-06', '05-10', '05-14', '05-18', '05-22', '05-24'],
  newTrendSeries: [
    { label: '重大隐患', color: '#ff545d', values: [72, 83, 88, 92, 86, 91, 95, 105, 98] },
    { label: '较大隐患', color: '#ff9d27', values: [42, 48, 51, 54, 56, 59, 61, 67, 63] },
    { label: '一般隐患', color: '#ffd34a', values: [24, 28, 31, 32, 35, 34, 36, 41, 39] },
    { label: '低级隐患', color: '#44a6ff', values: [8, 10, 12, 11, 13, 14, 15, 18, 17] },
  ],
  closureTrend: {
    line: { label: '闭环率', color: '#4da2ff', values: [66, 72, 54, 61, 70, 76, 81, 78, 88] },
    bars: { label: '环比提升', color: '#61d989', values: [18, -26, 24, 32, -18, 21, 19, -20, 25] },
  },
  overdueTrendSeries: [
    { label: '逾期1-7天', color: '#ff9d27', values: [162, 188, 203, 218, 209, 226, 239, 252, 286] },
    { label: '逾期>7天', color: '#ff545d', values: [62, 76, 91, 84, 92, 105, 112, 126, 142] },
  ],
};

export interface ShuanRectificationReviewData {
  route: string;
  title: string;
  subtitle: string;
  description: string;
  updatedAt: string;
  timeRange: string;
  summary: string;
  filters: {
    statuses: string[];
    actions: string[];
  };
  kpis: Array<{ label: string; value: string; unit: string; hint: string; tone: DrilldownTone }>;
  escalationCards: Array<{ label: string; value: string; hint: string }>;
  compare: {
    before: { title: string; summary: string; points: string[] };
    after: { title: string; summary: string; points: string[] };
  };
  ledgerRows: Array<{
    mine: string;
    source: string;
    campaign: string;
    deadline: string;
    status: string;
    statusTone: 'pending' | 'review' | 'returned' | 'done' | 'overdue';
    owner: string;
  }>;
  conclusions: Array<{ mine: string; conclusion: string; reviewer: string }>;
  rejectReasons: Array<{ label: string; count: number; share: string; detail: string }>;
  upgradeRules: Array<{ title: string; detail: string; action: string }>;
  attachments: Array<{ name: string; meta: string; status: string }>;
  actionTips: Array<{ title: string; detail: string; icon: 'check' | 'clock' | 'upgrade' }>;
  flow: Array<{ label: string; owner: string; active?: boolean }>;
}

export const shuanRectificationReviewData: ShuanRectificationReviewData = {
  route: 'shuan-home-command-v3-illegal-disposal-rectification-review',
  title: '整改复核 / 县级协同处置',
  subtitle: '打非治违 / 分级协同处置',
  description: '围绕整改闭环与县级复核，统一查看整改进度、退回原因、复核结论与升级流转判断。',
  updatedAt: '数据更新时间：2026-07-08 18:40',
  timeRange: '本周',
  summary: '本页重点盯整改是否到位、县级复核是否通过、退回原因是否集中、逾期事项是否需要升级流转。',
  filters: {
    statuses: ['全部', '待整改', '待复核', '复核退回', '已销号', '逾期事项'],
    actions: ['县级视角', '仅看重点矿井'],
  },
  kpis: [
    { label: '待整改', value: '26', unit: '项', hint: '矿上整改未完成', tone: 'cyan' },
    { label: '待复核', value: '15', unit: '项', hint: '已提请县级复核', tone: 'amber' },
    { label: '复核退回', value: '7', unit: '项', hint: '需补材料或重整改', tone: 'red' },
    { label: '已销号', value: '18', unit: '项', hint: '闭环归档完成', tone: 'green' },
    { label: '逾期事项', value: '5', unit: '项', hint: '建议升级流转', tone: 'blue' },
  ],
  escalationCards: [
    { label: '县级退回集中矿井', value: '4 座', hint: '重复退回超过 2 次' },
    { label: '需市级研判事项', value: '3 项', hint: '涉及重大隐患或跨专项' },
    { label: '附件缺失事项', value: '6 项', hint: '现场图片、复测单据待补齐' },
  ],
  compare: {
    before: {
      title: '31203 回风巷瓦斯异常未处置',
      summary: '整改前现场仍存在超限波动、台账补录不一致、责任分工不清。',
      points: ['瓦斯浓度峰值 1.42%', '临时风障未闭合', '整改照片缺少时间戳'],
    },
    after: {
      title: '整改措施完成并提交复核',
      summary: '整改后已补充密闭处理、复测记录和班组签认，等待县级复核销号。',
      points: ['瓦斯浓度回落至 0.71%', '复测记录已上传', '责任班组与矿领导完成签认'],
    },
  },
  ledgerRows: [
    { mine: '达州星河煤矿', source: '算法线索回流', campaign: '隐蔽工作面专项整治', deadline: '07-09 18:00', status: '待复核', statusTone: 'review', owner: '渠县应急局 李强' },
    { mine: '宜宾安平煤矿', source: '驻矿检查发现', campaign: '监控系统造假专项整治', deadline: '07-10 12:00', status: '整改中', statusTone: 'pending', owner: '矿方整改专员 周敏' },
    { mine: '泸州宏达煤矿', source: '企业自查上报', campaign: '隐瞒入井人数专项整治', deadline: '07-08 17:00', status: '复核退回', statusTone: 'returned', owner: '古蔺县监管组 黄杰' },
    { mine: '乐山嘉阳煤矿', source: '视频巡查复核', campaign: '隐蔽工作面专项整治', deadline: '07-07 18:00', status: '已逾期', statusTone: 'overdue', owner: '犍为县应急局 罗丹' },
    { mine: '广元广旺煤矿', source: '市级督办转办', campaign: '监控系统造假专项整治', deadline: '07-11 10:00', status: '已销号', statusTone: 'done', owner: '旺苍县监管组 赵川' },
  ],
  conclusions: [
    { mine: '达州星河煤矿', conclusion: '材料齐全，待现场复核', reviewer: '渠县应急局 / 07-08 16:20' },
    { mine: '泸州宏达煤矿', conclusion: '退回补正，需补现场定位照片', reviewer: '古蔺县监管组 / 07-08 14:05' },
    { mine: '乐山嘉阳煤矿', conclusion: '逾期未完成，建议升级市级协同', reviewer: '犍为县应急局 / 07-08 11:40' },
  ],
  rejectReasons: [
    { label: '附件缺少前后对比证据', count: 4, share: '57%', detail: '缺少整改前后同点位照片或复测截图' },
    { label: '整改措施与问题不匹配', count: 3, share: '43%', detail: '只补台账，未证明现场措施落地' },
    { label: '责任签认不完整', count: 2, share: '29%', detail: '缺少矿长、带班负责人或县级复核人签认' },
    { label: '超过整改期限仍未提请复核', count: 2, share: '29%', detail: '节点超时，未说明延期原因' },
  ],
  upgradeRules: [
    { title: '连续两次复核退回', detail: '同一问题两次退回仍无有效整改证据', action: '转市级研判' },
    { title: '逾期且涉及重大隐患', detail: '整改超期并伴随高风险状态未解除', action: '提省级督办建议' },
    { title: '跨专项反复出现同类问题', detail: '同矿井在多个专项内重复出现闭环失效', action: '纳入重点矿井清单' },
  ],
  attachments: [
    { name: '整改前后对比照片（31203 回风巷）', meta: '图片 / 达州星河煤矿 / 07-08 上传', status: '已提交' },
    { name: '县级复核意见单', meta: 'PDF / 古蔺县监管组 / 07-08 退回', status: '待补正' },
    { name: '现场复测记录与签认表', meta: '表单 / 乐山嘉阳煤矿 / 07-07 上传', status: '复核中' },
  ],
  actionTips: [
    { title: '优先复核待销号事项', detail: '当天已具备资料的 6 项事项优先完成县级复核。', icon: 'check' },
    { title: '补盯逾期与退回事项', detail: '对 5 项逾期事项明确补证时限与责任到人。', icon: 'clock' },
    { title: '必要时升级流转', detail: '对重复退回和重大隐患事项同步发起上级协同。', icon: 'upgrade' },
  ],
  flow: [
    { label: '问题下发', owner: '省市县监管' },
    { label: '企业整改', owner: '煤矿责任单位' },
    { label: '提交复核', owner: '矿方整改专员' },
    { label: '县级复核', owner: '县级监管组', active: true },
    { label: '销号归档', owner: '平台闭环台账' },
  ],
};

export const shuanCountyInspectionData = {
  route: 'shuan-home-command-v3-illegal-disposal-county-inspection',
  title: '现场核查 / 县级走访',
};

export const shuanProvinceSupervisionData = {
  route: 'shuan-home-command-v3-illegal-disposal-province-supervision',
  title: '挂牌督办 / 省级督办',
  subtitle: '蜀安首页 Av3 / 打非治违 / 分级协同处置第 4 页',
  scope: '省级挂牌督办 / 挂牌督办合并视角',
  updatedAt: '2026-07-08 18:40',
  filters: ['近30天', '全部区域', '待销号', '超期未办'],
  kpis: [
    { label: '挂牌总数', value: '18', hint: '当前纳入重大事项督办台账', tone: 'blue' as DrilldownTone },
    { label: '超期未办', value: '3', hint: '超过督办时限仍未完成整改', tone: 'red' as DrilldownTone },
    { label: '催办次数', value: '27', hint: '本轮已发起短信、电话和通报催办', tone: 'amber' as DrilldownTone },
    { label: '待销号', value: '6', hint: '已提交销号申请待省级复核', tone: 'cyan' as DrilldownTone },
    { label: '已销号', value: '12', hint: '完成复核并归档闭环', tone: 'green' as DrilldownTone },
  ],
  tableRows: [
    { id: 'DB-2026-041', mine: '达星XX煤矿', reason: '停产期间疑似生产且两次复核不一致', owner: '达州市应急管理局 / 企业主要负责人', deadline: '07-12 18:00', node: '整改反馈待复核', status: '待销号', tone: 'cyan' as DrilldownTone },
    { id: 'DB-2026-037', mine: '宜宾XX煤矿', reason: '监控造假问题复发，关键传感器数据缺失', owner: '宜宾市应急管理局 / 矿长', deadline: '07-10 18:00', node: '省级复核退回', status: '再整改', tone: 'amber' as DrilldownTone },
    { id: 'DB-2026-033', mine: '泸州XX煤矿', reason: '隐蔽入井人数且逾期未完成责任倒查', owner: '泸州市应急管理局 / 县级包保组', deadline: '07-08 12:00', node: '超期催办', status: '超期未办', tone: 'red' as DrilldownTone },
    { id: 'DB-2026-029', mine: '乐山XX煤矿', reason: '夜间异常活动连续命中，未按期提交整改闭环材料', owner: '乐山市应急管理局 / 企业分管副矿长', deadline: '07-15 18:00', node: '整改中', status: '正常推进', tone: 'blue' as DrilldownTone },
    { id: 'DB-2026-024', mine: '广元XX煤矿', reason: '同一区域多类异常叠加，需省市县联合复核', owner: '广元市应急管理局 / 县级核查组', deadline: '07-09 18:00', node: '已签收待反馈', status: '临期催办', tone: 'amber' as DrilldownTone },
    { id: 'DB-2026-018', mine: '古叙XX煤矿', reason: '挂牌问题整改完成，待省级销号确认', owner: '泸州市应急管理局 / 企业主要负责人', deadline: '07-11 12:00', node: '销号申请已提交', status: '待销号', tone: 'cyan' as DrilldownTone },
  ],
  timeline: [
    { label: '督办下发', time: '07-02 09:00', detail: '省厅下发挂牌督办清单并明确责任链。', active: true },
    { label: '责任签收', time: '07-02 11:30', detail: '属地监管与煤矿企业完成双签收确认。', active: true },
    { label: '整改反馈', time: '07-06 18:20', detail: '企业提交整改台账、照片、制度修订和责任追究材料。', active: true },
    { label: '省级复核', time: '07-08 10:40', detail: '省级督办组抽查现场和材料一致性，形成审核意见。', active: true },
    { label: '销号归档', time: '待确认', detail: '满足问题销号条件后生成销号结论并归档。', active: false },
  ],
  reminders: [
    { time: '07-08 09:10', channel: '电话催办', target: '泸州市应急管理局' },
    { time: '07-07 17:40', channel: '短信催办', target: '达星XX煤矿主要负责人' },
    { time: '07-06 15:20', channel: '发函通报', target: '宜宾市应急管理局' },
  ],
  notice: {
    status: '已通报未销号',
    summary: '对 3 项超期未办事项已形成省级督办通报，要求 48 小时内补齐整改证据并反馈责任追究结果。',
    tone: 'red' as DrilldownTone,
  },
  directive: '领导批示：责任必须压实到属地监管、企业主要负责人和具体整改责任人，逾期事项逐项说明原因，未经验证不得销号。',
  closure: {
    status: '暂不可销号',
    summary: '当前仍缺现场复核一致性证明和责任追究闭环材料，销号申请需退回补正后再提交。',
    tone: 'red' as DrilldownTone,
    conditions: [
      '现场复核结论与企业整改反馈一致。',
      '责任追究、制度修订和隐患复发防控材料齐全。',
      '催办记录、通报状态和领导批示已逐项落实。',
    ],
  },
  audit: {
    application: {
      item: 'DB-2026-041 达星XX煤矿挂牌督办事项',
      owner: '达州市应急管理局',
      submittedAt: '2026-07-08 09:35',
      materials: '整改报告、现场照片 12 张、责任追究说明、复核申请单',
    },
    decision: {
      status: '退回补正',
      tone: 'amber' as DrilldownTone,
      summary: '材料能证明主要问题已整改，但销号闭环证据仍不充分，暂不通过本轮销号审核。',
      points: [
        '缺少现场复核影像与关键传感器原始数据比对。',
        '责任追究仅说明会议要求，未附到人到岗的处理结果。',
        '再整改期限内需同步补齐防复发措施落实证明。',
      ],
    },
    rectify: {
      reason: '销号证据链不闭合，省级复核意见与企业反馈存在两处不一致。',
      deadline: '2026-07-11 18:00',
      actions: [
        '补传现场复核视频、原始数据截图和签字版复核记录。',
        '完善责任追究材料，明确责任人、处理方式和完成时间。',
        '围绕同类问题制定再整改要求，并在下一轮反馈中逐项对应。',
      ],
    },
  },
};

export const shuanIllegalDisposalRows = [
  { title: '煤矿整改', owner: '县级复核', todo: '26', closed: '18', tone: 'cyan', page: shuanRectificationReviewData.route },
  { title: '县级走访', owner: '现场核查', todo: '15', closed: '11', tone: 'green', page: shuanCountyInspectionData.route },
  { title: '市级研判', owner: '专项研判', todo: '10', closed: '7', tone: 'orange', page: 'shuan-home-command-v3-illegal-disposal-city-analysis' },
  { title: '省挂牌督办', owner: '挂牌督办', todo: '6', closed: '4', tone: 'red', page: shuanProvinceSupervisionData.route },
] as const;

export const shuanDrilldownRoutePages = [
  { id: 'shuan-home-command-v3-wireframes', title: '下钻页面框架总览' },
  ...shuanDrilldownPages.map((page) => ({ id: page.id, title: page.title })),
  { id: shuanRiskControlData.route, title: shuanRiskControlData.title },
  { id: shuanDangerousWorkReportData.route, title: shuanDangerousWorkReportData.title },
  { id: shuanLicenseExpiryReminderData.route, title: shuanLicenseExpiryReminderData.title },
  { id: shuanMajorHazardReminderData.route, title: shuanMajorHazardReminderData.title },
  { id: shuanHiddenDangerData.route, title: shuanHiddenDangerData.title },
  { id: shuanRectificationReviewData.route, title: shuanRectificationReviewData.title },
  { id: shuanCountyInspectionData.route, title: shuanCountyInspectionData.title },
  { id: 'shuan-home-command-v3-illegal-disposal-city-analysis', title: '专项研判 / 市级研判' },
  { id: shuanProvinceSupervisionData.route, title: shuanProvinceSupervisionData.title },
  { id: shuanHiddenFaceMineProfileData.route, title: shuanHiddenFaceMineProfileData.title },
  ...shuanIllegalCampaignModules.map((item) => ({ id: item.route, title: item.title })),
];
