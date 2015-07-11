/**
 * Created by daneding on 7/7/15.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import StateConstant from '../constants/state-constant';
import StateApi from '../api/state-api';


let CHANGE_EVENT = 'change';

let states = [];

let StateStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll() {
    return states;
  },

  getStateByName(abbr) {
    var _states = states.filter(function(entry){
      return entry.abbr === abbr;
    });

    if (!!_states && _states.length > 0) {
      return _states[0];
    } else {
      return {};
    }
  },
  setStates(_states) {
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

export default StateStore;



