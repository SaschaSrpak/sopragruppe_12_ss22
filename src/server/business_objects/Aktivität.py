from server.business_objects import BusinessObject as bo


class Aktivitaet(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._activity_name = str
        self._persons_responsible = []
        self._man_day_capacity = float

    def get_activity_name(self):
        """Anzeigen des Aktivitäts-Name"""
        return self._activity_name

    def set_activity_name(self, new_activity_name):
        """Ändern des Aktivitäts-Name"""
        self._activity_name = new_activity_name

    def get_persons_responsible(self):
        return self._persons_responsible

    def set_persons_responsible(self, new_persons_responsible):
        self._persons_responsible = new_persons_responsible

    def get_man_day_capacity(self):
        """Anzeigen der Kapazität in Personen-Tagen"""
        return self._man_day_capacity

    def set_man_day_capacity(self, new_man_day_capacity):
        """Ändern der Kapazität in Personen-Tagen"""
        self._man_day_capacity = new_man_day_capacity

    def add_new_responsible(self, person):
        """Neue verantnwortliche Person zu Dict hinzufügen"""
        self._persons_responsible.append(person)

    def delete_responsible(self, person):
        """Bestehende verantwortliche Person anhand des Keys aus Dict entfernen"""
        self._persons_responsible.pop(person)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Aktivitaet()-Objekt."""
        obj = Aktivitaet()
        obj.set_id(dictionary['id'])
        obj.set_activity_name(dictionary['activity_name'])
        obj.set_man_day_capacity(dictionary['man_day_capacity'])
        obj.set_persons_responsible(dictionary['persons_responsible'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj

