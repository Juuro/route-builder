import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'

import Waypoint from './waypoint'

describe('Waypoint', () => {
    let store = {}

    const mockGetLatLng = jest.fn(() => ({lat: 46.765432, lng: 13.987654}))
    const mockRemoveFrom = jest.fn()
    const mockStore = {map: {}}
    const marker = {id: 1, marker: {getLatLng: mockGetLatLng, removeFrom: mockRemoveFrom}}

    beforeEach(() => {
        store = configureStore()(mockStore)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    const WaypointComponent = () => <Provider store={store}><Waypoint waypoint={marker} moveWaypoint={jest.fn()} setDragElement={jest.fn()} /></Provider>

    describe('remove waypoint', () => {
        it('remove', () => {
            const component = mount(<WaypointComponent />)
            const deleteButton = component.find('.waypoint-delete')

            deleteButton.simulate('click')

            expect(store.getActions()).toEqual([{"payload": 1, "type": "REMOVE_MARKER"}])
        })
    })
})
