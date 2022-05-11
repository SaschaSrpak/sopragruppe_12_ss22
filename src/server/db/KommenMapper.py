from server.db.Mapper import Mapper

class KommenMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("")
        tuples = cursor.fetchall()

        for () in tuples:
            result.append()

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:

            result =

        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert_kommen(self, kommen):
        cursor = self._cnx.cursor()
        cursor.execute("")
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return kommen

    def update_kommen(self, kommen):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = ""
        data = (

        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_kommen(self, kommen):
        """Löschen eines Endereignisses"""
        cursor = self._cnx.cursor()

        command = ""
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()