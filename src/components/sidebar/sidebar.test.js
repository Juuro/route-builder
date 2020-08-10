import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import {act} from 'react-dom/test-utils'

import Sidebar from './sidebar'

describe('Sidebar', () => {
    URL.createObjectURL = jest.fn()

    let store = {}

    const mockGetLatLng = jest.fn(() => ({lat: 46.765432, lng: 13.987654}))
    const mockStore = {}
    const markers = [
        {id: 1, marker: {getLatLng: mockGetLatLng}},
        {id: 2, marker: {getLatLng: mockGetLatLng}},
        {id: 3, marker: {getLatLng: mockGetLatLng}},
        {id: 4, marker: {getLatLng: mockGetLatLng}},
    ]

    beforeEach(() => {
        store = configureStore()(mockStore)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    const SidebarComponent = () => <Provider store={store}><Sidebar /></Provider>

    describe('Waypoint', () => {
        jest.useFakeTimers()

        it('should drag waypoint if it gets moved', () => {
            store.getState().markers = markers
            const component = mount(<SidebarComponent />)
            const waypoint = component.find('.waypoint').first()
            waypoint.simulate('dragstart')
            waypoint.simulate('dragenter')
            act(() => {
                jest.runOnlyPendingTimers()
            })

            expect(waypoint.html()).toContain('dragging')

            waypoint.simulate('dragover')
            waypoint.simulate('dragend')

            expect(waypoint.html()).not.toContain('dragging')
        })
    })
})
