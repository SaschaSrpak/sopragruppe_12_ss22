import datetime as dt
from datetime import datetime
start_event_time = "2022-06-26T14:57"
start_event_time = datetime.strptime(start_event_time, "%Y-%m-%dT%H:%M")
print(start_event_time)