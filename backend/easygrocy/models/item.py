from easygrocy import db

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    expiration = db.Column(db.DateTime)
    purchased = db.Column(db.Integer, nullable=False)
    link = db.Column(db.Text)

    group_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<Item %r>' % self.name

    def serialize(self):
        serialized = {
            'id': self.id,
            'name': self.name,
            'purchased': self.purchased,
            'group_id': self.group_id,
        }
        if self.price is not None:
            serialized['price'] = self.price
        if self.quantity is not None:
            serialized['quantity'] = self.quantity
        if self.expiration is not None:
            serialized['expiration'] = self.expiration.isoformat()
        if self.link is not None:
            serialized['link'] = self.link
        serialized['users'] = [u.serialize() for u in self.users]
        return serialized
