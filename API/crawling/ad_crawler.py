import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess
import time
from scrapy.xlib.pydispatch import dispatcher
from scrapy import signals



class AdCrawler(scrapy.Spider):
    name = 'TodoColección'
    base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    search_keywords = ['rinoceronte', 'marfil', 'cuerno']
    hrefs = []

    def __init__(self):
        dispatcher.connect(self.spider_closed, signals.spider_closed) 

    def start_requests(self):
        with open('hrefs.html') as f: f.seek(0)
        urls = [self.base_url + keyword for keyword in self.search_keywords]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        extraction = Selector(response=response, type='html')\
            .xpath('//div[re:test(@class, "lote-list")]').extract()

        items_hrefs = Selector(text=extraction[0], type='html').xpath('//h3//@href').extract()

        # for ref in items_hrefs:
        #     scrapy.Request(url='https://www.todocoleccion.net' + ref, callback=self.get_detail)

        with open('hrefs.html', 'a') as f:
            for el in extraction:
                self.hrefs += Selector(text=el, type='html').xpath('//h3//@href').extract()
            for href in self.hrefs:
                f.write(href + '\n')

    def spider_closed(self):
        print('putissimo')
        process_item = CrawlerProcess()
        process_item.crawl(ItemCrawler)
        process_item.start()
        # pass
    # def get_detail(self, response):
    #     item_content = Selector(response=response, type='html')\
    #         .xpath('//div[re:test(@class, "contenido")]').extract()
    #     print(item_content)
        
    #     for item in item_content:
    #         print(item)
    


class ItemCrawler(scrapy.Spider):
    name = 'TodoColecciónItem'
    base_url = 'https://www.todocoleccion.net'
    hrefs = []
    count = 0

    def start_requests(self):      
        with open('hrefs.html') as f:  
            self.hrefs = [line.rstrip('\n') for line in f]

        urls = [self.base_url + href for href in self.hrefs]
        print("myurl ", urls[2])
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        item_content = Selector(response=response, type='html')\
            .xpath('//div[re:test(@class, "contenido")]').extract()
        print('count: ',self.count)
        self.count += 1

        for el in item_content:
            # print(el)
            pass
            # passar a text_scrapper


process = CrawlerProcess()
process.crawl(AdCrawler)
process.start()

# process_item = CrawlerProcess()
# process_item.crawl(ItemCrawler)
# process_item.start()