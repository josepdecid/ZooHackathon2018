from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

client = language.LanguageServiceClient()

text = u'Antiguo bol Chino en cuerno de rinoceronte labrado de 1ª mitad del Siglo XX, con decoración de escena costumbrista con figuras en un paisaje floral, 11,5 x 7,0 cm. y 299 gr. sin peana'

document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)
print(client.analyze_entities(document).entities)