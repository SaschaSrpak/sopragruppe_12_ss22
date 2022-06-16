from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources=r'/timesystem/*')

api = Api(app, version='1.0', title='Test API',
          description='Test des Marshalings')

test = api.namespace('test', description='Funktionen der Test API')


class Animal:
    def __init__(self, id, name, spezies):
        self.id = id
        self.name = name
        self.spezies = spezies

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

cat = Animal(1, 'felix', 'katze')

test_fields = api.model('Animal', {
    'id': fields.Integer(attribute="id"),
    'name': fields.String(attribute="name"),
    'spezies': fields.String(attribute="spezies")
})


@test.route('/')
class AnimalListOperations(Resource):
    @test.marshal_with(test_fields)
    def get(self):
        return jsonify(cat.get_id(),cat.get_name())


