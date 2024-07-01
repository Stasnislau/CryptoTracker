using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Services;

var builder = WebApplication.CreateBuilder(args);

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

app.UseRouting();

app.MapControllers();
app.Run();
