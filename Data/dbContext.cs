using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Models;
using Models.DTOs;
using Sprache;
using System.Collections.Generic;
using System.Threading.Tasks;

public class TransactionRepository
{
    private readonly IDynamoDBContext _context;
    private readonly IAmazonDynamoDB _dynamoDb;

    public TransactionRepository(IAmazonDynamoDB dynamoDb, IDynamoDBContext context)
    {
        _dynamoDb = dynamoDb;
        _context = context;
    }

    public async Task<List<Transaction>> GetTransactions()
    {
        var conditions = new List<ScanCondition>();
        var search = _context.ScanAsync<Transaction>(conditions);
        var page = await search.GetNextSetAsync();
        return page;
    }

    public async Task<Transaction> GetTransactionById(string id)
    {
        return await _context.LoadAsync<Transaction>(id);
    }

    public async Task<Transaction> AddTransaction(TransactionDTO transaction)
    {
        var newTransaction = new Transaction
        {
            Id = Guid.NewGuid().ToString(),
            Date = transaction.Date,
            Currency = transaction.Currency,
            Description = transaction.Description,
            CurrencyPrice = transaction.CurrencyPrice,
            Amount = transaction.Amount,
            Type = transaction.Type
        };
        await _context.SaveAsync(newTransaction);
        return newTransaction;
    }

    public async Task<Transaction> UpdateTransaction(Transaction transaction)
    {
        await _context.SaveAsync(transaction);
        return transaction;
    }

    public async Task DeleteTransaction(string id)
    {
        await _context.DeleteAsync<Transaction>(id);
    }

}