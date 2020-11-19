
 # FileName: helper_functions.py
 #
 # Description: This file contains helper functions used for getting user_ud, displaying error when
 # a user_is is not found, and sorting a list by frequency of elements.
 #
 # Author(s): Yanisa Kham
 # Date: November 17, 2020 

from flask import Flask, jsonify, make_response, session
from collections import Counter
from constants import CONSTANTS

def user_id_not_found_response():
    json_response = jsonify({ 
        'error': 'user_id not found, log in again'
    })
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['500_INTERNAL_SERVER_ERROR'])

def sortListByFreq(lis):
    dic = Counter(lis)
    s_list = sorted(dic, key=dic.__getitem__, reverse=True)
    return s_list
