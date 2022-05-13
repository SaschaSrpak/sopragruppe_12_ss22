import datetime

from server.business_objects.Person import Person


from server.db.PersonMapper import PersonMapper


class SystemAdministration(object):

    def __init__(self):
        pass

    """
    Personen-spezifische Methoden
    """

    def create_person(self, name, surname, mail_address, user_name, firebase_id, manager_status):
        """Diese Funktion dient dazu einen Benutzer im System anzulegen."""
        person = Person()
        person.set_name(name)
        person.set_surname(surname)
        person.set_mail_address(mail_address)
        person.set_user_name(user_name)
        person.set_firebase_id(firebase_id)
        person.set_last_modified_date(datetime.datetime.now())
        person.set_manager_status(manager_status)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_activity_key(self, activity_key):
        """Alle Benutzer, die für eine Aktivität zuständig sind."""
        with PersonMapper() as mapper:
            return mapper.find_by_activity_key(activity_key)

    def get_person_by_project_key(self, project_key):
        """Alle Benutzer, die für eine Aktivität zuständig sind."""
        with PersonMapper() as mapper:
            return mapper.find_by_project_key(project_key)

    def get_person_by_id(self, person_id):
        """Gibt den Passenden Nutzer zur gegebenen ID aus"""
        with PersonMapper() as mapper:
            return mapper.fing_by_id(person_id)

    def save_person(self, person):
        """Den gegebenen Nutzer speichern"""
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, person):
        """Den angegebenen Benutzer aus dem System löschen"""
        with PersonMapper() as mapper:
            mapper.delete(person)
    