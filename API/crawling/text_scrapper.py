from scrapy import Selector


class TextScrapper:
    def __init__(self, text):
        self.text = text

    def get_by_xpath(self, xpath):
        return Selector(response=self.text, type='html').xpath(xpath).extract()

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
            'description': '',
            'date': '',
            'location': '',
            'images': self.get_by_xpath('/html/body/div/div[1]/div[2]/div/div/div[2]/div/div[1]/div[1]/div/a/img'),
            'tags': self.get_by_xpath('/html/body/div/div[1]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div/p[2]/span[2]/em'),
            'price': self.get_by_xpath('/html/body/div/div[1]/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div/p[4]/span/em'),
            'url': '',
            'user': {
                'name': '',
                'profile': '',
                'extra': {}
            }
        }
        return data
