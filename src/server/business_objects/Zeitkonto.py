from server.business_objects import BusinessObject as bo
from server.business_objects import Person

class Zeitkonto (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._owner = Person

    def get_owner(self):
        """Auslesen des Owners des Zeitkontos."""
        return self._owner

    def set_owner(self, new_owner):
        """Setzen des Owners des Zeitkontos."""
        self._owner = new_owner

