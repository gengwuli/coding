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
            dotRes = body['val'].trim().split('|').map(e => renderTree(e));
            break;
        case 'array':
            dotRes = body['val'].trim().split('|').map(e => renderArray(e));
            break;
        case 'linked_list':
            dotRes = body['val'].trim().split('|').map(e => renderList(e));
            break;
        default:
            dotRes = [body['val'].trim()];
            break;
    }

    res.json({result: dotRes});
  }


