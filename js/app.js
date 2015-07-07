var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var App = require('./components/app.react');
var Index = require('./components/index.react');
var State = require('./components/state.react');
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route path="/react-flux/index.html" handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="state" path="state/:abbr" handler={State}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});