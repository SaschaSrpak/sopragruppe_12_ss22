from server.db.BuchungMapper import BuchungMapper


class ZeitintervallbuchungMapper(BuchungMapper):
    def __init__(self):
        super().__init__()

    def find_by_interval_key(self, interval_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Transaction_ID FROM Buchungs_Bezug_Zeitintervall " \
                  "WHERE Interval_ID='{}'".format(interval_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def set_interval_relation(self, transaction, interval):
        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Buchungs_Bezug_Zeitintervall(Transaction_ID,"
                       "Interval_ID) VALUES('{}', '{}')".format(transaction.get_id(), interval.get_id()))
        self._cnx.commit()
        cursor.close()
        return transaction

    def update_interval_relation(self, transaction, interval):
        cursor = self._cnx.cursor
        command = "UPDATE Buchungs_Bezug_Zeitintervall" + "SET Interval_ID=%s, WHERE Transaction_ID=%s"
        data = (interval.get_id(), transaction.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_interval_relation(self, transaction, interval):
        cursor = self._cnx.cursor()
        command = "DELETE FROM Buchungs_Bezug_Zeitintervall " \
                  "WHERE Transaction_ID='{}'," \
                  " Interval_ID='{}'".format(transaction.get_id(),
                                             interval.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
