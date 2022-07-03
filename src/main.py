import datetime

from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from flask import request, redirect, url_for

from server.SystemAdministration import SystemAdministration
from server.business_objects.Person import Person
from server.business_objects.Aktivität import Aktivitaet
from server.business_objects.Ereignisse.Kommen import Kommen
from server.business_objects.Ereignisse.Gehen import Gehen
from server.business_objects.Zeitkonto import Zeitkonto
from server.business_objects.Projekt import Projekt
from server.business_objects.Ereignisse.Kommen import Kommen
from server.business_objects.Ereignisse.Gehen import Gehen
from server.business_objects.Ereignisse.Startereignis import Startereignis
from server.business_objects.Ereignisse.Endereignis import Endereignis
from server.business_objects.Ereignisse.ProjektDeadline import ProjektDeadline
from server.business_objects.Zeitintervalle.Projektarbeit import Projektarbeit
from server.business_objects.Zeitintervalle.Pause import Pause
from server.business_objects.Zeitintervalle.Projektlaufzeit import Projektlaufzeit
from server.business_objects.Buchungen.KommenBuchung import KommenBuchung
from server.business_objects.Buchungen.GehenBuchung import GehenBuchung
from server.business_objects.Buchungen.StartereignisBuchung import StartereignisBuchung
from server.business_objects.Buchungen.EndereignisBuchung import EndereignisBuchung
from server.business_objects.Buchungen.PauseBuchung import PauseBuchung
from server.business_objects.Buchungen.ProjektarbeitBuchung import ProjektarbeitBuchung

from SecurityDecorator import secured

"""
Hinweise zu diesem Modul:

    In diesem Modul befindet sich die Flask-App. Diese muss ausgeführt werden, damit der Backend-Server startet
    und HTTP-Requests annehmen und verarbeiten kann. In den Funktionen der hier definierten App finden sich
    die verschiedenen API-Methoden und deren URL's. Somit wird hier festgelegt, wie mit dem Backend interagiert
    werden kann.


HTTP response status codes:

        Folgende Codes werden verwendet:
        200 OK           :      bei erfolgreichen requests. Af die Verwendung von
                                weiter differenzierenden Statusmeldungen wie etwa
                                '204 No Content' für erfolgreiche requests, die
                                außer evtl. im Header keine weiteren Daten zurückliefern,
                                wird in dieser Fallstudie auch aus Gründen einer
                                möglichst einfachen Umsetzung verzichtet.
        401 Unauthorized :      falls der User sich nicht gegenüber dem System
                                authentisiert hat und daher keinen Zugriff erhält.
        404 Not Found    :      falls eine angefragte Resource nicht verfügbar ist
        500 Internal Server Error : falls der Server einen Fehler erkennt,
                                diesen aber nicht genauer zu bearbeiten weiß.
"""

app = Flask(__name__, static_folder="./build", static_url_path='/')

app.config['ERROR_404_HELP'] = False


@app.route('/')
def index():
    return app.send_static_file('index.html')


api = Api(app, version='1.0', title='Zeiterfassung API',
          description='API für das Projektzeiterfassungssystem')

CORS(app, resources=r'/timesystem/*')


@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith('/timesystem'):
        return "Fehler", 404
    else:
        return redirect(url_for('index'))


timesystem = api.namespace('timesystem', description='Funktionen des Projektzeiterfassungssystem')

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Die ID eines Business Object'),
    'last_modified_date': fields.DateTime(attribute='_last_modified_date', description='Information, ob die Person ein '
                                                                                       'Projektleiter ist')

})

person = api.inherit('Person', {
    'id': fields.Integer(attribute='_id', description='Die ID eines Business Object'),
    'last_modified_date': fields.DateTime(attribute='_last_modified_date', description='Zeitpunkt der letzten Änder'),
    'name': fields.String(attribute='_name', description='Vorname der Person'),
    'surname': fields.String(attribute='_surname', description='Nachname der Person'),
    'mail_address': fields.String(attribute='_mail_address', description='Mail-Adresse der Person'),
    'user_name': fields.String(attribute='_user_name', description="User-Name der Person"),
    'google_user_id': fields.String(attribute='_firebase_id', description='Google_ID der Person'),
    'manager_status': fields.String(attribute="_manager_status",
                                    description='Information, ob die Person ein '
                                                'Projektleiter ist'),

})

account = api.inherit('Account', {
    'id': fields.Integer(attribute='_id', description='Die ID eines Business Object'),
    'owner': fields.Integer(attribute='_owner', description='ID der zugehörigen Person')
})

project = api.inherit('Projekt', bo, {
    'name': fields.String(attribute='_name', description='Name des Projekts'),
    'creator': fields.String(attribute='_creator', description='ID des Projekterstellers'),
    'client': fields.String(attribute='_client', description='Name des Auftraggebers'),
    'description': fields.String(attribute='_description', description='Beschreibung des Projekts'),
    'set_deadline': fields.Integer(attribute='_set_deadline', description='ID der Projektdeadline'),
    'project_duration': fields.Integer(attribute='_project_duration', description='ID der Projektlaufzeit')
})

activity = api.inherit('Aktivitaet', bo, {
    'activity_name': fields.String(attribute='_activity_name', description='Name der Aktivität'),
    'man_day_capacity': fields.Float(attribute='_man_day_capacity', description='Kapazität in Personentagen'),
    'persons_responsible': fields.List(fields.Nested(person), attribute='_persons_responsible', description='Kapazität in Personentagen'),
})

zi = api.inherit('Zeitintervall', bo, {
    'name': fields.String(attribute='_name', description='Name des Intervalls'),
    'start': fields.Integer(attribute='_start', description='ID des Startereignisses'),
    'end': fields.Integer(attribute='_end', description='ID des Endereignisses'),
    'duration': fields.Float(attribute='_duration', description='Dauer des Intervals')
})

pause = api.inherit('Pause', bo, zi)

project_duration = api.inherit('Projektlaufzeit', bo, zi)

project_worktime = api.inherit('Projektarbeit', bo, zi)

ev = api.inherit('Ereignis', bo, {
    'event_name': fields.String(attribute='_event_name', description='Name des Ereignisses'),
    'time_of_event': fields.DateTime(attribute='_time_of_event', description='Zeitpunkt des Ereignisses')
})

kommen = api.inherit('Kommen', bo, ev)

gehen = api.inherit('Gehen', bo, ev)

project_deadline = api.inherit('ProjektDeadline', bo, ev)

start_event = api.inherit('Startereignis', bo, ev)

