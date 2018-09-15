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
        def get_title():
            return self.get_by_xpath('//*[@id="lote-page-h1"]/text()')[0]

        def get_description():
            description = self.get_by_xpath('//*[@id="lote-info"]/div/div[4]/ul/li[1]/span/p/span/text()')
            return '' if len(description) == 0 else description[0]

        def get_price():
            return self.get_by_xpath('//*[@id="lote-info"]/div/div[1]/span[1]/span/text()')[0]

        def get_image():
            image = self.get_by_xpath('//*[@id="foto_principal"]/img/@src')[0]
            return image

        data = {
            'title': get_title(),
            'description': get_description(),
            'date': self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/span[2]/text()'),
            'location': self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/text()'),
            'images': get_image(),
            'tags': self.get_by_xpath('/html/body/div/div[1]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div/p[2]/span[2]/em'),
            'price': get_price(),
            'url': '',
            'user': {
                'name': '',
                'profile': '',
                'extra': {}
            }
        }
        return data
