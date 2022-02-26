from easygrocy import db
from easygrocy.models import groupuser, itemuser

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, nullable=False)

    groups = db.relationship('Group', secondary=groupuser, lazy='subquery',
        backref='users')

    items = db.relationship('Item', secondary=itemuser, lazy='subquery',
        backref='users')

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'name': self.name,
        }
