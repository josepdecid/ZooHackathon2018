from scrapy import Selector
from geopy.geocoders import Nominatim

from analysis.vision import VisionAPI


class TextScrapper:
    def __init__(self, text, url):
        self.text = text
        self.url = url

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
            price = self.get_by_xpath('//*[@id="lote-info"]/div/div[1]/span[1]/span/text()')
            if len(price) == 0:
                price = self.get_by_xpath('//span[re:test(@class, "lote-precio")]//text()')
            return price[0]

        def get_images():
            images_url = self.get_by_xpath('//*[@id="foto_principal"]/img/@src')
            return images_url

        def get_location():
            locations = self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/text()')
            loc = [x.rstrip() for x in locations if len(x) > 1][0]
            geolocator = Nominatim(user_agent="HauntedHauters")
            location = geolocator.geocode(loc)
            lat_lng = [location.latitude, location.longitude]
            return lat_lng

        def get_date():
            dates = self.get_by_xpath('//*[@id="info_vendedor_box"]/div[1]/div/div[2]/p[2]/span[2]/text()')
            date = [x.rstrip() for x in dates if len(x) > 1][0]
            return date

        def get_tags(image_urls):
            return VisionAPI().get_image_labels(image_urls)

        def get_user():
            return {
                'name': self.get_by_xpath('/html/body/div/div[2]/div/div[3]/div[2]/div/div[1]/div/div[2]/h2/a/strong/text()')[0],
                'url': self.get_by_xpath('/html/body/div/div[2]/div/div[3]/div[2]/div/div[1]/div/div[2]/h2/a/@href')
            }

        images = get_images()

        data = {
            'title': get_title(),
            'description': get_description(),
            'date': get_date(),
            'location': get_location(),
            'images': images,
            'tags': get_tags(images),
            'price': get_price(),
            'url': self.url,
            'user': get_user()
        }
        return data
