const express = require('express')
const prom = require('prom-client')

const APP_NAME = 'node_server'
const PORT = 5000

const app = express()
const registry = new prom.Registry()
prom.collectDefaultMetrics({ register: registry })

const counter = new prom.Counter({
    name: `${APP_NAME}_http_requests_total`,
    help: `Number of HTTP requests received by the server so far`,
    labelNames: ['method', 'path']
})
registry.registerMetric(counter)

app.use((req, res, next) => {
    console.log(new Date().toLocaleString(), req.originalUrl)
    counter.inc({ method: req.method, path: req.originalUrl })
    next()
})
app.get('/one', (req, res) => {
    res.send({
        path: '/one'
    })
})
app.get('/two', (req, res) => {
    res.send({
        path: '/two'
    })
})
app.get('/metrics', async (req, res) => {
    const metrics = await registry.metrics()
    res.type('text/plain')
    res.send(metrics)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})
