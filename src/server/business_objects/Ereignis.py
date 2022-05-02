from sopragruppe_12_ss22.src.server.business_objects import BusinessObject as bo
from datetime import datetime


class Ereignis (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._event_name = ""
        self._time_of_event = datetime

    def get_event_name(self):
        """Auslesen des Eventnamens des Ereignis."""
        return self._event_name

    def set_event_name(self, new_name):
        """Setzen des Eventnamens des Ereignis."""
        self._event_name = new_name

    def get_time_of_event(self):
        """Auslesen des Zeitpunkts des Ereignisses."""
        return self._time_of_event

    def set_time_of_event(self, new_time):
        """Setzen des Zeitpunkts des Ereignisses."""
        self._time_of_event = new_time