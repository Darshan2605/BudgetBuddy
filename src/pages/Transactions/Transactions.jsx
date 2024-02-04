import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Transactions.css";
import { useGetTransactions } from "../../hooks/useGetTransactions";

const Transactions = () => {
  const navigate = useNavigate();
  const { transactions } = useGetTransactions();
  const goToTracker = () => {
    navigate("/exp-tracker");
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center tr-page">
      <Button onClick={goToTracker} style={{ marginTop: "1rem" }}>
        Go to Tracker Page
      </Button>
      <h3 className="title">Transactions</h3>
      <div className="showTr">
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li
                style={{
                  padding: "0",
                  marginBottom: "1.2rem",
                  listStyle: "none",
                }}
              >
                <h4 style={{ fontWeight: "600" }}>{description}</h4>
                <p>
                  Rs.{transactionAmount}=<label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
