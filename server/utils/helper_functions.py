from flask import Flask, jsonify, make_response, session
from collections import defaultdict
from constants import CONSTANTS

def get_user_id():
    if 'user_id' not in session:
        return False
    else:
        user_id = session['user_id']
    return user_id

def user_id_not_found_response():
    json_response = jsonify({ 
        'error': 'user_id not in session, log in again'
    })
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])

def sortListByFreq(lis):
    dic = defaultdict(int)
    for num in lis:
        dic[num] += 1

    s_list = sorted(dic, key=dic.__getitem__, reverse=True)
    return s_list
