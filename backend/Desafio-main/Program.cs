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

builder.Services.AddControllers();

builder.Services.AddDbContext<DesafioDbContext>(options =>
    options.UseInMemoryDatabase("DesafioDb"));

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173", 
                "http://localhost:8080",
                "https://localhost:3000",
                "https://localhost:5173",
                "https://localhost:8080",
                "https://desafio-usuario.fly.dev",
                "https://*.netlify.app",
                "https://*.netlify.com",
                "https://68aa986ab5d9e10008150f63--monumental-strudel-c2d580.netlify.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

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

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<IPessoaV2Repository, PessoaV2Repository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<IJWtService, JwtService>();

// Register authentication service for all environments
builder.Services.AddScoped<IAutenticacaoService, DevelopmentJwtService>();


var app = builder.Build();

app.UseCors("AllowAll");

// Enable Swagger in all environments for demo purposes
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Desafio Backend API v1");
    c.SwaggerEndpoint("/swagger/v2/swagger.json", "Desafio Backend API v2");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Initialize database with error handling
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<DesafioDbContext>();
        
        Console.WriteLine("Starting database initialization...");
        
        // Ensure database is created
        var created = await context.Database.EnsureCreatedAsync();
        Console.WriteLine($"Database created: {created}");
        
        // Check connection
        var canConnect = await context.Database.CanConnectAsync();
        Console.WriteLine($"Can connect to database: {canConnect}");
        
        // Count existing users
        var userCount = context.Usuarios.Count();
        Console.WriteLine($"Existing user count: {userCount}");
        
        // Ensure admin user exists
        var adminExists = context.Usuarios.Any(u => u.NomeUsuario == "admin");
        Console.WriteLine($"Admin user exists: {adminExists}");
        
        if (!adminExists)
        {
            Console.WriteLine("Creating admin user...");
            var adminUser = new DesafioBackend.Domain.Entities.Usuario
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                NomeUsuario = "admin",
                Senha = "admin123",
                Email = "admin@desafio.com",
                NomeCompleto = "Administrador",
                Ativo = true,
                DataCadastro = DateTime.UtcNow
            };
            context.Usuarios.Add(adminUser);
            var saved = await context.SaveChangesAsync();
            Console.WriteLine($"Admin user created, changes saved: {saved}");
        }
        
        // Final verification
        var finalUserCount = context.Usuarios.Count();
        var finalAdminExists = context.Usuarios.Any(u => u.NomeUsuario == "admin");
        Console.WriteLine($"Final user count: {finalUserCount}");
        Console.WriteLine($"Final admin exists: {finalAdminExists}");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Database initialization error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
}

app.Run();
