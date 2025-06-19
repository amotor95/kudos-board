import './ToggleSwitch.css'
import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const handleTheme = (checked) => {
        if (checked) {
            document.documentElement.style.setProperty('--background-color', 'black');
            document.documentElement.style.setProperty('--text-color', 'white');
        } else {
            document.documentElement.style.setProperty('--background-color', 'white');
            document.documentElement.style.setProperty('--text-color', 'black');
        }
        setIsDarkMode(checked);
    }
    return(
        <DarkModeSwitch className='theme-switch-button' onChange={handleTheme} checked={isDarkMode} />
    )
}
export default ThemeSwitch