// ** React Imports
import { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '../../../assets/locales/en.json'
import messagesDe from '../../../assets/locales/de.json'
import messagesFr from '../../../assets/locales/fr.json'
import messagesPt from '../../../assets/locales/pt.json'

// ** User Language Data
import userMessagesEn from '../../../assets/locales/en.json'
import userMessagesDe from '../../../assets/locales/de.json'
import userMessagesFr from '../../../assets/locales/fr.json'
import userMessagesPt from '../../../assets/locales/pt.json'

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn, ...userMessagesEn },
  de: { ...messagesDe, ...userMessagesDe },
  fr: { ...messagesFr, ...userMessagesFr },
  pt: { ...messagesPt, ...userMessagesPt }
}

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState(menuMessages['en'])

  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='en'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
