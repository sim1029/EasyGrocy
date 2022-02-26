import os

from flask import Flask

def create_app():
    # create + configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, "easygrocy.sqlite"),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def root():
        return "Hello, world!"

    from . import db
    db.init_app(app)

    return app
