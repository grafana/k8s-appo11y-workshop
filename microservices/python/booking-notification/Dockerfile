FROM python:3.15@sha256:46837ed3105db0029b6d656816185c6258e3b39690532fb782428e0a5fd76182

WORKDIR /python-docker

# install open telemetry
RUN pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-flask

RUN opentelemetry-bootstrap -a install


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD ["opentelemetry-instrument", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]