from Mapper import Mapper
from ..business_objects.Person import Person
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

    """
    def find_by_creator

    def find_by_client

    def find_by_responsible_id
    """
    

    def insert_person_responsible(self, person):
        """Einfügen einer neuen verantwortlichen Person im Projekt
         Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(User_ID) AS maxid FROM person")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
           person.set_user_name(maxid[0]+1)

        command = "INSERT INTO person (User_ID, Name, Nachname, Email, Username, Last_modified_date) " \
                  "VALUES (%s,%s,%s,%s,%s,%s)"
        data = (person.get_id(),
                person.get_name(),
                person.get_surname(),
                person.get_mail_adress(),
                person.get_surname(),
                person.get_last_modified_date()
                )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update_person_responsible(self, person):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET Name=%s, Nachname=%s, Email=%s, Username=%s, Last_modified_date=%s WHERE " \
                                     "Projekt_ID=%s"
        data = (person.get_name(),
                person.get_surname(),
                person.get_mail_adress(),
                person.get_last_modified_date()
                )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_person_responsible(self, person):
        """Löschen einer verantwortlichen Person des Projekts aus der Datenbank.

                :param person das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE Project_ID={}".format(person.get_id())
        """von wo deleten? --> table Person_Zuständigkeit?"""
        cursor.execute(command)

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

    """
    def find_by_activity_id

    def insert_activity

    def update_activity

    def delete_activity
    """
    