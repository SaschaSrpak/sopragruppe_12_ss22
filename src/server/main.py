
from datetime import datetime
import datetime as dt
from server.SystemAdministration import SystemAdministration


"""test_administration = SystemAdministration()
time = dt.datetime.now()
time_string = datetime.strftime(time, "%y-%m-%d %H:%M:%S")
testdruck = test_administration.create_kommen_event("Test", time)
print(testdruck)
"""
test_administration = SystemAdministration()
account = test_administration.get_time_account_by_key(10001)
print(account.get_id())
start = dt.datetime(2022, 5, 19, 12, 30, 0)
start_string = datetime.strftime(start, "%y-%m-%d %H:%M:%S")
end = dt.datetime(2022, 5, 19, 13, 00, 0)
end_string = datetime.strftime(end, "%y-%m-%d %H:%M:%S")
test_administration.book_pause_transaction(account, "test_pause", start_string, end_string)






