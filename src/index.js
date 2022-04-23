import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './Reducer/ReducerIndex';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(Reducer,composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


