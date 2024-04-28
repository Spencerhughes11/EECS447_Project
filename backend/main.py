from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from flask_mysqldb import MySQL


app = Flask(__name__)
app.secret_key = 'ea49kjad92kd023dnpq321'

CORS(app)

@app.route('/', methods=['POST'])
def query():
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
    
""" Authenticate users """
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # Get JSON data from request
        first = data.get('first')
        last = data.get('last')
        username = data.get('username')
        password = data.get('password')
        method = data.get('method')

        if not username or not password:
            return jsonify({'error': 'Username or password not provided'})
        
        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)

        if method == 'signup':
            # Check if user already exists
            mycursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            user_exists = mycursor.fetchone()
            
            if user_exists:
                return jsonify({'error': 'Account with username already exists'})
            
            mycursor.execute(
                "INSERT INTO users (first, last, username, password) VALUES (%s, %s, %s, %s)",
                (first, last, username, password)
            )
            connection.commit()  # Commit the transaction
            
        else:
            mycursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
            user = mycursor.fetchone()
            if user:
                session['loggedin'] = True
                session['id'] = user['id']
                session['username'] = user['username']
                return jsonify({
                    "message": "Logged in successfully",
                    "user": {
                        "id": user['id'],
                        "username": user['username']
                    }
                    }
                    ), 200
            else:
                return jsonify({'error': 'Invalid login credentials'}), 401


        mycursor.close()
        connection.close()
        

        return jsonify('User registered.')

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
