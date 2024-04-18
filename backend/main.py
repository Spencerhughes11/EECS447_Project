from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    try:
        data = request.get_json()  # Get JSON data from request
        table = data.get('table')

        if not table:
            return jsonify({'error': 'Table name not provided'})
        
        connection = mysql.connector.connect(host='192.168.56.1', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor()

        mycursor.execute(f"SELECT * FROM {table}")

        results = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()

        return jsonify({ 'results': results })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
