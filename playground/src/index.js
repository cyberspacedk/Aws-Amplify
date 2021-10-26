import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import App from './App';

import amplifyConfig from './aws-exports';

Amplify.configure(amplifyConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 