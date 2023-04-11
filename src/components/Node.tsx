import type { FC, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { getChildNodes, createNode, deleteNode } from '../lib/utils';
import type { TNode } from '../types/nodes';
import type { Language } from '../types/local';
import deleteIcon from '../assets/delete.svg';
import closeIcon from '../assets/close.svg';
import Loader from './Loader';
import { toast } from 'react-hot-toast';
import {useAutoAnimate} from '@formkit/auto-animate/react'
import LanguageSelector from './LanguageSelector';

interface NodeProps extends Omit<TNode, 'translation'> {
  setShowingChild?: Dispatch<SetStateAction<number | null>>;
  updateChildList?: Dispatch<SetStateAction<TNode[]>>;
}

const Node: FC<NodeProps> = ({ id, title, parent, setShowingChild, updateChildList }) => {
  const [childList, setChildList] = useState<TNode[]>([]);
  const [showingGrandChild, setShowingGrandChild] = useState<number | null>(null);
  const [loadingChildren, setLoadingChildren] = useState<boolean>(false);
  const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  const handleShowChildren: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        setLoadingChildren(true);
        const childNodes = await getChildNodes(id);
        setLoadingChildren(false);
        if (!childNodes) return;
        setChildList(childNodes?.data);
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
          toast.success("Node Created Successfully")
          toast.success(`Node number: ${createdNodeRes?.data.id}`);
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
        toast.success(`Node ${deletedNodeRes?.data.id} Deleted Successfully`)
        if (updateChildList) {
          updateChildList((prevList) => prevList.filter((node) => node.id !== id));
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

useEffect(() => {
  if(childList.length === 0){
    setShowingGrandChild(null);
    if(setShowingChild){
      setShowingChild(null);
    }
  }
}, [childList])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-between gap-4 p-8 m-8 bg-white w-64 h-[20rem] sm:w-72 sm:h-[22rem] rounded-3xl'>
        <div className='flex items-start justify-between w-full gap-4'>
          <div className='font-semibold text-blue-600 text-md'>
            <div>{`ID: ${id}`}</div>
            {parent ? <div>{`Parent ID: ${parent}`}</div> : <div>Root</div>}
            <LanguageSelector id={id} updateTitle={setTranslatedTitle}/>
          </div>
          {parent ? (
            <button
              type='button'
              title='Delete Node'
              className='w-8 h-8 p-1 border-2 border-[#ff3838] hover:border-red-700 border-solid rounded-full'
              onClick={handleDeleteNode}
            >
              <img src={deleteIcon} alt='trash' />
            </button>
          ) : null}
        </div>
        <p className='w-[85%] text-center font-serif text-lg font-semibold sm:text-xl sm:font-bold text-blue-600'>
          {translatedTitle? translatedTitle: title}
        </p>
        <div className='flex items-center justify-between w-full gap-4'>
          <button
            type='button'
            className='flex items-center justify-center sm:min-w-[97px] px-2 sm:px-4 py-2 font-medium text-white transition-colors duration-500 bg-blue-600 border-2 rounded-2xl hover:bg-white hover:text-blue-600 hover:border-blue-600'
            onClick={handleShowChildren}
            title='Show children nodes'
          >
            {loadingChildren ? <Loader /> : 'Children'}
          </button>
          <button
            type='button'
            className='px-2 py-2 font-medium text-blue-600 transition-colors duration-500 border-2 border-blue-600 sm:px-4 rounded-2xl hover:bg-blue-600 hover:text-white'
            onClick={handleAddChild}
            title='Add new child node'
          >
            Add Child
          </button>
        </div>
      </div>
      {childList.length > 0 && (
        <div
          ref={listRef}
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
                updateChildList={setChildList}
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
