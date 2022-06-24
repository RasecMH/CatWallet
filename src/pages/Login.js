import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendLoginData } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(sendLoginData(email));
    history.push('/wallet');
  }

  handleChange = ({ target }) => {
    const { type, value } = target;
    this.setState({ [type]: value });
  }

  render() {
    const passwordMinLength = 6;
    const { email, password } = this.state;
    console.log(!email.includes('@'));
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            minLength="6"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ !(email.includes('@') && password.length >= passwordMinLength) }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
