FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["backend/Desafio-main/DesafioBackend.csproj", "./"]
RUN dotnet restore "./DesafioBackend.csproj"
COPY backend/Desafio-main/ .
RUN dotnet build "DesafioBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DesafioBackend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the published app
COPY --from=publish /app/publish .

# Set environment variables for Fly.io
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

# Create non-root user for security
RUN addgroup --system --gid 1001 dotnet
RUN adduser --system --uid 1001 --gid 1001 dotnet
USER dotnet

ENTRYPOINT ["dotnet", "DesafioBackend.dll"]
