import axios from 'axios'

const KEY = 'pk_a1025c193c844f8cb9883dd25a35135e'
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
  config.url = `${URL}${companyName}/chart/${range}?chartCloseOnly=true&token=${KEY}`
  try {
    const res = await axios(config)
    return res.data
  } catch {
    return []
  }
}