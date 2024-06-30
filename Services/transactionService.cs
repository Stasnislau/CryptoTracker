using Models;

namespace Services
{

    public class TransactionService {
        
        private readonly TransactionRepository _transactionRepository;
        public async Task<List<Models.Transaction>> GetTransactions()
        {
            return await _transactionRepository.GetTransactions();
        }

        public async Task<Transaction> GetTransactionById(string id)
        {
            return await _transactionRepository.GetTransactionById(id);
        }




    }

}