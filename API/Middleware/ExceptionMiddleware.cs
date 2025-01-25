using System;
using System.Net;
using System.Text.Json;
using API.Errors;
using SQLitePCL;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            logger.LogError(e, e.Message);
            context.Response.ContentType = "applciation/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;


            var response = env.IsDevelopment() ? new ApiException(context.Response.StatusCode, e.Message, e.StackTrace) : new ApiException(context.Response.StatusCode, e.Message, "Internal Server Error");




            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
