# Schedule API Test Guide

I have checked the `audena/heatmap` branch and the following Schedule API implementation looks correct.
Here are the details for testing the endpoints in Postman.

**Base URL**: `http://localhost:8000/api` (adjust if your local server port is different)
**Auth**: These endpoints require a Sanctum token (`Authorization: Bearer <token>`).

## 1. Save Schedules (Web)
Used by the frontend to save schedule configurations.

- **Method**: `POST`
- **URL**: `/schedules`
- **Body** (JSON):
```json
{
    "gh_id": 1,
    "schedules": [
        {
            "enabled": true,
            "start_time": "08:00",
            "end_time": "12:00",
            "actuators": {
                "blower": "on",
                "exhaust": "threshold",
                "dehumidifier": "off"
            }
        },
        {
            "enabled": true,
            "start_time": "13:00",
            "end_time": "17:00",
            "actuators": {
                "blower": "threshold",
                "exhaust": "on",
                "dehumidifier": "threshold"
            }
        }
    ]
}
```

## 2. Get Schedules (Web)
Used by the frontend to retrieve the current schedule.

- **Method**: `GET`
- **URL**: `/schedules?gh_id=1`

## 3. Get Schedule (Gateway)
Used by the gateway/ESP to check the current schedule status.

- **Method**: `POST`
- **URL**: `/gateway/schedule`
- **Body** (JSON):
```json
{
    "gh_id": 1
}
```

**Expected Response**:
```json
{
    "success": true,
    "gh_id": 1,
    "schedules": [
        {
            "id": 1,
            "aktif": 1,
            "mulai": "08:00",
            "selesai": "12:00",
            "relay": "120" // 1=on, 2=threshold, 0=off (Order: Exhaust, Dehumidifier, Blower)
        }
    ]
}
```
*Note: The Relay binary string order is `[Exhaust][Dehumidifier][Blower]`.*
