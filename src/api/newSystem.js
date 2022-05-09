import request from '../utils/request';
import qs from "qs";

// ---------------------------------------- 爬取指定类别网站数据
export const NewSystemCrawlerWebSite= query => {
    return request({
        url: '/NewSystemCrawlerWebSite',
        method: 'get',
        params: query
    });
};
export const getAllNewSystem = query => {
    return request({
        url: '/getAllNewSystem',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchNewSystem = query => {
    return request({
        url: '/getSearchNewSystem',
        method: 'get',
        params: query
    });
};
export const getNewSystemDetail = query => {
    return request({
        url: '/getNewSystemDetail',
        method: 'get',
        params: query
    });
};
export const editNewSystem = query => {
    return request({
        url: '/editNewSystem',
        method: 'post',
        data: query
    });
};

export const getNewSystemBadge = query => {
    return request({
        url: '/getNewSystemBadge',
        method: 'get',
        params: query
    });
};

// //批量删除
export const deleteNewSystem = query => {
    return request({
        url: '/deleteNewSystem',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
export const deleteOneNewSystem = query => {
    return request({
        url: '/deleteOneNewSystem',
        method: 'post',
        params: query
    });
};
export const passJiaoWuChu = query => {
    return request({
        url: '/passJiaoWuChu',
        method: 'post',
        params: query
    });
};
export const getJiaoWuChuMetails = query => {
    return request({
        url: '/getJiaoWuChuMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
