import os
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

logging.getLogger().setLevel(logging.DEBUG)

app = Flask(__name__, instance_relative_config=True)

app.config.from_mapping(SECRET_KEY='dev')
app.config['JWT_SECRET_KEY'] = 'pen-pineapple-apple-pen-simeyson'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///easygrocy.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

jwt = JWTManager(app)
db = SQLAlchemy(app)

try:
    os.makedirs(app.instance_path)
except OSError:
    pass

db.create_all()

from . import api
from . import models
from . import auth

app.register_blueprint(api.group.bp)
app.register_blueprint(auth.bp)
