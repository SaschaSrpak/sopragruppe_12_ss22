from business_objects.Zeitintervalle.Zeitintervall import Zeitintervall


class Pause(Zeitintervall):
    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Pause()-Objekt."""
        obj = Pause()
        obj.set_id(dictionary['id'])
        obj.set_name(dictionary['name'])
        obj.set_start(dictionary['start'])
        obj.set_end(dictionary['end'])
        obj.set_duration(dictionary['duration'])
        obj.set_last_modified_date(dictionary['last_modified_date'])
        return obj