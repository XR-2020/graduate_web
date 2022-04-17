import request from '../utils/request';
import qs from "qs";

// ---------------------------------------- 查询产学研数据
export const getAllKeYanLunWen = query => {
    return request({
        url: '/getAllKeYanLunWen',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchKeYanLunWen = query => {
    return request({
        url: '/getSearchKeYanLunWen',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteKeYanLunWen = query => {
    return request({
        url: '/deleteKeYanLunWen',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
//删除一个产学研
export const deleteOneKeYanLunWen = query => {
    return request({
        url: '/deleteOneKeYanLunWen',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getKeYanLunWenDetail = query => {
    return request({
        url: '/getKeYanLunWenDetail',
        method: 'get',
        params: query
    });
};
export const getKeYanLunWenDetailBadge = query => {
    return request({
        url: '/getKeYanLunWenDetailBadge',
        method: 'get',
        params: query
    });
};
