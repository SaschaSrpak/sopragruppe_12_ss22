import mysql.connector as connector


myconnector = connector.connect(host='localhost',user='root',
                                password='roottoor',
                                database='SoPra_Database_Shema')



mycursor = myconnector.cursor()
mycursor.execute("SELECT * from Person")


tuples = mycursor.fetchall()

for i in tuples:
    print(i)