import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronUp, Download, Edit2, Eye, FileText, Folder, Info, Plus, RefreshCw, RotateCcw, Search, Settings, Settings2, Trash2, Upload, Users, X } from 'lucide-react';
import { PageScaffold } from '../components/AppShell';
import { Column, DataTable, Field, Pagination } from '../components/Primitives';

type Row = Record<string, unknown>;

function SystemToolbar({ total = 20, addText = '新增', exportButton = false }: { total?: number; addText?: string; exportButton?: boolean }) {
  return <div className="system-toolbar">
    <button className="icon-button" type="button"><RefreshCw size={17} /></button>
    <button className="system-tool-text" type="button"><Plus size={15} />{addText}</button>
    {exportButton && <button className="system-tool-text" type="button"><Upload size={15} />导出</button>}
    <Pagination total={total} />
  </div>;
}

function SystemQuery({ children }: { children: React.ReactNode }) {
  return <section className="system-query-panel">
    {children}
    <div className="system-query-actions">
      <button className="primary-button" type="button"><Search size={15}/>查询</button>
      <button className="light-button" type="button"><RotateCcw size={15}/>重置</button>
    </div>
  </section>;
}

function ActionText({ text = '修改  删除' }: { text?: string }) {
  return <span className="system-actions">{text}</span>;
}

function OrgTree({ showSortSwitch = true }: { showSortSwitch?: boolean }) {
  const roots = [
    { name: '达州市应急管理局', children: ['煤矿安全监管科', '值班调度中心', '执法监察支队'] },
    { name: '大竹县应急管理局', children: ['煤矿安全股', '驻矿监管组'] },
    { name: '宣汉县应急管理局', children: ['监管执法大队'] },
    { name: '渠县应急管理局', children: ['煤矿监管股'] },
    { name: '万源市应急管理局', children: ['值班室'] },
  ];
  return <aside className="system-tree-panel" data-annotation-id="system-organization-tree">
    <div className="tree-search"><button type="button"><ChevronRight size={15}/></button><input placeholder="请输入机构名称"/></div>
    <div className="tree-list">
      {roots.map((root, index) => <div className="other-unit-root" key={root.name}>
        <div className={`tree-item folder ${index === 0 ? 'active' : ''}`}><ChevronRight className="tree-expander" size={13}/><Folder className="tree-node-icon folder-icon" size={15}/><span className="tree-item-name">{root.name}</span>{index === 0 && showSortSwitch && <label className="tree-sort-toggle"><input type="checkbox" />是否排序</label>}</div>
        {root.children.map((child) => <div className="tree-item child" key={child}><ChevronRight className="tree-expander" size={13}/><FileText className="tree-node-icon file-icon" size={14}/>{child}</div>)}
      </div>)}
    </div>
  </aside>;
}

const orgRows: Row[] = [
  { id: 1, name: '市人民政府', shortName: '市人民政府', phone: '' },
  { id: 2, name: '数据局', shortName: '数据局', phone: '' },
  { id: 3, name: '市应急局', shortName: '市应急局', phone: '' },
  { id: 4, name: '市公安局', shortName: '市公安局', phone: '' },
  { id: 5, name: '通川区', shortName: '通川区', phone: '' },
  { id: 6, name: '万源市', shortName: '万源市', phone: '' },
  { id: 7, name: '宣汉县', shortName: '宣汉县', phone: '' },
  { id: 8, name: '大竹县', shortName: '大竹县', phone: '' },
  { id: 9, name: '达川区', shortName: '达川区', phone: '' },
  { id: 10, name: '开江县', shortName: '开江县', phone: '' },
  { id: 11, name: '渠县', shortName: '渠县', phone: '' },
  { id: 12, name: '川煤华荣能源达竹中心', shortName: '川煤华荣能源达竹中心', phone: '' },
  { id: 13, name: '平台运维服务中心', shortName: '平台运维服务中心', phone: '' },
];

const orgColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 80 },
  { key: 'name', title: '名称', width: 260, align: 'left' },
  { key: 'shortName', title: '简称', width: 220, align: 'left' },
  { key: 'phone', title: '部门电话', width: 220, align: 'left' },
  { key: 'op', title: '操作', width: 120, render: () => <span style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}><Edit2 size={16}/><Trash2 size={16}/></span> },
];

export function SystemOrganizationPage() {
  return <PageScaffold title="组织机构" subtitle="(拖动部门调整排序，只能在同级之间调整部门顺序)" subtitleStyle={{ color: '#f5222d', fontSize: '14px' }}>
    <div className="system-split">
      <OrgTree />
      <main className="system-split-main" data-annotation-id="system-organization-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', background: '#d0d7e6' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '0 8px' }}>
            <button className="icon-button" type="button"><RefreshCw size={17} /></button>
            <button className="icon-button" type="button"><Plus size={15} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>共 13 条</span>
            <select style={{ padding: '4px 8px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px' }}>
              <option>20条/页</option>
            </select>
          </div>
        </div>
        <DataTable<Row> columns={orgColumns} rows={orgRows} />
      </main>
    </div>
  </PageScaffold>;
}

