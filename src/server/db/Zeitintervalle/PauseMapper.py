from business_objects.Zeitintervalle.Pause import Pause
from server.db.Mapper import Mapper


class PauseMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Interval_ID, Name, Duration, Start_Event_ID, "
                       "End_Event_ID, Last_modified_date from Pause")
        tuples = cursor.fetchall()

        for (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) in tuples:
            pause = Pause()
            pause.set_id(Interval_ID)
            pause.set_name(Name)
            pause.set_duration(Duration)
            pause.set_start(Start_Event_ID)
            pause.set_end(End_Event_ID)
            pause.set_last_modified_date(Last_modified_date)

            result.append(pause)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Interval_ID, Name, Duration, Start_Event_ID, " \
                  "End_Event_ID, Last_modified_date FROM Pause WHERE Interval_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) = tuples[0]
            pause = Pause()
            pause.set_id(Interval_ID)
            pause.set_name(Name)
            pause.set_duration(Duration)
            pause.set_start(Start_Event_ID)
            pause.set_end(End_Event_ID)
            pause.set_last_modified_date(Last_modified_date)
            result = pause
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, pause):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Interval_ID) AS maxid FROM Pause ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            pause.set_id(maxid[0] + 1)

        command = "INSERT INTO Pause (Interval_ID, Name, Duration, " \
                  "Start_Event_ID, End_Event_ID, Last_modified_date) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (pause.get_id(),
                pause.get_name(),
                pause.get_duration(),
                pause.get_start(),
                pause.get_end(),
                pause.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return pause

    def update(self, pause):

        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE Pause " + "SET Name=%s, Duration=%s, Start_Event_ID=%s, " \
                                            "End_Event_ID=%s, Last_modified_date=%s WHERE Interval_ID=%s"
        data = (pause.get_id(),
                pause.get_name(),
                pause.get_duration(),
                pause.get_start(),
                pause.get_end(),
                pause.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, pause):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM Pause WHERE Interval_ID='{}'".format(pause.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.
"""