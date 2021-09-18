export const formatNumberToLoclae = (num, currency) => {
  const lang = navigator.language
  return new Intl.NumberFormat(lang || 'en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
  }).format(num || 0)
}
