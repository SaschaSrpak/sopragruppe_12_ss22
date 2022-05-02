from tkinter.tix import Select

from setuptools import Command
from Mapper import Mapper
from ..business_objects.Projekt import Projekt

class ProjektMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Lesen aller Projekte aus der Datenbank"""
        result = []
        cursor = self.cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date from Projekt")
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self.cnx.commit()
        cursor.close()

        return result


    def find_by_ID(self, ID):
        """Lesen eines Projekts aus der Datenbank mit der gegebenen ID"""
        cursor = self.cnx.cursor()
        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date from Projekt where Project_ID={}".format(ID))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)

        self.cnx.commit()
        cursor.close()

        return projekt


    def find_by_client(self, client):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen Client"""
        result = []
        cursor = self.cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date from Projekt where Client={}".format(client))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self.cnx.commit()
        cursor.close()

        return result


    def find_by_User(self, user):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen User"""
        result = []
        cursor = self.cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date from Projekt, Projekt_Zustaendigkeit where User_ID={}".format(user))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self.cnx.commit()
        cursor.close()

        return result


    def insert(self, projekt):
        """Einfügen eines Projekts in die Datenbank"""
        cursor = self.cnx.cursor()
        cursor.execute("Select max(Project_ID) AS maxid from Projekt")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projekt.set_id(maxid[0]+1)

        command = "Insert into Projekt (Project_ID, Name, Client, Description, Last_modified_date) VALUES (%s, %s, %s, %s, %s)"
        data = (
            projekt.get_id(),
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_last_modified_date()
        )
        cursor.execute(command, data)

        self.cnx.commit()
        cursor.close()
        return projekt


    def update(self, projekt):
        """Aktualisieren eines Projekts in der Datenbank"""
        cursor = self.cnx.cursor()

        command = "Update Projekt set Name=%s, Client=%s, Description=%s, Last_modified_date=%s where Project_ID=%s"
        data = (
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_last_modified_date(),
            projekt.get_id()
        )
        cursor.execute(command, data)

        self.cnx.commit()
        cursor.close()


    def delete(self, projekt):
        """Löschen eines Projekts aus der Datenbank"""
        cursor = self.cnx.cursor()

        command = "Delete from Projekt where Project_ID={}".format(projekt.get_id())
        cursor.execute(command)

        self.cnx.commit()
        cursor.close()