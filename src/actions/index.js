import fetchCurrenciesApi from '../helpers';

// Coloque aqui suas actions
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const SEND_WALLET_DATA = 'SEND_WALLET_DATA';
export const SEND_CURRENCIES_IDS = 'SEND_CURRENCIES_IDS';
export const SEND_EXPENSE = 'SEND_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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

export const sendExpenses = (expense, currencies) => ({
  type: SEND_EXPENSE,
  payload: { ...expense, exchangeRates: { ...currencies } },
});

export const getCurrenciesExpense = (expense) => async (dispatch) => {
  const response = await fetchCurrenciesApi();
  dispatch(sendExpenses(expense, response));
};

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: Number(expenseId),
});
