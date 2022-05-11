from server.business_objects.Buchungen import Zeitintervallbuchung


class PauseBuchung(Zeitintervallbuchung):

    def __init__(self):
        super().__init__()
