from server.business_objects.Buchungen.Buchung import Buchung
from server.business_objects.Ereignisse.Ereignis import Ereignis


class Ereignisbuchung(Buchung):

    def __init__(self):
        super().__init__()
        self._event_id = Ereignis

    def get_event_id(self):
        """Anzeigen des Ereignisses, auf welches sich die Buchung bezieht."""
        return self._event_id

    def set_event_id(self, new_source):
        """Mit dieser Funktion kann ein Bezug zwischen der Buchung
        und einem Ereignis-Objekt hergestellt werden"""
        self._event_id = new_source
