from pymongo import MongoClient
from .utils import Singleton

db_name = 'ZooHack2018'


class DBConnection(metaclass=Singleton):

    def __init__(self):
        client = MongoClient()
        self.db = client[db_name]

    def insert_posts(self, posts):
        self.db.posts.insert_many(posts)

        users = self.db["users"]
        for x in posts:
            user_find = users.find({"_id": x.user.id})
            if user_find.count == 0:
                x.user.posts = [x.id]
                self.db.users.insert(x.user)
            else:
                x.user.posts.append(x.id)
                self.db.users.update_one({"posts" : x.user.posts})






