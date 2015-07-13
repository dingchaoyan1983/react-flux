/**
 * Created by daneding on 7/7/15.
 */
import React from 'react';
import StateStore from '../stores/state-store';

export default React.createClass({

  displayName: 'State',

  contextTypes: {
    router: React.PropTypes.func
  },

  imageUrl(name) {
    return "http://www.50states.com/maps/" + underscore(name) + ".gif";
  },

  getInitialState() {
    return {next: 1};
  },

  incrNext() {
    let next = this.state.next;
    this.setState({next: next + 1});
  },

  render() {
    let unitedState = StateStore.getStateByName(this.props.params.abbr);
    if (unitedState !== undefined && unitedState.name) {
      return (
        <div className="State">
          <div>state is: {this.state.next}</div>
          <button className="btn btn-default" onClick={this.incrNext}>increase number</button>
          <h1>{unitedState.name}</h1>
          <img src={this.imageUrl(unitedState.name)} style={{height:'500px'}}/>
        </div>
      );
    } else {
      return null;
    }
  }
});

function underscore(str) {
  return str.toLowerCase().replace(/ /, '_');
}