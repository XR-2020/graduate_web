import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const NewSearchByDetail = query => {
    return request({
        url: '/NewSearchByDetail',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const NewSearchAll = query => {
    return request({
        url: '/NewSearchAll',
        method: 'get',
        params: query
    });
};
