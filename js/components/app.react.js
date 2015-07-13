/**
 * Created by daneding on 7/7/15.
 */
import React from 'react';
import {RouteHandler, Link} from 'react-router';
import StateStore from '../stores/state-store';
import StateActions from '../actions/state-action';

export default React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      states: []
    };
  },

  componentDidMount() {
    //add listener.
    StateStore.addChangeListener(this._getAll);
    //when the component did mount, request the states from backend.
    StateActions.loadData();
  },

  componentWillUnmount() {
    StateStore.removeChangeListener(this._getAll);
  },

  render() {
    let links = this.state.states.map(function (state) {
      return (
        <li className="row">
          <Link to="state" params={{ abbr: state.abbr }}>{state.name}</Link>
        </li>
      );
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <ul className="col-xs-6" style={ {height: '100vh', overflow: 'auto'} }>
            {links}
          </ul>
          <div className="col-xs-6">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  },

  _getAll() {
    this.setState({
      states: StateStore.getAll()
    })
  }
});