from pymongo import MongoClient
from .utils import Singleton

db_name = 'ZooHack2018'


class DBConnection(metaclass=Singleton):

    def __init__(self):
        client = MongoClient()
        self.db = client[db_name]

    def insert_posts(self, posts):
        self.db.ads.insert_many(posts)


