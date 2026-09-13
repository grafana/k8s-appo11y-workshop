FROM python:3.14@sha256:e06cc1111ed84189e91866447f562b89faadbfbbb9937cd67e6bf4172cdb45df

WORKDIR /python-docker

# install open telemetry
RUN pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-flask

RUN opentelemetry-bootstrap -a install


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD ["opentelemetry-instrument", "python3", "-m" , "flask", "run", "--host=0.0.0.0"]