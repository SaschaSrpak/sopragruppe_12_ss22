from server.business_objects.Zeitintervalle.Projektlaufzeit import Projektlaufzeit
from server.db.Mapper import Mapper


class ProjektlaufzeitMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Interval_ID, Name, Duration, Start_Event_ID, "
                       "End_Event_ID, Last_modified_date from Projektlaufzeit")
        tuples = cursor.fetchall()

        for (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) in tuples:
            projektlaufzeit = Projektlaufzeit()
            projektlaufzeit.set_id(Interval_ID)
            projektlaufzeit.set_name(Name)
            projektlaufzeit.set_duration(Duration)
            projektlaufzeit.set_start(Start_Event_ID)
            projektlaufzeit.set_end(End_Event_ID)
            projektlaufzeit.set_last_modified_date(Last_modified_date)

            result.append(projektlaufzeit)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Interval_ID, Name, Duration, Start_Event_ID, " \
                  "End_Event_ID, Last_modified_date FROM Projektlaufzeit WHERE Interval_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) = tuples[0]
            projektlaufzeit = Projektlaufzeit()
            projektlaufzeit.set_id(Interval_ID)
            projektlaufzeit.set_name(Name)
            projektlaufzeit.set_duration(Duration)
            projektlaufzeit.set_start(Start_Event_ID)
            projektlaufzeit.set_end(End_Event_ID)
            projektlaufzeit.set_last_modified_date(Last_modified_date)
            result = projektlaufzeit
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_project_key(self, project_key):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT Project_Duration_ID FROM Projekt " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result = (self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, projektlaufzeit):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Interval_ID) AS maxid FROM Projektlaufzeit ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projektlaufzeit.set_id(maxid[0] + 1)

        command = "INSERT INTO Projektlaufzeit (Interval_ID, Name, Duration, " \
                  "Start_Event_ID, End_Event_ID, Last_modified_date) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (projektlaufzeit.get_id(),
                projektlaufzeit.get_name(),
                projektlaufzeit.get_duration(),
                projektlaufzeit.get_start(),
                projektlaufzeit.get_end(),
                projektlaufzeit.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projektlaufzeit

    def update(self, projektlaufzeit):

        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE Projektlaufzeit " + "SET Name=%s, Duration=%s, Start_Event_ID=%s, " \
                                            "End_Event_ID=%s, Last_modified_date=%s WHERE Interval_ID=%s"
        data = (
                projektlaufzeit.get_name(),
                projektlaufzeit.get_duration(),
                projektlaufzeit.get_start(),
                projektlaufzeit.get_end(),
                projektlaufzeit.get_last_modified_date(),
                projektlaufzeit.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projektlaufzeit):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM Projektlaufzeit WHERE Interval_ID='{}'".format(projektlaufzeit.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.
"""