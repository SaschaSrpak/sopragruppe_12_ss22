'''from server.business_objects.Zeitkonto import Zeitkonto
from Mapper import Mapper

class ZeitkontoMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Account_ID, Owner_ID from zeitkonto")
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
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Account_ID, Owner_ID from zeitkonto WHERE id={}".format(key)
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
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Account_ID) AS maxid FROM zeitkonto ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            zeitkonto.set_id(maxid[0] + 1)

        command = "INSERT INTO zeitkonto (Account_ID, Owner_ID) VALUES (%s,%s)"
        data = (zeitkonto.get_id(),
                zeitkonto.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitkonto


    def update(self, zeitkonto):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE zeitkonto " + "SET Owner_ID=%s WHERE Account_ID=%s"
        data = (zeitkonto.get_id(),
                zeitkonto.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, zeitkonto):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitkonto WHERE Interval_ID={}".format(zeitkonto.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen,
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ZeitkontoMapper() as mapper:
        result = mapper.find_all()
        for t in result:
            print(t)'''