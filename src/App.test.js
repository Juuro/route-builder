import React from 'react'
import {mount} from 'enzyme'
import App from './App'

it('Appp renders', () => {
    const app = mount(<App />)

    expect(app).toBeDOMComponent
})
