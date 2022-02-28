from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required, current_user

from easygrocy import db
from easygrocy.models import User

from . import unauthorized, bad_request, json_message

bp = Blueprint('user', __name__, url_prefix='/api/user')

def user_in_group(user, group):
    return group in user.groups

@bp.route('<int:user_id>/groups', methods=["GET"])
@jwt_required()
def get_groups(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return bad_request()
    return jsonify(groups=[g.serialize() for g in user.groups])

@bp.route('<int:user_id>', methods=["GET", "DELETE"])
@jwt_required()
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return bad_request()
    if request.method == "GET":
        return jsonify(user=user.serialize())
    if request.method == "DELETE":
        if current_user == user:
            return unauthorized()

        db.session.delete(user)
        db.session.commit()

        return json_message("User successfully deleted.")
