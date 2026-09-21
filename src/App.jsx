import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!description || !amount || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      category: category,
      date: date,
    };

    setExpenses([...expenses, newExpense]);

    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="app">

      <div className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Manage and track your daily expenses</p>
      </div>

      <div className="card">
        <h2>Add New Expense</h2>

        <input
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transportation</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="add-button"
          onClick={addExpense}
        >
          + Add Expense
        </button>
      </div>

      <div className="card">
        <div className="total">
          Total Expenses
          <br />
          ₱{total.toFixed(2)}
        </div>
      </div>

      <div className="card">
        <h2>Expense List</h2>

        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expenses.map((expense) => (
            <div className="expense" key={expense.id}>

              <h3>{expense.description}</h3>

              <p>
                <strong>Amount:</strong>{" "}
                ₱{expense.amount.toFixed(2)}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {expense.category}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {expense.date}
              </p>

              <button
                className="delete-button"
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;