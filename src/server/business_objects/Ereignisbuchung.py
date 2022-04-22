from server.business_objects import Buchung
from server.business_objects import Ereignis


class Ereignisbuchung(Buchung):

    def __init__(self):
        super().__init__()
        self.__source_event: Ereignis

    def get_source_time_interval(self):
        return self.__source_event

    def set_source_time_interval(self, new_source):
        self.__source_event = new_source

