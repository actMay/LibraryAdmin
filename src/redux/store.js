import { createStore } from 'redux';
import reducer from './reducer';

let initStore = {
  'resultCode': '000000',
}

let store = createStore(reducer, initStore)
export default store;
