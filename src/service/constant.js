const  APP_HOST = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_HOST : window.location.origin
const  APP_PORT = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PORT : 80

const baseUrl = `${APP_HOST}:${APP_PORT}`
const apiPrefix = 'api'
const apiBuild = resource => [baseUrl, apiPrefix, resource].join('/')

export const API = {
  fetchQRCode: apiBuild('auth?qr_code='),
  contracts: apiBuild('contracts'),
  register: apiBuild('register'),
  relayers: apiBuild('relayers'),
}

export const SITE_MAP = {
  Authentication: '/login',
  Home: '/',
  Orders: '/orders',
  Relayers: '/relayers',
  Registration: '/register',
  Dashboard: '/dashboard',
}

export const ALERT = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}

export const UNLOCK_WALLET_METHODS = {
  TomoWallet: 'TomoWallet',
  LedgerWallet: 'LedgerWallet',
  TrezorWallet: 'TrezorWallet',
  BrowserWallet: 'MetaMask/TrustWallet/MidasWallet',
}


export const I18N_LANGS = [
  { value: 'en', label: 'EN' },
  { value: 'vn', label: 'VN' },
  { value: 'jp', label: 'JP' }
]
