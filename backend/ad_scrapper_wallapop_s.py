import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess
import os
import time
extra_url = ''

class AdCrawler(scrapy.Spider):
    name = 'milanuncios'
    #base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    base_url = 'https://es.wallapop.com'
    extra_url = '/item/cuerno-de-alce-248144556'

    def start_requests(self):
        url = self.base_url + self.extra_url
        print("#####################################")
        yield scrapy.Request(url=url.rstrip(), callback=self.parse)
    def parse(self, response):
        extraction = Selector(response=response, type='html')\
            .xpath('//div[re:test(@class, "card-user-detail-top")]').extract()
        for el in extraction:
            #print(el)
            print("---------------------------------------------------")
            chars = el.split('href=\"')
            iduser = chars[1].split('\"')
            print(iduser)

def ffff(url):
    process = CrawlerProcess()
    AdCrawler.extra_url=url
    process.crawl(AdCrawler)
    process.start()



def crawlSingle():
    with open('wallapop-paths.txt') as ff:
        content = ff.readlines()
        for url in content:
            time.sleep(20)
            newpid = os.fork()
            if newpid == 0:
                ffff(url)
                break;



