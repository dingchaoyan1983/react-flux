/**
 * Created by daneding on 7/7/15.
 */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var StateStore = require('../stores/state-store');
var StateActions = require('../actions/state-action');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      states: []
    };
  },

  componentDidMount: function () {
    //add listener.
    StateStore.addChangeListener(this._getAll);
    //when the component did mount, request the states from backend.
    StateActions.loadData();
  },

  componentWillUnmount: function() {
    StateStore.removeChangeListener(this._getAll);
  },

  render: function () {
    var links = this.state.states.map(function (state) {
      return (
        <li key={state.abbr} ref={state.abbr}>
          <Link to="state" params={{ abbr: state.abbr }}>{state.name}</Link>
        </li>
      );
    });
    return (
      <div className="App">
        <ul className="Master">
          {links}
        </ul>
        <div className="Detail">
          <RouteHandler/>
        </div>
      </div>
    );
  },

  _getAll: function() {
    this.setState({
      states: StateStore.getAll()
    })
  }
});