import React, { useState } from "react";
import "./exp-tracker.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { useGetTransactions } from "../../hooks/useGetTransactions";

const ExpTracker = () => {
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction(); //custom hook //
  const { name, profilePhoto } = useGetUserInfo();
  const { totalBalance, totalincome, totalexpense } = useGetTransactions();
  /*
  A custom hook in React is a reusable piece of code that encapsulates logic and state management that can be shared across different components. Custom hooks are functions that start with the prefix "use" and can call other built-in or custom hooks. 
  This naming convention helps to easily identify which functions are hooks and which are not */
  const [description, setdesc] = useState("");
  const [transactionAmount, setamount] = useState(0);
  const [transactionType, settrtype] = useState("expense");

  const goToTransactions = () => {
    navigate("/transactions");
  };

  const signOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitt = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setdesc("");
    setamount("");
  };
  return (
    <div className="container-fluid expense-tracker d-flex  flex-column">
      <h1 className="app-logo">Budeget Buddy</h1>
      <div className="user-info">
        <div className="mt-2">
          <img src={profilePhoto} className="profile-photo"></img>
        </div>
        <h3>Hi {name}!</h3>
        <Button className="sign-out" onClick={signOut} variant="danger">
          Sign-Out
        </Button>
      </div>
      <div className="container">
        <div className="score d-flex mb-3 justify-content-around align-items-center mt-5">
          <div className="balance">
            <h4>Balance</h4>
            <p>{totalBalance}</p>
          </div>

          <div className="income">
            <h4>Income</h4>
            <p>{totalincome}</p>
          </div>
          <div className="expenses">
            <h4>Expense</h4>
            <p>{totalexpense}</p>
          </div>
        </div>

        <Form onSubmit={onSubmitt}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setdesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="amount"
              value={transactionAmount}
              required
              onChange={(e) => setamount(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-inline-flex gap-2"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="radio"
              id="Expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => settrtype(e.target.value)}
            />
            <Form.Label>Expense</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 d-inline-flex gap-2"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="radio"
              id="Income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => settrtype(e.target.value)}
            />
            <Form.Label>Income</Form.Label>
          </Form.Group>
          <div className="d-flex  justify-content-between align-items-center ">
            <Button variant="primary" type="submit">
              Add Transaction
            </Button>
            <Button onClick={goToTransactions}>Show Transactions</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ExpTracker;
