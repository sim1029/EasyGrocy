from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from . import unauthorized, bad_request, json_message

from easygrocy import app, jwt, db
from easygrocy.models import User, Group, Item


bp = Blueprint('item', __name__, url_prefix='/api/item')


@bp.route('<int:item_id>', methods=["GET", "PUT", "DELETE"])
def get_item(item_id):
    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return bad_request()
    # check users privelage to edit
    if request.method == "GET":
        return jsonify(item=item)
    if request.method == "PUT":
        changes = request.get_json()
        name = changes.get("name")
        price = changes.get("price")
        quantity = changes.get("quantity")
        expiration = changes.get("expiration")
        purchased = changes.get("purchased")
        link = changes.get("link")

        if name is not None:
            update_statement = Item.update().where(id=item_id).values(name=name)
            db.session.execute(update_statement)
        if price is not None:
            update_statement = Item.update().where(id=item_id).values(price=int(price))
            db.session.execute(update_statement)
        if quantity is not None:
            update_statement = Item.update().where(
                id=item_id).values(quantity=int(quantity))
            db.session.execute(update_statement)
        if expiration is not None:
            update_statement = Item.update().where(
                id=item_id).values(expiration=expiration)
            db.session.execute(update_statement)
        if purchased is not None:
            update_statement = Item.update().where(
                id=item_id).values(purchased=int(purchased))
            db.session.execute(update_statement)
        if link is not None:
            update_statement = Item.update().where(id=item_id).values(link=link)
            db.session.execute(update_statement)
        db.session.commit()
        return json_message('Successfully updated item.')
    if request.method == "DELETE":
        item = Item.query.filter_by(id=item_id).first()
        if current_user not in item.users:
            return unauthorized()
        if item is None:
            return bad_request()
        db.session.delete(item)
        db.session.commit()
        return json_message('Successfully deleted item.')


@bp.route('/create_item', methods=["POST"])
def create_item():
    json = request.get_json()
    name = json.get("name")
    price = json.get("price")
    quantity = json.get("quantity")
    expiration = json.get("expiration")
    purchased = json.get("purchased")
    link = json.get("link")
    group_id = json.get("group_id")

    if purchased is None:
        purchased = 0

    if name is None or group_id is None:
        return bad_request()

    item = Item(name=name, group_id=int(group_id), purchased=int(purchased))
    if price is not None:
        item.price = int(price)
    if quantity is not None:
        item.quantity = int(quantity)
    if expiration is not None:
        item.expiration = expiration
    if link is not None:
        item.link = link

    db.session.add(item)
    db.session.commit()
    return jsonify(item=item)

    # create item
