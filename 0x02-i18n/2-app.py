#!/usr/bin/env python3
"""Get locale from request"""
from urllib import request
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """Config class for the application."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """Get locale from request"""
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index() -> str:
    """Renders the index.html template"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
