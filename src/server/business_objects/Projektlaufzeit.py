from server.business_objects import Zeitintervall
from server.business_objects import Projekt


class Projektarbeit (Zeitintervall):

    def __init__(self):
        super().__init__()
        self._project = Projekt

    def get_activity_worked_on(self):
        return self._project

    def set_activity_worded_on(self, new_project):
        self._project = new_project
