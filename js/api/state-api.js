/**
 * Created by daneding on 7/7/15.
 */
var $ = require('jquery');
var stateActions = require('../actions/state-action');

module.exports = {
  loadAllData: function() {
    $.getJSON('/states').then(function(states) {
      stateActions.loadedData(states);
    });
  }
}