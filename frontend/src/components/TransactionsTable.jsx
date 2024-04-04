import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionsTable({ month }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/transactions?month=${month}&search=${search}&page=${page}`);
      setTransactions(result.data);
    };
    fetchData();
  }, [month, search, page]);

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions" />
      <table>
        <thead>
          {/* Render table headers */}
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              {/* Render transaction data */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default TransactionsTable;