end_event = api.inherit('Endereignis', bo, ev)

transaction = api.inherit('Buchung', bo, {
    'target_user_account': fields.Integer(attribute='_target_user_account', description='ID des Zielkontos'),
})

event_transaction = api.inherit('Ereignisbuchung', bo, transaction, {
    'event_id': fields.Integer(attribute='_event_id', discription='ID des gebuchten Ereignisses')
})

interval_transaction = api.inherit('ZeitintervallBuchung', bo, transaction, {
    'time_interval_id': fields.Integer(attribute='_time_interval_id', discription='ID des gebuchten Intervals')
})

pause_transaction = api.inherit('PauseBuchung', bo, interval_transaction)

project_worktime_transaction = api.inherit('ProjektarbeitBuchung', interval_transaction, {
    'target_activity': fields.Integer(attribute='_target_activity', description='ID der Aktivität, '
                                                                                'an welcher gearbeitet wurde')
})

kommen_transaction = api.inherit('KommenBuchung', bo, transaction, event_transaction)

gehen_transaction = api.inherit('GehenBuchung', bo, transaction, event_transaction)

start_event_transaction = api.inherit('StartereignisBuchung', bo, transaction, event_transaction)

end_event_transaction = api.inherit('EndereignisBuchung', bo, transaction, event_transaction)

interval_transaction_response = api.model('Projektarbeitszeit-Rückmeldung', {'response': fields.String()})

pause_transaction_response_special = api.model('Spezielle Pausen Übergabe', {'transaction_id': fields.Integer(),
                                                                             'interval_id': fields.Integer(),
                                                                             'interval_name': fields.String(),
                                                                             'start_time': fields.String(),
                                                                             'end_time': fields.String()})

project_worktime_transaction_response_special = api.model('Spezielle Projektarbeit '
                                                          'Übergabe', {'transaction_id': fields.Integer(),
                                                                       'interval_id': fields.Integer(),
                                                                       'interval_name': fields.String(),
                                                                       'project_name': fields.String(),
                                                                       'activity_name': fields.String(),
                                                                       'start_time': fields.String(),
                                                                       'end_time': fields.String(),
                                                                        'duration': fields.Float()})


@timesystem.route('/persons')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllPersonListOperations(Resource):

    @timesystem.marshal_list_with(person)
    def get(self):
        """Diese Funktion gibt alle im System gespeicherten
        Personen aus."""
        s_adm = SystemAdministration()
        all_persons = s_adm.get_all_persons()
        return all_persons

    @timesystem.marshal_with(person, code=200)
    @timesystem.expect(person)
    @secured
    def post(self):
        """
        Über diese Funktion kann man eine neue Person im System speichern.
        :return: Person in JSON Form
        """
        s_adm = SystemAdministration()

        proposal = Person.from_dict(api.payload)

        if proposal is not None:
            p = s_adm.create_person(proposal.get_name(), proposal.get_surname(),
                                    proposal.get_mail_address(), proposal.get_user_name(),
                                    proposal.get_firebase_id(), proposal.get_manager_status())
            print(proposal.get_name)
            return p, 200
        else:
            return '', 500


@timesystem.route('/persons/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Personen Objekts')
class PersonOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Person aus.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID des Person
        :return: Person in JSON Form
        """
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        return p

    #@secured
    def delete(self, id):
        """
        Löscht eine bestimmte Person aus dem System.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID des Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        s_adm.delete_person(p)
        return '', 200

    @timesystem.marshal_with(person)
    @timesystem.expect(person, validate=True)
    @secured
    def put(self, id):
        """
        Speichern einer bestimmten Person im System.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID des Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        p = Person.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            s_adm.save_person(p)
            return '', 200
        else:
            return '', 500


@timesystem.route('/persons/firebase/<string:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die Firebase_ID des Personen Objekts')
class PersonFirebaseOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Person aus.
        Die Person wird durch die Firebase-ID in der URI bestimmt.
        :param id: Firebase_ID der Person
        :return: Person in JSON Form
        """
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_firebase_id(id)
        if p is not None:
            return p
        else:
            return 'Person not found', 500


