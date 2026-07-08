import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Eye, PenSquare, Search, RotateCcw, Upload, CircleChevronUp, X } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  title: React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
}

export function QueryPanel({ children }: { children: React.ReactNode }) {
  return <section className="query-panel">{children}<div className="query-actions"><button className="primary-button" type="button"><Search size={15} />查询</button><button className="light-button" type="button"><RotateCcw size={15} />重置</button><button className="small-square" type="button"><ChevronDown size={15} /></button></div></section>;
}

export function Field({ label, placeholder, type = 'input' }: { label: string; placeholder: string; type?: 'input' | 'select' | 'tree' }) {
  return <label className="query-field"><span>{label}：</span><div className="field-control"><span className="placeholder-text">{placeholder}</span>{type === 'select' && <ChevronDown size={15} />}{type === 'tree' && <span className="tree-icon">▦</span>}</div></label>;
}

export function DataTable<T extends Record<string, unknown>>({ columns, rows, emptyText = '暂无数据' }: { columns: Column<T>[]; rows: T[]; emptyText?: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr>{columns.map((column) => <th key={String(column.key)} style={{ width: column.width, textAlign: column.align || 'center' }}>{column.title}</th>)}</tr></thead>
        <tbody>
          {rows.length > 0 ? rows.map((row, index) => (
            <tr key={String(row.id ?? index)}>{columns.map((column) => <td key={String(column.key)} style={{ textAlign: column.align || 'center' }}>{column.render ? column.render(row, index) : String(row[column.key] ?? '')}</td>)}</tr>
          )) : <tr className="empty-row"><td colSpan={columns.length}>{emptyText}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ total = 43 }: { total?: number }) {
  return <div className="pagination"><span>共 {total} 条</span><button disabled><ChevronLeft size={16}/></button><button className="page-active">1</button><button>2</button><button>3</button><button><ChevronRight size={16}/></button><select><option>20条/页</option></select><CircleChevronUp size={15} /></div>;
}

export function RowActions() {
  return <div className="row-actions"><Eye size={17}/><PenSquare size={17}/></div>;
}

export function UploadButton() {
  return <button className="icon-button" type="button"><Upload size={16} /></button>;
}

export interface DetailSectionProps {
  title: string;
  rows: Array<[string, string, string, string]>;
}

export function DetailSection({ title, rows }: DetailSectionProps) {
  return <section className="detail-section"><header><span>{title}</span><ChevronDown size={15}/></header><table className="detail-table"><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className={cellIndex % 2 === 0 ? 'detail-label' : 'detail-value'}>{cell}</td>)}</tr>)}</tbody></table></section>;
}

export function CloseMark() {
  return <button className="close-mark" type="button"><X size={15}/></button>;
}
