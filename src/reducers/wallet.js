import { SEND_CURRENCIES_IDS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  if (action.type === SEND_CURRENCIES_IDS) {
    return ({
      ...state,
      currencies: action.payload,
    });
  }

  return state;
};

export default wallet;
