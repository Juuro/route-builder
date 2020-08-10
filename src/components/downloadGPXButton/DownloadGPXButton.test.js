import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'

import DownloadGPXButton from './DownloadGPXButton'

describe('DownloadGPXButton', () => {
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

    const SidebarComponent = () => <Provider store={store}><DownloadGPXButton /></Provider>

    describe('click download button', () => {
        it('generate and download GPX file if there are any markers', () => {
            store.getState().markers = markers
            const component = mount(<SidebarComponent />)
            const downloadButton = component.find('button')

            downloadButton.simulate('click')

            expect(URL.createObjectURL).toBeCalled()
        })

        it('do nothing if there are no markers', () => {
            store.getState().markers = []
            const component = mount(<SidebarComponent />)
            const downloadButton = component.find('button')

            downloadButton.simulate('click')

            expect(URL.createObjectURL).not.toBeCalled()
        })
    })
})
