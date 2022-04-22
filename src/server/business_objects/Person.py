from server.business_objects import BusinessObject as bo


class Person(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name= str
        self.__surname= str
        self.__mail_adress= str
        self.__user_name= str


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

    def get_mail_adress(self):
        """Anzeigen der Mail-Adresse"""
        return self.__mail_adress

    def set_mail_adress(self, new_mail_adress):
        """Ändern der Mail-Adresse"""
        self.__mail_adress = new_mail_adress

    def get_user_name(self):
        """Anzeigen des User-Names"""
        return self.__user_name

    def set_user_name(self, new_user_name):
        """Ändern des User-Names"""
        self.__user_name = new_user_name
