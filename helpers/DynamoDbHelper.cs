using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

namespace CryptoTracker.Helpers
{
    public static class DynamoDbHelper
    {
        public static async Task CreateTable(IAmazonDynamoDB dynamoDb)
        {
            string tableName = "Transactions";

            try
            {
                var response = await dynamoDb.DescribeTableAsync(tableName);
                Console.WriteLine("Table status: " + response.Table.TableStatus);
            }
            catch (ResourceNotFoundException)
            {
                Console.WriteLine("Table does not exist. Creating table...");

                var request = new CreateTableRequest
                {
                    TableName = tableName,
                    AttributeDefinitions = new List<AttributeDefinition>{
                        new AttributeDefinition{
                            AttributeName = "Id",
                            AttributeType = ScalarAttributeType.S
                        },
                        new AttributeDefinition{
                            AttributeName = "Date",
                            AttributeType = ScalarAttributeType.S
                        },
                    },
                    KeySchema = new List<KeySchemaElement>{
                        new KeySchemaElement{
                            AttributeName = "Id",
                            KeyType = KeyType.HASH
                        },
                        new KeySchemaElement{
                            AttributeName = "Date",
                            KeyType = KeyType.RANGE
                        }
                    },
                    ProvisionedThroughput = new ProvisionedThroughput
                    {
                        ReadCapacityUnits = 2,
                        WriteCapacityUnits = 2
                    }
                };

                await dynamoDb.CreateTableAsync(request);

                Console.WriteLine("Table created");
            }
        }

    }
}
