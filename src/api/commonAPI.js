import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getTeacherList = query => {
    return request({
        url: '/getTeacherList',
        method: 'get',
        params: query
    });
};
export const crawlerWebSite = query => {
    return request({
        url: '/crawlerWebSite',
        method: 'get',
        params: query
    });
};
