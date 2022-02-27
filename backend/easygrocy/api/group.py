import random
import string

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, current_user

from easygrocy import db
from easygrocy.models import Group, Item

from . import unauthorized, bad_request, json_message

bp = Blueprint('group', __name__, url_prefix='/api/group')

def user_in_group(user, group):
    return group in user.groups

@bp.route('<int:group_id>', methods=["GET", "PUT"])
@jwt_required()
def get_group(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    if request.method == "GET":
        return jsonify(group=group.serialize())
    if request.method == "PUT":
        json = request.get_json()
        name = json.get("name")
        if name is not None:
            group.name = name
            db.session.add(group)
            db.session.commit()
        return json_message("Group successfully modified.")

@bp.route('create_group', methods=["POST"])
@jwt_required()
def create_group():
    json = request.get_json()
    name = json.get("name")
    if name is None:
        return bad_request()
    code = ''.join(random.choices(string.ascii_uppercase + \
        string.ascii_lowercase + string.digits, k=8))
    while Group.query.filter_by(code=code).first() is not None:
        code = ''.join(random.choices(string.ascii_uppercase + \
            string.ascii_lowercase + string.digits, k=8))
    group = Group(name=name, code=code)
    group.users.append(current_user)
    db.session.add(group)
    db.session.commit()
    return jsonify(group=group.serialize())

@bp.route('join_group/<int:group_code>', methods=["POST"])
@jwt_required()
def join_group(group_code):
    group = Group.query.filter_by(code=group_code).first()
    if group is None:
        return bad_request()
    group.users.append(current_user)
    db.session.add(group)
    db.session.commit()
    return json_message("User successfully joined the group!")

@bp.route('<int:group_id>/users', methods=["GET"])
@jwt_required()
def get_users(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    return jsonify(users=[u.serialize() for u in group.users])

@bp.route('<int:group_id>/items', methods=["GET"])
@jwt_required()
def get_items(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    items = Item.query.filter_by(group_id=group_id)
    return jsonify(items=[i.serialize() for i in items])
