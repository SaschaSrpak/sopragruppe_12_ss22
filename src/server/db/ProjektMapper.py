from server.db.Mapper import Mapper
from server.business_objects.Person import Person
"""Notwendig?"""
from server.business_objects.Projekt import Projekt

class ProjektMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        """Lesen aller Projekte aus der Datenbank"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date FROM Projekt")
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_ID(self, ID):
        """Lesen eines Projekts aus der Datenbank mit der gegebenen ID"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date from Projekt WHERE Project_ID={}".format(ID))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)

        self._cnx.commit()
        cursor.close()

        return projekt


    def find_by_User(self, user):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen User"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date FROM Projekt, Projekt_Zustaendigkeit WHERE User_ID={}".format(user))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_client(self, client):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen Client"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date FROM Projekt WHERE Client={}".format(client))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_creator(self, creator):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen Projekt-Ersteller"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date FROM Projekt, Projekt_Ersteller WHERE User_ID={}".format(creator))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result

    """


    def find_by_responsible_id  <--- Identisch zu "find_by_user"?

    
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

        command = "INSERT INTO person (User_ID, Name, Nachname, Email, Username, Last_modified_date) VALUES (%s,%s,%s,%s,%s,%s)"
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

        command = "UPDATE person " + "SET Name=%s, Nachname=%s, Email=%s, Username=%s, Last_modified_date=%s WHERE Projekt_ID=%s"
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

        command = "DELETE FROM Person WHERE Project_ID={}".format(person.get_id())
        """von wo deleten? --> table Person_Zuständigkeit?"""
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def insert(self, projekt):
        """Einfügen eines Projekts in die Datenbank"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT max(Project_ID) AS maxid FROM Projekt")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projekt.set_id(maxid[0]+1)

        command = "INSERT INTO Projekt (Project_ID, Name, Client, Description, Last_modified_date) VALUES (%s, %s, %s, %s, %s)"
        data = (
            projekt.get_id(),
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_last_modified_date()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return projekt


    def update(self, projekt):
        """Aktualisieren eines Projekts in der Datenbank"""
        cursor = self._cnx.cursor()

        command = "UPDATE Projekt SET Name=%s, Client=%s, Description=%s, Last_modified_date=%s WHERE Project_ID=%s"
        data = (
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_last_modified_date(),
            projekt.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, projekt):
        """Löschen eines Projekts aus der Datenbank"""
        cursor = self._cnx.cursor()

        command = "DELETE FROM Projekt WHERE Project_ID={}".format(projekt.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_by_activity_ID(self, activity_ID):
        """Lesen eines Projekts aus der Datenbank anhand der gegebenen Aktivität_ID"""
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Last_modified_date FROM Projekt, Projekt_Aktivitaeten WHERE Activity_ID={}".format(activity_ID))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_last_modified_date(Last_modified_date)

        self._cnx.commit()
        cursor.close()

        return projekt


    def insert_activity(self, activity):
        """Einfügen einer neuen Aktivität in die Datenbank"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT max(Activity_ID) AS maxid FROM Aktivitaet")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            activity.set_id(maxid[0]+1)

        command = "INSERT INTO Aktivitaet (Activity_ID, Man_Day_Capacity, Last_modified_date) VALUES (%s, %s, %s)"
        data = (
            activity.get_id(),
            activity.get_man_day_capacity(),
            activity.get_last_modified_date()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return activity


    """


    def insert_activity


    def update_activity


    def delete_activity
    """
    