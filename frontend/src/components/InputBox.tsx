import React, { useState } from 'react';

type TextBoxProps = {
    setValue: (value: string) => void
}

const InputBox = ({ setValue }: TextBoxProps) => {
    const [valueLength, setValueLength] = useState<number>(0);
    return (
        <div className='flex items-center justify-center md:min-h-screen'>
            <div className='max-w-md w-full mx-4'>
                <div className='relative'>
                    <textarea
                        className='placeholder-gray-400 block w-full py-2 px-3 border border-gray-300 rounded-lg leading-5 bg-white shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-200 max-h-600 overflow-auto'
                        placeholder='Write here, this will autodetect your language'
                        style={{
                            minHeight: '200px',
                            maxHeight: '600px',
                            overflow: 'hidden',
                        }}
                        onInput={(e: any) => {
                            e.target.style.height = 'auto';
                            e.target.style.height =
                                e.target.scrollHeight + 'px';
                            if (e.target.scrollHeight > 600)
                                e.target.style.overflow = 'auto';
                            setValue(e.target.value);
                            setValueLength(e.target.value.length);
                        }}
                    />
                    { valueLength > 300 && <span className='absolute text-red-500'>300 characters maximum</span>}
                </div>
            </div>
        </div>
    );
};

export default InputBox;
