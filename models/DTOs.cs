namespace Models.DTOs
{
    public class TransactionDTO
    {
        public DateTime Date { get; set; }
        public string Currency { get; set; }
        public string? Description { get; set; }
        public decimal CurrencyPrice { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
    }
}