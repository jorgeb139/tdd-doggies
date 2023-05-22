import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './darkModeSelector.css'
import { useThemeContext } from '../../context/ThemeContext';
export const DarkModeSelector = () => {
  const [darkmode, setDarkmode] = useState(localStorage.getItem('theme') === 'Dark');
  const {contextTheme, setContextTheme} = useThemeContext()
  const { t } = useTranslation();

  const handleChange = () => {
    setContextTheme((state) => (state === 'Light' ? 'Dark' : 'Light'))
    setDarkmode(!darkmode);
  }
  localStorage.setItem('theme', contextTheme);

  return (
    <div className='darkmode_container'>
        <p className='lightmode-text'>{t('LightMode')}</p>
        <label className='darkmode_label'>
          <input className='darkmode-input' type="checkbox" onClick={handleChange} defaultChecked={darkmode} />
          <span className='darkmode-span'></span>
        </label>
        <p className='darkmode-text'>{t('DarkMode')}</p>
    </div>
  )
}
