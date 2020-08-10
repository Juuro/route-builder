import reducer from './reducers'

describe('reducer', () => {
    const INITIAL_STORE = {
        map: {},
        markers: [],
    }

    const markers = [
        {id: 1, marker: {}},
        {id: 2, marker: {}},
        {id: 3, marker: {}},
        {id: 4, marker: {}},
    ]

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('with action type ADD_MARKERS should add marker to store', () => {
        const marker = {id: 5, marker: {}}
        const action = {type: 'ADD_MARKERS', payload: marker}

        const newState = reducer(INITIAL_STORE, action)

        expect(newState).toEqual({
            ...INITIAL_STORE,
            markers: [marker],
        })
    })

    it('with action type REPLACE_MARKERS should replace all markers to store', () => {
        const marker = {id: 5, marker: {}}
        const action = {type: 'REPLACE_MARKERS', payload: [marker]}

        const newState = reducer(INITIAL_STORE, action)

        expect(newState).toEqual({
            ...INITIAL_STORE,
            markers: [marker],
        })
    })

    it('with action type REMOVE_MARKER should a marker from the store', () => {
        const action = {type: 'REMOVE_MARKER', payload: 2}

        const newMarkers = [
            {id: 1, marker: {}},
            {id: 3, marker: {}},
            {id: 4, marker: {}},
        ]

        const newState = reducer({...INITIAL_STORE, markers}, action)

        expect(newState).toEqual({
            ...INITIAL_STORE,
            markers: newMarkers,
        })
    })

    it('with action type ADD_MAP should add the map to the store', () => {
        const map = {this: 'is the map object'}
        const action = {type: 'ADD_MAP', payload: map}

        const newState = reducer(INITIAL_STORE, action)

        expect(newState).toEqual({
            ...INITIAL_STORE,
            map,
        })
    })

    it('with action type ADD_DRAG_WAYPOINT should add the map to the store', () => {
        const dragWaypoint = {id: 2, this: 'is the waypoint that is dragged'}
        const action = {type: 'ADD_DRAG_WAYPOINT', payload: dragWaypoint}

        const newState = reducer(INITIAL_STORE, action)

        expect(newState).toEqual({
            ...INITIAL_STORE,
            dragWaypoint,
        })
    })

    it('with no state and unknown action should return the initial state', () => {
        const action = {type: 'UNKNOWN'}

        const newState = reducer(undefined, action)

        expect(newState).toEqual(INITIAL_STORE)
    })
})
