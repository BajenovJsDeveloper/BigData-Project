import axios from 'axios'

const KEY = process.env.REACT_APP_IEXCLOUD_KEY || 'some_public_KEY'
const URL = 'https://cloud.iexapis.com/stable/stock/'

if (!process.env.REACT_APP_IEXCLOUD_KEY) console.warn('.ENV File not loaded, plase check it!')

export async function getCompanyData(companyName) {
  const config = { 
    method: 'get',
    url: `${URL}${companyName}/quote?token=${KEY}`,
  }  
  try {
    const res = await axios(config)
    return res.data
  } catch (err) {
    return {}
  }
}

export async function getChartData(companyName, range) {
  const config = { 
    method: 'get',
    url: `${URL}${companyName}/chart/${range.range}?${range.isOneDay ? '' : 'chartCloseOnly=true&'}token=${KEY}`,
  }  
  try {
    const res = await axios(config)
    return { data: res.data }
  } catch (err) {
    return { data: null, message: err.message }
  }
}
