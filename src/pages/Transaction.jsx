import React, { useState, useEffect, useCallback } from 'react';

function Transaction() {
  // State for the list of transactions
  const [transactions, setTransactions] = useState([]);

  // State for form inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); // 'income' or 'expense'

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);

  // State for financial summary
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // Get the logged-in user's email
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  // Transaction.jsx (near top)
  const API_URL = 'https://68fef73be02b16d1753bfa69.mockapi.io/transactions';

  // Fetch transactions from the db.json server
  const fetchTransactions = useCallback(async () => {
    if (loggedInUserEmail) {
      // Filter transactions by the logged-in user's email
      const response = await fetch(`${API_URL}?userEmail=${loggedInUserEmail}`);
      const data = await response.json();
      setTransactions(data);
    }
  }, [loggedInUserEmail]);

  // Load transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Recalculate summary whenever transactions change
  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    const transactionData = {
      description,
      amount: parseFloat(amount),
      type,
      userEmail: loggedInUserEmail,
    };

    if (isEditing) {
      // Update existing transaction
      await fetch(`${API_URL}/${currentTransactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      setIsEditing(false);
      setCurrentTransactionId(null);
    } else {
      // Add new transaction
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
    }

    // Refresh transactions and clear form
    fetchTransactions();
    setDescription('');
    setAmount('');
    setType('income');
  };

  const handleDeleteTransaction = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    // Refresh transactions from server
    fetchTransactions();
  };

  const handleEditClick = (transaction) => {
    setIsEditing(true);
    setCurrentTransactionId(transaction.id);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setType(transaction.type);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTransactionId(null);
    setDescription('');
    setAmount('');
    setType('income');
  };

  if (!loggedInUserEmail) {
    return (
      <div className="container text-center mt-5">
        <h2>Please log in to view your transactions.</h2>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Transactions</h2>

      {/* Summary Cards */}
      <div className="row justify-content-center text-center mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Income</div>
            <div className="card-body">
              <h4 className="card-title">${totalIncome.toFixed(2)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Total Expense</div>
            <div className="card-body">
              <h4 className="card-title">${totalExpense.toFixed(2)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Current Balance</div>
            <div className="card-body">
              <h4 className="card-title">${balance.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Transaction Form */}
      <div className="card p-4 mb-5 shadow-sm">
        <h3 className="text-center">{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="e.g., Salary, Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <select
              className="form-select"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-center mb-3">Transaction History</h3>
        <ul className="list-group">
          {transactions.length > 0 ? (
            transactions.slice(0).reverse().map((transaction) => (
              <li
                key={transaction.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${transaction.type === 'income' ? 'border-success' : 'border-danger'
                  }`}
              >
                {transaction.description}
                <div>
                  <span className={`fw-bold me-3 text-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleEditClick(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
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
    </div>
  );
}

export default Transaction;

