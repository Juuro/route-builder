import React from 'react'
import {render} from '@testing-library/react'
import App from './sidebar'

describe('Sidebar', () => {
    it('renders heading', () => {
        const {getByText} = render(<App />)
        const linkElement = getByText(/Route Builder/i)
        expect(linkElement).toBeInTheDocument()
    })
})
