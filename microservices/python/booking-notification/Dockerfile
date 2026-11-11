FROM python:3.14@sha256:d18055009f327b22993de14458aa5a6bac032cdf459ea2a2e9bbdc3d3d49e4fb

WORKDIR /python-docker

# install open telemetry
RUN pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-flask

RUN opentelemetry-bootstrap -a install


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD ["opentelemetry-instrument", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]