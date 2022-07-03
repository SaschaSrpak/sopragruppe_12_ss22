from server.business_objects.Ereignisse.Ereignis import Ereignis


class Gehen(Ereignis):
    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Gehen()-Objekt."""
        obj = Gehen()
        obj.set_id(dictionary['id'])
        obj.set_event_name(dictionary['event_name'])
        obj.set_time_of_event(dictionary['time_of_event'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj
