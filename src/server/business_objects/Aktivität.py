from server.business_objects import BusinessObject as bo


class Aktivitaet(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__activity_name = str
        self.__persons_responsible = dict()
        self.__man_day_capacity = float

    def get_activity_name(self):
        """Anzeigen des Aktivitäts-Name"""
        return self.__activity_name

    def set_activity_name(self, new_activity_name):
        """Ändern des Aktivitäts-Name"""
        self.__activity_name = new_activity_name

    """def get_persons_responsible(self):
        return self.__persons_responsible

    def set_persons_responsible(self, new_persons_responsible):
        self.__persons_responsible = new_persons_responsible"""

    def get_man_day_capacity(self):
        """Anzeigen der Kapazität in Personen-Tagen"""
        return self.__man_day_capacity

    def set_man_day_capacity(self, new_man_day_capacity):
        """Ändern der Kapazität in Personen-Tagen"""
        self.__man_day_capacity = new_man_day_capacity

    def add_new_responsible(self, key, person):
        """Neue verantnwortliche Person zu Dict hinzufügen"""
        self.__persons_responsible.update({key: person})

    def delete_responsible(self, key):
        """Bestehende verantwortliche Person anhand des Keys aus Dict entfernen"""
        self.__persons_responsible.pop(key)