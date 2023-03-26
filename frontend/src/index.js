import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from "react-alert-template-basic"
import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  offset: '25px',
}

root.render(
  <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </PersistGate>

  </Provider>
);

