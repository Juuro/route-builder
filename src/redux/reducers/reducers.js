const initialState = {
    moep: true,
    markers: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MARKERS': {
            return {...state, markers: [...state.markers, {id: state.markers.length+1, marker: action.payload}]}
        }
        case 'REPLACE_MARKERS': {
            return {...state, markers: [...action.payload]}
        }
        default: {
            return state
        }
    }
}

export default reducer
