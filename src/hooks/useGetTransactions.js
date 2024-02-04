import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, settransactions] = useState([]);
  const [totalBalance, settotalBalance] = useState(0.0);
  const [totalincome, settotalincome] = useState(0.0);
  const [totalexpense, settotalexpense] = useState(0.0);
  const transactionCollection = collection(db, "Transactions");
  const { name } = useGetUserInfo();
  const getTransactions = async () => {
    let unsub;
    try {
      //now we apply queery on our collection of firestore db to get transactions from firestore
      //we are fetching only those transactions whose name field is matching with currently logged in user name
      const queryTransactions = query(
        transactionCollection,
        where("name", "==", name),
        orderBy("createdAt")
      );

      unsub = onSnapshot(queryTransactions, (snapshot) => {
        //snapshot argument conatin list of documents get from queryTransactions
        //oneach doc we apply some function
        let docs = [];
        let income = 0;
        let expense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data(); //data is become object contains all data of transaction
          const id = doc.id; //firebase gives us unique id for each documnet

          docs.push({ ...data, id }); //we use spread ... operator used to spread inside data of object data
          if (data.transactionType === "expense") {
            expense = expense + Number(data.transactionAmount);
          } else {
            income = income + Number(data.transactionAmount);
          }
        });
        let balance = income - expense;
        settransactions(docs);
        settotalBalance(balance);
        settotalincome(income);
        settotalexpense(expense);
      }); //keep track of querries if any changes happend
    } catch (err) {
      console.log(err);
    }
    return () => unsub();
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, totalBalance, totalincome, totalexpense };
};
