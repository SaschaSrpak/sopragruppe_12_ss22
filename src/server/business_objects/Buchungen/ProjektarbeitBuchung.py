from server.business_objects.Buchungen import Zeitintervallbuchung


class ProjektarbeitBuchung(Zeitintervallbuchung):

    def __init__(self):
        super().__init__()
        self._target_activity = int

    def get_target_activity(self):
        """Anzeigen der Ziel-Aktivität"""
        return self._target_activity

    def set_target_activity(self, new_target):
        """Ändern der Ziel-Aktivität"""
        self._target_activity = new_target



