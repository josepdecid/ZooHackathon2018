import atexit

from crawler_todocolecciones import AdCrawler as CrawlerTodoColecciones
from apscheduler.schedulers.background import BackgroundScheduler
from scrapy.crawler import CrawlerProcess


def start_crawler():
    process = CrawlerProcess()
    process.crawl(CrawlerTodoColecciones)
    process.start()

    scheduler = BackgroundScheduler()
    scheduler.add_job(func=process.start, trigger='interval', seconds=500)
    scheduler.start()

    atexit.register(lambda: scheduler.shutdown())