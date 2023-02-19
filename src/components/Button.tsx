import React, { useState } from 'react';
import { translateText } from '../services/ai';

type ButtonProps = {
    language: string;
    text: string;
    setTranslation: (value: string) => void;
};

const Button = ({ language, text, setTranslation }: ButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnClick = async (e: any) => {
        e.preventDefault();
        if (text.length <= 0) return;

        setLoading(true);

        translateText(text, language).then((res: string) => {
            setTranslation(res);
            setLoading(false);
        });
    };

    return (
        <>
            {loading ? (
                <div className='w-3 flex items-center justify-center'>
                    <div className='w-full h-10 w-10 bg-blue-600 rounded-full animate-spin'></div>
                </div>
            ) : (
                <button
                    className={`bg-blue-600 text-white py-2 px-10 rounded-full shadow-md transition-colors duration-300 ease-in-out select-none ${
                        text.length <= 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-700'
                    }`}
                    onClick={handleOnClick}
                    disabled={text.length <= 0}
                >
                    Translate
                </button>
            )}
        </>
    );
};

export default Button;