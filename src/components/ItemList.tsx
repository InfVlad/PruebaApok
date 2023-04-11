import { useEffect, useState, type FC } from 'react';
import { getParentNodes } from '../lib/utils';
import type { TNode } from '../types/nodes';
import Node from './Node';

const ItemList: FC = () => {
  const [nodesList, setNodesList] = useState<TNode[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getParentNodes();
        if (response?.status !== 200) {
          console.log('Error, status code: ', response?.status);
          return;
        }
        console.log(response.data);
        setNodesList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    void getData();
  }, []);

  return (
    <div>
      {nodesList.length > 0 && (
        <div className="flex flex-col items-center justify-center pb-10">
          {nodesList.map((node) => {
            return (
                <Node key={node.id} id={node.id} title={node.title} parent={node.parent} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ItemList;
