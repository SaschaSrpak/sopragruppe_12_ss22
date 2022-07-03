from server.business_objects.Buchungen.PauseBuchung import PauseBuchung
from server.db.Mapper import Mapper
import datetime


class PauseBuchungMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lesen aller Objekte in der Datenbank
        :return Eine Sammlung von PauseBuchungs-Objekten"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from pausebuchung")
        tuples = cursor.fetchall()

        for (id, target_user_account_id, interval_id,
             last_modified_date) in tuples:
            transaction = PauseBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_time_interval_id(interval_id)
            transaction.set_last_modified_date(last_modified_date)
            result.append(transaction)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param  der zu findende Key
        :return PauseBuchungs-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandem Tupel
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID, Account_ID, Interval_ID, " \
                  "Last_modified_date FROM PauseBuchung WHERE Transaction_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, target_user_account_id, interval_id,
             last_modified_date) = tuples[0]
            transaction = PauseBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_time_interval_id(interval_id)
            transaction.set_last_modified_date(last_modified_date)
            result = transaction
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_account_key(self, account_key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param account_key der zu findende Account
        :return PauseBuchungs-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandem
        Tupel
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM PauseBuchung " \
                  "WHERE Account_ID='{}'".format(account_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, transaction):
        """Einfügen eines neuen PauseBuchungs-Objekts.
            Der Primärschlüssel wird geprüft und ggf. berichtigt
            :param transaction das zu speichernde Objekt
            :return das bereits übergeben Objekt mit evtl. korrigierter ID"""

        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Transaction_ID) AS maxid FROM PauseBuchung ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            transaction.set_id(maxid[0] + 1)

        cursor.execute("INSERT INTO PauseBuchung (Transaction_ID, Account_ID, "
                       "Interval_ID, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}')".format(transaction.get_id(),
                                                             transaction.get_target_user_account(),
                                                             transaction.get_time_interval_id(),
                                                             transaction.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return transaction

    def update(self, transaction):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden.
            :param transaction das Objekt, das in die DB geschrieben werden soll."""

        cursor = self._cnx.cursor()

        transaction.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE PauseBuchung " + "SET Account_ID=%s, Interval_ID=%s," \
                                           "Last_modified_date=%s WHERE Transaction_ID=%s"
        data = (transaction.get_target_user_account(),
                transaction.get_time_interval_id(), transaction.get_last_modified_date(),
                transaction.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, transaction):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen.
            :param transaction das aus der DB zu löschende "Objekt" """

        cursor = self._cnx.cursor()

        command = "DELETE FROM PauseBuchung where Transaction_ID='{}'".format(transaction.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
