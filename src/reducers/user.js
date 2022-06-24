import { SEND_LOGIN_DATA } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_USER_STATE = {
  email: '',
};

const user = (state = INITIAL_USER_STATE, action) => {
  if (action.type === SEND_LOGIN_DATA) {
    return ({
      ...state,
      email: action.payload,
    });
  }

  return state;
};

export default user;
