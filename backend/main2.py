from flask import Flask, jsonify

import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    connection = mysql.connector.connect(host='localhost', user='root', password='', database='447')

    if connection.is_connected():
        print('Connected successfully')
    else:
        print('Failed to connect')

    mycursor = connection.cursor(dictionary=True)

    mycursor.execute(f"SELECT * FROM ship")

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
    # for x in myresult:
    print(response)

    mycursor.close()
    connection.close()

    return 'Success!'

if __name__ == '__main__':
    app.run(debug=True)
