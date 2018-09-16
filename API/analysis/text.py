from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types


class TextAPI:
    def __init__(self, text):
        self.client = language.LanguageServiceClient()
        self.text = text
        self.maxResults = 10

    def get_category(self):
        document = types.Document(content=self.text, type=enums.Document.Type.PLAIN_TEXT)
        return self.client.classify_text(document).categories
