import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />

        <div
            className='absolute flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 top-0'
            style={{right: '40%'}}
            role='alert'
        >
            <div className='ml-3 text-sm font-normal'>Set yourself free.</div>
        </div>
    </React.StrictMode>
);
