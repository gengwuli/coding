'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _TreeUtil = require('./util/TreeUtil');

var _TreeUtil2 = _interopRequireDefault(_TreeUtil);

var _ArrayUtil = require('./util/ArrayUtil');

var _ArrayUtil2 = _interopRequireDefault(_ArrayUtil);

var _ListUtil = require('./util/ListUtil');

var _ListUtil2 = _interopRequireDefault(_ListUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Viz = require('viz.js');

var _require = require('viz.js/full.render.js'),
    Module = _require.Module,
    render = _require.render;

var viz = new Viz({ Module: Module, render: render });

exports.default = function (app) {
    app.post('/api/visualize', renderTemplate);
};

function renderTemplate(req, res) {
    var body = req.body;
    if (body['type'] == null || body['type'] == undefined || body['type'] == 'raw') {
        viz.renderString(body['val']).then(function (result) {
            res.json({ "result": result });
        }).catch(function (e) {
            res.json({ "error": e });
        });
        return;
    }
    var dotRes = '';
    switch (body.type) {
        case 'tree':
            dotRes = (0, _TreeUtil2.default)(body['val']);
            break;
        case 'array':
            var arr = JSON.parse(body['val']);
            if (Array.isArray(arr[0])) {
                dotRes = (0, _ArrayUtil2.default)(arr);
            } else {
                dotRes = (0, _ArrayUtil2.default)([arr]);
            }
            break;
        case 'linked_list':
            dotRes = (0, _ListUtil2.default)(JSON.parse(body['val']));
            break;
        default:
            dotRes = body['val'];
            break;
    }

    viz.renderString(dotRes).then(function (result) {
        res.json({ "result": result });
    }).catch(function (error) {
        res.json({ "error": error });
    });
}