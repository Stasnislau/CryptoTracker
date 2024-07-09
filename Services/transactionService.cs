using Models;
using Models.DTOs;

namespace Services
{

    public class TransactionService
    {

        private readonly TransactionRepository _transactionRepository;

        public TransactionService(TransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }
        public async Task<List<Transaction>> GetTransactions()
        {
            return await _transactionRepository.GetTransactions();
        }

        public async Task<Transaction> GetTransactionById(string id)
        {
            return await _transactionRepository.GetTransactionById(id);
        }

        public async Task<Transaction> CreateTransaction(TransactionDTO transaction)
        {
            return await _transactionRepository.AddTransaction(transaction);
        }

        public async Task<Transaction> UpdateTransaction(Transaction transaction)
        {
            var currentTransaction = _transactionRepository.GetTransactionById(transaction.Id);
            if (transaction == null)
            {
                throw new Exception("Transaction not found.");
            }
            await _transactionRepository.UpdateTransaction(transaction);
            return transaction;
        }

        public async Task<bool> DeleteTransaction(string id)
        {
            var transaction = _transactionRepository.GetTransactionById(id);
            if (transaction == null)
            {
                return false;
            }
            await _transactionRepository.DeleteTransaction(id);
            return true;
        }
    }

}