import { combineReducers } from 'redux';

import escReducer from './escReducer.js';

// 唯一可以公开默认暴露纯函数的地方
export default combineReducers({
    esc: escReducer,
})