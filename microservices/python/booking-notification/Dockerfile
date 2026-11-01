FROM python:3.15@sha256:f17ec845ebdd4f3347431579e1c22eaeec82913f039f2a54b937c7ff870bacdb

WORKDIR /python-docker

# install open telemetry
RUN pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-flask

RUN opentelemetry-bootstrap -a install


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD ["opentelemetry-instrument", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]