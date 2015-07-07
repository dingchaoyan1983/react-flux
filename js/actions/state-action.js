/**
 * Created by daneding on 7/7/15.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var StateConstants = require('../constants/state-constant');

var stateActions = {
  loadData: function() {
    AppDispatcher.dispatch({
      actionType: StateConstants.DO_STATE_LOAD
    });
  },
  loadedData: function(states) {
    AppDispatcher.dispatch({
      actionType: StateConstants.DID_STATE_LOAD,
      data: states
    });
  }
}

module.exports = stateActions;