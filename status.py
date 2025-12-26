import time
import requests
from datetime import datetime, timezone

url = "https://discord.com/api/v9/users/@me"

RELEASE_DATE = datetime(2026, 1, 22, 0, 0, 0, tzinfo=timezone.utc)

def get_countdown_string() -> str:
  now = datetime.now(timezone.utc)
  distance = (RELEASE_DATE - now).total_seconds()

  if distance <= 0:
      return "0d 0h 0m"

  days = int(distance // (60 * 60 * 24))
  hours = int((distance // (60 * 60)) % 24)
  minutes = int((distance // 60) % 60)

  return f"{days}d {hours}h {minutes}m"



def ChangeStatus(new_status):
  headers = {
      "Authorization": ""
  }

  jsonData = {
    "custom_status": {
        "text": message
    }
  }
  response = requests.patch(url,  headers=headers, json=jsonData)

while True:
  ChangeStatus(get_countdown_string() )
  time.sleep(1)