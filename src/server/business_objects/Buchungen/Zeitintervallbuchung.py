from business_objects.Buchungen import Buchung


class Zeitintervallbuchung(Buchung):

    def __init__(self):
        super().__init__()
        self._time_interval_id = int

    def get_time_interval_id(self):
        """Anzeigen des Zeitintervalls, auf welches sich die Buchung bezieht."""
        return self._time_interval_id

    def set_time_interval_id(self, new_source):
        """Mit dieser Funktion kann ein Bezug zwischen der Buchung
        und einem Zeitintervall-Objekt hergestellt werden"""
        self._time_interval_id = new_source
