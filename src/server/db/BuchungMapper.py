from server.business_objects.Buchung import Buchung
from server.db.Mapper import Mapper
import datetime


class BuchungMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Buchung")
        tuples = cursor.fetchall()

        for (id, target_user_account_id, target_activity_id,
             last_modified_date) in tuples:
            transaction = Buchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_target_activity(target_activity_id)
            transaction.set_last_modified_date(last_modified_date)
            result.append(transaction)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID, Account_ID, Activity_ID, " \
                  "Last_modified_date FROM Buchung WHERE Transaction_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, target_user_account_id, target_activity_id,
             last_modified_date) = tuples[0]
            transaction = Buchung()
            transaction.set_id(id)
            transaction.set_target_user_account(target_user_account_id)
            transaction.set_target_activity(target_activity_id)
            transaction.set_last_modified_date(last_modified_date)
            result = transaction
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_account_key(self, account_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM Buchung " \
                  "WHERE Activity_ID='{}'".format(account_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_activity_key(self, activity_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM Buchung " \
                  "WHERE Activity_ID='{}'".format(activity_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, transaction):

        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Transaction_ID) AS maxid FROM Buchung ")
        tuples = cursor.fetchall

        for (maxid) in tuples:
            transaction.set_id(maxid[0]+1)

        cursor.execute("INSERT INTO Buchung (Transaction_ID, Account_ID, "
                       "Activity_ID, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}')".format(transaction.get_id(),
                                                             transaction.get_target_user_account(),
                                                             transaction.get_target_activity(),
                                                             transaction.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return transaction

    def update(self, transaction):

        cursor = self._cnx.cursor

        transaction.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE Buchung" + "SET Account_ID=%s, Activity_ID=%s," \
                                     "Last_modified_date=%s WHERE Transaction_ID=%s"
        data = (transaction.get_target_user_account(),
                transaction.get_target_activity(), transaction.get_last_modified_date(),
                transaction.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, transaction):

        cursor = self._cnx.cursor()

        command = "DELETE FROM Buchung where Transaction_ID='{}'".format(transaction.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
