from server.business_objects.Buchungen.Zeitintervallbuchung import Zeitintervallbuchung


class ProjektarbeitBuchung(Zeitintervallbuchung):

    def __init__(self):
        super().__init__()
        self._target_activity = int

    def get_target_activity(self):
        """Anzeigen der Ziel-Aktivität"""
        return self._target_activity

    def set_target_activity(self, new_target):
        """Ändern der Ziel-Aktivität"""
        self._target_activity = new_target

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein PauseBuchung()-Objekt."""
        obj = ProjektarbeitBuchung()
        obj.set_id(dictionary['id'])
        obj.set_target_user_account(dictionary['target_user_account'])
        obj.set_time_interval_id(dictionary['time_interval_id'])
        obj.set_target_activity(dictionary['target_activity'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj
