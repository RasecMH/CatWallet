import { SEND_LOGIN_DATA } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === SEND_LOGIN_DATA) {
    return ({
      ...state,
      email: action.payload,
    });
  }

  return state;
};

export default userReducer;