const userRows: Row[] = [
  { id: 1, account: 'admin', name: '管理员', dept: '达州市应急管理局', role: '超级管理员', phone: '18085885520', login: '2026-06-13 09:12:24', status: '正常' },
  { id: 2, account: 'dazhu_jg', name: '大竹监管员', dept: '大竹县应急管理局', role: '县级监管人员', phone: '13982880002', login: '2026-06-13 08:44:11', status: '正常' },
  { id: 3, account: 'duty_center', name: '值班调度', dept: '值班调度中心', role: '值班人员', phone: '13882880001', login: '2026-06-12 22:18:04', status: '正常' },
];

const personnelRows: Row[] = [
  { id: 1, name: '市公安局', account: 'SGAJ', phone: '13301233211', dept: '市公安局', position: '监控员', role: '市公安局', dataPermission: '监管', smsRule: '' },
  { id: 2, name: '韦佳豪', account: '19308097832', phone: '19308097832', dept: '运维', position: '一般工作人员', role: '市应急局', dataPermission: '监管', smsRule: '' },
  { id: 3, name: '李金洹', account: '', phone: '19396625388', dept: '达川区应急管理局', position: '局长', role: '', dataPermission: '', smsRule: '' },
  { id: 4, name: '达州市政府', account: 'DZSZF', phone: '13201233210', dept: '市人民政府', position: '监控员', role: '市领导', dataPermission: '监管', smsRule: '' },
  { id: 5, name: '谢燊矣', account: '13708103426', phone: '13708103426', dept: '平台运维服务中心', position: '其他职务 - 达州移动副总经理', role: '市应急局', dataPermission: '监管', smsRule: '' },
  { id: 6, name: '蒋松林', account: 'scyjt', phone: '13981782381', dept: '应急厅', position: '领导', role: '市应急局', dataPermission: '监管', smsRule: '' },
  { id: 7, name: '陈勇', account: '18286112650', phone: '18286112650', dept: '平台运维服务中心', position: '其他职务 - 开发人员', role: '市应急局', dataPermission: '监管', smsRule: '' },
  { id: 8, name: '李云飞', account: '15182889611', phone: '15182889611', dept: '中际集团', position: '监控员', role: '工作人员', dataPermission: '中际集团', smsRule: '' },
  { id: 9, name: '于贵', account: '13982848177', phone: '13982848177', dept: '数据局', position: '局长', role: '市领导', dataPermission: '监管', smsRule: '' },
  { id: 10, name: '王建锋', account: '', phone: '18784877588', dept: '县应急局', position: '局长', role: '', dataPermission: '', smsRule: '' },
  { id: 11, name: '市领导', account: '市领导', phone: '13312345679', dept: '达州市监管', position: '领导', role: '市领导', dataPermission: '监管', smsRule: '' },
];

