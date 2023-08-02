import { Graph, Node } from '@antv/x6';
import React, { useEffect, useRef, useState } from 'react';
import { Portal, register } from '@antv/x6-react-shape';
import type { Table } from '../MutateTableModal/type';
import TableNode from '../TableNode';

const X6ReactPortalProvider = Portal.getProvider();
const TableContext = React.createContext<Table>({
  name: '',
  remark: null,
  fields: [],
});

const TableNodeWrapper = ({ node }: { node: Node }) => {
  const table = React.useContext(TableContext);

  useEffect(() => {
    node.setData(table);
  }, [node, table]);

  return <TableNode table={table} />;
};

register({
  shape: 'table',
  width: 100,
  height: 100,
  component: TableNodeWrapper,
});

const DesignerGraph: React.FC = () => {
  const [table, setTable] = useState<Table>({
    name: '',
    remark: null,
    fields: [],
  });

  const graphRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const graph = new Graph({
      container: graphRef.current,
      background: {
        color: '#F2F7FA',
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 一个主网格中包含factor * factor个子网格
          },
        ],
      },
      panning: true,
      mousewheel: true,
    });

    graph.on('node:contextmenu', ({ cell: { data } }) => {
      console.log(data);
    });

    graph.addNode({
      shape: 'table',
      x: 0,
      y: 0,
    });

    graph.zoomToFit({ padding: 10, maxScale: 1 });

    return () => {
      graph.dispose();
    };
  }, [graphRef]);

  setTimeout(() => {
    setTable({
      ...table,
      name: '测试',
      fields: [{ name: '字段1' }, { name: '字段2' }, { name: '字段3' }],
    });
  }, 5000);

  return (
    <>
      <TableContext.Provider value={table}>
        <X6ReactPortalProvider />
      </TableContext.Provider>
      <div
        style={{
          width: '1594px',
          height: '807px',
        }}
        // @ts-ignore
        ref={graphRef}
      />
    </>
  );
};

export default DesignerGraph;
