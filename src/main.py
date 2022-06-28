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

app = Flask(__name__, static_folder="./build", static_url_path='/')

CORS(app, resources=r'/zeiterfassung/*')

"""app.config['ERROR_404_HELP'] = False

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith('/zeiterfaassung'):
        return "Fehler", 404
    else:
        return redirect(url_for('index'))"""

api = Api(app, version='1.0', title='Zeiterfassung API',
          description='API für das Projektzeiterfassungssystem')

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
    'man_day_capacity': fields.Float(attribute='_man_day_capacity', description='Kapazität in Personentagen')
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


@timesystem.route('/persons')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllPersonListOperations(Resource):

    @timesystem.marshal_list_with(person)
    def get(self):
        s_adm = SystemAdministration()
        all_persons = s_adm.get_all_persons()
        return all_persons

    @timesystem.marshal_with(person, code=200)
    @timesystem.expect(person)
    @secured
    def post(self):
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
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        return p

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        s_adm.delete_person(p)
        return '', 200

    @timesystem.marshal_with(person)
    @timesystem.expect(person, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        person = s_adm.get_person_by_key(id)

        if person is not None:
            activity_list = s_adm.get_activity_by_person_key(person.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/project_deadline')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectDeadlineGetOperation(Resource):
    @timesystem.marshal_with(project_deadline, code=200)
    @timesystem.expect(project_deadline)
    @secured
    def post(self):
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
        s_adm = SystemAdministration()
        pd = s_adm.get_project_deadline_by_key(id)
        return pd

    def delete(self, id):
        s_adm = SystemAdministration()
        pd = s_adm.get_project_deadline_by_key(id)
        s_adm.delete_project_deadline(pd)
        return '', 200

    @timesystem.marshal_with(project_deadline)
    @timesystem.expect(project_deadline, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        pd = s_adm.get_project_duration_by_key(id)
        return pd

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        pd = s_adm.get_project_duration_by_key(id)
        s_adm.delete_project_duration(pd)
        return '', 200

    @timesystem.marshal_with(project_duration)
    @timesystem.expect(project_duration, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        all_projects = s_adm.get_all_projects()
        return all_projects

    @timesystem.marshal_with(project, code=200)
    @timesystem.expect(project)
    @secured
    def post(self):
        s_adm = SystemAdministration()

        proposal = Projekt.from_dict(api.payload)

        if proposal is not None:
            pr = s_adm.create_project(proposal.get_name(), proposal.get_creator(),
                                      proposal.get_client(), proposal.get_description(),
                                      proposal.get_deadline(), proposal.get_project_duration(),
                                      proposal.get_activities(), proposal.get_person_responsible())
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
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        return pr

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        s_adm.delete_person(pr)
        return '', 200

    @timesystem.marshal_with(project)
    @timesystem.expect(project, validate=True)
    @secured
    def put(self, id):
        s_adm = SystemAdministration()
        pr = Projekt.from_dict(api.payload)

        if pr is not None:
            pr.set_id(id)
            s_adm.save_project(pr)
            return '', 200
        else:
            return '', 500


@timesystem.route('/projects/<int:id>/persons')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt')
@timesystem.param('id', 'ID des Projekt Objekts')
class PersonRelatedProjectOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
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
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.delete_person_responsible_from_project(project, person)
        return '', 200

    @secured
    def post(self, id, person_id):
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
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)

        if project is not None:
            activity_list = s_adm.get_activity_by_project_key(project.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/projects/<int:id>/activity/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Project-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivität-Objekts')
class ProjectRelatedSpecificActivityOperations(Resource):
    @secured
    def delete(self, id, activity_id):
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)
        s_adm.delete_activity_from_project(project, activity)
        return '', 200

    @secured
    def post(self, id, activity_id):
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)
        s_adm.add_person_responsible_to_project(project, activity)
        return '', 200


@timesystem.route('/activities')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllActivityListOperations(Resource):
    @timesystem.marshal_list_with(activity)
    @secured
    def get(self):
        s_adm = SystemAdministration()
        all_activities = s_adm.get_all_activities()
        print(all_activities)
        return all_activities

    @timesystem.marshal_with(activity, code=200)
    @timesystem.expect(activity)
    @secured
    def post(self):
        s_adm = SystemAdministration()

        proposal = Aktivitaet.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.create_activity(proposal.get_name(), proposal.get_persons_responsible(),
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
        s_adm = SystemAdministration()
        a = s_adm.get_activity_by_key(id)
        return a

    def delete(self, id):
        s_adm = SystemAdministration()
        a = s_adm.get_activity_by_key(id)
        s_adm.delete_activity(a)
        return '', 200

    @timesystem.marshal_with(activity)
    @timesystem.expect(activity, validate=True)
    @secured
    def put(self, id):
        s_adm = SystemAdministration()
        a = Aktivitaet.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            s_adm.save_activity(a)
            return '', 200
        else:
            return '', 500


@timesystem.route('/activities/<int:id>/person')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class ActivityRelatedPersonOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def get(self, id):
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
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.delete_person_responsible_from_activity(activity, person)
        return '', 200

    @secured
    def post(self, id, person_id):
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
        s_adm = SystemAdministration()
        ac = s_adm.get_time_account_by_key(id)
        return ac

    def delete(self, id):
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
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_person_key(id)

        if account is not None:
            return account
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/kommen/transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class KommenTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(kommen_transaction)
    @secured
    def get(self, id):
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        transactions = s_adm.get_all_kommen_transactions_for_account(account)

        if account is not None:
            return transactions
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/gehen/transaction/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class KommenTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(gehen_transaction)
    @secured
    def get(self, id):
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        transactions = s_adm.get_all_gehen_transactions_for_account(account)

        if account is not None:
            return transactions
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/pause/<int:id>/time')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class PauseTimeRelatedAccountOperations(Resource):
    @secured
    def get(self, id):
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
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        pauses = s_adm.get_all_pause_transactions_for_account(account)

        if account is not None:
            return pauses
        else:
            return 'Account not found', 500


@timesystem.route('/accounts/worktime-transactions/<int:id>/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class WorktimeTransactionRelatedAccountOperations(Resource):
    @timesystem.marshal_list_with(project_worktime_transaction)
    @secured
    def get(self, id):
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
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)

        if activity is not None and account is not None:
            worktime_on_activity = s_adm.get_worktime_on_activity(account, activity)
            return worktime_on_activity
        else:
            return 'Activity not found', 500


@timesystem.route('/accounts/transactions/<int:id>/activities/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
class ActivityWorktimeTransactionsRelatedAccountOperations(Resource):
    @timesystem.marshal_with(project_worktime_transaction)
    @secured
    def get(self, id, activity_id):
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
        s_adm = SystemAdministration()
        se = s_adm.get_start_event_by_key(id)
        return se

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        se = s_adm.get_start_event_by_key(id)
        s_adm.delete_start_event(se)
        return '', 200

    @timesystem.marshal_with(start_event)
    @timesystem.expect(start_event, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        st = s_adm.get_start_event_transaction_by_key(id)
        return st

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        st = s_adm.get_start_event_transaction_by_key(id)
        s_adm.delete_start_event_transaction(st)
        return '', 200

    @timesystem.marshal_with(start_event_transaction)
    @timesystem.expect(start_event_transaction, validate=True)
    @secured
    def put(self, id):
        s_adm = SystemAdministration()
        st = StartereignisBuchung.from_dict(api.payload)

        if st is not None:
            st.set_id(id)
            st.set_target_user_account(st.get_target_user_account())
            st.set_event_id(st.get_event_id())
            s_adm.save_start_event_transaction(st)
            return '', 200
        else:
            return '', 500


@timesystem.route('/end-event/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'ID des EndEreignis-Objekts')
class EndEventOperations(Resource):
    @timesystem.marshal_with(end_event)
    @secured
    def get(self, id):
        s_adm = SystemAdministration()
        e = s_adm.get_end_event_by_key(id)
        return e

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        e = s_adm.get_end_event_by_key(id)
        s_adm.delete_end_event(e)
        return '', 200

    @timesystem.marshal_with(end_event)
    @timesystem.expect(end_event, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        et = s_adm.get_end_event_transaction_by_key(id)
        return et

    def delete(self, id):
        s_adm = SystemAdministration()
        et = s_adm.get_end_event_transaction_by_key(id)
        s_adm.delete_end_event_transaction(et)
        return '', 200

    @timesystem.marshal_with(end_event_transaction)
    @timesystem.expect(end_event_transaction, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_event_by_key(id)
        return k

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_event_by_key(id)
        s_adm.delete_kommen_event(k)
        return '', 200

    @timesystem.marshal_with(kommen)
    @timesystem.expect(kommen, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_by_transaction_key(id)
        return k

    def delete(self, id):
        s_adm = SystemAdministration()
        k = s_adm.get_kommen_transaction_by_key(id)
        s_adm.delete_kommen_transaction(k)
        return '', 200

    @timesystem.marshal_with(kommen_transaction)
    @timesystem.expect(kommen_transaction, validate=True)
    @secured
    def put(self, id):
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
class KommenOperations(Resource):
    @timesystem.marshal_with(kommen)
    @timesystem.expect(kommen)
    @secured
    def post(self, account_id):
        s_adm = SystemAdministration()
        proposal = Kommen.from_dict(api.payload)
        account = s_adm.get_time_account_by_key(account_id)

        if proposal is not None:
            if account is not None:
                b = s_adm.book_kommen_event(account_id, proposal.get_event_name(),
                                            proposal.get_time_of_event())
                event = s_adm.get_kommen_by_transaction_key(b)
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
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_event_by_key(id)
        return gh

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_event_by_key(id)
        s_adm.delete_gehen_event(gh)
        return '', 200

    @timesystem.marshal_with(gehen)
    @timesystem.expect(gehen, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_transaction_by_key(id)
        return gh

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        gh = s_adm.get_gehen_transaction_by_key(id)
        s_adm.delete_gehen_transaction(gh)
        return '', 200

    @timesystem.marshal_with(gehen_transaction)
    @timesystem.expect(gehen_transaction, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        p = s_adm.get_pause_by_key(id)
        return p

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        p = s_adm.get_pause_by_key(id)
        s_adm.delete_pause(p)
        return '', 200

    @timesystem.marshal_with(pause)
    @timesystem.expect(pause, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        pt = s_adm.get_pause_transaction_by_key(id)
        return pt

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        pt = s_adm.get_pause_transaction_by_key(id)
        s_adm.delete_pause_transaction(pt)
        return '', 200

    @timesystem.marshal_with(pause_transaction)
    @timesystem.expect(pause_transaction, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        wt = s_adm.get_project_worktime_by_key(id)
        return wt

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        wt = s_adm.get_project_worktime_by_key(id)
        s_adm.delete_project_worktime(wt)
        return '', 200

    @timesystem.marshal_with(project_worktime)
    @timesystem.expect(project_worktime, validate=True)
    @secured
    def put(self, id):
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
        s_adm = SystemAdministration()
        pt = s_adm.get_project_worktime_by_transaction_key(id)
        return pt

    @secured
    def delete(self, id):
        s_adm = SystemAdministration()
        pt = s_adm.get_project_work_transaction_by_key(id)
        s_adm.delete_project_work_transaction(pt)
        return '', 200

    @timesystem.marshal_with(project_worktime_transaction)
    @timesystem.expect(project_worktime_transaction, validate=True)
    @secured
    def put(self, id):
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