// 系统人员详情弹窗
function PersonnelDetailModal({ person, onClose }: { person: Row; onClose: () => void }) {
  return <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '90%', maxWidth: '1200px', background: '#f5f7fa', borderRadius: '4px', maxHeight: '90vh', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>查看</h3>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={18}/></button>
      </div>
      <div style={{ padding: '16px' }}>
        {/* 基本信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>📋</span>
            <span>基本信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>姓名</div>
                <div style={{ padding: '12px' }}>{person.name}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>性别</div>
                <div style={{ padding: '12px' }}>男</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>所属部门</div>
                <div style={{ padding: '12px' }}>{person.dept}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>入职日期</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>身份证号</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>出生日期</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>联系电话</div>
                <div style={{ padding: '12px' }}>{person.phone}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>数据权限</div>
                <div style={{ padding: '12px' }}>{person.dataPermission}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>职务</div>
                <div style={{ padding: '12px' }}>{person.position}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>职务简称</div>
                <div style={{ padding: '12px' }}>{person.position}</div>
              </div>
            </div>
          </div>
        </div>
        {/* 工作简历 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>📋</span>
            <span>工作简历</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px', minHeight: '60px' }}></div>
        </div>
        {/* 账号信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>📋</span>
            <span>账号信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>是否为系统用户</div>
                <div style={{ padding: '12px' }}>是</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>账号</div>
                <div style={{ padding: '12px' }}>{person.account}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>授权角色</div>
                <div style={{ padding: '12px' }}>{person.role}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px' }}></div>
                <div style={{ padding: '12px' }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 短信信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>📋</span>
            <span>短信信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>是否接收短信</div>
                <div style={{ padding: '12px' }}>否</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px' }}></div>
                <div style={{ padding: '12px' }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 接收企业 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>📋</span>
            <span>接收企业</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
            暂无数据
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// 部门调动弹窗
function PersonnelTransferModal({ person, onClose }: { person: Row; onClose: () => void }) {
  const enterprises = [
    { id: 1, district: '通川区', name: '杨家沟煤矿' },
    { id: 2, district: '通川区', name: '新兴煤矿' },
    { id: 3, district: '达川区', name: '易家沟煤矿三号井' },
    { id: 4, district: '达川区', name: '达昌煤矿' },
    { id: 5, district: '达川区', name: '茶园煤矿' },
    { id: 6, district: '达川区', name: '达州市建设煤矿' },
    { id: 7, district: '达川区', name: '保康煤矿' },
  ];

  return <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '90%', maxWidth: '1200px', background: '#f5f7fa', borderRadius: '4px', maxHeight: '90vh', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>部门调动</h3>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={18}/></button>
      </div>
      <div style={{ padding: '16px' }}>
        {/* 基本信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>🖊</span>
            <span>基本信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>姓名</div>
                <div style={{ padding: '12px' }}>{person.name}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>性别</div>
                <div style={{ padding: '12px' }}>男</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}><span style={{ color: 'red' }}>*</span>所属部门</div>
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', border: '1px solid #52c41a', borderRadius: '4px', background: '#f6ffed', width: 'fit-content' }}>
                    <span>{person.dept}</span>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>×</button>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>👥</button>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>入职日期</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>身份证号</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>出生日期</div>
                <div style={{ padding: '12px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>联系电话</div>
                <div style={{ padding: '12px' }}>{person.phone}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>数据权限</div>
                <div style={{ padding: '12px' }}>
                  <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    <option>{person.dataPermission}</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>职务</div>
                <div style={{ padding: '12px' }}>{person.position}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>职务简称</div>
                <div style={{ padding: '12px' }}>{person.position}</div>
              </div>
            </div>
          </div>
        </div>
        {/* 工作简历 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>🖊</span>
            <span>工作简历</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px', minHeight: '60px' }}></div>
        </div>
        {/* 账号信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>🖊</span>
            <span>账号信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>是否为系统用户</div>
                <div style={{ padding: '12px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="isSystemUser" checked style={{ width: '16px', height: '16px' }} /> 是
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="isSystemUser" style={{ width: '16px', height: '16px' }} /> 否
                  </label>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}><span style={{ color: 'red' }}>*</span>账号</div>
                <div style={{ padding: '12px' }}>
                  <input type="text" defaultValue={person.account} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>授权角色</div>
                <div style={{ padding: '12px' }}>
                  <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    <option>{person.role}</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px' }}></div>
                <div style={{ padding: '12px' }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 短信信息 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>🖊</span>
            <span>短信信息</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px', textAlign: 'right', background: '#f0f4fc' }}>是否接收短信</div>
                <div style={{ padding: '12px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="receiveSms" style={{ width: '16px', height: '16px' }} /> 是
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="receiveSms" checked style={{ width: '16px', height: '16px' }} /> 否
                  </label>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: '#fff' }}>
                <div style={{ padding: '12px' }}></div>
                <div style={{ padding: '12px' }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* 接收企业 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d0d7e6', borderRadius: '4px 4px 0 0' }}>
            <span>🖊</span>
            <span>接收企业</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f0f4fc' }}>
                  <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '50px' }}><input type="checkbox" /></th>
                  <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '80px' }}>序号</th>
                  <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>区县</th>
                  <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>企业名称</th>
                </tr>
              </thead>
              <tbody>
                {enterprises.map((item) => <tr key={item.id}>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}><input type="checkbox" /></td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{item.id}</td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{item.district}</td>
                  <td style={{ padding: '12px', border: '1px solid #e8e8e8' }}>{item.name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {/* 底部按钮 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '8px 20px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>确认调动</button>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#333', border: '1px solid #d9d9d9', borderRadius: '4px', cursor: 'pointer' }}>取消</button>
        </div>
      </div>
    </div>
  </div>;
}

// 职务排序弹窗
function PositionSortModal({ onClose }: { onClose: () => void }) {
  const appPositions = ['煤矿联系人', '副局长', '局长', '负责人', '一般工作人员', '领导', '中队队长', '监控员', '煤监军队长'];
  const alarmPositions = ['煤矿联系人', '中队队长', '监控员', '其他职务', '煤监室工作人员', '局长', '负责人', '煤监室队长', '副局长'];

  return <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '90%', maxWidth: '800px', background: '#fff', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>职务排序</h3>
          <Info size={16} style={{ color: '#666', cursor: 'pointer' }} />
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={18}/></button>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* 手机app通讯录 */}
          <div style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}>
            <div style={{ padding: '12px', background: '#e8edf7', textAlign: 'center', fontWeight: 500, borderBottom: '1px solid #e8e8e8' }}>手机app通讯录</div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ padding: '12px', textAlign: 'center', background: '#e8edf7', fontWeight: 500 }}>排序</div>
              <div style={{ padding: '12px', textAlign: 'center', background: '#e8edf7', fontWeight: 500 }}>职务</div>
              {appPositions.map((pos, i) => <>
                <div key={i} style={{ padding: '10px', textAlign: 'center', background: '#fff' }}>{i + 1}</div>
                <div key={`pos-${i}`} style={{ padding: '8px 12px', background: '#fff' }}>
                  <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
                    <option>{pos}</option>
                  </select>
                </div>
              </>)}
            </div>
          </div>
          {/* 报警通讯录 */}
          <div style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}>
            <div style={{ padding: '12px', background: '#e8edf7', textAlign: 'center', fontWeight: 500, borderBottom: '1px solid #e8e8e8' }}>报警通讯录</div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1px', background: '#e8e8e8' }}>
              <div style={{ padding: '12px', textAlign: 'center', background: '#e8edf7', fontWeight: 500 }}>排序</div>
              <div style={{ padding: '12px', textAlign: 'center', background: '#e8edf7', fontWeight: 500 }}>职务</div>
              {alarmPositions.map((pos, i) => <>
                <div key={i} style={{ padding: '10px', textAlign: 'center', background: '#fff' }}>{i + 1}</div>
                <div key={`pos-${i}`} style={{ padding: '8px 12px', background: '#fff' }}>
                  <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #d9d9d9', borderRadius: '4px', background: i === 5 ? '#f6ffed' : '#fff', borderColor: i === 5 ? '#52c41a' : '#d9d9d9' }}>
                    <option>{pos}</option>
                  </select>
                </div>
              </>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#333', border: '1px solid #d9d9d9', borderRadius: '4px', cursor: 'pointer' }}>取消</button>
          <button style={{ padding: '8px 20px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>确定</button>
        </div>
      </div>
    </div>
  </div>;
}

// 人员排序弹窗
function PersonSortModal({ deptName, onClose }: { deptName: string; onClose: () => void }) {
  const persons = [
    { id: 1, name: '煤监科', position: '监控员', sort: 5 },
    { id: 2, name: '刘庆', position: '其他职务', sort: 7 },
    { id: 3, name: '符巍', position: '其他职务', sort: 8 },
    { id: 4, name: '杨林', position: '煤监室工作人员', sort: 9 },
    { id: 5, name: '邬中平', position: '煤监室工作人员', sort: 10 },
    { id: 6, name: '杨治坤', position: '煤监室工作人员', sort: 11 },
  ];

  return <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '90%', maxWidth: '700px', background: '#fff', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8e8e8' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>人员排序({deptName || '请选择部门'})</h3>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={18}/></button>
      </div>
      <div style={{ padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e8edf7' }}>
              <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '80px' }}>序号</th>
              <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>姓名</th>
              <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>职务</th>
              <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '150px' }}>排序</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, i) => <tr key={person.id}>
              <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{i + 1}</td>
              <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.name}</td>
              <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.position}</td>
              <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <input type="text" value={person.sort} style={{ width: '60px', padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px', textAlign: 'center' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button style={{ border: '1px solid #d9d9d9', background: '#fff', padding: '1px 4px', cursor: 'pointer', fontSize: '10px' }}><ChevronUp size={10} /></button>
                    <button style={{ border: '1px solid #d9d9d9', background: '#fff', padding: '1px 4px', cursor: 'pointer', fontSize: '10px' }}><ChevronDown size={10} /></button>
                  </div>
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#333', border: '1px solid #d9d9d9', borderRadius: '4px', cursor: 'pointer' }}>取消</button>
          <button style={{ padding: '8px 20px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>确定</button>
        </div>
      </div>
    </div>
  </div>;
}

// 通讯录隐私设置弹窗
function PrivacySettingsModal({ onClose }: { onClose: () => void }) {
  const persons = [
    { id: 1, name: '王建锋', phone: '18784877588', dept: '县应急局', visible: '部分可见' },
    { id: 2, name: '曹舒', phone: '19881828899', dept: '数据局', visible: '部分可见' },
    { id: 3, name: '李云飞', phone: '15182889611', dept: '中际集团', visible: '部分可见' },
    { id: 4, name: '符巍', phone: '15928482620', dept: '煤监科', visible: '部分可见' },
    { id: 5, name: '刘庆', phone: '18672030470', dept: '市应急局', visible: '部分可见' },
    { id: 6, name: '温冬', phone: '18798704553', dept: '平台运维服务中心', visible: '部分可见' },
    { id: 7, name: '于贵', phone: '13982848177', dept: '数据局', visible: '部分可见' },
    { id: 8, name: '吴成军', phone: '13558526064', dept: '平台运维服务中心', visible: '部分可见' },
    { id: 9, name: '韦雪枫', phone: '18645980702', dept: '平台运维服务中心', visible: '部分可见' },
    { id: 10, name: '申权', phone: '18085885520', dept: '运维', visible: '部分可见' },
    { id: 11, name: '陈勇', phone: '18286112650', dept: '平台运维服务中心', visible: '部分可见' },
  ];

  const treeData = [
    { name: '达州市监管', children: [
      { name: '市人民政府', children: [] },
      { name: '数据局', children: [] },
      { name: '市应急局', children: ['煤监科', '瓦斯监控中心', '达州市应急局'] },
      { name: '市公安局', children: [] },
      { name: '通川区', children: ['县应急局'] },
      { name: '万源市', children: ['县应急局'] },
      { name: '宣汉县', children: ['宣汉县煤矿安全生产服务中心'] },
      { name: '大竹县', children: ['县应急局'] },
      { name: '达川区', children: ['达川区煤矿安全生产服务中心', '达川区应急管理局'] },
      { name: '开江县', children: [] },
    ] },
  ];

  return <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '95%', maxWidth: '1200px', background: '#f5f7fa', borderRadius: '4px', maxHeight: '90vh', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8e8e8', background: '#fff' }}>
        <div>
          <span style={{ fontSize: '16px', fontWeight: 500 }}>通讯录隐私设置</span>
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>(说明：设置后，在手机app-通讯录处，仅可见的人才能看到该人员的手机号)</span>
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={18}/></button>
      </div>
      <div className="system-split">
        <aside className="system-tree-panel" style={{ minWidth: '280px' }}>
          <div className="tree-search"><button type="button"><ChevronRight size={15}/></button><input placeholder="请输入关键字进行过滤"/></div>
          <div className="tree-list">
            {treeData.map((root, index) => <div key={root.name}>
              <div className={`tree-item folder ${index === 0 ? 'active' : ''}`}><ChevronRight className="tree-expander" size={13}/><Folder className="tree-node-icon folder-icon" size={15}/>{root.name}</div>
              {root.children.map((item) => <div key={item.name} style={{ marginLeft: '20px' }}>
                <div className="tree-item child"><ChevronRight className="tree-expander" size={13}/><FileText className="tree-node-icon file-icon" size={14}/>{item.name}</div>
                {item.children.length > 0 && <div style={{ marginLeft: '20px' }}>
                  {item.children.map((child) => <div className="tree-item child" key={child}><ChevronRight className="tree-expander" size={13}/><FileText className="tree-node-icon file-icon" size={14}/>{child}</div>)}
                </div>}
              </div>)}
            </div>)}
          </div>
        </aside>
        <main className="system-split-main">
          <div style={{ padding: '16px', borderBottom: '1px dashed #d9d9d9' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>员工姓名:</span>
                <input type="text" placeholder="请输入员工姓名" style={{ padding: '6px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', width: '180px' }} />
              </div>
              <button type="button" style={{ padding: '6px 16px', background: '#4080ff', color: '#fff', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><Search size={14}/>查询</button>
              <button type="button" style={{ padding: '6px 16px', background: '#fff', color: '#333', border: '1px solid #d9d9d9', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><RotateCcw size={14}/>重置</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="icon-button" type="button"><RefreshCw size={17} /></button>
              <button className="icon-button" type="button"><Settings size={17} /></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: '#666' }}>共 45 条</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button style={{ width: '28px', height: '28px', border: '1px solid #4080ff', background: '#4080ff', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>1</button>
                <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>2</button>
                <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>3</button>
                <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>{'>'}</button>
              </div>
              <select style={{ padding: '4px 8px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px' }}>
                <option>20条/页</option>
              </select>
              <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}><ChevronUp size={14} /></button>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
            <thead>
              <tr style={{ background: '#f0f4fc' }}>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '50px' }}><input type="checkbox" /></th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '80px' }}>序号</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>姓名</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>联系电话</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>所属部门</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8' }}>部分可见</th>
                <th style={{ padding: '12px', border: '1px solid #e8e8e8', width: '100px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person, i) => <tr key={person.id}>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{i + 1}</td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.name}</td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.phone}</td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.dept}</td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>{person.visible}</td>
                <td style={{ padding: '12px', border: '1px solid #e8e8e8', textAlign: 'center' }}>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '8px' }}><Eye size={16}/></button>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Settings size={16}/></button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  </div>;
}

const personnelColumns: Column<Row>[] = [
  { key: 'id', title: '序号', width: 70 },
  { key: 'name', title: '姓名', width: 120 },
  { key: 'account', title: '账号', width: 140 },
  { key: 'phone', title: '联系电话', width: 150 },
  { key: 'dept', title: '所属部门', width: 180 },
  { key: 'position', title: '职务', width: 160 },
  { key: 'role', title: '授权角色', width: 140 },
  { key: 'dataPermission', title: '数据权限', width: 120 },
  { key: 'smsRule', title: '短信接收规则', width: 140 },
  { key: 'op', title: '操作', width: 180, render: (row) => <div style={{ position: 'relative', display: 'flex', gap: '16px', justifyContent: 'center' }}>
    <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }} onClick={() => {
      // 打开详情弹窗 - 这里需要使用状态管理，暂时用alert演示
      const event = new CustomEvent('openPersonnelDetail', { detail: { person: row, type: 'view' } });
      window.dispatchEvent(event);
    }}><Eye size={16}/></button>
    <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }} onClick={() => {
      const event = new CustomEvent('openPersonnelDetail', { detail: { person: row, type: 'transfer' } });
      window.dispatchEvent(event);
    }}><Users size={16}/></button>
    <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}><Edit2 size={16}/></button>
    <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}><Trash2 size={16}/></button>
  </div> },
];

