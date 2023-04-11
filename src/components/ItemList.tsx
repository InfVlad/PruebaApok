import { useEffect, useState, type FC } from 'react';
import { getParentNodes, getLocals } from '../lib/utils';
import type { TNode } from '../types/nodes';
import Node from './Node';

const ItemList: FC = () => {
  const [nodesList, setNodesList] = useState<TNode[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const parentsRes = await getParentNodes();
        if (parentsRes?.status !== 200) {
          console.log('Error, status code: ', parentsRes?.status);
          return;
        }
        setNodesList(parentsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    void getData();
  }, []);

  return (
    <div>
      {nodesList.length > 0 && (
        <div className='flex flex-col items-center justify-center pb-10'>
          {nodesList.map((node) => {
            return <Node key={node.id} id={node.id} title={node.title} parent={node.parent} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ItemList;
