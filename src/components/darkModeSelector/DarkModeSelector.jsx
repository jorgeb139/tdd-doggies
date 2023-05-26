import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './darkModeSelector.css'
import { useThemeContext } from '../../context/ThemeContext';
export const DarkModeSelector = () => {
  const { contextTheme, saveTheme } = useThemeContext()
  const { t } = useTranslation();

  const darkmode = contextTheme === 'Dark';

  return (
    <div className='darkmode_container'>
        <p className='lightmode-text'>{t('LightMode')}</p>
        <label className='darkmode_label'>
          <input className='darkmode-input' type="checkbox" onClick={saveTheme} defaultChecked={darkmode}/>
          <span className='darkmode-span'></span>
        </label>
        <p className='darkmode-text'>{t('DarkMode')}</p>
    </div>
  )
}
