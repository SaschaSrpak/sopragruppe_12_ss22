from server.business_objects.Buchungen.StartereignisBuchung import StartereignisBuchung
from server.db.Mapper import Mapper
import datetime


class StartereignisBuchungMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lesen aller Objekte in der Datenbank
        :return Eine Sammlung von StartereignisBuchung-Objekten"""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from StartereignisBuchung")
        tuples = cursor.fetchall()

        for (id, target_user_account_id, event_id,
             last_modified_date) in tuples:
            transaction = StartereignisBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_event_id(event_id)
            transaction.set_last_modified_date(last_modified_date)
            result.append(transaction)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID, Account_ID, Event_ID, " \
                  "Last_modified_date FROM StartereignisBuchung WHERE Transaction_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, target_user_account_id, event_id,
             last_modified_date) = tuples[0]
            transaction = StartereignisBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_event_id(event_id)
            transaction.set_last_modified_date(last_modified_date)
            result = transaction
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_event_key(self, event_key):
        """Lesen eines Projekts aus der Datenbank mit der gegebenen ID"""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID, Account_ID, Event_ID, " \
                  "Last_modified_date FROM StartereignisBuchung WHERE Event_ID='{}'".format(event_key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, target_user_account_id, event_id,
             last_modified_date) = tuples[0]
            transaction = StartereignisBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_event_id(event_id)
            transaction.set_last_modified_date(last_modified_date)
            result = transaction
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_account_key(self, account_key):
        """Lesen aller Projekte aus der Datenbank mit dem gegebenen Account"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM StartereignisBuchung " \
                  "WHERE Account_ID='{}'".format(account_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, transaction):
        """Einfügen eines Transactios-Objekts in die Datenbank.

                Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
                berichtigt.

                :param person das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Transaction_ID) AS maxid FROM StartereignisBuchung ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            transaction.set_id(maxid[0] + 1)

        cursor.execute("INSERT INTO StartereignisBuchung (Transaction_ID, Account_ID, "
                       "Event_ID, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}')".format(transaction.get_id(),
                                                             transaction.get_target_user_account(),
                                                             transaction.get_event_id(),
                                                             transaction.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return transaction

    def update(self, transaction):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        transaction.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE StartereignisBuchung" + "SET Account_ID=%s, Event_ID=%s," \
                                                  "Last_modified_date=%s WHERE Transaction_ID=%s"
        data = (transaction.get_target_user_account(),
                transaction.get_event_id(), transaction.get_last_modified_date(),
                transaction.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, transaction):

        cursor = self._cnx.cursor()

        command = "DELETE FROM StartereignisBuchung where Transaction_ID='{}'".format(transaction.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
