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
            store.getState().dragWaypoint = {id: 3}
            const component = mount(<SidebarComponent />)
            const waypoint = component.find('.waypoint').first()
            waypoint.simulate('dragstart')
            waypoint.simulate('dragenter')
            act(() => {
                jest.runOnlyPendingTimers()
            })

            expect(waypoint.html()).toContain('dragging')

            const [{type: addDragWaypointActionType}] = store.getActions()
            expect(addDragWaypointActionType).toEqual('ADD_DRAG_WAYPOINT')

            waypoint.simulate('dragover')
            waypoint.simulate('dragend')

            expect(waypoint.html()).not.toContain('dragging')

            const [, {type: replaceMarkersActionType}] = store.getActions()
            expect(replaceMarkersActionType).toEqual('REPLACE_MARKERS')
        })

        it('should drag waypoint if it doesnt get moved', () => {
            store.getState().markers = markers
            store.getState().dragWaypoint = {id: 1}
            const component = mount(<SidebarComponent />)
            const waypoint = component.find('.waypoint').first()
            waypoint.simulate('dragstart')
            waypoint.simulate('dragenter')
            act(() => {
                jest.runOnlyPendingTimers()
            })

            expect(waypoint.html()).toContain('dragging')

            const [{type: addDragWaypointActionType}] = store.getActions()
            expect(addDragWaypointActionType).toEqual('ADD_DRAG_WAYPOINT')

            waypoint.simulate('dragover')
            waypoint.simulate('dragend')

            expect(waypoint.html()).not.toContain('dragging')
            expect(store.getActions()[1]).toBeUndefined()
        })
    })

    describe('Button', () => {
        it('should render button if there are markers', () => {
            store.getState().markers = markers
            const component = mount(<SidebarComponent />)
            const DownloadGPXButton = component.find('button')

            expect(DownloadGPXButton.text()).toEqual('Download your Route')
            expect(DownloadGPXButton.length).toEqual(1)
        })

        it('should not render button if there are no markers', () => {
            store.getState().markers = []
            const component = mount(<SidebarComponent />)
            const DownloadGPXButton = component.find('button')

            expect(DownloadGPXButton.length).toEqual(0)
        })
    })
})
