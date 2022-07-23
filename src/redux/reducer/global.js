const initGlobalState = {
    isLoading: false,
    keyboard: false,
    updateMsg: '',
    refreshGasHome: 0,
    refreshCostumers: 0,
    refreshGasList: 0,
    imageUri: '',
    imageModal: false
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
    if (action.type === 'REFRESH_GAS_HOME') {
        return {
            ...state,
            refreshGasHome: state.refreshGasHome + 1
        }
    }
    if (action.type === 'REFRESH_COSTUMERS') {
        return {
            ...state,
            refreshCostumers: state.refreshCostumers + 1
        }
    }
    if (action.type === 'REFRESH_GAS_LIST') {
        return {
            ...state,
            refreshGasList: state.refreshGasList + 1
        }
    }
    if (action.type === 'SET_IMAGE_URI') {
        return {
            ...state,
            imageUri: action.value
        }
    }
    if (action.type === 'SET_IMAGE_MODAL') {
        return {
            ...state,
            imageModal: action.value
        }
    }
    return state
}