export function SystemPersonnelPage() {
  const [modalState, setModalState] = useState<{ show: boolean; type: 'view' | 'transfer' | 'positionSort' | 'personSort' | 'privacy'; person: Row | null; deptName?: string }>({ show: false, type: 'view', person: null });
  const [showSortTip, setShowSortTip] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenDetail = (e: any) => {
      setModalState({ show: true, type: e.detail.type, person: e.detail.person, deptName: e.detail.deptName });
    };
    window.addEventListener('openPersonnelDetail', handleOpenDetail as any);
    return () => window.removeEventListener('openPersonnelDetail', handleOpenDetail as any);
  }, []);

  const handleCloseModal = () => {
    setModalState({ show: false, type: 'view', person: null });
  };

  const handlePersonSort = () => {
    if (!selectedDept) {
      setShowSortTip(true);
      setTimeout(() => setShowSortTip(false), 3000);
      return;
    }
    setModalState({ show: true, type: 'personSort', person: null, deptName: selectedDept });
  };

  return <PageScaffold title="系统人员">
    {/* 提示信息 */}
    {showSortTip && (
      <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', background: '#fffbe6', border: '1px solid #ffe58f', padding: '8px 16px', borderRadius: '4px', zIndex: 100, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#faad14' }}>⚠</span>
        <span>请先选择要排序的部门</span>
      </div>
    )}
    
    <div className="system-split">
      <OrgTree showSortSwitch={false} />
      <main className="system-split-main" data-annotation-id="system-personnel-list">
        {/* 查询区 */}
        <div style={{ padding: '16px', borderBottom: '1px dashed #d9d9d9' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>姓名:</span>
              <input type="text" placeholder="请输入姓名" style={{ padding: '6px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', width: '180px' }} />
            </div>
            <button type="button" style={{ padding: '6px 16px', background: '#4080ff', color: '#fff', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><Search size={14}/>查询</button>
            <button type="button" style={{ padding: '6px 16px', background: '#fff', color: '#333', border: '1px solid #d9d9d9', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><RotateCcw size={14}/>重置</button>
          </div>
        </div>
        
        {/* 工具栏 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', background: '#d0d7e6' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '0 8px' }}>
            <button className="icon-button" type="button" title="刷新"><RefreshCw size={17} /></button>
            <button className="icon-button" type="button" title="新增"><Plus size={15} /></button>
            <button className="icon-button" type="button" onClick={() => setModalState({ show: true, type: 'positionSort', person: null })} title="职务排序"><Settings size={17} /></button>
            <button className="icon-button" type="button" onClick={handlePersonSort} title="人员排序"><Settings2 size={17} /></button>
            <button className="icon-button" type="button" onClick={() => setModalState({ show: true, type: 'privacy', person: null })} title="通讯录隐私设置"><FileText size={17} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>共 45 条</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', border: '1px solid #4080ff', background: '#4080ff', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>1</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>2</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>3</button>
              <button style={{ width: '28px', height: '28px', border: '1px solid #d9d9d9', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>{'>'}</button>
            </div>
            <select style={{ padding: '4px 8px', border: '1px solid #dcdfe6', borderRadius: '4px', fontSize: '13px' }}>
              <option>20条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
          </div>
        </div>
        
        <DataTable<Row> columns={personnelColumns} rows={personnelRows} />
      </main>
    </div>
    
    {/* 弹窗 */}
    {modalState.show && modalState.type === 'view' && modalState.person && <PersonnelDetailModal person={modalState.person} onClose={handleCloseModal} />}
    {modalState.show && modalState.type === 'transfer' && modalState.person && <PersonnelTransferModal person={modalState.person} onClose={handleCloseModal} />}
    {modalState.show && modalState.type === 'positionSort' && <PositionSortModal onClose={handleCloseModal} />}
    {modalState.show && modalState.type === 'personSort' && <PersonSortModal deptName={modalState.deptName || '煤监科'} onClose={handleCloseModal} />}
    {modalState.show && modalState.type === 'privacy' && <PrivacySettingsModal onClose={handleCloseModal} />}
  </PageScaffold>;
}


export function SystemUserPage() {
  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 70 }, { key: 'account', title: '登录账号', width: 140 }, { key: 'name', title: '用户姓名', width: 120 },
    { key: 'dept', title: '所属机构', width: 220 }, { key: 'role', title: '角色', width: 160 }, { key: 'phone', title: '手机号码', width: 150 },
    { key: 'login', title: '最后登录时间', width: 180 }, { key: 'status', title: '状态', width: 90, render: (r) => <span className="yes-tag">{String(r.status)}</span> },
    { key: 'op', title: '操作', width: 180, render: () => <ActionText text="修改  重置密码  删除" /> },
  ];
  return <SimpleListPage title="用户管理" query={<><Field label="用户名称" placeholder="请输入用户名称" /><Field label="手机号码" placeholder="请输入手机号码" /><Field label="用户状态" placeholder="请选择用户状态" type="select" /></>} total={48} rows={userRows} columns={columns} addText="新增用户" />;
}

const roleRows: Row[] = [
  { id: 1, name: '超级管理员', key: 'admin', scope: '全部数据权限', sort: 1, status: '正常', remark: '系统最高权限' },
  { id: 2, name: '市级监管人员', key: 'city_supervisor', scope: '市级及下级数据', sort: 2, status: '正常', remark: '市级监管业务权限' },
  { id: 3, name: '县级监管人员', key: 'county_supervisor', scope: '本区县数据', sort: 3, status: '正常', remark: '区县监管业务权限' },
];

export function SystemRolePage() {
  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 70 }, { key: 'name', title: '角色名称', width: 180 }, { key: 'key', title: '权限字符', width: 180 },
    { key: 'scope', title: '数据权限', width: 190 }, { key: 'sort', title: '排序', width: 80 }, { key: 'status', title: '状态', width: 90, render: (r) => <span className="yes-tag">{String(r.status)}</span> },
    { key: 'remark', title: '备注', width: 260, align: 'left' }, { key: 'op', title: '操作', width: 210, render: () => <ActionText text="修改  分配权限  删除" /> },
  ];
  return <SimpleListPage title="角色管理" query={<><Field label="角色名称" placeholder="请输入角色名称" /><Field label="权限字符" placeholder="请输入权限字符" /><Field label="角色状态" placeholder="请选择角色状态" type="select" /></>} total={12} rows={roleRows} columns={columns} addText="新增角色" />;
}

const genericRows: Row[] = [
  { id: 1, name: '达州市煤矿监管系统', code: 'root', type: '目录', sort: 1, status: '正常', remark: '系统根节点' },
  { id: 2, name: '系统管理', code: 'system', type: '菜单', sort: 12, status: '正常', remark: '系统基础配置' },
  { id: 3, name: '组织机构', code: 'system_organization', type: '页面', sort: 1, status: '正常', remark: '机构维护' },
];

function SimpleListPage({ title, query, total, rows, columns, addText = '新增' }: { title: string; query: React.ReactNode; total: number; rows: Row[]; columns: Column<Row>[]; addText?: string }) {
  return <PageScaffold title={title}>
    <SystemQuery>{query}</SystemQuery>
    <SystemToolbar total={total} addText={addText} exportButton />
    <DataTable<Row> columns={columns} rows={rows} />
  </PageScaffold>;
}

function genericColumns(extraTitle = '备注'): Column<Row>[] {
  return [
    { key: 'id', title: '序号', width: 70 }, { key: 'name', title: '名称', width: 220, align: 'left' }, { key: 'code', title: '编码', width: 180 },
    { key: 'type', title: '类型', width: 110 }, { key: 'sort', title: '排序', width: 80 }, { key: 'status', title: '状态', width: 90, render: (r) => <span className="yes-tag">{String(r.status)}</span> },
    { key: 'remark', title: extraTitle, width: 360, align: 'left' }, { key: 'op', title: '操作', width: 150, render: () => <ActionText /> },
  ];
}

export function SystemMenuPage() {
  return <SimpleListPage title="菜单管理" query={<><Field label="菜单名称" placeholder="请输入菜单名称" /><Field label="菜单状态" placeholder="请选择菜单状态" type="select" /></>} total={86} rows={genericRows} columns={genericColumns('菜单说明')} addText="新增菜单" />;
}

export function SystemDeptPage() {
  const rows = orgRows.map((row) => ({ ...row, remark: '用于绑定用户、角色和数据权限' }));
  return <SimpleListPage title="部门管理" query={<><Field label="部门名称" placeholder="请输入部门名称" /><Field label="部门状态" placeholder="请选择部门状态" type="select" /></>} total={36} rows={rows} columns={genericColumns('部门说明')} addText="新增部门" />;
}

export function SystemPostPage() {
  const rows: Row[] = [
    { id: 1, name: '监管人员', code: 'supervisor', type: '业务岗位', sort: 1, status: '正常', remark: '日常监管和报警处置' },
    { id: 2, name: '值班人员', code: 'duty', type: '业务岗位', sort: 2, status: '正常', remark: '值班调度与事件流转' },
    { id: 3, name: '系统管理员', code: 'sys_admin', type: '管理岗位', sort: 3, status: '正常', remark: '系统基础配置维护' },
  ];
  return <SimpleListPage title="岗位管理" query={<><Field label="岗位名称" placeholder="请输入岗位名称" /><Field label="岗位状态" placeholder="请选择岗位状态" type="select" /></>} total={9} rows={rows} columns={genericColumns('岗位说明')} addText="新增岗位" />;
}

export function SystemDictPage() {
  const rows: Row[] = [
    { id: 1, name: '报警级别', code: 'alarm_level', type: '业务字典', sort: 1, status: '正常', remark: '红、橙、黄、蓝等报警级别' },
    { id: 2, name: '企业生产状态', code: 'production_status', type: '业务字典', sort: 2, status: '正常', remark: '正常生产、停产、建设等状态' },
    { id: 3, name: '用户状态', code: 'sys_user_status', type: '系统字典', sort: 3, status: '正常', remark: '正常、停用' },
  ];
  return <SimpleListPage title="字典管理" query={<><Field label="字典名称" placeholder="请输入字典名称" /><Field label="字典类型" placeholder="请输入字典类型" /></>} total={24} rows={rows} columns={genericColumns('字典说明')} addText="新增字典" />;
}

export function SystemConfigPage() {
  const rows: Row[] = [
    { id: 1, name: '主系统名称', code: 'sys.name', type: '文本', sort: 1, status: '正常', remark: '达州市煤矿监管系统' },
    { id: 2, name: '默认分页条数', code: 'sys.pageSize', type: '数值', sort: 2, status: '正常', remark: '20' },
    { id: 3, name: '短信开关', code: 'sms.enabled', type: '布尔', sort: 3, status: '正常', remark: '启用短信发送能力' },
  ];
  return <SimpleListPage title="参数设置" query={<><Field label="参数名称" placeholder="请输入参数名称" /><Field label="参数键名" placeholder="请输入参数键名" /></>} total={18} rows={rows} columns={genericColumns('参数值/说明')} addText="新增参数" />;
}

export function SystemNoticePage() {
  const rows: Row[] = [
    { id: 1, title: '汛期煤矿安全监管提示', type: '通知', publisher: '达州市应急管理局', date: '2026-06-13', status: '已发布' },
    { id: 2, title: '关于加强值班值守工作的通知', type: '公告', publisher: '值班调度中心', date: '2026-06-12', status: '已发布' },
    { id: 3, title: '系统维护窗口提醒', type: '公告', publisher: '系统管理员', date: '2026-06-10', status: '草稿' },
  ];
  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 70 }, { key: 'title', title: '公告标题', width: 360, align: 'left' }, { key: 'type', title: '公告类型', width: 110 },
    { key: 'publisher', title: '发布单位', width: 190 }, { key: 'date', title: '发布时间', width: 150 }, { key: 'status', title: '状态', width: 100 }, { key: 'op', title: '操作', width: 150, render: () => <ActionText /> },
  ];
  return <SimpleListPage title="通知公告" query={<><Field label="公告标题" placeholder="请输入公告标题" /><Field label="公告类型" placeholder="请选择公告类型" type="select" /></>} total={16} rows={rows} columns={columns} addText="新增公告" />;
}

