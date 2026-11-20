FROM python:3.14@sha256:e5de6bc932256f8138c2353023dc4fd24d010d72f6b5cb06be126f0a4cd53784

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]