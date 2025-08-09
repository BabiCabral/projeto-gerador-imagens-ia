from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
from datetime import datetime
import sqlite3

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("A chave da API da OpenAI não foi encontrada. Verifique seu arquivo .env")

cliente = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app)

def get_db_connection():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, 'galeria.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS imagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            descricao TEXT NOT NULL,
            data_criacao TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

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

        conn = get_db_connection()
        conn.execute('INSERT INTO imagens (url, descricao, data_criacao) VALUES (?, ?, ?)',
                     (url_imagem, prompt, datetime.now().strftime("%d/%m/%Y %H:%M")))
        conn.commit()
        conn.close()

        return jsonify({"url": url_imagem})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/galeria', methods=['GET'])
def obter_galeria():
    conn = get_db_connection()
    imagens_do_db = conn.execute('SELECT * FROM imagens ORDER BY id DESC').fetchall()
    conn.close()

    imagens_para_json = []
    for imagem in imagens_do_db:
        imagens_para_json.append(dict(imagem))

    return jsonify(imagens_para_json)

if __name__ == '__main__':
    app.run(debug=True)