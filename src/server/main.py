
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
person = test_administration.get_person_by_key(2)
projekt = test_administration.get_project_by_key(1)
activity = test_administration.get_activity_by_project_key(1)
account = test_administration.get_time_account_by_key(1)
event = test_administration.get_kommen_event_by_key(1)
startevent = test_administration.get_start_event_by_key(1)
endevent = test_administration.get_end_event_by_key(1)
projektworktime = test_administration.get_project_worktime_by_key(1)
pause = test_administration.get_pause_by_key(1)
projektdauer = test_administration.get_project_duration_by_project_key(1)
pausebuchung = test_administration.get_pause_transaction_by_key(2)
print(account.get_id())
end = dt.datetime(2022, 5, 19, 13, 00, 0)
"""start = dt.datetime(2022, 5, 19, 12, 30, 0)
start_string = datetime.strftime(start, "%y-%m-%d %H:%M:%S")

end_string = datetime.strftime(end, "%y-%m-%d %H:%M:%S")"""

"""test_administration.book_pause_transaction(account, "test_pause", start_string, end_string)
"""

""">>>>>>Liams Liste<<<<<<"""

"""error - test_administration.create_person("Luca", "Truthuhn", "Luli@gmx.de", "luli", 3, 0)"""
"""geht - print(test_administration.get_all_persons())"""
"""geht - print(test_administration.get_persons_by_activity_key(1))"""
"""geht - print(test_administration.get_persons_by_project_key(1))"""
"""geht - print(test_administration.get_person_by_key(1))"""
"""geht - test_administration.save_person(person)"""
"""error - test_administration.delete_person(person)"""


"""error - test_administration.create_activity("Ak1", person, 2)"""
"""geht - print(test_administration.get_all_activities())"""
"""geht - print(test_administration.get_activity_by_key(1))"""
"""geht - test_administration.get_activity_by_person_key(1)"""
"""geht - activity = test_administration.get_activity_by_project_key(1)"""
"""error - test_administration.add_person_responsible_to_activity(activity, person)"""
"""error - test_administration.delete_person_responsible_from_activity(activity, person)"""
"""error - test_administration.update_activity(activity)"""
"""error - test_administration.delete_activity(activity)"""

"""Zeitkonto spezifische Methoden"""

"""geht - test_administration.create_time_account_for_person(person)"""
"""geht - print(test_administration.get_all_time_accounts())"""
"""geht - print(test_administration.get_time_account_by_key(1))"""
"""error - test_administration.save_account(account)"""
"""error - test_administration.delete_account(account)"""

"""
? get_all_bookings ?
? get_full_work_time ?
? get_full_pause_time ?
? get_worktime_on_activity ?
? get_work_time_on_project ?
"""


"""Projekt spezifische Methoden"""


"""test_administration.create_project("Projekt3", 1, "Client3", "Description3", 1, 1, activity, person)"""

"""geht - print(test_administration.get_all_projects())"""
"""geht - test_administration.get_project_by_key(1)"""
"""error - test_administration.get_project_by_client("Client1")"""
"""geht - print(test_administration.get_project_by_creator_key(1))"""
"""geht - test_administration.get_project_by_person_key(1)"""
"""geht - test_administration.add_person_responsible_to_project(projekt, person)"""
"""error - test_administration.change_project_persons_responsible(1, person)"""
"""error - test_administration.delete_person_responsible_from_project(projekt, person)"""
"""geht - test_administration.get_project_by_activity_key(1)"""
"""error - test_administration.add_activity_to_project(projekt, activity)"""
"""error - test_administration.change_project_activities(1, activity)"""
"""error - test_administration.delete_activity_from_project(projekt, activity)"""
"""error - test_administration.save_project(projekt)"""
"""error - test_administration.delete_project(projekt)"""


"""Kommen spezifische Methoden"""

"""geht - test_administration.create_kommen_event("Kommen", end)"""
"""geht - print(test_administration.get_all_kommen_events())"""
"""geht - print(test_administration.get_kommen_event_by_key(1))"""
"""? get_kommen_by_transaction_key ?"""
"""error - test_administration.save_kommen_event(event)"""
"""error - test_administration.delete_kommen_event(event)"""


