import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllChanXueYan = query => {
    return request({
        url: '/getAllChanXueYan',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchChanXueYan = query => {
    return request({
        url: '/getSearchChanXueYan',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteChanXueYan = query => {
    return request({
        url: '/deleteChanXueYan',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneChanXueYan = query => {
    return request({
        url: '/deleteOneChanXueYan',
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
export const updateChanXueYan = query => {
    return request({
        url: '/insertChanXueYan',
        method: 'post',
        data: query
    });
};
