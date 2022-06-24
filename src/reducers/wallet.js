import { SEND_WALLET_DATA } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  if (action.type === SEND_WALLET_DATA) {
    return ({
      ...state,
      currencies: action.payload.currencies,
    });
  }

  return state;
};

export default wallet;
