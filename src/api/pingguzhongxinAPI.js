import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllPingGuZhongXin = query => {
    return request({
        url: '/getAllPingGuZhongXin',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchPingGuZhongXin = query => {
    return request({
        url: '/getSearchPingGuZhongXin',
        method: 'get',
        params: query
    });
};
//批量删除
export const deletePingGuZhongXin = query => {
    return request({
        url: '/deletePingGuZhongXin',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOnePingGuZhongXin = query => {
    return request({
        url: '/deleteOnePingGuZhongXin',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getPingGuZhongXinDetail = query => {
    return request({
        url: '/getPingGuZhongXinDetail',
        method: 'get',
        params: query
    });
};
export const updatePingGuZhongXin = query => {
    return request({
        url: '/updatePingGuZhongXin',
        method: 'post',
        data: query
    });
};
