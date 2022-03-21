import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllZhuanLi = query => {
    return request({
        url: '/getAllZhuanLi',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchZhuanLi = query => {
    return request({
        url: '/getSearchZhuanLi',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteZhuanLi = query => {
    return request({
        url: '/deleteZhuanLi',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneZhuanLi = query => {
    return request({
        url: '/deleteOneZhuanLi',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getZhuanLiDetail = query => {
    return request({
        url: '/getZhuanLiDetail',
        method: 'get',
        params: query
    });
};
