/**
 * Created by daneding on 7/7/15.
 */
import $ from 'jquery';
import stateActions from '../actions/state-action';

export default {
  loadAllData() {
    $.getJSON('/states').then(function(states) {
      stateActions.loadedData(states);
    });
  }
}