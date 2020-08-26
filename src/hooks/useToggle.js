import {useState, useCallback} from 'react'

const useToggle = initialValue => {
    const [toggleValue, setToggleValue] = useState(initialValue)
    const toggler = useCallback(() => setToggleValue(!toggleValue), [toggleValue])

    return [toggleValue, toggler]
}

export default useToggle
