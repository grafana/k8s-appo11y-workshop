# Observability Workshop with Grafana Cloud

- [Observability Workshop with Grafana Cloud](#observability-workshop-with-grafana-cloud)
  - [Prerequisites](#prerequisites)
  - [LAB 01 : Deploy the Agent Grafana Alloy \& Use Kubernetes Observability](#lab-01--deploy-the-agent-grafana-alloy--use-kubernetes-observability)
  - [LAB 02 : Deploy Microservices \& send data](#lab-02--deploy-microservices--send-data)
    - [Optional action](#optional-action)
  - [LAB 03 : Troubleshooting issues with Grafana Cloud O11y solutions](#lab-03--troubleshooting-issues-with-grafana-cloud-o11y-solutions)
    - [LAB 3.1 : Explore the healthy instance](#lab-31--explore-the-healthy-instance)
    - [LAB 3.2 : Let’s find some issues](#lab-32--lets-find-some-issues)
    - [LAB 3.3 : Faster RCA with Assert](#lab-33--faster-rca-with-assert)
  - [LAB 04 : Browser Synthetic Test](#lab-04--browser-synthetic-test)


## Prerequisites

Make sure you have your credentials to access webtty & grafana cloud stack

- Grafana Cloud Stack : https://USERID.grafana.net

- WebTTY ssh console : https://WORKSHOPID.work-shop.grafana.net


## LAB 01 : Deploy the Agent Grafana Alloy & Use Kubernetes Observability

1. Open a terminal to the environement in a browser to ```https://WORKSHOPID.work-shop.grafana.net``` with the received credentials
2. Open Grafana in a browser ```https://USERID.work-shop.grafana.net``` with the received credentials

3. In Grafana Cloud UI, Activate application observability

![alt text](graphics/06.png)

4. Navigate to Infrastructure -> Kubernetes.

![alt text](graphics/01.png)

5. Click on Start Sending Data
6. Click on Install
7. Fill in cluster information

To get cluster name in webtty

```
kubectl config view --minify -o jsonpath='{.clusters[0].name}' && echo
```

```
Cluster name : WORKSHOPID-USERID
Namespace : default
Tick option "Grafana Application Observability"
```

![alt text](graphics/02.png)

1. Name the token ```k8stelemetry``` Cick on create new token

![alt text](graphics/03.png)

8. Copy Helm command and run in webtty

![alt text](graphics/04.png)

9. Check if agent pods are running in webtty

```sh
kubectl get pods
```

expected results

```
$ kubectl get pods

NAME                                                         READY   STATUS    RESTARTS   AGE
grafana-k8s-monitoring-alloy-0                               2/2     Running   0          5m32s
grafana-k8s-monitoring-alloy-events-86cd889b7-wckgv          2/2     Running   0          5m32s
grafana-k8s-monitoring-alloy-logs-257qr                      2/2     Running   0          5m33s
grafana-k8s-monitoring-alloy-logs-7d5w8                      2/2     Running   0          5m33s
grafana-k8s-monitoring-alloy-logs-f7szw                      2/2     Running   0          5m33s
grafana-k8s-monitoring-kepler-mb92c                          1/1     Running   0          5m31s
grafana-k8s-monitoring-kepler-tgjgp                          1/1     Running   0          5m30s
grafana-k8s-monitoring-kepler-x9nvx                          1/1     Running   0          5m30s
grafana-k8s-monitoring-kube-state-metrics-5d9bd787cc-56kjc   1/1     Running   0          5m32s
grafana-k8s-monitoring-opencost-7645f5d9d-hhpd9              1/1     Running   0          5m32s
grafana-k8s-monitoring-prometheus-node-exporter-llsbc        1/1     Running   0          5m33s
grafana-k8s-monitoring-prometheus-node-exporter-qg27t        1/1     Running   0          5m33s
grafana-k8s-monitoring-prometheus-node-exporter-w84vm        1/1     Running   0          5m33s
```

10. check Kubernetes Monitoring App

![alt text](graphics/05.png)


## LAB 02 : Deploy Microservices & send data

Architecture of microservices apps

![arch](graphics/architecture.png)

1. In the web tty, deploy all services

```sh
kubectl create ns apps

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/room-availability/deploy-faulty.yaml

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/email-channel/deploy.yaml

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/sms-channel/deploy.yaml

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/booking-notification/deploy.yaml

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/booking-hub/deploy.yaml

kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/k6/k6.yaml

```

2. Explore Application Observability

![alt text](graphics/07.png)

### Optional action

deploy non buggy component 
```sh 
kubectl -n apps apply -f https://raw.githubusercontent.com/grafana/k8s-appo11y-workshop/refs/heads/master/microservices/room-availability/deploy-success.yaml

```

## LAB 03 : Troubleshooting issues with Grafana Cloud O11y solutions

In this workshop, we will use different Grafana Cloud products to find and analyse issues with our application. We have prepared for you an online store application with different microservices, running in K8S, and already configured to send all data to Grafana Cloud. You will use three different instances:

- Grafana: https://WORKSHOPID_HEALTHY.grafana.net: is a healthy instance where there’s no problems in the application. You can use it to see how the different services behave. The web application is accessible here: https://WORKSHOPID_HEALTHY.field-eng-demo.grafana.net/ 

- Grafana: https://WORKSHOPID_ERROR.grafana.net/ : is an instance where several issues are happening. You will use FE O11y, App O11y and other services to troubleshoot what’s going on. The web application is accessible here: https://WORKSHOPID_ERROR.field-eng-demo.grafana.net/ 

- Grafana: https://WORKSHOPID_ASSERTS.grafana.net is an instance where Asserts has been configured and an incident happened in the last 24 hours. You will get a feel about how Asserts can help you in troubleshooting. The web application is accessible here: 

Your instructor provided you with your personal accounts to access each of these 3 instances.

### LAB 3.1 : Explore the healthy instance

Connect to the healthy instance and get familiarized with the environment and application. 

[https://WORKSHOPID_HEALTHY.grafana.net](https://WORKSHOPID_HEALTHY.grafana.net)


Access the website and click around. Add products to cart, checkout, see recommendations, etc. The website should work correctly, and react fast.

![alt text](graphics/08.png)

Go to Grafana, Frontend Observability and review the KPI. The web vitals should be generally good. The number of errors is 0 or low.  

![alt text](graphics/09.png)

Navigate to the error tab, and click to see the details of any errors that are happening. This should be an isolated error which can happen even if the application is healthy. We have introduced a very small number of random errors.

![alt text](graphics/10.png)

Go to Application O11y and get an overview of the services. See if there are any errors or slowness. Everything should be good. 

![alt text](graphics/11.png)

Navigate to the service Map and see how these services are connected to each other.

![alt text](graphics/12.png)

Now come back to services, click on one service, and check that all the data is correctly collected. See the metrics, traces and logs.

Finally, go to the SLO Performance page, and see the different KPI. Once again, everything should be green.

![alt text](graphics/13.png)

All good. Now that you know what a healthy instance looks like, let's add some errors and start troubleshooting with Grafana Cloud.

### LAB 3.2 : Let’s find some issues

Connect to the second instance and let’s start understanding what’s going on. 

DISCLAIMER: the errors that you will see here are artificially introduced. This means that some aspects may seem weird. Also, you won’t be able to find the final root cause with all the details. The objective is to move from a website that’s not working properly, down to the services, API or component that has an issue.

- Access the website and click around. Add products to cart, checkout, see recommendations, etc. Have you noticed something?
- Now, open Grafana and go to Frontend. You should see a high number of errors and degraded KPIs. Analyze which pages are impacted. Go to the error tabs and analyze the errors. Have you noticed that the calls to the checkout API seem to be failing? But is this service the real problem? Often failures have a cascading effect. We need to go deeper to find the problematic service.
- Go to App Observability and review the list of services. Where are the services throwing errors? Is this aligned with what you saw in Frontend?
- Go back now to the services view, and open the Checkout service. See the Inbound and Outbound connections. Anything else jumps to your eyes? It looks like there’s another service involved in these issues. Which one? You can confirm this by going into the service map view.
- Let leverage traces to see what’s going on with more details. Click on the traces button in the errors panel. These should show you all the traces that have span errors. Click on one of these and analyze the flame graph. See the events in the problematic span. Compare the duration of the different span. Is there a Span that’s anomaly slow?
- Continue playing around with the trace. Click on logs and see if you understand what’s going on. Have you found the issue? Great.
- Let’s see now what’s the impact of the problem. Go to SLO Performance and how are the SLI and error budget for the service you just found. Waw! We are way out of budget. We are losing way too much revenue. At least we know now where the problem is coming from and we will contact the team responsible for it.
- Good job. But before moving to the next exercise, have you noticed another issue? It looks like there’s another problem that we didn’t notice. Which service is it?
- Go back to app O11y and explore this service. In the duration distribution, click on the biggest histogram. This should take you to the traces that are taking a long time. Sort traces by duration. Explore the spans and see where the bottleneck is. Do you think there’s another problem or is this related to the previous one?

### LAB 3.3 : Faster RCA with Assert

Connect to the third instance and let’s see how Asserts can make this process even faster.

This instance has a different problem. It happened in the last 24 hours and has already been fixed. Customers were not able to buy products on our website. We will see how Asserts can be used to diagnose this problem.

- Go to Asserts, and change the timeframe to Last 24 hours. You should see that some services were red because Assertions had been generated.
- Click on product catalog and click on Troubleshoot in workbench.
- Click on add problematic connections. This should add two entities to the workbench.
- Select the time when several problems happened
- Go to Summary tab and sort by time
- Explore the different anomalies that Asserts detected and navigate the assets suggested
- Were you able to find this error in the logs : “panic: runtime error: invalid memory address or nil pointer dereference. time="2025-01-27T15:47:10Z" level=error msg="pq: sorry, too many clients already" ?
- The feature flag that we enabled deployed a new version of the service, that didn’t use the Postgres SQL server correctly, kept connections open, caused pods to die, and some memory leak problems

## LAB 04 : Browser Synthetic Test

```sh 
k6 run k6/browser-test/browser.js

```