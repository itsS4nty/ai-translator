import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Language } from '../enums/language';

type TranslatedBoxProps = {
    setLanguage: (value: Language) => void,
    translation: string
}

const TranslatedBox = ({ setLanguage, translation }: TranslatedBoxProps) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        if(!divRef || !divRef.current) return;

        const { textContent } = divRef.current;
        navigator.clipboard.writeText(textContent ?? '')
            .then(() => {
                toast('Asdasdsad', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            })
            .catch((err: any) => {
                if(divRef.current){
                    const range = document.createRange();
                    range.selectNodeContents(divRef.current);
                    const selection = window.getSelection();
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                    return;
                }
                console.log(err);
            });
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='max-w-md w-full mx-4'>
                <div className='relative'>
                    <select
                        className='absolute cursor-pointer w-3/4 rounded-lg appearance-none bg-gray-100 border-b border-gray-300 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue font-medium select-none'
                        style={{top: '-40px'}}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                    >
                        <option value={Language.GERMAN}>🇩🇪 German</option>
                        <option value={Language.ITALIAN}>🇮🇹 Italian</option>
                        <option value={Language.FRENCH}>🇫🇷 French</option>
                        <option value={Language.ENGLISH}>🇺🇸 English</option>
                        <option value={Language.SPANISH}>🇪🇸 Spanish</option>
                    </select>
                    <div
                        ref={divRef}
                        className={`border border-transparent active:outline-none active:ring active:ring-indigo-500 active:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-lg leading-5 bg-white shadow-sm  resize-none min-h-200 max-h-600 overflow-auto cursor-pointer ${translation.length <= 0 && 'text-gray-400'}`}
                        style={{
                            minHeight: '200px',
                            maxHeight: '600px',
                            overflow: 'hidden',
                        }}
                        onClick={handleCopy}
                    >{translation.length ? translation : 'Here will appear your text translated. Then, you can click on the box to copy it.'}</div>
                </div>
            </div>
        </div>
    );
};

export default TranslatedBox;
