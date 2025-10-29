from flask import Flask, jsonify
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)

@app.route("/weather/<city>")
def get_weather(city):
    api_key = os.getenv("OPENWEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
