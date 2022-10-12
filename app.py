from asyncio.windows_events import NULL
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
CORS(app)

con = sqlite3.connect("test.db", check_same_thread=False)
db = con.cursor()

@app.route("/")
def launch():
    return render_template("launch.html")

@app.route("/test", methods=['POST'])
def test():
    post_data = json.loads(request.data)
    data = post_data.get("data")
    for row_num in data:
        hash_set = data[row_num]
        # TODO: create recursive function
        hash_sift(hash_set, row_num)

    return jsonify({"message": "sent"})

def hash_sift(hash_set, row):
    print(row)
    print("#####################")
    for key in hash_set:
        print(key)
        if hash_set['val'] and (hash_set['next'] or hash_set['next'] == None):
            if hash_set['next']:
                # create new col
                
                hash_sift(hash_set['next'], row)
                print("recurse!")
            else:
                hash_set_string = json.dumps(hash_set)
                print(hash_set_string)

@app.route("/table", methods=['GET', 'POST'])
def show_table():
    table_list = []
    id_rows = db.execute("SELECT table_name FROM tables")
    for row in id_rows:
        table_list.append(row[0])

    return render_template("index.html", tables=table_list)
    
@app.route("/get_table", methods=['POST'])
def get_table():
    post_data = json.loads(request.data)
    table_name = post_data.get('name')
    key = []

    data_set = db.execute("SELECT key, data FROM test WHERE pk IN (SELECT pk FROM tables WHERE table_name = ?)", (table_name, ))
    for row in data_set:
        key = row[0]
        data = row[1]

    """ 
    key_set = db.execute("SELECT key FROM keys WHERE table_id IN (SELECT pk FROM tables WHERE table_name = ?)", (table_name, ))
    for row in key_set:
        key.append(row[0])
     """    

    return jsonify({'key': key, 'data': data})
    #return render_template("index.html", key=key, data=data )

@app.route("/hash_data", methods=['POST'])
def hash():
    post_data = json.loads(request.data)
    key = post_data.get('key')
    data = post_data.get('data')
    
    data_str = json.dumps(data)
    
    # get current num of tables
    count = 0
    selected_count = db.execute("SELECT COUNT(pk) FROM tables;")
    for row in selected_count:
        count = row[0]

    # name new table and add it to the list of tables
    table_name = f'default_{str(count)}'

    db.execute('INSERT INTO tables (table_name) VALUES(?)', (table_name, ))

    # create new table
    selected_pk = db.execute("SELECT pk FROM tables WHERE table_name = ?", (table_name, ))
    for row in selected_pk:
        table_id = row[0]

    db.execute(f'CREATE TABLE IF NOT EXISTS test (pk INTEGER, key INTEGER, data TEXT, PRIMARY KEY(pk))')
    db.execute("INSERT INTO test (key, data) VALUES(?, ?)", (key, data_str))
    db.execute(f'CREATE TABLE IF NOT EXISTS {table_name} (pk INTEGER, PRIMARY KEY(pk))')
    con.commit()

    # setup columns in new table
    data_type = ''
    for index in data[0]:
        if type(data[0][index]) is int:
            try:
                db.execute(f'ALTER TABLE {table_name} ADD COLUMN {index} INTEGER')
                con.commit()
            except:
                pass 

        elif type(data[0][index]) is not dict and type(data[0][index]) is not list:
            try:
                db.execute(f'ALTER TABLE {table_name} ADD COLUMN {index} TEXT')
                con.commit()
            except:
                pass

    new_list = data.copy()
    merge_sort(new_list, key)

    for index in range(len(new_list)):
        db.execute("INSERT INTO keys (table_id, key, key_id) VALUES(?, ?, ?)", (table_id, new_list[index][key], index) )
        db.execute(f'INSERT INTO {table_name} (pk) VALUES(?)', (index, ))
        for i in new_list[index]:
            if (type(new_list[index][i]) is not dict and type(new_list[index][i]) is not list):
                db.execute(f'UPDATE {table_name} SET ({i}) = ? WHERE pk = ?', (new_list[index][i], index, ))
                con.commit()
    
    con.close()

    return jsonify({'message': "ok"})


def merge_sort(list, key):
    if len(list) > 1:
        mid_index = len(list) // 2
        left = list[:mid_index]
        right = list[mid_index:]

        merge_sort(right, key)
        merge_sort(left, key)

        left_ix = 0
        right_ix = 0
        main_ix = 0

        while (left_ix < len(left) and right_ix < len(right)):
            if left[left_ix][key] <= right[right_ix][key]:
                list[main_ix] = left[left_ix]
                left_ix += 1
            else:
                list[main_ix] = right[right_ix]
                right_ix += 1
            main_ix += 1

        while left_ix < len(left):
            list[main_ix] = left[left_ix]
            left_ix += 1
            main_ix += 1
        
        while right_ix < len(right):
            list[main_ix] = right [right_ix]
            right_ix += 1
            main_ix += 1
        