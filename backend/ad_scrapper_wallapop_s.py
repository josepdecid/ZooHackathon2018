import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess

extra_url = ''

class AdCrawler(scrapy.Spider):
    name = 'milanuncios'
    #base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    base_url = 'https://es.wallapop.com'
    extra_url = '/item/cuerno-de-alce-248144556'

    def start_requests(self):
        url = self.base_url + self.extra_url
        print("#####################################")
        print(url)
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        extraction = Selector(response=response, type='html')\
            .xpath('//a[re:test(@class, "card-user-detail-top")]').extract()
        for el in extraction:
            #print(el)
            print("---------------------------------------------------")
            chars = el.split('href=\"')
            print(chars[1])
            time.sleep(5)


def crawlSingle(path):
    process = CrawlerProcess()
    AdCrawler.extra_url=path
    print(path)
    process.crawl(AdCrawler)
    process.start()
