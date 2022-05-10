from server.business_objects import Zeitintervall


class Pause(Zeitintervall):
    def __init__(self):
        super().__init__()
        self._pause_description = ""

    def get_pause_description(self):
        return self._pause_description

    def set_pause_description(self, description):
        self._pause_description = description

