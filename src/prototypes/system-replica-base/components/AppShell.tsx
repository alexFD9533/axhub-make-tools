import React, { useEffect, useMemo, useState } from 'react';
import { Bell, Building2, CalendarDays, ChevronDown, CircleAlert, ClipboardList, Clock3, FileText, Gauge, Home, IdCard, Image, ListChecks, Mail, Monitor, PieChart, Search, Settings, Siren, SlidersHorizontal, User, Users, Video, BarChart3, BriefcaseBusiness, AppWindow, Text, Folder, Cog, RefreshCw, Volume2 } from 'lucide-react';
import { MenuItem, menuGroups, TopModuleId, topModules } from '../data';

const iconMap: Record<string, React.ElementType> = {
  gear: Cog, home: Home, search: Search, alarm: Siren, list: ListChecks, gauge: Gauge, clock: Clock3, users: Users, mail: Mail,
  calendar: CalendarDays, alert: CircleAlert, briefcase: BriefcaseBusiness, user: User, file: FileText, chart: BarChart3,
  idcard: IdCard, pie: PieChart, monitor: Monitor, video: Video, image: Image, clipboard: ClipboardList, timer: Clock3,
  bar: BarChart3, text: Text, folder: Folder, app: AppWindow, bell: Bell, settings: Settings,
};

function getIcon(name?: string) {
  const Icon = name ? iconMap[name] : FileText;
  return Icon || FileText;
}

export interface AppShellProps {
  activeModule: TopModuleId;
  activePage: string;
  onModuleChange: (moduleId: TopModuleId) => void;
  onPageChange: (pageId: string) => void;
  children: React.ReactNode;
}

export function AppShell({ activeModule, activePage, onModuleChange, onPageChange, children }: AppShellProps) {
  const menu = menuGroups[activeModule] || [];
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const activeGroupIds = useMemo(() => menu
    .filter((item) => item.page === activePage || item.children?.some((child) => child.page === activePage))
    .map((item) => item.id), [activePage, menu]);

  useEffect(() => {
    if (activeGroupIds.length === 0) {
      setExpandedGroupId(null);
      return;
    }
    setExpandedGroupId((current) => (activeGroupIds.includes(current || '') ? current : activeGroupIds[0]));
  }, [activeGroupIds]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroupId((current) => (current === groupId ? null : groupId));
  };

  return (
    <div className="replica-app">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-emblem">徽</div>
          <div className="brand-title">煤矿安全综管平台</div>
        </div>
        <nav className="module-tabs" aria-label="顶部模块导航">
          {topModules.map((module) => (
            <button
              key={module.id}
              type="button"
              className={module.id === activeModule ? 'module-tab active' : 'module-tab'}
              onClick={() => onModuleChange(module.id)}
            >
              {module.label}
            </button>
          ))}
        </nav>
        <div className="topbar-tools" aria-label="系统工具区">
          <button className="circle-tool" type="button">融</button>
          <div className="notice-wrap"><Bell size={23} fill="#050814" /><span>18</span></div>
          <div className="user-name">管理员</div>
        </div>
      </header>
      <div className="main-frame">
        <aside className="sidebar" aria-label="左侧菜单">
          <div className="sidebar-handle">⋮</div>
          {menu.length === 0 ? (
            <div className="side-empty">该顶部模块待接入菜单</div>
          ) : (
            <div className="side-menu">
              {menu.map((item) => (
                <MenuNode
                  key={item.id}
                  item={item}
                  activePage={activePage}
                  onPageChange={onPageChange}
                  level={0}
                  expandedGroupId={expandedGroupId}
                  onToggleGroup={toggleGroup}
                />
              ))}
            </div>
          )}
        </aside>
        <section className="workspace">{children}</section>
      </div>
    </div>
  );
}

function MenuNode({
  item,
  activePage,
  onPageChange,
  level,
  expandedGroupId,
  onToggleGroup,
}: {
  item: MenuItem;
  activePage: string;
  onPageChange: (pageId: string) => void;
  level: number;
  expandedGroupId: string | null;
  onToggleGroup: (groupId: string) => void;
}) {
  const Icon = getIcon(item.icon);
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const childActive = item.children?.some((child) => child.page === activePage);
  const active = item.page === activePage || childActive;
  const collapsed = hasChildren && expandedGroupId !== item.id;
  return (
    <div className={level === 0 ? 'menu-group' : 'submenu-group'}>
      <button
        type="button"
        className={`side-item level-${level} ${active ? 'active' : ''}`}
        onClick={() => {
          if (hasChildren) {
            onToggleGroup(item.id);
            return;
          }
          onPageChange(item.page);
        }}
      >
        {level === 0 && <Icon className="side-icon" size={20} />}
        <span>{item.label}</span>
        {hasChildren && <ChevronDown className={`side-chevron ${collapsed ? 'collapsed' : ''}`} size={15} />}
      </button>
      {hasChildren && !collapsed && (
        <div className="submenu">
          {item.children!.map((child) => (
            <MenuNode
              key={child.id}
              item={child}
              activePage={activePage}
              onPageChange={onPageChange}
              level={level + 1}
              expandedGroupId={expandedGroupId}
              onToggleGroup={onToggleGroup}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PageScaffold({ title, children, rightExtra }: { title: string; children: React.ReactNode; rightExtra?: React.ReactNode }) {
  return (
    <div className="page-scaffold">
      <div className="page-title-row">
        <h1>{title}</h1>
        {rightExtra && <div className="title-extra">{rightExtra}</div>}
      </div>
      {children}
    </div>
  );
}

export function Toolbar({ children }: { children?: React.ReactNode }) {
  return <div className="toolbar"><button className="icon-button" type="button"><RefreshCw size={17} /></button><i className="toolbar-sep" />{children}</div>;
}

export function SoundControls() {
  return <><select className="sound-select"><option>声音播报</option></select><button className="plain-button" type="button"><Volume2 size={15}/> 语音测试</button><button className="plain-button" type="button">交班</button><button className="plain-button" type="button">通讯录</button><button className="plain-button" type="button">班次列表</button></>;
}
