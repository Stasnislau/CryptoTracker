using Microsoft.AspNetCore.Mvc;
using Services;
using Models;

[Route("api/[controller]")]
public class TransactionController : Controller
{
    private readonly TransactionService _transactionService;

    public TransactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _transactionService.GetTransactions();
        return Ok(transactions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransactionById(string id)
    {
        var transaction = await _transactionService.GetTransactionById(id);
        return Ok(transaction);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
    {
        var newTransaction = await _transactionService.CreateTransaction(transaction);
        return Ok(newTransaction);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTransaction(string id, [FromBody] Transaction transaction)
    {
        var updatedTransaction = await _transactionService.UpdateTransaction(id, transaction);
        return Ok(updatedTransaction);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(string id)
    {
        var deletedTransaction = await _transactionService.DeleteTransaction(id);
        return Ok(deletedTransaction);
    }
}