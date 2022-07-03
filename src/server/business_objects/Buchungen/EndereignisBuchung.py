from server.business_objects.Buchungen.Ereignisbuchung import Ereignisbuchung


class EndereignisBuchung(Ereignisbuchung):

    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Endereignis()-Objekt."""
        obj = EndereignisBuchung()
        obj.set_id(dictionary['id'])
        obj.set_target_user_account(dictionary['target_user_account'])
        obj.set_event_id(dictionary['event_id'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj
