import Mustache from 'mustache'

export default function renderList(list) {
   let list_provider = list.map((e,i)=>{ return {e:e,i:i} });
   let list_without_end_provider = list.slice(0, list.length - 1).map((e,i)=>{ return {e:e,i:i, nodeNext: function() {return i + 1;}} });
   return Mustache.render(`
    digraph g {
    nodesep=.05;
    rankdir=LR;
    node [shape = record,height=.1,width=.1];
    {{#list}}
        node{{i}}[label="{<val>{{e}}|<next>}"];
    {{/list}}
    {{#list_without_end}}
        node{{i}}:next->node{{nodeNext}}:val;
    {{/list_without_end}}
}`, {list: list_provider, list_without_end: list_without_end_provider})
}