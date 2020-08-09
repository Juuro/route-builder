import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import {act} from 'react-dom/test-utils'

import Map from './map'

describe('Map', () => {
    let store = {}

    const mockGetLatLng = jest.fn(() => ({lat: 46.765432, lng: 13.987654}))
    const markers = [
        {id: 1, marker: {getLatLng: mockGetLatLng}},
        {id: 2, marker: {getLatLng: mockGetLatLng}},
        {id: 3, marker: {getLatLng: mockGetLatLng}},
        {id: 4, marker: {getLatLng: mockGetLatLng}},
    ]
    const mockStore = {map: {}, markers: []}

    beforeEach(() => {
        store = configureStore()(mockStore)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Leaflet map', () => {
        it('should initialise map without markers', () => {
            const MapComponent = () => <Provider store={store}><Map /></Provider>

            mount(<MapComponent />)

            const [{type: actionType}] = store.getActions()
            expect(actionType).toEqual('ADD_MAP')
        })

        it('should initialise map with markes', () => {
            store.getState().markers = markers
            const MapComponent = () => <Provider store={store}><Map /></Provider>
            mount(<MapComponent />)

            const [{payload: map}] = store.getActions()

            act(() => {
                map.fireEvent('click', {latlng: {lat: 48.765432, lng: 11.987654}})
            })

            const [, {type: actionType}] = store.getActions()
            expect(actionType).toEqual('ADD_MARKERS')
        })
    })
})
