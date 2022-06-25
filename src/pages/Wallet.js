import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteExpense,
  editExpense,
  getCurrenciesExpense,
  getCurrenciesIds,
  sendEditedExpenses } from '../actions';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
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
    const stateWithId = { ...this.state, id: expenses.length };
    dispatch(getCurrenciesExpense(stateWithId));
    this.setState({ value: '' });
  }

  getTotalExpensesValue = () => {
    const { wallet: { expenses } } = this.props;
    return expenses.map((expense) => (
      expense.exchangeRates[expense.currency].ask * expense.value))
      .reduce((acc, current) => acc + current, 0);
  }

  handleDeleteBtn = ({ target: { name } }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(name));
  }

  handleEditBtn = ({ target: { name } }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(name));
    const { wallet: { expenses } } = this.props;
    this.setState({
      id: expenses[name].id,
      value: expenses[name].value,
      description: expenses[name].description,
      currency: expenses[name].currency,
      method: expenses[name].method,
      tag: expenses[name].tag,
      exchangeRates: expenses[name].exchangeRates,
    });
  }

  handleEditExpanseBtn = () => {
    const { dispatch, wallet: { expenses, idToEdit } } = this.props;
    const newExpenses = [...expenses];
    newExpenses.splice(idToEdit, 1, this.state);
    dispatch(sendEditedExpenses(newExpenses));
    this.setState({ value: '', description: '' });
  }

  render() {
    const { user: { email }, wallet: { currencies, expenses, editor } } = this.props;
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
          {
            editor
              ? (
                <button
                  type="button"
                  onClick={ this.handleEditExpanseBtn }
                >
                  Editar despesa

                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              )
          }
        </main>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (expense.exchangeRates[expense.currency].ask * expense.value)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    name={ expense.id }
                    data-testid="edit-btn"
                    onClick={ this.handleEditBtn }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    name={ expense.id }
                    data-testid="delete-btn"
                    onClick={ this.handleDeleteBtn }
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          }
        </table>
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
