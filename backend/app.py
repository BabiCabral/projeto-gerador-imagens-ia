from openai import OpenAI
from dotenv import load_dotenv
import requests

load_dotenv()

cliente = OpenAI()

resposta = cliente.images.generate(
    model="dall-e-3",
    prompt="uma imagem realista de orixás e entidades da umbanda sendo representados por vários gatinhos vestidos e adornados.",
    size="1024x1024"
)

url_imagem = resposta.data[0].url
print("Imagem gerada com sucesso!")
print("Link: ", url_imagem)

informacoes_imagem = requests.get(url_imagem)

with open("imagem.jpg", "wb") as arquivo_imagem:
    arquivo_imagem.write(informacoes_imagem.content)