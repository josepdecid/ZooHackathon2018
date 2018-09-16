import scrapy
from scrapy import Selector
import requests
from scrapy.crawler import CrawlerProcess
import os
import re
import time
from text_scrapper import TextScrapper
extra_url = ''
headers = {'Content-Type': 'application/json', 'Accept':'application/json'}

class AdCrawler(scrapy.Spider):
    name = 'milanuncios'
    #base_url = 'https://www.todocoleccion.net/app/buscador?O=mas&bu='
    base_url = 'https://es.wallapop.com'
    extra_url = '/item/cuerno-de-alce-248144556'

    title=''
    description=''
    date=''
    location=''
    images=[]
    tags=''
    price=''
    url=''
    user=''
    data = []


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
            self.user=iduser[0].strip()
        extraction = Selector(response=response, type='html') \
            .xpath('//h2[re:test(@class, "card-user-detail-name")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('>')
            lastsplit = firstsplit[1].split('<')
            print(lastsplit[0].strip())
        extraction = Selector(response=response, type='html') \
            .xpath('//h2[re:test(@class, "card-user-detail-rating")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('>')
            lastsplit = firstsplit[1].split('<')
            print(lastsplit[0].strip())
        #card-user-detail-rating

        extraction = Selector(response=response, type='html') \
            .xpath('//h1[re:test(@class, "card-product-detail-title")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('>')
            lastsplit = firstsplit[1].split('<')
            self.title =lastsplit[0].strip()

        extraction = Selector(response=response, type='html') \
            .xpath('//div[re:test(@class, "card-product-detail-user-stats-published")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('>')
            lastsplit = firstsplit[1].split('<')
            self.date=lastsplit[0].strip()

        extraction = Selector(response=response, type='html') \
            .xpath('//div[re:test(@class, "card-product-detail-location")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('<a href=')
            ssecondSplit = firstsplit[1].split('>')
            lastsplit = ssecondSplit[1].split('<')
            self.location=lastsplit[0].strip()

        #related-items-list
        extraction = Selector(response=response, type='html') \
            .xpath('//div[re:test(@class, "related-items-list")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('<a href=')
            for i in range(1,len(firstsplit)):
                ssecondSplit = firstsplit[i].split('>')
                lastsplit = ssecondSplit[1].split('<')
                print(lastsplit[0].strip())
            #related-items-list

        extraction = Selector(response=response, type='html') \
            .xpath('//span[re:test(@class, "card-product-detail-price")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('>')
            lastsplit = firstsplit[1].split('<')
            self.price=re.sub("[^0-9]", "", lastsplit[0].strip())

        extraction = Selector(response=response, type='html') \
            .xpath('//img[re:test(@itemprop, "image")]').extract()
        for el in extraction:
            # print(el)
            firstsplit = el.split('src=\"')
            lastsplit = firstsplit[1].split('\"')
            #print(lastsplit[0].strip())
            self.images.append(lastsplit[0].strip())
        images = self.images

        self.data.append({
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'location': self.location,
            'images': images,
            'tags': TextScrapper.get_tags(images),#VisionAPI().get_image_labels(images),
            'price': self.price,
            'url': (self.base_url + self.extra_url).rsplit(),
            'user': self.user
        })


def ffff(url):
    process = CrawlerProcess()
    AdCrawler.extra_url=url
    process.crawl(AdCrawler)
    process.start()
    #card-product-detail-description

    print(AdCrawler.data[0])
    requests.post('http://46.101.56.168:8080/posts', json=[AdCrawler.data[0]], headers=headers)



def crawlSingle():
    with open('wallapop-paths.txt') as ff:
        content = ff.readlines()
        for url in content:
            time.sleep(5)
            newpid = os.fork()
            if newpid == 0:
                ffff(url)
                break;
    if newpid != 0:
        os.remove('wallapop-paths.txt')




