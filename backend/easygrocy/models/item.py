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
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'quantity': self.quantity,
            'expiration': self.expiration,
            'purchased': self.purchased,
            'link': self.link,
        }
