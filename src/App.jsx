import React, { Component } from 'react';
// 引入react-redux配置
import { Provider } from 'react-redux';
// 引入react-router配置
import router from '@/router/index.jsx';
// 引入react-store配置
import store from './store'
// const store = configureStore()
export default class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    {router}
                </Provider>
            </div>
        );
    }
}