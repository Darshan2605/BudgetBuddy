import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import ExpTracker from "./pages/exp-tracker";
import "bootstrap/dist/css/bootstrap.min.css";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth></Auth>} />
        <Route path="/exp-tracker" element={<ExpTracker></ExpTracker>} />
        <Route path="/transactions" element={<Transactions></Transactions>} />
      </Routes>
    </div>
  );
}

export default App;
