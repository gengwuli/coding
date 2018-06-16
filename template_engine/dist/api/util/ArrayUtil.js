'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderArray;

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderArray(array) {
    return _mustache2.default.render('digraph G {\n        node [shape=plaintext]\n        A [id="arr",label=<\n        <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">\n          {{#arr}}\n            <TR>\n                {{#.}}\n                    <TD>{{.}}</TD>\n                {{/.}}\n            </TR>\n          {{/arr}}\n        </TABLE>>]\n        }', { arr: array });
}