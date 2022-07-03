from server.business_objects import BusinessObject as bo


class Projekt(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = ""
        self._creator = int
        self._client = ""
        self._description = ""
        self._set_deadline = ""
        self._project_duration = int
        self._activities = []
        self._persons_responsible = []

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
        return self._set_deadline

    def set_deadline(self, value):
        """Setzen der Abgabe/Deadline"""
        self._set_deadline = value

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

    def add_activity(self, activity):
        """Hinzufügen einer Aktivität"""
        self._activities.append(activity)

    def delete_activity(self, activity):
        """Entfernen einer Aktivität"""
        self._activities.remove(activity)

    def get_person_responsible(self):
        """Auslesen der verantwortlichen Person(-en)"""
        return self._persons_responsible

    def set_person_responsible(self, persons):
        self._persons_responsible = persons

    def add_person_responsible(self, key, person):
        """Hinzufügen einer verantwortlichen Person"""
        self._persons_responsible.append({key: person})

    def delete_person_responsible(self, person):
        """Entfernen einer verantwortlichen Person"""
        self._persons_responsible.remove(person)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Projekt()-Objekt."""
        obj = Projekt()
        obj.set_id(dictionary['id'])
        obj.set_name(dictionary['name'])
        obj.set_creator(dictionary['creator'])
        obj.set_client(dictionary['client'])
        obj.set_description(dictionary['description'])
        obj.set_deadline(dictionary['set_deadline'])
        obj.set_project_duration(dictionary['project_duration'])
        obj.set_activities(dictionary['activities'])
        obj.set_person_responsible(dictionary['persons_responsible'])

        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj
