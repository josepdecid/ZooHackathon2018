from pymongo import MongoClient

client = MongoClient()
db = client['ZooHack2018']


def insert_ads(ads):
    ads = db.ads
    ads.insert_many([])