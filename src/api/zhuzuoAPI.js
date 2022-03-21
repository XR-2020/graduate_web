import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllZhuZuo = query => {
    return request({
        url: '/getAllZhuZuo',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchZhuZuo = query => {
    return request({
        url: '/getSearchZhuZuo',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteZhuZuo = query => {
    return request({
        url: '/deleteZhuZuo',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneZhuoZuo = query => {
    return request({
        url: '/deleteOneZhuoZuo',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getZhuZuoDetail = query => {
    return request({
        url: '/getZhuZuoDetail',
        method: 'get',
        params: query
    });
};
