from server.business_objects.Aktivität import Aktivitaet
from server.db.Mapper import Mapper
import datetime


class AktivitaetMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Aktivitäten.
            :return Eine Sammlung mit Aktivitäts-Objekten
                """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Aktivitaet")
        tuples = cursor.fetchall()

        for (id, name, man_day_capacity,
             last_modified_date) in tuples:
            activity = Aktivitaet()
            activity.set_id(id)
            activity.set_activity_name(name)
            activity.set_man_day_capacity(man_day_capacity)
            activity.set_last_modified_date(last_modified_date)
            result.append(activity)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Auslesen alles Aktivitäten anhand des Aktivitäts-ID
        :param key Primärschlüsselatttribut
        :return Aktivität, das dem übergebenen Schlüssel entspricht, None bei nicht vorhanden Tupel"""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Activity_ID, Name, Man_Day_Capacity, " \
                  "Last_modified_date FROM Aktivitaet WHERE Activity_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, man_day_capacity,
             last_modified_date) = tuples[0]
            activity = Aktivitaet()
            activity.set_id(id)
            activity.set_activity_name(name)
            activity.set_man_day_capacity(man_day_capacity)
            activity.set_last_modified_date(last_modified_date)
            result = activity
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_key(self, person_key):
        """Auslesen alles Aktivitäten anhand des Aktivitäts-ID
               :param person_key Primärschlüsselatttribut
               :return Aktivität, das dem übergebenen Schlüssel entspricht"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Activity_ID FROM Aktivitaet_Zustaendigkeit " \
                  "WHERE User_ID='{}'".format(person_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_project_key(self, project_key):
        """Auslesen alles Aktivitäten anhand des Projekt-ID
                       :param project_key Primärschlüsselatttribut
                       :return Aktivität, das dem übergebenen Schlüssel entspricht"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Activity_ID FROM Projekt_Aktivitaeten " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert_person_responsible(self, activity, person):
        """Einfügen einer verantwortlichen Person
                :param person das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Aktivitaet_Zustaendigkeit(Activity_ID,"
                       "User_ID) VALUES('{}', '{}')".format(activity.get_id(), person))
        self._cnx.commit()
        cursor.close()
        return activity

    def update_person_responsible(self, activity, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                :param activity person das Objekt, das in die DB geschrieben werden soll
                """
        cursor = self._cnx.cursor()
        command = "UPDATE Aktivitaet_Zustaendigkeit " + "SET User_ID=%s WHERE Activity_ID=%s"
        data = (person.get_id(), activity.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_person_responsible(self, activity, person):
        """Löschen der Daten einer verantwortlichen Person aus der Datenbank.

                :param activity person das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()
        command = "DELETE FROM Aktivitaet_Zustaendigkeit WHERE Activity_ID='{}' and User_ID='{}'".format(activity.get_id(),
                                                                                                      person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def insert(self, activity):
        """Einfügen einer neuen Aktivität

                :param activity das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """

        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Activity_ID) AS maxid FROM Aktivitaet ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            activity.set_id(maxid[0] + 1)

        cursor.execute("INSERT INTO Aktivitaet (Activity_ID, Name, "
                       "Man_Day_Capacity, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}')".format(activity.get_id(),
                                                             activity.get_activity_name(),
                                                             activity.get_man_day_capacity(),
                                                             activity.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return activity

    def update(self, activity):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

                :param activity das Objekt, das in die DB geschrieben werden soll
                """
        cursor = self._cnx.cursor()

        activity.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE Aktivitaet " + "SET Name=%s, Man_Day_Capacity=%s," \
                                        "Last_modified_date=%s WHERE Activity_ID=%s"
        data = (activity.get_activity_name(),
                activity.get_man_day_capacity(), activity.get_last_modified_date(),
                activity.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return activity

    def delete(self, activity):
        """Löschen der Daten Aktivität aus der Datenbank.

                :param activity das aus der DB zu löschende "Objekt"
                """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Aktivitaet where Activity_ID='{}'".format(activity.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        return activity



