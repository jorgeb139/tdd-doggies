import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import "./languageSelector.css"

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguageName, setSelectedLanguageName] = useState('English');
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  const changeLanguage = (lang) => {
    const selected = languages.find(language => language.code === lang); 
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setSelectedLanguageName(selected.name); 
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="language_selector_container">
      <div className="current-language--label">
        {t('selectedLanguage')}
      </div>
      <div className={`language_selector ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="language_selector-input">{selectedLanguageName}</div> 
          {isOpen && (
            <div className="languages_options_container">
              <div className={`languages_options ${isOpen ? 'active' : ''}`}>
                {languages.map((lang) => (
                  <div key={lang.code} onClick={() => changeLanguage(lang.code)}>
                    {lang.name}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
