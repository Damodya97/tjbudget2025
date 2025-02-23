import React, { useState, useEffect } from "react";
import "./Transaction.css";
import { backendurl } from "./BackEndUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Waitload from './Waitload';

const Transaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedDate, setSelectDate] = useState("");
  const [waitload, setWaitload] = useState(false);
  const [waitload1, setWaitload1] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setWaitload(true);
      try {
        const response = await axios.get(`${backendurl}/auth/transaction`, { withCredentials: true });
        if (response.data === "notlog" || response.data === "connectionerror") {
          navigate("/login");
        } else if (response.data === "noactive") {
          navigate("/frontpage");
        } else if (response.data) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
          setWaitload(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        navigate("/login");
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filterDate) {
      filtered = filtered.filter((t) => t.date === filterDate);
    }

    const parseDateTime = (date, time) => {
      const dateObj = new Date(date);
      const [hours, minutes, seconds] = time.split(".").map(Number);
      dateObj.setHours(hours, minutes, seconds);
      return dateObj;
    };

    switch (sortOrder) {
      case "oldToNew":
        filtered = [...filtered].sort((a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time));
        break;
      case "saved":
        filtered = filtered.filter((t) => t.action.toLowerCase() === "saved");
        break;
      case "withdrawed":
        filtered = filtered.filter((t) => t.action.toLowerCase() === "withdrawed");
        break;
      case "lowToHigh":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredTransactions([...filtered]);
  }, [filterDate, sortOrder, transactions]);

  return (
    <div className="transaction-container">
       {waitload && (<Waitload waitload1={waitload1}/>)}
      <h2 className="transaction-header">Transaction History</h2>
      
      <div className="filters">
        <label>
          <span>Filter by Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              setSelectDate(e.target.value);
              const formattedDate = selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).replace(",", "");
              setFilterDate(formattedDate);
            }}
          />
        </label>

        <label>
          <span>Sort By:</span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">No Filter</option>
            <option value="oldToNew">Old to New</option>
            <option value="saved">Saved</option>
            <option value="withdrawed">Withdrawed</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </label>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Item</th>
            <th>Save/Withdraw</th>
            <th>Price (Rs)</th>
            <th>Balance (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.time}</td>
                <td>{t.item}</td>
                <td>{t.action}</td>
                <td className="price">{t.price}</td>
                <td className="balance">{t.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;