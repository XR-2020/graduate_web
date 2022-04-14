import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllHengXiangKeYan = query => {
    return request({
        url: '/getAllHengXiangKeYan',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchHengXiangKeYan = query => {
    return request({
        url: '/getSearchHengXiangKeYan',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteHengXiangKeYan = query => {
    return request({
        url: '/deleteHengXiangKeYan',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneHengXiangKeYan = query => {
    return request({
        url: '/deleteOneHengXiangKeYan',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getHengXiangKeYanDetail = query => {
    return request({
        url: '/getHengXiangKeYanDetail',
        method: 'get',
        params: query
    });
};

export const getHengXiangKeYanDetailBadge = query => {
    return request({
        url: '/getHengXiangKeYanDetailBadge',
        method: 'get',
        params: query
    });
};
