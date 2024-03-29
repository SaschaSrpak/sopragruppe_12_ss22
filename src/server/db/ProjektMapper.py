from server.db.Mapper import Mapper
from server.business_objects.Projekt import Projekt
import datetime as dt


class ProjektMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lesen aller Projekte aus der Datenbank
        :return Eine Sammlung von Projekt-objekten"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Project_ID, Name, Client, Description, Deadline_ID, "
                       "Project_Duration_ID, Last_modified_date FROM Projekt")
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description, Deadline_ID, Project_Duration_ID, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_deadline(Deadline_ID)
            projekt.set_project_duration(Project_Duration_ID)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """suchen eines Projekts aus der Datenbank mit der gegebenen ID
            :param id Primärschlüssel
            :return Projek-Objekt mit entsprechendem SChlüssel, None, wenn der Tupel nicht vorhanden ist"""
        result = None
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT Project_ID, Name, Client, Description, Deadline_ID, "
            "Project_Duration_ID,Last_modified_date from Projekt WHERE Project_ID={}".format(
                key))
        tuples = cursor.fetchall()

        try:
            (Project_ID, Name, Client, Description,
             Deadline_ID, Project_Duration_ID,
             Last_modified_date) = tuples[0]
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_deadline(Deadline_ID)
            projekt.set_project_duration(Project_Duration_ID)
            projekt.set_last_modified_date(Last_modified_date)
            result = projekt
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_client(self, client):
        """Suchehn der Projekte aus der Datenbank mit dem gegebenen Client
        :param client
        :return Projekt, das dem übergegeben Schlüssel entspricht, None bei nicht vorhandenem Tupel"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute(
            "SELECT Project_ID, Name, Client, Description, Deadline_ID, "
            "Project_Duration_ID, Last_modified_date FROM Projekt WHERE Client LIKE '{}' ORDER BY Client".format(
                client))
        tuples = cursor.fetchall()

        for (Project_ID, Name, Client, Description,
             Deadline_ID, Project_Duration_ID, Last_modified_date) in tuples:
            projekt = Projekt()
            projekt.set_id(Project_ID)
            projekt.set_name(Name)
            projekt.set_client(Client)
            projekt.set_description(Description)
            projekt.set_deadline(Deadline_ID)
            projekt.set_project_duration(Project_Duration_ID)
            projekt.set_last_modified_date(Last_modified_date)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_creator(self, creator_key):
        """Suchen der Projekte aus der Datenbank mit dem gegebenen Projekt-Ersteller
            :param creator
            :return Projekt, das dem übergegeben Schlüssel entspricht, None bei nicht vorhandenem Tupel"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Project_ID FROM Projekt_Ersteller " \
                  "WHERE User_ID LIKE '{}' ORDER BY User_ID".format(creator_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert_creator(self, person, project):
        """Einfügen einer neuen verantwortlichen Person im Projekt
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID."""

        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Projekt_Ersteller(Project_ID,"
                       "User_ID) VALUES('{}', '{}')".format(project, person))
        self._cnx.commit()
        cursor.close()
        return project

    def update_creator(self, project, person):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz erneut abbilden.
        :param person das Objekt, das in die Db geschrieben werden soll"""
        cursor = self._cnx.cursor()
        command = "UPDATE Projekt_Ersteller" + "SET User_ID=%s, WHERE Project_ID=%s"
        data = (person.get_id(), project.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_creator(self, project, person_key):
        """Löschen einer verantwortlichen Person des Projekts aus der Datenbank.

                :param person das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()
        command = "DELETE FROM Projekt_Ersteller WHERE Project_ID='{}'AND User_ID='{}'".format(project.get_id(),
                                                                                               person_key)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_person_key(self, person_key):
        """Lesen aller Projekte aus der Datenbank mit dem gegebener Person
        :param person_key Primärschlüsselattribut
        :return project, das dem übergebenen Schlüssel entspircht"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Project_ID FROM Projekt_Zustaendigkeit " \
                  "WHERE User_ID='{}'".format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert_person_responsible(self, project, person):
        """Einfügen einer neuen verantwortlichen Person im Projekt
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID."""

        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Projekt_Zustaendigkeit(Project_ID,"
                       "User_ID) VALUES('{}', '{}')".format(project.get_id(), person.get_id()))
        self._cnx.commit()
        cursor.close()
        return project

    def update_person_responsible(self, project, person):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz erneut abbilden.
            :param person das Objekt in projekt, das in die DB geschrieben werden soll"""
        cursor = self._cnx.cursor()
        command = "UPDATE Projekt_Zuständigkeit" + "SET User_ID=%s, WHERE Project_ID=%s"
        data = (person.get_id(), project.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_person_responsible(self, project, person):
        """Löschen einer verantwortlichen Person des Projekts aus der Datenbank.

                :param person das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()
        command = "DELETE FROM Projekt_Zustaendigkeit WHERE Project_ID='{}' and User_ID='{}'".format(project.get_id(),
                                                                                                     person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_activity_key(self, activity_key):
        """Lesen eines Projekts aus der Datenbank anhand der gegebenen Aktivität_ID
        :param activity_key Primärschlüsseattribut
        :return Aktivität, das dem übergebenen SChlüssel entspricht, None bei nicht vorhandenen Tupel"""
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT Project_ID FROM Projekt_Aktivitaeten " \
                  "WHERE Activity_ID='{}'".format(activity_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result = (self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert_activity(self, project, activity):
        """Einfügen einer neuen Aktivität in die Datenbank
            :param """
        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Projekt_Aktivitaeten(Project_ID,"
                       "Activity_ID) VALUES('{}', '{}')".format(project.get_id(), activity.get_id()))
        self._cnx.commit()
        cursor.close()
        return project

    def update_activity(self, project, activity):
        """Widerholtes Schreiben eines Objektes in der der DB
        :param activity aus projekt das Objekt, das in die DB geschrieben werden soll"""
        cursor = self._cnx.cursor()
        command = "UPDATE Projekt_Aktivitaeten " + "SET Activity_ID=%s WHERE Project_ID=%s"
        data = (activity.get_id(), project.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_activity(self, project, activity):
        """Löschen einer Aktivität eines Projektes aus der Datenbank
        :param activity das aus der DB zu löschende objekt"""
        cursor = self._cnx.cursor()
        command = "DELETE FROM Projekt_Aktivitaeten WHERE Project_ID='{}' and Activity_ID='{}'".format(project.get_id(),
                                                                                                       activity.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def insert(self, projekt):
        """Einfügen eines Projekts in die Datenbank
        :param projekt das zu speichernde Objekt
        :return das bereits übergebene Objekt mit ggf. korrigierter ID"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT max(Project_ID) AS maxid FROM Projekt")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projekt.set_id(maxid[0] + 1)

        command = "INSERT INTO Projekt (Project_ID, Name, Client, Description," \
                  "Deadline_ID, " \
                  "Project_Duration_ID, Last_modified_date) VALUES (%s, %s, " \
                  "%s, %s, %s, %s, %s) "
        data = (
            projekt.get_id(),
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_deadline(),
            projekt.get_project_duration(),
            projekt.get_last_modified_date(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return projekt

    def update(self, projekt):
        """Aktualisieren eines Projekts in der Datenbank
        :param projekt das Objekt, das in die DB geschrieben werden soll"""
        cursor = self._cnx.cursor()

        command = "UPDATE Projekt SET Name=%s, Client=%s, Description=%s, " \
                  "Deadline_ID=%s, Project_Duration_ID=%s, Last_modified_date=%s WHERE Project_ID=%s"
        data = (
            projekt.get_name(),
            projekt.get_client(),
            projekt.get_description(),
            projekt.get_deadline(),
            projekt.get_project_duration(),
            projekt.get_last_modified_date(),
            projekt.get_id()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projekt):
        """Löschen eines Projekts aus der Datenbank
        :param projekt das aus der DB zu löschende Objekt"""
        cursor = self._cnx.cursor()

        command = "DELETE FROM Projekt WHERE Project_ID={}".format(projekt.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
