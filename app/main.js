import React from 'react';
import ReactDOM from 'react-dom';
// Provider组件可以让store变得可得到
import { Provider } from 'react-redux';
// 通过reducer创建仓库,需要使用Redux.createStore()
import { createStore, applyMiddleware } from 'redux';

// 便民调错输出小插件
import logger from 'redux-logger';
// 1.-----------------配置saga 
import createSagaMiddleware from 'redux-saga';

// 引入App.js 文件
import App from './App.js';
// 引入入口文件
import reducer from './reducers/all.js';
// 2.-----------------配置saga 
import rootSaga from './sagas/rootSaga.js';

// 3.-----------------配置saga 
// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

// 创建store
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

// 4.-----------------配置saga 
// 运行saga
sagaMiddleware.run(rootSaga)


ReactDOM.render(
    // 需要用Provider把App包一下 照耀一下 并且传入store
    <Provider store={store}>
        <App />
    </Provider>,
    // 最后不要忘记获取一下#app
    document.querySelector('#app')
)