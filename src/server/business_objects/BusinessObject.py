from abc import ABC
from datetime import datetime


class BusinessObject (ABC):
    def __init__(self):
        self.__id = int
        self.__last_modified_date = datetime

    def get_id(self):
        """Anzeigen der ID"""
        return self.__id

    def set_id(self, new_id):
        """Verändern der ID"""
        self.__id = new_id

    def get_last_modified_date(self):
        """Zeig den letzten Zeitpunkt der Änderung an"""
        return self.__last_modified_date

    def set_last_modified_date(self, new_date):
        """Setzt einen Zeitstempel für die letzte Änderung.
        Sollte am besten nach jeder Setter Funktion eingefügt werden."""
        self.__last_modified_date = new_date