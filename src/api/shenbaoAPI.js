import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllShenBao = query => {
    return request({
        url: '/getAllChanXueYan',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchShenBao = query => {
    return request({
        url: '/getSearchChanXueYan',
        method: 'get',
        params: query
    });
};
