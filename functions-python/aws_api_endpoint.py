import requests

url = "https://interface.gateway.uniswap.org/v1/graphql"

payload = {}
headers = {
  'Origin': 'https://app.uniswap.org'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)