import { toast, TypeOptions } from 'react-toastify';


export const showToast = (msg: string, type: TypeOptions) => {
    toast(msg, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
        type: type
    }); 
}