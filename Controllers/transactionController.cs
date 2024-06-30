using Microsoft.AspNetCore.Mvc;
using Services;

public class transactionController : Controller
{
    private readonly TransactionService _transactionService;

    public transactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _transactionService.GetTransactions();
        return Ok(transactions);
    }
}