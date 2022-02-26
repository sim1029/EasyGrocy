from flask import jsonify

from . import group
from . import user

def unauthorized():
    return jsonify({
        'message': "Permission denied.",
    }), 401

def bad_request():
    return jsonify({
        'message': "Invalid request.",
    }), 400

