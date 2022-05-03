from server.business_objects import BusinessObject as bo
from server.business_objects import Zeitkonto
from server.business_objects import Aktivität


class Buchung(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__target_user_account = Zeitkonto
        self.__target_activity = Aktivität

    def get_target_user_account(self):
        """Anzeigen des Ziel-Nutzer-Zeitkontos"""
        return self.__target_user_account

    def set_target_user_account(self, new_target):
        """Ändern des Ziel-Nutzer-Zeitkontos"""
        self.__target_user_account = new_target

    def get_target_activity(self):
        """Anzeigen der Ziel-Aktivität"""
        return self.__target_activity

    def set_target_activity(self, new_target):
        """Ändern der Ziel-Aktivität"""
        self.__target_activity = new_target






