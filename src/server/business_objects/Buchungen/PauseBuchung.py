from server.business_objects.Buchungen.Zeitintervallbuchung import Zeitintervallbuchung


class PauseBuchung(Zeitintervallbuchung):

    def __init__(self):
        super().__init__()
