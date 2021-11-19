import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, Icon, Spin } from 'antd';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './reduxStore/store';

ReactDOM.render(

    <ConfigProvider >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
