from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    try:
        data = request.get_json()  # Get JSON data from request
        query = data.get('query')

        if not query:
            return jsonify({'error': 'query name not provided'})
        
        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)

        mycursor.execute(f"{query}")

        columns = mycursor.column_names

        data = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()
        
        response = {
            'columns': columns,
            'data': data
        }

        return response

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
