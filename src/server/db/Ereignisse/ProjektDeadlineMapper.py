from business_objects.Ereignisse.ProjektDeadline import ProjektDeadline
from server.db.Mapper import Mapper


class ProjektDeadlineMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT Event_ID, Name, Time, Last_modified_date from projekt_deadline")
        tuples = cursor.fetchall()

        for ( Event_ID, Name, Time, Last_modified_date) in tuples:
            projektdeadline = ProjektDeadline()
            projektdeadline.set_id(Event_ID)
            projektdeadline.set_event_name(Name)
            projektdeadline.set_time_of_event(Time)
            projektdeadline.set_last_modified_date(Last_modified_date)


            result.append(projektdeadline)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Event_ID, Name, Time, Last_modified_date from projekt_deadline WHERE Event_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (Event_ID, Name, Time, Last_modified_date) = tuples[0]
            projektdeadline = ProjektDeadline()
            projektdeadline.set_id(Event_ID)
            projektdeadline.set_event_name(Name)
            projektdeadline.set_time_of_event(Time)
            projektdeadline.set_last_modified_date(Last_modified_date)

            result = projektdeadline
        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_project_key(self, project_key):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT Deadline_ID FROM Projekt " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result = (self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, projektdeadline):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(Event_ID) AS maxid FROM projekt_deadline ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projektdeadline.set_id(maxid[0] + 1)

        command = "INSERT INTO projekt_deadline (Event_ID, Name, Time, Last_modified_date) VALUES (%s,%s,%s,%s)"
        data = (projektdeadline.get_id(),
                projektdeadline.get_event_name(),
                projektdeadline.get_time_of_event(),
                projektdeadline.get_last_modified_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projektdeadline


    def update(self, projektdeadline):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        cursor = self._cnx.cursor()

        command = "UPDATE projekt_deadline " + "SET Name=%s, Time=%s, Last_modified_date=%s WHERE Event_ID=%s"
        data = (
                projektdeadline.get_event_name(),
                projektdeadline.get_time_of_event(),
                projektdeadline.get_last_modified_date(),
                projektdeadline.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projektdeadline):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM projekt_deadline WHERE Event_ID='{}'".format(projektdeadline.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()