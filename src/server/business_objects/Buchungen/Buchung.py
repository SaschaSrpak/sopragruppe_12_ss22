from server.business_objects import BusinessObject as bo
from server.business_objects import Zeitkonto
from server.business_objects import Aktivität


class Buchung(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__target_user_account = Zeitkonto


    def get_target_user_account(self):
        """Anzeigen des Ziel-Nutzer-Zeitkontos"""
        return self.__target_user_account

    def set_target_user_account(self, new_target):
        """Ändern des Ziel-Nutzer-Zeitkontos"""
        self.__target_user_account = new_target









