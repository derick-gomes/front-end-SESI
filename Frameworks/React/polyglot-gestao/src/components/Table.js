import React from 'react';

function Table({ columns, data }) {
  return (
    <table border="1" cellPadding="8" style={{ marginTop: '20px', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col, index) => <th key={index}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>Nenhum dado</td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.toLowerCase()]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
