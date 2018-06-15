import resource from 'resource-router-middleware';
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

import renderTree from './util/TreeUtil';
import renderArray from './util/ArrayUtil';
import renderList from './util/ListUtil';

const viz = new Viz({ Module, render });
 
export default (app) => {
  app.post('/api/visualize', renderTemplate)
}

function renderTemplate(req, res) {
  let body = req.body
  if (body['type'] == null || body['type'] == undefined || body['type'] == 'raw') {
            viz.renderString(body['val'])
                .then(result => {
                    res.json({"result": result})
                })
                .catch(e => {
                    res.json({"error": e})
                });
            return
        }  
   let dotRes = '';
        switch(body.type) {
            case 'tree':
                dotRes = renderTree(body['val']);
                break;
            case 'array':
                let arr = JSON.parse(body['val']);
                if (Array.isArray(arr[0])) {
                    dotRes = renderArray(arr);
                } else {
                    dotRes = renderArray([arr]);
                }
                break;
            case 'linked_list':
                dotRes = renderList(JSON.parse(body['val']));
                break;
            default:
                dotRes = body['val'];
                break;
        }

        viz.renderString(dotRes).then(result => {
            res.json({"result": result});
        }).catch(error => {
            res.json({"error": error});
        });
  }


