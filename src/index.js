import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.min.css';
import { Button } from 'antd';
import Routers from './router/Router';
import store from './redux/store';
import { Provider } from 'react-redux';
//import App from './App';

ReactDOM.render(<Provider store={store}><Routers /></Provider>, document.getElementById('root'));
