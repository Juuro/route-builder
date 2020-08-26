import React from 'react'
import {mount} from 'enzyme'
import App from './App'

it('App renders', () => {
    const app = mount(<App />)

    expect(app).toBeDOMComponent
})
