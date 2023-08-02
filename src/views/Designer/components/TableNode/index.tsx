import React from 'react';
import type { Prop } from './type';

const TableNode: React.FC<Prop> = ({ table }) => {
  return (
    <>
      <div
        style={{
          width: '100px',
          height: '25px',
          textAlign: 'center',
          backgroundColor: '#5F95FF',
          color: 'white',
        }}
      >
        {table.name}
      </div>
      {table.fields.map((field) => (
        <div
          style={{
            width: '100px',
            height: '25px',
            backgroundColor: '#EFF4FF',
            borderWidth: '0 2px 2px',
            borderColor: '#5F95FF',
            borderStyle: 'solid',
          }}
          key={field.name}
        >
          {field.name}
        </div>
      ))}
    </>
  );
};

export default TableNode;
