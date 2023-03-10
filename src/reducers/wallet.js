import {
  DELETE_EXPENSE,
  EDITED_EXPENSES,
  EDIT_EXPENSE,
  SEND_CURRENCIES_IDS,
  SEND_EXPENSE } from '../actions';

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

  if (action.type === SEND_EXPENSE) {
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });
  }

  if (action.type === DELETE_EXPENSE) {
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });
  }

  if (action.type === EDIT_EXPENSE) {
    return ({
      ...state,
      editor: true,
      idToEdit: action.payload,
    });
  }

  if (action.type === EDITED_EXPENSES) {
    return ({
      ...state,
      editor: false,
      expenses: action.payload,
    });
  }
  return state;
};

export default wallet;
