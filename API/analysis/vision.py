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
        json = '{"requests": ['

        for image_url in image_urls:
            json += self.build_image_json(image_url) + ","
        json += "]}"

        r = requests.post(self.build_url(), data=json).json()

        total_labels = []
        for resp in r['responses']:
            labels = []
            if 'labelAnnotations' in resp:
                for label in resp['labelAnnotations']:
                    labels.append(label['description'])
            total_labels.append(labels)
        total_labels = [item for sublist in total_labels for item in sublist]
        return total_labels
