import type { FC, MouseEventHandler } from 'react';
import { useState } from 'react';
import { getChildNodes, createNode, deleteNode } from '../lib/utils';
import type { TNode } from '../types/nodes';
import deleteIcon from '../assets/delete.svg';
import closeIcon from '../assets/close.svg';

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
        if (createdNodeRes) {
          console.log(createdNodeRes?.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const handleDeleteNode: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        const deletedNodeRes = await deleteNode(id);
        if (!deletedNodeRes) return;
        if (deletedNodeRes.status !== 200) {
          console.log('Status: ', deletedNodeRes.status);
        }
        console.log('Successfully deleted node ', deletedNodeRes?.data.id);
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
    <div className="flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-between gap-4 p-8 m-8 bg-white w-72 h-[22rem] rounded-3xl'>
        <div className='flex items-start justify-between w-full gap-4'>
          <div className="font-semibold text-blue-600 text-md">
            <div>{`ID: ${id}`}</div>
            {parent ? <div>{`Parent ID: ${parent}`}</div> : <div>Root</div>}
          </div>
          {parent ? (
            <button
              type='button'
              title='Delete Node'
              className='w-8 h-8 p-1 border-2 border-[#ff3838] border-solid rounded-full'
              onClick={handleDeleteNode}
            >
              <img src={deleteIcon} alt='trash' />
            </button>
          ) : null}
        </div>
        <p className='w-[85%] text-center font-serif text-xl font-bold text-blue-600'>
          {title}
        </p>
        <div className='flex items-center justify-between w-full gap-4'>
          <button
            type='button'
            className='px-4 py-2 font-medium text-white transition-colors duration-500 bg-blue-600 border-2 rounded-2xl hover:bg-white hover:text-blue-600 hover:border-blue-600'
            onClick={handleShowChildren}
            title='Show children nodes'
          >
            Children
          </button>
          <button
            type='button'
            className='px-4 py-2 font-medium text-blue-600 transition-colors duration-500 border-2 border-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white'
            onClick={handleAddChild}
            title='Add new child node'
          >
            Add Child
          </button>
        </div>
      </div>
      {childList.length > 0 && (
        <div
          className={
            'relative flex p-7 items-center justify-center flex-wrap w-[85%] rounded-2xl max-w-[1200px] overflow-auto ' +
            (showingGrandChild ? 'flex-col' : 'bg-blue-300')
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
              className='absolute text-[#ff3838] top-7 right-7 text-bolder w-8 h-8'
              onClick={handleCloseChildren}
              title='Close'
            >
              <img src={closeIcon} alt='close' />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Node;
