from server.business_objects.Zeitintervall import Zeitinervall
from Mapper import Mapper

class ZeitintervallMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date from zeitintervall")
        tuples = cursor.fetchall()

        for (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) in tuples:
            zeitintervall = Zeitinervall()
            zeitintervall.set_id(Interval_ID)
            zeitintervall.set_name(Name)
            zeitintervall.set_duration(Duration)
            zeitintervall.set_start(Start_Event_ID)
            zeitintervall.set_end(End_Event_ID)
            zeitintervall.set_last_modified_date(Last_modified_date)

            result.append(zeitintervall)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date FROM zeitintervall WHERE Interval_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) = tuples[0]
            zeitintervall = Zeitinervall()
            zeitintervall.set_id(Interval_ID)
            zeitintervall.set_name(Name)
            zeitintervall.set_duration(Duration)
            zeitintervall.set_start(Start_Event_ID)
            zeitintervall.set_end(End_Event_ID)
            zeitintervall.set_last_modified_date(Last_modified_date)

            result = zeitintervall
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, zeitintervall):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Interval_ID) AS maxid FROM zeitintervall ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            zeitintervall.set_id(maxid[0] + 1)

        command = "INSERT INTO zeitintervall (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (zeitintervall.get_id(),
                zeitintervall.get_name(),
                zeitintervall.get_duration(),
                zeitintervall.get_start(),
                zeitintervall.get_end(),
                zeitintervall.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervall


    def update(self, zeitintervall):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE zeitintervall " + "SET Name=%s, Duration=%s, Start_Event_ID=%s, End_Event_ID=%s, Last_modified_date=%s WHERE Interval_ID=%s"
        data = (zeitintervall.get_id(),
                zeitintervall.get_name(),
                zeitintervall.get_duration(),
                zeitintervall.get_start(),
                zeitintervall.get_end(),
                zeitintervall.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, zeitintervall):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervall WHERE Interval_ID='{}'".format(zeitintervall.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ZeitintervallMapper() as mapper:
        result = mapper.find_all()
        for t in result:
            print(t)