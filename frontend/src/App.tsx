import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Main from './pages/Main';

function App() {
    return (
        <div className='flex justify-center main-container'>
            <h1 className="absolute top-4 md:top-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-500">
                <mark className="px-4 text-white bg-blue-600 rounded dark:bg-blue-500">AI</mark> Translator
            </h1>
            <Main />
            <ToastContainer />
        </div>
    );
}

export default App;
