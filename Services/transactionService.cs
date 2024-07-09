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

        public async Task<Transaction> UpdateTransaction(string id, Transaction transaction)
        {
            // return await _transactionRepository.UpdateTransaction(id, transaction);
            throw new NotImplementedException();
        }

        public async Task<Transaction> DeleteTransaction(string id)
        {
            // return await _transactionRepository.DeleteTransaction(id);
            throw new NotImplementedException();
        }




    }

}