import type { FC, MouseEventHandler } from 'react';
import { useState } from 'react';
import { getChildNodes } from '../lib/utils';
import type { TNode } from '../types/nodes';

const Node: FC<TNode> = ({ id, title, parent }) => {
  const [childList, setChildList] = useState<TNode[]>([]);

  const handleShowChildes: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        const childNodes = await getChildNodes(id);
        if (childNodes) {
          setChildList(childNodes?.data);
          console.log(childNodes?.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-8 m-8 bg-blue-400'>
        <div className='flex items-center justify-between w-full gap-4 m-4'>
          <div>{`ID: ${id}`}</div>
          {parent ? <div>{`Parent: ${parent}`}</div> : null}
        </div>
        <div>{`Title: ${title}`}</div>
        <div className='flex items-center justify-between gap-4 m-4'>
          <button type='button' onClick={handleShowChildes} className='cursor-pointer'>
            Childes
          </button>
          <div>Add Child</div>
        </div>
      </div>
      {childList.length > 0 && (
        <div className='flex items-center justify-center flex-wrap max-w-[700px] max-h-[700px] overflow-scroll'>
          {childList.map((node) => {
            return <Node key={node.id} id={node.id} title={node.title} parent={node.parent} />;
          })}
        </div>
      )}
    </>
  );
};

export default Node;
