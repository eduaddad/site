import { getAssetFromKV, defaultKeyModifier } from "@cloudflare/kv-asset-handler"
import parser from "accept-language-parser"

const DEBUG = false

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event))
})

const strings = {
  en: {
    title: "EDUARDO'S WEBSITE",
    headline: "Translator, Wikis Editor, Programmer",
    home: "Home",
    contact: "Contact",
  },
}

class ElementHandler {
  constructor(countryStrings) {
    this.countryStrings = countryStrings
  }

  element(element) {
    const i18nKey = element.getAttribute("data-i18n-key")
    if (i18nKey) {
      const translation = this.countryStrings[i18nKey]
      if (translation) {
        element.setInnerContent(translation)
      }
    }
  }
}

async function handleEvent(event) {
  const url = new URL(event.request.url)
  try {
    let options = {}
    if (DEBUG) {
      options = {
        cacheControl: {
          bypassCache: true,
        },
      }
    }
    const languageHeader = event.request.headers.get("Accept-Language")
    const language = parser.pick(["de"], languageHeader)
    const countryStrings = strings[language] || {}

    const response = await getAssetFromKV(event, options)

    return new HTMLRewriter().on("[data-i18n-key]", new ElementHandler(countryStrings)).transform(response)
  } catch (e) {
    if (DEBUG) {
      return new Response(e.message || e.toString(), {
        status: 404,
      })
    } else {
      return new Response(`"${defaultKeyModifier(url.pathname)}" not found`, {
        status: 404,
      })
    }
  }
}
