/**
 * Created by daneding on 7/7/15.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StateConstant = require('../constants/state-constant');
var StateApi = require('../api/state-api');


var CHANGE_EVENT = 'change';

var states = [];

var StateStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return states;
  },

  getStateByName: function(abbr) {
    var _states = states.filter(function(entry){
      return entry.abbr === abbr;
    });

    if (!!_states && _states.length > 0) {
      return _states[0];
    } else {
      return {};
    }
  },
  setStates: function (_states) {
    states = _states;
    this.emitChange();
  }
});

AppDispatcher.register(function(payload) {

  switch(payload.actionType) {

    case StateConstant.DO_STATE_LOAD:
      StateApi.loadAllData();
      break;

    case StateConstant.DID_STATE_LOAD:
      StateStore.setStates(payload.data);
      break;
  }
})

module.exports = StateStore;



