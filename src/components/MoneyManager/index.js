import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    amountInput: '',
    titleInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionHistoryList: [],
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  deleteHistory = id => {
    const {transactionHistoryList} = this.state

    const filterList = transactionHistoryList.filter(each => each.id !== id)
    this.setState({transactionHistoryList: filterList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {amountInput, titleInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )

    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionHistoryList: [
        ...prevState.transactionHistoryList,
        newTransaction,
      ],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getIncome = () => {
    const {transactionHistoryList} = this.state
    let incomeAmount = 0

    transactionHistoryList.forEach(eachTran => {
      if (eachTran.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTran.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionHistoryList} = this.state
    let expensesAmount = 0

    transactionHistoryList.forEach(eachTran => {
      if (eachTran.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTran.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionHistoryList} = this.state
    let expensesAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    transactionHistoryList.forEach(eachTran => {
      if (eachTran.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTran.amount
      } else {
        expensesAmount += eachTran.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {
      amountInput,
      titleInput,
      optionId,
      transactionHistoryList,
    } = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <div className="top-name-container">
            <h1 className="top-name">Hi, Richard</h1>
            <p className="top-wel">
              Welcome back to your
              <span className="top-wel-money">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="trans-heading">Add Transaction</h1>
              <label htmlFor="title-label" className="label">
                TITLE
              </label>
              <input
                id="title-label"
                type="text"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                className="input"
              />
              <label htmlFor="amount-label" className="label">
                AMOUNT
              </label>
              <input
                id="amount-label"
                type="text"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                className="input"
              />
              <label htmlFor="type-label" className="label">
                TYPE
              </label>
              <select
                className="input"
                id="type-label"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <div className="history-transaction">
              <h1 className="trans-heading">History</h1>
              <div className="table-container">
                <ul className="transaction-table">
                  <li className="table-header">
                    <p className="column-text">Title</p>
                    <p className="column-text">Amount</p>
                    <p className="column-text">Type</p>
                  </li>

                  {transactionHistoryList.map(eachTransaction => (
                    <TransactionItem
                      transactionHistoryListDetails={eachTransaction}
                      key={eachTransaction.id}
                      deleteHistory={this.deleteHistory}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Write your code here
export default MoneyManager
