# node-prom

Publishing Prometheus metrics from a Node.js application.

## Requirements

- [Node.js](https://nodejs.org/en/download/)
- [Prometheus](https://prometheus.io/download/)

## Run

Run the node server:

```bash
node main.js
```

Run the Prometheus server in another terminal:

```bash
prometheus --config.file=prometheus.yml
```

Make requests to the node server:

```bash
curl localhost:5000/one
curl localhost:5000/two
```

In the node server logs, you'll see these requests being logged. You would also see `/metrics` being called at regular intervals by the Prometheus server.

You can also make your own request to the node server at `/metrics`. The response is a plaintext resource listing the current state of all metrics measured at this node server. You can filter for the metric of the total number of HTTP requests:

```bash
curl localhost:5000/metrics | grep http_requests_total
```

Output:

```bash
# HELP node_server_http_requests_total Number of HTTP requests received by the server so far
# TYPE node_server_http_requests_total counter
node_server_http_requests_total{method="GET",path="/metrics"} 111
node_server_http_requests_total{method="GET",path="/one"} 5
node_server_http_requests_total{method="GET",path="/two"} 7
```

You can see a graph of these metrics in the Prometheus expression browser running at `localhost:9090/graph`.
