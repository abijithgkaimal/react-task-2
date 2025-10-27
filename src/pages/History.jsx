import React from 'react'

function History() {
  return (
    <div>
        <h3 className="text-center mb-3">Transaction</h3>
        <ul className="list-group">
          {transactions.length > 0 ? (
            transactions.slice(0).reverse().map((transaction) => (
              <li
                key={transaction.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  transaction.type === 'income' ? 'border-success' : 'border-danger'
                }`}
              >
                {transaction.description}
                <div>
                  <span className={`fw-bold text-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm ms-3"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-muted">No transactions yet.</p>
          )}
        </ul>
      </div>
  )
}

export default History