import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess


class AdCrawler(scrapy.Spider):
    name = 'milanuncios'
    #base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    base_url = 'https://es.wallapop.com/search?kws='
    search_keywords = ['rinoceronte', 'marfil', 'cuerno']

    def start_requests(self):
        urls = [self.base_url + keyword +'&verticalId=' for keyword in self.search_keywords]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        extraction = Selector(response=response, type='html')\
            .xpath('//div[re:test(@class, "container-wall")]').extract()

        with open('test_wallapop.html', 'a') as f:
            for el in extraction:
                f.write(el)


process = CrawlerProcess()
process.crawl(AdCrawler)
process.start()
