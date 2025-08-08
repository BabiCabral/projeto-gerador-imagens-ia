from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("A chave da API da OpenAI não foi encontrada. Verifique seu arquivo .env")

cliente = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app)

@app.route('/gerar_imagem', methods=['POST'])
def gerar_imagem():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Adicione uma descrição para gerar a imagem."}), 400

    try:
        resposta = cliente.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024"
        )
        url_imagem = resposta.data[0].url
        return jsonify({"url": url_imagem})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)