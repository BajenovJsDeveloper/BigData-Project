export const formatNumberToLoclae = (num, currency) => {
  console.log('Cur:', currency)
  return new Intl.NumberFormat('en-US',
  {
    style: "currency",
    currency: currency || 'USD',
    minimumFractionDigits: 0
  }
  ).format(num || 0)
}