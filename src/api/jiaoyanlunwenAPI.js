import request from '../utils/request';
import qs from "qs";

// ---------------------------------------- 查询产学研数据
export const getAllJiaoYanLunWen = query => {
    return request({
        url: '/getAllJiaoYanLunWen',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchJiaoYanLunWen = query => {
    return request({
        url: '/getSearchJiaoYanLunWen',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteJiaoYanLunWen = query => {
    return request({
        url: '/deleteJiaoYanLunWen',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
//删除一个产学研
export const deleteOneJiaoYanLunWen = query => {
    return request({
        url: '/deleteOneJiaoYanLunWen',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getJiaoYanLunWenDetail = query => {
    return request({
        url: '/getJiaoYanLunWenDetail',
        method: 'get',
        params: query
    });
};
export const getJiaoYanLunWenDetailBadge = query => {
    return request({
        url: '/getJiaoYanLunWenDetailBadge',
        method: 'get',
        params: query
    });
};
export const updateJiaoYanLunWen = query => {
    return request({
        url: '/updateJiaoYanLunWen',
        method: 'post',
        data: query
    });
};

export const editJiaoYanLunWen = query => {
    return request({
        url: '/editJiaoYanLunWen',
        method: 'post',
        data: query
    });
};
