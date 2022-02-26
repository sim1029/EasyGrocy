import json
from urllib import response
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, \
    unset_jwt_cookies, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from easygrocy import app, jwt, db
from easygrocy.models import User
import hashlib


@app.route('/login', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # grab user with email given
    user = User.query.filter_by(email=email).first()
    # grab password from
    if not user or check_password_hash(user.password, password):
        return{"msg": "Wrong email or password"}, 401

    # if at this point, then email and password were correct
    access_token = create_access_token(identity=user)
    response = {"access_token": access_token}
    return response


@app.route('/logout', methods=["POST"])
def logout():
    unset_jwt_cookies(response=jsonify({"msg": "logout sucessful"}))
    return response


@app.route('/register', methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    name = request.json.get("name", None)
    error = None
    if not email:
        error = 'enter a username dumbass'
    if not password:
        error = 'enter a password dumbass'
    if not name:
        error = 'enter a name dumbass'

    if error is None:
        newUser = User(email=email, password=password, name=name)
        db.session.add(newUser)
        db.session.commit()
    else:
        return {"msg": "Not all forms properly filled out"}


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()
