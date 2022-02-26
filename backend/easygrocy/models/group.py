from easygrocy import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<Group %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }
