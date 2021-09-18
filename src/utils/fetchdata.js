import axios from 'axios'

const KEY = 'pk_4323df58e0444048b31b91978d500870'
const URL = 'https://cloud.iexapis.com/stable/stock/'

export async function getCompanyData(companyName) {
  const config = { method: 'get' }
  config.url = `${URL}${companyName}/quote?token=${KEY}`
  try {
    const res = await axios(config)
    return res.data
  } catch {
    return {}
  }
}

export async function getChartData(companyName, range) {
  const config = { method: 'get' }
  config.url = `${URL}${companyName}/chart/${range.range}?${
    range.isOneDay ? '' : 'chartCloseOnly=true&'
  }token=${KEY}`
  try {
    const res = await axios(config)
    return { data: res.data }
  } catch (err) {
    return { data: null, message: err.message }
  }
}
