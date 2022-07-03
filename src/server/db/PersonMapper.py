from server.business_objects.Person import Person
from server.db.Mapper import Mapper
import datetime


class PersonMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen.

        :return Eine Sammlung mit Personen-Objekten
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Person")
        tuples = cursor.fetchall()

        for (id, name, surname,
             mail_address, user_name, firebase_id,
             manager_status, last_modified_date) in tuples:
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_surname(surname)
            person.set_mail_address(mail_address)
            person.set_user_name(user_name)
            person.set_last_modified_date(last_modified_date)
            person.set_manager_status(manager_status)
            person.set_firebase_id(firebase_id)

            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen einer Person
            :param key Primärschlüsselattribut
            :return Personen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
                nicht vorhandenem DB-Tupel.
            """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT User_ID, Name, Nachname, EMail, Username, Firebase_ID, " \
                  "Last_modified_date, Manager_Status FROM Person WHERE User_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, surname,
             mail_address, user_name, firebase_id,
             last_modified_date, manager_status) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_surname(surname)
            person.set_mail_address(mail_address)
            person.set_user_name(user_name)
            person.set_firebase_id(firebase_id)
            person.set_last_modified_date(last_modified_date)
            person.set_manager_status(manager_status)
            result = person
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_person_by_firebase_id(self, firebase_id):
        """Auslesen der Person anhand der firebase ID
        :param firebase_id der zugehörigen Person
        :return Person mit der zugehörigen firebase_id
                    """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT User_ID, Name, Nachname, EMail, Username, Firebase_ID, " \
                  "Last_modified_date, Manager_Status FROM Person WHERE Firebase_ID='{}'".format(firebase_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, surname,
             mail_address, user_name, firebase_id,
             last_modified_date, manager_status) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_surname(surname)
            person.set_mail_address(mail_address)
            person.set_user_name(user_name)
            person.set_firebase_id(firebase_id)
            person.set_last_modified_date(last_modified_date)
            person.set_manager_status(manager_status)
            result = person
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_activity_key(self, activity_key):
        """Auslesen aller Personen anhand der Aktivität
        :param activity_key
        :return Eine Sammlung mit Personen-Objekten, die sämtliche Personen mit
        gewünschter Aktivität erhält
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT User_ID FROM Aktivitaet_Zustaendigkeit " \
                  "WHERE Activity_ID='{}'".format(activity_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_project_key(self, project_key):
        """Auslesen aller Personen anhand des Projektes
                :param project_key
                :return Eine Sammlung mit Personen-Objekten, die sämtliche Personen mit
                gewünschten Projekten enthält
                """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT User_ID FROM Projekt_Zustaendigkeit " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def find_creator_by_project_key(self, project_key):
        """Auslesen der Ersteller anhand des Projekts
                :param project_key
                :return Eine Sammlung mit Personen-Objekten, die aus Erstellern besteht mit
                dem gewünschten Projekt
                """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT User_ID FROM Projekt_Ersteller " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result = (self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    

    def insert(self, person):
        """Einfügen eines Customer-Objekts in die Datenbank.

                Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
                berichtigt.

                :param person das zu speichernde Objekt
                :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
                """
        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(User_ID) AS maxid FROM Person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0] + 1)


        cursor.execute("INSERT INTO Person (User_ID, Name, Nachname, "
                       "EMail, Username, Firebase_ID, Last_modified_date,Manager_Status) "
                       "VALUES ('{}','{}','{}',"
                       "'{}','{}','{}','{}','{}')".format(person.get_id(), person.get_name(),
                                                          person.get_surname(), person.get_mail_address(),
                                                          person.get_user_name(), person.get_firebase_id(),
                                                          person.get_last_modified_date(), person.get_manager_status()))

        self._cnx.commit()
        cursor.close()
        return person

    def update(self, person):

        cursor = self._cnx.cursor()

        person.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE Person SET Name=%s, Nachname=%s, " \
                  "EMail=%s, Username=%s, Firebase_ID=%s, Last_modified_date=%s," \
                  "Manager_Status=%s WHERE User_ID=%s"
        data = (person.get_name(), person.get_surname(),
                person.get_mail_address(), person.get_user_name(), person.get_firebase_id(),
                person.get_last_modified_date(), person.get_manager_status(), person.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):

        cursor = self._cnx.cursor()

        command = "DELETE FROM Person where User_ID='{}'".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


