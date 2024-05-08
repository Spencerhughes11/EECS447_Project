from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from flask_mysqldb import MySQL


app = Flask(__name__)
app.secret_key = 'ea49kjad92kd023dnpq321'

CORS(app)


@app.route('/mlb', methods=['POST'])
def mlb():
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
    
""" ======================================== NBA ======================================== """

@app.route('/nba', methods=['POST'])
def nba():
    try:
        data = request.get_json()  # Get JSON data from request
        # query = data.get('query')\
        print(data)
        table = data.get('table')
        cols = data.get('cols')
        team = data.get('team')
        if table == 'Players':
            position = data.get('position')
        elif table == 'Teams':
            year = int(data.get('year')) if data.get('year') != 'all' else data.get('year')
            playoffs = data.get('playoffs')
            print(type(year))
        else:
            return jsonify({'error': 'invalid table name'})
        # if not position:
        #     return jsonify({'error': 'query name not provided'})

        
        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)
        # mycursor.execute(query)
        # mycursor.execute(f'SELECT Name, TEAM, `USG%` FROM nbaplayers')
        if not cols:
            columns = "*"
        else:
            cols.insert(0, 'DISTINCT NAME')          # always include names
            cols = [f"`{col}`" if '%' in col or '+' in col else col for col in cols]
            columns = ', '.join(cols)
            # print(columns)
        if table == 'Players':
            if position == 'all' and team == 'ALL':
                query = f'SELECT {columns} FROM nbaplayers'
            elif position != 'all' and team == 'ALL':
                query = f'SELECT {columns} FROM nbaplayers WHERE POS = "{position}"'
            elif team != 'all' and position == 'all':
                query = f'SELECT {columns} FROM nbaplayers WHERE TEAM = "{team}"'
            else:
                query = f'SELECT {columns} FROM nbaplayers WHERE TEAM = "{team}" and POS = "{position}"'
        elif table == 'Teams':      # team table
            # query = 'SELECT * FROM nbateams WHERE playoffs = "yes"'
            if year == 'all' and team == 'ALL' and playoffs == 'both':
                print('here')
                query = f'SELECT {columns} FROM nbateams'
            elif year != 'all' and team == 'ALL' and playoffs =='both':
                query = f'SELECT {columns} FROM nbateams WHERE season = {year}'
            elif team != 'ALL' and year == 'all' and playoffs == 'both':
                query = f'SELECT {columns} FROM nbateams WHERE TEAM = "{team}"'
            elif playoffs != 'both' and year == 'all' and team == 'ALL':
                # print('here')
                query = f'SELECT {columns} FROM nbateams WHERE playoffs = "{playoffs}"'
            elif team != 'ALL' and year != 'all' and playoffs == 'both':
                query = f'SELECT {columns} FROM nbateams WHERE TEAM = "{team}" and season = {year}'
            elif playoffs != 'both' and year != 'all' and team == 'ALL':
                query = f'SELECT {columns} FROM nbateams WHERE playoffs = "{playoffs}" and season = {year}'
            elif playoffs != 'both' and year == 'all' and team != 'ALL':
                query = f'SELECT {columns} FROM nbateams WHERE playoffs = "{playoffs}" AND TEAM = "{team}"'
            else:
                query = f'SELECT {columns} FROM nbateams WHERE playoffs = "{playoffs}" and season = {year} AND TEAM = "{team}"'
                
        mycursor.execute(query)
        columns = mycursor.column_names

        data = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()
        
        response = {
            'columns': columns,
            'data': data,
            'message': f'Successfully returned query: {query}'
        }
        return response

    except Exception as e:
        return jsonify({'error': str(e)})
    
""" ======================================== LOGIN/SESSIONS ======================================== """
    
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
                session['first'] = user['first']
                session['last'] = user['last']
                return jsonify({
                    "message": "Logged in successfully",
                    "user": {
                        "id": user['id'],
                        "username": user['username'],
                        "first": user['first'],
                        "last": user['last'],
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
    
""" ======================================== RETRIEVE USERS ======================================== """


@app.route('/retrieveusers', methods=['POST'])
def users():
    try:
        req = request.get_json()  
        # query = req.get('query')
        # first = data.get('first')
        print("qureqery", req)
        # return jsonify({'message': 'Got req'})
        if not req:
            return jsonify({'error': 'Request not there'})

        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)

        mycursor.execute(req)
        columns = mycursor.column_names

        users = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()
        
        response = users
        return response
    except Exception as e:
        return jsonify({'error': str(e)})
""" ======================================== FAVORITES ======================================== """

## ------------------------- FAV PLAYERS --------------------------
@app.route('/setfavplayer', methods=['POST'])
def fav_players():
    try:
        fav_data = request.get_json()  
        user_id = fav_data.get('userID')
        username = fav_data.get('username')
        player_id = fav_data.get('playerID')
        method = fav_data.get('type')

        if not fav_data:
            return jsonify({'error': 'Request not there'})

        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)
        
        mycursor.execute("SELECT * FROM fav_players WHERE user_id = %s AND player_id = %s", (user_id, player_id))
        user_exists = mycursor.fetchone()
        
        if method == 'add':
                
            if user_exists:
                return jsonify({'error': 'Already favorited'})
                
            mycursor.execute(
                "INSERT INTO fav_players (user_id, username, player_id) VALUES (%s, %s, %s)",
                (user_id, username, player_id)    
        )
            connection.commit()  # Commit the transaction
            
        else:
            if not user_exists:
                return jsonify({'error': 'Player/Team not favorited'})
            mycursor.execute(
                f"DELETE FROM fav_players WHERE user_id = {user_id} AND player_id = {player_id}"
            )
            

            connection.commit()  # Commit the transaction
        
        # mycursor.execute()
        # columns = mycursor.column_names

        # data = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()
        
        response = {
            # 'columns': columns,
            # 'data': data,
            'message': f'Successfully {method}ed user: "{username}" favorites with player: {player_id}'
        }
        return response
    
    

    except Exception as e:
        return jsonify({'error': str(e)})
    
    # -------------- GET FAV PLAYER -----------------
@app.route('/getfavplayer', methods=['POST'])
def get_fav_players():
    try:
        fav_data = request.get_json()  
        # user_id = fav_data.get('userID')
        print(fav_data)
        curr_user = fav_data.get('currUser')
        other_user = fav_data.get('otherUser')
        # player_id = fav_data.get('playerID')
        # method = fav_data.get('type')
        print(f"curr and other: {curr_user}, {other_user}")
        if not fav_data:
            return jsonify({'error': 'Request not there'})

        connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

        if connection.is_connected():
            print('Connected successfully')
        else:
            print('Failed to connect')

        mycursor = connection.cursor(dictionary=True)
        
        mycursor.execute(
            f'SELECT fp.username, np.NAME, np.PPG, np.RPG, np.APG ' +
            f'FROM fav_players fp ' +
            f'JOIN fav_players fp2 ON fp.player_id = fp2.player_id  ' +
            f'JOIN nbaplayers np ON fp.player_id = np.id ' +
            f'WHERE fp2.username = "{curr_user}" and fp.username = "{other_user}"' 
        )
       
        
        # mycursor.execute()
        columns = mycursor.column_names

        data = mycursor.fetchall()

        # for x in results:
        #     print(x)

        mycursor.close()
        connection.close()
        
        response = {
            'columns': columns,
            'data': data,
            # 'message': f'Successfully {method}ed user: "{username}" favorites with player: {player_id}'
        }
        return response
    
    

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
