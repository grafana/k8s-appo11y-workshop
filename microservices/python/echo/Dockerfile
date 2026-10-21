FROM python:3.15@sha256:e748956ccf3f50c9555f236753bbcd5f430d3937e665d3bd6922dd0e6e591a24

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]