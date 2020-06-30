FROM python:3.6-buster

WORKDIR /app

ENV PIPENV_VENV_IN_PROJECT true

RUN pip install pipenv

COPY ./Pipfile .
COPY ./Pipfile.lock .

RUN pipenv install --deploy

COPY ./server .

CMD ./bin/start
