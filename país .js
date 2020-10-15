/**
 * Returns a redirect determined by the country code
 * @param {Request} request
 */
async function redirect(request) {
  // The `cf-ipcountry` header is not supported in the preview
  const country = request.headers.get("cf-ipcountry")

  if (country != null && country in countryMap) {
    const url = countryMap[country]
    return Response.redirect(url)
  }
  else {
    return await fetch(request)
  }
}
/**
 * A map of the URLs to redirect to
 * @param {Object} countryMap
 */
const countryMap = {
  US: "https://eduardoaddad.com.br/en",
  UK: "https://eduardoaddad.com.br/en",
  AU: "https://eduardoaddad.com.br/en",
  CA: "https://eduardoaddad.com.br/en",
  NZ: "https://eduardoaddad.com.br/en",
  ZA: "https://eduardoaddad.com.br/en",
  BR: "https://eduardoaddad.com.br",
  PT: "https://eduardoaddad.com.br",
  MO: "https://eduardoaddad.com.br",
  AO: "https://eduardoaddad.com.br",
  CV: "https://eduardoaddad.com.br",
  TL: "https://eduardoaddad.com.br",
  ST: "https://eduardoaddad.com.br",
  MZ: "https://eduardoaddad.com.br",
  GQ: "https://eduardoaddad.com.br",
  GW: "https://eduardoaddad.com.br",
  default: "https://eduardoaddad.com.br/en",
  EU: "https://eduardoaddad.com.br/en",
}

async function handleRequest(request) {
  return redirect(request)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
