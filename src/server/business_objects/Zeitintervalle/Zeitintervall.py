from server.business_objects import BusinessObject as bo
from datetime import timedelta
from business_objects.Ereignisse import Endereignis, Startereignis


class Zeitintervall (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._name = ""
        self._start = Startereignis
        self._end = Endereignis
        self._duration = timedelta

    def get_name(self):
        """Auslesen des Namens des Zeitintervalls."""
        return self._name

    def set_name(self, new_name):
        """Setzen des Namens des Zeitintervalls."""
        self._name = new_name

    def get_start(self):
        """Auslesen des Starts des Zeitintervalls."""
        return self._start

    def set_start(self, new_time):
        """Setzen des Starts des Zeitintervalls."""
        self._start = new_time

    def get_end(self):
        """Auslesen des Endes des Zeitintervalls."""
        return self._end

    def set_end(self, new_time):
        """Setzen des Endes des Zeitintervalls."""
        self._end = new_time

    def get_duration(self):
        """Auslesen der Länge des Zeitintervalls."""
        return self._duration

    def set_duration(self, new_duration):
        """Auslesen der Länge des Zeitintervalls."""
        self._duration = new_duration
