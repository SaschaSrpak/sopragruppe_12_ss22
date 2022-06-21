from server.business_objects import BusinessObject as bo
from server.business_objects.Zeitkonto import Zeitkonto
from server.business_objects import Aktivität


class Buchung(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._target_user_account = Zeitkonto


    def get_target_user_account(self):
        """Anzeigen des Ziel-Nutzer-Zeitkontos"""
        return self._target_user_account

    def set_target_user_account(self, new_target):
        """Ändern des Ziel-Nutzer-Zeitkontos"""
        self._target_user_account = new_target









