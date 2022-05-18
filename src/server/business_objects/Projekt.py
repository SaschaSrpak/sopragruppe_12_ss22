from server.business_objects import BusinessObject as bo
from datetime import datetime
from datetime import timedelta
from server.business_objects import Person


class Projekt (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = ""
        self._creator = int
        self._client = ""
        self._description = ""
        self._set_deadline = int
        self._project_duration = int
        self._activities = {}
        self._persons_responsible = {}

    def get_name(self):
        """Auslesen des Projektnamen"""
        return self._name

    def set_name(self, name):
        """Setzen des Projektnamen"""
        self._name = name

    def get_creator(self):
        """Auslesen des Fremdschlüssels der Person"""
        return self._creator

    def set_creator(self, name):
        """Setzen des Fremdschlüssels der Person"""
        self._creator = name

    def get_client(self):
        """Auslesen des Klienten(-namen)"""
        return self._client

    def set_client(self, name):
        """Setzten des Klienten(-namen)"""
        self._client = name

    def get_description(self):
        """Auslesen der Beschreibung des Projekts"""
        return self._description

    def set_description(self, descr):
        """Setzen der Beschreibung des Projekts"""
        self._description = descr

    def get_deadline(self):
        """Auslesen der geplanten Abgabe/Deadline"""
        return self._project_duration

    def set_deadline(self, value):
        """Setzen der Abgabe/Deadline"""
        self._project_duration = value

    def get_project_duration(self):
        """Auslesen der Projektlaufzeit"""
        return self._project_duration

    def set_project_duration(self, delta):
        """Setzen der Projektlaufzeit"""
        self._project_duration = delta

    def get_activities(self):
        """Auslesen der Aktivitäten"""
        return self._activities

    def set_activities(self, new_activities):
        self._activities = new_activities

    def add_activity(self, key, activity):
        """Hinzufügen einer Aktivität"""
        self._activities.update({key: activity})

    def delete_activity(self, key):
        """Entfernen einer Aktivität"""
        self._activities.pop(key)

    def get_person_responsible(self):
        """Auslesen der verantwortlichen Person(-en)"""
        return self._persons_responsible

    def set_person_responsible(self, persons):
        self._persons_responsible = persons

    def add_person_responsible(self, key, person):
        """Hinzufügen einer verantwortlichen Person"""
        self._persons_responsible.update({key: person})

    def delete_person_responsible(self, key):
        """Entfernen einer verantwortlichen Person"""
        self._persons_responsible.pop(key)

