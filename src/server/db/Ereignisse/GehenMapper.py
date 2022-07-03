from server.business_objects.Ereignisse.Gehen import Gehen
from server.db.Mapper import Mapper


class GehenMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Gehen-Objekte.

                :return Eine Sammlung mit Gehen-Objekten
                """
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Event_ID, Name, Time, Last_modified_date from Gehen")
        tuples = cursor.fetchall()

        for (Event_ID, Name, Time, Last_modified_date) in tuples:
            ereignis = Gehen()
            ereignis.set_id(Event_ID)
            ereignis.set_event_name(Name)
            ereignis.set_time_of_event(Time)
            ereignis.set_last_modified_date(Last_modified_date)

            result.append(ereignis)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param key Primärschlüsselattribut
        :return Gehen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Event_ID, Name, Time, Last_modified_date from Gehen WHERE Event_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Event_ID, Name, Time, Last_modified_date) = tuples[0]
            ereignis = Gehen()
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
        """Einfügen eines Gehen-Objekts in die Datenbank.

                :param ereignis das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Event_ID) AS maxid FROM Gehen ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            ereignis.set_id(maxid[0] + 1)

        command = "INSERT INTO Gehen (Event_ID, Name, Time, Last_modified_date) VALUES (%s,%s,%s,%s)"
        data = (ereignis.get_id(),
                ereignis.get_event_name(),
                ereignis.get_time_of_event(),
                ereignis.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis

    def update(self, ereignis):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param ereignis das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Gehen " + "SET Name=%s, Time=%s, Last_modified_date=%s WHERE Event_ID=%s"
        data = (ereignis.get_event_name(),
                ereignis.get_time_of_event(),
                ereignis.get_last_modified_date(),
                ereignis.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, ereignis):
        """Löschen der Daten eines Gehen-Objekts aus der Datenbank.

            :param ereignis das aus der DB zu löschende "Objekt"
            """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Gehen WHERE Event_ID='{}'".format(ereignis.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