function LogPage({ title, login = false }: { title: string; login?: boolean }) {
  const rows: Row[] = [
    { id: 1, user: '管理员', ip: '10.10.1.12', location: '达州市', action: login ? '登录成功' : '修改组织机构', time: '2026-06-13 09:12:24', result: '成功' },
    { id: 2, user: '大竹监管员', ip: '10.10.2.18', location: '大竹县', action: login ? '退出系统' : '查询报警处置', time: '2026-06-13 08:44:11', result: '成功' },
    { id: 3, user: '值班调度', ip: '10.10.1.33', location: '达州市', action: login ? '登录失败' : '导出短信记录', time: '2026-06-12 22:18:04', result: login ? '失败' : '成功' },
  ];
  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 70 }, { key: 'user', title: login ? '登录用户' : '操作人员', width: 130 }, { key: 'ip', title: '主机地址', width: 140 },
    { key: 'location', title: '操作地点', width: 130 }, { key: 'action', title: login ? '登录状态' : '操作内容', width: 240, align: 'left' },
    { key: 'time', title: login ? '登录时间' : '操作时间', width: 180 }, { key: 'result', title: '结果', width: 90, render: (r) => <span className={String(r.result) === '成功' ? 'yes-tag' : ''}>{String(r.result)}</span> },
  ];
  return <SimpleListPage title={title} query={<><Field label="用户名称" placeholder="请输入用户名称" /><Field label="操作时间" placeholder="请选择时间范围" type="select" /></>} total={128} rows={rows} columns={columns} addText="清空日志" />;
}

