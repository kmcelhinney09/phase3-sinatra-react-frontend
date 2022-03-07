import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import App from './components/App';

ReactDOM.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
  document.getElementById('root')
);

