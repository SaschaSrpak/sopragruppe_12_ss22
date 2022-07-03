from server.business_objects.Zeitkonto import Zeitkonto
from server.db.Mapper import Mapper


class ZeitkontoMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lesen aller Objekte in der Datenbank
        :return Eine Sammlung von Zeitkonto-Objekten"""
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Account_ID, User_ID from Arbeitszeitkonto")
        tuples = cursor.fetchall()

        for (Account_ID, Owner_ID) in tuples:
            zeitkonto = Zeitkonto()
            zeitkonto.set_id(Account_ID)
            zeitkonto.set_owner(Owner_ID)

            result.append(zeitkonto)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param id Primärschlüssel
        :return Zeitkonto-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandem Tupel
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Account_ID, User_ID from Arbeitszeitkonto WHERE Account_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Account_ID, Owner_ID) = tuples[0]
            zeitkonto = Zeitkonto()
            zeitkonto.set_id(Account_ID)
            zeitkonto.set_owner(Owner_ID)

            result = zeitkonto
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param id Primärschlüssel
        :return Zeitkonto-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandem
        Tupel
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Account_ID, User_ID from Arbeitszeitkonto WHERE User_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Account_ID, Owner_ID) = tuples[0]
            zeitkonto = Zeitkonto()
            zeitkonto.set_id(Account_ID)
            zeitkonto.set_owner(Owner_ID)

            result = zeitkonto
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, zeitkonto):
        """Einfügen eines neuen Zeitkonto-Objekts.
            Der Primärschlüssel wird geprüft und ggf. berichtigt
            :param zeitkonto das zu speichernde Objekt
            :return das bereits übergeben Objekt mit evtl. korrigierter ID"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Account_ID) AS maxid FROM Arbeitszeitkonto ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            zeitkonto.set_id(maxid[0] + 1)

        command = "INSERT INTO Arbeitszeitkonto (Account_ID, User_ID) VALUES (%s,%s)"
        data = (zeitkonto.get_id(),
                zeitkonto.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitkonto

    def update(self, zeitkonto):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden.
            :param zeitkonto das Objekt, das in die DB geschrieben werden soll."""
        cursor = self._cnx.cursor()

        command = "UPDATE Arbeitszeitkonto " + "SET User_ID=%s WHERE Account_ID=%s"
        data = (zeitkonto.get_id(),
                zeitkonto.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, zeitkonto):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen.
            :param zeitkonto das aus der DB zu löschende "Objekt" """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Arbeitszeitkonto WHERE Account_ID='{}'".format(zeitkonto.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
