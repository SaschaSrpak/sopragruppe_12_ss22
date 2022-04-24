from server.business_objects import Buchung
from server.business_objects import Zeitintervall


class Zeitintervallbuchung(Buchung):

    def __init__(self):
        super().__init__()
        self.__source_time_interval = Zeitintervall

    def get_source_time_interval(self):
        """Anzeigen des Zeitintervalls, auf welches sich die Buchung bezieht."""
        return self.__source_time_interval

    def set_source_time_interval(self, new_source):
        """Mit dieser Funktion kann ein Bezug zwischen der Buchung
        und einem Zeitintervall-Objekt hergestellt werden"""
        self.__source_time_interval = new_source
