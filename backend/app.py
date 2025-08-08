from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
cliente = OpenAI()

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)