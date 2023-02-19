import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import TranslatedBox from '../components/TranslatedBox';
import { Language } from '../enums/language';

const Main = () => {
    const [value, setValue] = useState<string>('');
	const [language, setLanguage] = useState<Language>(Language.GERMAN);
    const [translation, setTranslation] = useState<string>('');
    return (
        <div className='flex w-3/4'>
            <div className='w-1/2'>
                <InputBox setValue={(value: string) => { setValue(value); if(value.length <= 0) setTranslation('')}} />
            </div>
            <div className='w-1/6 flex items-center justify-center flex-shrink-0'>
                <Button
                    language={language}
                    text={value}
                    setTranslation={setTranslation}
                />
            </div>
            <div className='w-1/2'>
                <TranslatedBox
                    setLanguage={setLanguage}
                    translation={translation}
                />
            </div>
        </div>
    );
};

export default Main;