"""Gehen spezifische Methoden"""

"""geht - test_administration.create_gehen_event("Gehen2", end)"""
"""geht - print(test_administration.get_all_gehen_events())"""
"""geht - print(test_administration.get_gehen_event_by_key(1))"""
"""geht - print(test_administration.get_gehen_by_transaction_key(1))"""
"""error - test_administration.save_gehen_event(event)"""
"""error - test_administration.delete_gehen_event(event)"""


""" Startereignis spezifische Methoden """

"""geht - test_administration.create_start_event("Start", end)"""
"""geht - test_administration.get_all_start_events()"""
"""geht - test_administration.get_start_event_by_key(1)"""
"""?get_start_by_transaction_key?"""
"""?get_start_by_interval_key?"""
"""error - test_administration.save_start_event(startevent)"""
"""error - test_administration.delete_start_event(startevent)"""


""" Endereignis spezifische Methoden"""

"""geht - test_administration.create_end_event("Ende", end)"""
"""geht - test_administration.get_all_end_events()"""
"""geht - test_administration.get_end_event_by_key(1)"""
"""?get_end_by_transaction_key?"""
"""?get_end_by_interval_key?"""
"""error - test_administration.save_end_event(endevent)"""
"""error - test_administration.delete_end_event(endevent)"""


"""Projektarbeit spezifische Methode"""

"""geht - test_administration.create_project_worktime("Projektarbeit3", 1, 1)"""
"""geht - test_administration.get_all_project_worktimes()"""
"""geht - test_administration.get_project_worktime_by_key(1)"""
"""?get_project_worktime_by_transaction_key?"""
"""error - test_administration.save_project_worktime(projektworktime)"""
"""error - test_administration.delete_project_worktime(projektworktime)"""


"""Pause spezifische Methoden"""

"""geht - test_administration.create_pause("Pause2", 1, 1) """
"""geht - print(test_administration.get_all_pauses())"""
"""geht - print(test_administration.get_pause_by_key(1)) """
"""error - test_administration.save_pause(pause)"""
"""error - test_administration.delete_pause(pause)"""

"""Projektlaufzeit spezifische Methoden"""
"""geht - test_administration.create_project_duration("Laufteit2", 1, 1)"""
"""geht - print(test_administration.get_all_project_duration())"""
"""geht - print(test_administration.get_project_duration_by_key(1))"""
"""geht - print(test_administration.get_project_duration_by_project_key(2))"""
"""error - test_administration.save_project_duration(projektdauer)"""
"""error - test_administration.delete_project_duration(projektdauer)"""


"""KommenBuchung spezifische Methoden"""

"""error - test_administration.create_kommen_transaction(account, event)"""
"""geht - test_administration.create_start_event_transaction(1, 1)"""
"""geht - test_administration.book_start_event(account, 1, end)"""
"""geht - print(test_administration.get_all_start_event_transactions())"""
"""geht - print(test_administration.get_start_event_transaction_by_key(1))"""
"""geht - print(test_administration.get_start_event_transaction_by_account_key(2))"""


"""EndereignisBuchung spezifische Methoden"""

"""geht - test_administration.create_end_event_transaction(1, 1)"""
"""geht - test_administration.book_end_event(account, "EndeNeu", end)"""
"""geht - print(len(test_administration.get_all_end_event_transactions()))"""
"""geht - print(test_administration.get_end_event_transaction_by_key(1))"""
"""geht - print(test_administration.get_end_event_transaction_by_account_key(1))"""

"""
PauseBuchung spezifische Methoden
"""
"""geht - test_administration.create_pause_transaction(2, 2)"""
"""geht - test_administration.book_pause_transaction(account, "Name", end, end)"""
"""error - test_administration.get_all_pause_transactions()"""
"""geht - test_administration.get_pause_transaction_by_key(1)"""
"""geht - test_administration.get_pause_transaction_by_account_key(1)"""
"""error - test_administration.save_pause_transaction(pausebuchung)"""
"""geht - test_administration.delete_pause_transaction(pausebuchung)"""
