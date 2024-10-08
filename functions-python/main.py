# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, options
from firebase_admin import initialize_app
import requests
import json

# initialize_app()
#
#

#@https_fn.on_request(
#    cors=options.CorsOptions(
#        cors_origins=[r"*"],
#        cors_methods=["get", "post", "patch", "put", "options"],
#    )
#)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=[r"*"],
        cors_methods=["get", "post", "patch", "put", "options"],
    )
)
def aws_api_endpoint(req: https_fn.Request) -> https_fn.Response:

    url = "https://interface.gateway.uniswap.org/v1/graphql"

    '''payload = json.dumps({
  "query": "query SearchPopularTokensWeb($chain: Chain!, $orderBy: TokenSortableField) { topTokens(chain: $chain, orderBy: $orderBy, page: 1, pageSize: 100) { id address chain symbol name decimals project { id logoUrl safetyLevel isSpam } }}",
  "variables": {
    "orderBy": "VOLUME",
    "chain": "ETHEREUM"
  }
})'''
    
    payload = json.dumps(req.get_json())

#{"query": "query SearchPopularTokensWeb($chain: Chain!, $orderBy: TokenSortableField) { topTokens(chain: $chain, orderBy: $orderBy, page: 1, pageSize: 100) { id address chain symbol name decimals project { id logoUrl safetyLevel isSpam } }}", "variables": {"orderBy": "VOLUME", "chain": "ETHEREUM"}}
#{"query": "query SearchPopularTokensWeb($chain: Chain!, $orderBy: TokenSortableField) { topTokens(chain: $chain, orderBy: $orderBy, page: 1, pageSize: 100) { id address chain symbol name decimals project { id logoUrl safetyLevel isSpam } }}", "variables": {"orderBy": "VOLUME", "chain": "ETHEREUM"}}

    reqHeaders = {
        #'Origin': 'https://app.uniswap.org',
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.39.0'
    }

    method = req.method

    response = requests.request(method, url, headers=reqHeaders, data=payload)

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    print(req.method)
    print(req.get_json())
    print(response)
    print(response.text)

    return https_fn.Response(response.text, 200, headers)
    #return https_fn.Response("yo", 200, headers)

from pyodide.ffi import to_js as _to_js
from js import Response, URL, fetch, Object, Request

def to_js(x):
    return _to_js(x, dict_converter=Object.fromEntries)

@https_fn.on_request()
async def on_fetch(request):
    cors_headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    }

    api_url = "https://examples.cloudflareworkers.com/demos/demoapi"

    proxy_endpoint = "/corsproxy/"

    def raw_html_response(html):
        return Response.new(html, headers=to_js({"content-type": "text/html;charset=UTF-8"}))

    demo_page = f'''
    <!DOCTYPE html>
    <html>
    <body>
    <h1>API GET without CORS Proxy</h1>
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful">Shows TypeError: Failed to fetch since CORS is misconfigured</a>
    <p id="noproxy-status"/>
    <code id="noproxy">Waiting</code>
    <h1>API GET with CORS Proxy</h1>
    <p id="proxy-status"/>
    <code id="proxy">Waiting</code>
    <h1>API POST with CORS Proxy + Preflight</h1>
    <p id="proxypreflight-status"/>
    <code id="proxypreflight">Waiting</code>
    <script>
    let reqs = {{}};
    reqs.noproxy = () => {{
        return fetch("{api_url}").then(r => r.json())
    }}
    reqs.proxy = async () => {{
        let href = "{proxy_endpoint}?apiurl={api_url}"
        return fetch(window.location.origin + href).then(r => r.json())
    }}
    reqs.proxypreflight = async () => {{
        let href = "{proxy_endpoint}?apiurl={api_url}"
        let response = await fetch(window.location.origin + href, {{
        method: "POST",
        headers: {{
            "Content-Type": "application/json"
        }},
        body: JSON.stringify({{
            msg: "Hello world!"
        }})
        }})
        return response.json()
    }}
    (async () => {{
    for (const [reqName, req] of Object.entries(reqs)) {{
        try {{
        let data = await req()
        document.getElementById(reqName).innerHTML = JSON.stringify(data)
        }} catch (e) {{
        document.getElementById(reqName).innerHTML = e
        }}
    }}
    }})()
    </script>
    </body>
    </html>
    '''

    async def handle_request(request):
        url = URL.new(request.url)
        api_url2 = url.searchParams["apiurl"]

        if not api_url2:
            api_url2 = api_url

        request = Request.new(api_url2, request)
        request.headers["Origin"] = (URL.new(api_url2)).origin
        print(request.headers)
        response = await fetch(request)
        response = Response.new(response.body, response)
        response.headers["Access-Control-Allow-Origin"] = url.origin
        response.headers["Vary"] = "Origin"
        return response

    async def handle_options(request):
        if "Origin" in request.headers and "Access-Control-Request-Method" in request.headers and "Access-Control-Request-Headers" in request.headers:
            return Response.new(None, headers=to_js({
            **cors_headers,
            "Access-Control-Allow-Headers": request.headers["Access-Control-Request-Headers"]
          }))
        return Response.new(None, headers=to_js({"Allow": "GET, HEAD, POST, OPTIONS"}))

    url = URL.new(request.url)

    if url.pathname.startswith(proxy_endpoint):
        if request.method == "OPTIONS":
            return handle_options(request)
        if request.method in ("GET", "HEAD", "POST"):
            return handle_request(request)
        return Response.new(None, status=405, statusText="Method Not Allowed")
    return raw_html_response(demo_page)