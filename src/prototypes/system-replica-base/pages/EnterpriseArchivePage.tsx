import React from 'react';
import { PageScaffold, Toolbar } from '../components/AppShell';
import { DataTable, Field, Pagination, QueryPanel, RowActions, UploadButton } from '../components/Primitives';

interface EnterpriseRow { id: number; region: string; name: string; group: string; industry: string; ownership: string; gas: string; status: string; design: string; approved: string; level: string; }

const rows: EnterpriseRow[] = [
  { id: 1, region: '金沙县', name: '禹谟镇大沟煤矿', group: '', industry: '煤矿', ownership: '其他有限责任(公司)', gas: '低瓦斯矿井', status: '正常生产', design: '32', approved: '', level: '一级' },
  { id: 2, region: '金沙县', name: '高坪镇鑫达煤矿', group: '', industry: '煤矿', ownership: '私有独资', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 3, region: '金沙县', name: '长盛煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '停产', design: '', approved: '', level: '' },
  { id: 4, region: '金沙县', name: '腾龙煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '停产', design: '', approved: '', level: '' },
  { id: 5, region: '金沙县', name: '贵源煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 6, region: '金沙县', name: '贵源煤矿五号井', group: '', industry: '煤矿', ownership: '', gas: '', status: '停产', design: '', approved: '', level: '' },
  { id: 7, region: '金沙县', name: '安能煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 8, region: '金沙县', name: '熊家湾煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 9, region: '金沙县', name: '回归煤矿', group: '', industry: '煤矿', ownership: '股份有限(公司)', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 10, region: '金沙县', name: '田湾煤矿', group: '', industry: '煤矿', ownership: '私营有限责任(公司)', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 11, region: '金沙县', name: '重源煤矿', group: '', industry: '煤矿', ownership: '', gas: '', status: '正常生产', design: '', approved: '', level: '' },
  { id: 12, region: '金沙县', name: '金泰煤矿', group: '', industry: '煤矿', ownership: '私营有限责任(公司)', gas: '', status: '正常生产', design: '', approved: '', level: '' },
];

const columns = [
  { key: 'id', title: '序号', width: 50 },
  { key: 'region', title: '行政区划', width: 140 },
  { key: 'name', title: '企业名称', width: 230 },
  { key: 'group', title: '所属集团公司', width: 230 },
  { key: 'industry', title: '行业', width: 130 },
  { key: 'ownership', title: '所有制', width: 150 },
  { key: 'gas', title: '瓦斯等级', width: 150 },
  { key: 'status', title: '生产状态', width: 150 },
  { key: 'design', title: <>设计生产能力<br/>(万吨/年)</>, width: 100 },
  { key: 'approved', title: <>核定生产能力<br/>(万吨/年)</>, width: 100 },
  { key: 'level', title: '标准化级别', width: 100 },
  { key: 'operate', title: '操作', width: 98, render: () => <RowActions /> },
];

export function EnterpriseArchivePage() {
  return <PageScaffold title="企业档案查询">
    <QueryPanel>
      <Field label="集团公司" placeholder="请选择集团公司" type="select" />
      <Field label="企业名称" placeholder="请输入企业名称" />
      <Field label="所有制" placeholder="请选择所有制" type="tree" />
      <Field label="生产状态" placeholder="请选择生产状态" type="tree" />
    </QueryPanel>
    <Toolbar><UploadButton /><Pagination /></Toolbar>
    <DataTable<EnterpriseRow> columns={columns} rows={rows} />
  </PageScaffold>;
}
