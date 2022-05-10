from server.business_objects import Zeitintervall
from server.business_objects.Aktivität import Aktivitaet


class Projektarbeit (Zeitintervall):

    def __init__(self):
        super().__init__()
        self._activity_worked_on = Aktivitaet

    def get_activity_worked_on(self):
        return self._activity_worked_on

    def set_activity_worded_on(self, activity):
        self._activity_worked_on = activity




