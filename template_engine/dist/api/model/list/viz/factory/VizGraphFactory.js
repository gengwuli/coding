"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VizListNode = require("../nodes/VizListNode");

var _VizListNode2 = _interopRequireDefault(_VizListNode);

var _util = require("../../util/util");

var _SubGraph = require("../graph/subgraph/SubGraph");

var _SubGraph2 = _interopRequireDefault(_SubGraph);

var _VizListFactory = require("./VizListFactory");

var _VizListFactory2 = _interopRequireDefault(_VizListFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VizGraphFactory = function () {
    function VizGraphFactory() {
        _classCallCheck(this, VizGraphFactory);
    }

    _createClass(VizGraphFactory, null, [{
        key: "makeSimpleList",
        value: function makeSimpleList(arr) {
            var list = new _VizListNode2.default(arr.slice(0));
            (0, _util.addIdx)(list);
            (0, _util.addListArray)(list);
            var edges = arr.map(function (e, i) {
                return [i, i + 1, 'n'];
            });
            list.addEdges(edges);
            return list;
        }
    }, {
        key: "makeSimpleSubgraph",
        value: function makeSimpleSubgraph(arr) {
            var sub = new _SubGraph2.default();
            sub.vizProps.push("label=\"simple list\"");
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr));
            return sub;
        }
    }, {
        key: "makeDeleteSubgraph",
        value: function makeDeleteSubgraph(arr, pos) {
            var sub = new _SubGraph2.default();
            sub.vizProps.push("label=\"delete(" + arr[pos] + ")\"");
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr));
            var list = new _VizListNode2.default(arr.slice(0));
            (0, _util.addIdx)(list);
            (0, _util.addListArray)(list);
            var edges = arr.map(function (e, i) {
                if (pos === 0) {
                    return [[0, 1, 'd']];
                } else if (i === pos - 1) {
                    return [[i, i + 1, 'd'], [i, i + 2, 'a']];
                } else if (i === pos) {
                    return [[i, i + 1, 'd']];
                } else {
                    return [[i, i + 1, 'n']];
                }
            }).reduce(function (acc, val) {
                return acc.concat(val);
            }, []);
            list.addEdges(edges);

            if (pos === 0) {
                list.listArray[0].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"1\"]");
                });
            } else {
                list.listArray[pos - 1].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"1\"]");
                });
                list.listArray[pos].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"2\"]");
                });
            }
            sub.vizLists.push(list);
            arr.splice(pos, 1);
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr));
            sub.vizLists[0].addVizProps([pos]);
            sub.vizLists[1].addVizProps([pos]);
            return sub;
        }
    }, {
        key: "makeInsertSubgraph",
        value: function makeInsertSubgraph(arr, pos, val) {
            var sub = new _SubGraph2.default();
            sub.vizProps.push("label=\"insert(" + pos + ", " + val + ")\"");
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr));
            arr.splice(pos, 0, val);
            var list = new _VizListNode2.default(arr.slice(0));
            (0, _util.addIdx)(list);
            (0, _util.addListArray)(list);
            var edges = arr.map(function (e, i) {
                if (i === pos - 1) {
                    return [[i, i + 1, 'a'], [i, i + 2, 'd']];
                } else if (i === pos) {
                    return [[i, i + 1, 'a']];
                } else {
                    return [[i, i + 1, 'n']];
                }
            }).reduce(function (acc, val) {
                return acc.concat(val);
            }, []);

            list.addEdges(edges);

            if (pos === 0) {
                list.listArray[0].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"1\"]");
                });
            } else {
                list.listArray[pos - 1].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"2\"]");
                });
                list.listArray[pos].edges.forEach(function (e) {
                    return e.vizProps.push("[taillabel=\"1\"]");
                });
            }
            sub.vizLists.push(list);
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr));
            sub.invisConnect.push(sub.vizLists[1].listArray[pos].id + "->" + sub.vizLists[2].listArray[pos].id + "[style=invis]");
            sub.ranks = sub.vizLists.map(function (l) {
                return l.collect();
            });
            if (pos != 0) {
                sub.ranks[1].splice(pos, 1);
            }

            sub.vizLists[1].addVizProps([pos]);
            sub.vizLists[2].addVizProps([pos]);

            return sub;
        }
    }, {
        key: "makeSwapSubgraph",
        value: function makeSwapSubgraph(arr, pos1, pos2) {
            var sub = new _SubGraph2.default();
            sub.vizProps.push("label=\"swap(" + arr[pos1] + ", " + arr[pos2] + ")\"");
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr.slice(0)));

            var list = new _VizListNode2.default(arr.slice(0));
            (0, _util.addIdx)(list);
            (0, _util.addListArray)(list);
            var edges = arr.map(function (e, i) {
                if (i == 0 && pos1 === 0) {
                    return [[0, 1, 'd'], [0, pos2 + 1, 'a']];
                } else if (i === pos1 - 1) {
                    return [[i, i + 1, 'd'], [i, pos2, 'a']];
                } else if (i === pos1) {
                    return [[i, i + 1, 'd'], [i, pos2 + 1, 'a']];
                } else if (i === pos2 - 1) {
                    return [[i, i + 1, 'd'], [i, pos1, 'a']];
                } else if (i === pos2) {
                    return [[i, i + 1, 'd'], [i, pos1 + 1 === pos2 ? pos1 : pos1 + 1, 'a']];
                } else {
                    return [[i, i + 1, 'n']];
                }
            }).reduce(function (acc, val) {
                return acc.concat(val);
            }, []);
            list.addEdges(edges);
            sub.vizLists.push(list);

            sub.vizLists[1].listArray[pos2].edges[1].vizProps.push("[constraint=false]");
            if (pos1 + 1 !== pos2) {
                sub.vizLists[1].listArray[pos2 - 1].edges[1].vizProps.push("[constraint=false]");
            }

            if (pos1 + 1 === pos2) {
                if (pos1 === 0) {
                    list.listArray[0].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"1\"]");
                    });
                    list.listArray[1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"2\"]");
                    });
                } else {
                    list.listArray[pos1 - 1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"1\"]");
                    });
                    list.listArray[pos1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"2\"]");
                    });
                    list.listArray[pos2].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"3\"]");
                    });
                }
            } else {
                if (pos1 === 0) {
                    list.listArray[0].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"1\"]");
                    });
                    list.listArray[pos2].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"2\"]");
                    });
                    list.listArray[pos2 - 1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"3\"]");
                    });
                } else {
                    list.listArray[pos1 - 1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"1\"]");
                    });
                    list.listArray[pos1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"2\"]");
                    });
                    list.listArray[pos2].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"3\"]");
                    });
                    list.listArray[pos2 - 1].edges.forEach(function (e) {
                        return e.vizProps.push("[taillabel=\"4\"]");
                    });
                }
            }

            var tmp = arr[pos1];
            arr[pos1] = arr[pos2];
            arr[pos2] = tmp;
            sub.vizLists.push(_VizListFactory2.default.makeSimpleList(arr.slice(0)));
            sub.vizLists.forEach(function (list) {
                list.addVizProps([pos1, pos2]);
            });
            return sub;
        }
    }]);

    return VizGraphFactory;
}();

exports.default = VizGraphFactory;