using Amazon.DynamoDBv2.DataModel;

namespace Models
{
    [DynamoDBTable("Transactions")]
    public class Transaction
    {
        [DynamoDBHashKey]
        public required string Id { get; set; }

        [DynamoDBProperty]
        public DateTime Date { get; set; } // Date of transaction

        [DynamoDBProperty]
        public required string Currency { get; set; }

        [DynamoDBProperty]
        public string? Description { get; set; }


        [DynamoDBProperty]
        public decimal CurrencyPrice { get; set; }


        [DynamoDBProperty]
        public decimal Amount { get; set; }

        [DynamoDBProperty]
        public required string Type { get; set; } // Buy/SELL

    }
}
