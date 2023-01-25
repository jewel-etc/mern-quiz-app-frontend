import { useReducer, useCallback } from 'react';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: { value: action.val }
                }

            }

        default:
            return state;
    }
}

export const useForm = (initialInputs) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        inputs: initialInputs
    })

    const changeHandler = useCallback((event, id) => {

        dispatch({
            type: 'CHANGE',
            id: id,
            val: event.target.value
        })


    }, [])

   

    return [inputState, changeHandler];

}

