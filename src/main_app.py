from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS

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

app = Flask(__name__)

CORS(app, resources=r'/zeiterfassung/*')

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
    'last_modified_date': fields.DateTime(attribute='_manager_status', description='Zeitpunkt der letzten Änder', dt_format='rfc822'),
    'name': fields.String(attribute='_name', description='Vorname der Person'),
    'surname': fields.String(attribute='_surname', description='Nachname der Person'),
    'mail_address': fields.String(attribute='_mail_address', description='Mail-Adresse der Person'),
    'user_name': fields.String(attribute='_user_name', description="User-Name der Person"),
    'google_user_id': fields.String(attribute='_firebase_id', description='Google_ID der Person'),
    'manager_status': fields.String(attribute="_last_modified_date",
                                        description='Information, ob die Person ein '
                                                                               'Projektleiter ist'),

})

account = api.inherit('Account', {
    'id': fields.Integer(attribute='_id', description='Die ID eines Business Object'),
    'owner': fields.Integer(attribute='_owner', description='ID der zugehörigen Person')
})

project = api.inherit('Projekt', bo,{
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

pause = api.inherit('Pause', zi)

project_duration = api.inherit('Projektlaufzeit', zi)

project_worktime = api.inherit('Projektarbeit', zi)

ev = api.inherit('Ereignis', bo, {
    'event_name': fields.String(attribute='_event_name', description='Name des Ereignisses'),
    'time_of_event': fields.DateTime(attribute='_time_of_event', description='Zeitpunkt des Ereignisses')
})

kommen = api.inherit('Kommen', ev)

gehen = api.inherit('Gehen', ev)

project_deadline = api.inherit('ProjektDeadline', ev)

start_event = api.inherit('Startereignis', ev)

end_event = api.inherit('Endereignis', ev)

transaction = api.inherit('Buchung', bo, {
    'target_user_account': fields.Integer(attribute='_target_user_account', description='ID des Zielkontos'),
})

event_transaction = api.inherit('Ereignisbuchung', transaction, {
    'event_id': fields.Integer(attribute='_event_id', discription='ID des gebuchten Ereignisses')
})

interval_transaction = api.inherit('ZeitintervallBuchung', transaction, {
    'time_interval_id': fields.Integer(attribute='_time_interval_id', discription='ID des gebuchten Intervals')
})

pause_transaction = api.inherit('PauseBuchung', interval_transaction)

project_worktime_transaction = api.inherit('ProjektarbeitBuchung', interval_transaction, {
    'target_activity': fields.Integer(attribute='_target_activity', description='ID der Aktivität, '
                                                                                'an welcher gearbeitet wurde')
})

kommen_transaction = api.inherit('KommenBuchung', event_transaction)

gehen_transaction = api.inherit('GehenBuchung', event_transaction)

start_event_transaction = api.inherit('StartereignisBuchung', event_transaction)

end_event_transaction = api.inherit('EndereignisBuchung', event_transaction)


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

    def post(self):
        s_adm = SystemAdministration()

        proposal = Person.from_dict(api.payload)
        print(proposal.get_name)

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
    def get(self, id):
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        return p


    def delete(self, id):
        s_adm = SystemAdministration()
        p = s_adm.get_person_by_key(id)
        s_adm.delete_person(p)
        return '', 200

    @timesystem.marshal_with(person)
    @timesystem.expect(person, validate=True)

    def put(self, id):
        s_adm = SystemAdministration()
        p = Person.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            s_adm.save_person(p)
            return '', 200
        else:
            return '', 500


@timesystem.route('/persons/<int:id>/activity')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Personen-Objekts')
class PersonRelatedActivityOperations(Resource):
    @timesystem.marshal_with(activity)

    def get(self, id):
        s_adm = SystemAdministration()
        person = s_adm.get_person_by_key(id)

        if person is not None:
            activity_list = s_adm.get_activity_by_person_key(person.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/projects')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllProjectListOperations(Resource):
    @timesystem.marshal_list_with(project)

    def get(self):
        s_adm = SystemAdministration()
        all_projects = s_adm.get_all_projects()
        print(all_projects)
        return all_projects

    @timesystem.marshal_with(project, code=200)
    @timesystem.expect(project)

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
    def get(self, id):
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        return pr

    def delete(self, id):
        s_adm = SystemAdministration()
        pr = s_adm.get_project_by_key(id)
        s_adm.delete_person(pr)
        return '', 200

    @timesystem.marshal_with(project)
    @timesystem.expect(project, validate=True)

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

    def get(self, id):
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)

        if project is not None:
            person_list = s_adm.get_persons_by_project_key(project.get_id())
            return person_list

        else:
            return 'Person not found', 500


@timesystem.route('/projects/<int:id>/activity')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedActivityOperations(Resource):
    @timesystem.marshal_with(activity)

    def get(self, id):
        s_adm = SystemAdministration()
        project = s_adm.get_project_by_key(id)

        if project is not None:
            activity_list = s_adm.get_activity_by_project_key(project.get_id())
            return activity_list

        else:
            return 'Person not found', 500


@timesystem.route('/activities')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllActivityListOperations(Resource):
    @timesystem.marshal_list_with(activity)

    def get(self):
        s_adm = SystemAdministration()
        all_activities = s_adm.get_all_activities()
        print(all_activities)
        return all_activities

    @timesystem.marshal_with(activity, code=200)
    @timesystem.expect(activity)

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

    def delete(self, id, person_id):
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.delete_person_responsible_from_activity(activity, person)
        return '', 200


    def post(self, id, person_id):
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.add_person_responsible_to_activity(activity, person)
        return '', 200


@timesystem.route('/activities/<int:person_id>/kommen')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class ActivityRelatedPersonOperations(Resource):
    @timesystem.marshal_with(person)
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
    def get(self):
        s_adm = SystemAdministration()
        all_accounts = s_adm.get_all_time_accounts()
        return all_accounts


@timesystem.route('/accounts/<int:id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
class AccountOperations(Resource):
    @timesystem.marshal_with(account)
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
    def put(self, id):
        s_adm = SystemAdministration()
        ac = Zeitkonto.from_dict(api.payload)

        if ac is not None:
            ac.set_id(id)
            s_adm.save_activity(ac)
            return '', 200
        else:
            return '', 500


@timesystem.route('/account-worktime/<int:id>/activities/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
class ActivityWorktimeRelatedAccountOperations(Resource):
    def get(self, id, activity_id):
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)

        if activity is not None and account is not None:
            worktime_on_activity = s_adm.get_worktime_on_activity(account, activity)
            return worktime_on_activity
        else:
            return 'Activity not found', 500


@timesystem.route('/account-transactions/<int:id>/activities/<int:activity_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Account-Objekts')
@timesystem.param('activity_id', 'Die ID des Aktivitäts-Objekts')
class ActivityWorktimeTransactionsRelatedAccountOperations(Resource):
    @timesystem.marshal_with(project_worktime_transaction)
    def get(self, id, activity_id):
        s_adm = SystemAdministration()
        account = s_adm.get_time_account_by_key(id)
        activity = s_adm.get_activity_by_key(activity_id)

        if activity is not None and account is not None:
            transactions = s_adm.get_worktime_transactions_on_activity(account, activity)
            return transactions
        else:
            return 'Activity not found', 500


@timesystem.route('/kommen/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KommenOperations(Resource):
    @timesystem.marshal_with(kommen)
    def post(self):
        s_adm = SystemAdministration()
        proposal = Kommen.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.book_kommen_event(proposal.get_id(), proposal.get_event_name(),
                                        proposal.get_time_of_event())
            return a, 200
        else:
            return '', 500


@timesystem.route('/gehen/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GehenOperations(Resource):
    @timesystem.marshal_with(gehen)
    def post(self):
        s_adm = SystemAdministration()
        proposal = Gehen.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.book_gehen_event(proposal.get_id(), proposal.get_event_name(),
                                       proposal.get_time_of_event())
            return a, 200
        else:
            return '', 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)
