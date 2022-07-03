from server.business_objects.Zeitintervalle.Projektlaufzeit import Projektlaufzeit
from server.db.Mapper import Mapper


class ProjektlaufzeitMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projektlaufzeiten.

                :return Eine Sammlung mit Projektlaufzeit-Objekten
                """
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
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param key Primärschlüsselattribut
        :return Projektlaufzeit-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel."""
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
        """Suchen einer Projektlaufzeit mit gegebener Projekt-ID

                :param project_key Primärschlüsselattribut
                :return Projektlaufzeit-Objekt, das dem übergebenen Schlüssel entspricht
                """
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
        """Einfügen eines Projektlaufzeit-Objekts in die Datenbank.

                :param projektlaufzeit das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
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

        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param projektlaufzeit das Objekt, das in die DB geschrieben werden soll
        """
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
        """Löschen der Daten eines Projektlaufzeiten-Objekts aus der Datenbank.

        :param projektlaufzeit das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Projektlaufzeit WHERE Interval_ID='{}'".format(projektlaufzeit.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
