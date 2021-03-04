const express = require('express')
const prom = require('prom-client')

const app = express()
const registry = new prom.Registry()
prom.collectDefaultMetrics({ register: registry })

app.use((req, res, next) => {
    console.log(new Date().toLocaleString(), req.originalUrl)
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

app.listen(5000, () => {
    console.log('Listening...')
})
