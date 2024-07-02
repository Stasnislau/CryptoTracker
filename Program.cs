using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using CryptoTracker.Helpers;
using Services;



var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var awsOptions = builder.Configuration.GetAWSOptions();
string accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID") ?? throw new Exception("AWS_ACCESS_KEY_ID is not set");
string secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY") ?? throw new Exception("AWS_SECRET_ACCESS_KEY is not set");
awsOptions.Credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);
awsOptions.Region = Amazon.RegionEndpoint.EUCentral1;

// Add services to the container.
builder.Services.AddAWSService<IAmazonDynamoDB>();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddScoped<TransactionService>();

builder.Services.AddScoped<TransactionRepository>();

// Register DynamoDB context for dependency injection
builder.Services.AddSingleton<IDynamoDBContext, DynamoDBContext>();
builder.Services.AddSingleton<TransactionRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder => builder
        .WithOrigins("*")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var dynamoDb = scope.ServiceProvider.GetRequiredService<IAmazonDynamoDB>();
    await DynamoDbHelper.CreateTable(dynamoDb);
}

app.UseRouting();

app.MapControllers();
app.Run();
