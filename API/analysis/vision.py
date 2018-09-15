import requests


class VisionAPI:
    def __init__(self):
        self.url = 'https://vision.googleapis.com/v1p1beta1/images:annotate'
        self.KEY = 'AIzaSyBOjsWyEN08LBkw51VSeZewkmFsC1O0xSc'
        self.maxResults = 10

    def build_url(self):
        return self.url + '?key=' + self.KEY

    def build_image_json(self, image_url):
        image_source = '{"imageUri": "' + image_url + ' "}'
        image = '{"source":' + image_source + '}'
        feature = '{"type": "LABEL_DETECTION", "maxResults": ' + str(self.maxResults) + '}'
        image_json = '{"image":' + image + ',"features": [' + feature + ']}'
        return image_json

    def get_image_labels(self, image_urls):
        # image_urls = ['https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg']
        json = "{\"requests\": ["  # TODO tratar todas las imagenes y no solo las 16 primeras

        for image_url in image_urls:
            json += self.build_image_json(image_url) + ","
        json += "]}"

        r = requests.post(self.build_url(), data=json).json()

        total_labels = []
        for resp in r["responses"]:
            labels = []
            if "labelAnnotations" in resp:
                for label in resp["labelAnnotations"]:
                    labels.append({"Label": label["description"], "Score": label["score"]})
            total_labels.append(labels)
        return total_labels
