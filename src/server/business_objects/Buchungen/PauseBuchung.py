from server.business_objects.Buchungen.Zeitintervallbuchung import Zeitintervallbuchung


class PauseBuchung(Zeitintervallbuchung):

    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein PauseBuchung()-Objekt."""
        obj = PauseBuchung()
        obj.set_id(dictionary['id'])
        obj.set_target_user_account(dictionary['target_user_account'])
        obj.set_time_interval_id(dictionary['time_interval_id'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj
