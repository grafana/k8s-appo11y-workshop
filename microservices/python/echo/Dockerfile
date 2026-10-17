FROM python:3.14@sha256:12d187a59ecdeb95df0a78cd6107a84398455365a66cc2183db2be42b6067d33

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]