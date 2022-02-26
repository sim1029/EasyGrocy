import json
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, \
    unset_jwt_cookies, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from easygrocy import app, jwt, db
from easygrocy.models import User
import hashlib


@app.route('/login', methods=["POST"])
def login():
    email = request.form["username"]
    password = request.form["password"]
    # grab user with email given
    user = User.query.filter_by(username=email).first()
    # grab password from
    if not user or check_password_hash(user.password, password):
        return{"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=user)
    response = {"access_token": access_token}


@app.route('/logout', methods=["POST"])
def logout():
    x = 1


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()
