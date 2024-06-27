using Amazon.DynamoDBv2.DataModel;

namespace Models
{
    public class Transaction
    {
        [DynamoDBHashKey]
        public required string Id { get; set; }

        public required string Currency { get; set; }

        public string? Description { get; set; }

        public decimal CurrencyPrice { get; set; }

        public decimal Amount { get; set; }
        public required string Date { get; set; } // Date of transaction

        public required string Type { get; set; } // Buy/SELL

    }
}
