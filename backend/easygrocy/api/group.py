from flask import Blueprint, jsonify, request

from flask_jwt_extended import jwt_required, current_user

from easygrocy import db
from easygrocy.models import User, Group, Item

from api import unauthorized, bad_request, json_message

bp = Blueprint('group', __name__, url_prefix='/api/group')

def user_in_group(user, group):
    return group in user.groups

@bp.route('<int:group_id>', methods=["GET", "POST"])
@jwt_required()
def get_group(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    if request.method == "GET":
        return jsonify(group=group.serialize())
    else:
        json = request.get_json()
        name = json.get("name")
        if name is not None:
            group.name = name
            db.session.add(group)
            db.session.commit()
        return json_message("Group successfully modified.")

@bp.route('<int:group_id>/add_user/<int:user_id>', methods=["POST"])
@jwt_required()
def add_user(group_id, user_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return bad_request()
    group.users.append(user)
    db.session.add(group)
    db.session.commit()
    return json_message("User successfully added.")

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
    return jsonify(items=items)
