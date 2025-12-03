FROM python:3.14@sha256:595140b768992c05b096570e5ae487a02a2c6b3ae23ba33ce0fc34b99579c98e

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]