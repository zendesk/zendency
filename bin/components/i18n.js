// Dependencies
const https = require('https')
const fs    = require('fs')

// Flatten object
const flatten = (obj, list = {}, prepend = '') => {

  Object.keys(obj).forEach(attribute => {
    const value = obj[attribute]

    if (typeof value === 'string') {
      list[prepend + attribute] = value
    } else {
      flatten(value, list, `${prepend + attribute}.`)
    }

  })

  return list

}

// Create https request and trigger callback on complete
const request = (master, path, lang = 'en') => {

  const url  = `https://support.zendesk.com/api/v2/locales/${lang}.json?include=translations&strings=${path}`

  https.get(url, response => {

    // Get status code
    const statusCode = response.statusCode

    // Check status code and consume response data to free up memory
    if (statusCode !== 200) {
      response.resume()
    }

    // Collect data chunks
    let data = ''
    response.on('data', chunk => data += chunk)
    response.on('end', () => {
      const json = JSON.parse(data)
      const translations = json.locale.translations

      // Strings
      const strings = flatten(translations)

      Object.keys(strings).forEach(attr => {
        const regex = new RegExp(attr, 'g');
        master = master.replace(regex, strings[attr], 'g')
      })

      fs.writeFile(`${lang}.json`, master, error => {
          if (error) throw error;
          console.log(`${lang} created`);
      });
    })

  }).on('error', (error) => {
    throw error
  })

}

languages = [{

  language: 'Afrikaans',
  locale: 'af'

}, {

  language: 'Albanian',
  locale: 'sq'

}, {

  language: 'Arabic',
  locale: 'ar'

}, {

  language: 'Azerbaijani',
  locale: 'az'

}, {

  language: 'Basque',
  locale: 'eu'

}, {

  language: 'Brazilian Portuguese',
  locale: 'pt-BR'

}, {

  language: 'Bulgarian',
  locale: 'bg'

}, {

  language: 'Catalan',
  locale: 'ca'

}, {

  language: 'Croatian',
  locale: 'hr'

}, {

  language: 'Czech',
  locale: 'cs'

}, {

  language: 'Danish',
  locale: 'da'

}, {

  language: 'Dutch',
  locale: 'nl'

}, {

  language: 'English',
  locale: 'en'

}, {

  language: 'English',
  locale: 'en-US'

}, {

  language: 'English (Canada)',
  locale: 'en-CA'

}, {

  language: 'English (GB)',
  locale: 'en-GB'

}, {

  language: 'Estonian',
  locale: 'et'

}, {

  language: 'Filipino',
  locale: 'fil'

}, {

  language: 'Finnish',
  locale: 'fi'

}, {

  language: 'French',
  locale: 'fr'

}, {

  language: 'French (Canada)',
  locale: 'fr-CA'

}, {

  language: 'French (France)',
  locale: 'fr-FR'

}, {

  language: 'Georgian',
  locale: 'ka'

}, {

  language: 'German',
  locale: 'de'

}, {

  language: 'Greek',
  locale: 'el'

}, {

  language: 'Hebrew',
  locale: 'he'

}, {

  language: 'Hindi',
  locale: 'hi'

}, {

  language: 'Hungarian',
  locale: 'hu'

}, {

  language: 'Icelandic',
  locale: 'is'

}, {

  language: 'Indonesian',
  locale: 'id'

}, {

  language: 'Italian',
  locale: 'it'

}, {

  language: 'Japanese',
  locale: 'ja'

}, {

  language: 'Korean',
  locale: 'ko'

}, {

  language: 'Kurdish',
  locale: 'ku'

}, {

  language: 'Latvian',
  locale: 'lv'

}, {

  language: 'Lithuanian',
  locale: 'lt'

}, {

  language: 'Malay',
  locale: 'ms'

}, {

  language: 'Norwegian',
  locale: 'no'

}, {

  language: 'Pashto',
  locale: 'ps'

}, {

  language: 'Persian',
  locale: 'fa'

}, {

  language: 'Polish',
  locale: 'pl'

}, {

  language: 'Portuguese',
  locale: 'pt'

}, {

  language: 'Romanian',
  locale: 'ro'

}, {

  language: 'Russian',
  locale: 'ru'

}, {

  language: 'Serbian',
  locale: 'sr'

}, {

  language: 'Serbian (Montenegro)',
  locale: 'sr-ME'

}, {

  language: 'Simplified Chinese',
  locale: 'zh-CN'

}, {

  language: 'Slovakian',
  locale: 'sk'

}, {

  language: 'Slovenian',
  locale: 'sl'

}, {

  language: 'Spanish',
  locale: 'es'

}, {

  language: 'Spanish (LATAM)',
  locale: 'es-419'

}, {

  language: 'Spanish (Mexico)',
  locale: 'es-MX'

}, {

  language: 'Spanish (Spain)',
  locale: 'es-ES'

}, {

  language: 'Swedish',
  locale: 'sv'

}, {

  language: 'Thai',
  locale: 'th'

}, {

  language: 'Traditional Chinese',
  locale: 'zh-TW'

}, {

  language: 'Turkish',
  locale: 'tr'

}, {

  language: 'Ukrainian',
  locale: 'uk'

}, {

  language: 'Urdu',
  locale: 'ur'

}, {

  language: 'Vietnamese',
  locale: 'vi'

}]

module.exports = (master, root) => {

  languages.forEach(item => {
    fs.readFile(master, 'utf8', (error, data) => {
        if (error) throw error
        request(data, root, item.locale)
    })
  })

}
