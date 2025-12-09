FROM python:3.14@sha256:2febcd1e225a79391d5c9a7b416125af542ffd2f686201a58ea1d5595e110c4d

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]