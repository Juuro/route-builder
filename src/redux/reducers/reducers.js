const initialState = {
    moep: true,
    markers: [],
}

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MARKERS': {
            return {...state, markers: [...state.markers, {id: state.markers.length+1, marker: action.payload}]}
        }
        case 'REPLACE_MARKERS': {
            return {...state, markers: [...action.payload]}
        }
        case 'REMOVE_MARKER': {
            const newState = state.markers.filter(marker => marker.id !== action.payload)
            return {...state, markers: [...newState]}
        }
        case 'ADD_MAP': {
            return {...state, map: action.payload}
        }
        default: {
            return state
        }
    }
}

export default reducer
