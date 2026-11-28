FROM python:3.14@sha256:3d1b3b9decb8ee0a344593fa3418654d731ac2ca4b0e43f04f5842fe2471521e

WORKDIR /python-docker

# install open telemetry
RUN pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-flask

RUN opentelemetry-bootstrap -a install


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD ["opentelemetry-instrument", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]