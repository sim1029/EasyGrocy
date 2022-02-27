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

from . import models

db.create_all()

from . import auth
from .api import group, user, item

app.register_blueprint(auth.bp)
app.register_blueprint(group.bp)
app.register_blueprint(user.bp)
app.register_blueprint(item.bp)
