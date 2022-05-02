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