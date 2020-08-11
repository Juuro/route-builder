import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import {act} from 'react-dom/test-utils'
import mockGeolocation from 'mock-geolocation'

import Map from './Map'

describe('Map', () => {
    let store = {}

    const mockGetLatLng = jest.fn(() => ({lat: 46.765432, lng: 13.987654}))
    const markers = [
        {id: 1, marker: {getLatLng: mockGetLatLng}},
        {id: 3, marker: {getLatLng: mockGetLatLng}},
        {id: 2, marker: {getLatLng: mockGetLatLng}},
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

        it('should initialise map without geolocation available', () => {
            global.navigator = {}
            const MapComponent = () => <Provider store={store}><Map /></Provider>

            mount(<MapComponent />)

            const [{payload: actionPayload}] = store.getActions()
            expect(actionPayload.getCenter()).toEqual({lat: 46.378333, lng: 13.836667})
        })

        it('should initialise map with geolocation', () => {
            mockGeolocation.use()
            const MapComponent = () => <Provider store={store}><Map /></Provider>

            mount(<MapComponent />)
            mockGeolocation.send({
                latitude: 50,
                longitude: 10,
                accuracy: 5,
                timestamp: 3000,
            })

            const [{payload: actionPayload}] = store.getActions()
            expect(actionPayload.getCenter()).toEqual({lat: 50, lng: 10})
        })

        it('should initialise map with geolocation error', () => {
            mockGeolocation.use()
            const MapComponent = () => <Provider store={store}><Map /></Provider>

            mount(<MapComponent />)
            mockGeolocation.sendError()

            const [{payload: actionPayload}] = store.getActions()
            expect(actionPayload.getCenter()).toEqual({lat: 46.378333, lng: 13.836667})
        })

    })

    describe('Leaflet map click', () => {
        it('should create new marker if thre are already some markers', () => {
            store.getState().markers = markers
            const MapComponent = () => <Provider store={store}><Map /></Provider>
            mount(<MapComponent />)

            const [{payload: map}] = store.getActions()

            act(() => {
                map.fireEvent('click', {latlng: {lat: 48.765432, lng: 11.987654}})
            })

            const [, {type: actionType}] = store.getActions()
            const [, {payload: marker}] = store.getActions()
            expect(actionType).toEqual('ADD_MARKERS')
            expect(marker.id).toEqual(5)
        })

        it('should create new marker if thre are no markers yet', () => {
            store.getState().markers = []
            const MapComponent = () => <Provider store={store}><Map /></Provider>
            mount(<MapComponent />)
            const [{payload: map}] = store.getActions()

            act(() => {
                map.fireEvent('click', {latlng: {lat: 48.765432, lng: 11.987654}})
            })

            const [, {type: actionType}] = store.getActions()
            const [, {payload: marker}] = store.getActions()
            expect(actionType).toEqual('ADD_MARKERS')
            expect(marker.id).toEqual(1)
        })
    })

    describe('Leaflet marker move', () => {
        it('should set newMarkerPosition', () => {
            store.getState().markers = []
            const MapComponent = () => <Provider store={store}><Map /></Provider>
            const component = mount(<MapComponent />)
            const [{payload: map}] = store.getActions()
            act(() => {
                map.fireEvent('click', {latlng: {lat: 46.378333, lng: 13.836667}})
            })
            const [, {payload: marker}] = store.getActions()

            act(() => {
                marker.marker.fireEvent('move', {latlng: {lat: 48.378333, lng: 12.836667}})
            })

            expect(component.html()).toContain('left: 0px; top: 0px;')
        })
    })

})
