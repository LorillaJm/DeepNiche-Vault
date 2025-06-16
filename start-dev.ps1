# Check if API key is provided as argument
param(
    [string]$ApiKey
)

if (-not $ApiKey) {
    Write-Host "Please provide your OpenAI API key as an argument:"
    Write-Host ".\start-dev.ps1 your-api-key-here"
    exit 1
}

# Set environment variable and start the development server
$env:OPENAI_API_KEY = $ApiKey
npm run dev