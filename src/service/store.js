import createStore from 'redux-zero'
import { UNLOCK_WALLET_METHODS, MISC, socketUrl } from './constant'

// NOTE: You can split initialState to multiple sub-stores when necessary
const socket = new WebSocket(socketUrl)

const initialState = {
  authStore: {
    auth: true,
    method: UNLOCK_WALLET_METHODS.TomoWallet,
    user_meta: {
      TomoWalletQRcode: '',
      TrezorPath: "m/44'/60'/0'/0",
      LedgerPath: "m/44'/889'/0'/0",
      address: 'xxx',
      balance: '',
      wallet: null,
      unlockingMethod: UNLOCK_WALLET_METHODS.TomoWallet,
    },
  },
  RelayerForm: {
    step: 0,
    relayer_meta: {
      deposit: MISC.MinimumDeposit,
    },
  },
  global: {
    lang: 'en',
  },
  toggle: {
    AddressModal: false,
    RelayerFormModal: false,
  },
  socket: socket,
}

const store = createStore(initialState)

export default store