from business_objects.Ereignisse.Kommen import Kommen
from server.db.Mapper import Mapper


class KommenMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Event_ID, Name, Time, Last_modified_date from Kommen")
        tuples = cursor.fetchall()

        for ( Event_ID, Name, Time, Last_modified_date) in tuples:
            ereignis = Kommen()
            ereignis.set_id(Event_ID)
            ereignis.set_event_name(Name)
            ereignis.set_time_of_event(Time)
            ereignis.set_last_modified_date(Last_modified_date)


            result.append(ereignis)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Event_ID, Name, Time, Last_modified_date from Kommen WHERE Event_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Event_ID, Name, Time, Last_modified_date) = tuples[0]
            ereignis = Kommen()
            ereignis.set_id(Event_ID)
            ereignis.set_event_name(Name)
            ereignis.set_time_of_event(Time)
            ereignis.set_last_modified_date(Last_modified_date)

            result = ereignis
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, ereignis):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Event_ID) AS maxid FROM Kommen ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            ereignis.set_id(maxid[0] + 1)

        command = "INSERT INTO Kommen (Event_ID, Name, Time, Last_modified_date) VALUES (%s,%s,%s,%s)"
        data = (ereignis.get_id(),
                ereignis.get_event_name(),
                ereignis.get_time_of_event(),
                ereignis.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis


    def update(self, ereignis):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE Kommen " + "SET Name=%s, Time=%s, Last_modified_date=%s WHERE Event_ID=%s"
        data = (ereignis.get_id(),
                ereignis.get_event_name(),
                ereignis.get_time_of_event(),
                ereignis.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, ereignis):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM Kommen WHERE Event_ID='{}'".format(ereignis.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
"""if (__name__ == "__main__"):
    with EreignisMapper() as mapper:
        result = mapper.find_all()
        for t in result:
            print(t)"""

""""with KommenMapper() as mapper:
    test = mapper.find_by_key(10001)
    print(test.get_event_name())
    result = mapper.find_all()
    for i in result:
        print(i.get_event_name())"""