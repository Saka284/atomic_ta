import requests
import json

# Configuration
BASE_URL = "http://localhost:8000/api"
ENDPOINT = "/gateway/schedule"

# You need to provide a valid Sanctum token here
# You can get this by logging in via the web app and checking the network tab, 
# or by using the login endpoint first if you have credentials.
TOKEN = "3|xU7cpUX6dRr7ZCeZOdbDopzpEZMilN1vBv6ytXSh" 

def get_gateway_schedule(gh_id):
    url = f"{BASE_URL}{ENDPOINT}"
    
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    payload = {
        "gh_id": gh_id
    }
    
    print(f"Testing Endpoint: {url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        # The user asked why POST? 
        # It's POST because the server expects a JSON body with parameters.
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 200:
            print("\nSuccess! Response Body:")
            try:
                data = response.json()
                print(json.dumps(data, indent=2))
            except json.JSONDecodeError:
                print("Response is not JSON:", response.text)
        else:
            print(f"\nFailed. Response: {response.text}")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    # Test for Greenhouse ID 1
    get_gateway_schedule(1)
