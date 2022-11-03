from asyncio.windows_events import NULL
from tkinter import EXCEPTION
from flask import Flask, render_template, request, jsonify, flash, session
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(app)



@app.route("/sandbox")
def return_sandbox():
    return render_template("sandbox.html")

@app.route("/test", methods=['POST'])
def test():
    con = sqlite3.connect("test.db", check_same_thread=False)
    session.clear()
    db = con.cursor()
    post_data = json.loads(request.data)
    data = post_data.get("data")
    data_str = str(data)
    data_obj = json.loads(data_str)
    key = post_data.get("key")
    table_name = post_data.get("name")
    url = post_data.get("url")
    type = post_data.get("type")

    # add table to database of tables
    # add meta data into TABLE tables
    db.execute("CREATE TABLE IF NOT EXISTS tables (pk INTEGER, table_name TEXT NOT NULL UNIQUE, url TEXT, table_type TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(pk))")
    con.commit()
    try:
        db.execute('INSERT INTO tables (table_name, url, table_type) VALUES(?, ?, ?)', (table_name, url, type))
    except Exception as err :
        return jsonify({"error": f'Error: {str(err)}'})
        #return jsonify({"error": f'Table name "{table_name}" already exists.'})

    # option 1: single database that holds all data
    db.execute(f'CREATE TABLE IF NOT EXISTS all_data (pk INTEGER, table_name TEXT NOT NULL UNIQUE, key INTEGER, data TEXT, PRIMARY KEY(pk))')
    db.execute("INSERT INTO all_data (table_name, key, data) VALUES(?, ?, ?)", (table_name, key, data_str))

    # option 2: individual databases that replicate hash tables
    # create new table
    selected_pk = db.execute("SELECT pk FROM tables WHERE table_name = ?", (table_name, ))
    for row in selected_pk:
        table_id = row[0]

    db.execute(f'CREATE TABLE IF NOT EXISTS {table_name} (pk INTEGER, index_col INTEGER NOT NULL, PRIMARY KEY(pk))')

    
    def hash_sift(table_name, hash_set, row, count = 0):

        ## print(row)
        for index in hash_set:
            
            # this fails in cases where there are no collisions because no hashmap is created
            try:
                if hash_set['val'] and (hash_set['next'] or hash_set['next'] == None):
                    count += 1
                    column = f'COL_{count}'

                    # add column if not already created
                    try:
                        db.execute(f'ALTER TABLE {table_name} ADD COLUMN {column} TEXT')
                    except:
                        pass

                    # ensure entry is a string                   
                    input_val = hash_set["val"]
                    if type(input_val) is not str:
                        input_val = str(input_val)

                    # insert val into col
                    db.execute(f'UPDATE {table_name} SET ({column}) = ? WHERE index_col = ?', (input_val, row, ))

                    if hash_set['next']:
                        #print(f'next: {hash_set["next"]}')
                        hash_sift(table_name, hash_set["next"], row, count)

                    return
            except:
                pass

    # update table with hash data
    if type == "hash":
        for row_num in data_obj:
            db.execute(f'INSERT INTO {table_name} (index_col) VALUES(?)', (row_num, ))

            hash_set = data_obj[row_num]
            hash_sift(table_name, hash_set, row_num)

    con.commit()
    db.close()
    con.close()

    return jsonify({"ok": "data successfully uploaded"})

@app.route("/table", methods=['GET', 'POST'])
def show_table():
    con = sqlite3.connect("test.db", check_same_thread=False)
    db = con.cursor()
    table_list = []
    try:
        id_rows = db.execute("SELECT table_name FROM tables")
        for row in id_rows:
            table_list.append(row[0])
    except:
        pass

    return render_template("index.html", tables=table_list)
    
@app.route("/get_table", methods=['POST'])
def get_table():
    con = sqlite3.connect("test.db", check_same_thread=False)
    db = con.cursor()
    post_data = json.loads(request.data)
    table_name = post_data.get('name')
    key = []
    meta_data = [];
    table_type = ''

   
    data_set = db.execute("SELECT key, data FROM all_data WHERE table_name = ?", (table_name, ))
    # data = db.execute(f'SELECT * FROM {table_name}')
    if data_set:
        for row in data_set:
            key = row[0]
            data = row[1]

    table_type_set = db.execute("SELECT table_type FROM tables WHERE table_name = ?", (table_name, ))
    for set in table_type_set:
        table_type = set[0]

    meta_data_set = db.execute("SELECT table_name, url, table_type, created_at FROM tables WHERE table_name = ?", (table_name, ))
    
    for set in meta_data_set:
        for entry in set:
            if entry is None:
                entry = ''
            meta_data.append(entry)
    """ 
    elif data:
        # create dict 

        for row in data:
            for col in row:
                pass
    """
    """ 
    key_set = db.execute("SELECT key FROM keys WHERE table_id IN (SELECT pk FROM tables WHERE table_name = ?)", (table_name, ))
    for row in key_set:
        key.append(row[0])
     """    
    return jsonify({'key': key, 'data': data, 'meta_data': meta_data, 'type': table_type})

@app.route("/hash_data", methods=['POST'])
def hash():
    con = sqlite3.connect("test.db", check_same_thread=False)
    db = con.cursor()
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

def column_setup(data, key, table_name, col):
    con = sqlite3.connect("test.db", check_same_thread=False)
    db = con.cursor()
    if type(data[key]) is int:
        try:
            db.execute(f'ALTER TABLE {table_name} ADD COLUMN {col} INTEGER')
            con.commit()
        except:
            pass 

    else:
        try:
            db.execute(f'ALTER TABLE {table_name} ADD COLUMN {col} TEXT')
            con.commit()
        except:
            pass