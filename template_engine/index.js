let logger = require('morgan')
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

import template_render from './api/template_render';

let app = express()
app.use(bodyParser.json())
app.use(logger('default'))
app.use(cors())

template_render(app);

app.get('/', (req, res) => {
    res.json({"hello":"world"})
})


let port = 8080

let server = app.listen(port, () => {
    console.log("listening at", server.address().address, server.address().port)
})
