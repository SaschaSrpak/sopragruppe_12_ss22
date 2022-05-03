from server.business_objects.Person import Person
from server.db.Mapper import Mapper
import datetime


class PersonMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Person")
        tuples = cursor.fetchall()

        for (id, name, surname,
             mail_adress, user_name,
             last_modified_date, manager_status) in tuples:
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_surname(surname)
            person.set_mail_adress(mail_adress)
            person.set_user_name(user_name)
            person.set_last_modified_date(last_modified_date)
            person.set_manager_status(manager_status)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT User_ID, Name, Nachname, EMail, Username, " \
                  "Last_modified_date FROM Person WHERE User_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, surname,
             mail_adress, user_name,
             last_modified_date) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_surname(surname)
            person.set_mail_adress(mail_adress)
            person.set_user_name(user_name)
            person.set_last_modified_date(last_modified_date)
            result = person
        except IndexError:
             result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_activity_key(self, activity_key):
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

    def insert(self, person):

        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(User_ID) AS maxid FROM Person ")
        tuples = cursor.fetchall

        for (maxid) in tuples:
            person.set_id(maxid[0]+1)

        cursor.execute("INSERT INTO Person (User_ID, Name, Nachname, "
                       "EMail, Username, Last_modified_date) "
                       "VALUES ('{}','{}','{}',"
                       "'{}','{}','{}')".format(person.get_id(), person.get_name(),
                       person.get_surname(), person.get_mail_adress(),
                       person.get_user_name(), person.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return person

    def update(self, person):

        cursor = self._cnx.cursor

        person.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE Person" + "SET Name=%s, Nachname=%s, " \
                  "EMail=%s, Username=%s, Last_modified_date=%s WHERE User_ID=%s"
        data = (person.get_name(), person.get_surname(),
                person.get_mail_adress(), person.get_user_name(),
                person.get_last_modified_date(), person.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):

        cursor = self._cnx.cursor()

        command = "DELETE FROM Person where User_ID='{}'".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()



"""
if (__name__ == "__main__"):
    Hugo = Person()
    Hugo.set_id("U1000243")
    Hugo.set_name("Hugo")
    Hugo.set_surname("Herbert")
    Hugo.set_mail_adress("hugo.herbert@hdmv.de")
    Hugo.set_user_name("HHerbert")
    Hugo.set_last_modified_date(datetime.datetime.now())
    
    with PersonMapper() as mapper:

        #mapper.insert(Hugo)
        test = mapper.find_by_activity_key("A100001")
        for i in test:
            print(i.get_name())
        result = mapper.find_all()
        for i in result:
            print(i.get_name())

"""
with PersonMapper() as mapper:
    # mapper.insert(Hugo)
    test = mapper.find_by_key("10004")
    print(test.get_surname(), test.get_mail_adress())
    result = mapper.find_all()
    for i in result:
        print(i.get_name(), i.get_surname())


