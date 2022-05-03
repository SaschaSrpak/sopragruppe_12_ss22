from server.business_objects import BusinessObject as bo


class Person(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = str
        self.__surname = str
        self.__mail_address = str
        self.__user_name = str
        self.__manager_status = False

    def get_name(self):
        """Anzeigen des Name"""
        return self.__name

    def set_name(self, new_name):
        """Ändern des Name"""
        self.__name = new_name

    def get_surname(self):
        """Anzeigen des Nachname"""
        return self.__surname

    def set_surname(self, new_surname):
        """Ändern des Nachname"""
        self.__surname = new_surname

    def get_mail_address(self):
        """Anzeigen der Mail-Adresse"""
        return self.__mail_address

    def set_mail_address(self, new_mail_address):
        """Ändern der Mail-Adresse"""
        self.__mail_address = new_mail_address

    def get_user_name(self):
        """Anzeigen des User-Names"""
        return self.__user_name

    def set_user_name(self, new_user_name):
        """Ändern des User-Names"""
        self.__user_name = new_user_name

    def get_manager_status(self):
        """Anzeigen, ob Das Personen-Objekt ein Manager ist"""
        return self.__manager_status

    def set_manager_status(self, boolean):
        """Ändern des Manager-Statuses"""
        self.__manager_status = boolean

