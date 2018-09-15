import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess
from ad_scrapper_wallapop_s import crawlSingle
from datetime import time


class AdCrawler(scrapy.Spider):
    name = 'milanuncios'
    #base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    base_url = 'https://es.wallapop.com/search?kws='
    search_keywords = ['rinoceronte', 'marfil', 'cuerno']
    results = []

    def start_requests(self):
        urls = [self.base_url + keyword +'&verticalId=' for keyword in self.search_keywords]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        extraction = Selector(response=response, type='html')\
            .xpath('//a[re:test(@class, "product-info-title")]').extract()
        for el in extraction:
            #print(el)
            print("----")
            chars = el.split('\"')
            print(chars[1])
            self.results.push(chars[1]);
            time.sleep(5)
            #IndCrawler.extra_url=chars[1]
            #process2 = CrawlerProcess()
            #process2.crawl(IndCrawler)
            #process2.start()




process = CrawlerProcess()
process.crawl(AdCrawler)
process.start()

crawlSingle(chars[1])
