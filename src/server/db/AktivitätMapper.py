from server.business_objects.Aktivität import Aktivitaet
from server.db.Mapper import Mapper
import datetime


class AktivitaetMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Aktivitaet")
        tuples = cursor.fetchall()

        for (id, name, man_day_capacity,
             last_modified_date) in tuples:
            activity = Aktivitaet()
            activity.set_id(id)
            activity.set_activity_name(name)
            activity.set_man_day_capacity(man_day_capacity)
            activity.set_last_modified_date(last_modified_date)
            result.append(activity)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT Activity_ID, Name, Man_Day_Capacity, " \
                  "Last_modified_date FROM Aktivitaet WHERE Activity_ID='{}'".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, man_day_capacity,
             last_modified_date) = tuples[0]
            activity = Aktivitaet()
            activity.set_id(id)
            activity.set_activity_name(name)
            activity.set_man_day_capacity(man_day_capacity)
            activity.set_last_modified_date(last_modified_date)
            result = activity
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_key(self, person_key):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT Activity_ID FROM Aktivitaet_Zustaendigkeit " \
                  "WHERE User_ID='{}'".format(person_key)
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
        command = "SELECT Activity_ID FROM Projekt_Aktivitaeten " \
                  "WHERE Project_ID='{}'".format(project_key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        for i in tuples:
            result.append(self.find_by_key(str(i[0])))

        self._cnx.commit()
        cursor.close()
        return result

    def insert_person_responsible(self, activity, person):
        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO Aktivitaet_Zustaendigkeit(Activity_ID,"
                       "User_ID) VALUES('{}', '{}')".format(activity.get_id(), person.get_id()))
        self._cnx.commit()
        cursor.close()
        return activity

    def update_person_responsible(self, activity, person):
        cursor = self._cnx.cursor
        command = "UPDATE Aktivitaet_Zuständigkeit" + "SET User_ID=%s, WHERE Activity_ID=%s"
        data = (person.get_id(), activity.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete_person_responsible(self, activity, person):
        cursor = self._cnx.cursor()
        command = "DELETE FROM Aktivitaet WHERE Activity_ID='{}', User_ID='{}'".format(activity.get_id(), person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def insert(self, activity):

        cursor = self._cnx.cursor(buffered=True)
        cursor.execute("SELECT MAX(Activity_ID) AS maxid FROM Aktivitaet ")
        tuples = cursor.fetchall

        for (maxid) in tuples:
            activity.set_id(maxid[0]+1)

        cursor.execute("INSERT INTO Aktivitaet (Activity_ID, Name, "
                       "Man_Day_Capacity, Last_modified_date) "
                       "VALUES ('{}','{}','{}','{}')".format(activity.get_id(),
                        activity.get_activity_name(), activity.get_man_day_capacity(),
                        activity.get_last_modified_date()))

        self._cnx.commit()
        cursor.close()
        return activity

    def update(self, activity):

        cursor = self._cnx.cursor

        activity.set_last_modified_date(datetime.datetime.now())
        command = "UPDATE Aktivitaet" + "SET Name=%s, Man_Day_Capacity=%s," \
                                        "Last_modified_date=%s WHERE Activity_ID=%s"
        data = (activity.get_activity_name(),
                activity.get_man_day_capacity(), activity.get_last_modified_date(),
                activity.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, activity):

        cursor = self._cnx.cursor()

        command = "DELETE FROM Aktivitaet where Activity_ID='{}'".format(activity.get_id())
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

        mapper.insert(Hugo)
        test = mapper.find_by_activity_key("A100001")
        for i in test:
            print(i.get_name())
        result = mapper.find_all()
        for i in result:
            print(i.get_name())
"""

with AktivitaetMapper() as mapper:
    test = mapper.find_by_person_key(10001)
    for i in test:
        print(i.get_activity_name())

    result = mapper.find_all()
    for i in result:
        print(i.get_activity_name())
