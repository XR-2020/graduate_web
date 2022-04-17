import request from '../utils/request';
import qs from "qs";

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
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
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
export const getPingGuZhongXinDetailBadge = query => {
    return request({
        url: '/getPingGuZhongXinDetailBadge',
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
export const editPingGuZhongXin = query => {
    return request({
        url: '/editPingGuZhongXin',
        method: 'post',
        data: query
    });
};
