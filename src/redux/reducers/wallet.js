import { SEND_WALLET_DATA } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editado
};

const walletReducer = (state = INITIAL_STATE, action) => {
  if (action.type === SEND_WALLET_DATA) {
    return ({
      ...state,
      [state]: action.payload,
    });
  }

  return state;
};

export default walletReducer;
