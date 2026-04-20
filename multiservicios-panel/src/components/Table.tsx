import React from "react";

interface TableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  actions?: React.ReactNode;
  renderActions?: (row: T) => React.ReactNode;
}

export function Table<T extends { id: number }>({ columns, data, renderActions }: TableProps<T>) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px #0001' }}>
      <thead>
        <tr style={{ background: '#f5f6fa' }}>
          {columns.map(col => (
            <th key={String(col.key)} style={{ padding: 10, border: '1px solid #eee', textAlign: 'left', fontWeight: 700 }}>{col.label}</th>
          ))}
          {renderActions && <th style={{ padding: 10, border: '1px solid #eee' }}>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)} style={{ padding: 18, textAlign: 'center', color: '#888' }}>
              No hay datos para mostrar
            </td>
          </tr>
        ) : (
          data.map(row => (
            <tr key={row.id}>
              {columns.map(col => (
                <td key={String(col.key)} style={{ padding: 10, border: '1px solid #eee' }}>
                  {col.key === 'activo' ? (typeof row[col.key] === 'boolean' ? (row[col.key] ? 'Sí' : 'No') : String(row[col.key])) : String(row[col.key])}
                </td>
              ))}
              {renderActions && <td style={{ padding: 10, border: '1px solid #eee' }}>{renderActions(row)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
