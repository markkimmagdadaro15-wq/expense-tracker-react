import { useState, useEffect } from "react";
import "./App.css";

const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem("expenses");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load saved expenses, starting with an empty list.", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!description || !amount || !date) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0.");
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
        <p>Track and manage your daily expenses</p>
      </div>

      <div className="card">
        <h2>Add New Expense</h2>

        <label htmlFor="description" style={srOnly}>
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="amount" style={srOnly}>
          Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="category" style={srOnly}>
          Category
        </label>
        <select
          id="category"
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

        <label htmlFor="date" style={srOnly}>
          Date
        </label>
        <input
          id="date"
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
