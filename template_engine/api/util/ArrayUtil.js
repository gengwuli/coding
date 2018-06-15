import Mustache from 'mustache'
export default function renderArray(array) {
    return Mustache.render(`digraph G {
        node [shape=plaintext]
        A [id="arr",label=<
        <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
          {{#arr}}
            <TR>
                {{#.}}
                    <TD>{{.}}</TD>
                {{/.}}
            </TR>
          {{/arr}}
        </TABLE>>]
        }`, {arr: array})
}