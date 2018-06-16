'use strict';

var _template_render = require('./api/template_render');

var _template_render2 = _interopRequireDefault(_template_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(logger('default'));
app.use(cors());

(0, _template_render2.default)(app);

app.get('/', function (req, res) {
    res.json({ "hello": "world" });
});

var port = 8080;

var server = app.listen(port, function () {
    console.log("listening at", server.address().address, server.address().port);
});