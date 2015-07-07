/**
 * Created by daneding on 7/7/15.
 */
var React = require('react');
var StateStore = require('../stores/state-store');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  imageUrl: function (name) {
    return "http://www.50states.com/maps/" + underscore(name) + ".gif";
  },

  render: function () {
    var unitedState = StateStore.getStateByName(this.props.params.abbr);
    if (unitedState !== undefined && unitedState.name) {
      return (
        <div className="State">
          <h1>{unitedState.name}</h1>
          <img src={this.imageUrl(unitedState.name)}/>
        </div>
      );
    } else {
      return <div className="State"></div>;
    }
  }
});


function underscore(str) {
  return str.toLowerCase().replace(/ /, '_');
}