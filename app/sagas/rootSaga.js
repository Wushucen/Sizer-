import { takeEvery, put, select } from 'redux-saga/effects';
import Axios from 'axios';
import querystring from 'querystring'


// 默认暴露一个加星函数
export default function* () {
    yield takeEvery('初始化', function* () {
        // 解构escReducer中的state的各项
        const { current, pageSize, color, fuel, exhaust } = yield select(({ esc }) => esc);
        const { results, total } = yield Axios.get(
            'http://192.168.2.250:3000/car?' + querystring.stringify({
                'page': current,
                'pageSize': pageSize,
                'color': color.join('v'),
                'fuel': fuel.join('v'),
                'exhaust': exhaust.join('v')
            })
        ).then(data => data.data);
        console.log(results);

        // 转发
        yield put({ 'type': '结果数组', results })
        yield put({ 'type': '总数', total })
    })

    yield takeEvery('当前页_SAGA', function* ({ current }) {
        yield put({ 'type': '当前页', current });
        yield put({ 'type': '初始化' })
    })

    yield takeEvery('筛选列表_SAGA', function* ({ k, v }) {
        yield put({ 'type': '当前页', 'current': 1 });
        yield put({ 'type': '筛选列表', k, v })
        yield put({ 'type': '初始化' })
    })
}