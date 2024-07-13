import React, { useState, ChangeEvent, useEffect } from 'react';
import { availableCurrencies } from '../constants';

interface Transaction {
  id: string;
  date: string;
  currency: string;
  description?: string;
  currencyPrice: number;
  amount: number;
  type: string;
}

const MainPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedCurrency, setExpandedCurrency] = useState<string | null>(null);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    currency: '',
    description: '',
    currencyPrice: 0,
    amount: 0,
    type: 'BUY',
  });

  const getTransactions = async () => {
    const response = await fetch('https://localhost:3001/api/transaction/all', {
      method: 'GET',
      headers: {
        credentials: 'include',
      },
    });
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: Date.now().toString() },
    ]);
    setNewTransaction((prevState) => ({
      ...prevState,
      id: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      currencyPrice: 0,
      amount: 0,
      type: 'BUY',
    }));
  };

  const calculateTotalInflow = (currency: string) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.currency === currency && transaction.type === 'BUY'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount * transaction.currencyPrice,
        0
      );
  };

  const calculateTotalOutflow = (currency: string) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.currency === currency && transaction.type === 'SELL'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount * transaction.currencyPrice,
        0
      );
  };

  const getTotalAmountBought = (currency: string) => {
    const totalBought = transactions
      .filter(
        (transaction) =>
          transaction.currency === currency && transaction.type === 'BUY'
      )
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalSold = transactions
      .filter(
        (transaction) =>
          transaction.currency === currency && transaction.type === 'SELL'
      )
      .reduce((total, transaction) => total + transaction.amount, 0);

    return totalBought - totalSold;
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.currency]) {
      acc[transaction.currency] = [];
    }
    acc[transaction.currency].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="App p-6 bg-gradient-to-b from-purple-500 to-purple-900 text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Crypto Tracker</h1>
        <p className="text-lg text-gray-200">
          Date: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Transaction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <label className="block">
            <span className="text-gray-200">Date of Purchase:</span>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            />
          </label>
          <label className="block">
            <span className="text-gray-200">Crypto Name:</span>
            <select
              name="currency"
              value={newTransaction.currency}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            >
              {availableCurrencies
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((currency) => (
                  <option key={currency.tag} value={currency.tag}>
                    {currency.name} ({currency.tag})
                  </option>
                ))}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-200">Amount:</span>
            <input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            />
          </label>
          <label className="block">
            <span className="text-gray-200">Currency Price (USD):</span>
            <input
              type="number"
              name="currencyPrice"
              value={newTransaction.currencyPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            />
          </label>
          <label className="block">
            <span className="text-gray-200">Type:</span>
            <select
              name="type"
              value={newTransaction.type}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </label>
          <label className="block col-span-2">
            <span className="text-gray-200">Description:</span>
            <input
              type="text"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            />
          </label>
        </div>
        <button
          onClick={addTransaction}
          className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        >
          Add Transaction
        </button>
      </section>

      <section className="mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">Currency</th>
              <th className="p-2">Total Bought (Amount)</th>
              <th className="p-2">Total Inflow (USDT)</th>
              <th className="p-2">Total Outflow (USDT)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedTransactions).map((currency) => (
              <React.Fragment key={currency}>
                <tr
                  className="border-b border-gray-700 cursor-pointer"
                  onClick={() =>
                    setExpandedCurrency(
                      expandedCurrency === currency ? null : currency
                    )
                  }
                >
                  <td className="p-2">{currency}</td>
                  <td className="p-2">
                    {getTotalAmountBought(currency).toFixed(2)}
                  </td>
                  <td className="p-2">
                    {calculateTotalInflow(currency).toFixed(2)}
                  </td>
                  <td className="p-2">
                    {calculateTotalOutflow(currency).toFixed(2)}
                  </td>
                </tr>
                {expandedCurrency === currency && (
                  <>
                    <tr>
                      <th className="p-2 bg-gray-600" colSpan={6}>
                        Transactions for {currency}
                      </th>
                    </tr>
                    {groupedTransactions[currency].map((transaction, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="p-2" colSpan={1}></td>
                        <td className="p-2">{transaction.date}</td>
                        <td className="p-2">{transaction.amount}</td>
                        <td className="p-2">{transaction.currencyPrice}</td>
                        <td className="p-2">{transaction.type}</td>
                        <td className="p-2">{transaction.description}</td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MainPage;
