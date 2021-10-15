import React from 'react';
import ReactDOM from 'react-dom';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import App from './App'; 

Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
