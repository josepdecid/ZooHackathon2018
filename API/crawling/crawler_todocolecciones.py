import requests
import scrapy
from scrapy import Selector
from scrapy.crawler import CrawlerProcess

from text_scrapper import TextScrapper


class AdCrawler(scrapy.Spider):
    name = 'TodoColección'
    base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    search_keywords = ['rinoceronte', 'marfil', 'cuerno', 'pangolin', 'tigre']
    hrefs = []

    def start_requests(self):
        with open('urls.txt', 'w+') as f:
            f.seek(0)
        urls = [self.base_url + keyword for keyword in self.search_keywords]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        extraction = Selector(response=response, type='html') \
            .xpath('//div[re:test(@class, "lote-list")]').extract()

        items_hrefs = Selector(text=extraction[0], type='html').xpath('//h3//@href').extract()

        for ref in items_hrefs:
            yield scrapy.Request(url='https://www.todocoleccion.net' + ref, callback=AdCrawler.get_detail)

        with open('./urls.txt', 'a') as f:
            for el in extraction:
                self.hrefs += Selector(text=el, type='html').xpath('//h3//@href').extract()
            for href in self.hrefs:
                f.write(href + '\n')

    @staticmethod
    def get_detail(response):
        item_content = Selector(response=response, type='html')\
            .xpath('//div[re:test(@class, "contenido")]').extract()
        data = TextScrapper(item_content[0], response.url).extract_to_json()
        # requests.post('http://127.0.0.1:5000/posts', data)


process = CrawlerProcess()
process.crawl(AdCrawler)
process.start(stop_after_crawl=False)
