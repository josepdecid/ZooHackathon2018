import atexit
import requests

from apscheduler.schedulers.background import BackgroundScheduler
from scrapy.crawler import CrawlerProcess

from ad_crawler import AdCrawler


def start_crawler():
    process = CrawlerProcess()
    process.crawl(AdCrawler)
    process.start()

    scheduler = BackgroundScheduler()
    scheduler.add_job(func=process.start, trigger='interval', seconds=500)
    scheduler.start()

    atexit.register(lambda: scheduler.shutdown())