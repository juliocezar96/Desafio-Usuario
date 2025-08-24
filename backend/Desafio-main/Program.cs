using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation.AspNetCore;
using DesafioBackend.Infrastructure.Data;
using DesafioBackend.Domain.Interfaces;
using DesafioBackend.Infrastructure.Repositories;
using DesafioBackend.Application.Interfaces;
using DesafioBackend.Application.Services;
using DesafioBackend.Infrastructure.Authentication;
using DesafioBackend.Application.Mapping;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configurar Entity Framework
builder.Services.AddDbContext<DesafioDbContext>(options =>
    options.UseInMemoryDatabase("DesafioDb"));

// Configurar AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Configurar FluentValidation
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Configurar JWT
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "a-string-secret-at-least-256-bits-long");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Configurar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Desafio Backend API", Version = "v1" });
    c.SwaggerDoc("v2", new OpenApiInfo
    {
        Title = "Desafio Backend API",
        Version = "v2"
    });
    c.AddSecurityDefinition("Bearer", new()
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new()
    {
        {
            new()
            {
                Reference = new()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Registrar repositórios
builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<IPessoaV2Repository, PessoaV2Repository>(); // Usar o mesmo repositório por enquanto
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// Registrar serviços
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<IJWtService, JwtService>();

// Em desenvolvimento, usar o serviço de desenvolvimento
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddScoped<IAutenticacaoService, DevelopmentJwtService>();
    
}


var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Desafio Backend API v1");
        c.SwaggerEndpoint("/swagger/v2/swagger.json", "Desafio Backend API v2");
        c.RoutePrefix = string.Empty; // Swagger na raiz
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed inicial do banco
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DesafioDbContext>();
    context.Database.EnsureCreated();
}

app.Run();
