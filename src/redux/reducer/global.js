const initGlobalState = {
    isLoading: false,
    keyboard: false,
    updateMsg: ''
}

export const globalReducer = (state = initGlobalState, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            isLoading: action.value
        }
    }
    if (action.type === 'SET_KEYBOARD') {
        return {
            ...state,
            keyboard: action.value
        }
    }
    if (action.type === 'SET_MSG') {
        return {
            ...state,
            updateMsg: action.value
        }
    }
    return state
}