/** @flow */
import * as React from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from './Header';
import Problem from './Problem';
import CodeRun from './CodeRun';

export default class App extends React.Component {
  render() {
    return (
        <div>
          <Header />
          <Switch>
            <Route path="/problem" component={Problem} />
            <Route path="/codeplay" component={CodeRun} />
          </Switch>
        </div>
    );
  }
}
