#!/bin/bash

cd "$(dirname "$0")"

python3 -m venv env

source env/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

