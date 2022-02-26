from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from . import unauthorized, bad_request, json_message

from easygrocy import app, jwt, db
from easygrocy.models import User, Group, Item


bp = Blueprint('item', __name__, url_prefix='/api/item')\



@bp.route('/<inn:group_id>/update_item', methods=["PUT"])
def update_item(item_id, changes):
    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return bad_request
    # check users privelage to edit
    if changes.name is not None:
        update_statement = Item.update().where(id=item_id).values(name=changes.name)
        db.session.execute(update_statement)
    if changes.price is not None:
        update_statement = Item.update().where(id=item_id).values(price=changes.price)
        db.session.execute(update_statement)
    if changes.quantity is not None:
        update_statement = Item.update().where(
            id=item_id).values(quantity=changes.quantity)
        db.session.execute(update_statement)
    if changes.expiration is not None:
        update_statement = Item.update().where(
            id=item_id).values(expiration=changes.expiration)
        db.session.execute(update_statement)
    if changes.purchased is not None:
        update_statement = Item.update().where(
            id=item_id).values(purchased=changes.purchased)
        db.session.execute(update_statement)
    if changes.link is not None:
        update_statement = Item.update().where(id=item_id).values(link=changes.link)
        db.session.execute(update_statement)
    db.session.commit()
    return json_message('sucessful update')

    # probably some error message cuz thats how u dont write dawgshit code


@bp.route('int:group_id/delete item', methods=["DELETE"])
def delete_item(item_id):
    # check that the user is allowed to u
    item_to_delete = Item.query.filter_by(id=item_id).first()
    if item_to_delete is None:
        return bad_request
    db.session.delete(item_to_delete)
    db.session.commit()


@bp.route('<int:group_id>/create_item', methods=["POST"])
def create_item(item):
    item_to_add = {
        'id': item.id,
        'name': item.name,
        'price': item.price,
        'quantity': item.quantity,
        'expiration': item.expiration,
        'purchased': item.purchased,
        'link': item.link,
        'group_id': item.group_id,
    }
    db.session.add(item_to_add)
    db.session.commit()

    # create item
