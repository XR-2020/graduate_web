import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllZongXiangKeYan = query => {
    return request({
        url: '/getAllZongXiangKeYan',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchZongXiangKeYan = query => {
    return request({
        url: '/getSearchZongXiangKeYan',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteZongXiangKeYan = query => {
    return request({
        url: '/deleteZongXiangKeYan',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneZongXiangKeYan = query => {
    return request({
        url: '/deleteOneZongXiangKeYan',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getChanXueYanDetail = query => {
    return request({
        url: '/getChanXueYanDetail',
        method: 'get',
        params: query
    });
};
