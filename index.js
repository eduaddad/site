async function handleEvent(event) {
  const response = await getAssetFromKV(event)
  return new HTMLRewriter().on("[data-i18n-key]", new ElementHandler()).transform(response)
}
