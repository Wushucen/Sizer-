export default (state = {
    results: [],
    total: 0,
    current: 1,
    pageSize: 10,
    color: [],
    fuel: [],
    exhaust:[]
}, action) => {
    switch (action.type) {
        case '结果数组':
            return {
                ...state,
                'results': action.results,
            }
    }
    switch (action.type) {
        case '总数':
            return {
                ...state,
                total: action.total,
            }
    }
    switch (action.type) {
        case '当前页':
            return {
                ...state,
                'current': action.current,
            }
    }
    switch (action.type) {
        case '筛选列表':
            return {
                ...state,
                [action.k]: action.v
            }
    }
    return state;
}