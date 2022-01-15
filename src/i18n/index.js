import { createI18n } from 'vue-i18n'

import datetimes from './formats/datetimes.json'
import numbers from './formats/numbers.json'

const defaultLocale = 'en'
const availableLocales = ['en', 'fr']

const getLocale = () => {
  const locale = (localStorage.getItem('lang') || navigator.language || navigator.userLanguage || defaultLanguage).substring(0, 2)
  if (availableLocales.includes(locale)) {
    localStorage.setItem('lang', locale)
    return locale
  }
  else {
    return defaultLocale
  }
}

const loadLocaleMessages = () => {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: defaultLocale,
  messages: loadLocaleMessages(),
  datetimeFormats: datetimes,
  numberFormats: numbers
})
