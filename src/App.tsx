import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Main from './pages/Main';

function App() {
    return (
        <div className='flex justify-center main-container'>
            <Main />
        </div>
    );
}

export default App;
