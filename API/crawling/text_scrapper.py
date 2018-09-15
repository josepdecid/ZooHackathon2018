from scrapy import Selector


class TextScrapper:
    def __init__(self, text):
        self.text = text

    def get_by_xpath(self, xpath):
        return Selector(text=self.text, type='html').xpath(xpath).extract()

    def extract_to_json(self):
        """
        ad = {
            Title: string
            Description: string
            Date: date
            Location: LatLng
            Images: [url]
            Tags: [string]
            Price: number
            URL: url
            User: {
                name: string,
                profile: URL,
                extra: {}
            }
        }
        """
        data = {
            'title': self.get_by_xpath('//*[@id="lote-page-h1"]'),
            'description': self.get_by_xpath('//*[@id="lote-info"]/div/div[4]/ul/li[1]/span/p/span[5]'),
            'date': self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/span[2]/text()'),
            'location': self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/text()'),
            'images': self.get_by_xpath('//*[@id="foto_principal"]/img'),
            'tags': self.get_by_xpath('/html/body/div/div[1]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div/p[2]/span[2]/em'),
            'price': self.get_by_xpath('//*[@id="lote-info"]/div/div[1]/span[1]/span'),
            'url': '',
            'user': {
                'name': '',
                'profile': '',
                'extra': {}
            }
        }
        return data
