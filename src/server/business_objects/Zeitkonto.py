from server.business_objects import BusinessObject as bo
from server.business_objects import Person


class Zeitkonto(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._owner = Person

    def get_owner(self):
        """Auslesen des Owners des Zeitkontos."""
        return self._owner

    def set_owner(self, new_owner):
        """Setzen des Owners des Zeitkontos."""
        self._owner = new_owner

    def __str__(self):
        return "Account: {}, {}".format(self.get_id(), self.get_owner())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python Dictionaries in ein Zeitkonto()-Objekt."""
        obj = Zeitkonto()
        obj.set_id(dictionary['id'])
        obj.set_owner(dictionary['owner'])
        return obj
