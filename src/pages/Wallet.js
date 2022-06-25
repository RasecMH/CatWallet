import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesIds } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesIds());
  }

  render() {
    const { user: { email }, wallet: { currencies } } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <main>
          <input type="number" data-testid="value-input" />
          <input type="text" data-testid="description-input" />
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
              {currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  user: globalState.user,
  wallet: globalState.wallet,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  wallet: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
