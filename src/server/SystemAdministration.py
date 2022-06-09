import datetime as dt

from server.business_objects.Person import Person
from server.business_objects.Aktivität import Aktivitaet
from server.business_objects.Zeitkonto import Zeitkonto
from server.business_objects.Projekt import Projekt
from server.business_objects.Ereignisse.Kommen import Kommen
from server.business_objects.Ereignisse.Gehen import Gehen
from server.business_objects.Ereignisse.Startereignis import Startereignis
from server.business_objects.Ereignisse.Endereignis import Endereignis
from server.business_objects.Zeitintervalle.Projektarbeit import Projektarbeit
from server.business_objects.Zeitintervalle.Pause import Pause
from server.business_objects.Zeitintervalle.Projektlaufzeit import Projektlaufzeit
from server.business_objects.Buchungen.KommenBuchung import KommenBuchung
from server.business_objects.Buchungen.GehenBuchung import GehenBuchung
from server.business_objects.Buchungen.StartereignisBuchung import StartereignisBuchung
from server.business_objects.Buchungen.EndereignisBuchung import EndereignisBuchung
from server.business_objects.Buchungen.PauseBuchung import PauseBuchung
from server.business_objects.Buchungen.ProjektarbeitBuchung import ProjektarbeitBuchung

from server.db.PersonMapper import PersonMapper
from server.db.AktivitätMapper import AktivitaetMapper
from server.db.ZeitkontoMapper import ZeitkontoMapper
from server.db.ProjektMapper import ProjektMapper
from server.db.Ereignisse.KommenMapper import KommenMapper
from server.db.Ereignisse.GehenMapper import GehenMapper
from server.db.Ereignisse.StartereignisMapper import StartereignisMapper
from server.db.Ereignisse.EndereignisMapper import EndereignisMapper
from server.db.Zeitintervalle.ProjektarbeitMapper import ProjektarbeitMapper
from server.db.Zeitintervalle.PauseMapper import PauseMapper
from server.db.Zeitintervalle.ProjektlaufzeitMapper import ProjektlaufzeitMapper
from server.db.Buchungen.KommenBuchungMapper import KommenBuchungMapper
from server.db.Buchungen.GehenBuchungMapper import GehenBuchungMapper
from server.db.Buchungen.StartereignisBuchungMapper import StartereignisBuchungMapper
from server.db.Buchungen.EndereignisBuchungMapper import EndereignisBuchungMapper
from server.db.Buchungen.PauseBuchungMapper import PauseBuchungMapper
from server.db.Buchungen.ProjektarbeitBuchungMapper import ProjektarbeitBuchungMapper


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
        person.set_last_modified_date(dt.datetime.now())
        person.set_manager_status(manager_status)
        person.set_id(1)
        self.create_time_account_for_person(person)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_all_persons(self):
        """Gibt alle Benutzer aus die im System gespeichert sind"""
        with PersonMapper() as mapper:
            return mapper.find_all()

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
            return mapper.find_by_key(person_key)

    def save_person(self, person):
        """Den gegebenen Nutzer speichern"""
        person.set_last_modified_date(dt.datetime.now())
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, person):
        """Den angegebenen Benutzer aus dem System löschen"""
        person_account = self.get_time_account_by_person_key(person.get_id())
        self.delete_account(person_account)
        all_projects = self.get_project_by_person_key(person.get_id())
        for project in all_projects:
            self.delete_person_responsible_from_project(project, person)
        all_activities = self.get_activity_by_person_key(person.get_id())
        for activity in all_activities:
            self.delete_person_responsible_from_activity(activity, person)
        project_creator = self.get_project_by_creator_key(person.get_id())
        if project_creator is not None:
            for project in project_creator:
                self.delete_project(project)
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
            activity.add_new_responsible(person)
        activity.set_man_day_capacity(man_day_capacity)
        activity.set_last_modified_date(dt.datetime.now())
        activity.set_id(1)

        with AktivitaetMapper() as mapper:
            mapper.insert(activity)
            responsibles = activity.get_persons_responsible()
            for person in responsibles:
                mapper.insert_person_responsible(activity, person)
            return

    def get_all_activities(self):
        """Gibt alle Aktivitäten aus, die im System gespeichert sind."""

        with AktivitaetMapper() as mapper:
            all_activities = mapper.find_all()
            for activity in all_activities:
                responsibles = self.get_persons_by_activity_key(activity.get_id())
                activity.set_persons_responsible(responsibles)
            return all_activities

    def get_activity_by_key(self, activity_key):
        """Gibt die passende Aktivität zur gegebenen ID aus."""

        with AktivitaetMapper() as mapper:
            activity = mapper.find_by_key(activity_key)
            responsibles = self.get_persons_by_activity_key(activity.get_id())
            activity.set_persons_responsible(responsibles)
            return activity

    def get_activity_by_person_key(self, person_key):
        """Alle Aktivitäten, für die der gegebene Nutzer zuständig ist."""

        with AktivitaetMapper() as mapper:
            activities = mapper.find_by_person_key(person_key)
            for activity in activities:
                responsibles = self.get_persons_by_activity_key(activity.get_id())
                activity.set_persons_responsible(responsibles)
            return activities

    def get_activity_by_project_key(self, project_key):
        """Gibt das Projekt aus, zu welchem die jeweilige Aktivität gehört."""

        with AktivitaetMapper() as mapper:
            activities = mapper.find_by_project_key(project_key)
            for activity in activities:
                responsibles = self.get_persons_by_activity_key(activity.get_id())
                activity.set_persons_responsible(responsibles)
            return activities

    def add_person_responsible_to_activity(self, activity, person):
        with AktivitaetMapper() as mapper:
            return mapper.insert_person_responsible(activity, person)

    def change_activity_persons_responsible(self, activity_key, persons_responsible):
        """Ändert die zuständigen Personen. Ähnliche funktionsweise wie in der
        Methode 'create_activity'."""
        activity = self.get_activity_by_key(activity_key)
        activity.set_person_responsible(persons_responsible)
        activity.set_last_modified_date(dt.datetime.now())

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
        activity.set_last_modified_date(dt.datetime.now())
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

    def get_time_account_by_person_key(self, person_key):
        with ZeitkontoMapper() as mapper:
            return mapper.find_by_person_key(person_key)

    def save_account(self, account):
        """Speichert eine Zeitkonto-Instanz"""
        account.set_last_modified_date(dt.datetime.now())
        with ZeitkontoMapper() as mapper:
            mapper.update(account)

    def delete_account(self, account):
        """Das gegebene Zeitkonto löschen."""
        with ZeitkontoMapper() as mapper:
            mapper.delete(account)
        """Wichtig!: Diese Funktion muss noch ausgebaut werden!
        Es müssen alle Buchungen, welche auf dieses Konto
        gebucht wurden auch wieder entfernt werden, um die 
        referentielle Integrität des Gesamtsystems zu 
        gewährleisten"""

    def get_all_bookings_for_account(self, account):
        all_kommen_transactions = self.get_kommen_transaction_by_account_key(account.get_id())
        all_gehen_transactions = self.get_gehen_transaction_by_account_key(account.get_id())
        all_start_event_transactions = self.get_start_event_transaction_by_account_key(account.get_id())
        all_end_event_transactions = self.get_end_event_transaction_by_account_key(account.get_id())
        all_pause_transactions = self.get_pause_transaction_by_account_key(account.get_id())
        all_project_worktime_transactions = self.get_project_work_transaction_by_account_key(account.get_id())
        return all_kommen_transactions, all_gehen_transactions, all_start_event_transactions, \
               all_end_event_transactions, all_pause_transactions, all_project_worktime_transactions

    def get_full_work_time(self, account):
        all_project_worktime_transactions = self.get_project_work_transaction_by_account_key(account.get_id())
        full_work_time = 0
        all_project_worktimes =[]
        for transaction in all_project_worktime_transactions:
            worktime_id = transaction.get_time_interval_id()
            all_project_worktimes.append(self.get_project_worktime_by_key(worktime_id))

        for worktime in all_project_worktimes:
            full_work_time += worktime.get_duration()

        return full_work_time



    def get_full_pause_time(self, account):
        all_pause_transactions = self.get_pause_transaction_by_account_key(account.get_id())
        full_pause_time = 0
        all_pauses = []
        for transaction in all_pause_transactions:
            worktime_id = transaction.get_time_interval_id()
            all_pauses.append(self.get_project_worktime_by_key(worktime_id))

        for worktime in all_pauses:
            full_pause_time += worktime.get_duration()

        return full_pause_time

    def get_worktime_on_activity(self, account, activity):
        all_project_worktime_transactions = self.get_project_work_transaction_by_account_key(account.get_id())
        all_transactions_on_activity = []
        worktime_on_activity = 0
        for transaction in all_project_worktime_transactions:
            if transaction.get_target_activity() == activity.get_id():
                all_transactions_on_activity.append(transaction)

        for worktime in all_transactions_on_activity:
            worktime_on_activity += worktime.get_duration()

        return worktime_on_activity

    def get_work_time_on_project(self, account, project):
        all_activities_on_project = project.get_activities()
        worktime_on_project = 0
        for activity in all_activities_on_project:
            worktime_on_project += self.get_worktime_on_activity(account, activity)

        return worktime_on_project

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
                project.add_activity(activity)

        if not (persons_responsible is None):
            for person in persons_responsible:
                project.add_person_responsible(person.get_id(), person)

        project.set_last_modified_date(dt.datetime.now)
        project.set_id(1)

        with ProjektMapper() as mapper:
            mapper.insert(project)
            activities = project.get_activities()
            responsibles= project.get_person_responsible()
            for activity in activities:
                mapper.insert_activity(project, activity)
            for person in responsibles:
                mapper.insert_person_responsible(project, person)
            return

    def get_all_projects(self):
        with ProjektMapper() as mapper:
            all_projects = mapper.find_all()
            for project in all_projects:
                responsible = self.get_persons_by_project_key(project.get_id())
                activities = self.get_activity_by_project_key(project.get_id())
                project.set_person_responsible(responsible)
                project.set_activities(activities)
            return all_projects

    def get_project_by_key(self, project_key):
        with ProjektMapper() as mapper:
            project = mapper.find_by_key(project_key)
            responsible = self.get_persons_by_project_key(project_key)
            activities = self.get_activity_by_project_key(project_key)
            project.set_person_responsible(responsible)
            project.set_activities(activities)
            return project

    def get_project_by_client(self, client):
        with ProjektMapper() as mapper:
            projects = mapper.find_by_client(client)
            for project in projects:
                responsible = self.get_persons_by_project_key(project.get_id())
                activities = self.get_activity_by_project_key(project.get_id())
                project.set_person_responsible(responsible)
                project.set_activities(activities)
            return projects

    def get_project_by_creator_key(self, creator_key):
        with ProjektMapper() as mapper:
            projects = mapper.find_by_creator(creator_key)
            for project in projects:
                responsible = self.get_persons_by_project_key(project.get_id())
                activities = self.get_activity_by_project_key(project.get_id())
                project.set_person_responsible(responsible)
                project.set_activities(activities)
            return projects

    def get_project_by_person_key(self, person_key):
        with ProjektMapper() as mapper:
            projects = mapper.find_by_person_key(person_key)
            for project in projects:
                responsible = self.get_persons_by_project_key(project.get_id())
                activities = self.get_activity_by_project_key(project.get_id())
                project.set_person_responsible(responsible)
                project.set_activities(activities)
            return projects

    def add_person_responsible_to_project(self, project, person):
        with ProjektMapper() as mapper:
            return mapper.insert_person_responsible(project, person)

    def change_project_persons_responsible(self, project_key, persons_responsible):
        """Ändert die zuständigen Personen. Ähnliche funktionsweise wie in der
        Methode 'change_activity_persons_responsible'."""
        project = self.get_project_by_key(project_key)
        project.set_person_responsible(persons_responsible)
        project.set_last_modified_date(dt.datetime.now())

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

        project = self.get_project_by_key(project_key)
        project.set_activities(activities)
        project.set_last_modified_date(dt.datetime.now())

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
        project.set_last_modified_date(dt.datetime.now)
        with ProjektMapper() as mapper:
            mapper.update(project)

    def delete_project(self, project):
        with ProjektMapper() as mapper:
            activities_to_delete = self.get_activity_by_project_key(project.get_id())
            if not (activities_to_delete is None):
                for activity in activities_to_delete:
                    self.delete_activity(activity)
                    self.delete_activity_from_project(project, activity)
            responsible_list = self.get_persons_by_project_key(project.get_id())
            if not (responsible_list is None):
                for person in responsible_list:
                    self.delete_person_responsible_from_project(project, person)
                    self.delete_person_responsible_from_project(project, person)
            duration = self.get_project_duration_by_project_key(project.get_id())
            self.delete_project_duration(duration)

            mapper.delete(project)

    """
    Kommen spezifische Methoden
    """

    def create_kommen_event(self, name, time):
        kommen = Kommen()
        kommen.set_event_name(name)
        kommen.set_time_of_event(time)
        kommen.set_last_modified_date(dt.datetime.now())
        kommen.set_id(1)

        with KommenMapper() as mapper:
            mapper.insert(kommen)
            return kommen.get_id()

    def get_all_kommen_events(self):
        with KommenMapper() as mapper:
            return mapper.find_all()

    def get_kommen_event_by_key(self, event_key):
        with KommenMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_kommen_by_transaction_key(self, transaction_key):
        transaction = self.get_kommen_transaction_by_key(transaction_key)
        return self.get_kommen_event_by_key(transaction.get_event_id())

    def save_kommen_event(self, event):
        event.set_last_modified_date(dt.datetime.now())
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
        gehen.set_last_modified_date(dt.datetime.now())
        gehen.set_id(1)

        with GehenMapper() as mapper:
            mapper.insert(gehen)
            return gehen.get_id()

    def get_all_gehen_events(self):
        with GehenMapper() as mapper:
            return mapper.find_all()

    def get_gehen_event_by_key(self, event_key):
        with GehenMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_gehen_by_transaction_key(self, transaction_key):
        transaction = self.get_gehen_transaction_by_key(transaction_key)
        return self.get_gehen_event_by_key(transaction.get_event_id())

    def save_gehen_event(self, event):
        event.set_last_modified_date(dt.datetime.now())
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
        start.set_last_modified_date(dt.datetime.now())
        start.set_id(1)

        with StartereignisMapper() as mapper:
            mapper.insert(start)
            return start.get_id()

    def get_all_start_events(self):
        with StartereignisMapper() as mapper:
            return mapper.find_all()

    def get_start_event_by_key(self, event_key):
        with StartereignisMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_start_by_transaction_key(self, transaction_key):
        transaction = self.get_start_event_transaction_by_key(transaction_key)
        return self.get_start_event_by_key(transaction.get_event_id())

    def save_start_event(self, event):
        event.set_last_modified_date(dt.datetime.now())
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
        end.set_last_modified_date(dt.datetime.now())
        end.set_id(1)

        with EndereignisMapper() as mapper:
            mapper.insert(end)
            return end.get_id()

    def get_all_end_events(self):
        with EndereignisMapper() as mapper:
            return mapper.find_all()

    def get_end_event_by_key(self, event_key):
        with EndereignisMapper() as mapper:
            return mapper.find_by_key(event_key)

    def get_end_by_transaction_key(self, transaction_key):
        transaction = self.get_end_event_transaction_by_key(transaction_key)
        return self.get_end_event_by_key(transaction.get_event_id())

    def save_end_event(self, event):
        event.set_last_modified_date(dt.datetime.now())
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
        start_time = start.get_time_of_event()
        end_time = end.get_time_of_event()
        duration_seconds = end_time - start_time
        duration_hours = duration_seconds / dt.timedelta(hours=1)
        project_worktime.set_duration(duration_hours)
        project_worktime.set_start(start_event_id)
        project_worktime.set_end(end_event_id)
        project_worktime.set_last_modified_date(dt.datetime.now())
        project_worktime.set_id(1)

        with ProjektarbeitMapper() as mapper:
            mapper.insert(project_worktime)
            return project_worktime.get_id()

    def get_all_project_worktimes(self):
        with ProjektarbeitMapper() as mapper:
            return mapper.find_all()

    def get_project_worktime_by_key(self, interval_key):
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_key(interval_key)

    def get_project_worktime_by_transaction_key(self, transaction_key):
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_transaction_key(transaction_key)

    def save_project_worktime(self, interval):
        interval.set_last_modified_date(dt.datetime.now())
        with ProjektarbeitMapper() as mapper:
            mapper.update(interval)

    def delete_project_worktime(self, interval):
        with ProjektarbeitMapper() as mapper:
            mapper.delete(interval)

    """
    Pause spezifische Methoden
    """

    def create_pause(self, name, start_event_id, end_event_id):
        pause = Pause()
        pause.set_name(name)
        start = self.get_start_event_by_key(start_event_id)
        end = self.get_end_event_by_key(end_event_id)
        start_time = start.get_time_of_event()
        end_time = end.get_time_of_event()
        duration_seconds = end_time - start_time
        duration_hours = duration_seconds / dt.timedelta(hours=1)
        pause.set_duration(duration_hours)
        pause.set_start(start_event_id)
        pause.set_end(end_event_id)
        pause.set_last_modified_date(dt.datetime.now())
        pause.set_id(1)

        with PauseMapper() as mapper:
            mapper.insert(pause)
            return pause.get_id()

    def get_all_pauses(self):
        with PauseMapper() as mapper:
            return mapper.find_all()

    def get_pause_by_key(self, interval_key):
        with PauseMapper() as mapper:
            return mapper.find_by_key(interval_key)

    def get_pause_by_transaction_key(self, transaction_key):
        transaction = self.get_pause_by_transaction_key(transaction_key)
        return self.get_pause_by_key(transaction.get_time_interval_id())

    def save_pause(self, interval):
        interval.set_last_modified_date(dt.datetime.now())
        with PauseMapper() as mapper:
            mapper.update(interval)

    def delete_pause(self, interval):
        with PauseMapper() as mapper:
            mapper.delete(interval)

    """
    Projektlaufzeit spezifische Methoden
    """

    def create_project_duration(self, name, start_event_id, end_event_id):
        project_duration = Projektlaufzeit()
        project_duration.set_name(name)
        start = self.get_start_event_by_key(start_event_id)
        end = self.get_end_event_by_key(end_event_id)
        start_time = start.get_time_of_event()
        end_time = end.get_time_of_event()
        duration_seconds = end_time - start_time
        duration_hours = duration_seconds / dt.timedelta(hours=1)
        project_duration.set_duration(duration_hours)
        project_duration.set_start(start_event_id)
        project_duration.set_end(end_event_id)
        project_duration.set_last_modified_date(dt.datetime.now())
        project_duration.set_id(1)

        with ProjektlaufzeitMapper() as mapper:
            mapper.insert(project_duration)
            return project_duration.get_id()

    def get_all_project_duration(self):
        with ProjektlaufzeitMapper() as mapper:
            return mapper.find_all()

    def get_project_duration_by_key(self, interval_key):
        with ProjektlaufzeitMapper() as mapper:
            return mapper.find_by_key(interval_key)

    def get_project_duration_by_project_key(self, project_key):
        with ProjektlaufzeitMapper() as mapper:
            return mapper.find_by_project_key(project_key)

    def save_project_duration(self, interval):
        interval.set_last_modified_date(dt.datetime.now())
        with ProjektlaufzeitMapper() as mapper:
            mapper.update(interval)

    def delete_project_duration(self, interval):
        with ProjektlaufzeitMapper() as mapper:
            mapper.delete(interval)

    """
    KommenBuchung spezifische Methoden
    """

    def create_kommen_transaction(self, account_id, event_id):
        transaction = KommenBuchung()
        transaction.set_target_user_account(account_id)
        transaction.set_event_id(event_id)
        transaction.set_last_modified_date(dt.datetime.now())
        transaction.set_id(1)

        with KommenBuchungMapper() as mapper:
            return mapper.insert(transaction)

    def book_kommen_event(self, account, name, time):
        kommen_transactions = self.get_kommen_transaction_by_account_key(account.get_id())
        kommen_events = []
        for transaction in kommen_transactions:
            kommen_events.append(self.get_kommen_event_by_key(transaction.get_event_id()))
        last_kommen_event = kommen_events[-1]

        gehen_transactions = self.get_gehen_transaction_by_account_key(account.get_id())
        gehen_events = []
        for transaction in gehen_transactions:
            gehen_events.append(self.get_gehen_event_by_key(transaction.get_event_id()))
        last_gehen_event = gehen_events[-1]

        if last_kommen_event.get_time_of_event() > last_gehen_event.get_time_of_event():
            return

        else:
            event = self.create_kommen_event(name, time)
            account_id = account.get_id()
            self.create_kommen_transaction(account_id, event)
            return event

    def get_all_kommen_transactions(self):
        with KommenBuchungMapper() as mapper:
            return mapper.find_all()

    def get_kommen_transaction_by_key(self, transaction_key):
        with KommenBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_kommen_transaction_by_account_key(self, account_key):
        with KommenBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def save_kommen_transaction(self, transaction):
        with KommenBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_kommen_transaction(self, transaction):
        self.delete_kommen_event(transaction)
        with KommenBuchungMapper() as mapper:
            mapper.delete(transaction)

    """
    GehenBuchung spezifische Methoden
    """

    def create_gehen_transaction(self, account_id, event_id):
        transaction = GehenBuchung()
        transaction.set_target_user_account(account_id)
        transaction.set_event_id(event_id)
        transaction.set_last_modified_date(dt.datetime.now())
        transaction.set_id(1)

        with GehenBuchungMapper() as mapper:
            return mapper.insert(transaction)

    def book_gehen_event(self, account, name, time):
        kommen_transactions = self.get_kommen_transaction_by_account_key(account.get_id())
        kommen_events = []
        for transaction in kommen_transactions:
            kommen_events.append(self.get_kommen_event_by_key(transaction.get_event_id()))
        last_kommen_event = kommen_events[-1]

        gehen_transactions = self.get_gehen_transaction_by_account_key(account.get_id())
        gehen_events = []
        for transaction in gehen_transactions:
            gehen_events.append(self.get_gehen_event_by_key(transaction.get_event_id()))
        last_gehen_event = gehen_events[-1]

        if last_kommen_event.get_time_of_event() > last_gehen_event.get_time_of_event():
            return

        else:
            event = self.create_gehen_event(name, time)
            account_id = account.get_id()
            self.create_gehen_transaction(account_id, event)
            return event

    def get_all_gehen_transactions(self):
        with GehenBuchungMapper() as mapper:
            return mapper.find_all()

    def get_gehen_transaction_by_key(self, transaction_key):
        with GehenBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_gehen_transaction_by_account_key(self, account_key):
        with GehenBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def save_gehen_transaction(self, transaction):
        with GehenBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_gehen_transaction(self, transaction):
        self.delete_gehen_event(transaction)
        with GehenBuchungMapper() as mapper:
            mapper.delete(transaction)

    """
    StartereignisBuchung spezifische Methoden
    """

    def create_start_event_transaction(self, account_id, event_id):
        transaction = StartereignisBuchung()
        transaction.set_target_user_account(account_id)
        transaction.set_event_id(event_id)
        transaction.set_last_modified_date(dt.datetime.now())
        transaction.set_id(1)

        with StartereignisBuchungMapper() as mapper:
            return mapper.insert(transaction)

    def book_start_event(self, account, name, time):
        event = self.create_start_event(name, time)
        account_id = account.get_id()
        print(account_id)
        print(account.get_id())
        self.create_start_event_transaction(account_id, event)
        return event

    def get_all_start_event_transactions(self):
        with StartereignisBuchungMapper() as mapper:
            return mapper.find_all()

    def get_start_event_transaction_by_key(self, transaction_key):
        with StartereignisBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_start_event_transaction_by_account_key(self, account_key):
        with StartereignisBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def save_start_event_transaction(self, transaction):
        with StartereignisBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_start_event_transaction(self, transaction):
        self.delete_start_event(transaction)
        with StartereignisBuchungMapper() as mapper:
            mapper.delete(transaction)

    """
    EndereignisBuchung spezifische Methoden
    """

    def create_end_event_transaction(self, account_id, event_id):
        transaction = EndereignisBuchung()
        transaction.set_target_user_account(account_id)
        transaction.set_event_id(event_id)
        transaction.set_last_modified_date(dt.datetime.now())
        transaction.set_id(1)

        with EndereignisBuchungMapper() as mapper:
            return mapper.insert(transaction)

    def book_end_event(self, account, name, time):
        event = self.create_end_event(name, time)
        account_id = account.get_id()
        self.create_end_event_transaction(account_id, event)
        return event

    def get_all_end_event_transactions(self):
        with EndereignisBuchungMapper() as mapper:
            return mapper.find_all()

    def get_end_event_transaction_by_key(self, transaction_key):
        with EndereignisBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_end_event_transaction_by_account_key(self, account_key):
        with EndereignisBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def save_end_event_transaction(self, transaction):
        with EndereignisBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_end_event_transaction(self, transaction):
        self.delete_end_event(transaction)
        with EndereignisBuchungMapper() as mapper:
            mapper.delete(transaction)

    """
    PauseBuchung spezifische Methoden
    """

    def create_pause_transaction(self, account_id, interval_id):
        interval = PauseBuchung()
        interval.set_target_user_account(account_id)
        interval.set_time_interval_id(interval_id)
        interval.set_last_modified_date(dt.datetime.now())
        interval.set_id(1)

        with PauseBuchungMapper() as mapper:
            return mapper.insert(interval)

    def book_pause_transaction(self, account, name, start_event_time, end_event_time):
        start_event = self.book_start_event(account, "Start", start_event_time)
        end_event = self.book_end_event(account, "Ende", end_event_time)
        pause = self.create_pause(name, start_event, end_event)
        account_id = account.get_id()
        self.create_pause_transaction(account_id, pause)

    def get_all_pause_transactions(self):
        with PauseBuchungMapper() as mapper:
            return mapper.find_all()

    def get_pause_transaction_by_key(self, transaction_key):
        with PauseBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_pause_transaction_by_account_key(self, account_key):
        with PauseBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def show_daily_pause_transactions_for_account(self, account_id, date):
        daily_transactions = []
        date_string = dt.date.strftime(date, "%y-%m-%d")
        all_transactions = self.get_pause_transaction_by_account_key(account_id)
        for x in all_transactions:
            interval = self.get_pause_by_key(x.get_time_interval_id())
            start_event = self.get_start_event_by_key(interval.get_start())
            start_event_time = start_event.get_time_of_event()
            time_string = dt.datetime.strftime(start_event_time, "%y-%m-%d %H:%M:%S")
            if date_string in time_string:
                daily_transactions.append(x)

        return daily_transactions

    def save_pause_transaction(self, transaction):
        transaction.set_last_modified_date(dt.datetime.now())
        with PauseBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_pause_transaction(self, transaction):
        with PauseBuchungMapper() as mapper:
            mapper.delete(transaction)

    """ProjektarbeitBuchung spezifische Methoden"""

    def create_project_work_transaction(self, account_id, activity_id, interval_id):
        interval = ProjektarbeitBuchung()
        interval.set_target_user_account(account_id)
        interval.set_target_activity(activity_id)
        interval.set_time_interval_id(interval_id)
        interval.set_last_modified_date(dt.datetime.now())
        interval.set_id(1)

        with ProjektarbeitBuchungMapper() as mapper:
            return mapper.insert(interval)

    def book_project_work_transaction(self, account, name, activity_id, start_event_time, end_event_time):
        start_event_date = dt.datetime.date(start_event_time)
        daily_transactions = self.show_daily_worktime_transactions_for_account(account.get_id(), start_event_date)
        daily_worktime_intervals = []
        daily_worktime_hours = 0.0
        for transaction in daily_transactions:
            interval = self.get_project_worktime_by_key(transaction.get_time_interval_id())
            daily_worktime_intervals.append(interval)

        for interval in daily_worktime_intervals:
            daily_worktime_hours += interval.get_duration()

        daily_pauses = self.show_daily_pause_transactions_for_account(account.get_id(), start_event_date)
        daily_pause_intervals = []
        daily_pause_hours = 0.0
        for transaction in daily_pauses:
            interval = self.get_pause_by_key(transaction.get_time_interval_id())
            daily_pause_intervals.append(interval)

        for interval in daily_pause_intervals:
            daily_pause_hours += interval.get_duration()

        duration_seconds = end_event_time - start_event_time
        duration_hours = duration_seconds / dt.timedelta(hours=1)
        daily_worktime_hours += duration_hours

        if daily_worktime_hours >= 6.0:
            if daily_pause_hours < 0.5:
                t = 0.5 - daily_pause_hours
                pause_end_event_time = end_event_time
                td = dt.timedelta(hours=t, seconds=1)
                end_event_time = end_event_time - td
                td2 = dt.timedelta(seconds=1)
                pause_start_event_time = end_event_time + td2
                self.book_pause_transaction(account, "Überschreitung der Arbeitszeit ohne Pause bei" + name,
                                            pause_start_event_time, pause_end_event_time)
                daily_worktime_hours -= t
        """Es muss dringend noch gecheckt werden wie viel Pause auf den account täglich gebucht wurde ansonsten ist
                die Funktion fehlerhaft, da immer wenn die Arbeitszeit über 6h ist, eine Pause gebucht wird, obwohl möglicherweise
                schon eine halbe Stunde Pause gebucht wurde"""

        if daily_worktime_hours >= 9.0:
            if daily_pause_hours < 0.75:
                t = 0.75 - daily_pause_hours
                pause_end_event_time = end_event_time
                td = dt.timedelta(hours=t, seconds=1)
                end_event_time = end_event_time - td
                td2 = dt.timedelta(seconds=1)
                pause_start_event_time = end_event_time + td2
                self.book_pause_transaction(account, "Überschreitung der Arbeitszeit ohne Pause bei" + name,
                                            pause_start_event_time, pause_end_event_time)
                daily_worktime_hours -= t

        if daily_worktime_hours >= 10:
            t = abs(10 - daily_worktime_hours)
            td = dt.timedelta(hours=t)
            end_event_time = end_event_time - td
            self.book_gehen_event(account, "Automatische Buchung aufgrund von Überschreitung der Arbeitszeit",
                                  end_event_time)
            return

        start_event = self.book_start_event(account, "Start", start_event_time)
        end_event = self.book_end_event(account, "Ende", end_event_time)
        project_worktime = self.create_project_worktime(name, start_event, end_event)
        account_id = account.get_id()
        self.create_project_work_transaction(account_id, activity_id, project_worktime)

    def get_all_project_work_transactions(self):
        with ProjektarbeitBuchungMapper() as mapper:
            return mapper.find_all()

    def get_project_work_transaction_by_key(self, transaction_key):
        with ProjektarbeitBuchungMapper() as mapper:
            return mapper.find_by_key(transaction_key)

    def get_project_work_transaction_by_account_key(self, account_key):
        with ProjektarbeitBuchungMapper() as mapper:
            return mapper.find_by_account_key(account_key)

    def show_daily_worktime_transactions_for_account(self, account_id, date):
        daily_transactions = []
        date_string = dt.date.strftime(date, "%y-%m-%d")
        all_transactions = self.get_project_work_transaction_by_account_key(account_id)
        for transaction in all_transactions:
            interval = self.get_project_worktime_by_key(transaction.get_time_interval_id())
            start_event = self.get_start_event_by_key(interval.get_start())
            start_event_time = start_event.get_time_of_event()
            time_string = dt.datetime.strftime(start_event_time, "%y-%m-%d %H:%M:%S")
            if date_string in time_string:
                daily_transactions.append(transaction)

        return daily_transactions

    def get_project_work_transaction_by_activity_key(self, activity_key):
        with ProjektarbeitBuchungMapper() as mapper:
            return mapper.find_by_activity_key(activity_key)

    def save_project_work_transaction(self, transaction):
        transaction.set_last_modified_date(dt.datetime.now())
        with ProjektarbeitBuchungMapper() as mapper:
            mapper.update(transaction)

    def delete_project_work_transaction(self, transaction):
        with ProjektarbeitBuchungMapper() as mapper:
            mapper.delete(transaction)
