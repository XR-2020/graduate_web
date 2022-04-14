import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllRuanJianZhuZuo = query => {
    return request({
        url: '/getAllRuanJianZhuZuo',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchRuanJianZhuZuo = query => {
    return request({
        url: '/getSearchRuanJianZhuZuo',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteRuanJianZhuZuo = query => {
    return request({
        url: '/deleteRuanJianZhuZuo',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneRuanJianZhuZuo = query => {
    return request({
        url: '/deleteOneRuanJianZhuZuo',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getRuanJianZhuZuoDetail = query => {
    return request({
        url: '/getRuanJianZhuZuoDetail',
        method: 'get',
        params: query
    });
};
export const getRuanJianZhuZuoDetailBadge = query => {
    return request({
        url: '/getRuanJianZhuZuoDetailBadge',
        method: 'get',
        params: query
    });
};
