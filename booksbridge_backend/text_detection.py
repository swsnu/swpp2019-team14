import io, os
from google.cloud import vision
from django.http import HttpResponse


def run_text_detection(path): 
    client = vision.ImageAnnotatorClient()

    try:
        with io.open(path, 'rb') as image_file:
            content = image_file.read()
    except:
        return HttpResponse(status=400)

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)

    result = ""
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    result += word_text + ' '
    result += " "
    return result


def run_text_detection_url(path):
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = path

    response = client.text_detection(image=image)
    
    result = ""
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    result += word_text + " "
    result += " "
    return result
