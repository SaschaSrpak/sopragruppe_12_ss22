from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS

from server.SystemAdministration import SystemAdministration
from server.business_objects.Person import Person
from server.business_objects.Aktivität import Aktivitaet
from server.business_objects.Ereignisse.Kommen import Kommen
from server.business_objects.Ereignisse.Gehen import Gehen

from SecurityDecorator import secured

app = Flask(__name__)

CORS(app, resources=r'/zeiterfassung/')

api = Api(app, version='0.1', title='Zeiterfassung API',
          description='API für das Projektzeiterfassungssystem')

timesystem = api.namespaces('timesystem', description = 'Funktionen des Projektzeiterfassungssystem')


bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='__id', description='Die ID eines Business Object'),
    'last_modified_date': fields.DateTime(attribute = "__last_modified_date", description="Zeitpunkt der letzten Änderung")
})

person = api.model('Person', bo, {
    'name': fields.String(attribute='__name', description='Vorname der Person'),
    'surname': fields.String(attribute='__surname', description='Nachname der Person'),
    'mail_address': fields.String(attribute='__mail_address', description='Mail-Adresse der Person'),
    'user_name': fields.String(attribute='__user_name', description="User-Name der Person"),
    'google_user_id': fields.String(attribute='__firebase_id', description='Google_ID der Person'),
    'manager_status': fields.Integer(attribute='__manager_status', description='Information, ob die Person ein '
                                                                               'Projektleiter ist'),
})

account = api.model('Account', bo, {
    'owner': fields.Integer(attribute='_owner', description = 'ID der zugehörigen Person')
})

project = api.model('Projekt', bo, {
    'name': fields.String(attribute='_name', description='Name des Projekts'),
    'creator': fields.Integer(attribute='_creator', description='ID des Projekterstellers'),
    'client': fields.String(attribute='_creator', description='Name des Auftraggebers'),
    'description': fields.String(attribute='_description', description='Beschreibung des Projekts'),
    'set_deadline': fields.Integer(attribute='_set_deadline', description='ID der Projektdeadline'),
    'project_duration': fields.Integer(attribute='_project_duration', description='ID der Projektlaufzeit'),
})

activity = api.model('Aktivitaet', bo, {
    'activity_name': fields.String(attribute='__activity_name', description='Name der Aktivität'),
    'man_day_capacity': fields.Float(attribute='__man_day_capacity', description='Kapazität in Personentagen')
})

zi = api.model('Zeitintervall', bo, {
    'name': fields.String(attribute='_name', description='Name des Intervalls'),
    'start': fields.Integer(attribute='_start', description='ID des Startereignisses'),
    'end': fields.Integer(attribute='_end', description='ID des Endereignisses'),
    'duration': fields.Float(attribute='_duration', description='Dauer des Intervals')
})

pause = api.model('Pause', zi)

project_duration = api.model('Projektlaufzeit', zi)

project_worktime = api.model('Projektarbeit', zi)

ev = api.model('Ereignis', bo, {
    'event_name': fields.String(attribute='_event_name', description='Name des Ereignisses'),
    'time_of_event': fields.DateTime(attribute='_time_of_event', description='Zeitpunkt des Ereignisses')
})

kommen = api.model('Kommen', ev)

gehen = api.model('Gehen', ev)

project_deadline = api.model('ProjektDeadline', ev)

start_event = api.model('Startereignis', ev)

end_event = api.model('Endereignis', ev)

transaction = api.model('Buchung', bo, {
    'target_user_account': fields.Integer(attribute='__target_user_account', description='ID des Zielkontos'),
})

event_transaction = api.model('Ereignisbuchung', transaction, {
    'event_id': fields.Integer(attribute='_event_id', discription='ID des gebuchten Ereignisses')
})

interval_transaction = api.model('ZeitintervallBuchung', transaction, {
    'time_interval_id': fields.Integer(attribute='_time_interval_id', discription='ID des gebuchten Intervals')
})

pause_transaction = api.model('PauseBuchung', interval_transaction)

project_worktime_transaction = api.model('ProjektarbeitBuchung', interval_transaction, {
    'target_activity': fields.Integer(attribute='_target_activity', description='ID der Aktivität, '
                                                                                'an welcher gearbeitet wurde')
})

kommen_transaction = api.model('KommenBuchung', event_transaction)

gehen_transaction = api.model('GehenBuchung', event_transaction)

start_event_transaction = api.model('StartereignisBuchung', event_transaction)

end_event_transaction = api.model('EndereignisBuchung', event_transaction)



@timesystem.route('/persons')
@timesystem.responnse(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllPersonListOperations(Resource):
    @timesystem.marshal_list_with(person)
    @secured
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
                                    person.get_firebase_id(), person.get_manager_status())
            return p, 200
        else:
            return '', 500


@timesystem.route('/persons/<int:id>')
@timesystem.responnse(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Personen Objekts')
class PersonOperations(Resource):
    @timesystem.marshal_with(person)
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


@timesystem.route('persons/≤int:id>/activity')
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


@timesystem.route('/activities')
@timesystem.responnse(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllActivityListOperations(Resource):
    @timesystem.marshal_list_with(activity)
    @secured
    def get(self):
        s_adm = SystemAdministration()
        all_activities = s_adm.get_all_activities()
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

@timesystem.route('activities/<int:id>/person')
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

@timesystem.route('/activities/<int:id>')
@timesystem.responnse(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class PersonOperations(Resource):
    @timesystem.marshal_with(activity)
    def get(self, id):
        s_adm = SystemAdministration()
        a = s_adm.get_activity_by_key(id)
        return a

    @secured
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

@timesystem.route('activities/<int:id>/person/<int:person_id>')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
@timesystem.param('person_id', 'Die ID des Personen-Objekts')
class ActivityRelatedSpecificPersonOperations:
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

@timesystem.route('activities/<int:person_id>/kommen')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timesystem.param('id', 'Die ID des Aktivitäts-Objekts')
class ActivityRelatedPersonOperations(Resource):
    @timesystem.marshal_with(person)
    @secured
    def post(self, id, person_id):
        s_adm = SystemAdministration()
        activity = s_adm.get_activity_by_key(id)
        person = s_adm.get_person_by_key(person_id)
        s_adm.add_person_responsible_to_activity(activity, person)
        return '', 200

@timesystem.route('kommen/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KommenOperations(Resource):
    @timesystem.marshal_with(kommen)
    @secured
    def post(self):
        s_adm = SystemAdministration()
        proposal = Kommen.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.book_kommen_event(proposal.get_id(), proposal.get_event_name(),
                                      proposal.get_time_of_event())
            return a, 200
        else:
            return '', 500


@timesystem.route('gehen/')
@timesystem.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GehenOperations(Resource):
    @timesystem.marshal_with(gehen)
    @secured
    def post(self):
        s_adm = SystemAdministration()
        proposal = Gehen.from_dict(api.payload)

        if proposal is not None:
            a = s_adm.book_gehen_event(proposal.get_id(), proposal.get_event_name(),
                                      proposal.get_time_of_event())
            return a, 200
        else:
            return '', 500
