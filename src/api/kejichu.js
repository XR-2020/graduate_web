import request from '../utils/request';
import qs from "qs";

export const getAllKeJiChu = query => {
    return request({
        url: '/getAllKeJiChu',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchKeJiChu = query => {
    return request({
        url: '/getSearchKeJiChu',
        method: 'get',
        params: query
    });
};
export const getKeJiChuDetail = query => {
     return request({
         url: '/getKeJiChuDetail',
         method: 'get',
        params: query
    });
 };
export const editKeJiChu = query => {
    return request({
        url: '/editKeJiChu',
        method: 'post',
        data: query
    });
};
export const insertKeJiChu = query => {
    return request({
        url: '/insertKeJiChu',
        method: 'post',
        data: query
    });
};
export const getKeJiChuBadge = query => {
     return request({
         url: '/getKeJiChuBadge',
         method: 'get',
         params: query
     });
 };

// //批量删除
export const deleteKeJiChu = query => {
    return request({
        url: '/deleteKeJiChu',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
export const deleteOneKeJiChu = query => {
    return request({
        url: '/deleteOneKeJiChu',
        method: 'post',
        params: query
    });
};
export const passKeJiChu = query => {
    return request({
         url: '/passKeJiChu',
         method: 'post',
        params: query
    });
 };
export const getKeJiChuMetails = query => {
     return request({
         url: '/getKeJiChuMetails',
         method: 'get',
         responseType:'arraybuffer',
         params: query
     });
 };