@timesystem.route('/persons/<int:id>/activity')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Personen-Objekts')
class PersonRelatedActivityOperations(Resource):
    @timesystem.marshal_with(activity)
    @secured
    def get(self, id):
        """
        Gibt die Aktivitäten aus, an welchen eine bestimmte Person
        beteiligt ist. Die Person wird über die ID in der URI bestimmt.
        :param id: ID der Person
        :return: JSON-Liste der Aktivitätn in JSON Form
        """
        s_adm = SystemAdministration()
        person = s_adm.get_person_by_key(id)

        if person is not None:
            activity_list = s_adm.get_activity_by_person_key(person.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/project_deadline')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectDeadlinePostOperation(Resource):
    @timesystem.marshal_with(project_deadline, code=200)
    @timesystem.expect(project_deadline)
    @secured
    def post(self):
        """
        Legt eine neue Projekt-Deadline im System an.
        :return: Projekt-Laufzeit in JSON Form
        """
        s_adm = SystemAdministration()

        proposal = ProjektDeadline.from_dict(api.payload)

        if proposal is not None:
            pd = s_adm.create_project_deadline(proposal.get_id(), proposal.get_time_of_event())
            return pd, 200
        else:
            return '', 500


@timesystem.route('/project_deadline/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des ProjektDeadline-Objekts')
class ProjectDeadlineOperations(Resource):
    @timesystem.marshal_with(project_deadline)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Projekt-Deadline aus dem System aus.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID der Projekt-Deadline
        :return: Projekt-Deadline in JSON Form
        """
        s_adm = SystemAdministration()
        pd = s_adm.get_project_deadline_by_key(id)
        return pd

    def delete(self, id):
        """
        Löscht eine bestimmte Projekt-Deadline aus dem System.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID der Projekt-Deadline
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pd = s_adm.get_project_deadline_by_key(id)
        s_adm.delete_project_deadline(pd)
        return '', 200

    @timesystem.marshal_with(project_deadline)
    @timesystem.expect(project_deadline, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Projekt-Deadline aus dem System.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param id: ID der Projekt-Deadline
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pd = ProjektDeadline.from_dict(api.payload)

        if pd is not None:
            pd.set_id(id)
            pd.set_event_name(pd.get_event_name())
            pd.set_time_of_event(pd.get_time_of_event())
            s_adm.save_project_deadline(pd)
            return '', 200
        else:
            return '', 500


@timesystem.route('/project_duration')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectDurationOperation(Resource):
    @timesystem.marshal_with(project_duration, code=200)
    @timesystem.expect(project_duration)
    @secured
    def post(self):
        """
        Legt eine neue Projekt-Laufzeit im System an.
        :return: HTTP Response
        """
        s_adm = SystemAdministration()

        proposal = Projektlaufzeit.from_dict(api.payload)

        if proposal is not None:
            pd = s_adm.create_project_duration(proposal.get_id(), proposal.get_start(), proposal.get_end())
            return pd, 200
        else:
            return '', 500


@timesystem.route('/project_duration/<string:name>/<string:start_time>/<string:end_time>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('name', 'Name der Projektlaufzeit')
@timesystem.param('start_time', 'Startzeitpunkt der Pause')
@timesystem.param('end_time', 'Endzeitpunkt der Pause')
class ProjectDurationWithTimeStempsOperation(Resource):
    @timesystem.marshal_with(project_duration, code=200)
    @secured
    def post(self, name, start_time, end_time):
        """
        Über diese Funktion kann man eine Projekt-Laufzeit
        anlegen, dei welcher man den Start- und Endzeitpunkt angibt.
        Das Objekt wird durch die ID in der URI bestimmt.
        :param name: Name des Zeitintervalls / Projektname
        :param start_time: Startzeitpunkt im Datetime-Format
        :param end_time: Endzeitpunkt im Datetime-Format
        :return: Projekt-Laufzeit in JSON Form
        """
        s_adm = SystemAdministration()

        pd = s_adm.add_project_duration_with_timestemps(name, start_time, end_time)

        return pd, 200


@timesystem.route('/project_duration/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Projektlaufzeit-Objekts')
class ProjectDurationOperations(Resource):
    @timesystem.marshal_with(project_duration)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Projekt-Laufzeit aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Laufzeit
        :return: Projekt-Laufzeit in JSON Form
        """
        s_adm = SystemAdministration()
        pd = s_adm.get_project_duration_by_key(id)
        return pd

    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Projekt-Laufzeit aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Laufzeit
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pd = s_adm.get_project_duration_by_key(id)
        s_adm.delete_project_duration(pd)
        return '', 200

    @timesystem.marshal_with(project_duration)
    @timesystem.expect(project_duration, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Projekt-Laufzeit aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Laufzeit
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pd = Projektlaufzeit.from_dict(api.payload)

        if pd is not None:
            pd.set_id(id)
            pd.set_name(pd.get_name())
            pd.set_start(pd.get_start())
            pd.set_end(pd.get_end())
            s_adm.save_project_duration(pd)
            return '', 200
        else:
            return '', 500


@timesystem.route('/projects')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllProjectListOperations(Resource):
    @timesystem.marshal_list_with(project)
    @secured
    def get(self):
        """
        Auslesen aller angelegten Projekte aus dem System.
        :return: JSON-Liste mit allen Projekten in JSON Form
        """
        s_adm = SystemAdministration()
        all_projects = s_adm.get_all_projects()
        return all_projects

    @timesystem.marshal_with(project, code=200)
    @timesystem.expect(project)
    @secured
    def post(self):
        """
        Anlegen eines neuen Projekts im System.
        :return: Angelegtes Projekt in JSON Form
        """
        s_adm = SystemAdministration()

        proposal = Projekt.from_dict(api.payload)

        if proposal is not None:
            pr = s_adm.create_project(proposal.get_name(), proposal.get_creator(),
                                      proposal.get_client(), proposal.get_description(),
                                      proposal.get_deadline(), proposal.get_project_duration(),
                                      [],
                                      proposal.get_person_responsible())
            return pr, 200
        else:
            return '', 500


@timesystem.route('/projects/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Projekt Objekts')
class ProjectOperations(Resource):
    @timesystem.marshal_with(project)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Projekt aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekts
        :return: Projekt in JSON Form
        """
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        return pr

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Projekt aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekts
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        s_adm.delete_project(pr)
        return '', 200

    @timesystem.marshal_with(project)
    #@timesystem.expect(project, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes Projekt aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekts
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pr = Projekt.from_dict(api.payload)

        if pr is not None:
            pr.set_id(id)
            s_adm.save_project(pr)
            return '', 200
        else:
            return '', 500


@timesystem.route('/projects/<int:id>/worktime')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Projekt Objekts')
class FullWorktimeOnProjectOperation(Resource):
    #@secured
    def get(self, id):
        """
        Gibt die gesamte Arbeitszeit am Projekt aus.
        :param id: ID des Projekts
        :return: Arbeitszeit in Float
        """
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        time = s_adm.get_full_work_time_on_project(pr)

        if pr:
            return time

        else:
            return '', 500


@timesystem.route('/projects/<int:id>/persons')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
@timesystem.param('id', 'ID des Projekt Objekts')
class PersonRelatedProjectOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
        """
        Gibt alle Personen aus, die an einem bestimmten Projekt
        beteiligt sind. Das Projekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekts
        :return: JSON-Liste der Personen in JSON Form
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)

        if project is not None:
            person_list = s_adm.get_persons_by_project_key(project.get_id())
            return person_list

        else:
            return 'Person not found', 500


@timesystem.route('/projects/<int:id>/persons/<int:person_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Project-Objekts')
@timesystem.param('person_id', 'Die ID des Personen-Objekts')
class ProjectRelatedSpecificPersonOperations(Resource):
    @secured
    def delete(self, id, person_id):
        """
        Löscht eine bestimmte Person aus der Liste der verantwortlichen Personen
        eines bestimmten Projekts.
        :param id: ID des Projekts
        :param person_id: ID der Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.delete_person_responsible_from_project(project, person)
        return '', 200

    @secured
    def post(self, id, person_id):
        """
        Fügt eine bestimmte Person der Liste der verantwortlichen Personen eines
        bestimmten Projekts hinzu.
        :param id: ID des Projekts
        :param person_id: ID der Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.add_person_responsible_to_project(project, person)
        return '', 200


@timesystem.route('/projects/<int:id>/activity')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedActivityOperations(Resource):
    @timesystem.marshal_with(activity)
    @secured
    def get(self, id):
        """
        Gibt alle Aktivitäten eines bestimmten Projekts aus.
        :param id: ID des Projekts
        :return: JSON Liste der Aktivitäten in JSON Form
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)

        if project is not None:
            activity_list = s_adm.get_activity_by_project_key(project.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/projects/project_deadline/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des ProjektDeadline-Objekts')
class ProjectDeadlineByProjectOperations(Resource):
    @timesystem.marshal_with(project_deadline)
    @secured
    def get(self, id):
        s_adm = SystemAdministration()
        deadline = s_adm.get_project_deadline_by_project_key(id)

        return deadline


@timesystem.route('/projects/<int:id>/activity/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Project-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivität-Objekts')
class ProjectRelatedSpecificActivityOperations(Resource):
    @secured
    def delete(self, id, activity_id):
        """
        Löscht eine Aktivität eines bestimmten Projekts.
        :param id: ID des Projekts
        :param activity_id: ID der Aktivität
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)
        s_adm.delete_activity_from_project(project, activity)
        return '', 200

    @secured
    def post(self, id, activity_id):
        """
        Fügt eine Aktivität einem bestimmten Projekt hinzu.
        :param id: ID des Projekts
        :param activity_id: ID der Aktivität
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)
        s_adm.add_activity_to_project(project, activity)
        return '', 200


@timesystem.route('/activities')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllActivityListOperations(Resource):
    @timesystem.marshal_list_with(activity)
    @secured
    def get(self):
        """
        Gibt alle Aktivitäten aus dem System aus.
        :return: JSON-Liste mit Aktivitäten in JSON Form
        """
        s_adm = SystemAdministration()
        all_activities = s_adm.get_all_activities()
        return all_activities

    @timesystem.marshal_with(activity, code=200)
    @timesystem.expect(activity)
    @secured
    def post(self):
        """
        Anlegen einer Aktivität im System.
        :return: Aktivität in JSON Form
        """
        s_adm = SystemAdministration()

        proposal = Aktivitaet.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.create_activity(proposal.get_activity_name(), proposal.get_persons_responsible(),
                                      proposal.get_man_day_capacity())
            return a, 200
        else:
            return '', 500



@timesystem.route('/activities/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class ActivityOperations(Resource):
    @timesystem.marshal_with(activity)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Aktivität aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Aktivität
        :return: Aktivität in JSON Form
        """
        s_adm = SystemAdministration()
        a = s_adm.get_activity_by_key(id)
        return a
    @timesystem.marshal_with(activity)    
    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Aktivität aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Aktivität
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        a = s_adm.get_activity_by_key(id)
     
        return s_adm.delete_activity(a)

    @timesystem.marshal_with(activity)
    #@timesystem.expect(activity, validate=True)
    @secured
    def put(self, id):
        """
        Löscht eine bestimmte Aktivität aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Aktivität
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        a = Aktivitaet.from_dict(api.payload)

        if a is not None:
            a.set_id(id)

            s_adm.change_activity_persons_responsible(a.get_id(), a.get_persons_responsible())
            return s_adm.save_activity(a)
        else:
            return '', 500


@timesystem.route('/activities/<int:id>/person')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class ActivityRelatedPersonOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
        """
        Gibt alle für eine bestimmte Aktivität verantwortlichen Personen aus
        :param id: ID der Aktivität
        :return: JSON-Liste der Personen in JSON Form
        """
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)

        if activity is not None:
            person_list = s_adm.get_persons_by_activity_key(activity.get_id())
            return person_list
        else:
            return 'Activity not found', 500


@timesystem.route('/activities/<int:id>/person/<int:person_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
@timesystem.param('person_id', 'Die ID des Personen-Objekts')
class ActivityRelatedSpecificPersonOperations(Resource):
    @secured
    def delete(self, id, person_id):
        """
        Löscht eine bestimmte Person aus der Liste der verantwortlichen Personen
        einer bestimmten Aktivität.
        :param id: ID der Aktivität
        :param person_id: ID der Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.delete_person_responsible_from_activity(activity, person)
        return '', 200

    @secured
    def post(self, id, person_id):
        """
        Fügt eine bestimmte Person der Liste der verantwortlichen Personen
        einer bestimmten Aktivität hinzu.
        :param id: ID der Aktivität
        :param person_id: ID der Person
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.add_person_responsible_to_activity(activity, person)
        return '', 200


@timesystem.route('/accounts')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllAccountListOperations(Resource):
    @timesystem.marshal_list_with(account)
    @secured
    def get(self):
        """
        Gibt alle Zeitkontos aus dem System aus.
        :return: JSON-Liste der Zeitkontos in JSON Form
        """
        s_adm = SystemAdministration()
        all_accounts = s_adm.get_all_time_accounts()
        return all_accounts


@timesystem.route('/accounts/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class AccountOperations(Resource):
    @timesystem.marshal_with(account)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Zeitkonto aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkonto
        :return: Zeitkonto in JSON Form
        """
        s_adm = SystemAdministration()
        ac = s_adm.get_time_account_by_key(id)
        return ac

    def delete(self, id):
        """
        Löscht ein bestimmtes Zeikonto aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        ac = s_adm.get_time_account_by_key(id)
        s_adm.delete_account(ac)
        return '', 200

    @timesystem.marshal_with(account)
    @timesystem.expect(account, validate=True)
    @secured
    def put(self, id):
        s_adm = SystemAdministration()
        ac = Zeitkonto.from_dict(api.payload)

        if ac is not None:
            ac.set_id(id)
            s_adm.save_activity(ac)
            return '', 200
        else:
            return '', 500


@timesystem.route('/accounts/person/<int:id>/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Person-Objekts')
class PersonOfAccountOperations(Resource):
    @timesystem.marshal_list_with(account)
    @secured
    def get(self, id):
        """
        Gibt das der Person zugehörige Zeitkonto aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Person
        :return: Zeitkonto in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_person_key(id)

        if account is not None:
            return account
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/kommen/transactions/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class KommenTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(kommen_transaction)
    @secured
    def get(self, id):
        """
        Gibt alle Kommen-Ereignis-Buchungen aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Kommen-Ereignis-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        transactions = s_adm.get_all_kommen_transactions_for_account(account)

        if account is not None:
            return transactions
        else:
            return 'Account not found', 500


@timesystem.route('/account/kommen/date/<int:id>/<string:start_date>/<string:end_date>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Kommen-Objekts')
@timesystem.param('start_date', 'Anfangsdatum des Suchtzeitraums')
@timesystem.param('end_date', 'Enddatum des Suchtzeitraums')
class AccountKommenDateOperations(Resource):
    @timesystem.marshal_list_with(kommen)
    @secured
    def get(self, id, start_date, end_date):
        """
        Gibt alle Kommen-Ereignisse die auf ein bestimmtes Zeitkonto
        gebucht wurden für einen bestimmten Zeitraum aus
        :param id: ID des Zeitkontos
        :param start_date: Anfangsdatum des Suchtzeitraums
        :param end_date: Enddatum des Suchzeitraums
        :return:
        """
        s_adm = SystemAdministration()
        events = s_adm.get_all_kommen_events_for_account_between_dates(id, start_date, end_date)
        return events



@timesystem.route('/accounts/gehen/transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class GehenTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(gehen_transaction)
    @timesystem.marshal_list_with(gehen_transaction)
    @secured
    def get(self, id):
        """
        Gibt alle Gehen-Ereignis-Buchungen aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Gehen-Ereignis-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        transactions = s_adm.get_all_gehen_transactions_for_account(account)

        if account is not None:
            return transactions
        else:
            return 'Account not found', 500


@timesystem.route('/account/gehen/<int:id>/<string:start_date>/<string:end_date>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Kommen-Objekts')
@timesystem.param('start_date', 'Anfangsdatum des Suchtzeitraums')
@timesystem.param('end_date', 'Enddatum des Suchtzeitraums')
class AccountGehenDateOperations(Resource):
    @timesystem.marshal_list_with(gehen)
    @secured
    def get(self, id, start_date, end_date):
        """
        Gibt alle Gehen-Ereignisse die auf ein bestimmtes Zeitkonto
        gebucht wurden für einen bestimmten Zeitraum aus
        :param id: ID des Zeitkontos
        :param start_date: Anfangsdatum des Suchtzeitraums
        :param end_date: Enddatum des Suchzeitraums
        :return:
        """
        s_adm = SystemAdministration()
        events = s_adm.get_all_gehen_events_for_account_between_dates(id, start_date, end_date)

        return events



@timesystem.route('/accounts/pause/<int:id>/time')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class PauseTimeRelatedAccountOperations(Resource):
    @secured
    def get(self, id):
        """
        Gibt die gesamte gebuchte Pausenzeit in Stunden aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: Pausenzeit in Stunden
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        pause_time = s_adm.get_full_pause_time_for_account(account)

        if account is not None:
            return pause_time
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/pause/<int:id>/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class PauseTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(pause_transaction)
    @secured
    def get(self, id):
        """
        Gibt alle Pausen-Buchungen aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Pausen-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        pauses = s_adm.get_all_pause_transactions_for_account(account)

        if account is not None:
            return pauses
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/pause/values/<int:id>/<string:start_date>/<string:end_date>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('start_date', 'Anfangsdatum des Suchtzeitraums')
@timesystem.param('end_date', 'Enddatum des Suchtzeitraums')
class PauseTransactionValueBetweenDatesAccountOperations(Resource):
    @timesystem.marshal_list_with(pause_transaction_response_special)
    @secured
    def get(self, id, start_date, end_date):
        """
        Gibt alle Pausen-Buchungen aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Pausen-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        pauses_values = s_adm.get_all_pause_transaction_values_for_account_between_dates(account, start_date, end_date)

        if account is not None:
            return pauses_values



@timesystem.route('/accounts/worktime-transactions/<int:id>/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class WorktimeTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(project_worktime_transaction)
    @secured
    def get(self, id):
        """
        Gibt alle Projekt-Arbeitszeiten-Buchungen aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Projekt-Arbeitszeiten-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        pwt = s_adm.get_all_worktime_transactions_for_account(account)

        if account is not None:
            return pwt
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/worktime/<int:id>/activities/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
class ActivityWorktimeRelatedAccountOperations(Resource):
    @secured
    def get(self, id, activity_id):
        """
        Gibt die gesamte Projekt-Arbeitszeit in Stunden aus, die auf ein bestimmtes
        Konto und auf eine bestimmte Aktivität gebucht wurde.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :param activity_id: ID der Aktivität
        :return: Projekt-Arbeitszeit in Stunden
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)

        if activity is not None and account is not None:
            worktime_on_activity = s_adm.get_worktime_on_activity(account, activity)
            return worktime_on_activity
        else:
            return 'Activity not found', 500

@timesystem.route('/accounts/worktime/values/<int:id>/<string:start_date>/<string:end_date>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('start_date', 'Anfangsdatum des Suchtzeitraums')
@timesystem.param('end_date', 'Enddatum des Suchtzeitraums')
class WorktimeTransactionValueBetweenDatesAccountOperations(Resource):
    @timesystem.marshal_list_with(project_worktime_transaction_response_special)
    @secured
    def get(self, id, start_date, end_date):
        """
        Gibt alle Werte einer Projekt-Buchung aus, die auf ein bestimmtes
        Konto gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :return: JSON-Liste der Pausen-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        worktime_values = s_adm.get_all_worktime_transaction_values_for_account_between_dates(account, start_date,
                                                                                              end_date)

        if account is not None:
            return worktime_values
        

@timesystem.route('/accounts/transactions/<int:id>/activities/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
class ActivityWorktimeTransactionsRelatedAccountOperations(Resource):
    @timesystem.marshal_with(project_worktime_transaction)
    @secured
    def get(self, id, activity_id):
        """
        Gibt alle Projekt-Arbeitszeit-Buchungen aus, die auf ein bestimmtes
        Konto und eine bestimmte Aktivität gebucht wurden.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Zeitkontos
        :param activity_id: ID der Aktivität
        :return: JSON-Liste der Projekt-Arbeitszeit-Buchungen in JSON Form
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)

        if activity is not None and account is not None:
            transactions = s_adm.get_worktime_transactions_on_activity(account, activity)
            return transactions
        else:
            return 'Activity or Account not found', 500


@timesystem.route('/start-event/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des StartEreignis-Objekts')
class StartEventOperations(Resource):
    @timesystem.marshal_with(start_event)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Start-Ereignis aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Start-Ereignisses
        :return: Start_Ereignis in JSON-Form
        """
        s_adm = SystemAdministration()
        se = s_adm.get_start_event_by_key(id)
        return se

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Start-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Start-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        se = s_adm.get_start_event_by_key(id)
        s_adm.delete_start_event(se)
        return '', 200

    @timesystem.marshal_with(start_event)
    @timesystem.expect(start_event, validate=True)
    @secured
    def put(self, id):
        """
        Speicht ein bestimmtes Start-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Start-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        se = Startereignis.from_dict(api.payload)

        if se is not None:
            se.set_id(id)
            se.set_event_name(se.get_event_name())
            se.set_time_of_event(se.get_time_of_event())
            s_adm.save_start_event(se)
            return '', 200
        else:
            return '', 500


@timesystem.route('/start-event-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des StartEreignisBuchungs-Objekt')
class StartEventTransactionOperations(Resource):
    @timesystem.marshal_with(start_event_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Start-Ereignis-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Start-Ereignis-Buchung
        :return: Start-Ereignis-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        st = s_adm.get_start_event_transaction_by_key(id)
        return st, 200

    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Start-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Start-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        st = s_adm.get_start_event_transaction_by_key(id)
        s_adm.delete_start_event_transaction(st)
        return '', 200

    @timesystem.marshal_with(start_event_transaction)
    @timesystem.expect(start_event_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Start-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Start-Ereignis-Buchung
        :return: Start-Ereignis-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        st = StartereignisBuchung.from_dict(api.payload)

        if st is not None:
            st.set_id(id)
            st.set_target_user_account(st.get_target_user_account())
            st.set_event_id(st.get_event_id())
            s_adm.save_start_event_transaction(st)
            return st, 200
        else:
            return '', 500


@timesystem.route('/end-event/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des EndEreignis-Objekts')
class EndEventOperations(Resource):
    @timesystem.marshal_with(end_event)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes End-Ereignis aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des End-Ereignisses
        :return: End-Ereignis in JSON-Form
        """
        s_adm = SystemAdministration()
        e = s_adm.get_end_event_by_key(id)
        return e

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes End-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des End-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        e = s_adm.get_end_event_by_key(id)
        s_adm.delete_end_event(e)
        return '', 200

    @timesystem.marshal_with(end_event)
    @timesystem.expect(end_event, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes End-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des End-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        e = Endereignis.from_dict(api.payload)

        if e is not None:
            e.set_id(id)
            e.set_event_name(e.get_event_name())
            e.set_time_of_event(e.get_time_of_event())
            s_adm.save_end_event(e)
            return '', 200
        else:
            return '', 500


@timesystem.route('/end-event-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des EndEreignisBuchungs-Objekt')
class EndEventTransactionOperations(Resource):
    @timesystem.marshal_with(end_event_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte End-Ereignis-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der End-Ereignis-Buchung
        :return: End-Ereignis-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        et = s_adm.get_end_event_transaction_by_key(id)
        return et

    def delete(self, id):
        """
        Löscht eine bestimmte End-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der End-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        et = s_adm.get_end_event_transaction_by_key(id)
        s_adm.delete_end_event_transaction(et)
        return '', 200

    @timesystem.marshal_with(end_event_transaction)
    @timesystem.expect(end_event_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte End-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der End-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        et = EndereignisBuchung.from_dict(api.payload)

        if et is not None:
            et.set_id(id)
            et.set_target_user_account(et.get_target_user_account())
            et.set_event_id(et.get_event_id())
            s_adm.save_end_event_transaction(et)
            return '', 200
        else:
            return '', 500


@timesystem.route('/kommen/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Kommen-Objekts')
class KommenOperations(Resource):
    @timesystem.marshal_with(kommen)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Kommen-Ereignis aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Kommen-Ereignisses
        :return: Kommen-Ereignis in JSON-Form
        """
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_event_by_key(id)
        return k

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Kommen-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Kommen-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_event_by_key(id)
        kb = s_adm.get_kommen_transaction_by_event_key(id)
        s_adm.delete_kommen_transaction(kb)
        return '', 200

    @timesystem.marshal_with(kommen)
    @timesystem.expect(kommen, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes Kommen-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Kommen-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        k = Kommen.from_dict(api.payload)

        if k is not None:
            k.set_id(id)
            k.set_event_name(k.get_event_name())
            k.set_time_of_event(k.get_time_of_event())
            s_adm.save_kommen_event(k)
            return '', 200
        else:
            return '', 500


@timesystem.route('/kommen-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des KommenBuchungs-Objekt')
class KommenTransactionOperations(Resource):
    @timesystem.marshal_with(kommen_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Kommen-Ereignis-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Kommen-Ereignis-Buchung
        :return: Kommen-Ereignis-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_by_transaction_key(id)
        return k

    def delete(self, id):
        """
        Löscht eine bestimmte Kommen-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Kommen-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_transaction_by_key(id)
        s_adm.delete_kommen_transaction(k)
        return '', 200

    @timesystem.marshal_with(kommen_transaction)
    @timesystem.expect(kommen_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Kommen-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Kommen-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        k = KommenBuchung.from_dict(api.payload)

        if k is not None:
            k.set_id(id)
            k.set_target_user_account(k.get_target_user_account())
            k.set_event_id(k.get_event_id())
            s_adm.save_kommen_transaction(k)
            return '', 200
        else:
            return '', 500


@timesystem.route('/commit-kommen-transaction/<int:account_id>/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('account_id', 'Die ID des buchenden Account-Objekts')
class CommitKommenOperations(Resource):
    @timesystem.marshal_with(kommen)
    @timesystem.expect(kommen)
    @secured
    def post(self, account_id):
        """
        Über diese Methode kann für ein bestimmtes Zeitkonto
        eine Kommen-Ereignis-Buchung angelegt werden
        :param account_id: ID des Zeitkontos
        :return: Kommen-Ereignis in JSON Form
        """
        s_adm = SystemAdministration()
        proposal = Kommen.from_dict(api.payload)
        account = s_adm.get_time_account_by_key(account_id)

        if proposal is not None:
            if account is not None:
                b = s_adm.book_kommen_event(account_id, proposal.get_event_name(),
                                            proposal.get_time_of_event())
                if b:
                    event = s_adm.get_kommen_by_transaction_key(b)
                    return event, 200
                else:
                    event = Kommen()
                    event.set_id(0)
                    event.set_time_of_event(datetime.datetime.now())
                    event.set_last_modified_date(datetime.datetime.now())
                    return event, 200
            else:
                return 'Account not found', 500
        else:
            return '', 500


@timesystem.route('/gehen/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Gehen-Objekts')
class GehenOperations(Resource):
    @timesystem.marshal_with(gehen)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Gehen-Ereignis aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Gehen-Ereignisses
        :return: Gehen-Ereignis in JSON-Form
        """
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_event_by_key(id)
        return gh

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Gehen-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Gehen-Ereignisses
        :return: HTTP Response
        """

        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_event_by_key(id)
        ghb = s_adm.get_gehen_transaction_by_event_key(id)
        s_adm.delete_gehen_transaction(ghb)
        s_adm.delete_gehen_event(gh)
        return '', 200

    @timesystem.marshal_with(gehen)
    @timesystem.expect(gehen, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes Gehen-Ereignis aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Gehen-Ereignisses
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        gh = Gehen.from_dict(api.payload)

        if gh is not None:
            gh.set_id(id)
            gh.set_event_name(gh.get_event_name())
            gh.set_time_of_event(gh.get_time_of_event())
            s_adm.save_gehen_event(gh)
            return '', 200
        else:
            return '', 500


@timesystem.route('/gehen-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des GehenBuchungs-Objekt')
class GehenTransactionOperations(Resource):
    @timesystem.marshal_with(gehen_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Gehen-Ereignis-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Gehen-Ereignis-Buchung
        :return: Gehen-Ereignis-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_transaction_by_key(id)
        return gh

    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Gehen-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Gehen-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_transaction_by_key(id)
        s_adm.delete_gehen_transaction(gh)
        return '', 200

    @timesystem.marshal_with(gehen_transaction)
    @timesystem.expect(gehen_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Gehen-Ereignis-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Gehen-Ereignis-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        gh = GehenBuchung.from_dict(api.payload)

        if gh is not None:
            gh.set_id(id)
            gh.set_target_user_account(gh.get_target_user_account())
            gh.set_event_id(gh.get_event_id())
            s_adm.save_gehen_transaction(gh)
            return '', 200
        else:
            return '', 500


@timesystem.route('/commit-gehen-transaction/<int:account_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('account_id', 'Die ID des buchenden Account-Objekts')
class GehenOperations(Resource):
    @timesystem.marshal_with(gehen)
    @timesystem.expect(gehen)
    @secured
    def post(self, account_id):
        """
        Über diese Methode kann für ein bestimmtes Zeitkonto
        eine Gehen-Ereignis-Buchung angelegt werden
        :param account_id: ID des Zeitkontos
        :return: Gehen-Ereignis in JSON Form
        """
        s_adm = SystemAdministration()
        proposal = Gehen.from_dict(api.payload)
        account = s_adm.get_time_account_by_key(account_id)

        if proposal is not None:
            if account is not None:
                b = s_adm.book_gehen_event(account_id, proposal.get_event_name(),
                                           proposal.get_time_of_event())
                event = s_adm.get_gehen_by_transaction_key(b)
                return event, 200
            else:
                return 'Account not found', 500
        else:
            return '', 500


@timesystem.route('/pause/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des Pausen-Objekt')
class PauseOperations(Resource):
    @timesystem.marshal_with(pause)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Pausen-Intervall aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Pausen-Intervall
        :return: Pausen-Intervall in JSON-Form
        """
        s_adm = SystemAdministration()
        p = s_adm.get_pause_by_key(id)
        return p

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Pausen-Intervall aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Pausen-Intervall
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        p = s_adm.get_pause_by_key(id)
        s_adm.delete_pause(p)
        return '', 200

    @timesystem.marshal_with(pause)
    @timesystem.expect(pause, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes Pausen-Intervall aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Pausen-Intervall
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        p = Pause.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            p.set_name(p.get_name())
            p.set_start(p.get_start())
            p.set_end(p.get_end())
            p.set_duration(p.get_duration())
            s_adm.save_pause(p)
            return '', 200
        else:
            return '', 500


@timesystem.route('/pause-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des PauseBuchungs-Objekt')
class PauseTransactionOperations(Resource):
    @timesystem.marshal_with(pause_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Pausen-Intervall-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Pausen-Intervall-Buchung
        :return: Pausen-Intervall-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        pt = s_adm.get_pause_transaction_by_key(id)
        return pt

    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Pausen-Intervall-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Pausen-Intervall-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pt = s_adm.get_pause_transaction_by_key(id)
        s_adm.delete_pause_transaction(pt)
        return '', 200

    @timesystem.marshal_with(pause_transaction)
    @timesystem.expect(pause_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Pausen-Intervall-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Pausen-Intervall-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pt = PauseBuchung.from_dict(api.payload)

        if pt is not None:
            pt.set_id(id)
            pt.set_target_user_account(pt.get_target_user_account())
            pt.set_time_interval_id(pt.get_time_interval_id())
            s_adm.save_pause_transaction(pt)
            return '', 200
        else:
            return '', 500

@timesystem.route('/pause-transaction/values/<int:id>/<int:interval_id>/<string:interval_name>/<string:start_time>/<string:end_time>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Buchungs-Objekts')
@timesystem.param('interval_id', 'Die ID des gebuchten Intervalls')
@timesystem.param('interval_name', 'Der Name des gebuchten Intervalls')
@timesystem.param('start_time', 'Startzeitpunkt des Intervalls')
@timesystem.param('end_date', 'Endzeitpunkt des Intervalls')

class PauseTransactionValueOperations(Resource):
    @timesystem.marshal_with(pause_transaction_response_special)
    @secured
    def post(self, id, interval_id, interval_name, start_time, end_time):
        s_adm = SystemAdministration()
        transaction = s_adm.get_pause_transaction_by_key(id)
        if transaction:
            s_adm.save_pause_transaction_with_values(id, interval_id, interval_name, start_time, end_time)
            return '', 200
        else:
            return '', 500



@timesystem.route('/commit-pause-transaction/<int:account_id>/<string:name>/<string:start_time>/<string:end_time>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('account_id', 'Die ID des buchenden Account-Objekts')
@timesystem.param('name', 'Name der Pause')
@timesystem.param('start_time', 'Startzeitpunkt der Pause')
@timesystem.param('end_time', 'Endzeitpunkt der Pause')
class CommitPauseTransaction(Resource):
    @timesystem.marshal_with(interval_transaction_response)
    @secured
    def post(self, account_id, name, start_time, end_time):
        """
        Über diese Funktion kann man ein Pausen-Interval für ein
        bestimmtes Zeitkonto buchen. Diese Funktion wurde so
        geschrieben, dass man über den HTTP Request
        Die ID des Zeitkontos, den Namen des Intervalls und
        den Start- und Endzeitpunkt angibt. Durch diese Lösung
        wird der Umgang mit der referentiellen Integrität erleichtert.
        Die Logik der Intervalls-Buchung findet sich in dem Modul
        "SystemAdministration.py" unter der Funktion "book_pause_transaction".

        :param account_id: ID des Zeitkontos
        :param name: Name des Zeitintervalls als String
        :param start_time: Start-Zeitpunkt als Datetime
        :param end_time: End-Zeitpunkt als Datetime

        :return: Transaction-Response als JSON (Für Bedeutung der Response
        Codierung siehe "SystemAdministration.py" unter der Funktion "book_pause_transaction")
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(account_id)
        if account is not None:
            a = s_adm.book_pause_transaction(account, name, start_time, end_time)
            return a, 200
        else:
            return 'Account not found', 200


@timesystem.route('/worktime/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des ProjektArbeits-Objekt')
class WorktimeOperations(Resource):
    @timesystem.marshal_with(project_worktime)
    @secured
    def get(self, id):
        """
        Gibt ein bestimmtes Projekt-Arbeitszeit-Intervall aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekt-Arbeitszeit-Intervall
        :return: Projekt-Arbeitszeit-Intervall in JSON-Form
        """
        s_adm = SystemAdministration()
        wt = s_adm.get_project_worktime_by_key(id)
        return wt

    @secured
    def delete(self, id):
        """
        Löscht ein bestimmtes Projekt-Arbeitszeit-Intervall aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekt-Arbeitszeit-Intervall
        :return: HTTP Request
        """
        s_adm = SystemAdministration()
        wt = s_adm.get_project_worktime_by_key(id)
        s_adm.delete_project_worktime(wt)
        return '', 200

    @timesystem.marshal_with(project_worktime)
    @timesystem.expect(project_worktime, validate=True)
    @secured
    def put(self, id):
        """
        Speichert ein bestimmtes Projekt-Arbeitszeit-Intervall aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID des Projekt-Arbeitszeit-Intervall
        :return: HTTP Request
        """
        s_adm = SystemAdministration()
        wt = Projektarbeit.from_dict(api.payload)

        if wt is not None:
            wt.set_id(id)
            wt.set_name(wt.get_name())
            wt.set_start(wt.get_start())
            wt.set_end(wt.get_end())
            wt.set_duration(wt.get_duration())
            s_adm.save_project_worktime(wt)
            return '', 200
        else:
            return '', 500


@timesystem.route('/worktime-transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des ProjektArbeitBuchungs-Objekt')
class WorktimeTransactionOperations(Resource):
    @timesystem.marshal_with(project_worktime_transaction)
    @secured
    def get(self, id):
        """
        Gibt eine bestimmte Projekt-Arbeitszeit-Intervall-Buchung aus dem System aus.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Arbeitszeit-Intervall-Buchung
        :return: Projekt-Arbeitszeit-Intervall-Buchung in JSON-Form
        """
        s_adm = SystemAdministration()
        pt = s_adm.get_project_worktime_by_transaction_key(id)
        return pt

    @secured
    def delete(self, id):
        """
        Löscht eine bestimmte Projekt-Arbeitszeit-Intervall-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Arbeitszeit-Intervall-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pt = s_adm.get_project_work_transaction_by_key(id)
        s_adm.delete_project_work_transaction(pt)
        return '', 200

    @timesystem.marshal_with(project_worktime_transaction)
    @timesystem.expect(project_worktime_transaction, validate=True)
    @secured
    def put(self, id):
        """
        Speichert eine bestimmte Projekt-Arbeitszeit-Intervall-Buchung aus dem System.
        Das Objekt wird über die ID in der URI bestimmt.
        :param id: ID der Projekt-Arbeitszeit-Intervall-Buchung
        :return: HTTP Response
        """
        s_adm = SystemAdministration()
        pt = ProjektarbeitBuchung.from_dict(api.payload)

        if pt is not None:
            pt.set_id(id)
            pt.set_target_user_account(pt.get_target_user_account())
            pt.set_target_activity(pt.get_target_activity())
            pt.set_time_interval_id(pt.get_time_interval_id())
            s_adm.save_project_work_transaction(pt)
            return '', 200
        else:
            return '', 500


@timesystem.route('/worktime-transaction/values/<int:id>/<int:interval_id>/<string:interval_name>'
                  '/<string:start_time>/<string:end_time>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Buchungs-Objekts')
@timesystem.param('interval_id', 'Die ID des gebuchten Intervalls')
@timesystem.param('interval_name', 'Der Name des gebuchten Intervalls')
@timesystem.param('start_time', 'Startzeitpunkt des Intervalls')
@timesystem.param('end_date', 'Endzeitpunkt des Intervalls')
class WorktimeTransactionValueOperations(Resource):
    @timesystem.marshal_with(project_worktime_transaction_response_special)
    @secured
    def put(self, id, interval_id, interval_name, start_time, end_time):
        s_adm = SystemAdministration()
        transaction = s_adm.get_project_work_transaction_by_key(id)
        if transaction:
            s_adm.save_worktime_transaction_with_values(id, interval_id, interval_name, start_time, end_time)
            return '', 200
        else:
            return '', 500


@timesystem.route(
    '/commit-worktime-transaction/<int:account_id>/<string:name>/<int:activity_id>/<string:start_time>/<string:end_time>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('account_id', 'Die ID des buchenden Account-Objekts')
@timesystem.param('name', 'Name der Pause')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
@timesystem.param('start_time', 'Startzeitpunkt der Pause')
@timesystem.param('end_time', 'Endzeitpunkt der Pause')
class CommitWorktimeTransaction(Resource):
    @timesystem.marshal_with(interval_transaction_response, code=200)
    @secured
    def post(self, account_id, name, activity_id, start_time, end_time):
        """
        Über diese Funktion kann man ein Projekt-Arbeitszeit-Interval für ein
        bestimmtes Zeitkonto und eine bestimmte Aktivität buchen. Diese Funktion wurde so
        geschrieben, dass man über den HTTP Request Die ID des Zeitkontos, den Namen des Intervalls,
        die ID der Aktivität und den Start- und Endzeitpunkt angibt. Durch diese Lösung
        wird der Umgang mit der referentiellen Integrität erleichtert.
        Die Logik der Intervalls-Buchung findet sich in dem Modul
        "SystemAdministration.py" unter der Funktion "book_project_work_transaction".

        :param account_id: ID des Zeitkontos
        :param name: Name des Zeitintervalls als String
        :param activity_id: ID der Aktivität
        :param start_time: Start-Zeitpunkt als Datetime
        :param end_time: End-Zeitpunkt als Datetime

        :return: Transaction-Response als JSON (Für Bedeutung der Response
        Codierung siehe "SystemAdministration.py" unter der Funktion "book_project_work_transaction")
        """
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(account_id)
        activity = s_adm.get_activity_by_key(activity_id)
        if account is not None:
            if activity is not None:
                a = s_adm.book_project_work_transaction(account, name, activity_id, start_time, end_time)
                return a, 200
            else:
                return 'Activity not found', 200
        else:
            return 'Account not found', 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
