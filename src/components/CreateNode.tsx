import type { FC, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { languages } from '../lib/data';
import { createNode } from '../lib/utils';
import { toast } from 'react-hot-toast';
import closeIcon from '../assets/close.svg';

interface CreateNodeProps {
  id: number;
  show: Dispatch<SetStateAction<boolean>>;
}

type LanguagesList = typeof languages;
type TLocales = LanguagesList[number]['locale'];

const CreateNode: FC<CreateNodeProps> = ({ id, show }) => {
  const [translationsList, setTranslationsList] = useState<TLocales[]>([]);
  const handleSelectTranslation = (locale: TLocales) => {
    if (translationsList.includes(locale)) {
      setTranslationsList((prev) => prev.filter((item) => item !== locale));
    } else {
      setTranslationsList((prev) => [...prev, locale]);
    }
  };
  const handleCreateNode = () => {
    void (async () => {
      try {
        const createdNodeRes = await createNode(id, translationsList);
        if (createdNodeRes) {
          toast.success('Node Created Successfully');
          toast.success(`Node number: ${createdNodeRes?.data.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    show(false);
  };
  return (
    <div className='relative flex items-center justify-between w-full gap-4 pt-6'>
      <div className='flex gap-2'>
        {languages.map(({ flagUrl, label, locale }, index) => (
          <button
            key={index}
            type='button'
            className={`relative flex items-center justify-center w-6 h-6 cursor-pointer ${
                translationsList.includes(locale)
                ? 'brightness-100'
                : 'brightness-50 hover:brightness-75'
            }`}

            onClick={() => handleSelectTranslation(locale)}
          >
            <img src={flagUrl} alt={label} title={label} />
          </button>
        ))}
      </div>
      <button
        className='px-2 py-2 font-medium text-blue-600 transition-colors duration-500 border-2 border-blue-600 sm:px-4 rounded-2xl hover:bg-blue-600 hover:text-white'
        onClick={handleCreateNode}
        type='button'
        title='Create Node'
      >
        Create
      </button>
      <button
        type='button'
        className='absolute text-[#ff3838] -top-1 right-0 text-bolder w-6 h-6'
        onClick={handleClose}
        title='Close'
      >
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};

export default CreateNode;
