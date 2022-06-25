import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesExpense, getCurrenciesIds } from '../actions';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesIds());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { dispatch, wallet: { expenses } } = this.props;
    const stateWithId = { id: expenses.length, ...this.state };
    dispatch(getCurrenciesExpense(stateWithId));
    this.setState({ value: '' });
  }

  getTotalExpensesValue = () => {
    const { wallet: { expenses } } = this.props;
    return expenses.map((expense) => (
      expense.exchangeRates[expense.currency].ask * expense.value))
      .reduce((acc, current) => acc + current, 0);
  }

  render() {
    const { user: { email }, wallet: { currencies } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.getTotalExpensesValue().toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <main>
          <input
            name="value"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
          <input
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
          <label htmlFor="moeda">
            Moeda
            <select
              name="currency"
              id="moeda"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
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
