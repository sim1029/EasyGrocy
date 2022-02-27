import json
from urllib import response

from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, \
    unset_jwt_cookies, jwt_required, JWTManager, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib

from easygrocy import app, jwt, db
from easygrocy.models import User

bp = Blueprint('auth', __name__)

@bp.route('/login', methods=["POST"])
def login():
    json = request.get_json()
    if json is None:
        app.logger.debug('Login request had invalid json.')
        return {"message": "Invalid request."}, 400
    email = json.get("email", None)
    password = json.get("password", None)
    if not email or not password:
        app.logger.debug('Login request had invalid fields.')
        return {"message": "Not all fields properly filled out."}, 400
    # grab user with email given
    user = User.query.filter_by(email=email).first()
    # grab password from
    if not user or not user.check_password(password):
        app.logger.debug('Login request had invalid email or password.')
        return {"message": "Wrong email or password."}, 400

    # if at this point, then email and password were correct
    app.logger.debug('Login succeeded for user: %s', user)
    access_token = create_access_token(identity=user)
    response = jsonify({
        "access_token": access_token,
        "user_id": user.id,
    })
    return response


@bp.route('/register', methods=["POST"])
def register():
    json = request.get_json()
    if json is None:
        app.logger.debug('Register request had invalid json.')
        return {"message": "Invalid request."}, 400
    email = json.get("email", None)
    password = json.get("password", None)
    name = json.get("name", None)
    if not email or not password or not name:
        app.logger.debug('Register request had invalid fields.')
        return {"message": "Not all fields properly filled out."}, 400

    if User.query.filter_by(email=email).first() is not None:
        app.logger.debug('Register request for existing user.')
        return {"message": "User already exists."}, 400

    user = User(email=email, password=password, name=name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    app.logger.debug('Register succeeded for user: %s', user)
    access_token = create_access_token(identity=user)
    response = {"access_token": access_token}
    return response


@bp.route('/logout', methods=["POST"])
@jwt_required()
def logout():
    app.logger.debug('Logging out user: %s', current_user)
    unset_jwt_cookies(response=jsonify({"message": "Logout successful."}))
    return response


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()
