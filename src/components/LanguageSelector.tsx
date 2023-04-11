import '@total-typescript/ts-reset';
import type { FC, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { getNode } from '../lib/utils';
import type { TNode } from '../types/nodes';
import languageIcon from '../assets/language.svg';
import type { AxiosResponse } from 'axios';

function isValidLocale(item: any): item is TLocales {
  return typeof item === 'string';
}
type TLocales = LanguagesList[number]['locale'];
type LanguagesList = typeof languages;
const languages = [
  {
    locale: 'es_ES',
    label: 'Español',
    flagUrl: '/flags/spain.svg',
  },
  {
    locale: 'fr_FR',
    label: 'Français',
    flagUrl: '/flags/france.svg',
  },
  {
    locale: 'de_DE',
    label: 'Deutsch',
    flagUrl: '/flags/germany.svg',
  },
  {
    locale: 'it_IT',
    label: 'Italiano',
    flagUrl: '/flags/italy.svg',
  },
] as const;

interface LanguageSelectorProps {
  id: number;
  updateTitle: Dispatch<SetStateAction<string | null>>;
}
interface Language {
  title: string;
  locale: string;
  label: string;
  flagUrl: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ id, updateTitle }) => {
  const [loadedTranslations, setLoadedTranslations] = useState<boolean>(false);
  const [languageList, setLanguageList] = useState<Language[]>([]);
  const handleLoadTranslations: MouseEventHandler<HTMLButtonElement> = () => {
    void (async () => {
      try {
        const translationsRes: (AxiosResponse<TNode, any> | undefined)[] = [];
        for (const current of languages) {
          translationsRes.push(await getNode(id, current.locale));
        }
        setLoadedTranslations(true);
        const translationsPayload: Language[] = [];
        for (const current of translationsRes) {
          if (typeof current === 'undefined' || current.data?.translation.length === 0) {
            continue;
          }
          const locale = current?.data?.translation[0].locale;
          if (isValidLocale(locale)) {
            locale;
            const languageItem = languages.find((item) => item.locale === locale);
            if (languageItem) {
              translationsPayload.push({
                title: current?.data?.translation[0].title.replace(/­/, ' '),
                locale,
                label: languageItem.label,
                flagUrl: languageItem.flagUrl,
              });
            }
          }
        }
        // esta es otra manera, funciona pero trae algunos problemas con typescript: 
        // const translations = translationsRes
        //   .filter((item) => Boolean(item))
        //   .filter((res) => {
        //     if (!res?.data?.translation) return false;
        //     return res?.data?.translation?.length > 0;
        //   })
        //   .map((res): Language => {
        //     const locale = res?.data?.translation[0].locale;
        //     return {
        //       title: res?.data?.translation[0].title.replace(/­/, ' '),
        //       locale,
        //       label: languages.find((item) => item.locale === locale)?.label,
        //       flagUrl: languages.find((item) => item.locale === locale)?.flagUrl,
        //     } as Language;
        //   });
        // console.log(translations);
        setLanguageList(translationsPayload);
      } catch (error) {
        console.error(error);
      }
    })();
  };
  const handleSelectTranslation = (title: string | null) => {
    updateTitle(title)
  }


  return (
    <div>
      {loadedTranslations ? (
        <div className='flex items-center gap-2 justify-items-start'>
          <div className='flex w-6 h-6 cursor-pointer' onClick={() => handleSelectTranslation(null)}>
                <img src='/flags/english.svg' alt="English" title="English" />
          </div>
          { (
            languageList.map(({ flagUrl, label, title }, index) => (
              <div key={index} className='flex w-6 h-6 cursor-pointer' onClick={() => handleSelectTranslation(title)}>
                <img src={flagUrl} alt={label} title={label} />
              </div>
            ))
          ) }
        </div>
      ) : (
        <button
          type='button'
          title='Change language'
          className='w-8 h-8 p-1 border-2 border-solid rounded-full'
          onClick={handleLoadTranslations}
        >
          <img src={languageIcon} alt='language change' />
        </button>
      )}
    </div>
  );
};

export default LanguageSelector;
