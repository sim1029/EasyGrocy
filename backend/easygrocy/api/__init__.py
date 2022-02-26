from flask import jsonify

def unauthorized():
    return jsonify({
        'message': "Permission denied.",
    }), 401

def bad_request():
    return jsonify({
        'message': "Invalid request.",
    }), 400

def json_message(message):
    return jsonify({
        'message': message,
    })