export function SystemOperlogPage() { return <LogPage title="操作日志" />; }
export function SystemLoginlogPage() { return <LogPage title="登录日志" login />; }

export function SystemOnlinePage() {
  const rows: Row[] = [
    { id: 1, account: 'admin', name: '管理员', dept: '达州市应急管理局', ip: '10.10.1.12', login: '2026-06-13 09:12:24', browser: 'Chrome', status: '在线' },
    { id: 2, account: 'duty_center', name: '值班调度', dept: '值班调度中心', ip: '10.10.1.33', login: '2026-06-13 08:02:17', browser: 'Edge', status: '在线' },
  ];
  const columns: Column<Row>[] = [
    { key: 'id', title: '序号', width: 70 }, { key: 'account', title: '登录账号', width: 130 }, { key: 'name', title: '用户姓名', width: 120 },
    { key: 'dept', title: '所属机构', width: 220 }, { key: 'ip', title: '登录地址', width: 140 }, { key: 'login', title: '登录时间', width: 180 },
    { key: 'browser', title: '浏览器', width: 110 }, { key: 'status', title: '状态', width: 90, render: (r) => <span className="yes-tag">{String(r.status)}</span> }, { key: 'op', title: '操作', width: 100, render: () => <ActionText text="强退" /> },
  ];
  return <SimpleListPage title="在线用户" query={<><Field label="用户名称" placeholder="请输入用户名称" /><Field label="登录地址" placeholder="请输入登录地址" /></>} total={2} rows={rows} columns={columns} addText="批量强退" />;
}

export function SystemJobPage() {
  const rows: Row[] = [
    { id: 1, name: '报警短信补偿发送', code: 'smsRetryJob', type: '业务任务', sort: '*/5 * * * *', status: '正常', remark: '每 5 分钟检查失败短信' },
    { id: 2, name: '在线用户清理', code: 'onlineCleanupJob', type: '系统任务', sort: '0 0/30 * * * ?', status: '正常', remark: '清理过期会话' },
    { id: 3, name: '日志归档', code: 'logArchiveJob', type: '系统任务', sort: '0 0 2 * * ?', status: '正常', remark: '每日凌晨归档历史日志' },
  ];
  return <SimpleListPage title="定时任务" query={<><Field label="任务名称" placeholder="请输入任务名称" /><Field label="任务状态" placeholder="请选择任务状态" type="select" /></>} total={14} rows={rows} columns={genericColumns('Cron/任务说明')} addText="新增任务" />;
}
