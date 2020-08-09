import React, {lazy, Suspense} from 'react'

import './App.scss'

const Map = lazy(() => import('./components/map/map'))
const Sidebar = lazy(() => import('./components/sidebar/sidebar'))
const renderLoader = () => <p>Loading</p>

const App = () => (
    <main>
        <Suspense fallback={renderLoader()}>
            <Sidebar />
            <Map />
        </Suspense>
    </main>
)

export default App
