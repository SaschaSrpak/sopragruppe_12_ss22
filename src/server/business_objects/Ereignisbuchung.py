from server.business_objects import Buchung
from server.business_objects import Ereignis


class Ereignisbuchung(Buchung):

    def __init__(self):
        super().__init__()
        self.__source_event = Ereignis

    def get_source_time_interval(self):
        """Anzeigen des Ereignisses, auf welches sich die Buchung bezieht."""
        return self.__source_event

    def set_source_time_interval(self, new_source):
        """Mit dieser Funktion kann ein Bezug zwischen der Buchung
        und einem Ereignis-Objekt hergestellt werden"""
        self.__source_event = new_source

