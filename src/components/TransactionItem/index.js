// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionHistoryListDetails, deleteHistory} = props
  const {id, title, amount, type} = transactionHistoryListDetails

  const onDeleteHistory = () => {
    deleteHistory(id)
  }

  return (
    <li className="item">
      <p className="text">{title}</p>
      <p className="text">Rs {amount}</p>
      <p className="text">{type}</p>
      <div className="del-container">
        <button
          type="button"
          data-testid="delete"
          onClick={onDeleteHistory}
          className="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
