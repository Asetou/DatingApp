using API.Extensions;
using API.Middleware;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AdddIdentityServices(builder.Configuration);

var app = builder.Build();

// handling middleware
app.UseMiddleware<ExceptionMiddleware>();

// ON EVERY HTTP REQ, MAKE SURE YOU ADD // D:
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200"));


app.UseAuthentication();
app.UseAuthorization();



// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();
 