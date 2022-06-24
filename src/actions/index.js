import fetchCurrenciesApi from '../helpers';

// Coloque aqui suas actions
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const SEND_WALLET_DATA = 'SEND_WALLET_DATA';
export const SEND_CURRENCIES_IDS = 'SEND_CURRENCIES_IDS';

export const sendLoginData = (loginData) => ({
  type: SEND_LOGIN_DATA,
  payload: loginData,
});

export const sendWalletData = (walletData) => ({
  type: SEND_WALLET_DATA,
  payload: walletData,
});

export const sendCurrenciesIds = (currenciesId) => ({
  type: SEND_CURRENCIES_IDS,
  payload: currenciesId.filter((id) => id !== 'USDT'),
});

export const getCurrenciesIds = () => async (dispatch) => {
  const response = await fetchCurrenciesApi();
  const currenciesIds = Object.keys(response);
  dispatch(sendCurrenciesIds(currenciesIds));
};
