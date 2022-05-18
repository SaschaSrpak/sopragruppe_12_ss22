from datetime import datetime
import datetime

from server.business_objects.Person import Person
from server.business_objects.Aktivität import Aktivitaet
from server.business_objects.Zeitkonto import Zeitkonto
from server.business_objects.Projekt import Projekt
from server.business_objects.Ereignisse.Kommen import Kommen
from server.business_objects.Ereignisse.Gehen import Gehen
from server.business_objects.Ereignisse.Startereignis import Startereignis
from server.business_objects.Ereignisse.Endereignis import Endereignis
from server.business_objects.Zeitintervalle.Projektarbeit import Projektarbeit

from server.db.PersonMapper import PersonMapper
from server.db.AktivitätMapper import AktivitaetMapper
from server.db.ZeitkontoMapper import ZeitkontoMapper
from server.db.ProjektMapper import ProjektMapper
from server.db.Ereignisse.KommenMapper import KommenMapper
from server.db.Ereignisse.GehenMapper import GehenMapper
from server.db.Ereignisse.StartereignisMapper import StartereignisMapper
from server.db.Ereignisse.EndereignisMapper import EndereignisMapper
from server.db.Zeitintervalle.ProjektarbeitMapper import ProjektarbeitMapper


class SystemAdministration(object):

    def __init__(self):
        pass

    """
    Personen spezifische Methoden
    """

    def create_person(self, name, surname, mail_address, user_name, firebase_id, manager_status):
        """Diese Funktion dient dazu einen Benutzer im System anzulegen."""
        person = Person()
        person.set_name(name)
        person.set_surname(surname)
        person.set_mail_address(mail_address)
        person.set_user_name(user_name)
        person.set_firebase_id(firebase_id)
        person.set_last_modified_date(datetime.datetime.now())
        person.set_manager_status(manager_status)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_all_persons(self):
        """Gibt alle Benutzer aus die im System gespeichert sind"""
        with PersonMapper() as mapper:
            return mapper.fing_all()

    def get_persons_by_activity_key(self, activity_key):
        """Alle Benutzer, die für eine Aktivität zuständig sind."""
        with PersonMapper() as mapper:
            return mapper.find_by_activity_key(activity_key)

    def get_persons_by_project_key(self, project_key):
        """Alle Benutzer, die für eine Aktivität zuständig sind."""
        with PersonMapper() as mapper:
            return mapper.find_by_project_key(project_key)

    def get_person_by_key(self, person_key):
        """Gibt den passenden Nutzer zur gegebenen ID aus"""
        with PersonMapper() as mapper:
            return mapper.fing_by_id(person_key)

    def save_person(self, person):
        """Den gegebenen Nutzer speichern"""
        person.set_last_modified_date(datetime.datetime.now())
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, person):
        """Den angegebenen Benutzer aus dem System löschen"""
        with PersonMapper() as mapper:
            mapper.delete(person)

    """
    Aktivität spezifische Methoden
    """

    def create_activity(self, name, persons_responsible, man_day_capacity):
        """Diese Funktion dient dazu eine Aktivität im System anzulegen.
        Wichtig hierbei ist, dass die Variable 'persons_responsible' eine Liste/Tuple ist.
        Durch die Methode 'add_new_responsible' der Klasse 'Aktivitaet' werden die
        Listeninhalte an das Objekt in Form eines Dictionaries weiter gegeben.
        Bei der verwendung der Mapper-Klasse wird dann wiederum für jedes Personen-Objekt
        im Dictionary die Methode 'insert_person_responsible' aufgerufen, wodurch
        die ID der Aktivität und die ID der Personen-Objekte in einem Association Table
        gespeichert wird."""
        activity = Aktivitaet()
        activity.set_activity_name(name)
        for person in persons_responsible:
            activity.add_new_responsible(person.get_id(), person)
        activity.set_man_day_capacity(man_day_capacity)
        activity.set_last_modified_date(datetime.datetime.now())
        activity.set_id(1)

        with AktivitaetMapper() as mapper:
            mapper.insert(activity)
            responsible_dict = activity.get_persons_responsible()
            for person in responsible_dict:
                mapper.insert_person_responsible(activity, person)
            return

    def get_all_activities(self):
        """Gibt alle Aktivitäten aus, die im System gespeichert sind."""

        with AktivitaetMapper() as mapper:
            return mapper.find_all()

    def get_activity_by_key(self, activity_key):
        """Gibt die passende Aktivität zur gegebenen ID aus."""

        with AktivitaetMapper() as mapper:
            return mapper.find_by_key(activity_key)

    def get_activity_by_person_key(self, person_key):
        """Alle Aktivitäten, für die der gegebene Nutzer zuständig ist."""

        with AktivitaetMapper() as mapper:
            return mapper.find_by_person_key(person_key)

    def get_activity_by_project_key(self, project_key):
        """Gibt das Projekt aus, zu welchem die jeweilige Aktivität gehört."""

        with AktivitaetMapper() as mapper:
            return mapper.find_by_project_key(project_key)

    def add_person_responsible_to_activity(self, activity, person):
        with AktivitaetMapper() as mapper:
            return mapper.insert_person_responsible(activity, person)

    def change_activity_persons_responsible(self, activity_key, persons_responsible):
        """Ändert die zuständigen Personen. Ähnliche funktionsweise wie in der
        Methode 'create_activity'."""
        activity = self.get_activity_by_key(activity_key)
        activity.set_person_responsible(persons_responsible)
        activity.set_last_modified_date(datetime.datetime.now())

        with AktivitaetMapper() as mapper:
            responsible_dict = activity.get_persons_responsible()
            if not (responsible_dict is None):
                for person in responsible_dict:
                    mapper.update_person_responsible(activity, person)
            mapper.update(activity)

    def delete_person_responsible_from_activity(self, activity, person):
        """Löscht eine bestimmte Person von der Zuständigkeitsliste"""

        with AktivitaetMapper() as mapper:
            mapper.delete_person_responsible(activity, person)

    def update_activity(self, activity):
        """Die gegebene Aktivität speichern"""
        activity.set_last_modified_date(datetime.datetime.now())
        with AktivitaetMapper() as mapper:
            mapper.update(activity)

    def delete_activity(self, activity):
        """Die gegebene Aktivität löschen"""
        with AktivitaetMapper() as mapper:
            responsible_list = self.get_persons_by_activity_key(activity.get_id())
            if not (responsible_list is None):
                for person in responsible_list:
                    self.delete_person_responsible_from_activity(activity, person)
            mapper.delete(activity)

    """
    Zeitkonto spezifische Methoden
    """

    def create_time_account_for_person(self, person):
        """Ein Zeitkonto für eine Person erstellen."""
        with ZeitkontoMapper() as mapper:
            if person is not None:
                account = Zeitkonto()
                account.set_owner(person.get_id())
                account.set_id(1)
                return mapper.insert(account)
            else:
                return None

    def get_all_time_accounts(self):
        """Zeigt alle Zeitkonten"""
        with ZeitkontoMapper() as mapper:
            return mapper.find_all()

    def get_time_account_by_key(self, account_key):
        """Gibt das passende Zeitkonto zur gegebenen ID aus."""
        with ZeitkontoMapper() as mapper:
            return mapper.find_by_key(account_key)

    def save_account(self, account):
        """Speichert eine Zeitkonto-Instanz"""
        account.set_last_modified_date(datetime.datetime.now())
        with ZeitkontoMapper() as mapper:
            mapper.update(account)

    def delete_account(self, account):
        """Das gegebene Zeitkonto löschen."""
        with ZeitkontoMapper() as mapper:
            mapper.delete(account)
        """Wichtig!: Diese Funktion muss noch ausgebaut werden!
        Es müssen alle Buchungen, welche auf dieses Konto
        gebucht wurden auch wieder entfernt werden, um die 
        referientielle Integrität des Gesamtsystems zu 
        gewährleisten"""

    def get_full_work_time(self, account):
        pass

    def get_full_pause_time(self, account):
        pass

    def get_worktime_on_activity(self, account, activity):
        pass

    def get_work_time_on_project(self, account, project):
        pass

    """
    Projekt spezifische Methoden
    """

    def create_project(self, name, creator_id, client, description, deadline_id,
                       project_duration_id, activities, persons_responsible):

        project = Projekt()
        project.set_name(name)
        project.set_creator(creator_id)
        project.set_client(client)
        project.set_description(description)
        project.set_deadline(deadline_id)
        project.set_project_duration(project_duration_id)
        if not (activities is None):
            for activity in activities:
                project.add_activity(activity.get_id(), activity)

        if not (persons_responsible is None):
            for person in persons_responsible:
                project.add_person_responsible(person.get_id(), person)

        project.set_last_modified_date(datetime.datetime.now)
        project.set_id(1)

        with ProjektMapper() as mapper:
            mapper.insert(project)
            activity_dict = project.get_activities()
            responsible_dict = project.get_person_responsible()
            for activity in activity_dict:
                mapper.insert_activity(project, activity)
            for person in responsible_dict:
                mapper.insert_person_responsible(project, person)
            return

    def get_all_projects(self):
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def get_project_by_key(self, project_key):
        with ProjektMapper() as mapper:
            return mapper.find_by_key(project_key)

    def get_project_by_client(self, client):
        with ProjektMapper() as mapper:
            return mapper.find_by_client(client)

    def get_project_by_creator_key(self, creator_key):
        with ProjektMapper() as mapper:
            return mapper.find_by_creator(creator_key)

    def get_project_by_person_key(self, person_key):
        with ProjektMapper() as mapper:
            return mapper.find_by_person_key(person_key)

    def add_person_responsible_to_project(self, project, person):
        with ProjektMapper() as mapper:
            return mapper.insert_person_responsible(project, person)

    def change_project_persons_responsible(self, project_key, persons_responsible):
        """Ändert die zuständigen Personen. Ähnliche funktionsweise wie in der
        Methode 'change_activity_persons_responsible'."""
        project = self.get_activity_by_key(project_key)
        project.set_person_responsible(persons_responsible)
        project.set_last_modified_date(datetime.datetime.now())

        with ProjektMapper() as mapper:
            responsible_dict = project.get_persons_responsible()
            if not (responsible_dict is None):
                for person in responsible_dict:
                    mapper.update_person_responsible(project, person)
            mapper.update(project)

    def delete_person_responsible_from_project(self, project, person):
        with ProjektMapper() as mapper:
            mapper.delete_person_responsible(project, person)

    def get_project_by_activity_key(self, activity_key):
        with ProjektMapper() as mapper:
            mapper.find_by_activity_key(activity_key)

    def add_activity_to_project(self, project, activity):
        with ProjektMapper() as mapper:
            mapper.insert_activity(project, activity)

    def change_project_activities(self, project_key, activities):
        """Ändert Aktivitäten des Projekts."""
        project = self.get_activity_by_key(project_key)
        project.set_activities(activities)
        project.set_last_modified_date(datetime.datetime.now())

        with ProjektMapper() as mapper:
            activities_dict = project.get_activities()
            if not (activities_dict is None):
                for activity in activities_dict:
                    mapper.update_activity(project, activity)
            mapper.update(project)

    def delete_activity_from_project(self, project, activity):
        with ProjektMapper() as mapper:
            mapper.delete_activity(project, activity)

    def save_project(self, project):
        project.set_last_modified_date(datetime.datetime.now)
        with ProjektMapper() as mapper:
            mapper.update(project)

    def delete_project(self, project):
        with ProjektMapper() as mapper:
            activities_to_delete = self.get_activity_by_project_key(project.get_id())
            if not (activities_to_delete is None):
                for activity in activities_to_delete:
                    self.delete_activity(activity)
            responsible_list = self.get_persons_by_project_key(project.get_id())
            if not (responsible_list is None):
                for person in responsible_list:
                    self.delete_person_responsible_from_project(project, person)

            mapper.delete(project)

    """
    Kommen spezifische Methoden
    """

    def create_kommen_event(self, name, time):
        kommen = Kommen()
        kommen.set_event_name(name)
        kommen.set_time_of_event(time)
        kommen.set_last_modified_date(datetime.datetime.now())
        kommen.set_id(1)

        with KommenMapper() as mapper:
            return mapper.insert(kommen)

    def get_all_kommen_events(self):
        with KommenMapper() as mapper:
            return mapper.find_all()

    def get_kommen_event_by_key(self, event_key):
        with KommenMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_kommen_by_booking_key(self, booking_key):
        pass

    def save_kommen_event(self, event):
        event.set_last_modified_date(datetime.datetime.now())
        with KommenMapper() as mapper:
            mapper.update(event)

    def delete_kommen_event(self, event):
        with KommenMapper() as mapper:
            mapper.delete(event)

    """
    Gehen spezifische Methoden
    """

    def create_gehen_event(self, name, time):
        gehen = Gehen()
        gehen.set_event_name(name)
        gehen.set_time_of_event(time)
        gehen.set_last_modified_date(datetime.datetime.now())
        gehen.set_id(1)

        with GehenMapper() as mapper:
            return mapper.insert(gehen)

    def get_all_gehen_events(self):
        with GehenMapper() as mapper:
            return mapper.find_all()

    def get_gehen_event_by_key(self, event_key):
        with GehenMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_gehen_by_booking_key(self, booking_key):
        pass

    def save_gehen_event(self, event):
        event.set_last_modified_date(datetime.datetime.now())
        with GehenMapper() as mapper:
            mapper.update(event)

    def delete_gehen_event(self, event):
        with GehenMapper() as mapper:
            mapper.delete(event)

    """
    Startereignis spezifische Methoden
    """

    def create_start_event(self, name, time):
        start = Startereignis()
        start.set_event_name(name)
        start.set_time_of_event(time)
        start.set_last_modified_date(datetime.datetime.now())
        start.set_id(1)

        with StartereignisMapper() as mapper:
            return mapper.insert(start)

    def get_all_start_events(self):
        with StartereignisMapper() as mapper:
            return mapper.find_all()

    def get_start_event_by_key(self, event_key):
        with StartereignisMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_start_by_booking_key(self, booking_key):
        pass

    def get_start_by_interval_key(self, interval_key):
        pass

    def save_start_event(self, event):
        event.set_last_modified_date(datetime.datetime.now())
        with StartereignisMapper() as mapper:
            mapper.update(event)

    def delete_start_event(self, event):
        with StartereignisMapper() as mapper:
            mapper.delete(event)

    """
    Endereignis spezifische Methoden
    """

    def create_end_event(self, name, time):
        end = Endereignis()
        end.set_event_name(name)
        end.set_time_of_event(time)
        end.set_last_modified_date(datetime.datetime.now())
        end.set_id(1)

        with EndereignisMapper() as mapper:
            return mapper.insert(end)

    def get_all_end_events(self):
        with EndereignisMapper() as mapper:
            return mapper.find_all()

    def get_end_event_by_key(self, event_key):
        with EndereignisMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_end_by_booking_key(self, booking_key):
        pass

    def get_end_by_interval_key(self, interval_key):
        pass

    def save_end_event(self, event):
        event.set_last_modified_date(datetime.datetime.now())
        with EndereignisMapper() as mapper:
            mapper.update(event)

    def delete_end_event(self, event):
        with EndereignisMapper() as mapper:
            mapper.delete(event)

    """
    Projektarbeit spezifische Methode
    """

    def create_project_worktime(self, name, start_event_id, end_event_id):
        project_worktime = Projektarbeit()
        project_worktime.set_name(name)
        start = self.get_start_event_by_key(start_event_id)
        end = self.get_end_event_by_key(end_event_id)
        start_time = datetime.strptime(start.get_time_of_event, "%y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(end.get_time_of_event, "%y-%m-%d %H:%M:%S")
        duration_seconds = end_time - start_time
        duration_hours = duration_seconds / datetime.timedelta(hours=1)
        project_worktime.set_duration(duration_hours)
        project_worktime.set_start(start_event_id)
        project_worktime.set_end(end_event_id)
        project_worktime.set_last_modified_date(datetime.datetime.now())
        project_worktime.set_id(1)

        with ProjektarbeitMapper() as mapper:
            return mapper.insert(project_worktime)

    def get_all_project_worktimes(self):
        with ProjektMapper() as mapper:
            return mapper.find_all()

    

