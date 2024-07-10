import React, { useState, ChangeEvent } from 'react';

interface Transaction {
    date: string;
    currency: string;
    amount: number;
    purchasePrice: number;
    currentPrice: number;
}

const MainPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        date: '',
        currency: '',
        amount: 0,
        purchasePrice: 0,
        currentPrice: 0,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTransaction((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addTransaction = () => {
        setTransactions([...transactions, newTransaction]);
        setNewTransaction({
            date: '',
            currency: '',
            amount: 0,
            purchasePrice: 0,
            currentPrice: 0,
        });
    };

    const calculatePL = (purchasePrice: number, currentPrice: number, amount: number): number => {
        return (currentPrice - purchasePrice) * amount;
    };

    return (
        <div className="App p-6 bg-gradient-to-b from-blue-500 to-blue-900 text-white">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Crypto Tracker</h1>
                <p className="text-lg text-gray-200">Date: {new Date().toLocaleDateString()}</p>
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
                        <input
                            type="text"
                            name="currency"
                            value={newTransaction.currency}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-200">Amount Purchased:</span>
                        <input
                            type="number"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-200">Purchase Price (USD):</span>
                        <input
                            type="number"
                            name="purchasePrice"
                            value={newTransaction.purchasePrice}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-200">Current Price (USD):</span>
                        <input
                            type="number"
                            name="currentPrice"
                            value={newTransaction.currentPrice}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                    </label>
                </div>
                <button
                    onClick={addTransaction}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
                >
                    Add Transaction
                </button>
            </section>

            <section className="mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                <table className="w-full border-collapse text-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2">Date</th>
                            <th className="p-2">Crypto Name</th>
                            <th className="p-2">Amount Purchased</th>
                            <th className="p-2">Purchase Price (USD)</th>
                            <th className="p-2">Current Price (USD)</th>
                            <th className="p-2">P&L (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="border-b border-gray-700">
                                <td className="p-2">{transaction.date}</td>
                                <td className="p-2">{transaction.currency}</td>
                                <td className="p-2">{transaction.amount}</td>
                                <td className="p-2">{transaction.purchasePrice}</td>
                                <td className="p-2">{transaction.currentPrice}</td>
                                <td
                                    className={`p-2 ${calculatePL(transaction.purchasePrice, transaction.currentPrice, transaction.amount) > 0
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                        }`}
                                >
                                    {calculatePL(transaction.purchasePrice, transaction.currentPrice, transaction.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">
                    Total P&L:{' '}
                    {transactions
                        .reduce(
                            (total, transaction) =>
                                total + calculatePL(transaction.purchasePrice, transaction.currentPrice, transaction.amount),
                            0
                        )
                        .toFixed(2)}
                </h2>
            </section>

            <footer className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg text-center text-gray-200">
                Note: Data is for informational purposes only and not for trading advice.
            </footer>
        </div>
    );
};

export default MainPage;
