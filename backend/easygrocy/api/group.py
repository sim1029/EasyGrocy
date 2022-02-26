from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required, current_user

from easygrocy import app, jwt, db
from easygrocy.models import User, Group, Item

bp = Blueprint('group', __name__, url_prefix='/api/group')

def user_in_group(user, group):
    return group in user.groups

def unauthorized():
    return jsonify({
        'message': "Permission denied.",
    }), 401

def bad_request():
    return jsonify({
        'message': "Invalid group.",
    }), 400

@bp.route('<int:group_id>/users')
@jwt_required()
def get_users(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    return jsonify(users=[u.serialize() for u in group.users])

@bp.route('<int:group_id>/items')
@jwt_required()
def get_items(group_id):
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return bad_request()
    if not user_in_group(current_user, group):
        return unauthorized()
    items = Item.query.filter_by(group_id=group_id)
    return jsonify(items=items)
