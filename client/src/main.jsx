import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { GoogleOAuthProvider } from "@react-oauth/google";

import reducers from './reducers';
import App from './App.jsx';
import './index.css';

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='440986782654-61jv6c4i06017176sbrvh1o5vj0shjbm.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
