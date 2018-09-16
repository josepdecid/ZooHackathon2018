import copy

from bson import ObjectId
from pymongo import MongoClient
from utils import Singleton

db_name = 'ZooHack2018'
db_url = 'mongodb+srv://HuntedHunter:HuntedHunter@cluster0-jnjqf.mongodb.net/test?retryWrites=true'


class DBConnection(metaclass=Singleton):

    def __init__(self):
        client = MongoClient(db_url)
        self.db = client[db_name]

    def insert_posts(self, posts):
        print(posts)
        post_id = self.db.posts.insert_many(posts)
        posts_id = post_id.inserted_ids
        users = self.db["users"]
        for x, y in zip(posts, posts_id):
            user_find = users.find({"_id": x['user']['_id']})
            if user_find.count() == 0:
                x['user']['posts'] = [y]
                self.db.users.insert(x['user'])
            else:
                user_find[0]['posts'].append(y)
                gigi = copy.deepcopy(user_find[0]['posts'])
                gigi.append(y)
                self.db.users.update_one({"_id": user_find[0]['_id']}, {"$set": {"posts": gigi}})

    def insert_tag(self, tag):
        self.db.tags.insert_one(tag)

    def delete_post(self, post_id):
        self.db.posts.delete_one({"_id": ObjectId(post_id)})

    def get_posts(self, filters):
        filters = {} if len(filters) == 0 else {'tags': {'$in': filters}}
        return self.db.posts.find(filters)

    def get_users(self):
        return self.db.users.find()

    def get_user_posts(self, id):
        self.db.users.find({'_id': id})

    def get_images(self):
        return self.db.ads.find({}, {'images': 1}).limit(16)
