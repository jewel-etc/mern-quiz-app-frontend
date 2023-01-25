
import { useState,useEffect } from 'react';
export const useAddForm = () => {

   

    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(()=>{

        setOpenAddForm(false)

    },[])
    
    const openAddFormHandler = () => {
        setOpenAddForm(true);
    }

    const closeAddFormHandler = () => {
        setOpenAddForm(false);
    }

    return [openAddForm,openAddFormHandler,closeAddFormHandler];


}