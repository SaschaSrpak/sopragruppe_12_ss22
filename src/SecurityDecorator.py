from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from server.SystemAdministration import SystemAdministration


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        id_token = request.cookies.get("token")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)

                if claims is not None:
                    s_adm = SystemAdministration()
                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    user_name = claims.get("name")

                    user = s_adm.get_person_by_firebase_id(google_user_id)

                    if user is not None:
                        user.set_user_name(user_name)
                        user.set_mail_address(email)
                        s_adm.save_person(user)

                    else:
                        user = s_adm.create_person("Vorname", "Nachname", email, user_name, google_user_id, 0)

                    objects = function(*args, **kwargs)
                    return objects

                else:
                    return '', 401  # UNAUTHORIZED!

            except ValueError as exception:
                error_message = str(exception)
                return exception, 401  # UNAUTHORIZED!

        return '', 401  # UNAUTHORIZED!

    return wrapper
