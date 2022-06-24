// Coloque aqui suas actions
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const SEND_WALLET_DATA = 'SEND_WALLET_DATA';

export const sendLoginData = (loginData) => ({
  type: SEND_LOGIN_DATA,
  payload: loginData,
});

export const sendWalletData = (walletData) => ({
  type: SEND_WALLET_DATA,
  payload: walletData,
});
