FROM python:3.14@sha256:22caa054c0d309b1eee6f448326a8821a674a75b98653247fe706db90491fc87

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]