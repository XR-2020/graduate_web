import request from '../utils/request';
import qs from "qs";

// ---------------------------------------- 查询教研数据
export const getAllJiaoYan = query => {
    return request({
        url: '/getAllJiaoYan',
        method: 'get',
        params: query
    });
};
//教研关键词全局查询
export const getSearchJiaoYan = query => {
    return request({
        url: '/getSearchJiaoYan',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteJiaoYan = query => {
    return request({
        url: '/deleteJiaoYan',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
//删除一个教研
export const deleteOneJiaoYan = query => {
    return request({
        url: '/deleteOneJiaoYan',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getJiaoYanDetail = query => {
    return request({
        url: '/getJiaoYanDetial',
        method: 'get',
        params: query
    });
};
export const getJiaoYanDetialBadge = query => {
    return request({
        url: '/getJiaoYanDetialBadge',
        method: 'get',
        params: query
    });
};
export const updateJiaoYan = query => {
    return request({
        url: '/updateJiaoYan',
        method: 'post',
        data: query
    });
};
export const editJiaoYan = query => {
    return request({
        url: '/editJiaoYan',
        method: 'post',
        data: query
    });
};
