
import '@testing-library/jest-dom/extend-expect'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

// Fix for JSDOM not supporting createSVGRect. This enables tests that involve Leaflet polylines.
const createElementNSOrig = global.document.createElementNS

window.URL.createObjectURL = () => {}
// eslint-disable-next-line func-names
global.document.createElementNS = function(namespaceURI, qualifiedName) {
    if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg'){
        const element = createElementNSOrig.apply(this, arguments)
        // eslint-disable-next-line func-names
        element.createSVGRect = function() {}
        return element
    }
    return createElementNSOrig.apply(this, arguments)
}
