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
    users = db.relationship('User', backref='user', lazy=True)
