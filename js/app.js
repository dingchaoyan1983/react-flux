import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import App from './components/app.react';
import Index from './components/index.react';
import State from './components/state.react';

let routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="state" path="state/:abbr" handler={State}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});