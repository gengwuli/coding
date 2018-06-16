'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderList;

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderList(list) {
    var list_provider = list.map(function (e, i) {
        return { e: e, i: i };
    });
    var list_without_end_provider = list.slice(0, list.length - 1).map(function (e, i) {
        return { e: e, i: i, nodeNext: function nodeNext() {
                return i + 1;
            } };
    });
    return _mustache2.default.render('\n    digraph g {\n    nodesep=.05;\n    rankdir=LR;\n    node [shape = record,height=.1,width=.1];\n    {{#list}}\n        node{{i}}[label="{<val>{{e}}|<next>}"];\n    {{/list}}\n    {{#list_without_end}}\n        node{{i}}:next->node{{nodeNext}}:val;\n    {{/list_without_end}}\n}', { list: list_provider, list_without_end: list_without_end_provider });
}