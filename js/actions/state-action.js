/**
 * Created by daneding on 7/7/15.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import StateConstants from '../constants/state-constant';

let stateActions = {
  loadData() {
    AppDispatcher.dispatch({
      actionType: StateConstants.DO_STATE_LOAD
    });
  },
  loadedData(states) {
    AppDispatcher.dispatch({
      actionType: StateConstants.DID_STATE_LOAD,
      data: states
    });
  }
}

export default stateActions;