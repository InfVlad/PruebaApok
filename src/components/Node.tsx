import type { FC, MouseEventHandler } from 'react';
import { useState } from 'react';
import { getChildNodes, createNode } from '../lib/utils';
import type { TNode } from '../types/nodes';

interface NodeProps extends TNode {
  setShowingChild?: React.Dispatch<React.SetStateAction<number | null>>;
}

const Node: FC<NodeProps> = ({ id, title, parent, setShowingChild }) => {
  const [childList, setChildList] = useState<TNode[]>([]);
  const [showingGrandChild, setShowingGrandChild] = useState<number | null>(null);
  

  const handleShowChildren: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        const childNodes = await getChildNodes(id);
        if (!childNodes) return;
        setChildList(childNodes?.data);
        console.log(childNodes?.data);
        if (setShowingChild) {
          setShowingChild(id);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const handleCloseChildren: MouseEventHandler<HTMLButtonElement> = () => {
    setChildList([]);
    if (setShowingChild) {
      setShowingChild(null);
    }
  };
  const handleAddChild: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        const createdNodeRes = await createNode(id);
        if (createdNodeRes?.status === 404) {
          console.log('404', createdNodeRes.data);
        }
        if (createdNodeRes) {
          console.log(createdNodeRes?.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const renderChildrenList = () => {
    return showingGrandChild !== null
      ? childList.filter((node) => node.id === showingGrandChild)
      : childList;
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-8 p-4 m-8 bg-blue-400'>
        <div className='flex items-center justify-between w-full gap-4 m-4'>
          <div>{`ID: ${id}`}</div>
          {parent ? <div>{`Parent: ${parent}`}</div> : <div>Root</div>}
        </div>
        <p className='w-[85%] text-center'>{title}</p>
        <div className='flex items-center justify-between gap-4 m-4'>
          <button type='button' onClick={handleShowChildren}>
            Children
          </button>
          <button type='button' onClick={handleAddChild}>
            Add Child
          </button>
        </div>
      </div>
      {childList.length > 0 && (
        <div
          className={
            'relative flex items-center justify-center flex-wrap max-w-[1200px] max-h-[700px] overflow-auto ' +
            (showingGrandChild ? 'flex-col' : 'bg-green-300')
          }
        >
          {renderChildrenList().map(({ id, title, parent }) => {
            return (
              <Node
                key={id}
                id={id}
                title={title}
                parent={parent}
                setShowingChild={!setShowingChild ? setShowingGrandChild : undefined}
              />
            );
          })}
          {!showingGrandChild && (
            <button
              type='button'
              className='absolute text-red-600 top-4 right-4 text-bolder'
              onClick={handleCloseChildren}
              title='Close'
            >
              Close
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Node;
