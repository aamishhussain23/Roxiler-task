import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; 

function TransactionsTable() {
  const [data, setData] = useState({ transactions: [], totalCount: 0, totalPages: 0, currentPage: 1 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [month, setMonth] = useState('');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://aamish-hussain-roxiler-task.onrender.com/transactions?month=${month}&search=${search}&page=${page}&limit=${limit}`);
      setData(result.data);
    };
    fetchData();
  }, [month, search, page, limit]);

  return (
    <div className="transactions-table">
      <select className="month-select" value={month} onChange={e => setMonth(e.target.value)}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
      <input className="search-input" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
      <table className="transactions">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <button onClick={() => setPage(page < data.totalPages ? page + 1 : page)}>Next</button>
      </div>
      <div className="info">
        <p>Total Count: {data.totalCount}</p>
        <p>Total Pages: {data.totalPages}</p>
        <p>Current Page: {data.currentPage}</p>
      </div>
    </div>
  );
}

export default TransactionsTable;
