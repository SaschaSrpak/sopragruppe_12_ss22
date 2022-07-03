from server.business_objects.Buchungen.ProjektarbeitBuchung import ProjektarbeitBuchung
from server.db.Mapper import Mapper
import datetime


class ProjektarbeitBuchungMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lesen aller Objekte in der Datenbank
        :return Eine Sammlung von ProjektarbeitBuchung-Objekten"""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from ProjektarbeitBuchung")
        tuples = cursor.fetchall()

        for (id, target_user_account_id, target_activity_id,
             interval_id, last_modified_date) in tuples:
            transaction = ProjektarbeitBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_target_activity(target_activity_id)
            transaction.set_time_interval_id(interval_id)
            transaction.set_last_modified_date(last_modified_date)
            result.append(transaction)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus.
        :param id Primärschlüssel
        :return Projektarbeitbuchungs-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandem Tupel
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID, Account_ID, Activity_ID, " \
                  "Interval_ID, Last_modified_date FROM ProjektarbeitBuchung WHERE Transaction_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, target_user_account_id, target_activity_id,
             interval_id, last_modified_date) = tuples[0]
            transaction = ProjektarbeitBuchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_target_activity(target_activity_id)
            transaction.set_time_interval_id(interval_id)
            transaction.set_last_modified_date(last_modified_date)
            result = transaction
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_account_key(self, account_key):
        """Lesen aller Projekktarbeitsbuchung aus der Datenbank mit dem gegebenem Account
        :param account_key Primärschlüsselattribut
        :return project, das dem übergebenen Schlüssel entspircht"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM ProjektarbeitBuchung " \
                  "WHERE Account_ID='{}'".format(account_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_activity_key(self, activity_key):
        """Lesen aller Projektarbeitsbuchung aus der Datenbank mit dem gegebenem Account
        :param activity_key Primärschlüsselattribut
        :return project, das dem übergebenen Schlüssel entspircht"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM ProjektarbeitBuchung " \
                  "WHERE Activity_ID='{}'".format(activity_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result


    def insert(self, transaction):
        """Einfügen eines neuen ProjektarbeitBuchung-Objekts.
            Der Primärschlüssel wird geprüft und ggf. berichtigt
            :param arbeitskonto das zu speichernde Objekt
            :return das bereits übergeben Objekt mit evtl. korrigierter ID"""
        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Transaction_ID) AS maxid FROM ProjektarbeitBuchung ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            transaction.set_id(maxid[0] + 1)

        cursor.execute("INSERT INTO ProjektarbeitBuchung (Transaction_ID, Account_ID, "
                       "Activity_ID, Interval_ID, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}','{}')".format(transaction.get_id(),
                                                                  transaction.get_target_user_account(),
                                                                  transaction.get_target_activity(),
                                                                  transaction.get_time_interval_id(),
                                                                  transaction.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return transaction

    def update(self, transaction):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden.
            :param zeitkonto das Objekt, das in die DB geschrieben werden soll."""

        cursor = self._cnx.cursor()

        transaction.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE ProjektarbeitBuchung " + "SET Account_ID=%s, Activity_ID=%s, Interval_ID=%s," \
                                                  "Last_modified_date=%s WHERE Transaction_ID=%s"
        data = (transaction.get_target_user_account(),
                transaction.get_target_activity(), transaction.get_time_interval_id(), transaction.get_last_modified_date(),
                 transaction.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, transaction):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen.
            :param zeitkonto das aus der DB zu löschende "Objekt" """
        cursor = self._cnx.cursor()

        command = "DELETE FROM ProjektarbeitBuchung where Transaction_ID='{}'".format(transaction.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


