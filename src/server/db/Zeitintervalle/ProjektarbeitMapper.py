from server.business_objects.Zeitintervalle.Projektarbeit import Projektarbeit
from server.db.Mapper import Mapper


class ProjektarbeitMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projektarbeiten.

                :return Eine Sammlung mit Projektarbeits-Objekten"""

        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Interval_ID, Name, Duration, Start_Event_ID, "
                       "End_Event_ID, Last_modified_date from Projektarbeit")
        tuples = cursor.fetchall()

        for (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) in tuples:
            projektarbeit = Projektarbeit()
            projektarbeit.set_id(Interval_ID)
            projektarbeit.set_name(Name)
            projektarbeit.set_duration(Duration)
            projektarbeit.set_start(Start_Event_ID)
            projektarbeit.set_end(End_Event_ID)
            projektarbeit.set_last_modified_date(Last_modified_date)

            result.append(projektarbeit)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param key Primärschlüsselattribut
        :return Projektarbeits-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Interval_ID, Name, Duration, Start_Event_ID, " \
                  "End_Event_ID, Last_modified_date FROM Projektarbeit WHERE Interval_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Interval_ID, Name, Duration, Start_Event_ID, End_Event_ID, Last_modified_date) = tuples[0]
            projektarbeit = Projektarbeit()
            projektarbeit.set_id(Interval_ID)
            projektarbeit.set_name(Name)
            projektarbeit.set_duration(Duration)
            projektarbeit.set_start(Start_Event_ID)
            projektarbeit.set_end(End_Event_ID)
            projektarbeit.set_last_modified_date(Last_modified_date)
            result = projektarbeit
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_transaction_key(self, transaction_key):
        """Suchen eines Projektarbeit anhand der Projektarbeitsbuchung

                :param transaction_key Primärschlüsselattribut
                :return Projektarbeit-Objekt, das dem übergebenen Schlüssel entspricht
                """
        result = None
        cursor = self._cnx.cursor()

        command = "SELECT Interval_ID FROM ProjektarbeitBuchung " \
                  "WHERE Transaction_ID='{}'".format(transaction_key)
        cursor.execute(command)
        pause_id = cursor.fetchall()

        result = self.find_by_key(str(pause_id[0]))
        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, projektarbeit):
        """Einfügen eines Projektarbeits-Objekts in die Datenbank.

                :param projektarbeit das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Interval_ID) AS maxid FROM Projektarbeit ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projektarbeit.set_id(maxid[0] + 1)

        command = "INSERT INTO Projektarbeit (Interval_ID, Name, Duration, " \
                  "Start_Event_ID, End_Event_ID, Last_modified_date) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (projektarbeit.get_id(),
                projektarbeit.get_name(),
                projektarbeit.get_duration(),
                projektarbeit.get_start(),
                projektarbeit.get_end(),
                projektarbeit.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projektarbeit

    def update(self, projektarbeit):

        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param projektarbeit das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Projektarbeit " + "SET Name=%s, Duration=%s, Start_Event_ID=%s, " \
                                            "End_Event_ID=%s, Last_modified_date=%s WHERE Interval_ID=%s"
        data = (
            projektarbeit.get_name(),
            projektarbeit.get_duration(),
            projektarbeit.get_start(),
            projektarbeit.get_end(),
            projektarbeit.get_last_modified_date(),
            projektarbeit.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projektarbeit):
        """Löschen der Daten eines Projektarbeits-Objekts aus der Datenbank.

        :param projektarbeit das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Projektarbeit WHERE Interval_ID='{}'".format(projektarbeit.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
