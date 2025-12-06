$urls = @(
    "https://www.quicktools.website/favicon.ico",
    "https://www.quicktools.website/favicon-16x16.png",
    "https://www.quicktools.website/favicon-32x32.png",
    "https://www.quicktools.website/favicon-96x96.png"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
        Write-Host "$url - Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "$url - Status: $($_.Exception.Response.StatusCode.Value__)" -ForegroundColor Red
    }
}
