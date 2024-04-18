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

    mycursor = connection.cursor()

    mycursor.execute("SELECT * FROM cruise")

    myresult = mycursor.fetchall()

    # for x in myresult:
    print(jsonify(myresult))

    mycursor.close()
    connection.close()

    return 'Success!'

if __name__ == '__main__':
    app.run(debug=True)
